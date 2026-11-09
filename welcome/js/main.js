/**
 * welcome/js/main.js
 * Master Controller for SOUNDWAVE: The Living Archive
 * Orchestrates 5 scenes, Frequency Canvas, Audio Synthesis, and Transition into index.html
 */

import { ARCHIVE_ITEMS, PEOPLE_GALLERY } from '../data/archive-items.js';

// --- STATE MANAGEMENT ---
const state = {
  activeScene: 0,
  soundEnabled: false,
  discoveriesFound: new Set(),
  totalDiscoveries: 3,
  audioCtx: null
};

// --- DOM CACHE ---
const elements = {
  hud: document.querySelector('.archive-hud'),
  railDots: document.querySelectorAll('.rail-dot'),
  scenes: document.querySelectorAll('.scene-section'),
  archiveGrid: document.getElementById('archive-grid'),
  peopleGrid: document.getElementById('people-grid'),
  discoveryCount: document.getElementById('discovery-count'),
  modal: document.getElementById('archive-modal'),
  modalMedia: document.getElementById('modal-media'),
  modalLabel: document.getElementById('modal-label'),
  modalTitle: document.getElementById('modal-title'),
  modalDesc: document.getElementById('modal-desc'),
  modalCurator: document.getElementById('modal-curator'),
  modalClose: document.getElementById('modal-close'),
  btnEnter: document.getElementById('btn-enter-soundwave'),
  btnSound: document.getElementById('btn-sound-toggle'),
  veil: document.getElementById('transition-veil'),
  canvasSignal: document.getElementById('signal-canvas'),
  canvasFrequency: document.getElementById('frequency-canvas')
};

// --- SOUND SYNTHESIS ENGINE (Muted by default, low friction) ---
function initAudio() {
  if (state.audioCtx) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    state.audioCtx = new AudioContext();
  } catch (e) {
    console.warn("AudioContext not supported in this browser.", e);
  }
}

function playSubtlePulse(freq = 65, duration = 0.4) {
  if (!state.soundEnabled || !state.audioCtx) return;
  try {
    const ctx = state.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    console.warn("Audio error:", err);
  }
}

