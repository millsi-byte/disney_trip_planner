# Baseline Tap — Disney Trip Planner

## Critical rules (do NOT break these)

### "My Group" phantom creation — THREE sources, ALL must be guarded
"My Group" auto-creates whenever PARTIES is empty. There are THREE places:
1. **Boot seed** (line ~121): runs at script init before S or CLOUD exist.
   Guarded by checking `localStorage.getItem('dtp__lastuid')` — if cloud has
   ever been used on this device, skip the seed and leave PARTIES=[].
2. **ensurePartyTags()** (line ~128): runs on every rehydrate/render. Same
   `dtp__lastuid` guard, PLUS `S._freshTenant` flag for mid-session resets.
3. **resetToBlank()** sets `PARTIES=[]` intentionally — the wizard creates
   the real group. Set `S._freshTenant=true` BEFORE calling `resetToBlank()`
   in every tenant-creation path. Clear it in `ntFinish`, `ntCancel`, `wizSkip`.

NEVER add a new auto-seed for PARTIES without these guards.

### Tenant vs Group vs Trip — the data model
- **Tenant** = Firestore workspace doc (`workspaces/{wid}`). Has its own `name`
  field. Shown in the profile/account switcher. Created via `CLOUD.createParty`
  (first tenant) or `CLOUD.createOwnTenant` (additional tenants).
- **Group** (aka "party") = local `PARTIES[]` array entry. A reusable list of
  people within a tenant. Has its own `name`. Created in the trip wizard.
  Tenant name and group name are INDEPENDENT — do not auto-name one from the other.
- **Trip** = belongs to a group within a tenant.

### canCreateTrip() rules
Only these users can plan a new trip:
1. Super-admin
2. Admin of their CURRENT tenant (isAdmin() — has admin:true on their persona)
3. Authorized owner with NO tenant yet (first-time setup — wizard creates both)

An authorized owner who is a NON-ADMIN MEMBER of someone else's tenant CANNOT
create trips in that tenant. They must create their own tenant first (via the
profile page "Create a new tenant" button), switch to it, and then they can plan.

### "Plan a New Trip" vs "Create a New Tenant"
These are SEPARATE actions. Never conflate them:
- **Plan a New Trip**: creates a trip in the CURRENT active tenant. Gated by
  `canCreateTrip()`. No tenant-creation side effects.
- **Create a New Tenant**: explicit action in the profile page. Shows a name
  input field so the user picks the name. Uses `CLOUD.createOwnTenant`, then
  `resetToBlank` + `commitActive`. Drops into wizard for first trip setup.

### Cloud sync — local recency MUST be recorded on every save (data-loss guard)
`save()` (app.js) writes localStorage then calls `CLOUD.push(k,v)`. `CLOUD.push`
MUST stamp `times[k]=Date.now()` for every genuine local write — even when it
can't upload right now (`!C.synced` during a reconcile, `!C.user`, offline).
Sync is last-write-wins by per-key timestamp (`dtp__synctimes`). If a local
edit's timestamp is NOT bumped, the next `reconcile()` sees the cloud copy as
newer-or-equal (`cts>=lts`) and OVERWRITES the edit that never got pushed —
silent data loss (this is what wiped day strategies/day plans pre-Build 210).
- Only skip stamping when `C.applyingRemote` (the write originated from cloud).
- `reconcile()` sets `C.synced=false` for the whole round-trip (sign-in, tenant
  switch, `commitActive`, periodic merge) — that is the danger window. Recording
  recency makes reconcile PUSH the local edit up instead of clobbering it.
- NEVER gate the `times[k]=ts` recording behind `C.synced`/`C.user`.

### Cloud sync — stale-data guard + resilient push (Build 212)
- **Stale-data guard (`startSync`):** if signing in to a tenant for which this
  device holds NO local trip data (`dtp_trips` empty), reconcile in **adopt**
  (pull-only) mode, never merge. A blank/fresh device must never push its empty
  state up and clobber a tenant another member filled in. Devices that already
  hold data still merge (timestamps protect offline edits). Joins are already
  adopt-only.
- **Resilient push (`_pushKey`):** `CLOUD.push` must NOT be fire-and-forget. It
  retries transient Firestore write failures (skipping if a newer local write
  superseded) and records `C._lastPushErr`. The big `dtp_days` record is the one
  most likely to fail (size/limits); a silent failure there while small records
  succeed = day strategies/plans lost while dining survives.

### Day storage — one record PER TRIP (Build 213)
Days are stored per trip in `dtp_days_<tripId>` (NOT the legacy single
`dtp_days`). In memory they're still one flat `DAYS` array, so consumers are
unchanged — only load/save differ:
- `loadDays()` concatenates every `dtp_days_*` record, falling back to legacy
  `dtp_days` for any trip not yet migrated (nothing is ever lost).
- `saveDays()` writes DAYS back grouped by trip — use it everywhere instead of
  `save('dtp_days',DAYS)`.
- `migrateDays()` (run at boot AND in `rehydrate()`) splits a legacy `dtp_days`
  into per-trip records once, then empties the legacy doc. Idempotent; never
  clobbers an existing per-trip record.
- Deleting a trip must `save(daysKey(id),[])`; `resetToBlank()` purges all
  `dtp_days*` local keys so a wiped trip can't be resurrected by `loadDays()`.
Rationale: the single `dtp_days` doc was the biggest synced record and the most
likely to hit Firestore's size limit — one failed write there lost ALL day
strategies/plans at once. Per-trip records bound the size and the blast radius.

### Service worker
- `sw.js` uses network-first strategy; cache is offline fallback only.
- `index.html` registers with `updateViaCache:'none'` and polls every 60s.
- `controllerchange` auto-reloads when a new SW takes control.
- `forceUpdate()` unregisters SW + clears all caches + cache-bust reload.

## Naming conventions (user-facing)
- Profile/account page: "tenant" (not "group" — avoids confusion with in-app groups)
- In-app planning: "group" (the set of people you plan trips with)
- Super-admin area: "tenant" (one owner's isolated workspace)
