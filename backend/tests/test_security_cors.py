def test_cors_headers(client):
    headers = {
        "Origin": "http://localhost:4321",
        "Access-Control-Request-Method": "POST",
    }
    response = client.options("/api/v1/contact", headers=headers)
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == "http://localhost:4321"


def test_security_headers_present(client):
    response = client.get("/api/v1/health")
    assert response.headers.get("x-content-type-options") == "nosniff"
    assert response.headers.get("x-frame-options") == "DENY"
    assert "strict-origin-when-cross-origin" in response.headers.get("referrer-policy", "")