// --- VINTAGE PASSES MARKUP GENERATOR ---
function getTicketMarkup(component, size = '13.5px') {
  switch (component) {
    case 'ticket-pink':
      return `
        <article class="vintage-ticket ticket-pink" style="--mem-size: ${size}">
          <div class="ticket-pink__stub-left">
            <span class="v-num">3940</span>
            <span class="v-meta">SEC GEN</span>
            <span class="v-meta">NOV 25, 1992</span>
          </div>
          <div class="ticket-pink__body">
            <div class="ticket-pink__promoter">ROCKWAY PRESENTS · A BENEFICIO DE BANDESIR</div>
            <h3 class="ticket-pink__title ink-worn">SOUNDWAVE</h3>
            <div class="ticket-pink__venue">ESTACIONAMIENTO DEL POLIEDRO</div>
            <div class="ticket-pink__date">25 DE NOVIEMBRE · 9:00 PM</div>
          </div>
          <div class="ticket-pink__stub-right">
            <span class="v-price">BS. 2,500.00</span>
            <span class="v-num">3940</span>
          </div>
        </article>
      `;
    case 'ticket-magenta':
      return `
        <article class="vintage-ticket ticket-magenta" style="--mem-size: ${size}">
          <div class="ticket-magenta__left">
            <span class="v-code">22759</span>
            <span class="v-gate">PUERTA 9</span>
          </div>
          <div class="ticket-magenta__body">
            <div class="ticket-magenta__banner">
              <h3 class="ticket-magenta__title ink-worn">SOUNDWAVE</h3>
            </div>
            <div class="ticket-magenta__venue">ESTADIO DEL TECNOLÓGICO</div>
            <div class="ticket-magenta__boxes">
              <div class="ticket-magenta__box"><span>FEB. 16, 1990</span><b>$70,000.⁰⁰</b></div>
              <div class="ticket-magenta__box"><span>GUADALAJARA</span><b>VIERNES 8 P.M.</b></div>
            </div>
          </div>
          <div class="ticket-magenta__right">
            <span class="v-price">NO REFUND</span>
            <span class="v-price">$70,000.⁰⁰</span>
          </div>
        </article>
      `;
    case 'ticket-orange':
      return `
        <article class="vintage-ticket ticket-orange" style="--mem-size: ${size}">
          <div class="ticket-orange__left">
            <span class="t-lead">SOUNDWAVE</span>
            <span class="t-venue">OLYMPIAHALLE</span>
            <div class="t-prices">
              <div>VVK DM 16,-</div>
              <div>AK DM 19,-</div>
            </div>
          </div>
          <div class="ticket-orange__center">
            <span class="ticket-orange__promoter">ABENDZEITUNG PRESENTS · IN CONCERT</span>
            <h3 class="ticket-orange__title ink-worn">SOUNDWAVE</h3>
            <span class="ticket-orange__sub">ARENA · FESTIVAL GROUNDS</span>
          </div>
          <div class="ticket-orange__right">
            <span class="ticket-orange__giant-num">21</span>
            <div class="ticket-orange__seats">
              <div><span>R</span><b>39</b></div>
              <div><span>S</span><b>15</b></div>
            </div>
          </div>
        </article>
      `;
    case 'ticket-green':
      return `
        <article class="vintage-ticket ticket-green" style="--mem-size: ${size}">
          <div class="ticket-green__stub-left">
            <span class="v-num">000611</span>
          </div>
          <div class="ticket-green__body">
            <div class="ticket-green__masthead">JOHN BAUER CONCERTS PRESENTS</div>
            <h3 class="ticket-green__title ink-worn">SOUNDWAVE</h3>
            <div class="ticket-green__mid">
              <div class="ticket-green__date-badge">
                <span class="d-month">SEPT'BR</span>
                <span class="d-day">11</span>
                <span class="d-yr">1975</span>
              </div>
              <div class="ticket-green__details">
                <span class="t-venue">SPOKANE COLISEUM</span>
                <span>THURSDAY 7:30 P.M.</span>
                <span class="t-price">ADVANCE $6.00 · NO REFUNDS</span>
              </div>
            </div>
          </div>
          <div class="ticket-green__stub-right">
            <span class="v-date">SEPT'BR 11</span>
            <span class="v-price">$6.00</span>
          </div>
        </article>
      `;
    case 'ticket-blue':
      return `
        <article class="vintage-ticket ticket-blue" style="--mem-size: ${size}">
          <div class="ticket-blue__stub-left">
            <span>FLOOR</span>
            <span>SEC 9</span>
            <span>ROW S</span>
          </div>
          <div class="ticket-blue__body">
            <div class="ticket-blue__promo">CONCERTS WEST PRESENTS</div>
            <h3 class="ticket-blue__title ink-worn">★ SOUNDWAVE ★</h3>
            <div class="ticket-blue__arena">CONVENTION CENTER ARENA</div>
            <div class="ticket-blue__footer">
              <span>SEPT 5, 1977</span>
              <span>FT. WORTH, TX</span>
              <span>8:00 P.M.</span>
            </div>
          </div>
          <div class="ticket-blue__stub-right">
            <span class="v-price">$8.00</span>
            <span class="v-sec">SEC 9</span>
          </div>
        </article>
      `;
    case 'ticket-yellow':
      return `
        <article class="vintage-ticket ticket-yellow" style="--mem-size: ${size}">
          <div class="ticket-yellow__stub-left">
            <span>02154</span>
            <span>GEN. ADM.</span>
          </div>
          <div class="ticket-yellow__body">
            <div class="ticket-yellow__promo">BE BOP PRODUCTIONS PRESENTS</div>
            <h3 class="ticket-yellow__title ink-worn">SOUNDWAVE</h3>
            <div class="ticket-yellow__mid">
              <div class="ticket-yellow__cal">
                <span class="c-mo">JULY</span>
                <span class="c-day">1</span>
                <span class="c-yr">1975</span>
              </div>
              <div class="ticket-yellow__info">
                <b>JACKSON COLISEUM</b>
                <span>JACKSON, MISS. · TUES. EVE. 8:00 P.M.</span>
              </div>
            </div>
          </div>
          <div class="ticket-yellow__stub-right">
            <div class="v-price-box">
              <span>ADV.</span>
              <b>$5.00</b>
            </div>
            <span>02154</span>
          </div>
        </article>
      `;
    case 'ticket-red-cobo':
      return `
        <article class="vintage-ticket ticket-red-cobo" style="--mem-size: ${size}">
          <span class="cobo-hole cobo-hole--left"></span>
          <span class="cobo-hole cobo-hole--right"></span>
          <div class="ticket-red-cobo__col-1">
            <span>A18 N 6</span>
          </div>
          <div class="ticket-red-cobo__col-2">
            <div class="c-venue">COBO ARENA · DETROIT</div>
            <h3 class="ticket-red-cobo__title ink-worn">SOUNDWAVE</h3>
            <div class="c-date">NOV. 9 · THU. EVE. 8:00 P.M.</div>
            <div class="c-tax">Admission $9.50 · City Tax .50 · Total $10.00</div>
          </div>
          <div class="ticket-red-cobo__col-3">
            <span class="c-badge">GOOD ONLY</span>
            <span class="c-giant-day">9</span>
            <span class="c-price">$10.00</span>
          </div>
          <div class="ticket-red-cobo__col-4">
            <span>A18 N 6</span>
          </div>
        </article>
      `;
    case 'ticket-metallica':
      return `
        <article class="vintage-ticket ticket-metallica" style="--mem-size: ${size}">
          <div class="ticket-metallica__body">
            <div class="ticket-metallica__badge">METAL HAMMER PRESENTS</div>
            <h3 class="ticket-metallica__title foil">SOUNDWAVE</h3>
            <div class="ticket-metallica__sub">STAGE BARRIER ALL-ACCESS</div>
            <div class="ticket-metallica__footer">BONHAM · WARRIOR SOUL · MESSEHALLE</div>
          </div>
          <div class="ticket-metallica__stub">
            <span class="m-date">19. MAI 1990</span>
            <span class="m-price">DM 45,-</span>
            <span class="m-serial">#3708</span>
          </div>
        </article>
      `;
    case 'ticket-zeppelin':
      return `
        <article class="vintage-ticket ticket-zeppelin mem-paper" style="--mem-size: ${size}">
          <div class="ticket-zeppelin__stub-left">
            <span>No. 027447</span>
            <span>GEN. ADM.</span>
          </div>
          <div class="ticket-zeppelin__body">
            <div class="ticket-zeppelin__promo">S & L ENTERTAINMENT PRESENTS · AN EVENING WITH</div>
            <div class="ticket-zeppelin__title-wrap">
              <h3 class="ticket-zeppelin__title ink-worn">SOUNDWAVE</h3>
              <span class="ticket-zeppelin__seal">KINGDOME</span>
            </div>
            <div class="ticket-zeppelin__venue">— AT THE KINGDOME —</div>
            <div class="ticket-zeppelin__date">SUNDAY, JULY 17, 1977 · 8:00 P.M. · $10.00</div>
          </div>
          <div class="ticket-zeppelin__stub-right">
            <span>No. 027447</span>
          </div>
        </article>
      `;
    case 'ticket-fleetwood':
      return `
        <article class="vintage-ticket ticket-fleetwood" style="--mem-size: ${size}">
          <div class="ticket-fleetwood__body">
            <div class="ticket-fleetwood__promo">BEAVER PRODUCTIONS PRESENTS</div>
            <h3 class="ticket-fleetwood__title ink-worn">SOUNDWAVE</h3>
            <div class="ticket-fleetwood__venue">RUPP ARENA — LEXINGTON CENTER</div>
            <div class="ticket-fleetwood__mid">
              <span class="ticket-fleetwood__big-day">24</span>
              <div class="ticket-fleetwood__date-info">
                <b>THURSDAY 8:00 P.M.</b>
                <span>LEXINGTON, KY · 5% STATE TAX</span>
              </div>
            </div>
          </div>
          <div class="ticket-fleetwood__strip">
            <span>$8.50</span>
          </div>
          <div class="ticket-fleetwood__stub">
            <span>SEC 222</span>
            <span>ROW T</span>
            <span>SEAT 7</span>
          </div>
        </article>
      `;
    default:
      return '';
  }
}

