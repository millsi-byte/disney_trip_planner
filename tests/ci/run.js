/* CI test runner: executes every test_*.js in this directory sequentially.
   Each test must exit 0 on success and nonzero on any failed assertion
   (use report() from ../_env). The manual/ directory holds older suites
   written for eyeball verification — run those by hand, not here. */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const tests = fs.readdirSync(dir).filter(f => /^test_.*\.js$/.test(f)).sort();
let failed = [];

for (const t of tests) {
  process.stdout.write('\n=== ' + t + ' ===\n');
  try {
    execFileSync(process.execPath, [path.join(dir, t)], { stdio: 'inherit', timeout: 180000 });
  } catch (e) {
    failed.push(t);
  }
}

console.log('\n' + '='.repeat(50));
if (failed.length) { console.log('FAILED: ' + failed.join(', ')); process.exit(1); }
console.log('All ' + tests.length + ' CI suites passed.');
