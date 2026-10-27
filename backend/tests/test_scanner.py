import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_scanner_official_steam_domain():
    response = client.post(
        "/api/v1/scanner/check",
        json={"url": "https://steamcommunity.com/id/gaben", "lang": "en"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["risk_score"] == 0
    assert data["risk_level"] == "SAFE"
    assert data["is_official_domain"] is True
    assert "Steam" in data["matched_target"]


def test_scanner_official_roblox_domain():
    response = client.post(
        "/api/v1/scanner/check",
        json={"url": "https://www.roblox.com/games", "lang": "ru"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["risk_score"] == 0
    assert data["risk_level"] == "SAFE"
    assert data["is_official_domain"] is True
    assert "Roblox" in data["matched_target"]
    assert "Безопасно" in data["verdict"]


def test_scanner_typosquatting_steam():
    # Double 'i' in steamcommunity
    response = client.post(
        "/api/v1/scanner/check",
        json={"url": "https://steamcommuniity.com/tradeoffer/new", "lang": "en"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["risk_score"] >= 70
    assert data["risk_level"] in ["CRITICAL", "SUSPICIOUS"]
    assert data["is_official_domain"] is False
    flag_ids = [f["id"] for f in data["flags"]]
    assert "typosquatting_detected" in flag_ids


def test_scanner_homoglyph_cyrillic_spoofing():
    # Cyrillic 'а' (U+0430) instead of Latin 'a'
    cyrillic_steam = "https://ste\u0430mcommunity.com/login"
    response = client.post(
        "/api/v1/scanner/check",
        json={"url": cyrillic_steam, "lang": "ru"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["risk_score"] >= 80
    assert data["risk_level"] == "CRITICAL"
    assert data["details"]["has_homoglyphs"] is True
    flag_ids = [f["id"] for f in data["flags"]]
    assert "homoglyph_attack" in flag_ids
    assert "КРИТИЧЕСКАЯ УГРОЗА" in data["verdict"]


def test_scanner_subdomain_brand_impersonation():
    # Attacker uses steamcommunity.com as subdomain on malicious .xyz domain
    fake_subdomain_url = "https://steamcommunity.com.trade-skins.xyz/claim"
    response = client.post(
        "/api/v1/scanner/check",
        json={"url": fake_subdomain_url, "lang": "en"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["risk_score"] >= 75
    assert data["risk_level"] == "CRITICAL"
    flag_ids = [f["id"] for f in data["flags"]]
    assert "subdomain_impersonation" in flag_ids


def test_scanner_scam_keywords_and_tld():
    url = "http://free-skins-knife-giveaway.click/claim-bonus"
    response = client.post(
        "/api/v1/scanner/check",
        json={"url": url, "lang": "en"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["risk_score"] >= 50
    assert data["details"]["suspicious_tld"] is True
    assert "free-skins" in data["details"]["detected_keywords"]


def test_scanner_executable_malware_file():
    url = "https://discord-tournament-setup.com/client_verification.exe"
    response = client.post(
        "/api/v1/scanner/check",
        json={"url": url, "lang": "en"}
    )
    assert response.status_code == 200
    data = response.json()
    flag_ids = [f["id"] for f in data["flags"]]
    assert "executable_payload" in flag_ids


def test_scanner_raw_ip_address():
    url = "http://194.26.29.11/steam/login"
    response = client.post(
        "/api/v1/scanner/check",
        json={"url": url, "lang": "en"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["details"]["is_ip_address"] is True
    flag_ids = [f["id"] for f in data["flags"]]
    assert "raw_ip_host" in flag_ids


def test_scanner_monitored_targets_endpoint():
    response = client.get("/api/v1/scanner/targets")
    assert response.status_code == 200
    data = response.json()
    assert "official_platforms" in data
    assert len(data["official_platforms"]) >= 5
    platform_names = [p["name"] for p in data["official_platforms"]]
    assert any("Steam" in name for name in platform_names)
    assert any("Roblox" in name for name in platform_names)
    assert any("Supercell" in name for name in platform_names)
