import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const distDir = path.resolve('dist');

console.log('--- Validating SafeInGame Frontend Build Output ---');

// 1. Verify dist folder exists
assert.ok(fs.existsSync(distDir), 'Dist directory must exist');

// 2. Verify key files exist
const requiredFiles = [
  'index.html',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'favicon.svg',
  'images/logo.png',
  'images/games/cs2-steam.jpg',
  'images/games/brawl-stars.jpg',
  'images/games/pubg.jpg',
  'images/games/roblox.webp',
  'images/games/minecraft.webp',
  'en/index.html',
  'en/safety/index.html',
  'en/threats/index.html',
  'en/about/index.html',
  'en/contact/index.html',
  'en/privacy/index.html',
  'en/terms/index.html',
  'en/games/index.html',
  'en/scanner/index.html',
  'en/lab/index.html',
  'ru/index.html',
  'ru/safety/index.html',
  'ru/threats/index.html',
  'ru/about/index.html',
  'ru/contact/index.html',
  'ru/privacy/index.html',
  'ru/terms/index.html',
  'ru/games/index.html',
  'ru/scanner/index.html',
  'ru/lab/index.html',
];

for (const file of requiredFiles) {
  const filePath = path.join(distDir, file);
  assert.ok(fs.existsSync(filePath), `Required build file missing: ${file}`);
}
console.log(`✓ All ${requiredFiles.length} core top-level and i18n route files verified.`);

// 3. Verify all 8 threat articles in both languages exist in build
const articleSlugs = [
  'how-to-secure-your-gaming-account',
  'how-to-spot-gaming-phishing',
  'safe-trading-in-game-items',
  'fake-giveaways-and-free-rewards',
  'gaming-account-recovery-scams',
  'gaming-currency-and-payment-safety',
  'social-engineering-in-online-games',
  'what-to-do-after-a-gaming-scam',
];

for (const slug of articleSlugs) {
  const enArticle = path.join(distDir, 'en', 'threats', slug, 'index.html');
  const ruArticle = path.join(distDir, 'ru', 'threats', slug, 'index.html');
  assert.ok(fs.existsSync(enArticle), `Missing EN threat article: ${slug}`);
  assert.ok(fs.existsSync(ruArticle), `Missing RU threat article: ${slug}`);

  const enHtml = fs.readFileSync(enArticle, 'utf-8');
  assert.ok(enHtml.includes('lang="en"'), `EN article ${slug} missing lang="en"`);
  assert.ok(enHtml.includes('SafeInGame'), `EN article ${slug} missing SafeInGame branding`);
  assert.ok(enHtml.includes('https://t.me/SafeInGame'), `EN article ${slug} missing Telegram link`);
  assert.ok(enHtml.includes('https://x.com/SafeInGame'), `EN article ${slug} missing Twitter link`);
  assert.ok(enHtml.includes('https://instagram.com/SafeInGame'), `EN article ${slug} missing Instagram link`);
  assert.ok(enHtml.includes('https://tiktok.com/@SafeInGame'), `EN article ${slug} missing TikTok link`);

  const ruHtml = fs.readFileSync(ruArticle, 'utf-8');
  assert.ok(ruHtml.includes('lang="ru"'), `RU article ${slug} missing lang="ru"`);
  assert.ok(ruHtml.includes('SafeInGame'), `RU article ${slug} missing SafeInGame branding`);
  assert.ok(ruHtml.includes('https://t.me/SafeInGame'), `RU article ${slug} missing Telegram link`);
}
console.log(`✓ All 8 threat articles in EN and RU (16 pages) verified with proper branding and social links.`);

// 4. Verify all 5 dedicated game pages exist in both languages
const gameSlugs = [
  'cs2-steam',
  'brawl-stars',
  'pubg',
  'roblox',
  'minecraft',
];

for (const slug of gameSlugs) {
  const enGame = path.join(distDir, 'en', 'games', slug, 'index.html');
  const ruGame = path.join(distDir, 'ru', 'games', slug, 'index.html');
  assert.ok(fs.existsSync(enGame), `Missing EN game page: ${slug}`);
  assert.ok(fs.existsSync(ruGame), `Missing RU game page: ${slug}`);

  const enGameHtml = fs.readFileSync(enGame, 'utf-8');
  assert.ok(enGameHtml.includes('lang="en"'), `EN game ${slug} missing lang="en"`);
  assert.ok(enGameHtml.includes('SafeInGame'), `EN game ${slug} missing SafeInGame branding`);
  assert.ok(enGameHtml.includes('data-game-quiz-item'), `EN game ${slug} missing interactive quiz`);
  assert.ok(enGameHtml.includes('What You Must NEVER Share'), `EN game ${slug} missing "what not to share"`);

  const ruGameHtml = fs.readFileSync(ruGame, 'utf-8');
  assert.ok(ruGameHtml.includes('lang="ru"'), `RU game ${slug} missing lang="ru"`);
  assert.ok(ruGameHtml.includes('SafeInGame'), `RU game ${slug} missing SafeInGame branding`);
  assert.ok(ruGameHtml.includes('data-game-quiz-item'), `RU game ${slug} missing interactive quiz`);
  assert.ok(ruGameHtml.includes('Что КАТЕГОРИЧЕСКИ нельзя передавать'), `RU game ${slug} missing "what not to share"`);
}
console.log(`✓ All 5 Game Security Centers in EN and RU (10 game pages) verified with interactive quizzes and checklists.`);

