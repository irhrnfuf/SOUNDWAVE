/* ==========================================================================
   SOUNDWAVE 2026 — EXTERNAL JAVASCRIPT (Units II, V & VI)
   Covers: Variables, Objects/Arrays, Switch, For/While Loops, BOM/DOM & Validation
   ========================================================================== */

// --- UNIT VI: Global Variables & Data Types ---
var FESTIVAL_NAME = "SoundWave Festival 2026";
var FESTIVAL_SERVICE_FEE = 12.50;
var IS_EARLY_BIRD_ACTIVE = true;
var globalPassCounter = 100;

// --- UNIT VI: JavaScript Array of Objects ---
const FESTIVAL_ARTISTS = [
  { name: "Neon Pulse", genre: "Electronic", stage: "Horizon Arena", day: "Sunday • 10:00 PM", rating: 4.9 },
  { name: "Aurora Echoes", genre: "Rock", stage: "Horizon Arena", day: "Friday • 09:30 PM", rating: 4.8 },
  { name: "DJ Solaris", genre: "Electronic", stage: "Analog Dome", day: "Friday • 09:30 PM", rating: 4.9 },
  { name: "The Midnight Chords", genre: "Acoustic", stage: "Vinyl Lawn", day: "Friday • 06:00 PM", rating: 4.7 },
  { name: "Static Velocity", genre: "Rock", stage: "Horizon Arena", day: "Saturday • 07:00 PM", rating: 4.6 },
  { name: "Luna & The Strings", genre: "Acoustic", stage: "Vinyl Lawn", day: "Saturday • 06:00 PM", rating: 4.8 }
];

// Quick-select a Pass Tier from the Tier Cards directly into the Checkout Form
function selectPassTierFromCard(tierValue) {
  const tierSelect = document.getElementById("pass-tier");
  if (tierSelect) {
    tierSelect.value = tierValue;
    updatePassCanvas();
    const nameInput = document.getElementById("attendee-name");
    if (nameInput) nameInput.focus();
  }
}

// 1. UNIT VI: Filter Artists using Array of Objects, FOR Loop & IF/ELSE
function filterArtistsByGenre(selectedGenre) {
  const container = document.getElementById("js-artist-results");
  const countSpan = document.getElementById("js-artist-count");
  if (!container || !countSpan) return;

  let htmlCards = "";
  let matchedCount = 0;

  for (let i = 0; i < FESTIVAL_ARTISTS.length; i++) {
    const artist = FESTIVAL_ARTISTS[i];
    if (selectedGenre === "ALL" || artist.genre === selectedGenre) {
      matchedCount++;
      htmlCards +=
        '<div class="js-card">' +
          "<h4>" + artist.name + "</h4>" +
          "<p><b>" + artist.genre + "</b> &bull; " + artist.stage + "<br />" +
          artist.day + " &bull; Score: " + artist.rating + "/5</p>" +
        "</div>";
    }
  }

  container.innerHTML = htmlCards;
  countSpan.innerText = matchedCount + " of " + FESTIVAL_ARTISTS.length + " acts shown";
}

// --- Persistent Cart Storage & Retrieval ---
const CART_STORAGE_KEY = "soundwave_active_cart";

function saveActiveCart(cartData) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
  } catch (e) {
    console.warn("Could not save cart state to localStorage", e);
  }
}

function loadActiveCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function restoreCartIntoForm() {
  const cart = loadActiveCart();
  if (!cart) return;

  const tierSelect = document.getElementById("pass-tier");
  const qtyInput = document.getElementById("ticket-qty");
  const nameInput = document.getElementById("attendee-name");
  const emailInput = document.getElementById("attendee-email");
  const phoneInput = document.getElementById("attendee-phone");
  const promoInput = document.getElementById("promo-code");
  const artistInput = document.getElementById("favorite-artist");
  const notesInput = document.getElementById("special-notes");

  if (tierSelect && cart.tier) tierSelect.value = cart.tier;
  if (qtyInput && cart.quantity) qtyInput.value = cart.quantity;
  if (nameInput && cart.fullName) nameInput.value = cart.fullName;
  if (emailInput && cart.email) emailInput.value = cart.email;
  if (phoneInput && cart.phone && cart.phone !== "Not provided") phoneInput.value = cart.phone;
  if (promoInput && cart.promoCode) promoInput.value = cart.promoCode;
  if (artistInput && cart.favoriteArtist) artistInput.value = cart.favoriteArtist;
  if (notesInput && cart.specialNotes) notesInput.value = cart.specialNotes;

  if (cart.festivalDay) {
    const dayRadios = document.getElementsByName("festivalDay");
    for (let i = 0; i < dayRadios.length; i++) {
      dayRadios[i].checked = dayRadios[i].value === cart.festivalDay;
    }
  }

  if (Array.isArray(cart.addons)) {
    const addonCheckboxes = document.getElementsByName("addons");
    for (let j = 0; j < addonCheckboxes.length; j++) {
      addonCheckboxes[j].checked = cart.addons.includes(addonCheckboxes[j].value);
    }
  }
}

// 2. UNIT VI: Ticket Calculator using SWITCH, FOR Loop, getElementsByName & Operators
function calculateLivePassTotal() {
  const tierSelect = document.getElementById("pass-tier");
  const qtyInput = document.getElementById("ticket-qty");
  const promoInput = document.getElementById("promo-code");
  const totalDisplay = document.getElementById("live-price-breakdown");

  if (!tierSelect || !qtyInput || !totalDisplay) return;

  const selectedTier = tierSelect.value;
  const quantity = Math.max(1, parseInt(qtyInput.value, 10) || 1);
  const promoCode = promoInput ? promoInput.value.trim().toUpperCase() : "";

  let basePrice = 129;
  let tierPerkText = "Three-Stage General Access";

  // Unit VI: switch statement
  switch (selectedTier) {
    case "General Admission ($129)":
      basePrice = 129;
      tierPerkText = "General Lawn & Arena Access";
      break;
    case "VIP Gold Pass ($249)":
      basePrice = 249;
      tierPerkText = "VIP Viewing Terrace + Priority Lane";
      break;
    case "Backstage All-Access ($499)":
      basePrice = 499;
      tierPerkText = "Backstage Lounge + Artist Meet & Greet";
      break;
    default:
      basePrice = 129;
      tierPerkText = "Standard Festival Entry";
      break;
  }

  // Unit VI: DOM getElementsByName() for Radio Buttons
  const dayRadios = document.getElementsByName("festivalDay");
  let chosenDay = "All 3 Days";
  for (let i = 0; i < dayRadios.length; i++) {
    if (dayRadios[i].checked) {
      chosenDay = dayRadios[i].value;
      break;
    }
  }

  // Unit VI: DOM getElementsByName() for Checkboxes
  const addonCheckboxes = document.getElementsByName("addons");
  let addonsCostPerTicket = 0;
  const chosenAddons = [];
  for (let j = 0; j < addonCheckboxes.length; j++) {
    if (addonCheckboxes[j].checked) {
      chosenAddons.push(addonCheckboxes[j].value);
      if (addonCheckboxes[j].value === "Camping Spot") {
        addonsCostPerTicket += 45;
      } else if (addonCheckboxes[j].value === "Merch Bundle") {
        addonsCostPerTicket += 35;
      }
    }
  }

  const subtotal = (basePrice + addonsCostPerTicket) * quantity;

  // Unit VI: if / else if / else for Promo Discounts
  let discountRate = 0;
  let promoMessage = "";
  if (promoCode === "SOUND20") {
    discountRate = 0.20;
    promoMessage = "20% Promo Applied";
  } else if (promoCode === "VIP10") {
    discountRate = 0.10;
    promoMessage = "10% Promo Applied";
  } else if (quantity >= 5 && IS_EARLY_BIRD_ACTIVE) {
    discountRate = 0.05;
    promoMessage = "5% Group Early-Bird";
  }

  const discountAmount = subtotal * discountRate;
  const finalTotal = subtotal - discountAmount + FESTIVAL_SERVICE_FEE;

  totalDisplay.innerHTML =
    "<div style='display:flex; justify-content:space-between;'><span><b>" + selectedTier + "</b> (&times;" + quantity + ")</span><span>$" + subtotal.toFixed(2) + "</span></div>" +
    (discountAmount > 0 ? "<div style='display:flex; justify-content:space-between; color:#00e676; font-weight:700; margin-top:3px;'><span>" + promoMessage + "</span><span>-$" + discountAmount.toFixed(2) + "</span></div>" : "") +
    "<div style='display:flex; justify-content:space-between; color:#57554f; margin-top:3px;'><span>Schedule: " + chosenDay + (chosenAddons.length ? " | Addons: " + chosenAddons.join(", ") : "") + "</span><span>+$" + FESTIVAL_SERVICE_FEE.toFixed(2) + " fee</span></div>" +
    "<div style='display:flex; justify-content:space-between; border-top:1px solid #d6d3c9; margin-top:6px; padding-top:6px; font-size:1.05rem;'><b>Total Due:</b><b style='color:#161415;'>$" + finalTotal.toFixed(2) + "</b></div>";

  // Persist live cart state
  const nameInput = document.getElementById("attendee-name");
  const emailInput = document.getElementById("attendee-email");
  const phoneInput = document.getElementById("attendee-phone");
  const artistInput = document.getElementById("favorite-artist");
  const notesInput = document.getElementById("special-notes");

  saveActiveCart({
    tier: selectedTier,
    quantity,
    chosenDay,
    addons: chosenAddons,
    promoCode,
    subtotal,
    discountAmount,
    finalTotal: Number(finalTotal.toFixed(2)),
    fullName: nameInput ? nameInput.value : "",
    email: emailInput ? emailInput.value : "",
    phone: phoneInput ? phoneInput.value : "",
    favoriteArtist: artistInput ? artistInput.value : "",
    specialNotes: notesInput ? notesInput.value : ""
  });

  return {
    selectedTier,
    chosenDay,
    chosenAddons,
    quantity,
    finalTotal: Number(finalTotal.toFixed(2))
  };
}
  };
}

