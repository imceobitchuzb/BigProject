"""
Gaming Phishing & Typosquatting Scanner Engine for SafeInGame.
Analyzes URLs and domains for homoglyph spoofing, typosquatting,
brand impersonation, suspicious TLDs, non-standard ports, SSRF/internal IP vectors,
and known gaming attack indicators.
"""

import ipaddress
import math
import re
import threading
import time
import urllib.parse
from datetime import datetime, timezone
from typing import Dict, List, Optional, Set, Tuple, Any

import idna

from app.schemas.scanner import (
    ScanAnalysisDetails,
    ScanFlag,
    ScanResponse,
)

# Registry of authentic gaming platforms and their official domains
OFFICIAL_PLATFORMS: Dict[str, Dict[str, Any]] = {
    "steam": {
        "name": "Steam / Valve Corporation",
        "domains": {
            "steampowered.com",
            "steamcommunity.com",
            "steamgames.com",
            "steamstatic.com",
            "valvesoftware.com",
            "steamcontent.com",
        },
        "brand_keywords": ["steam", "valvesoftware"],
        "category": "PC Gaming & Trading",
    },
    "roblox": {
        "name": "Roblox Corporation",
        "domains": {"roblox.com", "rbxcdn.com", "robloxlabs.com"},
        "brand_keywords": ["roblox", "robux"],
        "category": "Gaming Platform",
    },
    "supercell": {
        "name": "Supercell (Brawl Stars / Clash)",
        "domains": {
            "supercell.com",
            "brawlstars.com",
            "clashofclans.com",
            "clashroyale.com",
            "supercellid.com",
        },
        "brand_keywords": ["brawlstars", "supercell", "supercellid"],
        "category": "Mobile Gaming",
    },
    "pubg": {
        "name": "PUBG / KRAFTON",
        "domains": {"pubg.com", "krafton.com", "pubgmobile.com"},
        "brand_keywords": ["pubg", "krafton"],
        "category": "Battle Royale",
    },
    "minecraft": {
        "name": "Minecraft / Mojang Studios",
        "domains": {"minecraft.net", "mojang.com"},
        "brand_keywords": ["minecraft", "mojang"],
        "category": "Sandbox Gaming",
    },
    "discord": {
        "name": "Discord",
        "domains": {"discord.com", "discord.gg", "discordapp.com", "discordapp.net"},
        "brand_keywords": ["discord", "discordapp"],
        "category": "Gaming Community & Chat",
    },
    "epicgames": {
        "name": "Epic Games",
        "domains": {"epicgames.com", "unrealengine.com", "fortnite.com"},
        "brand_keywords": ["epicgames", "fortnite"],
        "category": "Gaming Platform",
    },
    "twitch": {
        "name": "Twitch Interactive",
        "domains": {"twitch.tv"},
        "brand_keywords": ["twitch"],
        "category": "Live Streaming",
    },
}

# High-risk / low-cost abuse top-level domains frequently abused by phishing kits
SUSPICIOUS_TLDS: Set[str] = {
    "xyz", "top", "click", "buzz", "cfd", "fit", "icu", "sbs",
    "monster", "quest", "gq", "tk", "ml", "ga", "cf", "work",
    "rest", "shop", "vip", "space", "online", "site", "live", "fun",
    "cam", "link", "bid", "loan", "men", "date", "racing", "win"
}

# Free dynamic hosting / tunnel services abused to host phishing pages
ABUSED_HOSTS: Set[str] = {
    "ngrok-free.app", "pages.dev", "glitch.me", "repl.co",
    "firebaseapp.com", "web.app", "herokuapp.com", "000webhostapp.com",
    "vercel.app", "netlify.app", "github.io"
}

# Cloud metadata endpoints frequently probed in SSRF attacks
CLOUD_METADATA_HOSTS: Set[str] = {
    "169.254.169.254",
    "metadata.google.internal",
    "instance-data",
    "100.100.100.200",  # Alibaba Cloud
}

# Dangerous / Internal URI schemes that should never be used for gaming web links
DANGEROUS_SCHEMES: Set[str] = {
    "file", "gopher", "dict", "ldap", "ldaps", "ssh", "ftp",
    "javascript", "data", "vbscript", "jar"
}

