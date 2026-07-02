# Development guide — Baseline Tap

This branch (`dev`) is the working copy for all roadmap work. The safety model
exists because the production branch **is** production: every push to
`claude/disney-trip-planner-design-p89zx9` auto-deploys to the live site the
family uses. Read this before changing anything.

## The two branches

| Branch | What it is | What a push does |
|---|---|---|
| `claude/disney-trip-planner-design-p89zx9` | **PRODUCTION.** Frozen at Build 345 until after the trip. | Auto-deploys to disney-trip-planner-447d7.web.app within minutes. |
| `dev` | All new work (audit roadmap items). Shows "(DEV)" in the title and `346-dev` as the build. | Deploys **nothing**. Ever. Preview deploys are manual-only. |

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

## Identity rules (the ones that matter)

- The family workspace and the family Google accounts are **production data**.
  Dev work never signs into them, from any environment.
- The test account gets its own tenant for dev. If a dev bug wrecks it, that's
  the system working.

## Where the work queue lives

The full audit (findings F-01..F-14, roadmap steps 1–6) is the plan of record.
Suggested order on this branch:

1. Per-item sync engine (F-01/F-09/F-12) — one collection at a time, packing
   first, each behind the headless test suite.
2. Retire the fictional seed (F-02) — blank-first boot, demo behind a button.
3. Rules hardening + CSP (F-05..F-08) — staged against a test workspace
   before ever touching the live project's rules.
4. Ops: CI test gate on this branch, sync-health chip, error hook (F-10/F-13).
5. Housekeeping (F-14).

## Verification habits (non-negotiable after this week)

- `node --check js/app.js js/cloud.js` before every commit.
- Run the headless suites (see scratchpad tests referenced in commit history;
  they seed localStorage, drive the real page in Chromium, and assert on
  behavior) before anything merges toward production.
- Any change to sync, backups, or boot gets a new test, not just a manual look.
