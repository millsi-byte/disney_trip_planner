const { chromium, APP_URL, LAUNCH_OPTS } = require('../_env');
const path = require('path');
const url = APP_URL;

(async () => {
  const browser = await chromium.launch(LAUNCH_OPTS);
  const page = await browser.newPage();
  const logs = [];
  page.on('console', m => logs.push(m.text()));
  page.on('pageerror', e => logs.push('PAGEERR: ' + e.message));

  // Seed BEFORE any app script runs: a legacy Build-331 multi-person pass.
  await page.addInitScript(() => {
    try {
      localStorage.setItem('dtp_ver', '11');                   // match DATA_VERSION so boot doesn't wipe seed
      localStorage.setItem('dtp_persona', 'scott');
      localStorage.setItem('dtp_passes', JSON.stringify([
        { id:'apX', category:'ap', who:['scott','hayley'], tier:'sorcerer', activation:'2026-01-10', expiration:'2027-01-10', activated:true }
      ]));
    } catch(e){}
  });

  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(800);
  await page.evaluate(() => loadDemoData(true));   // blank-first boot: opt into demo dataset

  const r = await page.evaluate(() => {
    const out = {};
    // demo load (above) wiped dtp_passes — re-seed the legacy who[] pass and
    // re-run the migration so the per-person expansion is still exercised
    localStorage.setItem('dtp_passes', JSON.stringify([
      { id:'apX', category:'ap', who:['scott','hayley'], tier:'sorcerer', activation:'2026-01-10', expiration:'2027-01-10', activated:true }
    ]));
    PASSES = load('dtp_passes', []);
    migratePasses();
    // 1. Migration: who[] -> per-person single records
    out.passCount = PASSES.length;
    out.allHavePerson = PASSES.every(p => typeof p.person === 'string' && p.person);
    out.noneHaveWho = PASSES.every(p => p.who === undefined);
    out.allNamed = PASSES.every(p => typeof p.name === 'string' && p.name.length);
    out.names = PASSES.map(p => p.name);
    out.persons = PASSES.map(p => p.person).sort();

    // 2/3. Permissions + editor as ADMIN (scott)
    S.persona = 'scott';
    S.screen = { type:'passes' };
    const adminList = scrPasses();
    out.adminSeesBoth = (adminList.match(/ov-card/g) || []).length >= 2;
    S.screen = { type:'passedit' };
    S._formInit = null;
    const adminEditor = scrPassEdit();
    out.adminHasPicker = adminEditor.includes('id="pass-person"') && adminEditor.includes('<select');
    out.editorHasName = adminEditor.includes('id="pass-name"');

    // Permissions as NON-ADMIN (hayley)
    S.persona = 'hayley';
    S.screen = { type:'passes' };
    S._formInit = null;
    const memberList = scrPasses();
    out.memberCardCount = (memberList.match(/ov-card/g) || []).length;
    S.screen = { type:'passedit' };
    S._formInit = null;
    const memberEditor = scrPassEdit();
    out.memberNoPicker = !memberEditor.includes('id="pass-person"');
    out.memberEditorHasName = memberEditor.includes('id="pass-name"');

    // 4. Metadata surface in person editors
    S.persona = 'scott';
    S.screen = { type:'personedit', pid:'hayley' };
    S._formInit = null;
    const pe = scrPersonEdit();
    out.personEditHasPasses = pe.includes('Annual passes') && pe.includes('peGotoPass');
    S.screen = { type:'persondetails', pid:'hayley' };
    out.detailsForOtherNoPasses = !scrPersonDetails().includes('pdGotoPass');
    S.persona = 'hayley';
    S.screen = { type:'persondetails', pid:'hayley' };
    out.detailsForSelfHasPasses = scrPersonDetails().includes('pdGotoPass');

    // 5. Footer: two add buttons rendered with spacing wrapper
    S.persona = 'scott';
    S.screen = { type:'section', section:'tickets' };
    let sectionHtml = '';
    try { sectionHtml = scrSection(); } catch(e){ out.sectionErr = e.message; }
    out.hasStack = sectionHtml.includes('sec-add-stack');
    out.twoAddButtons = (sectionHtml.match(/class="sec-add"/g) || []).length === 2;

    // 6. Coverage: ticketsFor includes an active pass for a trip member
    S.persona = 'scott';
    // ensure scott on the active trip
    out.tripId = S.tripId;
    const within = ticketsFor('2026-07-15') || [];
    out.coverageHasAP = within.some(t => t.category === 'ap' && t.person === 'scott');

    return out;
  });

  console.log(JSON.stringify(r, null, 2));
  if (logs.length) console.log('--- console/pageerrors ---\n' + logs.join('\n'));
  await browser.close();
})();
