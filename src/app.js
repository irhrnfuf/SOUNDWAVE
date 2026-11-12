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
  let tierPerkText = "Four-Stage General Access";

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
    "<b>Display:</b> " + screenW + "&times;" + screenH + "px<br />" +
    "<b>Locale:</b> " + browserLang + " &bull; <b>Protocol:</b> " + pageProtocol.replace(":", "");

  const allSections = document.getElementsByTagName("section");
  const allTableRows = document.getElementsByTagName("tr");
  const allButtons = document.getElementsByTagName("button");
  const allLinks = document.getElementsByTagName("a");
  const allInputs = document.getElementsByTagName("input");
  const interactiveTotal = allButtons.length + allLinks.length + allInputs.length;

  domOut.innerText =
    "DOM Audit: " + allSections.length + " Panels | " +
    allTableRows.length + " Table Rows | " +
    interactiveTotal + " Interactive Controls";
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
  renderDirectOrdersTable();
  const generatedPassCode = generatePassCodeWithWhileLoop();

  feedbackBox.className = "validation-box success";
  feedbackBox.innerHTML =
    "<b>Pass Reserved: " + generatedPassCode + "</b> &bull; Total: <b>$" + priceInfo.finalTotal.toFixed(2) + "</b><br />" +
    "Holder: <b>" + fullName + "</b> (" + priceInfo.selectedTier + ") &bull; Status: Confirmed ?";

  // Immediately store in local orders ledger
  try {
    const ORDERS_KEY = "soundwave_firebase_passes_mirror";
    const existingRaw = localStorage.getItem(ORDERS_KEY);
    let ordersList = [];
    if (existingRaw) {
      try { ordersList = JSON.parse(existingRaw); } catch (e) { ordersList = []; }
    }
    const newOrderEntry = {
      id: "pass-" + Date.now(),
      passCode: generatedPassCode,
      attendeeName: fullName,
      email: email,
      passTier: priceInfo.selectedTier,
      festivalDay: priceInfo.chosenDay,
      quantity: priceInfo.quantity,
      totalPrice: priceInfo.finalTotal,
      favoriteArtist: document.getElementById("favorite-artist")?.value.trim() || "Neon Pulse",
      createdAt: new Date().toISOString()
    };
    ordersList.unshift(newOrderEntry);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(ordersList));
  } catch (err) {
    console.warn("Could not save to local orders ledger:", err);
  }

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

  const nameEl = document.getElementById("attendee-name");
  const tierEl = document.getElementById("pass-tier");
  const dateEl = document.getElementById("arrival-date");
  const colorEl = document.getElementById("wristband-color");
  const qtyEl = document.getElementById("ticket-qty");

  const name = (nameEl && nameEl.value.trim()) ? nameEl.value.trim() : "JOHAN SANJU";
  const tier = (tierEl && tierEl.value) ? tierEl.value : "VIP Gold Pass ($249)";
  const date = (dateEl && dateEl.value) ? dateEl.value : "2026-12-18";
  const accentColor = (colorEl && colorEl.value) ? colorEl.value : "#ffe600";
  const qty = (qtyEl && parseInt(qtyEl.value, 10)) ? parseInt(qtyEl.value, 10) : 1;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Modern Neo-Brutalist Pass Base with Subtle Radial Gradient
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, "#1c1a1b");
  grad.addColorStop(1, "#111011");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Top Neon Accent Strip
  ctx.fillStyle = accentColor;
  ctx.fillRect(0, 0, canvas.width, 8);

  // Left Tag Pill
  ctx.fillStyle = "#ff3366";
  ctx.fillRect(16, 16, 6, 22);

  // Pass Brand Header
  ctx.fillStyle = accentColor;
  ctx.font = "bold 11px 'Space Grotesk', sans-serif";
  ctx.fillText("SOUNDWAVE 2026 FESTIVAL PASS", 28, 25);

  ctx.fillStyle = "#888884";
  ctx.font = "9px 'Space Grotesk', sans-serif";
  ctx.fillText("DEC 18-20 - WATERFRONT PARK MIAMI", 28, 36);

  // Attendee Name
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 17px 'Space Grotesk', sans-serif";
  const displayName = name.toUpperCase().slice(0, 22);
  ctx.fillText(displayName, 18, 64);

  // Tier Badge
  ctx.fillStyle = "#ffe600";
  ctx.font = "bold 12px 'Space Grotesk', sans-serif";
  ctx.fillText(tier + (qty > 1 ? "  (x" + qty + ")" : ""), 18, 86);

  // Date and Gate info
  ctx.fillStyle = "#bbbbbb";
  ctx.font = "10px sans-serif";
  ctx.fillText("CHECK-IN: " + date + "  -  GATE A EXPRESS ENTRY", 18, 108);

  // Perforated Tear Line on Right
  ctx.save();
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "#444444";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(290, 10);
  ctx.lineTo(290, canvas.height - 10);
  ctx.stroke();
  ctx.restore();

  // Barcode Lines on Right Stub
  ctx.fillStyle = "#ffffff";
  for (let x = 305; x < 375; x += 4) {
    const barW = (x % 8 === 0) ? 2.5 : 1.2;
    ctx.fillRect(x, 22, barW, 70);
  }

  // Stub Serial Code
  ctx.fillStyle = accentColor;
  ctx.font = "bold 9px monospace";
  ctx.fillText("SW26-AUTH", 310, 106);

  calculateLivePassTotal();
  renderDirectOrdersTable();
}