// 3. UNIT VI: WHILE Loop for Serial Ticket Number Generation
function generatePassCodeWithWhileLoop() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "SW26-";
  let count = 0;

  while (count < 6) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars.charAt(randomIndex);
    count++;
  }
  globalPassCounter++;
  return code + "-" + globalPassCounter;
}

// 4. UNIT VI: Browser Object Model (BOM) & DOM getElementsByTagName() Audit
function updateBomAndDomInspector() {
  const bomOut = document.getElementById("bom-inspector-output");
  const domOut = document.getElementById("dom-tagname-output");
  if (!bomOut || !domOut) return;

  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;
  const screenW = window.screen.width;
  const screenH = window.screen.height;
  const pageProtocol = window.location.protocol;
  const browserLang = window.navigator.language || "en-US";

  bomOut.innerHTML =
    "<b>Viewport:</b> " + viewportW + "&times;" + viewportH + "px &bull; " +
    "<b>Display:</b> " + screenW + "&times;" + screenH + "px &bull; " +
    "<b>Locale:</b> " + browserLang + " (" + pageProtocol + ")";

  const allSections = document.getElementsByTagName("section");
  const allTableRows = document.getElementsByTagName("tr");
  const allInputs = document.getElementsByTagName("input");

  domOut.innerText =
    "DOM Audit: " + allSections.length + " Panels | " +
    allTableRows.length + " Table Rows | " +
    allInputs.length + " Interactive Controls";
}

