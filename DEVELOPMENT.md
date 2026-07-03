# Development guide — Baseline Tap

This branch (`dev`) is the working copy for all roadmap work. The safety model
exists because the production branch **is** production: every push to
`claude/disney-trip-planner-design-p89zx9` auto-deploys to the live site the
family uses. Read this before changing anything.

## The two branches

| Branch | What it is | What a push does |
|---|---|---|
| `claude/disney-trip-planner-design-p89zx9` | **PRODUCTION.** Frozen at Build 345 until after the trip. | Auto-deploys to disney-trip-planner-447d7.web.app within minutes. |
| `dev` | All new work (audit roadmap items). Shows "(DEV)" in the title and `<n>-dev` as the build. | Deploys **nothing** automatically. Preview deploys are manual-only; every push runs the CI test suite. |

Rules of the freeze:
- **No pushes to the production branch until after the trip**, except a
  genuinely necessary hotfix — and then cherry-pick a single verified commit,
  never merge `dev` wholesale.
- After the trip: merge `dev` → production in roadmap-step-sized pieces, each
  with its tests run first, never all at once.

## Three ways to run the dev copy, by risk level

### 1. Local, cloud OFF — zero risk (use for most feature/UI work)
Serve the folder and open it; without a signed-in Firebase user the app runs
in pure localStorage mode (cloud.js guards handle this):

```bash
cd disney_trip_planner
python3 -m http.server 8080        # or: npx serve .
# open http://localhost:8080 — do NOT sign in; work with local/demo data
```

Nothing you do here can touch the family's data. localStorage at
`localhost:8080` is its own world.

### 2. Local, Firebase EMULATOR — for sync-engine work (roadmap step 2)
The per-item sync rewrite needs a real Firestore to develop against. Use the
emulator, never the live project:

```bash
npm i -g firebase-tools            # once
firebase emulators:start --only firestore,auth --project demo-dtp
```

Point the app at it by adding, temporarily in `js/cloud.js` right after
`firebase.initializeApp(...)` (never commit this to production):

```js
try{ firebase.firestore().useEmulator('localhost',8080);
     firebase.auth().useEmulator('http://localhost:9099'); }catch(e){}
```

Emulator data is throwaway; wipe it freely. This is where destructive-path
testing (wipes, migrations, reconcile races) belongs.

### 3. Preview channel — for testing on a real phone (manual, careful)
Actions tab → **"Deploy DEV preview channel"** → Run workflow (from `dev`).
You get a separate URL (`…--dev-<hash>.web.app`) that:

- never touches the live site or its service worker;
- has its **own localStorage** (different origin) — the phone's real app data
  is untouched;
- **shares the LIVE Firestore if you sign in.** For anything that writes,
  sign in with the test account (DisneyTripPlanner12@gmail.com) only, inside
  its own test tenant. Never the family account, never the family workspace.

**One-time Google sign-in setup per channel domain.** firebase-config.js
points authDomain at the preview host itself (otherwise the redirect result
lands on the production origin and the preview bounces back to the login
screen), which means Google must recognize the preview domain. Once per
channel URL, in [Google Cloud console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials?project=disney-trip-planner-447d7)
open the auto-created **Web client** and add:
- Authorized JavaScript origins: `https://<channel-domain>`
- Authorized redirect URIs: `https://<channel-domain>/__/auth/handler`
Also confirm the domain is in Firebase console → Authentication → Settings →
Authorized domains (channel deploys usually add it automatically). The
channel URL is stable across redeploys, so this really is one-time.

## Identity rules (the ones that matter)

- The family workspace and the family Google accounts are **production data**.
  Dev work never signs into them, from any environment.
- The test account gets its own tenant for dev. If a dev bug wrecks it, that's
  the system working.

## Where the work queue lives

The full audit (findings F-01..F-14, roadmap steps 1–6) is the plan of record.
Status on this branch:

1. ✅ Tests in-repo + CI gate (F-13 dev side) — `tests/ci/`, runs on every push.
2. ✅ Sharded list sync (F-01 Tier A / F-09) — Build 347-dev. **ROLLOUT RULE:
   all devices must update to ≥347 together when this merges to production —
   the migration empties the legacy combined blobs, so a device left on ≤345
   will see empty lists (it can't read shards). Nothing is lost (shards hold
   everything), but don't mix builds across the family.**
3. ✅ Blank-first boot (F-02) — Build 348-dev. The fictional seed lives in the
   `DEMO` bundle (js/data.js); a fresh device boots EMPTY. `loadDemoData()` is
   explicit, confirm-gated, and refuses to run while signed in. Tests that need
   the demo dataset call `loadDemoData(true)` in-page after boot.
4. ✅ Sync health + error surfacing (F-10) — Build 349-dev. `syncHealth()` line
   on the profile screen, `onSyncPushFailed` toast, `dtperrors` ring buffer +
   first-error protective snapshot, error card in Backups.
5. ✅ CSP + security headers (F-08) — in `firebase.json` hosting headers (NOT a
   meta tag, so `file://` tests are unaffected). **Deployed nowhere yet** — it
   ships with the next manual dev-preview deploy; verify sign-in + Firestore
   sync + Google Fonts all work on the preview URL before it ever merges.
   Note: headers apply to the reserved `/__/auth/*` pages too, which is why
   `apis.google.com` / `www.gstatic.com` are in `script-src`.
6. 📋 Hardened Firestore rules — `firestore.rules.proposed` (NOT deployed).
   Review the CHANGED markers, test against a throwaway workspace, then rename
   over `firestore.rules` and `firebase deploy --only firestore:rules`.
7. ✅ Per-item sync engine (F-01 Tier B) — Build 350-dev. One doc per item for
   the ten global collections, flag-gated per collection (Backups → "Per-item
   sync"), shadow-diff pushes, tombstoned deletes, parity-checked migration
   with one-tap rollback. Design + implementation deltas:
   `docs/PER_ITEM_SYNC_DESIGN.md`. Two-device behavioral suite:
   `tests/ci/test_item_sync.js` against `tests/_fakefire.js`. **Dormant until
   the proposed rules deploy** (items/meta match blocks) — flags unreadable =
   blob mode, exactly as before. Before any production merge: run it against
   the real emulator once (§2 above), then enable ONE collection (dining) for
   a trial week.
8. Housekeeping (F-14) — open.

## Tests

- `tests/ci/` — strict suites; every assertion must be `true` or the process
  exits nonzero. `npm test` (or `node tests/ci/run.js`) runs them all; CI does
  this on every push to `dev` and every PR to production.
- `tests/manual/` — older eyeball suites (print JSON, you read it). Run by
  hand when touching their areas: passes, wishlist, wizard-skip, backups,
  boot flows.
- `tests/_env.js` resolves Chromium: system Playwright install, or
  `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
  in sandboxes.

## Verification habits (non-negotiable after this week)

- `node --check js/app.js js/cloud.js` before every commit.
- `npm test` green before every push.
- Any change to sync, backups, or boot gets a new CI test, not just a manual
  look — `test_durability.js`, `test_list_shards.js`, `test_blank_boot.js`,
  and `test_sync_health.js` are the patterns to copy.
