/* ============================================================
   Disney Trip Planner — Seed Data
   Realistic July 2026 Walt Disney World trip, family of five.
   Normalized so Agenda, Overview, Plan and the person filter
   all read from the same source.
   ============================================================ */

/* ── Parks ─────────────────────────────────────────────────── */
var PARKS = {
  trv:{name:"Travel & Resort", color:"#8C9BAA", short:"TRV"},
  mk: {name:"Magic Kingdom",   color:"#6B4FA0", short:"MK"},
  ep: {name:"EPCOT",           color:"#0077A8", short:"EP"},
  hs: {name:"Hollywood Studios",color:"#C24530",short:"HS"},
  ak: {name:"Animal Kingdom",  color:"#3B7549", short:"AK"}
};

/* ── Family / personas ─────────────────────────────────────── */
var FAMILY = [
  {id:"scott",  name:"Scott",  color:"#2563EB", admin:true},
  {id:"hayley", name:"Hayley", color:"#DB2777"},
  {id:"nancy",  name:"Nancy",  color:"#16A34A"},
  {id:"corey",  name:"Corey",  color:"#EA580C"},
  {id:"cian",   name:"Cian",   color:"#7C3AED"}
];
var ALL_IDS = FAMILY.map(function(p){return p.id;});

/* ── Trips (for the switcher) ─────────────────────────────── */
var TRIPS = [
  {id:"jul26",   name:"July 2026",       sub:"Walt Disney World",  status:"active",
   start:"2026-07-14", end:"2026-07-19", dates:"Jul 14 – 19, 2026", color:"#6B4FA0",
   members:["scott","hayley","nancy","corey","cian"]},
  {id:"thanks26",name:"Thanksgiving 2026",sub:"Walt Disney World", status:"planning",
   start:"2026-11-24", end:"2026-11-29", dates:"Nov 24 – 29, 2026", color:"#C24530",
   members:["scott","hayley","cian"]},
  {id:"feb27",   name:"Presidents Week 2027", sub:"Walt Disney World", status:"planning",
   start:"2027-02-13", end:"2027-02-20", dates:"Feb 13 – 20, 2027", color:"#0077A8",
   members:["scott","hayley","nancy","corey","cian"]},
  {id:"spring25",name:"Spring Break 2025",sub:"Walt Disney World", status:"archived",
   start:"2025-04-12", end:"2025-04-18", dates:"Apr 12 – 18, 2025", color:"#3B7549",
   members:["scott","hayley","nancy","corey","cian"]}
];

