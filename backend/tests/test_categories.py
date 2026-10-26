def test_get_categories_en(client):
    response = client.get("/api/v1/categories?lang=en")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 8
    first = data[0]
    assert "slug" in first
    assert "title" in first
    assert "description" in first
    assert "icon" in first


def test_get_categories_ru(client):
    response = client.get("/api/v1/categories?lang=ru")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 8
    account_cat = next(c for c in data if c["slug"] == "account-security")
    assert account_cat["title"] == "Безопасность аккаунта"


def test_get_categories_invalid_lang(client):
    response = client.get("/api/v1/categories?lang=fr")
    assert response.status_code == 422
