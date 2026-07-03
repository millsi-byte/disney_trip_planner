# Per-item sync engine — design (audit F-01 Tier B)

**Status: IMPLEMENTED in Build 350-dev** (owner green-lit building it on dev:
"go ahead and build your recommendations... I'm deferring to you"). The engine
lives in js/cloud.js; the two-device behavioral suite is
`tests/ci/test_item_sync.js` (24 assertions, runs in CI on every push). This
document remains the design of record — the **Implementation deltas** section
at the bottom records where the build deviated from the original plan and why.

Key deltas at a glance:
- Sync unit interception happens inside `CLOUD.push`/`CLOUD.pushNow` keyed on
  a device-local **shadow** (last cloud-confirmed state per item) — zero app.js
  call sites changed; the localStorage blob simply became a local cache.
- The engine targets the ten still-whole-blob global collections (dining, lls,
  shows, parades, flights, resorts, parkres, tickets, passes, rebooks).
  Wishlist/todo/packing stay on their Build-347 shards, which already solved
  their collision pattern per person/creator.
- Doc `v` is a JSON **string**, not a Firestore map (dodges nested-array limits
  and keeps serialization byte-identical both ways).
- Conflict rule shipped: an unsynced local **edit beats a delete** in both
  directions; same-item concurrent edits remain last-write-wins (the accepted
  residual). First contact with a newly-flagged collection adopts per item
  (remote wins, local-only additions still push, nothing tombstoned) — a
  transition-window rule the original design missed.

## Why (recap from the audit)

Every shared collection syncs as **one JSON blob per localStorage key with one
timestamp** (`save(k,v)` → `CLOUD.push(k,v)` → `workspaces/<wid>/kv/<key>`,
last-write-wins via `dtp__synctimes`). Two people editing *different items* in
the same blob inside one sync window → the later write wins wholesale and the
other person's edit is silently discarded. This is the root architecture behind
the family's recurring list losses (F-01), and "only lists disappear" fell out
of it structurally (F-09: per-trip keys are the ones re-read on every
rehydrate).

Shipped harm reduction so far (Tier A, Builds 347-dev):
- `dtp_packing_<trip>_<personId>` — per-person packing shards
- `dtp_todo_<trip>_<creatorId>`, `dtp_wishlist_<trip>_<creatorId>` — per-creator
- `saveIfChanged` content-compare so untouched shards never push stale timestamps

Tier A eliminates the dominant collision (two people on their own lists) but a
single shard is still a blob: two devices editing the *same person's* list, or
any of the other 12 array collections (`DINING`, `LLS`, `SHOWS`, `PARADES`,
`FLIGHTS`, `RESORTS`, `PARKRES`, `TICKETS`, `PASSES`, `REBOOKS`, plus chat and
notifications), still lose on concurrent edits. Tier B removes the blob
entirely.

## Target data model

One Firestore document **per item**, in a per-collection subcollection:

```
workspaces/<wid>/items/<collection>__<itemId>
```

A single flat `items` subcollection (with the collection name prefixed into the
doc id) rather than 12 subcollections, so:
- one `onSnapshot` listener covers everything (12 listeners would blow the
  free-tier connection budget and complicate teardown);
- one security-rules match block;
- collection-group queries are never needed.

Document shape:

```js
{
  col:   'dining',            // which in-memory array this belongs to
  trip:  'jul26' | null,      // trip scoping where the collection has it
  v:     { ...the item... },  // exactly what the array element is today
  ts:    serverTimestamp(),   // WRITE time — server clock, ends F-11 clock-skew
  del:   false,               // tombstone flag — see Deletions
  by:    '<uid>',             // who wrote it last (debugging + audit trail)
  build: '352-dev'            // provenance for forensics
}
```

### Why tombstones, not deletes

If device A deletes an item while device B is offline holding a stale copy,
B's next full push would resurrect it ("ghost item"). With `del:true` +
`ts`, the deletion is itself a versioned write and wins/loses by the same
timestamp rule as any edit. Tombstones are purged after 30 days by the same
daily-archive pass that already prunes backups (`runDailyArchive`).

