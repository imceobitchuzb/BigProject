from app.core.limiter import limiter


def test_rate_limiting_contact(client):
    # Test client address
    payload = {
        "subject": "Repeated submission test",
        "category": "feedback",
        "message": "Testing that rate limiter stops automated spam floods effectively.",
    }

    # Our limit is 5 per minute
    statuses = []
    for _ in range(7):
        resp = client.post("/api/v1/contact", json=payload)
        statuses.append(resp.status_code)

    # At least the later requests should be 429 Too Many Requests
    assert 429 in statuses