// --- INITIALIZE THE ARCHIVIST'S TABLE (Scene 02) ---
function renderArchiveTable() {
  if (!elements.archiveGrid) return;
  elements.archiveGrid.innerHTML = '';

  ARCHIVE_ITEMS.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'archive-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View ${item.title}`);

    // Random gentle tilt for physical layout feel
    const randomTilt = ((index % 5) - 2) * 2.2;
    card.style.setProperty('--rot', `${randomTilt}deg`);

    // Render HTML component vs Image
    if (item.type === 'poster' || item.type === 'flyer') {
      card.innerHTML = `
        <div class="archive-card-image-wrap">
          <img src="${item.thumb}" alt="${item.title}" loading="lazy" />
        </div>
        <span class="archive-card-tag">${item.edition} · ${item.title}</span>
      `;
    } else if (item.type === 'ticket-html') {
      if (item.component === 'pass-crew') {
        card.innerHTML = `
          <article class="mem pass-crew mem-paper" style="--mem-size: 14.5px">
            <span class="pass-crew__hole"></span>
            <div class="pass-crew__band"><span>ED. 08</span><span>2021</span></div>
            <p class="pass-crew__title ink-worn">CREW</p>
            <p class="pass-crew__brand">SOUNDWAVE</p>
            <span class="pass-crew__number">#047</span>
            <div class="pass-crew__fields">Zone: Analog Dome<br/>Access: All areas</div>
          </article>
          <span class="archive-card-tag">Crew Pass · ${item.title}</span>
        `;
      } else {
        const ticketHtml = getTicketMarkup(item.component, '13.5px');
        card.innerHTML = `
          ${ticketHtml}
          <span class="archive-card-tag">${item.edition} · ${item.title}</span>
        `;
      }
    } else if (item.isDiscovery) {
      if (item.component === 'note-secret') {
        card.innerHTML = `
          <div class="mem note" style="--mem-size: 13.5px">
            <span class="tape"></span>
            <p>Meet at the Vinyl Lawn at sunset — same spot as last year ♥</p>
          </div>
          <span class="archive-card-tag">Discovery · ${item.title}</span>
        `;
      } else if (item.component === 'fragment-schedule') {
        card.innerHTML = `
          <div class="mem mem-paper fragment" style="--mem-size: 14px">
            <h5>SAT · HORIZON ARENA</h5>
            <ol>
              <li><time>17:00</time> Gates open</li>
              <li><time>18:45</time> <span class="circled">Sunset set</span></li>
              <li><time>21:00</time> Headline set</li>
            </ol>
          </div>
          <span class="archive-card-tag">Discovery · ${item.title}</span>
        `;
      } else if (item.component === 'map-fragment') {
        card.innerHTML = `
          <div class="mem mem-paper map-fragment" style="--mem-size: 13.5px">
            <svg viewBox="0 0 220 160" role="img" aria-label="Four stages map">
              <path d="M0 128 C40 118 70 140 110 130 S180 116 220 126 L220 160 L0 160 Z" fill="#3e5a74" opacity=".35"/>
              <g fill="none" stroke="#1b1714" stroke-width="1.4">
                <path d="M30 30 h48 v26 h-48 z"/><circle cx="148" cy="44" r="18"/><path d="M40 84 q30 -14 60 0 v14 h-60 z"/><rect x="140" y="80" width="40" height="22" rx="4"/>
              </g>
              <text x="31" y="24">HORIZON</text><text x="128" y="20">DOME</text>
              <text x="40" y="110">VINYL</text><text x="132" y="114">VIP</text>
            </svg>
          </div>
          <span class="archive-card-tag">Discovery · ${item.title}</span>
        `;
      }
    }

    // Modal Interaction
    card.addEventListener('click', () => openArchiveDetail(item));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openArchiveDetail(item);
      }
    });

    // Simple Drag affordance for desktop
    if (item.isDraggable) {
      setupCardDragging(card);
    }

    elements.archiveGrid.appendChild(card);
  });
}