# Common Cyrillic and Greek homoglyphs targeting ASCII Latin characters
HOMOGLYPH_MAP: Dict[str, Tuple[str, str]] = {
    # Cyrillic
    "\u0430": ("a", "Cyrillic Small Letter A"),
    "\u0441": ("c", "Cyrillic Small Letter Es"),
    "\u0435": ("e", "Cyrillic Small Letter Ie"),
    "\u043e": ("o", "Cyrillic Small Letter O"),
    "\u0440": ("p", "Cyrillic Small Letter Er"),
    "\u0455": ("s", "Cyrillic Small Letter Dze"),
    "\u0456": ("i", "Cyrillic Small Letter Byelorussian-Ukrainian I"),
    "\u0458": ("j", "Cyrillic Small Letter Je"),
    "\u0443": ("y", "Cyrillic Small Letter U"),
    "\u0445": ("x", "Cyrillic Small Letter Ha"),
    "\u0501": ("d", "Cyrillic Small Letter Komi De"),
    "\u04bb": ("h", "Cyrillic Small Letter Shha"),
    "\u04cf": ("l", "Cyrillic Small Letter Palochka"),
    "\u043c": ("m", "Cyrillic Small Letter Em"),
    # Greek
    "\u03b1": ("a", "Greek Small Letter Alpha"),
    "\u03b5": ("e", "Greek Small Letter Epsilon"),
    "\u03bf": ("o", "Greek Small Letter Omicron"),
    "\u03c1": ("p", "Greek Small Letter Rho"),
    "\u03c5": ("y", "Greek Small Letter Upsilon"),
}

# Gaming phishing keywords
SCAM_KEYWORDS: List[Dict[str, Any]] = [
    {"keyword": "free-skins", "weight": 25, "desc_en": "Promises free weapon/character skins", "desc_ru": "Обещание бесплатных скинов"},
    {"keyword": "free-vbucks", "weight": 25, "desc_en": "Promises free Fortnite V-Bucks", "desc_ru": "Обещание бесплатных V-Bucks"},
    {"keyword": "free-robux", "weight": 25, "desc_en": "Promises free Roblox Robux currency", "desc_ru": "Обещание бесплатной валюты Robux"},
    {"keyword": "free-gems", "weight": 25, "desc_en": "Promises free Brawl Stars gems", "desc_ru": "Обещание бесплатных гемов"},
    {"keyword": "knife-giveaway", "weight": 25, "desc_en": "Fake CS2 knife giveaway lure", "desc_ru": "Фейковая раздача ножей CS2"},
    {"keyword": "generator", "weight": 20, "desc_en": "Claims to generate virtual currencies", "desc_ru": "Якобы генератор игровой валюты"},
    {"keyword": "claim-bonus", "weight": 20, "desc_en": "Bait to claim non-existent rewards", "desc_ru": "Приманка для получения 'бонусов'"},
    {"keyword": "trade-offer", "weight": 20, "desc_en": "Simulated or deceptive trade confirmation", "desc_ru": "Поддельное предложение обмена"},
    {"keyword": "steam-trade", "weight": 25, "desc_en": "Third-party site impersonating Steam trade", "desc_ru": "Имитация обмена Steam на стороннем сайте"},
    {"keyword": "tournament-vote", "weight": 30, "desc_en": "Classic 'vote for my team' phishing lure", "desc_ru": "Классический скам 'проголосуй за команду'"},
    {"keyword": "steam-guard", "weight": 30, "desc_en": "Credential harvesting targeting Steam Guard", "desc_ru": "Попытка перехвата кодов Steam Guard"},
    {"keyword": "supercell-id-verify", "weight": 30, "desc_en": "Fake Supercell ID verification portal", "desc_ru": "Фейковая верификация Supercell ID"},
    {"keyword": "api-key", "weight": 25, "desc_en": "Solicits Steam Web API key credentials", "desc_ru": "Запрос доступа к Steam Web API ключам"},
    {"keyword": "login-steam", "weight": 25, "desc_en": "Deceptive fake Steam login portal", "desc_ru": "Фейковая страница входа через Steam"},
    {"keyword": "nitro-gift", "weight": 25, "desc_en": "Fake Discord Nitro subscription gift", "desc_ru": "Фейковый подарок Discord Nitro"},
]

# Suspicious file extensions associated with gaming malware/stealer delivery
DANGEROUS_EXTENSIONS: Set[str] = {
    ".exe", ".scr", ".bat", ".cmd", ".vbs", ".ps1", ".jar", ".iso", ".msi", ".pif"
}