/* ── Days of the active trip ──────────────────────────────── */
/* park2 = secondary park visit (handles two-park days)        */
var DAYS = [
  { date:"2026-07-14", d:"14", dl:"Tue", trip:"jul26",
    badges:["Travel Day","Check-in","Activate APs"],
    alert:null,
    visit:"Evening at Disney Springs",
    strategy:"Land at MCO around noon, grab the Owners Locker delivery at the room, then keep day one loose — dinner at Disney Springs and an early night before the parks start.\n\nDon't forget to activate the Annual Passes at any park entrance or Guest Relations before the first park day. Magic Bands are already linked.\n\nOwners Locker is scheduled for room delivery on arrival day — text the front desk if it hasn't shown by 4 PM.",
    itin:[
      {t:"5:45 AM",  x:"Depart BOS — Southwest"},
      {t:"11:50 AM", x:"Arrive MCO"},
      {t:"Afternoon",x:"Check in",checkin:"r1"},
      {t:"Afternoon",x:"Activate Annual Passes · Owners Locker delivered to room"},
      {t:"7:30 PM",  x:"Dinner — Homecomin' (Disney Springs)"},
      {t:"Evening",  x:"Stroll Disney Springs, early night"}
    ]
  },
  { date:"2026-07-15", d:"15", dl:"Wed", trip:"jul26",
    badges:["Single Pass Day","Park Reservation"],
    alert:null,
    visit:"EPCOT all day",
    strategy:"Enter EPCOT at rope drop and knock out the headliners before the heat. Test Track standby is reasonable early; Guardians is the Single Pass for the day.\n\nThe reliable July storm window hits around 3–4 PM — that's the cue to break for the resort pool, then come back for World Showcase and Luminous at 9.\n\nSpace 220 is still a 'want to try' — if a reservation opens on the app at 60 days, grab it. Otherwise the Garden Grill lunch carries the day.",
    itin:[
      {t:"8:20 AM",  x:"Walk to EPCOT main entrance"},
      {t:"8:30 AM",  x:"Rope drop — Test Track standby"},
      {t:"9:30 AM",  x:"Guardians of the Galaxy (Single Pass) → rebook Frozen"},
      {t:"10:15 AM", x:"Soarin' (MP T1)"},
      {t:"11:00 AM", x:"Living with the Land · The Seas (walk-on)"},
      {t:"12:30 PM", x:"Lunch — Garden Grill"},
      {t:"2:00 PM",  x:"Resort — pool / rest through storms"},
      {t:"5:30 PM",  x:"Return — World Showcase"},
      {t:"6:45 PM",  x:"Dinner — Space 220 (if reserved)"},
      {t:"9:00 PM",  x:"Luminous — The Symphony of Us"}
    ]
  },
  { date:"2026-07-16", d:"16", dl:"Thu", trip:"jul26",
    badges:["Early Entry 8:30 AM","Multi Pass Day","Park Reservation"],
    alert:"Severe afternoon thunderstorms likely 2–4 PM. Be at the tap stiles by 7:45 AM — the whole rope-drop morning depends on it.",
    visit:"Magic Kingdom all day",
    strategy:"By roughly 1:00 PM the full must-do list is done — Tiana's, Big Thunder, Space, TRON, Jungle, Pirates, Haunted, Small World, plus Buzz from the nice-to-haves. That's the whole morning driven by the rolling re-book engine.\n\nEveryone buys Single Pass for TRON on Jul 9 at 7 AM sharp, and Multi Pass the same morning. Scan each Multi Pass the moment you tap in, then immediately book the next.\n\nStorms are likely 2–4 PM. Use that window for the afternoon resort break, then return in the evening for the Monorail Crawl, Happily Ever After, and the two nighttime re-rides you've banked.",
    itin:[
      {t:"7:45 AM",  x:"At the tap stiles", crit:"Critical"},
      {t:"8:30 AM",  x:"Early Entry → Tiana's Bayou Adventure (walk-on)"},
      {t:"9:00 AM",  x:"Big Thunder Mountain (MP T2)"},
      {t:"9:30 AM",  x:"Space Mountain (MP T1)"},
      {t:"10:00 AM", x:"TRON Lightcycle Run (Single Pass)"},
      {t:"10:30 AM", x:"Jungle Cruise (MP T2) → rebook Buzz"},
      {t:"11:15 AM", x:"Pirates of the Caribbean → rebook night re-ride"},
      {t:"12:00 PM", x:"Haunted Mansion (MP T1) → rebook night re-ride"},
      {t:"12:45 PM", x:"It's a Small World · Lunch — Liberty Tree Tavern"},
      {t:"2:00 PM",  x:"Resort — swim / wait out storms"},
      {t:"Evening",  x:"Monorail Crawl → fireworks + 2 nighttime re-rides"}
    ]
  },
  { date:"2026-07-17", d:"17", dl:"Fri", trip:"jul26",
    badges:["Park Hopper","Single Pass Day"],
    alert:null,
    visit:"Morning Hollywood Studios · evening EPCOT via International Gateway",
    strategy:"No official park reservation today — this is a hopper day. Morning at Hollywood Studios for the headliners, then hop to EPCOT in the evening through the International Gateway since the BoardWalk is a short walk away.\n\nRise of the Resistance is the Single Pass. Get Slinky and the Multi Pass rides done before the midday heat, break at the BoardWalk pool, then walk in the back gate of EPCOT around 5 for World Showcase, a Le Cellier dinner, and Luminous.\n\nThe International Gateway entrance puts you right at the UK/France end — perfect for an evening that's mostly eating and drinking around the lagoon.",
    itin:[
      {t:"8:00 AM",  x:"Tap in for Early Entry — Slinky Dog Dash standby"},
      {t:"9:15 AM",  x:"Rise of the Resistance (Single Pass) → rebook Tower"},
      {t:"10:00 AM", x:"Mickey & Minnie's Runaway Railway (MP T1)"},
      {t:"10:45 AM", x:"Tower of Terror (MP T2)"},
      {t:"11:30 AM", x:"Toy Story Mania (MP T2) → rebook re-ride"},
      {t:"1:00 PM",  x:"Lunch — Hollywood Brown Derby"},
      {t:"2:30 PM",  x:"BoardWalk pool break"},
      {t:"5:00 PM",  x:"Walk to EPCOT via International Gateway", crit:"Hop"},
      {t:"7:30 PM",  x:"Dinner — Le Cellier (if reserved)"},
      {t:"9:00 PM",  x:"Luminous → stroll home to BoardWalk"}
    ]
  },
  { date:"2026-07-18", d:"18", dl:"Sat", trip:"jul26",
    badges:["Early Entry","Multi Pass Day","Park Reservation"],
    alert:null,
    visit:"Animal Kingdom all day",
    strategy:"Animal Kingdom rewards an early start more than any other park. Flight of Passage is the Single Pass — everything else falls into place with Multi Pass and a rope-drop Safari before the animals nap.\n\nMidday gets brutally hot with little shade, so plan the long Tiffins / Nomad Lounge lunch for the worst of it. Afternoon is for shows and a slow Pandora walk-through after dark when it lights up.\n\nNo nighttime spectacular tonight — head back to the BoardWalk for a relaxed last full evening.",
    itin:[
      {t:"6:45 AM",  x:"Tap in for Early Entry"},
      {t:"7:00 AM",  x:"Flight of Passage (Single Pass)"},
      {t:"7:45 AM",  x:"Na'vi River Journey (MP T2)"},
      {t:"8:30 AM",  x:"Kilimanjaro Safaris (MP T1) → rebook Everest"},
      {t:"9:30 AM",  x:"Expedition Everest"},
      {t:"10:30 AM", x:"Festival of the Lion King"},
      {t:"12:00 PM", x:"Lunch — Tiffins / Nomad Lounge"},
      {t:"2:00 PM",  x:"Kali River Rapids · Maharajah Jungle Trek"},
      {t:"4:00 PM",  x:"Resort — break"},
      {t:"7:00 PM",  x:"Pandora after dark"}
    ]
  },
  { date:"2026-07-19", d:"19", dl:"Sun", trip:"jul26",
    badges:["Last Day","Check-out","Two Return Flights"],
    alert:"Resort check-out is 11:00 AM. Drop the Owners Locker at Bell Services for pickup before you leave.",
    visit:"Morning Magic Kingdom · afternoon & evening departures",
    strategy:"Two flights home today. Scott, Hayley and Corey are on the afternoon Delta out of MCO; Nancy and Cian have a later JetBlue and can squeeze in more park time.\n\nMorning is a relaxed last hurrah at Magic Kingdom — no Lightning Lanes booked, just favorites and a Main Street breakfast. Bags go to Bell Services at check-out so nobody is dragging luggage around.\n\nNancy & Cian's flight is still showing as planning — confirm the JetBlue booking before the trip so it's locked in.",
    itin:[
      {t:"8:00 AM",  x:"Breakfast — Trattoria al Forno (BoardWalk)"},
      {t:"9:00 AM",  x:"Magic Kingdom — last favorites"},
      {t:"11:00 AM", x:"Check out · bags to Bell Services", checkin:"r2out"},
      {t:"1:30 PM",  x:"Scott, Hayley & Corey → MCO"},
      {t:"4:30 PM",  x:"Depart MCO — Delta DL 1422", crit:"Flight"},
      {t:"5:00 PM",  x:"Nancy & Cian → MCO"},
      {t:"8:10 PM",  x:"Depart MCO — JetBlue B6 1186", crit:"Flight"}
    ]
  }
];