// 7. UNIT II: Drag & Drop Personal Weekend Schedule Builder
const SCHEDULE_STORAGE_KEY = "soundwave_personal_schedule_2026";
let activeScheduleItems = [];

// Performance interval lookup table (Day + Time -> start minute & duration)
const PERFORMANCE_TIME_SLOTS = {
  // Friday Dec 18 (Gates 4:00 PM = 240m)
  "Fri 06:00 PM": { day: "FRI", startMin: 360, endMin: 450, label: "6:00 PM – 7:30 PM (90m)" },
  "Fri 09:30 PM": { day: "FRI", startMin: 570, endMin: 675, label: "9:30 PM – 11:15 PM (105m)" },

  // Saturday Dec 19
  "Sat 06:00 PM": { day: "SAT", startMin: 360, endMin: 435, label: "6:00 PM – 7:15 PM (75m)" },
  "Sat 07:00 PM": { day: "SAT", startMin: 420, endMin: 525, label: "7:00 PM – 8:45 PM (105m)" },
  "Sat 10:30 PM": { day: "SAT", startMin: 630, endMin: 750, label: "10:30 PM – 12:30 AM (120m)" },

  // Sunday Dec 20
  "Sun 07:30 PM": { day: "SUN", startMin: 450, endMin: 540, label: "7:30 PM – 9:00 PM (90m)" },
  "Sun 10:00 PM": { day: "SUN", startMin: 600, endMin: 720, label: "10:00 PM – Midnight (120m)" }
};