### Item identity

Every synced item MUST have a stable `id`. Audit of current arrays: `TODO`,
`WISHLIST`, `PASSES`, `TICKETS`, `DINING`, `LLS`, `REBOOKS` already carry ids;
`SHOWS`, `PARADES`, `FLIGHTS`, `RESORTS`, `PARKRES` partially do. The migration
assigns `id = <col>_<ts>_<rand4>` to any item lacking one, **locally first**,
via the existing `save()` path so the id assignment itself syncs as a normal
blob write before per-item mode turns on.

## Sync semantics

- **Write path:** editing item X calls `itemPush(col, item)` — a single doc
  `set()` with `{merge:false}`. No other item is touched. The in-memory array
  and the localStorage blob stay exactly as today (the blob becomes a local
  cache, no longer the sync unit).
- **Listener:** one `onSnapshot` on the `items` subcollection. Each change
  event patches the one array element (match by `col` + `v.id`), then a
  targeted re-render. `C.applyingRemote` guard unchanged.
- **Conflict window:** now exactly one item. Two devices editing the *same*
  item in the same window is still last-write-wins — accepted residual, stated
  in the audit and accepted by the owner.
- **Offline:** Firestore's built-in offline queue replaces the hand-rolled
  retry in `_pushKey` for item docs. `C._lastPushErr` / `onSyncPushFailed`
  stay wired for the remaining blob keys.
- **`dtp__synctimes` is not used for item docs.** Server `ts` on the doc is
  the only clock. (Blob keys that remain — settings, template, FAMILY,
  TRIPS — keep the existing mechanism until/unless they migrate.)

## What stays a blob (deliberately)

- `dtp_settings`, `dtp_todo_tmpl`, `dtp_persona` (device-local anyway)
- `dtp_family`, `dtp_trips`, `dtp_parties` — small, low-collision,
  structurally load-bearing (everything keys off them); migrate LAST if ever.
- `dtp_days_<trip>` — already per-trip; day objects are big and internally
  cohesive (strategy text + plan rows edited together). Candidate for a later
  per-day split (`dtp_days` → one doc per day) using the identical machinery,
  after the array collections prove out.

## Migration plan (the dangerous part — do this with eyes on)

Shape mirrors `migrateDays()`/`migrateListShards()`, which both shipped clean:

1. **Gate:** per-collection flag doc `workspaces/<wid>/meta/itemsync`
   (`{dining:true, ...}`). Devices read it on `startSync`; a collection syncs
   per-item ONLY when its flag is set. Flag-off devices keep blob mode.
2. **Order:** one collection at a time, lowest-risk first:
   `wishlist` → `todo` → `packing` (per-person shards become per-item docs) →
   `dining` → `lls` → the rest. Wishlist first because it's small, already
   id-carrying, and the family survives losing it.
3. **Per collection:** a one-time `migrateItems(col)` on the FIRST device that
   sees the flag: read the current blob, write one doc per item (batched, 400
   per batch), verify count parity by re-reading, then set the flag. The blob
   is left in place ("retired-but-present") — never emptied until the
   collection has run per-item for 2+ weeks.
4. **Rollback:** clear the flag → devices fall back to blob mode (the blob was
   never emptied); worst case is losing edits made during the per-item window,
   recoverable from the item docs by hand.
5. **All devices must update before flags flip** — same rollout rule as the
   Build 347 shard split. The flag gate makes mixed fleets *safe* (old devices
   just keep blob mode and go stale rather than corrupt) but not *coherent*.

## Security rules addition

```
match /workspaces/{wid}/items/{itemId} {
  allow read, write: if isMember() || isSuper();
}
match /workspaces/{wid}/meta/{doc} {
  allow read: if isMember() || isSuper();
  allow write: if isMember() || isSuper();   // flag flips are member actions
}
```

Per-item docs also unlock *future* per-item ACLs (e.g. only the pass owner
edits their pass) — not in scope for v1.

