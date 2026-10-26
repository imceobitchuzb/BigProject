# SafeInGame — Content Creation & Translation Guide

This guide describes how to author, review, and translate educational articles for SafeInGame.

---

## 1. Directory Structure

Articles are version-controlled Markdown files stored under:
```
frontend/src/content/threats/
├── en/
│   ├── how-to-secure-your-gaming-account.md
│   ├── how-to-spot-gaming-phishing.md
│   └── ...
└── ru/
    ├── how-to-secure-your-gaming-account.md
    ├── how-to-spot-gaming-phishing.md
    └── ...
```

---

## 2. Article Frontmatter Specification

Every article requires the following YAML frontmatter:

```yaml
---
title: "Article Title"
description: "A 1-2 sentence concise summary of the threat and protective steps."
category: "phishing" # Category slug from the 8 standardized categories
category_title: "Phishing"
published_date: "2026-03-01"
last_reviewed: "2026-03-15" # Optional, only include when genuine review occurred
reading_time: "6 min read"
warning_signs:
  - "Specific indicator #1"
  - "Specific indicator #2"
prevention_steps:
  - "Actionable defense step #1"
  - "Actionable defense step #2"
recovery_steps:
  - "Incident response step #1"
  - "Incident response step #2"
official_sources:
  - title: "Official Documentation Title"
    url: "https://verified-publisher-domain.com/help"
related_slugs:
  - "how-to-secure-your-gaming-account"
---

Main Markdown body begins here...
```

---

## 3. Editorial Integrity Guidelines

1. **Accuracy First:** Always verify factual claims against current official documentation (Steam Support, Epic Games Help, Riot Support, CISA).
2. **Neutral, Empowering Tone:** Avoid fear-mongering language ("Your PC is doomed!"). Use calm, empowering, step-by-step guidance.
3. **No Exploitation Instructions:** Never explain how to configure phishing toolkits, create malicious scripts, or bypass two-factor authentication.
4. **Bilingual Parity:** When publishing a new article, create both English (`en/slug.md`) and Russian (`ru/slug.md`) versions with equivalent factual depth.
5. **Updating Backend Article Registry:** For backend API consistency, mirror the article metadata in `backend/app/services/article_service.py`.