// Parse a schedule item string into day and start time
function parseItemSlot(itemStr) {
  if (!itemStr) return null;
  const match = itemStr.match(/\((.*?)\)/);
  if (!match || !match[1]) return null;
  const slotRaw = match[1].trim(); // e.g. "Fri 06:00 PM"
  const parts = slotRaw.split(/\s+/);
  if (parts.length < 3) return null;
  const day = parts[0].toUpperCase(); // "FRI"
  const timeStr = parts.slice(1).join(" "); // "06:00 PM"

  // Standardize key
  const normalizedKey = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase() + " " + timeStr;
  const known = PERFORMANCE_TIME_SLOTS[normalizedKey] || PERFORMANCE_TIME_SLOTS[slotRaw];
  if (known) {
    return { day: known.day, startMin: known.startMin, endMin: known.endMin, label: known.label, slotRaw: slotRaw };
  }

  // Fallback time parsing
  const tMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (tMatch) {
    let hours = parseInt(tMatch[1], 10);
    const mins = parseInt(tMatch[2], 10);
    const meridian = tMatch[3].toUpperCase();
    if (meridian === "PM" && hours < 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;
    const startMin = hours * 60 + mins;
    return { day: day, startMin: startMin, endMin: startMin + 90, label: timeStr + " (90m)", slotRaw: slotRaw };
  }

  return null;
}

// Session-based in-memory working schedule.
// localStorage stores finalized/locked schedules under SCHEDULE_STORAGE_KEY.
function loadSavedLineup() {
  // Fresh session begins empty on the active builder workspace
  activeScheduleItems = [];
  renderLineupList();
  setupDragAndDropListeners();
  setupKeyboardAccessibility();
  updateScheduleNoticeBanner();
}

// Update the notice banner if saved schedules exist in localStorage
function updateScheduleNoticeBanner() {
  const bottomBar = document.getElementById("saved-schedule-dropzone-bar");
  const bottomBtnText = document.getElementById("saved-schedule-btn-text");
  const passesPill = document.getElementById("passes-saved-schedule-pill");
  const passesCount = document.getElementById("passes-saved-schedule-count");

  try {
    const raw = localStorage.getItem(SCHEDULE_STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      if (Array.isArray(saved) && saved.length > 0) {
        const countTxt = saved.length === 1 ? "1 Act Saved" : saved.length + " Acts Saved";
        if (bottomBar) {
          bottomBar.style.display = "flex";
          if (bottomBtnText) bottomBtnText.textContent = "View Saved Schedule (" + countTxt + ")";
        }
        if (passesPill) {
          passesPill.style.display = "flex";
          if (passesCount) passesCount.textContent = countTxt + " linked to your weekend pass";
        }
        return;
      }
    }
  } catch (e) {}

  if (bottomBar) bottomBar.style.display = "none";
  if (passesPill) passesPill.style.display = "none";
}

function filterScheduleChips(day, btnElement) {
  const pills = document.querySelectorAll(".schedule-day-pill");
  pills.forEach(p => p.classList.remove("active-day-pill"));
  if (btnElement) btnElement.classList.add("active-day-pill");

  const chips = document.querySelectorAll("#chips-scroll-container .draggable-chip");
  chips.forEach(chip => {
    const chipDay = chip.getAttribute("data-day");
    if (day === "ALL" || chipDay === day) {
      chip.style.display = "flex";
    } else {
      chip.style.display = "none";
    }
  });
}

function setupDragAndDropListeners() {
  const chips = document.querySelectorAll(".draggable-chip");
  chips.forEach(chip => {
    chip.removeEventListener("dragstart", onChipDragStart);
    chip.removeEventListener("dragend", onChipDragEnd);
    chip.addEventListener("dragstart", onChipDragStart);
    chip.addEventListener("dragend", onChipDragEnd);
  });

  const dropzone = document.getElementById("lineup-dropzone");
  if (dropzone) {
    dropzone.removeEventListener("dragover", onDropzoneDragOver);
    dropzone.removeEventListener("dragleave", onDropzoneDragLeave);
    dropzone.removeEventListener("drop", onDropzoneDrop);

    dropzone.addEventListener("dragover", onDropzoneDragOver);
    dropzone.addEventListener("dragleave", onDropzoneDragLeave);
    dropzone.addEventListener("drop", onDropzoneDrop);
  }
}

// Keyboard accessibility for schedule cards
function setupKeyboardAccessibility() {
  const chips = document.querySelectorAll(".draggable-chip");
  chips.forEach(chip => {
    chip.setAttribute("tabindex", "0");
    chip.setAttribute("role", "button");
    const artist = chip.getAttribute("data-artist") || "";
    chip.setAttribute("aria-label", "Add " + artist.split("-")[0].trim() + " to custom schedule");

    chip.onkeydown = function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const artistData = chip.getAttribute("data-artist");
        if (artistData) addArtistDirectly(artistData);
      }
    };
  });
}

