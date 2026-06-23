# Group Trip Planner — Product Requirements

**Document type:** Functional & non-functional requirements (implementation-agnostic).
**Purpose:** A complete specification for building a collaborative trip‑planning
application from scratch. It describes *what* the system must do and the rules it
must never break. It deliberately does **not** prescribe technology stack,
architecture, data storage, UI framework, or visual design — those are open
decisions for the build team.

How to read this: requirements are numbered (e.g. `R-IDENT-3`) for traceability.
"MUST" = mandatory, "SHOULD" = strongly recommended, "MAY" = optional.

---

## 1. Product Overview

The product is a **mobile‑first collaborative planner for group trips** (designed
around Walt Disney World vacations, but the model is general). A trip organizer
plans a multi‑day trip, invites the people coming along, and the whole group
shares one coordinated plan: daily itineraries, dining, ride reservations,
flights, lodging, packing, to‑dos, and group chat. Each person sees what is
relevant to them, and changes sync across everyone's devices.

### 1.1 Primary goals
- **R-OV-1** — One organizer can plan an entire trip and bring others in with
  minimal friction (ideally a single link or email).
- **R-OV-2** — Every participant sees a single shared, always‑current plan; no
  one works from a stale copy.
- **R-OV-3** — Content can be scoped to specific people, so each participant can
  filter the plan down to "what affects me."
- **R-OV-4** — The system must be usable on a phone, on the go, including with
  intermittent connectivity.

### 1.2 Non‑goals (out of scope unless later prioritized)
- Real‑time booking/integration with airlines, hotels, or the theme‑park
  operator's systems. The app **records** reservations the user made elsewhere;
  it does not make them.
- Payments or expense splitting.
- Public/social sharing of trips outside the invited group.

---

## 2. Glossary & Core Entities

These are the domain concepts. Names are illustrative; the build may rename them.