/* ── Park visits (first-class items: park + day + timing + people) */
/* The first visit on a day is the primary park (drives the hero +    */
/* day strip color); a second is a hopper / two-park visit.           */
/* timing: morning | day | evening | late                             */
var VISITS = [
  {id:"v15",  trip:"jul26", day:"2026-07-15", park:"ep", timing:"day",     who:"all"},
  {id:"v16",  trip:"jul26", day:"2026-07-16", park:"mk", timing:"day",     who:"all"},
  {id:"v17a", trip:"jul26", day:"2026-07-17", park:"hs", timing:"morning", who:"all"},
  {id:"v17b", trip:"jul26", day:"2026-07-17", park:"ep", timing:"evening", who:"all"},
  {id:"v18",  trip:"jul26", day:"2026-07-18", park:"ak", timing:"day",     who:"all"},
  {id:"v19",  trip:"jul26", day:"2026-07-19", park:"mk", timing:"morning", who:"all"}
];

/* ── Park hours (first-class items: park + day + hours + crowd) ─ */
/* One per park per day — a fact about the park, independent of a visit. */
var PARKHOURS = [
  {id:"h15ep", trip:"jul26", day:"2026-07-15", park:"ep", open:"8:30 AM", close:"9:00 PM",  early:"", late:"", crowd:4},
  {id:"h16mk", trip:"jul26", day:"2026-07-16", park:"mk", open:"9:00 AM", close:"10:00 PM", early:"8:30 AM", late:"", crowd:7},
  {id:"h17hs", trip:"jul26", day:"2026-07-17", park:"hs", open:"8:30 AM", close:"9:00 PM",  early:"8:00 AM", late:"", crowd:5},
  {id:"h17ep", trip:"jul26", day:"2026-07-17", park:"ep", open:"11:00 AM",close:"9:00 PM",  early:"", late:"", crowd:5},
  {id:"h18ak", trip:"jul26", day:"2026-07-18", park:"ak", open:"7:00 AM", close:"8:00 PM",  early:"6:45 AM", late:"", crowd:6},
  {id:"h19mk", trip:"jul26", day:"2026-07-19", park:"mk", open:"8:00 AM", close:"11:00 PM", early:"", late:"", crowd:6}
];

