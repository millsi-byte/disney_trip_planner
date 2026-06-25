# Baseline Tap — Disney Trip Planner

## Critical rules (do NOT break these)

### "My Group" phantom creation
`ensurePartyTags()` in app.js auto-creates a group called "My Group" whenever
`PARTIES` is empty. This fires on every `rehydrate()`, which fires on every
`reconcile()`, which fires on `commitActive()`. During fresh-tenant creation
(`resetToBlank` sets `PARTIES=[]`), this means "My Group" springs back to life
unless `S._freshTenant=true` is set BEFORE `resetToBlank()`. The flag gates
`ensurePartyTags` so it skips the auto-seed. Clear the flag in `ntFinish`,
`ntCancel`, and `wizSkip`.

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

### Service worker
- `sw.js` uses network-first strategy; cache is offline fallback only.
- `index.html` registers with `updateViaCache:'none'` and polls every 60s.
- `controllerchange` auto-reloads when a new SW takes control.
- `forceUpdate()` unregisters SW + clears all caches + cache-bust reload.

## Naming conventions (user-facing)
- Profile/account page: "tenant" (not "group" — avoids confusion with in-app groups)
- In-app planning: "group" (the set of people you plan trips with)
- Super-admin area: "tenant" (one owner's isolated workspace)
