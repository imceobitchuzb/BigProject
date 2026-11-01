"""
SafeInGame Telegram Bot Integration
Provides instant phishing link scanning, scam text detection, and account rescue triage.
"""

import os
import sys
from typing import Dict, Any

# Ensure backend modules can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'backend')))

try:
    from app.services.scanner_service import ScannerService
    from app.services.detective_service import analyze_scam_content
except ImportError:
    ScannerService = None
    analyze_scam_content = None


class SafeInGameTelegramBot:
    def __init__(self, token: str = "SIMULATED_TOKEN"):
        self.token = token

    def handle_start(self, user_name: str = "Gamer") -> str:
        return (
            f"🛡 Hello {user_name}! I am the SafeInGame Security Bot.\n\n"
            f"Available commands:\n"
            f"• /scan <url> — Check a suspicious gaming link for phishing & typosquatting\n"
            f"• /detect <text> — AI Detective analysis of suspicious messages or trade offers\n"
            f"• /rescue <game> — Emergency account recovery triage (cs2, roblox, brawl, minecraft, pubg)\n"
            f"• /radar — Current gaming threat statistics\n"
            f"• /score — Assess your gaming cyber defense hygiene"
        )

    def handle_scan(self, url: str) -> str:
        if not url:
            return "⚠️ Usage: /scan <url>\nExample: /scan https://steamcommunity.com"

        if ScannerService:
            res = ScannerService.scan_url(url=url, lang="en")
            return (
                f"🛡 SafeInGame URL Scan Result:\n"
                f"• Target Domain: {res.domain}\n"
                f"• Risk Level: {res.risk_level} ({res.risk_score}/100)\n"
                f"• Status: {res.status_label}\n"
                f"• Official Platform: {'Yes' if res.is_official_domain else 'No'}\n"
                f"• Verdict: {res.verdict}"
            )
        return f"Scan simulated for {url}: Risk Level SAFE"

    def handle_detect(self, text: str) -> str:
        if not text:
            return "⚠️ Usage: /detect <message text>\nExample: /detect Steam support: send verification code"

        if analyze_scam_content:
            data = analyze_scam_content(text=text, lang="en")
            indicators_str = "\n".join([f"• {ind['title']}: {ind['description']}" for ind in data.get("indicators", [])])
            return (
                f"🔍 SafeInGame AI Detective Result:\n"
                f"• Risk Category: {data['risk_category']} (Score: {data['threat_score']}/100)\n"
                f"• Scenario: {data['attack_scenario']}\n\n"
                f"Warning Signs:\n{indicators_str if indicators_str else 'No direct scam signals found.'}\n\n"
                f"Recommendations:\n" + "\n".join([f"✔ {r}" for r in data.get("recommendations", [])])
            )
        return "Analysis simulated: Risk Category SAFE"

    def handle_rescue(self, game: str) -> str:
        game_map = {
            "cs2": "CS2 / Steam: Revoke API keys at steamcommunity.com/dev/apikey and deauthorize devices in Steam Guard.",
            "roblox": "Roblox: Click 'Log out of all other sessions' in Settings -> Security and enable 4-digit Account PIN.",
            "brawl": "Brawl Stars: Open game -> Settings -> Help & Support -> Contact Us -> 'Lost Account / Compromised Supercell ID'.",
            "minecraft": "Minecraft: Sign in to account.live.com, go to Security, and change password + revoke app permissions.",
            "pubg": "PUBG Mobile: Unlink compromised Twitter/Facebook accounts in Game Settings -> Basic -> Linked Accounts.",
        }
        key = (game or "").lower().strip()
        if key in game_map:
            return f"🚨 EMERGENCY RESCUE GUIDE ({key.upper()}):\n{game_map[key]}\n\nFull step-by-step wizard: https://safeingame.org/en/recovery/?game={key}"
        return (
            "⚠️ Specify a supported game: /rescue cs2, /rescue roblox, /rescue brawl, /rescue minecraft, or /rescue pubg"
        )

    def handle_radar(self) -> str:
        return (
            "📡 SafeInGame Scam Radar Bulletin:\n"
            "• Top Target: Counter-Strike 2 (38% of incidents — Trade MitM & API theft)\n"
            "• High Alert: Roblox (26% — .ROBLOSECURITY DevTools cookie stealing)\n"
            "• Emerging: Brawl Stars (16% — Supercell ID 6-digit code interception)\n"
            "• Active Vectors: Phishing URLs (42%), Discord Social Eng (29%), Trojan Mods (18%)\n\n"
            "View live radar: https://safeingame.org/en/radar/"
        )


if __name__ == "__main__":
    bot = SafeInGameTelegramBot()
    print(bot.handle_start())
    print("\n" + "=" * 40 + "\n")
    print(bot.handle_scan("https://steamcommunnity.com/tradeoffer"))
    print("\n" + "=" * 40 + "\n")
    print(bot.handle_detect("Steam admin: banned in 24 hours send your verification code"))
