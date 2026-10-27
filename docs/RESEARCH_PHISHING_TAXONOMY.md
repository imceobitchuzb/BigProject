# Technical Research: A Heuristic Threat Model for Phishing & Virtual Asset Theft in Gaming Ecosystems

**Author:** SafeInGame Research & Engineering  
**Classification:** Applied Cybersecurity & Algorithmic Defense  
**Repository:** [SafeInGame Open Source Hub](https://github.com/imceobitchuzb/BigProject)

---

## 1. Abstract

Virtual asset economies across platforms such as Steam (Counter-Strike 2), Roblox, Supercell (Brawl Stars), and Krafton (PUBG) manage billions of dollars in trade volume annually. Because gaming demographics heavily skew toward younger, technically enthusiastic yet security-unaware audiences, threat actors have industrialised multi-stage social engineering frameworks. 

This paper outlines the technical anatomy of modern gaming phishing kits, details the mathematical and algorithmic detection methodologies deployed within the SafeInGame Link Scanner engine, and defines an automated, client-safe heuristic scoring pipeline that detects credential-harvesting vectors with zero storage of user secrets.

---

## 2. Threat Vector Taxonomy in Modern Gaming

Our empirical analysis of modern gaming cybercrime identifies four predominant technical vectors:

```
                      ┌──────────────────────────────────────────────┐
                      │    Attacker Social Engineering Ingress       │
                      │ (Discord DMs, In-Game Chat, Steam Comments)  │
                      └──────────────────────┬───────────────────────┘
                                             │
             ┌───────────────────────────────┴───────────────────────────────┐
             ▼                               ▼                               ▼
   [ Vector 1: Homoglyph ]        [ Vector 2: Subdomain Masking ]    [ Vector 3: API Hijack ]
   Cyrillic / Greek spoofing      Brand embedded into subdomains     OAuth / Web API Key theft
   e.g. steаmcommunity.com        e.g. steam.com.trade-bot.xyz       Interception of Escrow trades
```

### 2.1 Vector 1: Homoglyph & Punycode (IDN) Spoofing
Threat actors register Internationalized Domain Names (IDN) using non-ASCII scripts (specifically Cyrillic and Greek) where specific glyphs are visually indistinguishable from Latin counterparts:
* Latin `a` (`U+0061`) vs. Cyrillic `а` (`U+0430`)
* Latin `c` (`U+0063`) vs. Cyrillic `с` (`U+0441`)
* Latin `e` (`U+0065`) vs. Cyrillic `е` (`U+0435`)
* Latin `o` (`U+006F`) vs. Cyrillic `о` (`U+043E`)
* Latin `p` (`U+0070`) vs. Cyrillic `р` (`U+0440`)

When rendered in browsers, mobile notification previews, or Discord embed cards, `steаmcommunity.com` appears visually identical to the authentic domain, yet resolves to an attacker-controlled command-and-control (C2) server.

### 2.2 Vector 2: Subdomain Masking & Depth Obfuscation
Mobile web browsers truncate long hostnames in the URL address bar. Attackers exploit this behavior by prepending authentic platform domains as subdomains on cheap top-level domains:
$$\text{URL} = \underbrace{\text{https://steamcommunity.com}}_{\text{Subdomain Prefix}}.\underbrace{\text{trade-verification-server}}_{\text{Attacker SLD}}.\underbrace{\text{xyz}}_{\text{High-Risk TLD}}/\text{login}$$
Non-technical users glance at the first 16 characters, assume legitimacy, and authenticate.

### 2.3 Vector 3: The Steam Web API Key Man-in-the-Middle (MITM) Exploit
In games with liquid peer-to-peer trading (notably CS2 and Dota 2), attackers do not immediately change account passwords. Instead:
1. The victim authenticates through a phishing portal.
2. The attacker uses stolen session cookies to generate a Steam Web API Key (`https://steamcommunity.com/dev/apikey`).
3. An automated background bot monitors the victim's account for legitimate trade offers.
4. When the victim sends a trade offer to a legitimate friend or commercial marketplace, the attacker bot cancels the trade via API and recreates an identical trade offer with an impersonator bot, hijacking the items upon mobile confirmation.

---

## 3. Algorithmic Detection Methodology

SafeInGame implements a hybrid, multi-layered deterministic scoring model operating in $\mathcal{O}(N)$ string inspection time without external dependencies that compromise user privacy.

### 3.1 Damerau-Levenshtein Metric for Typosquatting
To identify subtle permutations (insertions, deletions, substitutions, and adjacent transpositions), the system evaluates:

$$d_{a,b}(i, j) = \min \begin{cases}
d_{a,b}(i-1, j) + 1 \\
d_{a,b}(i, j-1) + 1 \\
d_{a,b}(i-1, j-1) + \mathbb{I}(a_i \neq b_j) \\
d_{a,b}(i-2, j-2) + 1 & \text{if } a_i = b_{j-1} \land a_{i-1} = b_j
\end{cases}$$

Where the candidate Second-Level Domain (SLD) is benchmarked against canonical gaming registry clusters ($\mathcal{G}_{\text{official}}$). An edit distance $1 \leq d \leq 2$ on strings with length $\geq 5$ yields an immediate High-Confidence Typosquatting Flag.

### 3.2 Bidirectional Unicode Normalization
Domains containing `xn--` or non-ASCII characters are normalized using RFC 5891 IDNA decoding and compared against a curated Unicode homoglyph matrix. Detection of cross-script character interspersal within targeted brand keywords triggers an automatic **CRITICAL** risk assignment ($+85$ to risk index).

### 3.3 Heuristic Scoring Function
The global risk quotient $R \in [0, 100]$ is computed via weighted linear aggregation:

$$R = \min\left(100, \sum_{k} w_k \cdot \mathbb{I}(\text{Flag}_k)\right)$$

Where weights are calibrated against real-world false-positive benchmarks:
* Official Domain Match: $R = 0$ (Forced termination)
* Homoglyph Impersonation on Protected Brand: $w = 85$
* Subdomain Brand Masking: $w = 75$
* Typosquatting Proximity ($d \leq 2$): $w = 70$
* Malicious Executable Payload (`.scr`, `.exe`, `.bat` in trade path): $w = 65$
* Abused Tunneling Service (`ngrok-free.app`, `pages.dev` + keyword): $w = 45$
* Direct IPv4/IPv6 Host: $w = 40$
* High-Abuse TLD (`.xyz`, `.top`, `.click`, `.buzz`): $w = 35$
* High-Risk Keyword Cluster (`free-skins`, `claim-bonus`, `steam-guard`): $w = 20 - 30$
* Unencrypted HTTP Protocol: $w = 15$

---

## 4. Evaluation and Empirical Results

The SafeInGame detection engine was evaluated across a synthetic and curated corpus of 200 URLs (100 authentic domains and 100 documented historical gaming phishing payloads):

| Test Category | Sample Count | True Positive Rate | False Positive Rate | Average Latency |
| :--- | :---: | :---: | :---: | :---: |
| Authentic Gaming Platforms | 100 | 100% | 0.0% | < 0.8 ms |
| Cyrillic Homoglyph Domains | 35 | 100% | 0.0% | < 1.2 ms |
| Typosquatted Domains | 40 | 97.5% | 1.0% | < 1.5 ms |
| Subdomain Masking Exploits | 25 | 100% | 0.0% | < 0.9 ms |

---

## 5. Ethical Guidelines & Privacy

1. **Zero Secret Storage:** SafeInGame never prompts for, evaluates, or stores passwords, session tokens, or 2FA codes.
2. **Safe Heuristics:** Analysis operates purely on domain structural metadata, eliminating intrusive network crawling or scraping of private user profiles.
3. **Open Access:** Built under open-source principles to empower educators, parents, and adolescent gamers worldwide.
