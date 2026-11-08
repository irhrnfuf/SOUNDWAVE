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
    title: "Edition 05 Risograph Poster",
    year: "2018",
    edition: "ED. 05",
    label: "ARCHIVE № SW-P-005 · FIVE-YEAR CELEBRATION",
    thumb: "assets/archive/posters/poster-ed05-2018-sm.jpg",
    full: "assets/archive/posters/poster-ed05-2018.jpg",
    aspect: "2/3",
    description: "Two-colour fluorescent pink and deep ocean slate risograph print capturing Biscayne Bay palms and rolling dusk waves.",
    curatorNotes: "Screen registration intentionally offset by 1.5mm to give the signature analog pulse vibration.",
    isDraggable: true
  },

  // --- FLYERS & PRINTED EPHEMERA ---
  {
    id: "flyer-zine",
    type: "flyer",
    title: "DIY Underground Zine Flyer",
    year: "2016",
    edition: "ED. 03",
    label: "ARCHIVE № SW-F-003 · XEROX EPHEMERA",
    thumb: "assets/archive/flyers/flyer-zine-ed03-sm.jpg",
    full: "assets/archive/flyers/flyer-zine-ed03.jpg",
    aspect: "3/4",
    description: "Black-and-white photocopied street flyer promoting the early soundsystem culture in the grove.",
    curatorNotes: "Paper clipped with original rusted steel pin and tape residue.",
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

  // --- TICKETS & ACCESS PASSES (Rendered via HTML/CSS components with live text) ---
  {
    id: "ticket-ga",
    type: "ticket-html",
    title: "General Admission Stub",
    year: "2015",
    edition: "ED. 02",
    label: "ARCHIVE № SW-T-002 · GATE ADMISSION",
    component: "ticket-ga",
    description: "Perforated two-part paper admission ticket with vintage red security border and authentic coffee ring stain.",
    curatorNotes: "Tear-off stub on right side kept at Gate B turnstile.",
    isDraggable: true
  },
  {
    id: "ticket-vip",
    type: "ticket-html",
    title: "Gold Foil VIP Cabana Pass",
    year: "2019",
    edition: "ED. 06",
    label: "ARCHIVE № SW-T-006 · SKYDECK ACCESS",
    component: "ticket-vip",
    description: "Heavy 450gsm charcoal card with scuffed warm gold foil stamping and embossed wave acoustic lines.",
    curatorNotes: "Includes metallic security seal and individual serialization #0612.",
    isDraggable: true
  },
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
  {
    id: "band-woven",
    type: "wristband-html",
    title: "Jacquard Woven Wristband",
    year: "2023",
    edition: "ED. 10",
    label: "ARCHIVE № SW-W-010 · TENTH ANNIVERSARY",
    component: "band-woven",
    description: "Dense cloth jacquard weave with frayed ends and pressed aluminum tamper-evident bead.",
    curatorNotes: "First festival edition to introduce custom threaded RFID tokens.",
    isDraggable: false
  },
  {
    id: "band-rfid",
    type: "wristband-html",
    title: "Coral Silicone RFID Band",
    year: "2024",
    edition: "ED. 11",
    label: "ARCHIVE № SW-W-011 · CONTACTLESS ACCESS",
    component: "band-rfid",
    description: "Waterproof debossed silicone wristband with embedded contactless microchip disc.",
    curatorNotes: "Used for instant tap entry and cashless hydration stations.",
    isDraggable: false
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
