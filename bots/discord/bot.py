"""
SafeInGame Discord Bot Integration
Provides slash commands and threat analysis inside Discord gaming communities.
"""

import os
import sys

# Ensure backend modules can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'backend')))

try:
    from app.services.scanner_service import ScannerService
    from app.services.detective_service import analyze_scam_content
except ImportError:
    ScannerService = None
    analyze_scam_content = None


class SafeInGameDiscordBot:
    def __init__(self, token: str = "SIMULATED_DISCORD_TOKEN"):
        self.token = token

    def command_scan(self, url: str) -> dict:
        """Slash command /scan <url>"""
        if not url:
            return {"title": "Error", "description": "Please provide a URL to inspect."}

        if ScannerService:
            res = ScannerService.scan_url(url=url, lang="en")
            color = 0xef4444 if res.risk_level in ("CRITICAL", "SUSPICIOUS") else 0x10b981
            return {
                "title": f"SafeInGame Link Audit: {res.domain}",
                "color": color,
                "fields": [
                    {"name": "Risk Level", "value": f"{res.risk_level} ({res.risk_score}/100)", "inline": True},
                    {"name": "Official Platform", "value": "Yes" if res.is_official_domain else "No", "inline": True},
                    {"name": "Verdict", "value": res.verdict, "inline": False},
                ]
            }
        return {"title": "Scan simulated", "description": f"URL {url} checked."}

    def command_detective(self, text: str) -> dict:
        """Slash command /detective <text>"""
        if not text:
            return {"title": "Error", "description": "Please provide text or an offer message to analyze."}

        if analyze_scam_content:
            data = analyze_scam_content(text=text, lang="en")
            color = 0xef4444 if data["risk_category"] in ("CRITICAL", "HIGH") else 0x10b981
            return {
                "title": f"SafeInGame AI Detective: {data['risk_category']}",
                "color": color,
                "description": data["attack_scenario"],
                "fields": [
                    {"name": "Threat Score", "value": f"{data['threat_score']}/100", "inline": True},
                    {"name": "Warning Signs Count", "value": str(len(data.get("indicators", []))), "inline": True},
                    {"name": "Primary Recommendation", "value": data.get("recommendations", ["Stay alert"])[0], "inline": False},
                ]
            }
        return {"title": "Detective simulated", "description": "Message analyzed."}

    def command_rescue(self, game: str) -> dict:
        """Slash command /rescue <game>"""
        return {
            "title": f"Emergency Account Rescue: {game.upper()}",
            "color": 0xef4444,
            "description": f"Access the interactive triage wizard to recover your {game} account safely:",
            "fields": [
                {"name": "Official Portal", "value": f"https://safeingame.org/en/recovery/?game={game}"}
            ]
        }


if __name__ == "__main__":
    bot = SafeInGameDiscordBot()
    print("Discord Bot Command /scan Result:")
    print(bot.command_scan("https://steamcommunnity.com"))
    print("\nDiscord Bot Command /detective Result:")
    print(bot.command_detective("Steam admin says ban in 24 hours, send code"))
