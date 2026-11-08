/**
 * data/archive-items.js
 * Fictional Memorabilia & Archival Items Catalog for SOUNDWAVE 2026: The Living Archive
 * High creativity, low friction. 
 */

export const ARCHIVE_ITEMS = [
  // --- POSTERS ---
  {
    id: "poster-ed01",
    type: "poster",
    title: "Edition 01 Festival Poster",
    year: "2014",
    edition: "ED. 01",
    label: "ARCHIVE № SW-P-001 · FOUNDATION",
    thumb: "assets/archive/posters/poster-ed01-2014-sm.jpg",
    full: "assets/archive/posters/poster-ed01-2014.jpg",
    aspect: "2/3",
    description: "The debut letterpress print on heavy cream rag, featuring the original sine-wave identity grid that defined SoundWave's sonic architecture.",
    curatorNotes: "Hand-pulled on an archival proofing press. Notice the quad-fold crease lines from original mailers.",
    isDraggable: true
  },
  {
    id: "poster-ed05",
    type: "poster",
    title: "Edition 05 EuroTour Poster",
    year: "2018",
    edition: "ED. 05",
    label: "ARCHIVE № SW-P-005 · EUROTOUR SOUNDWAVE",
    thumb: "assets/archive/posters/poster-ed05-2018-sm.jpg",
    full: "assets/archive/posters/poster-ed05-2018.jpg",
    aspect: "2/3",
    description: "Neon magenta screenprint with perforated tour date ticket ledger celebrating SoundWave's international sound exchange.",
    curatorNotes: "Screen printed on neon paper stock with distinct halftone gradient portrait.",
    isDraggable: true
  },

  // --- FLYERS & PRINTED EPHEMERA ---
  {
    id: "flyer-zine",
    type: "flyer",
    title: "Edition 03 Headline Poster",
    year: "2016",
    edition: "ED. 03",
    label: "ARCHIVE № SW-F-003 · HEADLINE SERIES",
    thumb: "assets/archive/flyers/flyer-zine-ed03-sm.jpg",
    full: "assets/archive/flyers/flyer-zine-ed03.jpg",
    aspect: "3/4",
    description: "Vintage halftone tri-panel red screenprint featuring live headline band performances at the Amphitheater.",
    curatorNotes: "Archival print featuring retro typography and red duotone concert photography panels.",
    isDraggable: true
  },
  {
    id: "flyer-schedule",
    type: "flyer",
    title: "Tri-Fold Timetable Leaflet",
    year: "2017",
    edition: "ED. 04",
    label: "ARCHIVE № SW-F-004 · POCKET GUIDE",
    thumb: "assets/archive/flyers/flyer-folded-schedule-sm.jpg",
    full: "assets/archive/flyers/flyer-folded-schedule.jpg",
    aspect: "1/1",
    description: "Pocket schedule grid distributed at Gate B. Features color-coded set blocks across three stages.",
    curatorNotes: "Tri-folded with authentic wear along central spine.",
    isDraggable: false
  },

  // --- PRESERVED CREW PASS ---
  {
    id: "pass-crew",
    type: "ticket-html",
    title: "Backstage Crew Pass",
    year: "2021",
    edition: "ED. 08",
    label: "ARCHIVE № SW-P-008 · ALL ACCESS",
    component: "pass-crew",
    description: "Laminated working crew credential with punch hole, worn corner peeling, and hand-inked badge #047.",
    curatorNotes: "Authorized for Analog Dome engineering pit & backline loading dock.",
    isDraggable: true
  },

  // --- AUTHENTIC PHYSICAL PASSES (Fictional CSS Replicas of 10 Vintage Festival Eras) ---
  {
    id: "ticket-pink",
    type: "ticket-html",
    component: "ticket-pink",
    title: "Edition 02 Pink Stub",
    year: "2015",
    edition: "ED. 02",
    label: "ARCHIVE № SW-T-002 · GENERAL ADMISSION",
    description: "Cream paper tone with subtle dark ink grain, muted rose-pink stub coupons, and classic Rockway promoter ledger.",
    curatorNotes: "Synthesized micro-texture grain and paper fiber speckles across each title patch.",
    isDraggable: true
  },
  {
    id: "ticket-magenta",
    type: "ticket-html",
    component: "ticket-magenta",
    title: "Edition 04 Stadium Puerta 9 Pass",
    year: "2017",
    edition: "ED. 04",
    label: "ARCHIVE № SW-T-004 · STADIUM ARENA",
    description: "Soft faded red/rose paper with rich crimson type, decorative curved header banner, and official stadium gate validation.",
    curatorNotes: "Features two-tone stadium zone boxes and perforated admission stub.",
    isDraggable: true
  },
  {
    id: "ticket-orange",
    type: "ticket-html",
    component: "ticket-orange",
    title: "Edition 05 Arena In Concert Pass",
    year: "2018",
    edition: "ED. 05",
    label: "ARCHIVE № SW-T-005 · TIER 1 RESERVED",
    description: "Warm aged peach tone cardstock with large bold red date block numeral 21 and German promoter admission ledger.",
    curatorNotes: "Aged peach-to-cream gradient with authentic row and seat audit block.",
    isDraggable: true
  },
  {
    id: "ticket-green",
    type: "ticket-html",
    component: "ticket-green",
    title: "Edition 06 Coliseum Advance Pass",
    year: "2019",
    edition: "ED. 06",
    label: "ARCHIVE № SW-T-006 · ADVANCE TIER",
    description: "Faded sage green cardstock with dark forest ink, Globe Ticket stamp, and twin date registers.",
    curatorNotes: "Features bold 11 date numeral and authentic box office admission tax record.",
    isDraggable: true
  },
  {
    id: "ticket-blue",
    type: "ticket-html",
    component: "ticket-blue",
    title: "Edition 07 Convention Center Arena Pass",
    year: "2020",
    edition: "ED. 07",
    label: "ARCHIVE № SW-T-007 · FLOOR ACCESS",
    description: "Sky-cyan ticket stock with deep slate blue lettering, star glyph emblems, and perforated floor audit stub.",
    curatorNotes: "Classic 1970s arena typography with high-contrast slate blue ink.",
    isDraggable: true
  },
  {
    id: "ticket-yellow",
    type: "ticket-html",
    component: "ticket-yellow",
    title: "Edition 08 Jackson Coliseum Pass",
    year: "2021",
    edition: "ED. 08",
    label: "ARCHIVE № SW-T-008 · ADVANCE PASS",
    description: "Vintage yellowed ledger paper with charcoal type, bold numeral 1 date block, and Be Bop promoter masthead.",
    curatorNotes: "Authentic fiber speckle synthesized on aged yellow ledger paper stock.",
    isDraggable: true
  },
  {
    id: "ticket-red-cobo",
    type: "ticket-html",
    component: "ticket-red-cobo",
    title: "Edition 09 Cobo Arena Red Pass",
    year: "2022",
    edition: "ED. 09",
    label: "ARCHIVE № SW-T-009 · SKYDECK ACCESS",
    description: "Deep crimson paper with dark security stamp tones, circular white punch holes, and clean admission columns.",
    curatorNotes: "Punched circular holes reflect physical box office door control validation.",
    isDraggable: true
  },
  {
    id: "ticket-metallica",
    type: "ticket-html",
    component: "ticket-metallica",
    title: "Edition 10 Messehalle Heavy Pass",
    year: "2023",
    edition: "ED. 10",
    label: "ARCHIVE № SW-T-010 · STAGE BARRIER PASS",
    description: "Black cardstock with gold metallic lettering, Metal Hammer banner, and cream perforated admission ledger.",
    curatorNotes: "High-contrast heavy cardstock with gold reflective typography.",
    isDraggable: true
  },
  {
    id: "ticket-zeppelin",
    type: "ticket-html",
    component: "ticket-zeppelin",
    title: "Edition 11 Kingdome Special Evening Pass",
    year: "2024",
    edition: "ED. 11",
    label: "ARCHIVE № SW-T-011 · TENTH ANNIVERSARY",
    description: "Antique aged ivory paper with rust-red wireframe lettering, circular Kingdome seal, and serial ledger #027447.",
    curatorNotes: "Double-outline rust red lettering over aged parchment paper grain.",
    isDraggable: true
  },
  {
    id: "ticket-fleetwood",
    type: "ticket-html",
    component: "ticket-fleetwood",
    title: "Edition 12 Rupp Arena Evening Pass",
    year: "2025",
    edition: "ED. 12",
    label: "ARCHIVE № SW-T-012 · FESTIVAL ACCESS",
    description: "Salmon-tinted paper with deep ink lettering, magenta price strip, and Beaver Productions promoter stamp.",
    curatorNotes: "Two-tone salmon cardstock with magenta price coupon and perforated seat ledger.",
    isDraggable: true
  },

  // --- DISCOVERABLE ARTIFACTS (Interactive hidden discoveries) ---
  {
    id: "note-secret",
    type: "note-html",
    title: "Handwritten Meetup Note",
    year: "2022",
    edition: "ED. 09",
    label: "DISCOVERY № 01 · CANDID MEMORY",
    component: "note-secret",
    description: "Blue ballpoint pen on lined paper, held down by yellowed masking tape: 'Meet at the Vinyl Lawn at sunset — same spot as last year ♥'",
    isDraggable: true,
    isDiscovery: true
  },
  {
    id: "fragment-schedule",
    type: "fragment-html",
    title: "Torn Saturday Set Times",
    year: "2024",
    edition: "ED. 11",
    label: "DISCOVERY № 02 · STAGE SCRAP",
    component: "fragment-schedule",
    description: "Torn paper scrap showing Horizon Arena times with 18:45 Sunset Set circled in blue ballpoint pen.",
    isDraggable: true,
    isDiscovery: true
  },
  {
    id: "map-fragment",
    type: "map-html",
    title: "Annotated Stage Map Fragment",
    year: "2025",
    edition: "ED. 12",
    label: "DISCOVERY № 03 · CARTOGRAPHY",
    component: "map-fragment",
    description: "Architectural parchment scrap locating Horizon Arena, Analog Dome, Vinyl Lawn & VIP Cabanas against Biscayne Bay.",
    isDraggable: true,
    isDiscovery: true
  }
];

