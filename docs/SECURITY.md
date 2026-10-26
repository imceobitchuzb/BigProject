# SafeInGame — Security Policy & Technical Architecture

## 1. Security Philosophy

SafeInGame adopts an intentional **Security-by-Design and Extreme Data Minimization** posture:
1. **Zero Credential Custody:** We do not request, process, or store passwords, authenticators, session cookies, or gaming tokens.
2. **No Scammer Doxxing Database:** We avoid vigilantism. We analyze *threat tactics and mechanics*, avoiding defaming individuals or publishing unverifiable accusations.
3. **Defense-in-Depth:** Input validation, ORM parameterized queries, HTML sanitization, rate limiting, and HTTP security headers operate at multiple layers.

---

## 2. Implemented Security Controls

### Input Validation & Sanitization
- All incoming payloads pass through Pydantic schemas with length bounds and regex constraints.
- Free-form strings (`subject`, `message`) are stripped and escaped with Python's standard `html.escape()` before database persistence to prevent stored XSS.

### Anti-Spam & Rate Limiting
- Public contact submissions are protected by **SlowAPI** rate limiting (default: `5 requests / minute` per IP address).
- Invisible honeypot form fields trap automated bots silently without degrading genuine user experience.

### Privacy-Preserving IP Hashing
- Client IP addresses are not stored in raw format.
- A salted cryptographic hash (`SHA-256(salt + client_ip)`) is stored instead, preserving privacy while enabling duplicate submission detection and abuse mitigation.

### HTTP Security Headers
Every API response delivers hardened headers via Starlette middleware:
```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: accelerometer=(), camera=(), geolocation=(), microphone=()
```

### Centralized Safe Error Handling
- Uncaught exceptions return a generic `500 Internal Server Error` message (`An internal server error occurred. Please try again later.`).
- Stack traces, file paths, and database errors are never returned to client browsers.

### CORS Configuration
- CORS is restricted to explicit origins defined in `CORS_ORIGINS` (e.g. `http://localhost:4321`, `https://safeingame.org`).
- Disallows wildcard (`*`) origins for credentials.

---

## 3. Database Security & Migrations
- Uses **SQLAlchemy ORM** parameterized queries, preventing SQL injection vulnerabilities.
- Managed by **Alembic** migrations (`alembic upgrade head`) ensuring reproducible schemas.
- The default SQLite file (`safeingame.db`) is excluded from Git via `.gitignore`.
- Transition path to PostgreSQL is documented for production scaling.

---

## 4. Limitations & Founder Deployment Checklist

1. **In-Memory Rate Limiting Limitation:**
   - In the MVP, SlowAPI uses in-memory tracking. If deployed in a multi-worker or autoscaling cluster behind a reverse proxy, configure a Redis backend for SlowAPI or enforce rate limiting at the edge (Cloudflare / NGINX).
2. **Reverse Proxy Headers:**
   - When deploying behind NGINX or Cloudflare, configure `Forwarded` or `X-Forwarded-For` and set `ProxyHeadersMiddleware` in Uvicorn so client IPs are accurately evaluated.
3. **Environment Secrets:**
   - Never commit `.env` to source control. Rotate `ADMIN_API_KEY` before public release.
