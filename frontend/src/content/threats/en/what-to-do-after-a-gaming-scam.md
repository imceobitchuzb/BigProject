---
title: "What to Do After a Gaming Scam"
description: "A calm, structured emergency response checklist for revoking sessions, gathering evidence, contacting support, and preventing secondary scams."
category: "incident-response"
category_title: "Incident Response"
published_date: "2026-03-12"
last_reviewed: "2026-03-24"
reading_time: "9 min read"
warning_signs:
  - "Secondary outreach from 'cyber recovery services' offering to hack back your items for a fee (almost always a second scam)."
  - "Emails claiming you must pay an 'anti-fraud unfreeze fee' to unlock items."
  - "Blackmail threats claiming sensitive data will be released unless ransomed."
  - "Attempts to compromise your email account following an initial game account breach."
prevention_steps:
  - "Stay calm: panic leads to rushed decisions and secondary scams."
  - "Immediately secure your master email address first before attempting game account recovery."
  - "Revoke all active web API keys, OAuth authorizations, and device sessions."
  - "Document everything: capture unedited screenshots of chat logs, trade IDs, and transaction receipts."
recovery_steps:
  - "Step 1: Disconnect compromised devices from local network if malware is suspected."
  - "Step 2: Change email and gaming account passwords from an uncompromised device."
  - "Step 3: Open an official support ticket through the genuine publisher help portal."
  - "Step 4: Contact bank or card issuer if financial credentials were exposed."
  - "Step 5: Alert friends and community members to ignore messages from your handles."
official_sources:
  - title: "CISA: Identity Theft and Online Scam Response"
    url: "https://www.cisa.gov"
  - title: "FTC: What to Do If You've Been Scammed"
    url: "https://consumer.ftc.gov"
related_slugs:
  - "how-to-secure-your-gaming-account"
  - "gaming-account-recovery-scams"
  - "safe-trading-in-game-items"
---

Realizing that you have been scammed or that your gaming profile has been compromised is overwhelming. However, rapid, methodical action can limit damage, prevent secondary fraud, and maximize your chances of account recovery.

## Phase 1: Containment (First 15 Minutes)

### 1. Secure Your Primary Email
If attackers gained access to your email, they can reset every password you change.
- Go to your email provider (Gmail, Outlook, Proton, etc.) from a known clean device (e.g. your smartphone on mobile cellular data).
- Change your master password and revoke all other active sessions.
- Check email forwarding filters: attackers frequently configure silent forwarding rules to redirect incoming support replies to an attacker inbox.

### 2. Disconnect & Scan If Malware Was Downloaded
If you clicked a suspicious link, ran an executable file, or accepted a rogue voice patch:
- Unplug your Ethernet cable or disconnect Wi-Fi immediately.
- Run an offline scan using a reputable antimalware tool (such as Malwarebytes or Microsoft Defender Offline).
- Do not log into sensitive financial accounts or type passwords until your operating system is confirmed clean.

## Phase 2: Session and API Revocation

- **Steam:** Visit `https://steamcommunity.com/dev/apikey` and click **Revoke My Steam Web API Key**. Navigate to Steam Account Details and click **Deauthorize all other devices**.
- **Discord:** Go to User Settings > Authorized Apps and deauthorize all third-party bots or applications. Change your password to force token invalidation.
- **Epic Games / Riot / Battle.net:** Log in via the official website, navigate to Security settings, and terminate all active web sessions.

## Phase 3: Evidence Gathering & Official Support

Before chat logs disappear or attacker profiles are renamed:
- Take full-screen, uncropped screenshots showing account names, timestamps, URLs, and transaction IDs.
- Open an official support ticket **strictly through the publisher's verified domain** (e.g., `help.steampowered.com`, `support.riotgames.com`, `help.epicgames.com`).
- Provide non-sensitive proof of initial ownership: original CD keys, transaction numbers from official payment processors (PayPal, bank receipts), or initial registration dates.

## Phase 4: Avoiding the Recovery Scam Trap
Be prepared: following an incident, you will receive messages claiming someone can "hack back" your lost items for a fee. **These are secondary scammers preying on victims.** Legitimate publishers will never charge you a fee to review an investigation or restore account access.