function onChipDragStart(event) {
  const artist = event.currentTarget.getAttribute("data-artist");
  if (!artist) return;
  event.dataTransfer.setData("text/plain", artist);
  event.dataTransfer.effectAllowed = "copyMove";
  event.currentTarget.classList.add("dragging");

  const dropzone = document.getElementById("lineup-dropzone");
  if (dropzone) dropzone.classList.add("drag-active");
}

function onChipDragEnd(event) {
  event.currentTarget.classList.remove("dragging");
  const dropzone = document.getElementById("lineup-dropzone");
  if (dropzone) dropzone.classList.remove("drag-active");
}

function onDropzoneDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
  const dropzone = document.getElementById("lineup-dropzone");
  if (dropzone) dropzone.classList.add("drag-active");
}

function onDropzoneDragLeave(event) {
  const dropzone = document.getElementById("lineup-dropzone");
  if (dropzone && !dropzone.contains(event.relatedTarget)) {
    dropzone.classList.remove("drag-active");
  }
}

function onDropzoneDrop(event) {
  event.preventDefault();
  const dropzone = document.getElementById("lineup-dropzone");
  if (dropzone) dropzone.classList.remove("drag-active");

  const artistData = event.dataTransfer.getData("text/plain");
  if (artistData) {
    addArtistDirectly(artistData);
  }
}

function addArtistDirectly(artistStr) {
  if (!artistStr) return;
  const normalizedStr = artistStr.replace(/\uFFFD/g, "-");
  if (!activeScheduleItems.includes(normalizedStr)) {
    activeScheduleItems.push(normalizedStr);
    renderLineupList();
    showScheduleFeedback("Added: " + normalizedStr.split("-")[0].trim() + " ✓", "success");
  } else {
    showScheduleFeedback("Already in your schedule!", "warning");
  }
}

function removeArtistFromSchedule(index) {
  if (index >= 0 && index < activeScheduleItems.length) {
    const removed = activeScheduleItems.splice(index, 1)[0];
    renderLineupList();
    showScheduleFeedback("Removed: " + removed.split("-")[0].trim(), "info");
  }
}

function clearSavedLineup() {
  if (activeScheduleItems.length === 0) return;
  activeScheduleItems = [];
  renderLineupList();
  showScheduleFeedback("Working session reset", "info");
}

// Sophisticated time interval conflict detection: checks if [startA, endA) overlaps [startB, endB) on same day
function checkScheduleConflicts() {
  const conflictIndices = new Set();
  const parsedSlots = activeScheduleItems.map(item => parseItemSlot(item));

  for (let i = 0; i < parsedSlots.length; i++) {
    for (let j = i + 1; j < parsedSlots.length; j++) {
      const a = parsedSlots[i];
      const b = parsedSlots[j];
      if (a && b && a.day === b.day) {
        if (a.startMin < b.endMin && b.startMin < a.endMin) {
          conflictIndices.add(i);
          conflictIndices.add(j);
        }
      }
    }
  }

  const conflictBanner = document.getElementById("schedule-conflict-banner");
  if (conflictBanner) {
    if (conflictIndices.size > 0) {
      conflictBanner.style.display = "block";
      conflictBanner.innerHTML = "⚠️ <b>Schedule Conflict Detected:</b> You have " + conflictIndices.size + " overlapping performances on your schedule!";
    } else {
      conflictBanner.style.display = "none";
    }
  }

  return conflictIndices;
}

