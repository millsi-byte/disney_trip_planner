# Disney Trip Planner

A mobile-first progressive web app for families planning Walt Disney World trips.
Built around the rhythm of Disney planning — 7 AM Lightning Lane drops, split resort
stays, a family of five on different return flights — not adapted from a generic
travel app.

This is the evolved build of the reference prototype: the same visual language
(Fraunces + Inter, cream canvas, bold park colors, full-color section headers),
extended into a complete, scalable app.

## Run it

It's static — no build step.

```bash
# from the repo root
python3 -m http.server 8080
# open http://localhost:8080 on a phone-sized viewport (max width 430px)
```

Add to Home Screen on iOS/Android to run it as a standalone PWA (manifest +
offline service worker included).

## What's here

```
index.html        App shell (header / strip / filter / content / nav hosts)
css/styles.css    The full design system
js/data.js        Seed data — realistic July 2026 trip, family of five
js/app.js         State, router, all screens, slide-in stack, sheets
manifest.json     PWA manifest
sw.js             Service worker (offline app shell)
icons/            Maskable app icons
```

## The model

- **Navigation:** 4 tabs — Home (Agenda), Plan, Overview, Chat. Tappable trip name
  in the header opens the trip switcher sheet.
- **Personas:** Scott (admin), Hayley, Nancy, Corey, Cian. The person filter
  (All · each member) sits below the day strip on Home and at the top of
  Overview and the per-person lists. Multi-select; default All. Selecting people
  filters to their items plus everyone's.
- **Status everywhere:** Planning items render as dashed, muted cards; Booked /
  Reserved items are solid and confident, with a status badge on every item.
- **Everything has a "who":** flights, dining, Lightning Lanes, dining, resort,
  packing and todo items all carry person assignment, shown as avatar chips and
  editable via the WhoSelect control on every add/edit screen.

Persona, packing and to-do state persist to `localStorage`.

## The 12 designed screens

1. **Agenda — Travel Day (Jul 14):** resort check-in (Pop Century), group outbound
   flight with a connecting leg, day plan, Disney Springs dinner.
2. **Agenda — Magic Kingdom (Jul 16):** full Lightning Lane day with a storm alert,
   mixed booked/planning LLs, rolling re-books, night shows.
3. **Agenda — Last Day (Jul 19):** two different return flights — Scott/Hayley/Corey
   (Delta, booked) and Nancy/Cian (JetBlue, planning) — each with person chips and
   its own status; resort check-out.
4. **Plan tab:** the data-entry hub with every trip component and per-person lists.
5. **Add Flight:** full slide-in screen with status toggle, WhoSelect, and a
   connecting-leg builder.
6. **Add Dining:** meal, time, status, in-park/off-site, WhoSelect.
7. **Update Lightning Lane — Planning → Booked:** confirms a window + confirmation
   number and flips the item to solid/booked across Agenda and Overview (live).
8. **Chat tab:** family thread mixing pre-trip planning and day-of coordination,
   with item references.
9. **Packing — All & per-person:** stacked per-person lists, category progress,
   quantity steppers, locker tags, "added by", guard-delete; driven by the person
   filter.
10. **New Trip flow:** template selection (per-person template vs blank).
11. **AI Import — review:** confirm / edit / remove extracted items, including a
    fuzzy match and an unreadable file.
12. **Trip switcher:** header bottom sheet with Active / Planning / Archived trips.

## Design challenges, solved

- **Two return flights, different people (Jul 19):** one card, one journey block per
  flight, person chips and an independent status badge on each.
- **Two-park day (Jul 17: HS → EPCOT via International Gateway):** the day pill shows
  a split color bar, the hero shows the primary park with a secondary indicator, and
  the info bar reads "No reservation · Hopper."
- **Split resort stay:** Pop Century → BoardWalk Villas. On the move-day (Jul 16) the
  Agenda shows both a check-out and a check-in resort card; the Overview Resort
  timeline makes the split explicit.
- **Planning vs booked at a glance:** one consistent treatment — dashed/muted for
  planning, solid for booked — applied to every card and a status badge on every row.
- **Person filter without layout jumps:** non-matching items are simply omitted and
  empty cards collapse to a short empty state, so the page never feels broken.