- **Account** — An authenticated identity (a real human's login).
- **Person** — A record representing a human in a trip context (name, contact,
  travel details). A Person may or may not yet be linked to an Account.
- **Tenant (Workspace)** — An isolated container owned by one organizer. All of
  that organizer's People, Groups, and Trips live inside it and are invisible to
  other tenants.
- **Planning Group (Party)** — A named set of People within a tenant (e.g. "Smith
  Family", "Soccer Team Orlando"). A Person can belong to more than one Group.
- **Trip** — A planned multi‑day trip. A Trip belongs to exactly one Planning
  Group. The Trip's participants are the Group's People (see §6 invariants).
- **Trip Content** — Everything attached to a Trip: days, itinerary, dining,
  ride reservations, shows, flights, lodging, park reservations, packing lists,
  to‑dos, chat, notifications.
- **Super‑Admin** — A single privileged operator who authorizes organizers and
  can view/manage any tenant for support purposes.
- **Owner / Organizer** — An Account authorized to create and run their own
  tenant.
- **Admin (within a tenant)** — A Person/Account with full management rights
  inside that tenant.
- **Member (within a tenant)** — A participant with limited rights.

---

## 3. Actors & Roles

- **R-ROLE-1** — The system MUST support these roles: Super‑Admin, Owner,
  tenant Admin, tenant Member, and Unauthenticated visitor.
- **R-ROLE-2** — A single human may hold different roles in different tenants
  (e.g. Owner of their own tenant, Member in someone else's).
- **R-ROLE-3** — Role capabilities:
  - **Super‑Admin:** authorize/deauthorize Owners; list all tenants; view any
    tenant's data; enter a tenant to manage it on the owner's behalf; exit back
    to their own context. Has all Admin capabilities while managing a tenant.
  - **Owner:** create and run their own tenant; full Admin rights within it.
  - **Admin:** manage People, Groups, and all Trips in the tenant; edit or
    delete any content; invite people; assign roles.
  - **Member:** see and edit content they participate in or own; manage their own
    profile and personal lists; cannot manage other people or unrelated trips.
  - **Unauthenticated:** can only reach the sign‑in / join flow.

---

## 4. Identity, Access & Onboarding

### 4.1 Authentication
- **R-IDENT-1** — Access to any trip data MUST require authentication. No trip
  content is visible to an unauthenticated visitor.
- **R-IDENT-2** — The system MUST offer at least one sign‑in method that works in
  **all** common browser environments, **including private/incognito windows and
  in‑app/embedded browsers**, without depending on third‑party cookies or
  cross‑site storage. (E.g., a sign‑in mechanism whose entire flow happens on the
  application's own origin.)
- **R-IDENT-3** — The system MAY additionally offer federated sign‑in (e.g.
  "Sign in with a provider"). If it does, any such method MUST either function in
  private/incognito windows or the UI MUST clearly steer users to the
  always‑works method when it cannot. The product MUST NOT present a sign‑in
  option that silently fails (no prompt, no error, no progress).
- **R-IDENT-4** — A signed‑in session MUST persist across app restarts on the
  same device until the user signs out.
- **R-IDENT-5** — Sign‑out MUST clear the local identity and return the app to the
  sign‑in gate, leaving no other person's data resident on the device.

### 4.2 Authorization model
- **R-ACC-1** — Authentication alone MUST NOT grant access to trip data. A signed‑in
  Account gains access only if **either**:
  (a) it is an **authorized Owner** (on an allowlist controlled by the
  Super‑Admin), **or**
  (b) an Admin/Owner has **pre‑created a Person** for them and they legitimately
  claim that Person (see §4.4).
- **R-ACC-2** — An Account that is neither authorized nor able to claim a Person
  MUST be shown a clear "no access" state, not a broken or looping screen.
- **R-ACC-3** — Only the Super‑Admin may add or remove authorized Owners.

### 4.3 Tenant isolation
- **R-TEN-1** — A user MUST only be able to read or write data belonging to
  tenants they are a member of. Cross‑tenant data access MUST be impossible for
  ordinary users, enforced on the server/authority side (not just hidden in the
  UI).
- **R-TEN-2** — Creating a tenant MUST be restricted to authorized Owners.
- **R-TEN-3** — Each tenant's People, Groups, Trips, and all Trip Content are
  scoped to that tenant.

### 4.4 Claiming a Person (linking Account ↔ Person)
- **R-CLAIM-1** — An Admin MAY create a Person with a name and (optionally) an
  email **before** that human has ever signed in.
- **R-CLAIM-2** — When a human signs in, the system MUST attempt to link them to
  an existing Person automatically when possible, in this preference order:
  (1) a Person already linked to this Account; (2) a Person whose recorded email
  matches the Account's email; (3) the specific Person designated by an invite
  link they followed.
- **R-CLAIM-3** — If automatic linking is not possible, the user MUST be offered a
  manual way to identify themselves (choose their Person, or enter an invite
  code).
- **R-CLAIM-4** — A Person already linked to a different Account MUST NOT be
  claimable by someone else ("no seat stealing"). An Admin MUST be able to unlink
  a Person to free the seat.
- **R-CLAIM-5** — A user MUST NOT be able to self‑promote to Admin by claiming an
  Admin Person; elevation requires an existing Admin's action.

### 4.5 Invitations
- **R-INV-1** — An Admin MUST be able to invite a Person who has not yet joined.
- **R-INV-2** — Invitations MUST support **both**:
  (a) a shareable link the invitee opens to be dropped directly into the correct
  tenant and pre‑matched to their Person; and
  (b) sending that link by email (individually, and in bulk to everyone with an
  email on file).
- **R-INV-3** — An invite link MUST survive the sign‑in round trip: if the
  invitee must authenticate first, following the link and then signing in MUST
  still complete the join and land them in the right place.
- **R-INV-4** — Inviting newly‑added people MUST NOT be conflated with
  "notifications." Brand‑new people who have never used the app cannot receive an
  in‑app notification; the correct action for them is an invite (link/email). The
  flow for adding people MUST present invite/copy‑link/email actions, not a
  notify‑existing‑users prompt. (Notifications are for people who already have
  access — see §10.)
- **R-INV-5** — Re‑sending an invite for any not‑yet‑joined Person MUST be
  available later (e.g. from that Person's profile), not only at creation time.

### 4.6 Recovery & resilience
- **R-REC-1** — A device that ends up in a stuck or corrupted identity state MUST
  have a self‑service escape (e.g. "reset this device," and for privileged users
  "reset my account / start over") without contacting support.
- **R-REC-2** — Privileged "manage another tenant" mode MUST be crash‑safe: an
  interrupted session (force‑quit) MUST NOT leave one tenant's data merged into
  another's, and on next launch the app MUST recover to the user's own context
  automatically.

---

## 5. Super‑Admin Console (cross‑tenant)

- **R-SA-1** — The Super‑Admin MUST be able to list every tenant with identifying
  info (owner name, owner email, group names, member count).
- **R-SA-2** — The Super‑Admin MUST be able to view a tenant's data read‑only
  (its groups, people, trips) before deciding to manage it.
- **R-SA-3** — The Super‑Admin MUST be able to "enter" a tenant to manage it as
  though they were its Admin, and "exit" cleanly back to their own context.
- **R-SA-4** — While managing another tenant, the UI MUST persistently and
  unmistakably indicate the impersonation state and provide an always‑reachable
  exit control (not obscured by device chrome/status bars).
- **R-SA-5** — Entering/exiting a tenant MUST NOT alter the Super‑Admin's own
  data or the target tenant's membership.
- **R-SA-6** — The Super‑Admin MAY permanently delete a tenant, but MUST never be
  able to delete their own active context by accident.

---

## 6. Core Hierarchy & Invariants (CRITICAL)

This section defines the relationships that the system MUST keep internally
consistent at all times. Violations here are considered data corruption.

- **R-HIER-1** — Hierarchy: **Tenant → Planning Groups → Trips**; **People** live
  at the tenant level and are assigned into Groups.
- **R-HIER-2** — A Person MUST belong to **at least one** Planning Group at all
  times. Removing a Person from their last Group MUST be prevented (or MUST move
  them to another Group as part of the same action).
- **R-HIER-3** — A Trip MUST belong to **exactly one** Planning Group.
- **R-HIER-4 (the key invariant)** — **A Trip's set of participants is defined by
  its Planning Group.** The system MUST NOT maintain a second, independent list of
  trip participants that can diverge from the Group's membership. It MUST be
  **impossible** to add a Person to a Trip who is not a member of that Trip's
  Group.
  - **R-HIER-4a** — If the product needs "this person in the Group is not on this
    particular trip," that MUST be modeled as an explicit *exclusion/opt‑out
    constrained to the Group's members*, never as a free‑form parallel membership
    list. The default participant set is "all Group members."
  - **R-HIER-4b** — Reassigning a Trip to a different Group MUST atomically update
    who participates; it MUST NOT leave orphaned participants from the old Group.
  - **R-HIER-4c** — Any UI that selects a Trip's Group and any UI that selects a
    Trip's people MUST operate on the **same** underlying set. They MUST NOT be
    two independent controls. (This is an explicit correction of a known failure
    mode: a separate "planning group" picker and a separate "people on this trip"
    picker that can be set inconsistently.)
- **R-HIER-5** — Visibility/permission decisions for a Trip MUST be derived from a
  single source of truth (the Group/participant set), not from two competing
  notions. Whatever set governs who *can see* a trip MUST be the same set that
  defines who is *on* it.
- **R-HIER-6** — Deleting a Group MUST define and enforce a clear rule for its
  Trips (e.g. block deletion while Trips exist, or reassign/cascade explicitly).
  Trips MUST never be left referencing a non‑existent Group.
- **R-HIER-7** — Deleting a Person MUST cleanly remove them from all Groups,
  participant sets, assignments, and ownership references, with defined behavior
  for content they created or solely owned.

---

## 7. People Management

- **R-PPL-1** — Admins MUST be able to create, edit, and remove People in their
  tenant. Each Person has at minimum: display name, color/avatar identity,
  role (admin or member), Group membership(s), and link/claim status.
- **R-PPL-2** — A Person MAY have travel details: email, full legal name (as on
  ID), known‑traveler/PreCheck number, passport number, frequent‑flyer numbers.
- **R-PPL-3** — Travel details are sensitive and MUST be visible only to that
  Person and to Admins. A Person MUST be able to self‑edit their own travel
  details.
- **R-PPL-4** — A Person's profile MUST show, and allow navigation to, the Groups
  they belong to and the Trips they are on.
- **R-PPL-5** — From a Person's profile, an Admin MUST be able to add/remove Group
  memberships (respecting R‑HIER‑2), and (if not yet joined) send/copy an invite.
- **R-PPL-6** — Editing a Person MUST provide a direct action to email/invite them
  when they have an email and have not yet joined.

---

## 8. Planning Groups Management

- **R-GRP-1** — Admins MUST be able to create, rename, and delete Planning Groups
  (deletion governed by R‑HIER‑6).
- **R-GRP-2** — A Group page MUST list its members with the ability to open each
  member's profile, add members, and remove members (respecting R‑HIER‑2).
- **R-GRP-3** — A Group page MUST list the Trips that belong to it and allow
  opening each.
- **R-GRP-4** — Membership changes MUST be reflected immediately and consistently
  across all dependent views (trip participants, filters, assignments).

---

## 9. Trips

### 9.1 Trip lifecycle & attributes
- **R-TRIP-1** — A Trip has at minimum: name, optional destination/subtitle,
  start and end dates (date range), status, color identity, an owner (the
  creator), and its single Planning Group.
- **R-TRIP-2** — Trip status MUST support at least: **planning**, **active**,
  **archived**. At most one Trip per context SHOULD be "active" at a time; making
  one active MUST demote any previously active trip gracefully.
- **R-TRIP-3** — Dates MUST be enterable as a **single range selection** (pick a
  start, then an end) in one continuous interaction. Selected dates MUST remain
  clearly legible (sufficient contrast) in all themes/states.
- **R-TRIP-4** — Editing a Trip's name, dates, status, color, and Group MUST be
  restricted to the Trip owner or an Admin.
- **R-TRIP-5** — Deleting a Trip MUST be restricted to the owner or an Admin,
  MUST require confirmation, and MUST remove all of that Trip's content and
  derived data. The system MUST never be left with zero trips in a way that
  breaks navigation; an empty state MUST be handled.

### 9.2 Trip creation flow (new‑trip wizard)
- **R-TRIPW-1** — Creating a Trip MUST start by capturing the **trip's own
  details first** (name, dates), before deciding who is coming. The flow MUST NOT
  force the user to create/choose a group before they have described the trip.
- **R-TRIPW-2** — After trip details, the user chooses **who is coming** with
  these options:
  (a) use an existing Planning Group (with the ability to preview that group's
  members before choosing);
  (b) add new people now (each with at least a first name and an optional email),
  which creates a new Group;
  (c) "just me" — defer adding others.
- **R-TRIPW-3** — If the user adds new people (option b), the next step MUST let
  them **name the new Group**, then MUST present an **invite screen** listing
  everyone just added with per‑person copy‑link and email actions plus a bulk
  email action (per §4.5). It MUST NOT present an in‑app notification prompt for
  these brand‑new people.
- **R-TRIPW-4** — If the user picks an existing Group whose members already have
  access, the flow MAY offer to notify them (per §10), using plain, clear
  language.
- **R-TRIPW-5** — Choosing "just me" MUST create the Trip with no Group
  association forced onto it; it MUST NOT silently attach the trip to whatever
  group happened to be active.
- **R-TRIPW-6** — A first‑time user (no groups/trips yet) MUST get a guided
  version of this flow and MUST be able to skip/defer setup.
- **R-TRIPW-7** — Cancelling the wizard MUST roll back anything provisionally
  created (a half‑made group/trip), except where the trip is already finalized.
- **R-TRIPW-8** — Per R‑HIER‑4, the wizard MUST NOT produce a Trip whose
  participants differ from its Group.

### 9.3 Trip switching & visibility
- **R-TRIP-6** — The user MUST be able to switch between Trips they can see from a
  single, always‑available selector.
- **R-TRIP-7** — The Trip selector MUST show **all Trips the current user has
  access to**, regardless of which Group is "active." It MUST NOT hide trips the
  user is on simply because a different group context is selected.
- **R-TRIP-8** — Selecting a Trip MUST set the working context (including its
  Group) so the rest of the app reflects that Trip.
- **R-TRIP-9** — Visibility rule: a user can see a Trip if they are a participant
  (i.e. a member of its Group) or its owner, or if they are an Admin of the
  tenant. (Consistent with R‑HIER‑5.)

---

## 10. Notifications

- **R-NOTIF-1** — Notifications are **only** for people who already have access
  (joined Accounts). They MUST NOT be used as the mechanism to reach people who
  have never signed in (those get invites — §4.5).
- **R-NOTIF-2** — The system MUST be able to notify relevant people when they are
  added to or removed from a Trip or an item, and when an action is requested of
  them.
- **R-NOTIF-3** — During the "planning" phase, membership changes SHOULD be silent
  unless the actor opts in to notify; for "active" trips, the system SHOULD prompt
  the actor to choose who to notify.
- **R-NOTIF-4** — When notifying, the actor MUST be able to choose **who** is
  notified, with sensible defaults; the person who made a booking/change SHOULD
  be informable by default.
- **R-NOTIF-5** — Each recipient MUST have a personal notification feed showing
  newest first, with read/unread state.
- **R-NOTIF-6** — Notification copy MUST be plain and human‑readable (who did
  what, to which item).

---

## 11. Trip Content / Planning Modules

All content below belongs to a specific Trip and a specific day where
applicable, and all of it participates in the person‑scoping model (§12) and the
permission model (§13).

### 11.1 Days & itinerary
- **R-DAY-1** — A Trip MUST have one day per date in its range, generated from the
  date range and kept in sync when dates change.
- **R-DAY-2** — Each day MAY carry: a short summary/blurb, a longer strategy/notes
  field, an ordered timed itinerary (time + description, with optional "critical"
  flags), tags, and a prominent alert/callout.
- **R-DAY-3** — A day‑by‑day "agenda" view MUST aggregate everything happening on
  each day (visits, dining, reservations, shows, flights, etc.) into one
  chronological picture.

### 11.2 Destinations / park visits (location‑of‑the‑day)
- **R-LOC-1** — A day MAY have one primary destination and optionally a secondary
  one (e.g. a two‑location day), each with timing (morning/day/evening/late) and
  a participant scope.
- **R-LOC-2** — The primary destination SHOULD drive that day's visual identity in
  overviews.

### 11.3 Operating hours & crowd info
- **R-HRS-1** — For relevant destinations on a day, the system MUST record
  operating hours (open/close, plus optional early/late access windows) and an
  optional crowd‑level indicator. This is a fact about the destination on that
  date, independent of whether the group visits.

### 11.4 Dining
- **R-DIN-1** — Users MUST be able to record dining plans: meal type, venue name,
  time, location context (on‑site vs off‑site, and which destination),
  reservation status (e.g. reserved / planned / want‑to‑try), confirmation
  number, and participant scope.

### 11.5 Ride/attraction reservations ("Lightning Lane"‑style)
- **R-LL-1** — Users MUST be able to record timed ride reservations: attraction,
  date, destination, a tier/type, status (planning/booked), target/booked time
  window, confirmation, the date/time booking opens, and participant scope.
- **R-LL-2** — The system MUST support **rolling re‑booking chains**: a reservation
  can have a defined "what to book next" follow‑up that appears in the day plan
  immediately after the reservation it follows. The plan MUST render these
  follow‑ups in correct sequence relative to their anchor reservations.

### 11.6 Shows / entertainment
- **R-SHOW-1** — Users MUST be able to record scheduled shows/entertainment: name,
  date, time(s), attendance status, and participant scope.

### 11.7 Flights / travel legs
- **R-FLT-1** — Users MUST be able to record flights with multiple legs. Each leg
  has airline, flight number, confirmation, departure and arrival
  airports/cities, and times/dates.
- **R-FLT-2** — A flight MUST support a participant scope (different people may be
  on different flights — e.g. split returns), and a status (booked/planning).

### 11.8 Lodging
- **R-LDG-1** — Users MUST be able to record lodging stays, including split stays
  (multiple consecutive properties). Each stay has property name, room/details,
  check‑in/out dates and times, confirmation, status, and participant scope.

### 11.9 Official reservations (e.g. park reservations)
- **R-RES-1** — Users MUST be able to record per‑day official reservations tied to
  a destination, with status and participant scope.

### 11.10 Packing lists (per person)
- **R-PACK-1** — Each Person MUST have their own packing list for a Trip, organized
  by category, where each item has a name, quantity, a "to buy / need to acquire"
  flag, and a done state.
- **R-PACK-2** — A packing item MAY be flagged as "packed by" another person
  (someone packs on another's behalf) and MAY be scoped to who it's for.
- **R-PACK-3** — Packing lists are personal; a Person sees their own. Admins MAY
  see all. The system SHOULD support seeding a new trip's list from a reusable
  template.

### 11.11 To‑do lists (per trip, assignable; plus personal templates)
- **R-TODO-1** — A Trip MUST support a to‑do list of items, each with text, an
  optional due/lead‑time, a creator, an optional set of assignees, and a done
  state.
- **R-TODO-2** — An item appears on a Person's list if they created it **or** it is
  assigned to them. Lists are otherwise private to those people; Admins MAY see
  all.
- **R-TODO-3** — Each Person MAY keep a trip‑independent personal to‑do template;
  creating a new Trip MAY seed their per‑trip list from it.
- **R-TODO-4** — Assigning a to‑do (or any item) to a Person MUST respect §10
  (notify joined people; invite not‑yet‑joined people) and R‑HIER‑4 (assignees
  must be trip participants).

### 11.12 Group chat
- **R-CHAT-1** — Each Trip MUST have a shared chat for its participants, with
  sender, message text, and timestamp.
- **R-CHAT-2** — A chat message MAY reference a specific plan item or day (a
  contextual link back into the plan).

---

## 12. Person Scoping & Filtering

- **R-FILT-1** — Most content items MUST support a **participant scope**: either
  "everyone on the trip" or a specific subset of participants.
- **R-FILT-2** — Participant scope MUST be constrained to actual Trip participants
  (per R‑HIER‑4).
- **R-FILT-3** — The user MUST be able to filter the entire plan by person(s):
  quick modes (e.g. "mine," "everyone," "not mine") and an explicit
  pick‑specific‑people mode.
- **R-FILT-4** — When a filter is active, every view (agenda, day plan, content
  lists) MUST consistently show only items relevant to the selected people.

---

## 13. Permissions & Editing Rules (cross‑cutting)

- **R-PERM-1** — Admins MAY view and edit all content in their tenant and delete
  anything.
- **R-PERM-2** — A non‑admin MAY edit items they created or that are assigned to
  them / that they participate in; they MUST be able to remove themselves from an
  item.
- **R-PERM-3** — A non‑admin MUST NOT be able to edit content of trips they are
  not on, or manage other people.
- **R-PERM-4** — Trip‑level edits (name/dates/status/group/delete) are restricted
  to the trip owner or an Admin (R‑TRIP‑4/5).
- **R-PERM-5** — All permission rules MUST be enforced at the data‑authority
  layer, not merely hidden in the UI (R‑TEN‑1).
- **R-PERM-6** — Sensitive personal data (travel/identity details) MUST follow
  R‑PPL‑3.

---

## 14. Synchronization & Multi‑Device

- **R-SYNC-1** — All shared trip data MUST sync across the devices of all
  participants so everyone sees current state.
- **R-SYNC-2** — A user's identity/selection state (which Person they are, which
  trip/group is active) is device‑local and MUST NOT be forced onto other
  devices/users.
- **R-SYNC-3** — Concurrent edits MUST converge to a consistent result without
  silently destroying other people's changes; the system MUST define and apply a
  clear conflict‑resolution behavior.
- **R-SYNC-4** — Switching contexts (e.g. Super‑Admin entering/leaving a tenant)
  MUST never cause one context's data to be written into another's.

---

## 15. Offline & Platform

- **R-PLAT-1** — The app MUST be usable on phone‑sized screens as the primary
  form factor.
- **R-PLAT-2** — The app SHOULD be installable as a home‑screen app and SHOULD
  launch and display previously‑loaded content when offline.
- **R-PLAT-3** — When new versions ship, returning users MUST reliably get the
  updated app (no being stuck on a stale cached version); a visible build/version
  indicator SHOULD be available for support.
- **R-PLAT-4** — UI MUST respect device safe areas (status bars, notches); no
  critical control may be rendered unreachable behind device chrome.

---

## 16. Data Import (optional capability)

- **R-IMP-1** — The product MAY support importing existing plan data (e.g. from a
  spreadsheet/CSV or via an assisted/AI import) to bootstrap a trip. If provided,
  imported data MUST conform to all invariants in §6.

---

## 17. Quality, UX & Content Standards

- **R-QUAL-1** — Copy throughout MUST be plain, concrete, and human. Avoid jargon
  and vague system language; tell the user what happened and what to do next.
- **R-QUAL-2** — Flows MUST follow a sensible real‑world order (e.g. describe the
  trip before choosing who's on it) and MUST NOT ask redundant questions the user
  already answered implicitly (e.g. re‑asking "who's on the trip" right after the
  group that defines them was chosen).
- **R-QUAL-3** — Interactive elements MUST meet basic legibility/contrast in all
  states and themes (explicitly: selected/active states must remain readable).
- **R-QUAL-4** — Destructive actions MUST require confirmation and MUST be
  recoverable or clearly final.
- **R-QUAL-5** — Error and empty states MUST be handled gracefully; the app MUST
  never dead‑end the user with no path forward (especially around sign‑in,
  joining, and empty tenants).
- **R-QUAL-6** — The system MUST avoid presenting two controls that can put the
  same underlying data into contradictory states (generalization of R‑HIER‑4c).

---

## 18. Acceptance Criteria (representative, must‑pass)

1. A brand‑new authorized organizer can sign in (including in a private window),
   create a trip, add three people with emails, name the group, and send all
   three an invite — without ever being shown an in‑app "notify" prompt for those
   never‑joined people.
2. An invitee can open an invite link in a private/incognito window, complete
   sign‑in, and be dropped directly into the correct trip as the correct person.
3. It is impossible, through any screen or action, to end up with a person on a
   trip who is not in that trip's group, or a trip whose "people" and "group"
   disagree.
4. The trip selector shows every trip the signed‑in user participates in,
   regardless of the currently active group.
5. Choosing "just me" when creating a trip yields a trip with no group forced on
   it, and that trip is still visible to its creator.
6. A person always belongs to at least one group; the UI prevents removing their
   last one.
7. Selecting a date range for a trip is a single start‑then‑end interaction and
   the chosen dates are clearly legible.
8. A Super‑Admin can enter another tenant, manage it, and exit with both
   tenants' data intact; a force‑quit mid‑manage recovers to the Super‑Admin's
   own data on next launch.
9. Travel/identity details for a person are visible only to that person and to
   admins.
10. Shared edits by two participants on two devices both survive and converge.

---

## 19. Known Failure Modes To Explicitly Avoid

The following are real defects observed in a prior implementation; the new build
MUST be designed so they cannot occur:

- **F-1** — A trip having a separate "planning group" assignment and a separate
  "people on this trip" list that can be set independently, allowing participants
  who aren't in the assigned group. (Prevented by §6, R‑HIER‑4 / R‑QUAL‑6.)
- **F-2** — The trip list/selector being scoped to a single active group, hiding
  trips the user is actually on. (Prevented by R‑TRIP‑7.)
- **F-3** — A "just me / defer" trip silently inheriting whatever group was
  active. (Prevented by R‑TRIPW‑5.)
- **F-4** — Prompting to send in‑app notifications to people who have never
  signed in. (Prevented by §4.5 / §10.)
- **F-5** — A sign‑in option that, in some environments (private/incognito),
  neither prompts nor errors nor completes. (Prevented by R‑IDENT‑2/3.)
- **F-6** — Selected/active UI states rendered illegible (e.g. same‑on‑same
  color). (Prevented by R‑QUAL‑3.)
- **F-7** — Stale onboarding/identity screens flashing before the correct gate,
  or dead‑end loops on sign‑in/join. (Prevented by R‑QUAL‑5.)
- **F-8** — Force‑quit during cross‑tenant management corrupting data across
  tenants. (Prevented by R‑REC‑2 / R‑SYNC‑4.)
