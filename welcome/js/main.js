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
      if (item.component === 'ticket-ga') {
        card.innerHTML = `
          <article class="mem mem-paper ticket-ga" style="--mem-size: 15px">
            <div class="ticket-ga__main mem-crease" style="--crease-at: 40%">
              <div class="ink-worn">
                <p class="ticket-ga__brand">SOUNDWAVE</p>
              </div>
              <span class="ticket-ga__admit ink-worn">ADMIT ONE</span>
              <div class="ticket-ga__meta ink-worn">
                <span>Edition<b>02</b></span>
                <span>Year<b>2015</b></span>
                <span>Entry<b>Gate B</b></span>
              </div>
            </div>
            <div class="ticket-ga__stub">
              <span class="ticket-ga__stub-no">Nº 004127</span>
              <div class="mem-barcode"></div>
            </div>
            <span class="ticket-ga__stain"></span>
          </article>
          <span class="archive-card-tag">Ticket · ${item.title}</span>
        `;
      } else if (item.component === 'ticket-vip') {
        card.innerHTML = `
          <article class="mem ticket-vip" style="--mem-size: 14.5px">
            <div class="ticket-vip__top"><span>Edition 06 · 2019</span><span>All Stages</span></div>
            <p class="ticket-vip__brand foil">SOUNDWAVE<span class="foil">VIP</span></p>
            <div class="ticket-vip__bottom"><span>Nº 0612 — 0388<br/>Non-transferable</span><span class="ticket-vip__seal">VI</span></div>
          </article>
          <span class="archive-card-tag">VIP Pass · ${item.title}</span>
        `;
      } else if (item.component === 'pass-crew') {
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
      }
    } else if (item.type === 'wristband-html') {
      if (item.component === 'band-woven') {
        card.innerHTML = `
          <article class="mem band-woven" style="--mem-size: 13.5px">
            <div class="band-woven__fabric"><span>SOUNDWAVE</span><span>ED·10</span><span>SOUNDWAVE</span></div>
            <span class="band-woven__bead"></span>
            <div class="band-woven__fabric band-woven__tail"></div>
          </article>
          <span class="archive-card-tag">Wristband · ${item.title}</span>
        `;
      } else if (item.component === 'band-rfid') {
        card.innerHTML = `
          <article class="mem band-rfid" style="--mem-size: 13.5px">
            <span class="band-rfid__chip"></span>
            <span class="band-rfid__deboss">SOUNDWAVE</span>
            <span class="band-rfid__id">SW11·7F3A</span>
          </article>
          <span class="archive-card-tag">RFID Band · ${item.title}</span>
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

  if (item.full) {
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
  if (!elements.btnEnter) return;

  elements.btnEnter.addEventListener('click', (e) => {
    e.preventDefault();
    playSubtlePulse(320, 0.4);

    // Save session flag so index.html doesn't redirect back during this session
    sessionStorage.setItem('sw_archive_seen', 'true');

    // Trigger full-screen cream veil expansion
    if (elements.veil) {
      elements.veil.classList.add('active');
    }

    setTimeout(() => {
      window.location.href = './index.html';
    }, 700);
  });

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
