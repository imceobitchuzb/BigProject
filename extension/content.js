/**
 * SafeInGame Shield — Content Script
 * Injects a warning banner if the background worker flags a critical phishing target.
 */

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "SAFEINGAME_ALERT_THREAT") {
    showSafeInGameWarning(message.payload);
  }
});

function showSafeInGameWarning(data) {
  if (document.getElementById("safeingame-threat-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "safeingame-threat-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2147483647;
    background: #7F1D1D;
    color: #FFFFFF;
    padding: 16px 24px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-bottom: 2px solid #EF4444;
  `;

  overlay.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 28px;">🚨</span>
      <div>
        <div style="font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
          SafeInGame Warning: Suspected Phishing Website
        </div>
        <div style="font-size: 12px; opacity: 0.9; margin-top: 2px;">
          <strong>${data.domain}</strong> — ${data.threatType}. ${data.advice}
        </div>
      </div>
    </div>
    <div style="display: flex; gap: 8px;">
      <button id="sig-btn-back" style="background: #FFFFFF; color: #7F1D1D; font-weight: 800; font-size: 12px; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">
        Go to Safety (Back)
      </button>
      <button id="sig-btn-dismiss" style="background: rgba(0,0,0,0.3); color: #FFFFFF; font-weight: 600; font-size: 12px; border: 1px solid rgba(255,255,255,0.4); padding: 8px 12px; border-radius: 6px; cursor: pointer;">
        Dismiss
      </button>
    </div>
  `;

  document.body.prepend(overlay);

  document.getElementById("sig-btn-back").addEventListener("click", () => {
    window.history.back();
  });

  document.getElementById("sig-btn-dismiss").addEventListener("click", () => {
    overlay.remove();
  });
}