## Cost check (free tier)

Firestore free tier: 50k reads / 20k writes per day. A heavy family planning
day: ~6 people × ~200 edits = 1.2k writes; listener re-reads on change are
1 read per changed doc per device (~6). Initial sync on a fresh device reads
every live item doc once (~a few hundred). Comfortably inside free tier;
strictly better than today, where one packing tick re-uploads a multi-KB blob.

## Test plan (write these BEFORE the engine)

- Two simulated devices (two Playwright contexts against the emulator) edit
  different items in the same collection concurrently → both edits survive.
- Same item concurrently → later `ts` wins, no crash, no duplicate.
- Delete on A while B offline; B comes back and pushes its stale copy → item
  stays deleted (tombstone wins).
- Migration: blob with N items (some id-less) → N docs, ids assigned, count
  parity, blob untouched; second run is a no-op (idempotent).
- Flag off → device ignores item docs entirely and stays in blob mode.
- Kill the network mid-migration → re-run completes without duplicates.

## Effort estimate

~400 lines in cloud.js (itemPush, item listener, migrateItems, flag gate),
~150 in app.js (route the 12 collections' save calls through itemPush),
plus the test suite. 2–3 focused sessions with emulator time. Do not start it
the week of a trip.

---

## Implementation deltas (Build 350-dev — what actually shipped)

1. **The shadow, not a write-path rewrite.** Instead of routing every app save
   call through a new `itemPush`, `CLOUD.push(k, v)` intercepts flagged keys
   and diffs the saved array against `dtp__itemshadow_<col>` — a device-local
   record of the last **cloud-confirmed** state of each item. Shadow entries
   update only on confirmed push or applied remote doc, never optimistically,
   so "differs from shadow" always means "unsynced local change" and
   `reconcile()` can recompute pending work after any crash/offline gap. This
   made the app.js diff zero lines at the call sites.
2. **Scope: the ten global blob collections.** The design's wishlist→todo→
   packing order predated Build 347; those three are already sharded per
   person/creator, which solved their real collision pattern. The remaining
   whole-blob arrays were the exposure, so the engine covers exactly those.
   Packing's id-less nested shape (the hard case) never needed solving.
3. **`v` is a JSON string**, not a map — no nested-array restrictions, and
   equality checks compare the same bytes that were pushed. A key-order-
   independent `stableSer()` is the dirtiness test.
4. **Conflict rules shipped:** different items → both survive (the point);
   same item → LWW (accepted residual, converges everywhere); edit vs delete
   → edit wins in both directions; local delete while offline → tombstone on
   reconnect; tombstone vs untouched stale copy → deletion stands. First
   contact with a flagged collection (device has no shadow) adopts per item —
   remote wins, local-only ids still push, nothing tombstoned. That last rule
   is what makes a mixed fleet safe during the rollout window.
5. **Migration is a UI action** (Backups → "Per-item sync", admin, confirm-
   gated, auto-snapshot first): batch-writes docs, verifies parity by
   re-reading, and only then sets the flag. An injected mid-migration failure
   in the test suite leaves the flag off and blob mode fully working; a retry
   succeeds. `disableItemSync` freshens the kv blob from local and clears the
   flag — a one-tap rollback per collection.
6. **Tombstone purge** (30 days) rides the existing once-a-day archive pass.
7. **Tested against a Node-shared fake Firestore** (`tests/_fakefire.js`, the
   exact compat API surface cloud.js uses) with two real app instances in two
   browser contexts — not the emulator (no Java in the sandbox). The emulator
   pass in DEVELOPMENT.md §2 is still worth doing before production, but the
   behavioral matrix above is CI-enforced on every push.
8. **Rules dependency:** `workspaces/<wid>/items/**` and `/meta/**` need the
   match blocks now in `firestore.rules.proposed`. Until those deploy, flag
   reads fail → `C._itemFlags` stays empty → the engine is dormant and blob
   mode runs exactly as before. Personal spaces (`users/<uid>/…`) are already
   covered by the recursive user rule.