function setupCardDragging(card) {
  let isDown = false;
  let startX, startY;

  card.addEventListener('mousedown', (e) => {
    isDown = true;
    card.classList.add('is-dragging');
    startX = e.clientX;
    startY = e.clientY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    card.style.transform = `translate(${dx}px, ${dy}px) scale(1.05)`;
  });

  window.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      card.classList.remove('is-dragging');
      playSubtlePulse(120, 0.1);
    }
  });
}

// --- INITIALIZE THE PEOPLE EXHIBITION (Scene 03) ---
function renderPeopleGallery() {
  if (!elements.peopleGrid) return;
  elements.peopleGrid.innerHTML = '';

  PEOPLE_GALLERY.forEach((photo, idx) => {
    const cell = document.createElement('div');
    // Varied column spans for rich editorial rhythm
    const spanClass = idx === 0 ? 'col-span-8' : (idx === 1 ? 'col-span-4' : (idx === 2 ? 'col-span-4' : (idx === 3 ? 'col-span-8' : 'col-span-6')));
    cell.className = `photo-cell ${spanClass}`;
    cell.setAttribute('tabindex', '0');
    cell.setAttribute('role', 'button');
    cell.setAttribute('aria-label', `${photo.title} (${photo.caption})`);

    cell.innerHTML = `
      <img src="${photo.thumb}" alt="${photo.title}" loading="lazy" />
      <div class="photo-cell-overlay">
        <span class="photo-cell-time">${photo.timestamp}</span>
        <h4 class="photo-cell-title">${photo.title}</h4>
        <span class="photo-cell-loc">${photo.location}</span>
      </div>
    `;

    cell.addEventListener('click', () => {
      openArchiveDetail({
        title: photo.title,
        label: `PHOTOGRAPHIC ARCHIVE · ${photo.timestamp}`,
        full: photo.full,
        description: photo.caption,
        curatorNotes: `Captured on 35mm stock at ${photo.location}. SoundWave Living Archive Collection.`
      });
    });

    elements.peopleGrid.appendChild(cell);
  });
}