/* ── Resort stays (split stay) ────────────────────────────── */
var RESORTS = [
  {id:"r1", name:"Disney's Pop Century Resort", room:"Standard Room · Pool View",
   checkin:"2026-07-14", checkout:"2026-07-16", conf:"A10293847",
   status:"booked", who:"all"},
  {id:"r2", name:"Disney's BoardWalk Villas", room:"1-Bedroom Villa",
   checkin:"2026-07-16", checkout:"2026-07-19", conf:"619078381899",
   status:"booked", who:"all"}
];

/* ── Flights ──────────────────────────────────────────────── */
var FLIGHTS = [
  {id:"f1", label:"Outbound", day:"2026-07-14", who:"all", status:"booked",
   legs:[
     {airline:"Southwest", num:"WN 4657", conf:"2X4F9K",
      depApt:"BOS", depCity:"Boston",    depTime:"5:45 AM", depDate:"2026-07-14",
      arrApt:"BWI", arrCity:"Baltimore", arrTime:"7:20 AM", arrDate:"2026-07-14"},
     {airline:"Southwest", num:"WN 2891", conf:"2X4F9K",
      depApt:"BWI", depCity:"Baltimore", depTime:"9:55 AM",  depDate:"2026-07-14",
      arrApt:"MCO", arrCity:"Orlando",   arrTime:"11:50 AM", arrDate:"2026-07-14"}
   ]},
  {id:"f2", label:"Return — Scott, Hayley & Corey", day:"2026-07-19",
   who:["scott","hayley","corey"], status:"booked",
   legs:[
     {airline:"Delta", num:"DL 1422", conf:"HG7T2P",
      depApt:"MCO", depCity:"Orlando", depTime:"4:30 PM", depDate:"2026-07-19",
      arrApt:"BOS", arrCity:"Boston",  arrTime:"7:15 PM", arrDate:"2026-07-19"}
   ]},
  {id:"f3", label:"Return — Nancy & Cian", day:"2026-07-19",
   who:["nancy","cian"], status:"planning",
   legs:[
     {airline:"JetBlue", num:"B6 1186", conf:"",
      depApt:"MCO", depCity:"Orlando", depTime:"8:10 PM",  depDate:"2026-07-19",
      arrApt:"BOS", arrCity:"Boston",  arrTime:"11:02 PM", arrDate:"2026-07-19"}
   ]}
];

/* ── Park reservations (official Disney) ──────────────────── */
var PARKRES = [
  {id:"pr1", day:"2026-07-15", park:"ep", status:"booked", who:"all"},
  {id:"pr2", day:"2026-07-16", park:"mk", status:"booked", who:"all"},
  {id:"pr3", day:"2026-07-18", park:"ak", status:"booked", who:"all"}
];