# --- In-Memory TTL & Thread-Safe Cache ---
class ScanCache:
    def __init__(self, ttl_seconds: int = 600, max_size: int = 1000):
        self._cache: Dict[str, Tuple[ScanResponse, float]] = {}
        self._lock = threading.Lock()
        self._ttl = ttl_seconds
        self._max_size = max_size

    def get(self, key: str) -> Optional[ScanResponse]:
        with self._lock:
            entry = self._cache.get(key)
            if not entry:
                return None
            res, expires_at = entry
            if time.time() > expires_at:
                del self._cache[key]
                return None
            # Return copy with cached flag set
            copied = res.model_copy(update={"cached": True})
            return copied

    def set(self, key: str, value: ScanResponse) -> None:
        with self._lock:
            # Simple eviction if exceeding max_size
            if len(self._cache) >= self._max_size:
                now = time.time()
                # Purge expired first
                expired_keys = [k for k, (_, exp) in self._cache.items() if now > exp]
                for k in expired_keys:
                    del self._cache[k]
                # If still full, pop first inserted
                if len(self._cache) >= self._max_size:
                    first_key = next(iter(self._cache))
                    del self._cache[first_key]

            self._cache[key] = (value, time.time() + self._ttl)

    def clear(self) -> None:
        with self._lock:
            self._cache.clear()


GLOBAL_SCAN_CACHE = ScanCache(ttl_seconds=600, max_size=1000)


def damerau_levenshtein_distance(s1: str, s2: str) -> int:
    """Calculates Damerau-Levenshtein distance (handles insertions, deletions, substitutions, and transpositions)."""
    d: Dict[Tuple[int, int], int] = {}
    len1, len2 = len(s1), len(s2)

    for i in range(-1, len1 + 1):
        d[(i, -1)] = i + 1
    for j in range(-1, len2 + 1):
        d[(-1, j)] = j + 1

    for i in range(len1):
        for j in range(len2):
            cost = 0 if s1[i] == s2[j] else 1
            d[(i, j)] = min(
                d[(i - 1, j)] + 1,        # deletion
                d[(i, j - 1)] + 1,        # insertion
                d[(i - 1, j - 1)] + cost  # substitution
            )
            if i > 0 and j > 0 and s1[i] == s2[j - 1] and s1[i - 1] == s2[j]:
                d[(i, j)] = min(d[(i, j)], d[(i - 2, j - 2)] + 1)  # transposition

    return d[(len1 - 1, len2 - 1)]


INTERNAL_LOCAL_HOSTS: Set[str] = {
    "localhost", "loopback", "127.0.0.1", "0.0.0.0", "::1"
}


def check_ip_ssrf_safety(hostname: str) -> Tuple[bool, bool, str]:
    """
    Checks if hostname is an IP address and determines if it belongs to
    private, loopback, link-local, multicast, or cloud metadata endpoints.
    Returns: (is_ip, is_private_or_internal, description)
    """
    clean_host = hostname.strip("[]").lower()

    # Direct hostname check for cloud metadata
    if clean_host in CLOUD_METADATA_HOSTS:
        return True, True, "Cloud Metadata Service (AWS/GCP/Azure) endpoint"

    if clean_host in INTERNAL_LOCAL_HOSTS or clean_host.endswith(".localhost") or clean_host.endswith(".local"):
        return True, True, "Internal loopback/local address"

    # Check decimal/dword integer representation (e.g. 2130706433 == 127.0.0.1)
    if clean_host.isdigit() and len(clean_host) >= 7:
        try:
            val = int(clean_host)
            ip_obj = ipaddress.IPv4Address(val)
            is_internal = (
                ip_obj.is_private or ip_obj.is_loopback or ip_obj.is_link_local
                or ip_obj.is_reserved or ip_obj.is_unspecified
            )
            return True, is_internal, f"Obfuscated decimal IP representation ({ip_obj})"
        except ValueError:
            pass

    try:
        ip_obj = ipaddress.ip_address(clean_host)
        is_internal = (
            ip_obj.is_private or ip_obj.is_loopback or ip_obj.is_link_local
            or ip_obj.is_reserved or ip_obj.is_unspecified or str(ip_obj) in CLOUD_METADATA_HOSTS
        )
        desc = "Internal/private network address" if is_internal else "Public IP host"
        return True, is_internal, desc
    except ValueError:
        return False, False, ""


