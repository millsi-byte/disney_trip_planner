/* Shared test environment. Tests drive the REAL app (index.html) in headless
   Chromium via Playwright — no mocking of the app itself, only of window.CLOUD
   where a test needs to observe sync calls.
   Resolution order for the browser:
     1. `npm install` + `npx playwright install chromium` (CI, local dev)
     2. PLAYWRIGHT_CHROMIUM_PATH env var pointing at a chrome binary
     3. the Claude sandbox's preinstalled playwright (fallback) */
const path = require('path');

let chromium;
try { chromium = require('playwright').chromium; }
catch (e) {
  try { chromium = require('/opt/node22/lib/node_modules/playwright').chromium; }
  catch (e2) { throw new Error('playwright not found — run `npm install` then `npx playwright install chromium`'); }
}

const APP_URL = 'file://' + path.resolve(__dirname, '..', 'index.html');
const LAUNCH_OPTS = process.env.PLAYWRIGHT_CHROMIUM_PATH
  ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
  : {};

/* strict assertion helper: collect named boolean checks, exit(1) on any failure */
function report(results) {
  console.log(JSON.stringify(results, null, 2));
  const bad = Object.entries(results).filter(([, v]) => v !== true);
  if (bad.length) { console.log('FAILURES: ' + bad.map(([k]) => k).join(', ')); process.exit(1); }
  console.log('ALL PASS');
}

module.exports = { chromium, APP_URL, LAUNCH_OPTS, report };