/* ── Lightning Lanes ──────────────────────────────────────── */
/* tier: sp | mp1 | mp2 · status: planning | booked           */
var LLS = [
  // EPCOT — Jul 15
  {id:"ll1", day:"2026-07-15", park:"ep", ride:"Guardians of the Galaxy: Cosmic Rewind",
   tier:"sp", status:"booked", window:"~9:30–10:30 AM", bookedTime:"9:45 AM",
   conf:"GR-77214", bookDate:"Jul 15 @ 7:00 AM", who:"all"},
  {id:"ll2", day:"2026-07-15", park:"ep", ride:"Soarin' Around the World",
   tier:"mp1", status:"booked", window:"~10:15–11:15 AM", bookedTime:"10:25 AM",
   conf:"MP-44190", bookDate:"Jul 8 @ 7:00 AM", who:"all"},
  {id:"ll3", day:"2026-07-15", park:"ep", ride:"Frozen Ever After",
   tier:"mp1", status:"planning", window:"~12:30–1:30 PM", bookedTime:"",
   conf:"", bookDate:"Jul 8 @ 7:00 AM", who:"all"},

  // Magic Kingdom — Jul 16  (the showcase LL day)
  {id:"ll4", day:"2026-07-16", park:"mk", ride:"TRON Lightcycle / Run",
   tier:"sp", status:"booked", window:"~10:00–10:30 AM", bookedTime:"10:05 AM",
   conf:"SP-90021", bookDate:"Jul 16 @ 7:00 AM", who:"all"},
  {id:"ll5", day:"2026-07-16", park:"mk", ride:"Space Mountain",
   tier:"mp1", status:"booked", window:"~9:30–10:30 AM", bookedTime:"9:35 AM",
   conf:"MP-31188", bookDate:"Jul 9 @ 7:00 AM", who:"all"},
  {id:"ll6", day:"2026-07-16", park:"mk", ride:"Big Thunder Mountain Railroad",
   tier:"mp2", status:"planning", window:"~9:00–10:00 AM", bookedTime:"",
   conf:"", bookDate:"Jul 9 @ 7:00 AM", who:"all"},
  {id:"ll7", day:"2026-07-16", park:"mk", ride:"Jungle Cruise",
   tier:"mp2", status:"planning", window:"~10:30–11:30 AM", bookedTime:"",
   conf:"", bookDate:"Jul 9 @ 7:00 AM", who:"all"},
  {id:"ll8", day:"2026-07-16", park:"mk", ride:"Haunted Mansion",
   tier:"mp1", status:"planning", window:"~12:00–1:00 PM", bookedTime:"",
   conf:"", bookDate:"Jul 9 @ 7:00 AM", who:"all"},

  // Hollywood Studios — Jul 17
  {id:"ll9", day:"2026-07-17", park:"hs", ride:"Rise of the Resistance",
   tier:"sp", status:"planning", window:"~9:15–10:15 AM", bookedTime:"",
   conf:"", bookDate:"Jul 17 @ 7:00 AM", who:"all"},
  {id:"ll10", day:"2026-07-17", park:"hs", ride:"Mickey & Minnie's Runaway Railway",
   tier:"mp1", status:"planning", window:"~10:00–11:00 AM", bookedTime:"",
   conf:"", bookDate:"Jul 10 @ 7:00 AM", who:"all"},
  {id:"ll11", day:"2026-07-17", park:"hs", ride:"The Twilight Zone Tower of Terror",
   tier:"mp2", status:"planning", window:"~10:45–11:45 AM", bookedTime:"",
   conf:"", bookDate:"Jul 10 @ 7:00 AM", who:"all"},
  {id:"ll12", day:"2026-07-17", park:"hs", ride:"Toy Story Mania!",
   tier:"mp2", status:"planning", window:"~11:30 AM–12:30 PM", bookedTime:"",
   conf:"", bookDate:"Jul 10 @ 7:00 AM", who:"all"},

  // Animal Kingdom — Jul 18
  {id:"ll13", day:"2026-07-18", park:"ak", ride:"Avatar Flight of Passage",
   tier:"sp", status:"planning", window:"~7:00–8:00 AM", bookedTime:"",
   conf:"", bookDate:"Jul 18 @ 7:00 AM", who:"all"},
  {id:"ll14", day:"2026-07-18", park:"ak", ride:"Kilimanjaro Safaris",
   tier:"mp1", status:"planning", window:"~8:30–9:30 AM", bookedTime:"",
   conf:"", bookDate:"Jul 11 @ 7:00 AM", who:"all"},
  {id:"ll15", day:"2026-07-18", park:"ak", ride:"Na'vi River Journey",
   tier:"mp2", status:"planning", window:"~7:45–8:45 AM", bookedTime:"",
   conf:"", bookDate:"Jul 11 @ 7:00 AM", who:"all"}
];

/* Rolling re-book notes keyed by date */
var ROLLING = {
  "2026-07-16":[
    "After Jungle Cruise → book Buzz Lightyear",
    "After Pirates → nighttime re-ride #1",
    "After Haunted Mansion → nighttime re-ride #2"
  ],
  "2026-07-17":[
    "After Runaway Railway → book Slinky Dog Dash",
    "After Toy Story Mania → evening re-ride"
  ],
  "2026-07-18":[
    "After Kilimanjaro Safaris → book Expedition Everest",
    "After Everest → Kali River Rapids"
  ]
};