// --- SCENE 03 & 04 PHOTOGRAPHIC EXHIBITION ITEMS ---
export const PEOPLE_GALLERY = [
  {
    id: "photo-crowd-dusk",
    title: "Memories Inside Horizon",
    caption: "Sunset Dusk Sky · Golden crimson horizon over the arena crowd",
    location: "Horizon Arena",
    thumb: "assets/archive/photos/photo-crowd-dusk-sm.jpg",
    full: "assets/archive/photos/photo-crowd-dusk.jpg",
    orientation: "portrait",
    size: "large", // spans 2 cols / hero in gallery
    timestamp: "DEC 19 · 19:42"
  },
  {
    id: "photo-stage-silhouettes",
    title: "Deep Cuts with Deep Souls",
    caption: "Warehouse & Balcony Rave · Neon light beams cutting through haze",
    location: "Analog Dome",
    thumb: "assets/archive/photos/photo-stage-silhouettes-sm.jpg",
    full: "assets/archive/photos/photo-stage-silhouettes.jpg",
    orientation: "square",
    size: "tall",
    timestamp: "DEC 19 · 23:15"
  },
  {
    id: "photo-confetti",
    title: "Confetti Storm",
    caption: "Main Stage Finale · Midnight confetti storm & crowd joy",
    location: "Horizon Arena",
    thumb: "assets/archive/photos/photo-confetti-sm.jpg",
    full: "assets/archive/photos/photo-confetti.jpg",
    orientation: "portrait",
    size: "medium",
    timestamp: "DEC 20 · 00:00"
  },
  {
    id: "photo-golden-lawn",
    title: "Vinyl Lawn",
    caption: "Vinyl Lawn Stage · Sunlit afternoon festival crowd",
    location: "Vinyl Lawn",
    thumb: "assets/archive/photos/photo-golden-lawn-sm.jpg",
    full: "assets/archive/photos/photo-golden-lawn.jpg",
    orientation: "portrait",
    size: "wide",
    timestamp: "DEC 18 · 17:30"
  },
  {
    id: "photo-light-installation",
    title: "Liberation with Will",
    caption: "Open Air Red Flare · Fiery nocturnal celebration atop the sound stage",
    location: "Waterfront Lawn",
    thumb: "assets/archive/photos/photo-light-installation-sm.jpg",
    full: "assets/archive/photos/photo-light-installation.jpg",
    orientation: "portrait",
    size: "tall",
    timestamp: "DEC 19 · 21:05"
  },
  {
    id: "photo-rain-crowd",
    title: "Warm Rain Under Lights",
    caption: "Main Stage Enclosure · Rain cascade shimmering through stage beams",
    location: "Horizon Arena",
    thumb: "assets/archive/photos/photo-rain-crowd-sm.jpg",
    full: "assets/archive/photos/photo-rain-crowd.jpg",
    orientation: "portrait",
    size: "medium",
    timestamp: "DEC 20 · 22:40"
  },
  {
    id: "backstage-sound-desk",
    title: "Front of House Engineering",
    caption: "FOH Console · Digital & analog board overlooking the starry arena",
    location: "Arena Sound Pit",
    thumb: "assets/archive/backstage/backstage-sound-desk-sm.jpg",
    full: "assets/archive/backstage/backstage-sound-desk.jpg",
    orientation: "portrait",
    size: "medium",
    timestamp: "DEC 19 · 20:10"
  },
  {
    id: "backstage-side-stage",
    title: "Performing",
    caption: "Center Stage Silhouette · Performer saluting a sea of phone lights",
    location: "Horizon Stage",
    thumb: "assets/archive/backstage/backstage-side-stage-sm.jpg",
    full: "assets/archive/backstage/backstage-side-stage.jpg",
    orientation: "portrait",
    size: "tall",
    timestamp: "DEC 20 · 21:55"
  }
];
