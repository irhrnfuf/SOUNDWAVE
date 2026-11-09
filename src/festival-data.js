/* ==========================================================================
   SOUNDWAVE 2026 — CANONICAL FESTIVAL DATA SOURCE
   Single source of truth for dates, stages, artists, passes, and schedule
   ========================================================================== */

var SOUNDWAVE_DATA = {
  festival: {
    name: "SoundWave Music & Arts Festival 2026",
    shortName: "SoundWave 2026",
    edition: "12th Annual Edition",
    dates: "December 18–20, 2026",
    datesIso: { start: "2026-12-18", end: "2026-12-20" },
    venue: "Waterfront Park, Miami, FL",
    coordinates: { lat: 25.7751, lon: -80.1862 },
    totalStages: 4,
    gatesOpen: "4:00 PM EST Daily",
    serviceFee: 12.50
  },

  stages: [
    {
      id: "stage-horizon",
      name: "Horizon Arena",
      capacity: "48,500",
      capNum: 48500,
      established: 2014,
      role: "Mainstage & Monumental Headliners",
      url: "./stage-horizon.html",
      badge: "MAINSTAGE"
    },
    {
      id: "stage-analog",
      name: "Analog Dome",
      capacity: "22,000",
      capNum: 22000,
      established: 2016,
      role: "360° Immersive Geodesic Club & 303 Techno",
      url: "./stage-analog.html",
      badge: "IMMERSIVE"
    },
    {
      id: "stage-vinyl",
      name: "Vinyl Lawn",
      capacity: "14,500",
      capNum: 14500,
      established: 2018,
      role: "Acoustic Haven & Lathe-Cut Vinyl Grooves",
      url: "./stage-vinyl.html",
      badge: "ACOUSTIC"
    },
    {
      id: "stage-vip",
      name: "VIP Cabanas & SkyDeck",
      capacity: "3,200",
      capNum: 3200,
      established: 2018,
      role: "Elevated Hospitality & Midnight Secret Sets",
      url: "./stage-vip.html",
      badge: "HOSPITALITY"
    }
  ],

  passes: [
    {
      id: "ga",
      tierName: "3-Day GA",
      checkoutValue: "General Admission ($129)",
      price: 129,
      formattedPrice: "$129",
      stageAccess: "Full access to Horizon Arena, Analog Dome, Vinyl Lawn & VIP Cabanas promenade.",
      stagesIncluded: 4,
      perks: [
        "Full access across all 4 stages & soundscapes",
        "Free hydration stations & water refill bars",
        "Panoramic waterfront amphitheater lawn viewing",
        "Direct-to-gate RFID fabric wristband"
      ]
    },
    {
      id: "vip",
      tierName: "3-Day VIP",
      checkoutValue: "VIP Gold Pass ($249)",
      price: 249,
      formattedPrice: "$249",
      stageAccess: "Elevated front-row viewing decks, express VIP entry lanes & shaded lounge bar.",
      stagesIncluded: 4,
      perks: [
        "Dedicated front-wave viewing pits at all 4 stages",
        "Full access to VIP Cabanas & SkyDeck terrace",
        "Exclusive craft cocktails, sommelier tasting & private bars",
        "Luxury air-conditioned private restrooms & express entry"
      ]
    },
    {
      id: "platinum",
      tierName: "3-Day Platinum",
      checkoutValue: "Backstage All-Access ($499)",
      price: 499,
      formattedPrice: "$499",
      stageAccess: "Side-stage viewing wings, private golf-cart shuttles, complimentary all-day dining & artist lounge.",
      stagesIncluded: 4,
      perks: [
        "Side-stage artist wing viewing platforms across all 4 stages",
        "Private golf-cart shuttles between stages & camping village",
        "All-inclusive gourmet chef dining & premium open bar",
        "Access to artist hospitality compound & private cabana suites"
      ]
    }
  ],

  performances: [
    // Friday Dec 18
    { id: "fri-01", day: "FRI", dayName: "Friday", time: "06:00 PM", startMin: 360, endMin: 450, stage: "Horizon Arena", artist: "The Velvet Suns", genre: "Rock", duration: "90m" },
    { id: "fri-02", day: "FRI", dayName: "Friday", time: "06:00 PM", startMin: 360, endMin: 450, stage: "Analog Dome", artist: "Bassline Syndicate", genre: "Electronic", duration: "90m" },
    { id: "fri-03", day: "FRI", dayName: "Friday", time: "06:00 PM", startMin: 360, endMin: 450, stage: "Vinyl Lawn", artist: "The Midnight Chords", genre: "Acoustic", duration: "90m" },
    { id: "fri-04", day: "FRI", dayName: "Friday", time: "09:30 PM", startMin: 570, endMin: 675, stage: "Horizon Arena", artist: "Aurora Echoes", genre: "Rock", duration: "105m", headliner: true },
    { id: "fri-05", day: "FRI", dayName: "Friday", time: "09:30 PM", startMin: 570, endMin: 675, stage: "Analog Dome", artist: "DJ Solaris", genre: "Electronic", duration: "105m" },
    { id: "fri-06", day: "FRI", dayName: "Friday", time: "09:30 PM", startMin: 570, endMin: 660, stage: "Vinyl Lawn", artist: "Evening String Quartet", genre: "Acoustic", duration: "90m" },

    // Saturday Dec 19
    { id: "sat-01", day: "SAT", dayName: "Saturday", time: "06:00 PM", startMin: 360, endMin: 435, stage: "Vinyl Lawn", artist: "Luna & The Strings", genre: "Acoustic", duration: "75m" },
    { id: "sat-02", day: "SAT", dayName: "Saturday", time: "07:00 PM", startMin: 420, endMin: 525, stage: "Horizon Arena", artist: "Static Velocity", genre: "Rock", duration: "105m" },
    { id: "sat-03", day: "SAT", dayName: "Saturday", time: "07:00 PM", startMin: 420, endMin: 510, stage: "Analog Dome", artist: "Modular Ensemble", genre: "Electronic", duration: "90m" },
    { id: "sat-04", day: "SAT", dayName: "Saturday", time: "10:30 PM", startMin: 630, endMin: 735, stage: "Horizon Arena", artist: "Glass Harbor", genre: "Rock", duration: "105m" },
    { id: "sat-05", day: "SAT", dayName: "Saturday", time: "10:30 PM", startMin: 630, endMin: 750, stage: "Analog Dome", artist: "Acid Cathedral (Live 303)", genre: "Electronic", duration: "120m" },

    // Sunday Dec 20
    { id: "sun-01", day: "SUN", dayName: "Sunday", time: "07:30 PM", startMin: 450, endMin: 540, stage: "Vinyl Lawn", artist: "The Sunbirds", genre: "Acoustic", duration: "90m" },
    { id: "sun-02", day: "SUN", dayName: "Sunday", time: "10:00 PM", startMin: 600, endMin: 720, stage: "Vinyl Lawn", artist: "The Midnight Chords Jam", genre: "Acoustic", duration: "120m" },
    { id: "sun-03", day: "SUN", dayName: "Sunday", time: "10:00 PM", startMin: 600, endMin: 720, stage: "Horizon Arena", artist: "Neon Pulse (Closing)", genre: "Electronic", duration: "120m", headliner: true },
    { id: "sun-04", day: "SUN", dayName: "Sunday", time: "10:00 PM", startMin: 600, endMin: 720, stage: "Analog Dome", artist: "DJ Solaris 360 Finale", genre: "Electronic", duration: "120m" },
    { id: "sun-05", day: "SUN", dayName: "Sunday", time: "10:00 PM", startMin: 600, endMin: 720, stage: "VIP Cabanas & SkyDeck", artist: "All-Star Backstage Finale", genre: "Special", duration: "120m" }
  ]
};

if (typeof window !== "undefined") {
  window.SOUNDWAVE_DATA = SOUNDWAVE_DATA;
}
if (typeof globalThis !== "undefined") {
  globalThis.SOUNDWAVE_DATA = SOUNDWAVE_DATA;
}