function renderLineupList() {
  const ul = document.getElementById("saved-lineup-list");
  const countBadge = document.getElementById("schedule-count-badge");
  const actionRow = document.getElementById("schedule-actions-row");
  if (!ul) return;

  const count = activeScheduleItems.length;
  if (countBadge) {
    countBadge.textContent = count === 1 ? "1 Act Added" : count + " Acts Added";
  }

  if (actionRow) {
    actionRow.style.display = count > 0 ? "flex" : "none";
  }

  if (count === 0) {
    ul.innerHTML = `
      <li class="empty-schedule-prompt">
        <span style="font-size: 2.2rem; display: block; margin-bottom: 0.5rem;">&#127911;</span>
        <b>Your working schedule is empty</b><br />
        Select or drag artists from the left column to draft your weekend plan.
      </li>
    `;
    const conflictBanner = document.getElementById("schedule-conflict-banner");
    if (conflictBanner) conflictBanner.style.display = "none";
    return;
  }

  const conflictIndices = checkScheduleConflicts();

  ul.innerHTML = activeScheduleItems.map((item, idx) => {
    const parts = item.split("-");
    const name = parts[0] ? parts[0].trim() : item;
    const details = parts[1] ? parts[1].trim() : "";
    const isConflict = conflictIndices.has(idx);

    return `
      <li class="scheduled-artist-card ${isConflict ? "has-conflict" : ""}">
        <div class="scheduled-item-info">
          <span class="scheduled-item-title">${name} ${isConflict ? "<small style='color: #d84315; font-weight: 800; background: #fff3e0; border: 1px solid #d84315; border-radius: 4px; padding: 1px 5px; margin-left: 6px;'>[TIME OVERLAP]</small>" : ""}</span>
          <span class="scheduled-item-details">${details}</span>
        </div>
        <button type="button" class="remove-scheduled-btn" title="Remove Set" aria-label="Remove ${name} from schedule" onclick="removeArtistFromSchedule(${idx})">&times;</button>
      </li>
    `;
  }).join("");
}

function showScheduleFeedback(msg, type) {
  const el = document.getElementById("schedule-feedback");
  if (el) {
    el.textContent = msg;
    if (type === "success") {
      el.style.color = "#00c853";
      el.style.fontWeight = "700";
    } else if (type === "warning") {
      el.style.color = "#ff9100";
      el.style.fontWeight = "700";
    } else {
      el.style.color = "#0088ff";
      el.style.fontWeight = "600";
    }
    clearTimeout(el._feedbackTimeout);
    el._feedbackTimeout = setTimeout(() => {
      el.textContent = "Select or drag performances to schedule";
      el.style.color = "#555";
      el.style.fontWeight = "normal";
    }, 3200);
  }
}

// Save schedule for later into localStorage & show modal
function saveScheduleForLater() {
  if (activeScheduleItems.length === 0) {
    alert("Please add at least one performance before saving.");
    return;
  }
  try {
    localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(activeScheduleItems));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }
  openScheduleSavedModal(activeScheduleItems, "Saved for Later");
  updateScheduleNoticeBanner();
}

// Lock passes & attach schedule to checkout
function lockScheduleAndProceed() {
  if (activeScheduleItems.length === 0) {
    alert("Please add at least one performance before locking your passes.");
    return;
  }
  try {
    localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(activeScheduleItems));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }
  window.location.href = "./passes.html?from=schedule#book-pass";
}

