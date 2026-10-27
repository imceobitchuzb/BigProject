document.addEventListener('DOMContentLoaded', async () => {
  const tabDomainEl = document.getElementById('tab-domain');
  const tabRiskBadge = document.getElementById('tab-risk-badge');
  const tabVerdictEl = document.getElementById('tab-verdict');
  const urlInput = document.getElementById('url-input');
  const btnScan = document.getElementById('btn-scan');
  const resCard = document.getElementById('scan-result-card');
  const resDomain = document.getElementById('res-domain');
  const resScore = document.getElementById('res-score');
  const resVerdict = document.getElementById('res-verdict');
  const resFlags = document.getElementById('res-flags');

  // Query current active tab
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url) {
      const urlObj = new URL(tab.url);
      const host = urlObj.hostname;
      tabDomainEl.textContent = host;

      const scan = await scanUrl(tab.url);
      if (scan.risk_score >= 70) {
        tabRiskBadge.className = 'badge badge-critical';
        tabRiskBadge.textContent = 'CRITICAL';
        tabVerdictEl.textContent = '🚨 Threat Detected! Do not enter passwords or 2FA codes.';
      } else if (scan.risk_score >= 35) {
        tabRiskBadge.className = 'badge';
        tabRiskBadge.style.color = '#FBBF24';
        tabRiskBadge.textContent = 'CAUTION';
        tabVerdictEl.textContent = '⚠ Unverified third-party domain.';
      } else {
        tabRiskBadge.className = 'badge badge-safe';
        tabRiskBadge.textContent = 'SAFE';
        tabVerdictEl.textContent = scan.is_official_domain
          ? '✓ Official gaming platform verified.'
          : '✓ No evident phishing patterns detected.';
      }
    } else {
      tabDomainEl.textContent = 'System / New Tab';
      tabVerdictEl.textContent = 'Ready to inspect gaming links.';
    }
  } catch (err) {
    tabDomainEl.textContent = 'Active tab inspector ready';
  }

  // Handle manual scan button
  btnScan.addEventListener('click', async () => {
    const val = urlInput.value.trim();
    if (!val) return;

    btnScan.textContent = '...';
    btnScan.disabled = true;

    try {
      const scan = await scanUrl(val);
      resCard.classList.remove('hidden');
      resDomain.textContent = scan.domain || val;
      resScore.textContent = `${scan.risk_score}% Risk`;
      resVerdict.textContent = scan.verdict;

      resFlags.innerHTML = '';
      if (scan.flags && scan.flags.length > 0) {
        scan.flags.forEach(f => {
          const div = document.createElement('div');
          div.className = 'flag-chip';
          div.textContent = `${f.name}: ${f.description}`;
          resFlags.appendChild(div);
        });
      }
    } catch (e) {
      alert('Error analyzing URL.');
    } finally {
      btnScan.textContent = 'SCAN';
      btnScan.disabled = false;
    }
  });

  async function scanUrl(urlStr) {
    // 1. Try local FastAPI endpoint
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/scanner/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlStr, lang: 'en' })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Backend not running, use extension heuristic fallback
    }

    // 2. Extension local heuristic fallback
    const lower = urlStr.toLowerCase();
    const hasCyrillic = /[\u0400-\u04FF]/.test(lower);
    const isTypo = lower.includes('communiity') || lower.includes('stema') || lower.includes('robl0x');
    const isScam = lower.includes('free-skins') || lower.includes('.click') || lower.includes('.xyz');

    if (hasCyrillic || isTypo) {
      return {
        domain: urlStr,
        risk_score: 95,
        risk_level: 'CRITICAL',
        verdict: 'Critical Phishing Threat! Deceptive homoglyph or typosquatted brand clone detected.',
        flags: [{ name: 'Homoglyph / Typosquatting', description: 'Visually spoofing authentic gaming platform.' }]
      };
    }

    if (lower.includes('steampowered.com') || lower.includes('steamcommunity.com') || lower.includes('roblox.com') || lower.includes('discord.com')) {
      return {
        domain: urlStr,
        risk_score: 0,
        risk_level: 'SAFE',
        is_official_domain: true,
        verdict: 'Safe. Verified official gaming platform.',
        flags: []
      };
    }

    return {
      domain: urlStr,
      risk_score: isScam ? 75 : 15,
      risk_level: isScam ? 'CRITICAL' : 'SAFE',
      verdict: isScam ? 'Suspicious lure detected.' : 'Standard web resource.',
      flags: []
    };
  }
});
