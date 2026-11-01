"""
Test suite for SafeInGame Telegram and Discord Bots
"""

import pytest
from bots.telegram.bot import SafeInGameTelegramBot
from bots.discord.bot import SafeInGameDiscordBot


def test_telegram_bot_handlers():
    bot = SafeInGameTelegramBot()

    # /start
    start_msg = bot.handle_start("TestUser")
    assert "TestUser" in start_msg
    assert "/scan" in start_msg
    assert "/detect" in start_msg

    # /scan
    scan_res = bot.handle_scan("https://steamcommunnity.com")
    assert "Scan Result" in scan_res
    assert "steamcommunnity.com" in scan_res

    # /detect
    detect_res = bot.handle_detect("Valve staff: your account will be banned in 24 hours send SMS code")
    assert "AI Detective" in detect_res
    assert "CRITICAL" in detect_res or "HIGH" in detect_res

    # /rescue
    rescue_res = bot.handle_rescue("cs2")
    assert "CS2 / Steam" in rescue_res
    assert "steamcommunity.com/dev/apikey" in rescue_res

    # /radar
    radar_res = bot.handle_radar()
    assert "Scam Radar" in radar_res
    assert "Counter-Strike 2" in radar_res


def test_discord_bot_commands():
    bot = SafeInGameDiscordBot()

    # /scan
    scan_dict = bot.command_scan("https://steamcommunnity.com")
    assert "Link Audit" in scan_dict["title"]
    assert scan_dict["color"] == 0xef4444

    # /detective
    det_dict = bot.command_detective("Steam admin says ban in 24 hours, send code")
    assert "AI Detective" in det_dict["title"]
    assert det_dict["color"] == 0xef4444

    # /rescue
    res_dict = bot.command_rescue("roblox")
    assert "ROBLOX" in res_dict["title"]