// --- MODAL CONTROLLER ---
function openArchiveDetail(item) {
  playSubtlePulse(220, 0.15);

  elements.modalLabel.textContent = item.label || 'ARCHIVAL RECORD';
  elements.modalTitle.textContent = item.title;
  elements.modalDesc.textContent = item.description || '';
  elements.modalCurator.textContent = item.curatorNotes ? `CURATOR NOTE: ${item.curatorNotes}` : 'Art-directed fictional archive specimen for SOUNDWAVE 2026.';

  if (item.type === 'ticket-html') {
    if (item.component === 'pass-crew') {
      elements.modalMedia.innerHTML = `
        <div style="display:flex; justify-content:center; align-items:center; width:100%; min-height:260px; padding:1.5rem 0;">
          <article class="mem pass-crew mem-paper" style="--mem-size: 20px;">
            <span class="pass-crew__hole"></span>
            <div class="pass-crew__band"><span>ED. 08</span><span>2021</span></div>
            <p class="pass-crew__title ink-worn">CREW</p>
            <p class="pass-crew__brand">SOUNDWAVE</p>
            <span class="pass-crew__number">#047</span>
            <div class="pass-crew__fields">Zone: Analog Dome<br/>Access: All areas</div>
          </article>
        </div>
      `;
    } else {
      const modalMarkup = getTicketMarkup(item.component, '20px');
      elements.modalMedia.innerHTML = `
        <div style="display:flex; justify-content:center; align-items:center; width:100%; min-height:220px; padding:1.5rem 0;">
          ${modalMarkup}
        </div>
      `;
    }
  } else if (item.full) {
    elements.modalMedia.innerHTML = `<img src="${item.full}" alt="${item.title}" />`;
  } else {
    // For HTML objects without standalone images, present a clear styled preview
    elements.modalMedia.innerHTML = `
      <div style="font-family: var(--sw-mono); text-align: center; color: var(--sw-cream-dim);">
        <p style="color: var(--sw-red); font-size: 0.8rem; letter-spacing: 0.16em;">[PHYSICAL MEMORABILIA PIECE]</p>
        <p style="font-size: 0.95rem; margin-top: 1rem;">Presented live on the Archivist's Table.</p>
      </div>
    `;
  }

  // Record Discovery
  if (item.isDiscovery && !state.discoveriesFound.has(item.id)) {
    state.discoveriesFound.add(item.id);
    if (elements.discoveryCount) {
      elements.discoveryCount.textContent = `${state.discoveriesFound.size}/${state.totalDiscoveries} Discovered`;
    }
  }

  elements.modal.showModal();
}

