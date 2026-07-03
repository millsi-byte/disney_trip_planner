/* Audit F-10: the app knew about failures it never surfaced.
   Verifies the three slice-4 pieces: the global error ring buffer
   ('dtperrors' + protective first-error snapshot), the syncHealth()
   readout states, and the one-toast-per-key push-failure announcer. */
const { chromium, APP_URL, LAUNCH_OPTS, report } = require('../_env');

(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const out = {};

  /* ── A. uncaught errors land in the ring buffer + trigger a snapshot ── */
  {
    const page = await (await browser.newContext()).newPage();
    await page.addInitScript(() => { localStorage.setItem('dtp_ver', '11'); });
    await page.goto(APP_URL, { waitUntil: 'load' });
    await page.waitForTimeout(500);
    Object.assign(out, await page.evaluate(() => {
      const r = {};
      loadDemoData(true);                       // so the snapshot has content
      const before = loadBackups().length;
      setTimeout(() => { throw new Error('dtp-test-boom'); }, 0);
      return new Promise(res => setTimeout(() => {
        const errs = recentErrors();
        r.errorRecorded = errs.some(e => (e.m || '').includes('dtp-test-boom'));
        r.errorHasShape = errs.every(e => typeof e.t === 'number' && typeof e.k === 'string' && typeof e.b === 'string');
        r.firstErrorSnapshot = loadBackups().length > before;
        // ring buffer is bounded at 30
        const log = [];
        for (let i = 0; i < 40; i++) log.push({ t: Date.now(), k: 'error', m: 'x' + i, s: '', b: 'test' });
        localStorage.setItem('dtperrors', JSON.stringify(log.slice(-40)));
        window.dispatchEvent(new ErrorEvent('error', { message: 'overflow-probe' }));
        r.ringBounded = recentErrors().length <= 30;
        // backups screen surfaces the log
        S.screen = { type: 'backups' };
        r.backupsShowsErrors = scrBackups().includes('error') && scrBackups().includes('Dismiss error log');
        localStorage.removeItem('dtperrors');
        r.backupsClearsCleanly = !scrBackups().includes('Dismiss error log');
        res(r);
      }, 300));
    }));
    await page.context().close();
  }

  /* ── B. syncHealth() states + push-failure toast (once per key) ── */
  {
    const page = await (await browser.newContext()).newPage();
    await page.addInitScript(() => { localStorage.setItem('dtp_ver', '11'); });
    await page.goto(APP_URL, { waitUntil: 'load' });
    await page.waitForTimeout(500);
    Object.assign(out, await page.evaluate(() => {
      const r = {};
      window.CLOUD = undefined;
      r.stateLocalOnly = syncHealth().t.indexOf('Local only') === 0;
      window.CLOUD = { enabled: true, user: null };
      r.stateSignedOut = syncHealth().t.indexOf('Signed out') === 0;
      window.CLOUD = { enabled: true, user: { uid: 'u' }, synced: false };
      r.stateConnecting = syncHealth().t.indexOf('Connecting') === 0;
      window.CLOUD = { enabled: true, user: { uid: 'u' }, synced: true };
      r.stateSynced = syncHealth().t.indexOf('Synced') === 0;
      window.CLOUD._lastPushErr = { key: 'dtp_days_x', msg: 'quota' };
      const failed = syncHealth();
      r.stateFailed = failed.c === '#DC2626' && failed.t.includes('dtp_days_x');
      r.lineRendersDot = syncHealthLine().includes(failed.c);
      // toast announcer: once per key, ignores empty
      const toasts = [];
      window.toast = m => toasts.push(m);
      onSyncPushFailed(null);
      onSyncPushFailed({ key: 'dtp_days_x' });
      onSyncPushFailed({ key: 'dtp_days_x' });
      onSyncPushFailed({ key: 'dtp_trips' });
      r.toastOncePerKey = toasts.length === 2 && toasts[0].includes('dtp_days_x') && toasts[1].includes('dtp_trips');
      return r;
    }));
    await page.context().close();
  }

  await browser.close();
  report(out);
})();