// Modal for Viewing Saved Schedule
function openScheduleSavedModal(scheduleList, titleText) {
  let modal = document.getElementById("schedule-saved-modal");
  
  // If modal exists but has wrong classes or elements, clean it up
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "schedule-saved-modal";
    document.body.appendChild(modal);
  }

  modal.className = "order-modal-backdrop active";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.style.display = "flex";

  const items = (Array.isArray(scheduleList) && scheduleList.length > 0)
    ? scheduleList
    : (() => {
        try {
          const raw = localStorage.getItem(SCHEDULE_STORAGE_KEY);
          return raw ? JSON.parse(raw) : [];
        } catch (e) {
          return [];
        }
      })();

  const listItemsHtml = items.length === 0
    ? '<div style="text-align: center; padding: 2rem 1rem; color: #666;"><span style="font-size: 2.2rem; display: block; margin-bottom: 0.5rem;">📋</span><b style="font-size: 1rem; color: #111;">No Saved Schedule Found</b><p style="margin: 0.4rem 0 0; font-size: 0.84rem;">Add performances in the builder and click \'Save for Later\' to archive your weekend.</p></div>'
    : items.map(it => {
        const parts = it.split("-");
        const artist = parts[0] ? parts[0].trim() : it;
        const details = parts[1] ? parts[1].trim() : "";
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; margin-bottom: 8px; background: #fffdf7; border: 2px solid #111111; border-radius: 10px; box-shadow: 2px 2px 0px #111;">
            <div>
              <b style="font-size: 0.94rem; color: #111; display: block;">${artist}</b>
              <small style="font-size: 0.8rem; color: #57554f; font-weight: 600;">${details}</small>
            </div>
            <span style="font-size: 0.72rem; font-weight: 800; background: #00e676; border: 1.5px solid #111; border-radius: 999px; padding: 3px 9px;">CONFIRMED</span>
          </div>
        `;
      }).join("");

  modal.innerHTML = `
    <div class="order-modal-card" style="max-width: 540px; width: 92%; max-height: 88vh; display: flex; flex-direction: column; padding: 1.5rem; background: #fffdf7; border: 3px solid #111111; border-radius: 16px; box-shadow: 6px 6px 0px #111111;">
      
      <!-- Modal Header with Small 'X' Close Button -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #111111; padding-bottom: 0.85rem; margin-bottom: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 1.25rem;">📋</span>
          <div>
            <h3 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; color: #111;">${titleText || "My Saved Festival Schedule"}</h3>
            <small style="color: #666; font-weight: 600;">${items.length} performance${items.length === 1 ? "" : "s"} archived</small>
          </div>
        </div>
        <button type="button" class="close-modal-x-btn" onclick="closeScheduleSavedModal()" aria-label="Close" style="background: #111111; color: #ffffff; border: none; border-radius: 50%; width: 28px; height: 28px; font-size: 1rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1; transition: transform 0.15s ease;">&times;</button>
      </div>

      <!-- Scrollable Itinerary List -->
      <div style="overflow-y: auto; flex: 1; padding-right: 0.25rem; margin-bottom: 1.25rem; max-height: 320px;">
        ${listItemsHtml}
      </div>

      <!-- Footer with Load Into Planner & Lock Passes options -->
      <div style="display: flex; gap: 0.65rem; border-top: 2px solid #e0ded7; padding-top: 1rem; flex-wrap: wrap;">
        ${items.length > 0 ? `
          <button type="button" class="secondary-btn" style="flex: 1; padding: 10px 14px; font-weight: 700; background: #e8f5e9; border: 2px solid #2e7d32; color: #1b5e20;" onclick="restoreSavedScheduleToWorkspace(); closeScheduleSavedModal();">
            Load into Planner ↑
          </button>
          <a href="./passes.html" class="nav-cta-btn" style="flex: 1.2; text-align: center; text-decoration: none; padding: 10px 14px; border: 2px solid #111;">
            Lock Passes &rarr;
          </a>
        ` : `
          <button type="button" class="secondary-btn" style="flex: 1; padding: 10px 14px;" onclick="closeScheduleSavedModal()">
            Close
          </button>
        `}
      </div>
    </div>
  `;

  // Clicking outside the card closes the modal
  modal.onclick = function(e) {
    if (e.target === modal) {
      closeScheduleSavedModal();
    }
  };

  document.body.style.overflow = "hidden";
}

function closeScheduleSavedModal() {
  const modal = document.getElementById("schedule-saved-modal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}

// Function to view previously saved schedule
function viewSavedSchedule() {
  try {
    const raw = localStorage.getItem(SCHEDULE_STORAGE_KEY);
    const saved = raw ? JSON.parse(raw) : [];
    openScheduleSavedModal(saved, "My Saved Festival Schedule");
  } catch (e) {
    openScheduleSavedModal([], "My Saved Festival Schedule");
  }
}

// Restore saved schedule into the current working workspace
function restoreSavedScheduleToWorkspace() {
  try {
    const raw = localStorage.getItem(SCHEDULE_STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      if (Array.isArray(saved) && saved.length > 0) {
        activeScheduleItems = [...saved];
        renderLineupList();
        showScheduleFeedback("Loaded " + saved.length + " acts into your working planner!", "success");
      }
    }
  } catch (e) {}
}

function exportPersonalSchedule() {
  if (activeScheduleItems.length === 0) {
    alert("Please add at least one performance to your schedule before exporting.");
    return;
  }
  window.print();
}

// Inline fallback handlers for HTML ondrag attributes if invoked
function handleDragStart(event) { onChipDragStart(event); }
function handleDragOver(event) { onDropzoneDragOver(event); }
function handleDrop(event) { onDropzoneDrop(event); }

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
  worker.postMessage({ attendees: 15000, stages: 4 });
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
  renderDirectOrdersTable();

  const form = document.getElementById("pass-registration-form");
  if (form) {
    form.addEventListener("submit", validateFestivalForm);
  }
  window.addEventListener('resize', updateBomAndDomInspector);
  // Keyboard Escape listener to dismiss modal
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeOrderConfirmationModal();
    }
  });
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








// Standalone Direct Orders Table Renderer (Works on shuttles-orders.html without relying on remote imports)
function renderDirectOrdersTable() {
  const tbody = document.getElementById("firebase-passes-tbody");
  if (!tbody) return;

  const ORDERS_KEY = "soundwave_firebase_passes_mirror";
  const DEFAULT_SEED_ORDERS = [
    {
      passCode: "SW26-NEON01-100",
      attendeeName: "Johan Sanju",
      email: "johansanju00@gmail.com",
      passTier: "Backstage All-Access ($499)",
      festivalDay: "All 3 Days",
      quantity: 2,
      totalPrice: 810.50,
      favoriteArtist: "Neon Pulse"
    },
    {
      passCode: "SW26-VIP77A-101",
      attendeeName: "Aria Montgomery",
      email: "aria@soundwave2026.com",
      passTier: "VIP Gold Pass ($249)",
      festivalDay: "Day 3 Finale",
      quantity: 1,
      totalPrice: 261.50,
      favoriteArtist: "DJ Solaris"
    }
  ];

  let orders = [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (raw) {
      orders = JSON.parse(raw);
    } else {
      orders = DEFAULT_SEED_ORDERS;
      localStorage.setItem(ORDERS_KEY, JSON.stringify(DEFAULT_SEED_ORDERS));
    }
  } catch (e) {
    orders = DEFAULT_SEED_ORDERS;
  }

  if (!orders || orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7">No wristband orders found. Book a pass to see it here!</td></tr>';
    return;
  }

  tbody.innerHTML = orders
    .map(
      (p) =>
        "<tr>" +
          "<td><b>" + (p.passCode || "SW26-PASS") + "</b></td>" +
          "<td><b>" + (p.attendeeName || "Attendee") + "</b><br /><small>" + (p.email || "") + "</small></td>" +
          "<td>" + (p.passTier || "General Admission") + "</td>" +
          "<td>" + (p.festivalDay || "All 3 Days") + "</td>" +
          "<td>" + (p.quantity || 1) + "</td>" +
          "<td><b>$" + Number(p.totalPrice || 0).toFixed(2) + "</b></td>" +
          "<td>" + (p.favoriteArtist || "Neon Pulse") + "</td>" +
        "</tr>"
    )
    .join("");
}



// Interactive 3-Tab Wristband Showcase on Passes Page
function switchPassShowcaseTab(tierKey, tabEl) {
  document.querySelectorAll(".sw-showcase-tab").forEach(function (btn) {
    const isMatch = btn === tabEl || btn.getAttribute("data-showcase-tier") === tierKey;
    btn.classList.toggle("is-active", isMatch);
    btn.setAttribute("aria-selected", isMatch ? "true" : "false");
  });
  document.querySelectorAll(".sw-preview-pane").forEach(function (pane) {
    const isMatch = pane.getAttribute("data-preview-tier") === tierKey;
    pane.classList.toggle("is-active", isMatch);
  });
}
