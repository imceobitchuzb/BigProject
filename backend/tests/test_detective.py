import pytest
from fastapi.testclient import TestClient


def test_detective_steam_impersonation_urgency(client: TestClient):
    payload = {
        "text": "Hello, I am Steam Support Admin. Your account will be banned within 24 hours due to duped items. Send me your verification code immediately.",
        "lang": "en"
    }
    response = client.post("/api/v1/detective/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["risk_category"] in ("CRITICAL", "HIGH")
    assert data["threat_score"] >= 50
    assert len(data["indicators"]) >= 2
    assert len(data["recommendations"]) > 0
    assert any("cs2-steam" in r["slug"] for r in data["rescue_links"])


def test_detective_roblox_cookie_theft(client: TestClient):
    payload = {
        "text": "Press F12, open Console and paste this code or export your .ROBLOSECURITY har file to get 10000 free robux giveaway winner!",
        "lang": "en"
    }
    response = client.post("/api/v1/detective/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["risk_category"] in ("CRITICAL", "HIGH")
    assert any("roblox" in r["slug"] for r in data["rescue_links"])


def test_detective_russian_accidental_report(client: TestClient):
    payload = {
        "text": "Привет! Я случайно пожаловался на твой аккаунт в стиме за скам, напиши администрация в discord чтобы не забанили через 2 часа!",
        "lang": "ru"
    }
    response = client.post("/api/v1/detective/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["risk_category"] in ("CRITICAL", "HIGH")
    assert "Случайный репорт" in data["attack_scenario"] or any("репорт" in ind["title"].lower() for ind in data["indicators"])


def test_detective_with_phishing_link(client: TestClient):
    payload = {
        "text": "Vote for my CS2 team on this tournament:",
        "url": "https://steamcommunnity.com/tradeoffer/new",
        "lang": "en"
    }
    response = client.post("/api/v1/detective/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["risk_category"] in ("CRITICAL", "HIGH")
    assert data["scanned_urls_count"] >= 1


def test_detective_safe_gaming_message(client: TestClient):
    payload = {
        "text": "Hey bro, do you want to play some Minecraft Survival tonight on our realm? Let me know when you are online.",
        "lang": "en"
    }
    response = client.post("/api/v1/detective/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["risk_category"] == "SAFE"
    assert data["threat_score"] == 0


def test_detective_sensitive_data_redaction(client: TestClient):
    payload = {
        "text": "Urgent! Contact victim@example.com or call +1234567890 password: mysecretpassword123 send the code",
        "lang": "en"
    }
    response = client.post("/api/v1/detective/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["has_sensitive_redaction"] is True


def test_detective_empty_request_rejected(client: TestClient):
    response = client.post("/api/v1/detective/analyze", json={})
    assert response.status_code == 400
