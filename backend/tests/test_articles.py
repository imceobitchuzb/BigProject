def test_list_articles_en(client):
    response = client.get("/api/v1/articles?lang=en")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert "total" in data
    assert data["total"] == 8
    assert len(data["items"]) == 8


def test_list_articles_ru(client):
    response = client.get("/api/v1/articles?lang=ru")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 8
    titles = [item["title"] for item in data["items"]]
    assert any("аккаунт" in t.lower() for t in titles)


def test_articles_filter_by_category(client):
    response = client.get("/api/v1/articles?lang=en&category=phishing")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 1
    assert data["items"][0]["category"] == "phishing"
    assert data["items"][0]["slug"] == "how-to-spot-gaming-phishing"


def test_articles_search(client):
    response = client.get("/api/v1/articles?lang=en&q=authenticator")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] >= 1
    slugs = [item["slug"] for item in data["items"]]
    assert "how-to-secure-your-gaming-account" in slugs


def test_articles_pagination(client):
    response = client.get("/api/v1/articles?lang=en&page=1&page_size=3")
    assert response.status_code == 200
    data = response.json()
    assert len(data["items"]) == 3
    assert data["total"] == 8
    assert data["total_pages"] == 3


def test_get_individual_article_success(client):
    response = client.get("/api/v1/articles/how-to-spot-gaming-phishing?lang=en")
    assert response.status_code == 200
    data = response.json()
    assert data["slug"] == "how-to-spot-gaming-phishing"
    assert len(data["warning_signs"]) > 0
    assert len(data["prevention_steps"]) > 0
    assert len(data["official_sources"]) > 0


def test_get_individual_article_404(client):
    response = client.get("/api/v1/articles/non-existent-threat-guide?lang=en")
    assert response.status_code == 404
    data = response.json()
    assert "detail" in data
