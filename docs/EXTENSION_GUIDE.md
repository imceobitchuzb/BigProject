# SafeInGame Shield — Chrome Browser Extension (Manifest V3)

**Directory:** `/extension`  
**Standard:** Google Chrome Extensions Manifest V3  
**Compatibility:** Google Chrome, Brave, Microsoft Edge, Opera, Arc

---

## 1. Overview

**SafeInGame Shield** is an active, real-time client-side companion extension designed to safeguard players against domain spoofing, homoglyph attacks, and typosquatting scams across gaming ecosystems.

### Key Capabilities:
1. **Background URL Interceptor:** Monitors active tab navigation to flag deceptive Unicode / Punycode homoglyph domains (e.g. `steаmcommunity.com` with Cyrillic characters) before credentials can be submitted.
2. **Interactive Popup HUD:** One-click domain safety auditing and on-demand URL analysis powered by the SafeInGame Link Scanner API (`http://127.0.0.1:8000/api/v1/scanner/check`).
3. **Emergency Warning Banner:** Injects an in-browser red alert banner with a "Go to Safety" exit action when visiting confirmed malicious clones.
4. **Offline Resilience:** Seamlessly falls back to local heuristic rules if the backend server is unreachable.

---

## 2. Installation & Quick Start (Developer Mode)

To install and run the extension locally in less than 30 seconds:

1. Open your Chromium-based browser (Chrome, Brave, Edge).
2. Navigate to `chrome://extensions/` (or `edge://extensions/`).
3. Toggle the **"Developer mode"** switch in the top right corner.
4. Click the **"Load unpacked"** button in the top left toolbar.
5. Select the `extension/` folder inside this repository:
   ```
   c:\Users\user\Documents\SafeInGame\extension
   ```
6. The **SafeInGame Shield** icon will appear in your browser toolbar. Pin it for quick access!

---

## 3. Architecture & File Structure

```
extension/
├── manifest.json       # Manifest V3 configuration & permission boundaries
├── background.js       # Asynchronous Service Worker inspecting tab navigation
├── content.js          # Injected DOM script rendering emergency threat warning
├── popup.html          # Cyber HUD interface for active tab status and manual scans
├── popup.css           # Dark-mode gaming UI styled to match SafeInGame branding
├── popup.js            # Frontend logic and API client
└── icons/              # Multi-resolution icons (16x16, 48x48, 128x128)
```

---

## 4. Privacy & Permissions

* **No Credential Access:** The extension NEVER inspects passwords, cookies, or form inputs.
* **Minimal Privileges:** Uses only `activeTab` and `storage` permissions required to query URLs and persist user preferences.
* **Zero Telemetry:** No user analytics, browsing history, or personal data are collected or sold.
