/**
 * SafeInGame Shield — Background Service Worker (Manifest V3)
 * Monitors tab navigation events and triggers warnings on confirmed phishing targets.
 */

chrome.runtime.onInstalled.addListener(() => {
  console.log("SafeInGame Shield Extension v1.0.0 installed successfully.");
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && !tab.url.startsWith("chrome://")) {
    try {
      const urlObj = new URL(tab.url);
      const host = urlObj.hostname.toLowerCase();

      // Quick offline check for obvious spoofing patterns
      const hasCyrillic = /[\u0400-\u04FF]/.test(host);
      const isDangerousTypo = host.includes("communiity") || host.includes("stema") || host.includes("robl0x");

      if (hasCyrillic || isDangerousTypo) {
        chrome.tabs.sendMessage(tabId, {
          action: "SAFEINGAME_ALERT_THREAT",
          payload: {
            domain: host,
            threatType: hasCyrillic ? "Homoglyph Attack (Spoofed Characters)" : "Typosquatting Brand Clone",
            advice: "Do not enter passwords, Steam Guard, or 2FA codes on this website!"
          }
        }).catch(() => {});
      }
    } catch (e) {
      // Ignore unparseable internal URLs
    }
  }
});
