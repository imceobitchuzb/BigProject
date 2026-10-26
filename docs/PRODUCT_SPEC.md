# SafeInGame — Product Specification

**Product:** SafeInGame  
**Tagline:** Play smart. Stay safe. (RU: Играй с умом. Оставайся в безопасности.)  
**Current Version:** 2.0.0 (Games Security Hub & Dual Theme Release)  
**Author:** SafeInGame Founder  

---

## 1. Executive Summary & Vision

SafeInGame is an independent, non-commercial gaming safety education platform. Its core mission is to help gamers across genres, ages, and platforms recognize digital deception, protect their accounts and virtual items, and navigate recovery calmly when incidents occur.

SafeInGame is strictly an educational knowledge hub, not an automated anti-cheat service, not an unverified scammer database, and not a paid recovery agency.

---

## 2. Brand Identity & Visual System

### Official Logo & Mascot
The SafeInGame brand identity is anchored by a friendly, trustworthy guardian shield:
- **Visual Elements:** Deep navy shield with a vibrant Electric Cyan contour, expressive friendly eyes, a warm Arcade Orange smile, and a golden checkmark verification badge enclosed within an Electric Cyan orbital ring.
- **Brand Feeling:** International technology startup meets gaming culture—friendly, approachable, and cyber-aware without intimidating corporate or fear-mongering aesthetics.

### Color Palette Tokens
| Token | Hex | Usage |
|---|---|---|
| Midnight Navy | `#101426` | Deep primary dark background & cards |
| Electric Cyan | `#27D8E8` | Primary brand accent, CTAs, focus rings, shields |
| Neon Violet | `#A78BFA` | Category accents, secondary highlights |
| Arcade Orange | `#FFAD66` | Warning indicators, smile motif, emergency alerts |
| Pixel Lime | `#C7F36B` | Verification checks, prevention action steps |
| Cloud White | `#F4F6FC` | High-legibility text & headers in dark mode |
| Slate-50 / Slate-900 | `#F8FAFC / #0F172A` | Clean, crisp, high-contrast light mode background and text |

### Complete Dual Theme (Dark & Light)
- Implemented with Tailwind `darkMode: 'class'`.
- Zero-FOUC inline theme bootstrapper in `<head>` inspecting `localStorage.getItem('safeingame_theme')` or system `prefers-color-scheme`.
- Accessible header toggle with smooth SVG morphing transition.
- High contrast compliant in both dark and light modes.

### 3D Perspective Tilt & Micro-Interactions
- Mousemove-driven 3D tilt on game cards (`tilt-card` with dynamic `perspective: 1000px`, `rotateX` and `rotateY`).
- Ambient radial glow effects on hover.
- Respects `prefers-reduced-motion` media queries.

### Official Social Channels
All official social media presence is unified under the singular handle **`@SafeInGame`**:
- **Telegram:** [`https://t.me/SafeInGame`](https://t.me/SafeInGame)
- **X (Twitter):** [`https://x.com/SafeInGame`](https://x.com/SafeInGame)
- **Instagram:** [`https://instagram.com/SafeInGame`](https://instagram.com/SafeInGame)
- **TikTok:** [`https://tiktok.com/@SafeInGame`](https://tiktok.com/@SafeInGame)

---

## 3. Dedicated Games Security Hub

SafeInGame provides in-depth, dedicated security centers for 5 major gaming ecosystems in English and Russian:

### 1. Counter-Strike 2 & Steam (`/en/games/cs2-steam/` and `/ru/games/cs2-steam/`)
- Steam Web API key interception & unauthorized trade redirection.
- Fake tournament voting & counterfeit esports league popups (BitB).
- Fake Steam support / accidental report extortion.
- Counterfeit trade offer bots and fake middlemen.
- What NOT to share: Steam Guard 2FA codes, API keys, Steam login credentials.

### 2. Brawl Stars (`/en/games/brawl-stars/` and `/ru/games/brawl-stars/`)
- Supercell ID email verification code hijacking.
- Fake Gem generators and malicious promo code portals.
- Account buying and selling traps (violating ToS, permanent lockout).
- Discord/Telegram clan "free Brawl Pass" phishing links.
- What NOT to share: Supercell ID 6-digit confirmation codes.

### 3. PUBG (`/en/games/pubg/` and `/ru/games/pubg/`)
- Unknown Cash (UC) phishing top-up portals.
- Fake tournament voice clients infected with infostealers.
- Third-party cheat loaders concealing session grabbers.
- Weapon skin giveaway link lures on social streams.
- What NOT to share: Krafton ID credentials, social login tokens.

### 4. Roblox (`/en/games/roblox/` and `/ru/games/roblox/`)
- Malicious Chrome extensions targeting `.ROBLOSECURITY` session cookies.
- Counterfeit Roblox Studio team project invites.
- Bogus Discord server verification bots requiring OAuth or QR scans.
- Off-platform Robux and limited items trading traps.
- What NOT to share: `.ROBLOSECURITY` cookie, 2-Step verification codes.

### 5. Minecraft (`/en/games/minecraft/` and `/ru/games/minecraft/`)
- Infested mod `.jar` files and client installers containing token ratters.
- Microsoft OAuth device authorization traps on rogue Discord servers.
- Unofficial server store chargeback bans and stolen card rank purchases.
- What NOT to share: Microsoft MSA auth codes, session tokens, Mojang credentials.

---

## 4. Interactive Learning Modules

### Universal Scam Patterns
Interactive catalog analyzing 9 predatory psychological triggers:
1. Advance-Fee / Direct Payment: *"Send money first; we will credit your account later."*
2. Credential Harvesting: *"Enter your password to claim a free reward."*
3. 2FA Bypass: *"Send us your verification code to prove ownership."*
4. Artificial Urgency: *"Your account will be banned unless you verify immediately."*
5. Fake Authority: *"I am an official administrator; let me check your inventory."*
6. Impersonated Friend: *"Vote for my esports team in this championship."*
7. Off-Platform Redirection: *"Trade through this external middleman bot instead."*
8. In-Game Currency Lure: *"Claim 5,000 free Gems / Robux / V-Bucks instantly."*
9. Accidental Report Trap: *"I accidentally reported your account for fraud; talk to this agent."*

### Interactive Scam-Awareness Quiz
6 scenario-based drill questions with immediate visual feedback, detailed educational explanations, score calculation, and mobile optimization.

---

## 5. Non-Negotiable Constraints & Ethos

1. **No Credential Access:** The platform never requests, stores, or handles game passwords, SMS codes, or recovery tokens.
2. **No Fabricated Data:** Zero fake user reviews, fictitious partnership badges, or invented security audits.
3. **No Public Accusations:** No vigilante scammer databases or private personal data exposure.
4. **Privacy-Preserving Contact Form:** Contact submissions are stored with salted hash IP addresses for anti-spam rate limiting; raw IPs and personal tracking data are discarded.
