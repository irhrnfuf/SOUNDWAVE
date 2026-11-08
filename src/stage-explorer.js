/* ==========================================================================
   SOUNDWAVE 2026 — INTERACTIVE STAGE MAP & TICKET-HOLDER POSITION EXPLORER
   Shows exact standing/viewing zones on the stage layout based on Ticket Tier
   ========================================================================== */

const STAGE_TIER_CONFIG = {
  GA: {
    name: "3-Day GA Wristband ($129)",
    checkoutValue: "General Admission ($129)",
    price: "$129",
    badgeColor: "#00e5ff",
    distance: "35m – 95m from Stage Edge",
    sightline: "Full Panoramic Stage & Giant 8K LED Screen View",
    acoustics: "96 dB Balanced Line-Array Coverage",
    perks: [
      "Open-air festival lawn & main crowd floor access",
      "Free hydration stations, food truck alleys & merch booths",
      "Direct access to shade sails and misting towers"
    ],
    pinX: 280,
    pinY: 275,
    zoneId: "zone-ga"
  },
  VIP: {
    name: "★ 3-Day VIP Gold Pass ($249)",
    checkoutValue: "VIP Gold Pass ($249)",
    price: "$249",
    badgeColor: "#ff3366",
    distance: "12m – 30m Front-Wave Viewing Deck",
    sightline: "Elevated Front-Right & Pit Sightline (Unobstructed)",
    acoustics: "101 dB Sweet-Spot Front-of-House Mix",
    perks: [
      "Dedicated Front-Row VIP Viewing Pit & Elevated Wooden Deck",
      "Private air-conditioned lounge, craft bar & luxury restrooms",
      "Fast-track VIP express gate entry lane"
    ],
    pinX: 280,
    pinY: 160,
    zoneId: "zone-vip"
  },
  PLATINUM: {
    name: "3-Day Platinum Backstage ($499)",
    checkoutValue: "Backstage All-Access ($499)",
    price: "$499",
    badgeColor: "#00e676",
    distance: "2m – 10m On-Stage Side Wing & Soundboard",
    sightline: "Side-Stage Artist Wing + Front-Row Pit + Soundboard",
    acoustics: "Studio-Grade Direct Stage Monitor & FOH Feed",
    perks: [
      "Side-stage viewing platform right beside the performing artists",
      "Backstage artist hospitality compound & complimentary dining",
      "Private golf-cart shuttle between all 4 festival stages"
    ],
    pinX: 77,
    pinY: 48,
    zoneId: "zone-platinum"
  }
};

function selectStageViewingTier(tierKey) {
  const cfg = STAGE_TIER_CONFIG[tierKey] || STAGE_TIER_CONFIG.VIP;

  // 1. Update Active Button States
  const buttons = document.querySelectorAll(".tier-zone-btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active-zone-btn");
    if (buttons[i].getAttribute("data-tier") === tierKey) {
      buttons[i].classList.add("active-zone-btn");
    }
  }

  // 2. Highlight SVG Map Zone & Move "YOU ARE HERE" Marker Pin
  const allZones = document.querySelectorAll(".svg-map-zone");
  for (let j = 0; j < allZones.length; j++) {
    allZones[j].setAttribute("stroke-width", "2.5");
    allZones[j].setAttribute("opacity", "0.45");
  }

  const activeZone = document.getElementById(cfg.zoneId);
  if (activeZone) {
    activeZone.setAttribute("stroke-width", "5");
    activeZone.setAttribute("opacity", "1");
  }

  const userPin = document.getElementById("svg-user-pin");
  if (userPin) {
    userPin.setAttribute("transform", "translate(" + cfg.pinX + ", " + cfg.pinY + ")");
  }

  // 3. Update Live Sightline & Position Breakdown Card
  const titleEl = document.getElementById("zone-detail-title");
  const distEl = document.getElementById("zone-detail-distance");
  const sightEl = document.getElementById("zone-detail-sightline");
  const soundEl = document.getElementById("zone-detail-acoustics");
  const perksEl = document.getElementById("zone-detail-perks");
  const bookLink = document.getElementById("zone-book-cta");

  if (titleEl) titleEl.innerText = cfg.name;
  if (distEl) distEl.innerText = cfg.distance;
  if (sightEl) sightEl.innerText = cfg.sightline;
  if (soundEl) soundEl.innerText = cfg.acoustics;
  if (perksEl) {
    perksEl.innerHTML = cfg.perks.map(p => "<li>" + p + "</li>").join("");
  }
  if (bookLink) {
    bookLink.href = "./index.html?tier=" + encodeURIComponent(cfg.checkoutValue) + "#book-pass";
    bookLink.innerText = "Lock In " + cfg.name + " at Checkout →";
  }
}

window.addEventListener("DOMContentLoaded", function () {
  selectStageViewingTier("VIP");
});
