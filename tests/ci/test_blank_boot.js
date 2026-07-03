/* Audit F-02: blank-first boot. The fictional seed is no longer the app's
   baseline state — a device with no saved data boots EMPTY, and demo data
   only arrives via the explicit loadDemoData() action. */
const { chromium, APP_URL, LAUNCH_OPTS, report } = require('../_env');

(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const out = {};
  const errs = [];

  /* ── A. brand-new install boots blank — nothing seeded, nothing written ── */
  {
    const page = await (await browser.newContext()).newPage();
    page.on('pageerror', e => errs.push('A:' + e.message));
    await page.addInitScript(() => { localStorage.setItem('dtp_ver', '11'); });
    await page.goto(APP_URL, { waitUntil: 'load' });
    await page.waitForTimeout(700);
    Object.assign(out, await page.evaluate(() => ({
      blankFamily: FAMILY.length === 0,
      blankTrips: TRIPS.length === 0,
      blankPacking: Object.keys(PACKING).length === 0,
      blankTodo: TODO.length === 0,
      noPhantomGroup: PARTIES.length === 0,
      noDaysKeysWritten: !Object.keys(localStorage).some(k => k.indexOf('dtp_days') === 0),
      noListKeysWritten: !Object.keys(localStorage).some(k => /^dtp_(packing|todo|wishlist)_/.test(k) && k !== 'dtp_todo_tmpl'),
      demoBundleExists: typeof DEMO !== 'undefined' && DEMO.FAMILY.length === 5
    })));
    await page.context().close();
  }

  /* ── B. explicit demo load populates + persists + shards + is refused when signed in ── */
  {
    const page = await (await browser.newContext()).newPage();
    await page.addInitScript(() => { localStorage.setItem('dtp_ver', '11'); });
    await page.goto(APP_URL, { waitUntil: 'load' });
    await page.waitForTimeout(700);
    Object.assign(out, await page.evaluate(() => {
      const r = {};
      loadDemoData(true);
      r.demoFamily = FAMILY.length === 5 && !!person('scott');
      r.demoTrips = TRIPS.some(t => t.id === 'jul26');
      r.demoPersona = S.persona === 'scott' && S.tripId === 'jul26';
      r.demoPackingInMemory = (PACKING.scott || []).length > 0;
      r.demoWritesShards = (localStorage.getItem('dtp_packing_jul26_scott') || '').includes('Gold Bond');
      r.demoTodoShards = (localStorage.getItem('dtp_todo_jul26_scott') || '').includes('Book hotel');
      r.demoDaysPersisted = Object.keys(localStorage).some(k => k.indexOf('dtp_days_') === 0);
      r.demoGroup = PARTIES.length === 1 && PARTIES[0].name === 'My Group';
      // refused while signed in: demo must never overwrite a synced account
      window.CLOUD = { enabled: true, user: { uid: 'u1' } };
      const famBefore = JSON.stringify(FAMILY);
      loadDemoData(true);
      r.demoRefusedWhenSignedIn = JSON.stringify(FAMILY) === famBefore;
      return r;
    }));
    await page.context().close();
  }

  /* ── C. cloud-used device with no cache still boots blank + locked (F-02/F-04 guard intact) ── */
  {
    const page = await (await browser.newContext()).newPage();
    await page.addInitScript(() => {
      localStorage.setItem('dtp_ver', '11');
      localStorage.setItem('dtp__lastuid', 'someRealUid');
    });
    await page.goto(APP_URL, { waitUntil: 'load' });
    Object.assign(out, await page.evaluate(() => ({
      cloudDeviceBlank: FAMILY.length === 0 && TRIPS.length === 0,
      cloudDeviceAwaiting: awaitingFirstCloudSync() === true
    })));
    await page.context().close();
  }

  await browser.close();
  out.noPageErrorsOnBlankBoot = errs.length === 0;
  if (errs.length) console.log(errs.join('\n'));
  report(out);
})();
