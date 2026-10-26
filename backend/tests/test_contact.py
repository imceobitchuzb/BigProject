def test_contact_submission_success(client):
    payload = {
        "subject": "Phishing site report",
        "category": "phishing",
        "message": "I found a suspicious site impersonating a gaming platform: example-scam-link.",
        "email": "gamer@example.com",
    }
    response = client.post("/api/v1/contact", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["status"] == "received"
    assert "submission_id" in data
    assert data["submission_id"] is not None


def test_contact_submission_without_email(client):
    payload = {
        "subject": "General question",
        "category": "general",
        "message": "Thank you for the educational articles! They are very helpful.",
    }
    response = client.post("/api/v1/contact", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["status"] == "received"


def test_contact_submission_validation_error(client):
    # Too short message
    payload = {
        "subject": "Hi",
        "category": "general",
        "message": "short",
    }
    response = client.post("/api/v1/contact", json=payload)
    assert response.status_code == 422


def test_contact_honeypot_spam_trap(client):
    # Bots fill hidden honeypot fields
    payload = {
        "subject": "Buy crypto now",
        "category": "spam",
        "message": "Make millions right now fast and easy without risk.",
        "honeypot": "https://spammer.example.com",
    }
    response = client.post("/api/v1/contact", json=payload)
    # Pydantic validator rejects filled honeypot as 422
    assert response.status_code == 422


def test_contact_submissions_not_publicly_accessible(client):
    # Verify that contact submissions cannot be viewed anonymously through public GET
    response = client.get("/api/v1/contact")
    assert response.status_code in [404, 405]