// 5. UNIT VI: Form Validation & Email Validation
function validateFestivalForm(event) {
  if (event) event.preventDefault();

  const nameInput = document.getElementById("attendee-name");
  const emailInput = document.getElementById("attendee-email");
  const phoneInput = document.getElementById("attendee-phone");
  const qtyInput = document.getElementById("ticket-qty");
  const feedbackBox = document.getElementById("form-validation-feedback");

  const fullName = nameInput ? nameInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim() : "";
  const phone = phoneInput ? phoneInput.value.trim() : "";
  const qty = qtyInput ? parseInt(qtyInput.value, 10) : 0;

  const errors = [];

  if (fullName.length < 3) {
    errors.push("Full name must contain at least 3 characters.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (email === "" || email.indexOf("@") === -1 || !emailRegex.test(email)) {
    errors.push("Enter a valid email address (e.g., alex@domain.com).");
  }

  const phoneRegex = /^[0-9+\-\s()]{7,18}$/;
  if (phone !== "" && !phoneRegex.test(phone)) {
    errors.push("Phone number must be 7–18 digits.");
  }

  if (isNaN(qty) || qty < 1 || qty > 10) {
    errors.push("Quantity must be between 1 and 10.");
  }

  if (errors.length > 0) {
    feedbackBox.className = "validation-box error";
    feedbackBox.innerHTML =
      "<b>Validation Error:</b><ul style='margin:4px 0 0; padding-left:18px;'><li>" +
      errors.join("</li><li>") +
      "</li></ul>";
    return { valid: false, errors };
  }

  const priceInfo = calculateLivePassTotal();
  const generatedPassCode = generatePassCodeWithWhileLoop();

  feedbackBox.className = "validation-box success";
  feedbackBox.innerHTML =
    "<b>Pass Issued: " + generatedPassCode + "</b><br />" +
    "Holder: " + fullName + " &bull; Total: <b>$" + priceInfo.finalTotal.toFixed(2) + "</b>" +
    "<div id='firebase-save-status' style='margin-top:4px;'>Syncing with Firebase SQL Connect...</div>";

  const chosenArtist = document.getElementById("favorite-artist")?.value.trim() || "Neon Pulse";
  const notes = document.getElementById("special-notes")?.value.trim() || "";

  const bookingPayload = {
    passCode: generatedPassCode,
    fullName,
    email,
    phone: phone || "Not provided",
    tier: priceInfo.selectedTier,
    festivalDay: priceInfo.chosenDay,
    addons: priceInfo.chosenAddons,
    quantity: priceInfo.quantity,
    totalPrice: priceInfo.finalTotal,
    favoriteArtist: chosenArtist,
    specialNotes: notes
  };

  // Open Confirmation Modal Screen
  showOrderConfirmationModal(bookingPayload);

  window.dispatchEvent(new CustomEvent("soundwave:passValidated", { detail: bookingPayload }));
  return { valid: true, bookingPayload };
}

// Confirmation Screen Modal Controller
function showOrderConfirmationModal(order) {
  const modal = document.getElementById("order-confirmation-modal");
  if (!modal) return;

  const codeEl = document.getElementById("confirm-code");
  const nameEl = document.getElementById("confirm-name");
  const emailEl = document.getElementById("confirm-email");
  const tierQtyEl = document.getElementById("confirm-tier-qty");
  const addonsEl = document.getElementById("confirm-addons");
  const artistEl = document.getElementById("confirm-artist");
  const totalEl = document.getElementById("confirm-total");

  if (codeEl) codeEl.innerText = order.passCode;
  if (nameEl) nameEl.innerText = order.fullName;
  if (emailEl) emailEl.innerText = order.email;
  if (tierQtyEl) tierQtyEl.innerText = order.tier + " (x" + order.quantity + ")";
  if (addonsEl) addonsEl.innerText = order.festivalDay + (order.addons && order.addons.length ? " • " + order.addons.join(", ") : "");
  if (artistEl) artistEl.innerText = order.favoriteArtist;
  if (totalEl) totalEl.innerText = "$" + order.totalPrice.toFixed(2);

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeOrderConfirmationModal() {
  const modal = document.getElementById("order-confirmation-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// 6. UNIT II: HTML5 <canvas> Live Digital Wallet Ticket Stub
function updatePassCanvas() {
  const canvas = document.getElementById("vip-pass-canvas");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");

  const name = document.getElementById("attendee-name").value.trim() || "ENTER ATTENDEE NAME";
  const tier = document.getElementById("pass-tier").value;
  const date = document.getElementById("arrival-date").value || "2026-12-18";
  const accentColor = document.getElementById("wristband-color").value || "#e03e1a";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dark Wallet Pass Card Base
  ctx.fillStyle = "#111110";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Top Accent Bar
  ctx.fillStyle = accentColor;
  ctx.fillRect(0, 0, canvas.width, 8);

  // Perforated Tear Line on Right
  ctx.save();
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "#3d3c38";
  ctx.beginPath();
  ctx.moveTo(295, 10);
  ctx.lineTo(295, canvas.height - 10);
  ctx.stroke();
  ctx.restore();

  // Pass Header
  ctx.fillStyle = accentColor;
  ctx.font = "bold 10px sans-serif";
  ctx.fillText("SOUNDWAVE 2026  •  DIGITAL WALLET PASS", 18, 30);

  // Holder Name
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 18px sans-serif";
  ctx.fillText(name.toUpperCase().slice(0, 20), 18, 60);

  // Tier & Date
  ctx.fillStyle = "#a8a49b";
  ctx.font = "12px sans-serif";
  ctx.fillText(tier, 18, 88);
  ctx.fillText("CHECK-IN: " + date + "  •  GATE A", 18, 110);

  // Barcode on Right Stub
  ctx.fillStyle = "#f4f3ef";
  for (let x = 312; x < 374; x += 5) {
    const barW = (x % 10 === 0) ? 3 : 1.5;
    ctx.fillRect(x, 24, barW, 74);
  }
  ctx.font = "10px monospace";
  ctx.fillText("SW26-PASS", 316, 114);

  calculateLivePassTotal();
}

// 7. UNIT II: HTML5 Drag & Drop + Web Storage
const STORAGE_KEY = "soundwave_saved_lineup";

function loadSavedLineup() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  renderLineupList(saved);
}

function renderLineupList(items) {
  const ul = document.getElementById("saved-lineup-list");
  if (!ul) return;
  if (items.length === 0) {
    ul.innerHTML = "<li>Drag artists from the left column and drop them here to build your personal schedule.</li>";
    return;
  }
  ul.innerHTML = items.map(item => "<li><b>" + item + "</b></li>").join("");
}

function handleDragStart(event) {
  const artist = event.target.getAttribute("data-artist");
  event.dataTransfer.setData("text/plain", artist);
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();
  const artist = event.dataTransfer.getData("text/plain");
  if (!artist) return;
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (!saved.includes(artist)) {
    saved.push(artist);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }
  renderLineupList(saved);
}

function clearSavedLineup() {
  localStorage.removeItem(STORAGE_KEY);
  renderLineupList([]);
}

// 8. UNIT II: Geolocation, Web Worker & SSE Ticker
function findMyFestivalDistance() {
  const output = document.getElementById("geolocation-output");
  if (!navigator.geolocation) {
    output.innerHTML = "Geolocation is not supported by your browser.";
    return;
  }
  output.innerHTML = "Locating browser coordinates...";
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const lat = position.coords.latitude.toFixed(4);
      const lon = position.coords.longitude.toFixed(4);
      output.innerHTML = "<b>Verified Location:</b> " + lat + "&deg; N, " + lon + "&deg; W";
    },
    function (error) {
      output.innerHTML = "Default Venue: 25.7751&deg; N, 80.1862&deg; W (" + error.message + ")";
    }
  );
}

function runAcousticWorker() {
  const output = document.getElementById("worker-output");
  if (typeof Worker === "undefined") {
    output.innerHTML = "Web Workers are not supported in this browser.";
    return;
  }
  const worker = new Worker("./src/festival-worker.js");
  output.innerHTML = "Running acoustic model...";
  worker.postMessage({ attendees: 15000, stages: 3 });
  worker.onmessage = function (e) {
    const res = e.data;
    output.innerHTML =
      "<b>" + res.decibelEstimate + " dB Peak</b> &bull; " +
      res.recommendedWattage.toLocaleString() + "W (" + res.timestamp + ")";
    worker.terminate();
  };
}

function initStageTicker() {
  const ticker = document.getElementById("sse-ticker");
  if (!ticker) return;
  const updates = [
    "Horizon Arena: Aurora Echoes soundcheck complete",
    "Analog Dome: Late-night modular synth set added",
    "Box Office: Weekend passes are 78% allocated",
    "Vinyl Lawn: Gates open daily at 4:00 PM"
  ];
  let idx = 0;
  if (typeof EventSource !== "undefined") {
    ticker.innerHTML = updates[0];
    setInterval(function () {
      idx = (idx + 1) % updates.length;
      ticker.innerHTML = updates[idx];
    }, 4000);
  }
}

function previewGalleryStage(stageTitle, description) {
  const banner = document.getElementById("gallery-event-status");
  if (banner) {
    banner.innerHTML = "<b>" + stageTitle + ":</b> " + description;
  }
}

function resetGalleryStage() {
  const banner = document.getElementById("gallery-event-status");
  if (banner) {
    banner.innerHTML = "Hover over any stage photo to inspect specifications";
  }
}

window.addEventListener("DOMContentLoaded", function () {
  // Restore persistent cart if available
  restoreCartIntoForm();

  // Pre-select ticket tier if arriving from one of the 4 dedicated Stage Sightline pages (?tier=...)
  const params = new URLSearchParams(window.location.search);
  const preselectedTier = params.get("tier");
  if (preselectedTier) {
    selectPassTierFromCard(preselectedTier);
  }
  const tabParam = params.get("tab");
  if (tabParam) {
    switchFestivalTab(tabParam);
  }

  updatePassCanvas();
  loadSavedLineup();
  initStageTicker();
  filterArtistsByGenre("ALL");
  updateBomAndDomInspector();
  calculateLivePassTotal();

  const form = document.getElementById("pass-registration-form");
  if (form) {
    form.addEventListener("submit", validateFestivalForm);
  }
  window.addEventListener("resize", updateBomAndDomInspector);
});

// Switch active workspace tab so the UI stays clean and de-cluttered
function switchFestivalTab(panelId, tabBtnElement) {
  const panels = document.querySelectorAll(".ui-panel");
  for (let i = 0; i < panels.length; i++) {
    panels[i].classList.remove("active-panel");
  }
  const target = document.getElementById(panelId);
  if (target) {
    target.classList.add("active-panel");
  }

  const buttons = document.querySelectorAll(".workspace-tab-btn");
  for (let j = 0; j < buttons.length; j++) {
    buttons[j].classList.remove("active-tab");
  }
  if (tabBtnElement) {
    tabBtnElement.classList.add("active-tab");
  } else {
    const matchingBtn = document.querySelector('.workspace-tab-btn[data-target="' + panelId + '"]');
    if (matchingBtn) matchingBtn.classList.add("active-tab");
  }
}

// --- Split Reel Switcher (Official 4K vs Fan Cam VHS) ---
function switchReelMode(mode) {
  const video = document.getElementById("festival-video");
  const officialBtn = document.getElementById("btn-mode-official");
  const fanBtn = document.getElementById("btn-mode-fan");
  const recText = document.getElementById("hud-rec-text");
  const channelTag = document.getElementById("hud-channel-tag");
  const timecode = document.getElementById("hud-timecode");
  const desc = document.getElementById("reel-description");

  if (!video) return;

  const isOfficial = mode === "official";

  if (officialBtn && fanBtn) {
    officialBtn.classList.toggle("active", isOfficial);
    fanBtn.classList.toggle("active", !isOfficial);
  }

  if (isOfficial) {
    video.src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
    video.poster = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80";
    if (recText) recText.textContent = "REC [4K 60FPS]";
    if (channelTag) channelTag.textContent = "CH 01 • SOUNDSTAGE A";
    if (timecode) timecode.textContent = "SP 00:03:42";
    if (desc) desc.innerHTML = "✨ <b>Official Cinematic:</b> Multi-camera 4K stage production, pyro drops, and soundboard audio.";
  } else {
    // Fan Cam / Artisan Highlights Reel
    video.src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
    video.poster = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=80";
    if (recText) recText.textContent = "REC [VHS HI-8]";
    if (channelTag) channelTag.textContent = "CH 04 • CROWD & LAWN";
    if (timecode) timecode.textContent = "LP 01:14:09";
    if (desc) desc.innerHTML = "📼 <b>Fan Cam &amp; Community Reel:</b> Raw crowd perspectives, lawn jam sessions, night lasers, and artisan bazaars.";
  }

  video.load();
}