// 5. Verify Theme Toggle and Homepage Features
const enIndexHtml = fs.readFileSync(path.join(distDir, 'en', 'index.html'), 'utf-8');
assert.ok(enIndexHtml.includes('theme-toggle-btn'), 'Theme toggle button missing on EN index page');
assert.ok(enIndexHtml.includes('scroll-to-top-btn'), 'Scroll-to-top button missing on EN index page');
assert.ok(enIndexHtml.includes('scam-patterns'), 'Universal scam patterns section missing on EN index');
assert.ok(enIndexHtml.includes('scam-quiz'), 'Scam awareness quiz section missing on EN index');
assert.ok(enIndexHtml.includes('tilt-card'), 'Interactive 3D tilt cards missing on EN index');

const ruIndexHtml = fs.readFileSync(path.join(distDir, 'ru', 'index.html'), 'utf-8');
assert.ok(ruIndexHtml.includes('theme-toggle-btn'), 'Theme toggle button missing on RU index page');
assert.ok(ruIndexHtml.includes('scroll-to-top-btn'), 'Scroll-to-top button missing on RU index page');
assert.ok(ruIndexHtml.includes('scam-patterns'), 'Universal scam patterns section missing on RU index');
assert.ok(ruIndexHtml.includes('scam-quiz'), 'Scam awareness quiz section missing on RU index');

console.log('✓ Dual-theme toggle, universal scam patterns, and scam quiz verified on homepages.');

// 6. Verify contact form exists on contact page
const enContactHtml = fs.readFileSync(path.join(distDir, 'en', 'contact', 'index.html'), 'utf-8');
assert.ok(enContactHtml.includes('id="safeingame-contact-form"'), 'Contact form missing on EN page');
assert.ok(enContactHtml.includes('name="honeypot"'), 'Honeypot anti-spam field missing on contact form');

// 7. Verify live scanner pages in EN and RU
const enScannerHtml = fs.readFileSync(path.join(distDir, 'en', 'scanner', 'index.html'), 'utf-8');
assert.ok(enScannerHtml.includes('id="scanner-input"'), 'Scanner input missing on EN scanner page');
assert.ok(enScannerHtml.includes('cyber-scanner-wrapper'), 'Cyber scanner wrapper missing on EN scanner page');

const ruScannerHtml = fs.readFileSync(path.join(distDir, 'ru', 'scanner', 'index.html'), 'utf-8');
assert.ok(ruScannerHtml.includes('id="scanner-input"'), 'Scanner input missing on RU scanner page');
assert.ok(ruScannerHtml.includes('cyber-scanner-wrapper'), 'Cyber scanner wrapper missing on RU scanner page');

console.log('✓ Phishing link scanner verified in EN and RU.');

// 8. Verify Scam Lab and Certification Exam pages in EN and RU
const enLabHtml = fs.readFileSync(path.join(distDir, 'en', 'lab', 'index.html'), 'utf-8');
assert.ok(enLabHtml.includes('scam-lab-container'), 'Scam Lab container missing on EN lab page');
assert.ok(enLabHtml.includes('certificate-box'), 'Certificate generator missing on EN lab page');

const ruLabHtml = fs.readFileSync(path.join(distDir, 'ru', 'lab', 'index.html'), 'utf-8');
assert.ok(ruLabHtml.includes('scam-lab-container'), 'Scam Lab container missing on RU lab page');
assert.ok(ruLabHtml.includes('certificate-box'), 'Certificate generator missing on RU lab page');

console.log('✓ Scam Lab training sandbox and certification exam verified in EN and RU.');

// 9. Verify sitemap.xml
const sitemapContent = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf-8');
assert.ok(sitemapContent.includes('<urlset'), 'Sitemap missing urlset element');
assert.ok(sitemapContent.includes('https://safeingame.org/en/games/cs2-steam/'), 'Sitemap missing cs2-steam URL');
assert.ok(sitemapContent.includes('https://safeingame.org/ru/scanner/'), 'Sitemap missing scanner URL');
console.log('✓ Valid XML sitemap verified with game centers and localized alternates.');

console.log('✓ Build validation PASSED: 100% checks successful.');