/* ── Dining ───────────────────────────────────────────────── */
/* loc: in | off · status: reserved | want                    */
var DINING = [
  {id:"d1", day:"2026-07-14", meal:"Dinner",    name:"Homecomin'", time:"7:30 PM",
   loc:"off", status:"reserved", conf:"DR-118402", who:"all"},
  {id:"d2", day:"2026-07-15", meal:"Lunch",     name:"Garden Grill", time:"12:30 PM",
   loc:"in", park:"ep", status:"reserved", conf:"DR-118455", who:"all"},
  {id:"d3", day:"2026-07-15", meal:"Dinner",    name:"Space 220", time:"6:45 PM",
   loc:"in", park:"ep", status:"want", conf:"", who:"all"},
  {id:"d4", day:"2026-07-16", meal:"Breakfast", name:"The Crystal Palace", time:"8:00 AM",
   loc:"in", park:"mk", status:"reserved", conf:"DR-118501", who:["nancy","cian","corey"]},
  {id:"d5", day:"2026-07-16", meal:"Lunch",     name:"Liberty Tree Tavern", time:"1:00 PM",
   loc:"in", park:"mk", status:"reserved", conf:"DR-118533", who:"all"},
  {id:"d6", day:"2026-07-17", meal:"Lunch",     name:"The Hollywood Brown Derby", time:"1:00 PM",
   loc:"in", park:"hs", status:"reserved", conf:"DR-118570", who:"all"},
  {id:"d7", day:"2026-07-17", meal:"Dinner",    name:"Le Cellier Steakhouse", time:"7:30 PM",
   loc:"in", park:"ep", status:"want", conf:"", who:"all"},
  {id:"d8", day:"2026-07-18", meal:"Lunch",     name:"Tiffins", time:"12:00 PM",
   loc:"in", park:"ak", status:"want", conf:"", who:"all"},
  {id:"d9", day:"2026-07-18", meal:"Drinks",    name:"Nomad Lounge", time:"Afternoon",
   loc:"in", park:"ak", status:"reserved", conf:"walk-up", who:["scott","hayley","nancy"]},
  {id:"d10",day:"2026-07-19", meal:"Breakfast", name:"Trattoria al Forno", time:"8:00 AM",
   loc:"off", status:"reserved", conf:"DR-118612", who:"all"}
];

/* ── Night shows ──────────────────────────────────────────── */
var SHOWS = [
  {id:"s1", day:"2026-07-15", name:"Luminous The Symphony of Us", time:"9:00 PM", who:"all"},
  {id:"s2", day:"2026-07-16", name:"Happily Ever After", time:"9:20 PM", who:"all"},
  {id:"s3", day:"2026-07-16", name:"Disney Starlight Parade", time:"8:30 & 10:30 PM",
   who:["nancy","cian","corey"]},
  {id:"s4", day:"2026-07-17", name:"Luminous The Symphony of Us", time:"9:00 PM", who:"all"}
];