class ScannerService:
    @staticmethod
    def normalize_url(raw_input: str) -> Tuple[str, str, urllib.parse.ParseResult, Optional[int], str]:
        """Normalizes user input into a valid URL, extracts scheme, hostname, and port."""
        cleaned = raw_input.strip()

        # Extract scheme if explicitly provided
        scheme_match = re.match(r"^([a-zA-Z][a-zA-Z0-9+\-.]*):(//)?", cleaned)
        explicit_scheme = scheme_match.group(1).lower() if scheme_match else ""

        if not explicit_scheme:
            url_to_parse = "https://" + cleaned
            actual_scheme = "https"
        else:
            url_to_parse = cleaned
            actual_scheme = explicit_scheme

        try:
            parsed = urllib.parse.urlparse(url_to_parse)
            hostname = (parsed.hostname or "").lower()
            port = parsed.port
        except Exception:
            parsed = urllib.parse.urlparse("https://" + cleaned)
            hostname = (parsed.hostname or "").lower()
            port = None

        return cleaned, hostname, parsed, port, actual_scheme

    @staticmethod
    def detect_homoglyphs(domain: str) -> Tuple[bool, List[Dict[str, Any]]]:
        """Detects Cyrillic/Greek Unicode homoglyphs substituted for Latin characters."""
        found: List[Dict[str, Any]] = []

        decoded_domain = domain
        if "xn--" in domain:
            try:
                decoded_domain = idna.decode(domain)
            except Exception:
                decoded_domain = domain

        for idx, char in enumerate(decoded_domain):
            if char in HOMOGLYPH_MAP:
                latin_equiv, char_name = HOMOGLYPH_MAP[char]
                found.append({
                    "position": idx,
                    "char": char,
                    "unicode": f"U+{ord(char):04X}",
                    "latin_equivalent": latin_equiv,
                    "name": char_name,
                })

        return len(found) > 0, found

    @staticmethod
    def analyze_domain_structure(hostname: str) -> Tuple[str, str, List[str]]:
        """Splits hostname into base domain, TLD, and subdomains."""
        parts = hostname.split(".")
        if len(parts) <= 1:
            return hostname, "", []

        tld = parts[-1]
        compound_tlds = {"co.uk", "com.ru", "org.ru", "net.ru", "pp.ua"}
        if len(parts) >= 3 and f"{parts[-2]}.{parts[-1]}" in compound_tlds:
            tld = f"{parts[-2]}.{parts[-1]}"
            base_domain = parts[-3]
            subdomains = parts[:-3]
        else:
            base_domain = parts[-2]
            subdomains = parts[:-2]

        return base_domain, tld, subdomains

    @classmethod
    def scan_url(cls, url: str, lang: str = "en") -> ScanResponse:
        """
        Performs full deterministic, heuristic, and cryptographic scan of a URL.
        Includes SSRF protection, non-standard port checks, and in-memory caching.
        """
        is_ru = (lang == "ru")
        cache_key = f"{url.strip().lower()}:{lang}"
        cached_result = GLOBAL_SCAN_CACHE.get(cache_key)
        if cached_result:
            return cached_result

        original_url, hostname, parsed, port, scheme = cls.normalize_url(url)

        disclaimer_text = (
            "Обратите внимание: отсутствие ссылки в базе угроз не гарантирует стопроцентную безопасность. "
            "Всегда сохраняйте бдительность и используйте двухфакторную аутентификацию (2FA)."
            if is_ru else
            "Notice: The absence of documented threat patterns does not guarantee 100% safety. "
            "Always exercise vigilance and maintain two-factor authentication (2FA)."
        )

        # 0. Check for Dangerous URI Schemes first (SSRF / Exploit vectors like file://, gopher://, dict://)
        if scheme in DANGEROUS_SCHEMES:
            res = ScanResponse(
                original_url=original_url,
                normalized_url=parsed.geturl(),
                domain=hostname or "",
                risk_score=100,
                risk_level="CRITICAL",
                status_label="Высокий риск" if is_ru else "High Risk",
                verdict=(
                    f"КРИТИЧЕСКАЯ УГРОЗА: запрещённый или опасный сетевой протокол '{scheme}://'."
                    if is_ru else
                    f"CRITICAL THREAT: forbidden or dangerous protocol '{scheme}://'."
                ),
                is_official_domain=False,
                matched_target=None,
                scheme=scheme,
                port=port,
                is_non_standard_port=False,
                is_private_or_internal=True,
                flags=[
                    ScanFlag(
                        id="dangerous_scheme",
                        severity="CRITICAL",
                        name="Опасная схема URI (SSRF / Эксплойт)" if is_ru else "Dangerous URI Scheme (SSRF / Exploit)",
                        description=(
                            f"Использована нестандартная схема '{scheme}://'. Игровые сайты используют исключительно https:// или http://."
                            if is_ru else
                            f"Non-standard URI scheme '{scheme}://' detected. Legitimate gaming resources strictly use https:// or http://."
                        )
                    )
                ],
                details=ScanAnalysisDetails(
                    scheme=scheme,
                    port=port,
                    is_private_or_internal=True
                ),
                recommendations=[
                    "КАТЕГОРИЧЕСКИ запрещено переходить по ссылкам с протоколами прямого доступа к файловой системе или внутренним сервисам."
                    if is_ru else
                    "Never follow links using local filesystem or direct protocol probing schemes."
                ],
                disclaimer=disclaimer_text,
                cached=False,
                scan_timestamp=datetime.now(timezone.utc).isoformat(),
            )
            GLOBAL_SCAN_CACHE.set(cache_key, res)
            return res

        # 0b. Check for empty or invalid format
        if not hostname:
            res = ScanResponse(
                original_url=original_url,
                normalized_url=parsed.geturl(),
                domain="",
                risk_score=95,
                risk_level="CRITICAL",
                status_label="Недостаточно данных для вывода" if is_ru else "Insufficient Data",
                verdict="Некорректный или неразрешимый URL-адрес." if is_ru else "Invalid or unresolvable URL format.",
                is_official_domain=False,
                matched_target=None,
                scheme=scheme,
                port=port,
                is_non_standard_port=False,
                is_private_or_internal=False,
                flags=[
                    ScanFlag(
                        id="invalid_format",
                        severity="CRITICAL",
                        name="Недопустимый формат" if is_ru else "Invalid Format",
                        description="Строка не содержит корректного доменного имени." if is_ru else "The input does not contain a valid domain name."
                    )
                ],
                details=ScanAnalysisDetails(scheme=scheme, port=port),
                recommendations=["Никогда не переходите по повреждённым ссылкам." if is_ru else "Never open corrupted or malformed links."],
                disclaimer=disclaimer_text,
                cached=False,
                scan_timestamp=datetime.now(timezone.utc).isoformat(),
            )
            GLOBAL_SCAN_CACHE.set(cache_key, res)
            return res

        flags: List[ScanFlag] = []
        recommendations: List[str] = []
        risk_score = 0
        matched_target: Optional[str] = None
        is_official = False

        # 1. Scheme Check (Prevent dangerous schemes / SSRF vectors)
        if scheme in DANGEROUS_SCHEMES:
            risk_score += 100
            flags.append(
                ScanFlag(
                    id="dangerous_scheme",
                    severity="CRITICAL",
                    name="Опасная схема URI (SSRF / Эксплойт)" if is_ru else "Dangerous URI Scheme (SSRF / Exploit)",
                    description=(
                        f"Использована нестандартная схема '{scheme}://'. Игровые сайты используют исключительно https:// или http://."
                        if is_ru else
                        f"Non-standard URI scheme '{scheme}://' detected. Legitimate gaming resources strictly use https:// or http://."
                    )
                )
            )

        # 2. SSRF, Private IP, Loopback & Cloud Metadata Check
        is_ip, is_internal_ip, ip_desc = check_ip_ssrf_safety(hostname)
        if is_internal_ip:
            risk_score += 100
            flags.append(
                ScanFlag(
                    id="ssrf_internal_target",
                    severity="CRITICAL",
                    name="Попытка обращения к внутреннему адресу (SSRF)" if is_ru else "Internal Target Probe (SSRF Risk)",
                    description=(
                        f"Адрес указывает на внутреннюю сеть, локальный хост или сервис метаданных ({ip_desc}). Доступ заблокирован."
                        if is_ru else
                        f"The host targets internal network space, loopback, or cloud metadata ({ip_desc}). Address blocked."
                    )
                )
            )
            recommendations.append(
                "КАТЕГОРИЧЕСКИ запрещено переходить по ссылкам, указывающим на локальные или служебные адреса."
                if is_ru else
                "Never interact with links pointing toward internal network addresses."
            )

        # 3. Non-Standard Port Check
        is_non_standard_port = False
        if port is not None and port not in (80, 443):
            is_non_standard_port = True
            risk_score += 25
            flags.append(
                ScanFlag(
                    id="non_standard_port",
                    severity="HIGH" if port in (22, 23, 3389, 6379, 27017, 8080) else "MEDIUM",
                    name=f"Нестандартный сетевой порт (:{port})" if is_ru else f"Non-Standard Port (:{port})",
                    description=(
                        f"Сайт использует порт :{port}. Официальные игровые платформы никогда не запрашивают авторизацию на нестандартных портах."
                        if is_ru else
                        f"The resource specifies port :{port}. Official gaming platforms never host authentication on non-standard ports."
                    )
                )
            )

        # 4. Exact match with official gaming platforms
        for platform_key, platform in OFFICIAL_PLATFORMS.items():
            for official_dom in platform["domains"]:
                if hostname == official_dom or hostname.endswith("." + official_dom):
                    is_official = True
                    matched_target = platform["name"]
                    break
            if is_official:
                break

        if is_official and not is_internal_ip and scheme not in DANGEROUS_SCHEMES:
            flags.append(
                ScanFlag(
                    id="official_domain",
                    severity="INFO",
                    name="Официальный домен" if is_ru else "Official Domain",
                    description=(
                        f"Домен {hostname} является подлинным и принадлежит {matched_target}."
                        if is_ru else
                        f"The domain {hostname} is authentic and officially operated by {matched_target}."
                    )
                )
            )
            recommendations.append(
                "Домен официальный. Убедитесь, что соединение защищено протоколом HTTPS."
                if is_ru else
                "Domain is authentic. Ensure the connection uses secure HTTPS."
            )
            res = ScanResponse(
                original_url=original_url,
                normalized_url=parsed.geturl(),
                domain=hostname,
                risk_score=0,
                risk_level="SAFE",
                status_label="Официальный проверенный ресурс" if is_ru else "Official Verified Resource",
                verdict=(
                    f"Безопасно. Это подтверждённый официальный ресурс {matched_target}."
                    if is_ru else
                    f"Safe. This is a verified official resource of {matched_target}."
                ),
                is_official_domain=True,
                matched_target=matched_target,
                scheme=scheme,
                port=port,
                is_non_standard_port=is_non_standard_port,
                is_private_or_internal=is_internal_ip,
                flags=flags,
                details=ScanAnalysisDetails(
                    scheme=scheme,
                    port=port,
                    is_non_standard_port=is_non_standard_port,
                    is_ip_address=is_ip,
                    is_private_or_internal=is_internal_ip
                ),
                recommendations=recommendations,
                disclaimer=disclaimer_text,
                cached=False,
                scan_timestamp=datetime.now(timezone.utc).isoformat(),
            )
            GLOBAL_SCAN_CACHE.set(cache_key, res)
            return res

        # 5. Domain structural breakdown
        base_domain, tld, subdomains = cls.analyze_domain_structure(hostname)

        # 6. Homoglyph / Punycode Attack Check
        has_homoglyphs, homoglyphs = cls.detect_homoglyphs(hostname)
        if has_homoglyphs:
            risk_score += 85
            chars_str = ", ".join(f"{h['char']} ({h['name']})" for h in homoglyphs[:3])
            flags.append(
                ScanFlag(
                    id="homoglyph_attack",
                    severity="CRITICAL",
                    name="Атака подменой символов (Homoglyph / Punycode)" if is_ru else "Homoglyph / Punycode Spoofing Attack",
                    description=(
                        f"В имени домена обнаружены скрытые нелатинские символы: {chars_str}. Это классический признак фишингового сайта-двойника!"
                        if is_ru else
                        f"Domain contains hidden non-Latin characters: {chars_str}. This is a definitive hallmark of a deceptive phishing clone!"
                    )
                )
            )
            recommendations.append(
                "КАТЕГОРИЧЕСКИ НЕ ВВОДИТЕ логины, пароли и коды аутентификатора на этом сайте!"
                if is_ru else
                "DO NOT enter passwords, Steam Guard, or 2FA codes on this website!"
            )

        # 7. Subdomain Brand Hijack / Impersonation
        for platform_key, platform in OFFICIAL_PLATFORMS.items():
            for official_dom in platform["domains"]:
                clean_official = official_dom.split(".")[0]
                for sub in subdomains:
                    if official_dom in sub or (len(clean_official) >= 5 and clean_official in sub):
                        risk_score += 75
                        matched_target = platform["name"]
                        flags.append(
                            ScanFlag(
                                id="subdomain_impersonation",
                                severity="CRITICAL",
                                name="Маскировка бренда в поддомене" if is_ru else "Subdomain Brand Impersonation",
                                description=(
                                    f"Домен использует имя известной платформы '{platform['name']}' в качестве поддомена ({sub}), но размещён на стороннем сервере ({base_domain}.{tld})."
                                    if is_ru else
                                    f"The URL embeds the trusted brand '{platform['name']}' as a subdomain ({sub}), but points to an unrelated host ({base_domain}.{tld})."
                                )
                            )
                        )
                        break

        # 8. Typosquatting / Edit Distance Analysis
        typosquatting_detected = False
        min_distance = 999

        for platform_key, platform in OFFICIAL_PLATFORMS.items():
            for official_dom in platform["domains"]:
                official_base = official_dom.split(".")[0]
                dist = damerau_levenshtein_distance(base_domain, official_base)

                if dist < min_distance:
                    min_distance = dist

                if (1 <= dist <= 2 and len(official_base) >= 5) or (
                    official_base in base_domain and base_domain != official_base
                ):
                    typosquatting_detected = True
                    matched_target = platform["name"]
                    risk_score += 70
                    flags.append(
                        ScanFlag(
                            id="typosquatting_detected",
                            severity="CRITICAL",
                            name="Тайпосквоттинг (Имитация бренда)" if is_ru else "Typosquatting (Brand Name Mimicry)",
                            description=(
                                f"Домен '{base_domain}' намеренно имитирует официальный адрес '{official_dom}' (дистанция изменений: {dist})."
                                if is_ru else
                                f"Domain '{base_domain}' mimics official platform '{official_dom}' (edit distance: {dist})."
                            )
                        )
                    )
                    break
            if typosquatting_detected:
                break

        # 9. Raw IP Host Detection
        if is_ip and not is_internal_ip:
            risk_score += 40
            flags.append(
                ScanFlag(
                    id="raw_ip_host",
                    severity="HIGH",
                    name="Прямой публичный IP-адрес" if is_ru else "Raw Public IP Address Host",
                    description=(
                        f"Сайт размещён на прямом IP-адресе {hostname}. Официальные сервисы используют зарегистрированные доменные имена с валидным SSL."
                        if is_ru else
                        f"The host uses a raw IP address {hostname}. Authentic gaming platforms never mandate login on raw IP hosts."
                    )
                )
            )

        # 10. Suspicious TLD Detection
        suspicious_tld_found = tld in SUSPICIOUS_TLDS
        if suspicious_tld_found:
            risk_score += 35
            flags.append(
                ScanFlag(
                    id="suspicious_tld",
                    severity="HIGH" if matched_target else "MEDIUM",
                    name=f"Опасная доменная зона (.{tld})" if is_ru else f"High-Risk TLD (.{tld})",
                    description=(
                        f"Доменная зона .{tld} имеет крайне высокую статистику злоупотреблений в фишинговых кампаниях."
                        if is_ru else
                        f"The .{tld} top-level domain exhibits high abuse rates in automated phishing campaigns."
                    )
                )
            )

        # 11. Abused Hosting Services
        for abused_host in ABUSED_HOSTS:
            if hostname == abused_host or hostname.endswith("." + abused_host):
                risk_score += 45
                flags.append(
                    ScanFlag(
                        id="abused_free_host",
                        severity="HIGH",
                        name="Бесплатный хостинг / туннель" if is_ru else "Free Hosting / Tunneling Service",
                        description=(
                            f"Ссылка ведёт на бесплатную платформу хостинга ({abused_host}), часто используемую злоумышленниками для обхода фильтров."
                            if is_ru else
                            f"The URL points to a free hosting or tunneling service ({abused_host}), frequently leveraged by threat actors."
                        )
                    )
                )
                break

        # 12. Gaming Scam Keywords Analysis
        detected_keywords: List[str] = []
        full_text_to_scan = f"{hostname} {parsed.path} {parsed.query}".lower()

        for item in SCAM_KEYWORDS:
            kw = item["keyword"]
            if kw in full_text_to_scan:
                detected_keywords.append(kw)
                risk_score += item["weight"]
                flags.append(
                    ScanFlag(
                        id=f"keyword_{kw.replace('-', '_')}",
                        severity="HIGH" if item["weight"] >= 25 else "MEDIUM",
                        name=f"Маркер скама: {kw}" if is_ru else f"Scam Keyword: {kw}",
                        description=item["desc_ru"] if is_ru else item["desc_en"]
                    )
                )

        # 13. Dangerous File Extension in Path
        for ext in DANGEROUS_EXTENSIONS:
            if parsed.path.lower().endswith(ext):
                risk_score += 65
                flags.append(
                    ScanFlag(
                        id="executable_payload",
                        severity="CRITICAL",
                        name=f"Опасный исполняемый файл ({ext})" if is_ru else f"Dangerous Executable Payload ({ext})",
                        description=(
                            f"Ссылка ведёт напрямую на исполняемый файл {ext}. Это распространенный способ распространения стилеров сессий."
                            if is_ru else
                            f"The URL points directly to an executable file ({ext}), a frequent vector for session hijackers."
                        )
                    )
                )
                break

        # 14. Unencrypted HTTP Scheme
        if scheme == "http" and not is_ip:
            risk_score += 15
            flags.append(
                ScanFlag(
                    id="unencrypted_http",
                    severity="LOW",
                    name="Незащищённое HTTP соединение" if is_ru else "Unencrypted HTTP Protocol",
                    description=(
                        "Соединение не зашифровано сертификатом SSL/TLS. Любые передаваемые данные могут быть перехвачены."
                        if is_ru else
                        "The connection lacks SSL/TLS encryption. Any credentials transmitted can be intercepted."
                    )
                )
            )

        # 15. Excessive Subdomain Depth
        if len(subdomains) >= 3:
            risk_score += 20
            flags.append(
                ScanFlag(
                    id="excessive_subdomains",
                    severity="MEDIUM",
                    name="Аномальная структура поддоменов" if is_ru else "Abnormal Subdomain Depth",
                    description=(
                        f"Обнаружено {len(subdomains)} уровней поддоменов. Часто применяется для запутывания адресной строки в мобильных браузерах."
                        if is_ru else
                        f"Detected {len(subdomains)} subdomain levels. Often employed to obfuscate the real domain in mobile address bars."
                    )
                )
            )

        # Cap score between 0 and 100
        risk_score = min(max(risk_score, 0), 100)

        # Determine level & nuanced localized label
        if risk_score >= 75:
            risk_level = "CRITICAL"
            status_label = "Высокий риск" if is_ru else "High Risk"
            verdict = (
                "КРИТИЧЕСКАЯ УГРОЗА! Обнаружены явные признаки фишинга или вредоносного сайта."
                if is_ru else
                "CRITICAL THREAT! Clear indicators of phishing or malicious activity detected."
            )
            recommendations.extend([
                "Немедленно закройте страницу и не переходите по ссылке." if is_ru else "Immediately close the page and do not follow the link.",
                "Никогда не вводите логин, пароль, почту или коды Steam Guard / Supercell ID." if is_ru else "Never enter passwords, email, or 2FA/Steam Guard codes.",
                "Если вы уже ввели данные — немедленно смените пароль на официальном сайте и сбросьте API-ключи." if is_ru else "If you already submitted data, reset your credentials on the official site and revoke API keys."
            ])
        elif risk_score >= 40:
            risk_level = "SUSPICIOUS"
            status_label = "Подозрительная ссылка" if is_ru else "Suspicious Link"
            verdict = (
                "ПОДОЗРИТЕЛЬНЫЙ РЕСУРС. Присутствуют подозрительные маркеры и факторы риска."
                if is_ru else
                "SUSPICIOUS RESOURCE. Multiple anomalies and risk factors identified."
            )
            recommendations.extend([
                "Проявляйте максимальную осторожность. Не скачивайте предложенные файлы." if is_ru else "Exercise high caution. Do not download files or extensions.",
                "Проверьте официальный источник предложения или обратитесь в службу поддержки платформы." if is_ru else "Verify the promotion through official channels or platform support."
            ])
        elif risk_score >= 20:
            risk_level = "CAUTION"
            status_label = "Требуется внимание" if is_ru else "Caution Advised"
            verdict = (
                "ТРЕБУЕТСЯ ВНИМАНИЕ. Сайт содержит небольшие отклонения от стандартов безопасности."
                if is_ru else
                "ATTENTION ADVISED. Minor anomalies observed, exercise general caution."
            )
            recommendations.append(
                "Убедитесь в благонадёжности ресурса перед регистрацией или платежами."
                if is_ru else
                "Verify resource credibility before submitting payments or signing in."
            )
        else:
            risk_level = "SAFE"
            status_label = "Признаков угрозы не обнаружено" if is_ru else "No Threats Detected"
            verdict = (
                "Явных признаков игрового фишинга или атак не обнаружено."
                if is_ru else
                "No evident indicators of gaming phishing or deception detected."
            )
            recommendations.append(
                "Всегда сохраняйте бдительность и используйте двухфакторную аутентификацию (2FA)."
                if is_ru else
                "Always stay vigilant and keep two-factor authentication (2FA) active."
            )

        details = ScanAnalysisDetails(
            has_homoglyphs=has_homoglyphs,
            homoglyphs_detected=homoglyphs,
            typosquatting_detected=typosquatting_detected,
            typosquatting_target=matched_target,
            edit_distance=min_distance if typosquatting_detected else None,
            suspicious_tld=suspicious_tld_found,
            tld=tld,
            is_ip_address=is_ip,
            is_private_or_internal=is_internal_ip,
            is_non_standard_port=is_non_standard_port,
            port=port,
            scheme=scheme,
            subdomain_depth=len(subdomains),
            subdomains=subdomains,
            detected_keywords=detected_keywords,
        )

        res = ScanResponse(
            original_url=original_url,
            normalized_url=parsed.geturl(),
            domain=hostname,
            risk_score=risk_score,
            risk_level=risk_level,
            status_label=status_label,
            verdict=verdict,
            is_official_domain=is_official,
            matched_target=matched_target,
            scheme=scheme,
            port=port,
            is_non_standard_port=is_non_standard_port,
            is_private_or_internal=is_internal_ip,
            flags=flags,
            details=details,
            recommendations=recommendations,
            disclaimer=disclaimer_text,
            cached=False,
            scan_timestamp=datetime.now(timezone.utc).isoformat(),
        )
        GLOBAL_SCAN_CACHE.set(cache_key, res)
        return res

    @classmethod
    def get_supported_targets(cls) -> List[Dict[str, Any]]:
        """Returns the list of monitored official gaming ecosystems."""
        return [
            {
                "key": key,
                "name": data["name"],
                "category": data["category"],
                "official_domains": sorted(list(data["domains"])),
            }
            for key, data in OFFICIAL_PLATFORMS.items()
        ]
