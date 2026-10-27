# SafeInGame — Backend REST API Specification

**Base URL (Local):** `http://127.0.0.1:8000/api/v1`  
**Base URL (Production):** `https://safeingame.org/api/v1`  
**Interactive Docs:** `http://127.0.0.1:8000/docs` (Swagger UI) / `http://127.0.0.1:8000/redoc` (ReDoc)  

---

## 1. Endpoints Overview

| Method | Endpoint | Description | Rate Limit |
|---|---|---|---|
| `GET` | `/api/v1/health` | Health & database connectivity status | None |
| `POST` | `/api/v1/scanner/check` | Analyze suspicious URL for phishing/typosquatting | 30 / minute |
| `GET` | `/api/v1/scanner/targets` | List monitored official gaming platform domains | 60 / minute |
| `GET` | `/api/v1/categories` | Retrieve published threat categories | None |
| `GET` | `/api/v1/articles` | Search and list educational articles | None |
| `GET` | `/api/v1/articles/{slug}` | Retrieve single article by slug | None |
| `POST` | `/api/v1/contact` | Submit inquiry or scam report safely | 5 / minute |

---

## 2. Endpoint Details

### A. Health Check
`GET /api/v1/health`

**Response `200 OK`:**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "service": "SafeInGame API",
  "timestamp": "2026-10-26T14:56:43.904830+00:00",
  "database": "healthy"
}
```

---

### B. List Categories
`GET /api/v1/categories`

**Query Parameters:**
- `lang` (optional, string): `en` (default) or `ru`.

**Response `200 OK`:**
```json
[
  {
    "id": "account-security",
    "slug": "account-security",
    "title": "Account Security",
    "description": "Authenticators, unique passwords, and recovery email hardening.",
    "icon": "shield-check",
    "display_order": 1
  }
]
```

---

### C. List & Search Articles
`GET /api/v1/articles`

**Query Parameters:**
- `lang` (optional, string): `en` (default) or `ru`.
- `category` (optional, string): Filter by category slug (e.g., `phishing`).
- `q` (optional, string): Search text across titles, descriptions, and warning signs.
- `page` (optional, integer): Page number (default: `1`).
- `page_size` (optional, integer): Items per page (default: `10`, max: `50`).

**Response `200 OK`:**
```json
{
  "items": [
    {
      "slug": "how-to-spot-gaming-phishing",
      "title": "How to Spot Gaming Phishing",
      "description": "Learn to identify deceptive URLs, counterfeit login popups...",
      "category": "phishing",
      "category_title": "Phishing",
      "lang": "en",
      "published_date": "2026-03-02",
      "last_reviewed": "2026-03-16",
      "reading_time": "7 min read",
      "warning_signs_count": 5
    }
  ],
  "total": 1,
  "page": 1,
  "page_size": 10,
  "total_pages": 1
}
```

---

### D. Get Individual Article
`GET /api/v1/articles/{slug}`

**Query Parameters:**
- `lang` (optional, string): `en` (default) or `ru`.

**Response `200 OK`:**
```json
{
  "slug": "how-to-spot-gaming-phishing",
  "title": "How to Spot Gaming Phishing",
  "description": "...",
  "category": "phishing",
  "category_title": "Phishing",
  "lang": "en",
  "published_date": "2026-03-02",
  "last_reviewed": "2026-03-16",
  "reading_time": "7 min read",
  "warning_signs_count": 5,
  "content_markdown": "# How to Spot Gaming Phishing...",
  "warning_signs": ["Slightly misspelled domain names...", "..."],
  "prevention_steps": ["Always bookmark official platform login pages...", "..."],
  "recovery_steps": ["If credentials were submitted, immediately change passwords...", "..."],
  "official_sources": [
    {
      "title": "Federal Trade Commission: How to Recognize and Avoid Phishing",
      "url": "https://consumer.ftc.gov"
    }
  ],
  "related_slugs": ["how-to-secure-your-gaming-account"]
}
```

**Response `404 Not Found`:**
```json
{
  "detail": "Article 'unknown-slug' was not found for language 'en'."
}
```

---

### E. Submit Contact Form
`POST /api/v1/contact`

**Request Headers:**
`Content-Type: application/json`

**Request Body:**
```json
{
  "subject": "Phishing site report",
  "category": "scam_report",
  "message": "Found a fake Faceit voting website copying the login flow.",
  "email": "user@example.com",
  "honeypot": null
}
```

**Field Rules:**
- `subject`: string, 2-128 characters, auto-sanitized against HTML/XSS.
- `category`: string, choices: `general`, `scam_report`, `feedback`, `correction`.
- `message`: string, 10-2000 characters, auto-sanitized against HTML/XSS.
- `email`: optional valid email string, max 255 characters.
- `honeypot`: optional string, must be omitted or empty; non-empty triggers automated bot rejection (`422 Unprocessable Entity`).

**Response `201 Created`:**
```json
{
  "status": "received",
  "message": "Your message has been safely received and stored for founder review. We do not share your inquiry with third parties.",
  "submission_id": 1
}
```

**Response `429 Too Many Requests` (Rate Limited):**
```json
{
  "error": "Rate limit exceeded: 5 per 1 minute"
}
```

---

## 3. Founder Management via CLI

Contact submissions are **strictly private** and never exposed through any public GET API.

To inspect submissions safely, the founder uses the local CLI command:
```bash
cd backend
# List all pending submissions
./venv/Scripts/python.exe cli.py list-submissions --status pending

# View submission details
./venv/Scripts/python.exe cli.py view-submission 1

# Mark as reviewed
./venv/Scripts/python.exe cli.py update-status 1 reviewed
```
