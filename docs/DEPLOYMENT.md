# SafeInGame — Deployment Guide

This document describes how to deploy SafeInGame to production environments.

---

## 1. Architecture Overview

SafeInGame follows a decoupled full-stack architecture:
- **Frontend:** Static Site Generated (SSG) via Astro. Can be deployed on any static host, CDN, or cloud edge (Cloudflare Pages, Vercel, Netlify, AWS S3 + CloudFront).
- **Backend:** High-performance Python FastAPI service. Deployed on a container platform (Fly.io, Railway, Render, VPS with Docker/systemd).

---

## 2. Frontend Production Build

1. Set the production backend API URL in your environment or let it default to `/api/v1` when served behind the same reverse proxy:
   ```bash
   cd frontend
   npm run build
   ```
2. The generated output is located in `frontend/dist/`.
3. Deploy the contents of `frontend/dist/` to your chosen static host.

---

## 3. Backend Production Deployment

### Prerequisites:
- Python 3.12+ (tested through 3.14)
- PostgreSQL (recommended for production growth) or persistent volume for SQLite

### Step 1: Environment Variables
Create a production `.env` file on the server:
```ini
PROJECT_NAME="SafeInGame API"
VERSION="1.0.0"
DATABASE_URL="postgresql+psycopg2://user:secret_password@db.internal:5432/safeingame"
CORS_ORIGINS=["https://safeingame.org"]
RATE_LIMIT_CONTACT="5/minute"
ADMIN_API_KEY="generate-a-strong-random-64-char-token"
```

### Step 2: Database Migration
Run Alembic to apply all migrations on the production database:
```bash
cd backend
alembic upgrade head
python cli.py seed-categories
```

### Step 3: Run with Gunicorn / Uvicorn Workers
```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

---

## 4. Single-Domain NGINX Reverse Proxy Example

```nginx
server {
    listen 443 ssl http2;
    server_name safeingame.org;

    ssl_certificate /etc/letsencrypt/live/safeingame.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/safeingame.org/privkey.pem;

    # Static Frontend
    location / {
        root /var/www/safeingame/frontend/dist;
        try_files $uri $uri/ /index.html;
        expires 1h;
    }

    # Backend API Proxy
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