/* ── Packing — per person ─────────────────────────────────── */
/* Scott carries the full master list; others are lighter.     */
var PK_FULL = [
  {cat:"Clothes", items:[
    {n:"Underwear",qty:7,l:false,done:true},{n:"Socks",qty:7,l:false,done:true},
    {n:"Shorts",qty:6,l:false,done:false},{n:"T-Shirts",qty:7,l:false,done:false},
    {n:"Bathing Suits",qty:2,l:false,done:true},{n:"Sneakers",qty:1,l:false,done:false},
    {n:"PJs",qty:1,l:false,done:false},{n:"Light Rain Jacket",qty:1,l:false,done:false},
    {n:"Crocs",qty:0,l:true,done:false}
  ]},
  {cat:"Electronics", items:[
    {n:"Phone + Cable",qty:1,l:false,done:true},{n:"Portable Charger",qty:1,l:false,done:false},
    {n:"AirPods",qty:1,l:false,done:false},{n:"Apple Watch + Cable",qty:1,l:false,done:false},
    {n:"Power Strip",qty:0,l:true,done:false}
  ]},
  {cat:"Toiletries", items:[
    {n:"Toothbrush + Paste",qty:1,l:false,done:false},{n:"Deodorant",qty:1,l:false,done:false},
    {n:"Beard Trimmer",qty:1,l:false,done:false},{n:"Sunblock SPF 50",qty:2,l:false,done:false},
    {n:"Gold Bond",qty:0,l:true,done:false}
  ]},
  {cat:"Health", items:[
    {n:"Daily Meds",qty:1,l:false,done:true},{n:"Advil",qty:1,l:false,done:false},
    {n:"Tums",qty:1,l:false,done:false},{n:"Band-Aids",qty:1,l:false,done:false},
    {n:"Blister Pads",qty:1,l:false,done:false}
  ]},
  {cat:"Paperwork", items:[
    {n:"Annual Pass Cards",qty:5,l:false,done:true},{n:"Magic Bands",qty:5,l:false,done:true},
    {n:"Boarding Passes",qty:1,l:false,done:false},{n:"Credit / Gift Cards",qty:1,l:false,done:false}
  ]},
  {cat:"Misc", items:[
    {n:"Sunglasses",qty:1,l:false,done:false},{n:"Refillable Mug",qty:1,l:false,done:false},
    {n:"Cash for Tips",qty:1,l:false,done:false},{n:"Ponchos",qty:0,l:true,done:false},
    {n:"Pool Bag",qty:0,l:true,done:false}
  ]}
];
function pkLight(seed){return seed;}
var PACKING = {
  scott: JSON.parse(JSON.stringify(PK_FULL)),
  hayley:[
    {cat:"Clothes", items:[
      {n:"Underwear",qty:7,l:false,done:true},{n:"Tops",qty:7,l:false,done:false},
      {n:"Shorts / Skirts",qty:5,l:false,done:false},{n:"Sundresses",qty:2,l:false,done:false},
      {n:"Swimsuits",qty:2,l:false,done:true},{n:"Sandals",qty:1,l:false,done:false},
      {n:"Sneakers",qty:1,l:false,done:false}
    ]},
    {cat:"Toiletries", items:[
      {n:"Skincare Bag",qty:1,l:false,done:false,by:"scott"},{n:"Makeup Bag",qty:1,l:false,done:true},
      {n:"Hair Straightener",qty:1,l:false,done:false},{n:"Sunblock",qty:1,l:false,done:false}
    ]},
    {cat:"Electronics", items:[
      {n:"Phone + Cable",qty:1,l:false,done:true},{n:"Charger Brick",qty:1,l:false,done:false},
      {n:"Kindle",qty:1,l:false,done:false}
    ]},
    {cat:"Misc", items:[
      {n:"Sunglasses",qty:1,l:false,done:false},{n:"Crossbody Bag",qty:1,l:false,done:true},
      {n:"Refillable Mug",qty:1,l:false,done:false}
    ]}
  ],
  nancy:[
    {cat:"Clothes", items:[
      {n:"Underwear",qty:7,l:false,done:true},{n:"Tops",qty:6,l:false,done:false},
      {n:"Shorts",qty:5,l:false,done:false},{n:"Swimsuit",qty:2,l:false,done:false},
      {n:"Comfy Walking Shoes",qty:1,l:false,done:true},{n:"Cardigan",qty:1,l:false,done:false}
    ]},
    {cat:"Health", items:[
      {n:"Daily Meds",qty:1,l:false,done:true},{n:"Reading Glasses",qty:2,l:false,done:false},
      {n:"Compression Socks",qty:2,l:false,done:false}
    ]},
    {cat:"Toiletries", items:[
      {n:"Toiletry Bag",qty:1,l:false,done:false},{n:"Sunblock",qty:1,l:false,done:false}
    ]},
    {cat:"Misc", items:[
      {n:"Sun Hat",qty:1,l:false,done:false},{n:"Refillable Mug",qty:1,l:false,done:false},
      {n:"Fan / Mister",qty:1,l:false,done:false,by:"scott"}
    ]}
  ],
  corey:[
    {cat:"Clothes", items:[
      {n:"Underwear",qty:7,l:false,done:false},{n:"T-Shirts",qty:7,l:false,done:false},
      {n:"Shorts",qty:6,l:false,done:false},{n:"Swim Trunks",qty:2,l:false,done:true},
      {n:"Sneakers",qty:1,l:false,done:false},{n:"Sandals",qty:1,l:false,done:false}
    ]},
    {cat:"Electronics", items:[
      {n:"Phone + Cable",qty:1,l:false,done:false},{n:"Switch + Games",qty:1,l:false,done:false},
      {n:"Headphones",qty:1,l:false,done:false},{n:"Charger",qty:1,l:false,done:false}
    ]},
    {cat:"Misc", items:[
      {n:"Sunglasses",qty:1,l:false,done:false},{n:"Pin Lanyard",qty:1,l:false,done:false},
      {n:"Refillable Mug",qty:1,l:false,done:false}
    ]}
  ],
  cian:[
    {cat:"Clothes", items:[
      {n:"Underwear",qty:7,l:false,done:false},{n:"T-Shirts",qty:7,l:false,done:false},
      {n:"Shorts",qty:6,l:false,done:false},{n:"Swim Trunks",qty:2,l:false,done:false},
      {n:"Light-up Sneakers",qty:1,l:false,done:true},{n:"Sun Hat",qty:1,l:false,done:false,by:"nancy"}
    ]},
    {cat:"Misc", items:[
      {n:"Autograph Book + Pen",qty:1,l:false,done:false,by:"hayley"},{n:"Stuffed Animal",qty:1,l:false,done:true},
      {n:"Tablet + Headphones",qty:1,l:false,done:false},{n:"Refillable Mug",qty:1,l:false,done:false},
      {n:"Sunblock Stick",qty:1,l:false,done:false,by:"scott"}
    ]}
  ]
};

