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

  // --- AUTHENTIC PHYSICAL TICKETS (Extracted from historical festival pass ledger) ---
  {
    id: "ticket-pink",
    type: "ticket-image",
    title: "Edition 02 Vintage Pink Pass",
    year: "2015",
    edition: "ED. 02",
    label: "ARCHIVE № SW-T-002 · GENERAL ADMISSION",
    thumb: "assets/archive/tickets/ticket-01-pink-sm.jpg",
    full: "assets/archive/tickets/ticket-01-pink.jpg",
    description: "Original two-part pink paper admission ticket with perforated coupon and vertical serial ledger.",
    isDraggable: true
  },
  {
    id: "ticket-magenta",
    type: "ticket-image",
    title: "Stadium Puerta 9 Pass",
    year: "2017",
    edition: "ED. 04",
    label: "ARCHIVE № SW-T-004 · ARENA ENTRY",
    thumb: "assets/archive/tickets/ticket-02-magenta-sm.jpg",
    full: "assets/archive/tickets/ticket-02-magenta.jpg",
    description: "Vintage magenta admission pass with decorative stamp border and official admission validation stamp.",
    isDraggable: true
  },
  {
    id: "ticket-orange",
    type: "ticket-image",
    title: "Arena In Concert Ticket",
    year: "2018",
    edition: "ED. 05",
    label: "ARCHIVE № SW-T-005 · TIER 1 RESERVED",
    thumb: "assets/archive/tickets/ticket-03-orange-sm.jpg",
    full: "assets/archive/tickets/ticket-03-orange.jpg",
    description: "Bold two-tone orange and cream festival pass with perforated seating block and admission tax record.",
    isDraggable: true
  },
  {
    id: "ticket-green",
    type: "ticket-image",
    title: "Coliseum Advance Pass",
    year: "2019",
    edition: "ED. 06",
    label: "ARCHIVE № SW-T-006 · ADVANCE TIER",
    thumb: "assets/archive/tickets/ticket-04-green-sm.jpg",
    full: "assets/archive/tickets/ticket-04-green.jpg",
    description: "Classic sage green cardstock admission with printed price stamp, Globe Ticket seal, and twin date registers.",
    isDraggable: true
  },
  {
    id: "ticket-blue",
    type: "ticket-image",
    title: "Convention Center Arena Pass",
    year: "2020",
    edition: "ED. 07",
    label: "ARCHIVE № SW-T-007 · FLOOR ACCESS",
    thumb: "assets/archive/tickets/ticket-05-blue-sm.jpg",
    full: "assets/archive/tickets/ticket-05-blue.jpg",
    description: "Cyan blue pass with iconic star emblems, date block stamp, and full stub coupon.",
    isDraggable: true
  },
  {
    id: "ticket-yellow",
    type: "ticket-image",
    title: "Jackson Coliseum General Admission",
    year: "2021",
    edition: "ED. 08",
    label: "ARCHIVE № SW-T-008 · ADVANCE PASS",
    thumb: "assets/archive/tickets/ticket-06-yellow-sm.jpg",
    full: "assets/archive/tickets/ticket-06-yellow.jpg",
    description: "Yellow two-part ticket with bold numerals, admission serial bar, and vintage promoter masthead.",
    isDraggable: true
  },
  {
    id: "ticket-red-cobo",
    type: "ticket-image",
    title: "Cobo Arena Red Foil Pass",
    year: "2022",
    edition: "ED. 09",
    label: "ARCHIVE № SW-T-009 · SKYDECK ACCESS",
    thumb: "assets/archive/tickets/ticket-09-red-cobo-sm.jpg",
    full: "assets/archive/tickets/ticket-09-red-cobo.jpg",
    description: "Vibrant crimson ticket with punched circular holes, clean ticket tier columns, and perforated audit stub.",
    isDraggable: true
  },
  {
    id: "ticket-zeppelin",
    type: "ticket-image",
    title: "Kingdome Special Evening Pass",
    year: "2023",
    edition: "ED. 10",
    label: "ARCHIVE № SW-T-010 · TENTH ANNIVERSARY",
    thumb: "assets/archive/tickets/ticket-11-zeppelin-sm.jpg",
    full: "assets/archive/tickets/ticket-11-zeppelin.jpg",
    description: "Aged parchment admission stub with red wireframe logotype overlay and serial ledger #027447.",
    isDraggable: true
  },
  {
    id: "ticket-fleetwood",
    type: "ticket-image",
    title: "Rupp Arena Evening Pass",
    year: "2024",
    edition: "ED. 11",
    label: "ARCHIVE № SW-T-011 · FESTIVAL ACCESS",
    thumb: "assets/archive/tickets/ticket-12-fleetwood-sm.jpg",
    full: "assets/archive/tickets/ticket-12-fleetwood.jpg",
    description: "Salmon-tinted festival pass with magenta price stripe, promoter stamp, and perforated seat stub.",
    isDraggable: true
  },
  {
    id: "ticket-metallica",
    type: "ticket-image",
    title: "Messehalle Heavy Access Pass",
    year: "2025",
    edition: "ED. 12",
    label: "ARCHIVE № SW-T-012 · STAGE BARRIER PASS",
    thumb: "assets/archive/tickets/ticket-10-metallica-sm.jpg",
    full: "assets/archive/tickets/ticket-10-metallica.jpg",
    description: "Black and gold metallic foil pass with bold angular festival logotype and side admission stub.",
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