if (elements.modalClose) {
  elements.modalClose.addEventListener('click', () => elements.modal.close());
}
elements.modal.addEventListener('click', (e) => {
  if (e.target === elements.modal) elements.modal.close();
});

// --- DUAL FREQUENCY CANVASES (Scene 01 Heartbeat Line & Scene 04 Waveform Field) ---
function initFrequencyCanvas() {
  const c1 = elements.canvasSignal;
  const c4 = elements.canvasFrequency;
  if (!c1 || !c4) return;

  const ctx1 = c1.getContext('2d');
  const ctx4 = c4.getContext('2d');

  let width = (c1.width = c4.width = window.innerWidth);
  let height = (c1.height = c4.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = c1.width = c4.width = window.innerWidth;
    height = c1.height = c4.height = window.innerHeight;
  });

  let t = 0;

  function draw() {
    t += 0.025;

    // --- Scene 01 Signal Line: Slow pulse, heartbeat cadence ---
    ctx1.clearRect(0, 0, width, height);
    ctx1.beginPath();
    ctx1.lineWidth = 2.2;
    ctx1.strokeStyle = '#d0675a';

    const centerY = height * 0.58;
    for (let x = 0; x < width; x += 4) {
      // Natural packet envelope (sine pulse)
      const distFromCenter = Math.abs(x - width / 2) / (width / 2);
      const envelope = Math.exp(-distFromCenter * 3.5);
      const wave = Math.sin(x * 0.015 - t * 2.5) * Math.sin(x * 0.005) * 45 * envelope;
      const y = centerY + wave;

      if (x === 0) ctx1.moveTo(x, y);
      else ctx1.lineTo(x, y);
    }
    ctx1.stroke();

    // --- Scene 04 Frequency Field: Multi-layered harmonizing wave lines ---
    ctx4.clearRect(0, 0, width, height);
    for (let layer = 0; layer < 4; layer++) {
      ctx4.beginPath();
      ctx4.lineWidth = 1.2;
      ctx4.strokeStyle = layer === 0 ? '#d0675a' : (layer === 1 ? '#4a779d' : 'rgba(244, 237, 224, 0.25)');

      const layerY = height * 0.52 + (layer - 1.5) * 35;
      for (let x = 0; x < width; x += 6) {
        const y = layerY + Math.sin(x * 0.008 + t * (1.2 + layer * 0.4)) * (25 + layer * 15);
        if (x === 0) ctx4.moveTo(x, y);
        else ctx4.lineTo(x, y);
      }
      ctx4.stroke();
    }

    requestAnimationFrame(draw);
  }

  draw();
}

// --- SCENE NAVIGATION RAIL & OBSERVER ---
function initSceneObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(elements.scenes).indexOf(entry.target);
        if (index !== -1) {
          state.activeScene = index;
          elements.railDots.forEach((dot, dIdx) => {
            dot.classList.toggle('active', dIdx === index);
          });
          playSubtlePulse(90 + index * 25, 0.12);
        }
      }
    });
  }, { threshold: 0.5 });

  elements.scenes.forEach(scene => observer.observe(scene));

  elements.railDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetScene = document.getElementById(dot.getAttribute('data-target'));
      if (targetScene) targetScene.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// --- EXIT TRANSITION INTO HOMEPAGE (index.html) ---
function setupEnterTransition() {
  if (elements.btnEnter) {
    elements.btnEnter.addEventListener('click', (e) => {
      e.preventDefault();
      playSubtlePulse(320, 0.4);
      sessionStorage.setItem('sw_archive_seen', 'true');

      if (elements.veil) {
        elements.veil.classList.add('active');
      }

      setTimeout(() => {
        window.location.href = './index.html';
      }, 700);
    });
  }

  // Sound toggle button
  if (elements.btnSound) {
    elements.btnSound.addEventListener('click', () => {
      initAudio();
      state.soundEnabled = !state.soundEnabled;
      elements.btnSound.textContent = state.soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
      if (state.soundEnabled) playSubtlePulse(220, 0.2);
    });
  }
}

// --- DOM BOOT ---
window.addEventListener('DOMContentLoaded', () => {
  renderArchiveTable();
  renderPeopleGallery();
  initFrequencyCanvas();
  initSceneObserver();
  setupEnterTransition();
});