/* ── To Do — per person ───────────────────────────────────── */
var TODO = {
  scott:[
    {n:"Book hotel",when:"11 months",done:true,na:false},
    {n:"Book flights",when:"",done:true,na:false},
    {n:"Park tickets / renew APs",when:"",done:true,na:false},
    {n:"Park reservations",when:"60 days",done:true,na:false},
    {n:"Dining reservations",when:"180 days",done:true,na:false},
    {n:"Set 7 AM Lightning Lane alarms",when:"7 days",done:false,na:false},
    {n:"Resort online check-in",when:"",done:true,na:false},
    {n:"Airline check-in",when:"Day before",done:false,na:false},
    {n:"Order groceries to room",when:"3 days",done:false,na:false},
    {n:"Confirm Owners Locker delivery",when:"3 days",done:false,na:false}
  ],
  hayley:[
    {n:"Make Space 220 reservation",when:"60 days",done:false,na:false},
    {n:"Book Bibbidi Bobbidi for Cian",when:"60 days",done:false,na:true},
    {n:"Refill prescriptions",when:"14 days",done:false,na:false},
    {n:"Buy travel snacks",when:"3 days",done:false,na:false},
    {n:"Charge all power banks",when:"Day before",done:false,na:false}
  ],
  nancy:[
    {n:"Renew passport-style photo IDs",when:"30 days",done:true,na:true},
    {n:"Pick up compression socks",when:"14 days",done:false,na:false},
    {n:"Arrange mail hold",when:"7 days",done:false,na:false},
    {n:"Pack daily medications",when:"3 days",done:false,na:false}
  ],
  corey:[
    {n:"Download offline shows / games",when:"Day before",done:false,na:false},
    {n:"Decide must-do rides list",when:"7 days",done:false,na:false}
  ],
  cian:[
    {n:"Pick stuffed animal for the trip",when:"7 days",done:true,na:false},
    {n:"Make a ride wish list with Dad",when:"7 days",done:false,na:false}
  ]
};

/* ── Chat ─────────────────────────────────────────────────── */
var CHAT = [
  {from:"hayley", text:"Just locked in Garden Grill for lunch on EPCOT day 🎉", time:"Jun 2 · 8:14 PM", day:"2026-07-15"},
  {from:"cian",   text:"can we do space 220 PLEASE i want the space windows", time:"Jun 2 · 8:20 PM"},
  {from:"scott",  text:"Adding it to the list — still need a reservation to open up. Watching the app.", time:"Jun 2 · 8:31 PM", ref:{type:"dining", label:"Space 220 · Want to Try"}},
  {from:"corey",  text:"What's the rope drop plan for Magic Kingdom again?", time:"Jun 9 · 7:02 PM"},
  {from:"scott",  text:"Tap stiles by 7:45, TRON single pass at 10. Read the Jul 16 strategy card 👀", time:"Jun 9 · 7:10 PM", ref:{type:"day", label:"Jul 16 · Magic Kingdom"}},
  {from:"nancy",  text:"Our JetBlue flight home still isn't booked — should I just do it?", time:"Jun 14 · 1:45 PM", ref:{type:"flight", label:"Return · Nancy & Cian · Planning"}},
  {from:"scott",  text:"Yes please! Aisle seats if you can. I'll mark it booked once you forward the confirmation.", time:"Jun 14 · 1:52 PM"},
  // day-of cluster
  {from:"scott",  text:"At the tap stiles, right on time. TRON single passes are in 🙌", time:"Jul 16 · 7:46 AM", day:"2026-07-16"},
  {from:"corey",  text:"Tiana's was a walk-on, so good", time:"Jul 16 · 8:52 AM"},
  {from:"hayley", text:"Storm rolling in early, heading back to the pool now", time:"Jul 16 · 1:38 PM"},
  {from:"nancy",  text:"Cian's napping, we'll meet you for the Monorail Crawl at 6?", time:"Jul 16 · 3:05 PM"},
  {from:"scott",  text:"Perfect. Poly first, then Grand Flo. Fireworks at 9:20.", time:"Jul 16 · 3:11 PM", ref:{type:"show", label:"Happily Ever After · 9:20 PM"}}
];

/* Minimal data for non-active trips (switcher only) */
var TRIP_SUMMARY = {
  thanks26:{resort:"Disney's Animal Kingdom Lodge", days:6, dining:4, flights:1, status:"Booking dining at 180 days"},
  feb27:{resort:"Disney's Riviera Resort", days:8, dining:0, flights:0, status:"Just dates so far"},
  spring25:{resort:"Disney's Beach Club", days:7, dining:9, flights:2, status:"Completed"}
};
