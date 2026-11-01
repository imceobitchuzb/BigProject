import re
import os
import json
from typing import Dict, Any, List, Optional
from urllib.parse import urlparse
from app.services.scanner_service import ScannerService


# Sensitive pattern filters for anti-doxxing & privacy
SENSITIVE_PATTERNS = [
    (re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'), '[REDACTED EMAIL]'),
    (re.compile(r'\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b'), '[REDACTED PHONE]'),
    (re.compile(r'\b(?:\d{4}[-\s]?){3}\d{4}\b'), '[REDACTED CARD]'),
    (re.compile(r'password\s*[:=]\s*[^\s]+', re.IGNORECASE), 'password: [REDACTED]'),
]


RED_FLAG_PATTERNS = [
    {
        "category": "URGENCY",
        "weight": 25,
        "regex": re.compile(r'(banned\s+within|suspended\s+in|24\s*hours?|permanently\s+deleted|immediate\s+action|urgent|last\s+chance|срочно|забанят|блокировка\s+через|осталось\s+\d+\s+час)', re.IGNORECASE),
        "title_en": "Artificial Urgency & Threat of Ban",
        "title_ru": "Искусственная срочность и угроза блокировки",
        "description_en": "Scammers induce panic by claiming your account will be banned or deleted if you do not comply immediately.",
        "description_ru": "Мошенники вызывают панику, заявляя о неминуемом бане или удалении аккаунта, если вы не выполните их требования прямо сейчас.",
    },
    {
        "category": "AUTHORITY_IMPERSONATION",
        "weight": 30,
        "regex": re.compile(r'(valve\s+staff|steam\s+(?:support|admin|moderator)|roblox\s+(?:staff|admin)|supercell\s+(?:support|agent)|discord\s+(?:trust|safety|staff)|техподдержк[аи]|администраци[яи]|модератор\s+steam)', re.IGNORECASE),
        "title_en": "Impersonation of Official Staff or Support",
        "title_ru": "Подделка под официальную поддержку или администрацию",
        "description_en": "Official support staff NEVER contact gamers through Discord direct messages, Steam chat, or in-game lobbies.",
        "description_ru": "Официальные сотрудники Valve, Discord, Supercell или Roblox НИКОГДА не пишут в личные сообщения Discord или чат игры.",
    },
    {
        "category": "CODE_INTERCEPTION",
        "weight": 35,
        "regex": re.compile(r'(send\s+(?:me\s+)?(?:the\s+)?(?:6-digit|sms|code|auth|token)|verification\s+code|скажи\s+код|код\s+из\s+смс|код\s+подтверждения|\.ROBLOSECURITY|har\s+file|curl\s+request)', re.IGNORECASE),
        "title_en": "Attempted Verification Code or Session Theft",
        "title_ru": "Попытка перехвата проверочного кода или токена",
        "description_en": "Requesting a verification code, SMS code, or browser session token grants the attacker full control of your account.",
        "description_ru": "Запрос одноразового кода из SMS/email или сессионных куки позволяет злоумышленнику полностью захватить аккаунт.",
    },
    {
        "category": "UNREALISTIC_OFFER",
        "weight": 20,
        "regex": re.compile(r'(free\s+(?:robux|v-bucks|knife|skins?|gems?|uc)|бесплатн(?:ые|ый)\s+(?:робуксы?|гемы?|скин|нож|uc)|giveaway\s+winner|you\s+won|выиграл\s+в\s+раздаче|подарок\s+nitro|free\s+nitro)', re.IGNORECASE),
        "title_en": "Unrealistic Reward / Fake Giveaway",
        "title_ru": "Нереалистичная награда / Фальшивая раздача",
        "description_en": "Promises of free in-game currency or valuable items are designed to lower your vigilance before theft.",
        "description_ru": "Обещания бесплатной валюты или дорогих скинов используются, чтобы усыпить бдительность перед кражей данных.",
    },
    {
        "category": "ACCIDENTAL_REPORT",
        "weight": 30,
        "regex": re.compile(r'(accidentally\s+reported|mistakenly\s+reported|случайно\s+пожаловался|по\s+ошибке\s+кинул\s+репорт|illegal\s+items|duped\s+items)', re.IGNORECASE),
        "title_en": "Classic 'Accidental Report' Social Engineering",
        "title_ru": "Схема 'Случайный репорт / жалоба'",
        "description_en": "Claiming to have accidentally reported your account is a textbook scam designed to connect you to a fake moderator.",
        "description_ru": "История про 'случайную жалобу' — классическая схема, чтобы связать вас с фальшивым 'модератором' в Discord.",
    },
    {
        "category": "TOURNAMENT_VOTE",
        "weight": 25,
        "regex": re.compile(r'(vote\s+for\s+(?:my\s+)?team|tournament\s+needs|fifth\s+player|проголосуй\s+за\s+команд|не\s+хватает\s+пятого|турнир)', re.IGNORECASE),
        "title_en": "Fake Tournament / Voting Invitation",
        "title_ru": "Фейковый турнир или просьба проголосовать",
        "description_en": "Links to fake tournament sites use phishing forms to steal Steam OpenID sessions or mobile authenticator keys.",
        "description_ru": "Ссылки на турнирные порталы используют поддельные окна авторизации для кражи Steam Guard и сессий.",
    },
]


def sanitize_input(text: str) -> str:
    """Sanitize and strip sensitive identifiable data before analysis."""
    sanitized = text
    for pattern, replacement in SENSITIVE_PATTERNS:
        sanitized = pattern.sub(replacement, sanitized)
    return sanitized


def analyze_scam_content(
    text: Optional[str] = None,
    url: Optional[str] = None,
    image_metadata: Optional[str] = None,
    lang: str = "en"
) -> Dict[str, Any]:
    """
    Comprehensive scam detection engine.
    Analyzes message context, suspicious URLs, and red flags.
    """
    combined_text = ""
    if text:
        combined_text += text + " "
    if url:
        combined_text += url + " "
    if image_metadata:
        combined_text += image_metadata + " "

    cleaned_text = sanitize_input(combined_text.strip())

    detected_indicators = []
    total_score = 0
    detected_categories = set()

    # 1. Analyze text red flags
    for item in RED_FLAG_PATTERNS:
        matches = item["regex"].findall(cleaned_text)
        if matches:
            total_score += item["weight"]
            detected_categories.add(item["category"])
            detected_indicators.append({
                "category": item["category"],
                "title": item["title_ru"] if lang == "ru" else item["title_en"],
                "description": item["description_ru"] if lang == "ru" else item["description_en"],
                "matches": [m if isinstance(m, str) else m[0] for m in matches[:3]],
                "severity": "HIGH" if item["weight"] >= 30 else "MEDIUM",
            })

    # 2. Analyze embedded URLs via the Link Scanner engine
    url_scan_results = []
    found_urls = re.findall(r'https?://[^\s<>"]+|www\.[^\s<>"]+', cleaned_text)
    if url and url not in found_urls:
        found_urls.append(url)

    for candidate_url in found_urls[:3]:  # scan up to 3 links safely
        scan_res = ScannerService.scan_url(url=candidate_url, lang=lang)
        url_scan_results.append(scan_res)
        if scan_res.risk_level in ("CRITICAL", "SUSPICIOUS"):
            total_score += 45
            detected_indicators.append({
                "category": "MALICIOUS_LINK",
                "title": "Опасная или фишинговая ссылка" if lang == "ru" else "Dangerous or Phishing URL Detected",
                "description": f"Domain {scan_res.domain} flagged as {scan_res.risk_level}: {scan_res.verdict}",
                "severity": "CRITICAL" if scan_res.risk_level == "CRITICAL" else "HIGH",
            })
        elif scan_res.risk_level == "CAUTION":
            total_score += 20
            detected_indicators.append({
                "category": "SUSPICIOUS_LINK",
                "title": "Подозрительный домен" if lang == "ru" else "Suspicious Domain Detected",
                "description": f"Domain {scan_res.domain} has warnings: {scan_res.verdict}",
                "severity": "MEDIUM",
            })

    # 3. Determine Overall Risk Rating
    if total_score >= 60 or any(ind["severity"] == "CRITICAL" for ind in detected_indicators):
        risk_category = "CRITICAL"
        risk_color = "red"
    elif total_score >= 35 or any(ind["severity"] == "HIGH" for ind in detected_indicators):
        risk_category = "HIGH"
        risk_color = "orange"
    elif total_score > 0:
        risk_category = "MEDIUM"
        risk_color = "yellow"
    else:
        risk_category = "SAFE"
        risk_color = "green"

    # 4. Scenario Synthesis & Recommendations
    attack_scenario = ""
    recommendations = []
    rescue_links = []

    if "CODE_INTERCEPTION" in detected_categories or "AUTHORITY_IMPERSONATION" in detected_categories:
        attack_scenario = (
            "Попытка перехвата учетной записи через психологическое давление и получение одноразового кода."
            if lang == "ru" else
            "Account takeover attempt utilizing social pressure and one-time verification code interception."
        )
        recommendations.extend([
            "Никому не сообщайте коды из SMS или письма" if lang == "ru" else "Never share SMS or email verification codes with anyone.",
            "Немедленно закройте все активные сессии в настройках аккаунта" if lang == "ru" else "Deauthorize all active sessions in your account security settings.",
            "Заблокируйте и пожалуйтесь на профиль собеседника" if lang == "ru" else "Block and report the sender profile immediately."
        ])
    elif "ACCIDENTAL_REPORT" in detected_categories:
        attack_scenario = (
            "Классическая схема 'Случайный репорт'. Собеседник пытается передать вас сообщнику под видом модератора."
            if lang == "ru" else
            "Classic 'Accidental Report' scam. The attacker tries to redirect you to an accomplice posing as support."
        )
        recommendations.extend([
            "Не пишите указанному 'модератору' в Discord" if lang == "ru" else "Do NOT contact the specified 'support moderator' on Discord.",
            "Помните: настоящая поддержка никогда не угрожает удалением в мессенджерах" if lang == "ru" else "Real support never threatens deletion via chat or third-party apps."
        ])
    elif "TOURNAMENT_VOTE" in detected_categories:
        attack_scenario = (
            "Фишинг под предлогом турнира или голосования за команду."
            if lang == "ru" else
            "Phishing disguised as an esports tournament or team voting contest."
        )
        recommendations.extend([
            "Не вводите логин и пароль в всплывающих окнах сторонних сайтов" if lang == "ru" else "Never enter credentials into popups on third-party websites.",
            "Проверьте свой Steam Web API Key на steamcommunity.com/dev/apikey" if lang == "ru" else "Check your Steam Web API Key at steamcommunity.com/dev/apikey."
        ])
    elif risk_category == "SAFE":
        attack_scenario = (
            "Прямых признаков известных игровых атак в тексте не обнаружено."
            if lang == "ru" else
            "No direct indicators of known gaming attack patterns detected in this text."
        )
        recommendations.append(
            "Продолжайте соблюдать базовую гигиену: включите 2FA и не открывайте файлы от незнакомцев"
            if lang == "ru" else
            "Continue following digital hygiene: maintain 2FA and never run downloads from strangers."
        )

    # Relevant rescue guides
    if "cs2" in cleaned_text.lower() or "steam" in cleaned_text.lower() or "valve" in cleaned_text.lower():
        rescue_links.append({"title": "Steam / CS2 Incident Guide", "slug": "cs2-steam", "url": f"/{lang}/recovery/?game=cs2-steam"})
    if "roblox" in cleaned_text.lower() or "robux" in cleaned_text.lower():
        rescue_links.append({"title": "Roblox Account Recovery", "slug": "roblox", "url": f"/{lang}/recovery/?game=roblox"})
    if "brawl" in cleaned_text.lower() or "supercell" in cleaned_text.lower():
        rescue_links.append({"title": "Supercell ID Rescue", "slug": "brawl-stars", "url": f"/{lang}/recovery/?game=brawl-stars"})
    if "minecraft" in cleaned_text.lower():
        rescue_links.append({"title": "Minecraft Microsoft Rescue", "slug": "minecraft", "url": f"/{lang}/recovery/?game=minecraft"})
    if "pubg" in cleaned_text.lower() or "uc" in cleaned_text.lower():
        rescue_links.append({"title": "PUBG Mobile Account Rescue", "slug": "pubg", "url": f"/{lang}/recovery/?game=pubg"})

    return {
        "risk_category": risk_category,
        "risk_color": risk_color,
        "threat_score": min(100, total_score),
        "indicators": detected_indicators,
        "attack_scenario": attack_scenario,
        "recommendations": recommendations,
        "rescue_links": rescue_links,
        "scanned_urls_count": len(url_scan_results),
        "has_sensitive_redaction": cleaned_text != combined_text.strip(),
    }
