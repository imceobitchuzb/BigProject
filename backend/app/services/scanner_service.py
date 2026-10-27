"""
Gaming Phishing & Typosquatting Scanner Engine for SafeInGame.
Analyzes URLs and domains for homoglyph spoofing, typosquatting,
brand impersonation, suspicious TLDs, and known gaming attack vectors.
"""

import math
import re
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


def shannon_entropy(s: str) -> float:
    """Computes Shannon entropy to detect high-randomness generated domains."""
    if not s:
        return 0.0
    probabilities = [s.count(c) / len(s) for c in set(s)]
    return -sum(p * math.log2(p) for p in probabilities)


class ScannerService:
    @staticmethod
    def normalize_url(raw_input: str) -> Tuple[str, str, urllib.parse.ParseResult]:
        """Normalizes user input into a valid URL and extracts the clean hostname."""
        cleaned = raw_input.strip()
        # If no scheme provided, default to http:// to allow parsing
        if not re.match(r"^[a-zA-Z][a-zA-Z0-9+\-.]*://", cleaned):
            url_to_parse = "https://" + cleaned
        else:
            url_to_parse = cleaned

        parsed = urllib.parse.urlparse(url_to_parse)
        hostname = (parsed.hostname or "").lower()

        return cleaned, hostname, parsed

    @staticmethod
    def detect_homoglyphs(domain: str) -> Tuple[bool, List[Dict[str, Any]]]:
        """Detects Cyrillic/Greek Unicode homoglyphs substituted for Latin characters."""
        found: List[Dict[str, Any]] = []

        # Check if domain was Punycode encoded
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
    def analyze_domain_structure(hostname: str) -> Tuple[str, str, List[str], bool]:
        """Splits hostname into base domain, TLD, subdomains, and checks if it's an IP address."""
        # Check if hostname is an IPv4 or IPv6
        is_ip = bool(re.match(r"^(\d{1,3}\.){3}\d{1,3}$", hostname) or ":" in hostname)
        if is_ip:
            return hostname, "", [], True

        parts = hostname.split(".")
        if len(parts) <= 1:
            return hostname, "", [], False

        tld = parts[-1]
        # Handle compound TLDs like .co.uk, .com.ru
        compound_tlds = {"co.uk", "com.ru", "org.ru", "net.ru", "pp.ua"}
        if len(parts) >= 3 and f"{parts[-2]}.{parts[-1]}" in compound_tlds:
            tld = f"{parts[-2]}.{parts[-1]}"
            base_domain = parts[-3]
            subdomains = parts[:-3]
        else:
            base_domain = parts[-2]
            subdomains = parts[:-2]

        return base_domain, tld, subdomains, False

    @classmethod
    def scan_url(cls, url: str, lang: str = "en") -> ScanResponse:
        """Performs full heuristic, cryptographic, and algorithmic scan of a URL."""
        is_ru = (lang == "ru")
        original_url, hostname, parsed = cls.normalize_url(url)

        if not hostname:
            return ScanResponse(
                original_url=original_url,
                normalized_url=parsed.geturl(),
                domain="",
                risk_score=95,
                risk_level="CRITICAL",
                verdict="Некорректный или неразрешимый URL-адрес." if is_ru else "Invalid or unresolvable URL format.",
                is_official_domain=False,
                matched_target=None,
                flags=[
                    ScanFlag(
                        id="invalid_format",
                        severity="CRITICAL",
                        name="Недопустимый формат" if is_ru else "Invalid Format",
                        description="Строка не содержит корректного доменного имени." if is_ru else "The input does not contain a valid domain name."
                    )
                ],
                details=ScanAnalysisDetails(),
                recommendations=["Никогда не переходите по повреждённым ссылкам." if is_ru else "Never open corrupted or malformed links."],
                scan_timestamp=datetime.now(timezone.utc).isoformat(),
            )

        flags: List[ScanFlag] = []
        recommendations: List[str] = []
        risk_score = 0
        matched_target: Optional[str] = None
        is_official = False

        # 1. Exact match with official gaming platforms
        for platform_key, platform in OFFICIAL_PLATFORMS.items():
            for official_dom in platform["domains"]:
                if hostname == official_dom or hostname.endswith("." + official_dom):
                    is_official = True
                    matched_target = platform["name"]
                    break
            if is_official:
                break

        if is_official:
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
            return ScanResponse(
                original_url=original_url,
                normalized_url=parsed.geturl(),
                domain=hostname,
                risk_score=0,
                risk_level="SAFE",
                verdict=(
                    f"Безопасно. Это подтверждённый официальный ресурс {matched_target}."
                    if is_ru else
                    f"Safe. This is a verified official resource of {matched_target}."
                ),
                is_official_domain=True,
                matched_target=matched_target,
                flags=flags,
                details=ScanAnalysisDetails(),
                recommendations=recommendations,
                scan_timestamp=datetime.now(timezone.utc).isoformat(),
            )

        # Domain breakdown
        base_domain, tld, subdomains, is_ip = cls.analyze_domain_structure(hostname)

        # 2. Homoglyph / Punycode Attack Check
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

        # 3. Subdomain Brand Hijack / Impersonation
        # (e.g. steamcommunity.com.scam-server.xyz where steamcommunity is just a subdomain)
        for platform_key, platform in OFFICIAL_PLATFORMS.items():
            for official_dom in platform["domains"]:
                clean_official = official_dom.split(".")[0]
                # Check if full official domain or brand is embedded inside subdomains
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

        # 4. Typosquatting / Edit Distance Analysis
        typosquatting_detected = False
        closest_target = None
        min_distance = 999

        for platform_key, platform in OFFICIAL_PLATFORMS.items():
            for official_dom in platform["domains"]:
                official_base = official_dom.split(".")[0]
                dist = damerau_levenshtein_distance(base_domain, official_base)

                if dist < min_distance:
                    min_distance = dist
                    closest_target = platform["name"]

                # If 1 or 2 character typo, or prefix/suffix variation (e.g. steam-community, roblox-gift)
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

        # 5. IP Address host detection
        if is_ip:
            risk_score += 40
            flags.append(
                ScanFlag(
                    id="raw_ip_host",
                    severity="HIGH",
                    name="Прямой IP-адрес вместо доменного имени" if is_ru else "Raw IP Address Host",
                    description=(
                        f"Сайт размещён на прямом IP-адресе {hostname}. Официальные игровые платформы никогда не используют голые IP-адреса для авторизации."
                        if is_ru else
                        f"The host uses a raw IP address {hostname}. Authentic gaming platforms never use raw IP addresses for login or trading."
                    )
                )
            )

        # 6. Suspicious TLD detection
        suspicious_tld_found = tld in SUSPICIOUS_TLDS
        if suspicious_tld_found:
            risk_score += 35
            flags.append(
                ScanFlag(
                    id="suspicious_tld",
                    severity="HIGH" if matched_target else "MEDIUM",
                    name=f"Опасная доменная зона (.{tld})" if is_ru else f"High-Risk TLD (.{tld})",
                    description=(
                        f"Доменная зона .{tld} имеет крайне высокую статистику злоупотреблений в фишинговых кампаниях и редко используется официальными сервисами."
                        if is_ru else
                        f"The .{tld} top-level domain exhibits high abuse rates in automated phishing campaigns and is not used by genuine gaming services."
                    )
                )
            )

        # 7. Abused hosting services
        for abused_host in ABUSED_HOSTS:
            if hostname == abused_host or hostname.endswith("." + abused_host):
                risk_score += 45
                flags.append(
                    ScanFlag(
                        id="abused_free_host",
                        severity="HIGH",
                        name="Бесплатный хостинг / туннель" if is_ru else "Free Hosting / Tunneling Service",
                        description=(
                            f"Ссылка ведёт на бесплатную платформу хостинга ({abused_host}), часто используемую злоумышленниками для обхода блокировок."
                            if is_ru else
                            f"The URL points to a free hosting or tunneling service ({abused_host}), frequently leveraged by threat actors to evade blocklists."
                        )
                    )
                )
                break

        # 8. Gaming Scam Keywords Analysis
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

        # 9. Dangerous file extension in path
        for ext in DANGEROUS_EXTENSIONS:
            if parsed.path.lower().endswith(ext):
                risk_score += 65
                flags.append(
                    ScanFlag(
                        id="executable_payload",
                        severity="CRITICAL",
                        name=f"Опасный исполняемый файл ({ext})" if is_ru else f"Dangerous Executable Payload ({ext})",
                        description=(
                            f"Ссылка ведёт напрямую на исполняемый файл {ext}. Это распространенный способ распространения вредоносного ПО (стилеров сессий)."
                            if is_ru else
                            f"The URL points directly to an executable file ({ext}), a frequent vector for session hijackers and malware."
                        )
                    )
                )
                break

        # 10. Unencrypted HTTP scheme
        if parsed.scheme.lower() == "http" and not is_ip:
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

        # 11. Subdomain entropy / excessive depth
        if len(subdomains) >= 3:
            risk_score += 20
            flags.append(
                ScanFlag(
                    id="excessive_subdomains",
                    severity="MEDIUM",
                    name="Аномальная структура поддоменов" if is_ru else "Abnormal Subdomain Depth",
                    description=(
                        f"Обнаружено {len(subdomains)} уровней поддоменов. Часто применяется для запутывания мобильных браузеров."
                        if is_ru else
                        f"Detected {len(subdomains)} subdomain levels. Often employed to obfuscate the real domain in mobile address bars."
                    )
                )
            )

        # Cap score between 0 and 100
        risk_score = min(max(risk_score, 0), 100)

        # Determine level & verdict
        if risk_score >= 75:
            risk_level = "CRITICAL"
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
            subdomain_depth=len(subdomains),
            subdomains=subdomains,
            detected_keywords=detected_keywords,
        )

        return ScanResponse(
            original_url=original_url,
            normalized_url=parsed.geturl(),
            domain=hostname,
            risk_score=risk_score,
            risk_level=risk_level,
            verdict=verdict,
            is_official_domain=is_official,
            matched_target=matched_target,
            flags=flags,
            details=details,
            recommendations=recommendations,
            scan_timestamp=datetime.now(timezone.utc).isoformat(),
        )

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
