# SafeInGame

> **Play smart. Stay safe.**  
> *Играй с умом. Оставайся в безопасности.*

[![Python](https://img.shields.io/badge/Python-3.12%2B-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115%2B-009688.svg)](https://fastapi.tiangolo.com)
[![Astro](https://img.shields.io/badge/Astro-4.16%2B-BC52EE.svg)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4%2B-38B2AC.svg)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)
[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF.svg)](https://github.com/imceobitchuzb/BigProject/actions)
[![Tests](https://img.shields.io/badge/Tests-29%2F29%20Passing-brightgreen.svg)]()

SafeInGame is an independent, non-commercial gaming safety education and threat analysis platform. It teaches gamers across genres and platforms how to spot digital deception, harden their accounts against hijacking, secure valuable virtual items, and evaluate suspicious links using live heuristic algorithms.

---

## What's New: Gaming Link Scanner & Threat Detection Engine

- **⚡ Live Gaming URL & Phishing Scanner (`/scanner/`):** Full-stack algorithmic tool analyzing candidate URLs for:
  - **Homoglyph & Punycode (IDN) Spoofing:** Identifies disguised Cyrillic/Greek characters visually mimicking Latin letters in domain names (e.g. `steаmcommunity.com`).
  - **Damerau-Levenshtein Typosquatting:** Calculates string edit distance against 8 monitored gaming platforms (Steam, Roblox, Supercell, PUBG, Minecraft, Discord, Epic Games, Twitch).
  - **Subdomain Masking:** Uncovers attacker attempts to disguise brands inside subdomains of unrelated hosts.
  - **Suspicious TLD & Host Profiling:** Evaluates high-abuse TLDs (`.xyz`, `.top`, `.click`), free dynamic tunnels, and direct IP addresses.
  - **Risk Score Gauge & Visual HUD:** Real-time 0-100 risk score with categorized flags and actionable mitigation steps.
- **🐳 Docker & Docker Compose Support:** Run the entire frontend and backend with a single command: `docker compose up`.
- **🧪 Automated GitHub Actions CI:** Continuous testing pipeline validating 29 backend test cases and 46 frontend pages on every commit.
- **📄 Research Whitepaper:** Academic-grade technical taxonomy in `docs/RESEARCH_PHISHING_TAXONOMY.md` detailing the mathematical threat model and empirical results.
- **🌐 Bilingual Start Portal (`/`):** Dedicated language gateway with automatic browser locale suggestion, direct access to Russian and English hubs, and quick game profiles.

---

## What's New: Games Security Hub & UI/UX Upgrade

- **🎮 Games Security Hub:** Dedicated threat centers for 5 major gaming ecosystems with step-by-step attack scenarios, "What NOT to Share" critical callouts, account protection checklists, payment rules, incident recovery, and mini knowledge checks:
  - **Counter-Strike 2 & Steam:** Skin trade manipulation, API key interception, counterfeit login modals.
  - **Brawl Stars:** Fake Gem generators, Supercell ID code theft, fraudulent account buying traps.
  - **PUBG:** Phishing UC giveaways, malicious third-party tournament clients, weapon skin token scams.
  - **Roblox:** Rogue Chrome extensions (.ROBLOSECURITY cookie theft), fake Studio developer tests, Discord QR verification traps.
  - **Minecraft:** Compromised mod .JAR files (ratters/info-stealers), Microsoft OAuth authorization traps, fake server registration Discord bots.
- **🌓 Complete Dark & Light Theme:** Flawless dual-theme architecture with zero-FOUC initialization script, smooth SVG transitions, high contrast ratios, and persistent user preference via `localStorage`.
- **🕹️ 3D Perspective Card Tilt:** Mousemove-driven 3D perspective animations on desktop cards with ambient hover glow effects.
- **⚠️ Universal Scam Patterns Section:** Interactive analysis of the 9 most dangerous scam phrases with deceptive quotes, warning tags, "Why it's suspicious" deep-dives, and safer counteractions.
- **🎯 Interactive Scam-Awareness Quiz:** 6 interactive cyber scenarios with instant feedback, scoring breakdown, educational explanations, and mobile-responsive layout.

---

## Official Social Channels

All official SafeInGame communities use the handle **`@SafeInGame`**:
- **Telegram:** [https://t.me/SafeInGame](https://t.me/SafeInGame)
- **X (Twitter):** [https://x.com/SafeInGame](https://x.com/SafeInGame)
- **Instagram:** [https://instagram.com/SafeInGame](https://instagram.com/SafeInGame)
- **TikTok:** [https://tiktok.com/@SafeInGame](https://tiktok.com/@SafeInGame)

---

## Technology Stack

- **Frontend:**
  - [Astro 4.16+](https://astro.build) (Static Site Generation, zero heavy client runtime)
  - TypeScript (strict checking)
  - [Tailwind CSS](https://tailwindcss.com) with custom design token system and `darkMode: 'class'`
  - Client-side vanilla TypeScript components for search, filtering, quiz scoring, and theme toggle
  - Markdown content collections with frontmatter schema validation
- **Backend:**
  - [Python 3.12+](https://python.org) (FastAPI framework)
  - [Pydantic v2](https://docs.pydantic.dev) for input validation and sanitization
  - [SQLAlchemy 2.x](https://www.sqlalchemy.org) ORM
  - [Alembic](https://alembic.sqlalchemy.org) for schema migrations
  - SQLite for local development (documented path to PostgreSQL)
  - [SlowAPI](https://github.com/laurentS/slowapi) for rate limiting
  - [Pytest](https://pytest.org) and [HTTPX](https://www.python-httpx.org) for automated test suites
- **Branding & Design System:**
  - Original shield character mascot and game artwork (Electric Cyan, Midnight Navy, Arcade Orange, Pixel Lime, Neon Violet)
  - Space Grotesk (Headings) and Inter (Body) typography
  - High-contrast, mobile-responsive, and reduced-motion compliant

---

## Project Structure

```
safeingame/
├── frontend/                     # Astro static site generator
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── robots.txt
│   │   └── images/
│   │       ├── logo.png          # Official mascot logo
│   │       └── logo.svg          # Vector logo
│   ├── src/
│   │   ├── components/           # Reusable Astro & interactive components
│   │   │   ├── GameArtwork.astro # Custom vector artwork for 5 games
│   │   │   ├── GameCard.astro    # 3D perspective tilt game card
│   │   │   ├── GameSecurityPage.astro # Master layout for game threat centers
│   │   │   ├── ScamPatterns.astro# 9 universal scam patterns
│   │   │   ├── ScamQuiz.astro    # Interactive scam-awareness quiz
│   │   │   ├── ThemeToggle.astro # Light/Dark mode switcher
│   │   │   └── ThreatSearch.astro# Real-time search and filtering
│   │   ├── content/
│   │   │   └── threats/          # Educational Markdown articles (8 EN + 8 RU)
│   │   ├── data/
│   │   │   └── games.ts          # Structured game threat data & quizzes
│   │   ├── i18n/                 # UI dictionaries (EN/RU)
│   │   ├── layouts/              # Base and Article layouts
│   │   ├── pages/                # Dual-language routes (/en/ and /ru/)
│   │   │   ├── en/games/         # /en/games/ and /en/games/[slug]/
│   │   │   └── ru/games/         # /ru/games/ and /ru/games/[slug]/
│   │   └── styles/               # CSS variables and theme tokens
│   ├── tests/                    # Build output validation tests
│   ├── package.json
│   ├── astro.config.mjs
│   └── tailwind.config.mjs
├── backend/                      # FastAPI Python application
│   ├── app/
│   │   ├── api/v1/endpoints/     # Health, categories, articles, contact
│   │   ├── core/                 # Config & rate limiting
│   │   ├── models/               # SQLAlchemy ORM models
│   │   ├── schemas/              # Pydantic schemas & sanitizers
│   │   ├── services/             # Business logic layer
│   │   ├── repositories/         # Database access layer
│   │   ├── database.py           # Engine & sessionmaker
│   │   └── main.py               # FastAPI entrypoint & middleware
│   ├── alembic/                  # Database migration versions
│   ├── tests/                    # 20 automated pytest test cases
│   ├── cli.py                    # Founder CLI management tool
│   ├── requirements.txt
│   ├── alembic.ini
│   └── pytest.ini
├── docs/                         # Architecture documentation
│   ├── PRODUCT_SPEC.md
│   ├── API.md
│   ├── SECURITY.md
│   ├── CONTENT_GUIDE.md
│   └── DEPLOYMENT.md
├── scripts/                      # Developer automation scripts
│   ├── run_dev.ps1               # Windows PowerShell 1-click launcher
│   └── run_dev.bat               # Windows Batch 1-click launcher
├── .env.example
├── .gitignore
└── README.md
```

---

## Quick Start on Windows

### Prerequisites
- **Node.js:** v20.x or higher (`node -v`)
- **Python:** 3.12+ (`python --version`)
- **Git**

### 1-Click Launch (Recommended)

From the project root in PowerShell:
```powershell
.\scripts\run_dev.ps1
```
Or in Windows Command Prompt:
```cmd
scripts\run_dev.bat
```

This will automatically create the virtual environment if missing, seed database categories, and start both the backend API (`http://127.0.0.1:8000`) and the frontend dev server (`http://localhost:4321`).

---

## Manual Setup (Step-by-Step)

### 1. Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Seed initial categories
python cli.py seed-categories

# Start development API server
python -m uvicorn app.main:app --reload --port 8000
```
Backend API will be running at `http://127.0.0.1:8000`. Interactive docs are available at `http://127.0.0.1:8000/docs`.

### 2. Frontend Setup

In a separate terminal:
```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
Frontend will be available at `http://localhost:4321`.

---

## Running Tests

### Backend Test Suite (Pytest)
```powershell
cd backend
.\venv\Scripts\pytest.exe -v
```
Runs 20 automated tests verifying:
- Service health check
- Localized threat category retrieval
- Article search, category filtering, and pagination
- Missing article 404 responses
- Input validation and XSS escaping
- Anti-spam honeypot rejection
- SlowAPI rate limiting (429 response after threshold)
- CORS header enforcement and security response headers

### Frontend Build Validation
```powershell
cd frontend
npm run build
npm test
```
Verifies that all 43 static pages build without errors, and validates:
- 22 core top-level and i18n route files
- 16 threat articles in EN and RU with proper branding and social links
- 10 Game Security Centers in EN and RU with interactive quizzes and checklists
- Dual-theme toggle, universal scam patterns, and scam quiz components

---

## Games Security Hub Routes

| Game | English Route | Russian Route | Primary Threat Vector |
|---|---|---|---|
| Counter-Strike 2 & Steam | `/en/games/cs2-steam/` | `/ru/games/cs2-steam/` | Skin trade manipulation & Steam API theft |
| Brawl Stars | `/en/games/brawl-stars/` | `/ru/games/brawl-stars/` | Supercell ID code interception & free gem lures |
| PUBG | `/en/games/pubg/` | `/ru/games/pubg/` | UC top-up fraud & infected tournament voice clients |
| Roblox | `/en/games/roblox/` | `/ru/games/roblox/` | Cookie theft via malicious extensions & Discord verification |
| Minecraft | `/en/games/minecraft/` | `/ru/games/minecraft/` | Infested mod JARs (ratters) & Microsoft OAuth token traps |

---

## Educational Threat Guides

| # | Topic | English Route | Russian Route |
|---|---|---|---|
| 1 | Account Security | `/en/threats/how-to-secure-your-gaming-account` | `/ru/threats/how-to-secure-your-gaming-account` |
| 2 | Phishing Identification | `/en/threats/how-to-spot-gaming-phishing` | `/ru/threats/how-to-spot-gaming-phishing` |
| 3 | Virtual Item Trading | `/en/threats/safe-trading-in-game-items` | `/ru/threats/safe-trading-in-game-items` |
| 4 | Fake Giveaways | `/en/threats/fake-giveaways-and-free-rewards` | `/ru/threats/fake-giveaways-and-free-rewards` |
| 5 | Recovery Scams | `/en/threats/gaming-account-recovery-scams` | `/ru/threats/gaming-account-recovery-scams` |
| 6 | Currency & Payments | `/en/threats/gaming-currency-and-payment-safety` | `/ru/threats/gaming-currency-and-payment-safety` |
| 7 | Social Engineering | `/en/threats/social-engineering-in-online-games` | `/ru/threats/social-engineering-in-online-games` |
| 8 | Incident Response | `/en/threats/what-to-do-after-a-gaming-scam` | `/ru/threats/what-to-do-after-a-gaming-scam` |

---

## Founder Workflow: Managing Contact Inquiries

Contact inquiries submitted by visitors are stored securely in SQLite and are **never exposed to any public API**.

The founder manages inquiries directly from the command line:

```powershell
cd backend

# List all pending submissions
.\venv\Scripts\python.exe cli.py list-submissions --status pending

# Inspect a specific submission
.\venv\Scripts\python.exe cli.py view-submission 1

# Update status to reviewed or resolved
.\venv\Scripts\python.exe cli.py update-status 1 reviewed
```

---

## Security & Privacy Highlights

- **Data Minimization:** No personal user accounts or password stores exist on the platform.
- **Zero Credential Harvesting:** SafeInGame never asks for game credentials, session cookies, or 2FA codes.
- **Privacy-Preserving IP Hashing:** Salted SHA-256 hashes are used for rate limiting; raw IPs are discarded.
- **Sanitization:** All submitted contact fields are sanitized to block stored and reflected XSS attacks.
- **Security Headers:** Enforces `nosniff`, `DENY` for framing, and strict cross-origin policies.

---

## License

SafeInGame educational content and source code are released under the MIT License.
