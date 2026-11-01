import pytest
from fastapi.testclient import TestClient


def test_list_threats_default(client: TestClient):
    response = client.get("/api/v1/threats/")
    assert response.status_code == 200
    data = response.json()
    assert "total" in data
    assert "items" in data
    assert data["total"] >= 10
    assert len(data["items"]) > 0

    first = data["items"][0]
    assert "slug" in first
    assert "title" in first
    assert "game" in first
    assert "attack_vector" in first
    assert "severity" in first
    assert "indicators" in first
    assert "prevention" in first


def test_filter_threats_by_game(client: TestClient):
    response = client.get("/api/v1/threats/?game=cs2")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] >= 1
    for item in data["items"]:
        assert item["game"] == "cs2"


def test_filter_threats_by_severity(client: TestClient):
    response = client.get("/api/v1/threats/?severity=CRITICAL")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] >= 1
    for item in data["items"]:
        assert item["severity"] == "CRITICAL"


def test_search_threats_en_and_ru(client: TestClient):
    # Search in English
    res_en = client.get("/api/v1/threats/?search=token&lang=en")
    assert res_en.status_code == 200
    data_en = res_en.json()
    assert data_en["total"] >= 1

    # Search in Russian
    res_ru = client.get("/api/v1/threats/?search=куки&lang=ru")
    assert res_ru.status_code == 200
    data_ru = res_ru.json()
    assert data_ru["total"] >= 1


def test_get_threat_detail_success(client: TestClient):
    response = client.get("/api/v1/threats/cs2-steam-api-key-hijack")
    assert response.status_code == 200
    data = response.json()
    assert data["slug"] == "cs2-steam-api-key-hijack"
    assert "Steam Web API Key" in data["title"]
    assert len(data["indicators"]) > 0


def test_get_threat_detail_404(client: TestClient):
    response = client.get("/api/v1/threats/non-existent-threat-slug")
    assert response.status_code == 404
    assert response.json()["detail"] == "Threat not found"


def test_threat_radar_stats(client: TestClient):
    response = client.get("/api/v1/threats/stats")
    assert response.status_code == 200
    data = response.json()
    assert data["total_active_threats"] >= 10
    assert "cs2" in data["by_game"]
    assert "roblox" in data["by_game"]
    assert "CRITICAL" in data["by_severity"]
    assert len(data["recent_advisories"]) > 0


def test_submit_community_threat_report(client: TestClient):
    payload = {
        "game": "roblox",
        "threat_type": "phishing_url",
        "suspicious_url": "https://free-robux-claim-2026.xyz",
        "suspicious_text": "Claim 10000 free robux by verifying your account",
        "description": "Found this link being spammed in a Roblox trading Discord server.",
        "contact_info": "discord_reporter#1234",
    }
    response = client.post("/api/v1/threats/report", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "id" in data


def test_submit_threat_report_honeypot(client: TestClient):
    payload = {
        "game": "cs2",
        "threat_type": "phishing_url",
        "description": "Automated spam bot submission trying to fill honeypot field",
        "honeypot": "spam_bot_filled_this",
    }
    response = client.post("/api/v1/threats/report", json=payload)
    assert response.status_code == 200
    assert response.json()["status"] == "success"
