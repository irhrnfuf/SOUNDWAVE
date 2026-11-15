/**
 * welcome/js/main.js
 * Master Controller for SOUNDWAVE: The Living Archive
 * Orchestrates 5 scenes, Frequency Canvas, Audio Synthesis, and Transition into index.html
 */

import { PEOPLE_GALLERY } from '../data/archive-items.js';

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

// --- INITIALIZE MENTALLY STUCK HERE (Scene 02: Hover Stack Cards) ---
const HOVER_STACK_REVIEWS = [
  {
    id: 1,
    quote: "Went for my daughter, but left the festival screaming higher than her",
    tag: "Roy Anderson",
    bg: "#E4FF1A",
    textColor: "#1A1A1A",
    stickerTopLeft: "./assets/stickers/a1_leopard.png",
    stickerBottomRight: "./assets/stickers/a4_martini.png",
  },
  {
    id: 2,
    quote: "Nothing short of spectacular - the beach, the food, the lawn and most importantly the music",
    tag: "Kathy",
    bg: "#DD1155",
    textColor: "#FFFFFF",
    stickerTopLeft: "./assets/stickers/a5_lips.png",
    stickerBottomRight: "./assets/stickers/a8_dj_turntable.png",
  },
  {
    id: 3,
    quote: "Idk which was more crazier, the whole festival or proposing to my gf mid-concert lmao",
    tag: "Jonathan Dan",
    bg: "#FF5714",
    textColor: "#1A1A1A",
    stickerTopLeft: "./assets/stickers/b1_acdc.png",
    stickerBottomRight: "./assets/stickers/a3_discoball.png",
  },
  {
    id: 4,
    quote: "I came alone, but I left with people who I now call mi familia❤️",
    tag: "Ferran Ramos",
    bg: "#E980FC",
    textColor: "#1A1A1A",
    stickerTopLeft: "./assets/stickers/b16_gengar_sprite.png",
    stickerBottomRight: "./assets/stickers/b17_pixel_espeon.png",
  },
  {
    id: 5,
    quote: "Loved every moment of it",
    tag: "Cassie",
    bg: "#67D6A3",
    textColor: "#1A1A1A",
    stickerTopLeft: "./assets/stickers/b1_acdc.png",
    stickerBottomRight: "./assets/stickers/a16_driving_poster.png",
  },
  {
    id: 6,
    quote: "Someone take me back to Miami 😣",
    tag: "Pamela Lovejoy",
    bg: "#3454D1",
    textColor: "#FFFFFF",
    stickerTopLeft: "./assets/stickers/b4_radiohead_horizontal.png",
    stickerBottomRight: "./assets/stickers/b5_3d_gengar.png",
  },
  {
    id: 7,
    quote: "Soundwave is my place of refuge from now on",
    tag: "Melo",
    bg: "#B98CFF",
    textColor: "#1A1A1A",
    stickerTopLeft: "./assets/stickers/b18_bullet_bill.png",
    stickerBottomRight: "./assets/stickers/a17_red_7ball.png",
  },
];

function renderArchiveTable() {
  const container = elements.archiveGrid;
  if (!container) return;

  if (typeof container._hoverStackCleanup === 'function') {
    container._hoverStackCleanup();
  }
  container.innerHTML = '';

  const PRESET_ROTATIONS = [-8, 4, -3, 5, -4, 6, 3, -6, 2, -5];
  const BREAKPOINT = 1025;
  const CFG = {
    cardWidth: 280,
    cardHeight: 360,
    overlap: 96,
    hoverLift: 30,
    pushDistance: 185,
    spread: 24,
    rotation: 7,
    duration: 0.35,
  };

  let activeIndex = null;
  let isSmallScreen = null;
  let cardEls = [];
  let stageEl = null;

  const prefersReduced = () =>
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

  const getDesktopScale = () => {
    const avail = Math.max(760, (container.clientWidth || window.innerWidth) - 160);
    const idealTotal = (HOVER_STACK_REVIEWS.length - 1) * CFG.overlap + CFG.cardWidth;
    return Math.min(1, avail / (idealTotal + 120));
  };

  const buildStickerMarkup = (src, posClass, altText) => {
    if (!src) return '';
    return `<img src="${src}" alt="${altText}" class="hs-sticker ${posClass}" draggable="false" />`;
  };

  const applyDesktopStyles = () => {
    if (!stageEl || isSmallScreen) return;
    const scale = getDesktopScale();
    const cardW = Math.round(CFG.cardWidth * scale);
    const cardH = Math.round(CFG.cardHeight * scale);
    const overlap = Math.round(CFG.overlap * scale);
    const pushDist = Math.round(CFG.pushDistance * scale);
    const hoverLift = Math.round(CFG.hoverLift * scale);
    const spread = Math.round(CFG.spread * scale);
    const totalW = (HOVER_STACK_REVIEWS.length - 1) * overlap + cardW;
    const reduce = prefersReduced();

    stageEl.style.width = `${totalW}px`;
    stageEl.style.height = `${cardH + (reduce ? 0 : hoverLift) + 28}px`;

    const activeMs = Math.max(0, CFG.duration) * 1000;
    const hasActive = activeIndex !== null;

    cardEls.forEach((el, index) => {
      const card = HOVER_STACK_REVIEWS[index];
      const baseX = index * overlap;
      const presetRot =
        PRESET_ROTATIONS[index % PRESET_ROTATIONS.length] + (index % 2 === 0 ? 0 : 1);
      const isActive = activeIndex === index;

      el.style.width = `${cardW}px`;
      el.style.height = `${cardH}px`;
      el.classList.toggle('is-active', isActive);

      let x = baseX;
      let y = 0;
      let rotate = presetRot * (CFG.rotation / 7);
      let zIndex = index + 1;
      let cardScale = 1;

      if (reduce) {
        if (isActive) zIndex = 999;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(1)`;
        el.style.zIndex = String(zIndex);
        el.style.transition = 'none';
        return;
      }

      if (hasActive) {
        if (index < activeIndex) {
          x -= pushDist;
          y -= spread * 0.4;
        } else if (index > activeIndex) {
          x += pushDist;
          y += spread * 0.4;
        }
        if (isActive) {
          x = baseX;
          y = -hoverLift;
          rotate = 0;
          zIndex = 999;
          cardScale = 1.035;
        }
      }

      const transition = isActive
        ? `transform ${activeMs}ms cubic-bezier(0.22, 1.6, 0.32, 1)`
        : hasActive
          ? `transform ${activeMs}ms cubic-bezier(0.22, 1, 0.36, 1)`
          : `transform ${Math.round(activeMs * (480 / 700))}ms cubic-bezier(0.4, 0, 0.2, 1)`;

      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${cardScale})`;
      el.style.zIndex = String(zIndex);
      el.style.transition = transition;
    });
  };

  const applyMobileStyles = () => {
    cardEls.forEach((el, index) => {
      el.classList.toggle('is-active', activeIndex === index);
    });
  };

  const setActive = (nextIndex) => {
    if (activeIndex === nextIndex) return;
    activeIndex = nextIndex;
    if (nextIndex !== null) {
      playSubtlePulse(240 + nextIndex * 20, 0.08);
    }
    if (isSmallScreen) applyMobileStyles();
    else applyDesktopStyles();
  };

  const createCardElement = (card, index) => {
    const el = document.createElement('div');
    el.className = 'hs-card';
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'article');
    el.setAttribute('aria-label', `Festival review ${String(index + 1).padStart(2, '0')}: ${card.quote}`);
    el.style.color = card.textColor;

    el.innerHTML = `
      ${buildStickerMarkup(card.stickerTopLeft, 'hs-sticker--tl', '')}
      <div class="hs-card-surface" style="background: ${card.bg}; color: ${card.textColor};">
        <div class="hs-card-quote-wrap">
          <p class="hs-card-quote">&ldquo;${card.quote}&rdquo;</p>
        </div>
        <div class="hs-card-footer">
          <div class="hs-card-divider"></div>
          <div class="hs-card-meta-row">
            <div class="hs-card-explore">
              <span class="hs-card-arrow" aria-hidden="true">&#8599;</span>
              <span class="hs-card-tag">${card.tag}</span>
            </div>
            <span class="hs-card-num">${String(index + 1).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
      ${buildStickerMarkup(card.stickerBottomRight, 'hs-sticker--br', '')}
    `;

    el.addEventListener('mouseenter', () => {
      if (!isSmallScreen) setActive(index);
    });
    el.addEventListener('mouseleave', () => {
      if (!isSmallScreen && activeIndex === index) setActive(null);
    });
    el.addEventListener('focus', () => setActive(index));
    el.addEventListener('blur', () => {
      if (activeIndex === index) setActive(null);
    });
    el.addEventListener('click', () => {
      if (isSmallScreen) {
        setActive(activeIndex === index ? null : index);
      }
    });

    return el;
  };

  const buildLayout = () => {
    const nextSmall = window.innerWidth < BREAKPOINT;
    if (nextSmall === isSmallScreen) {
      if (!isSmallScreen) applyDesktopStyles();
      return;
    }

    isSmallScreen = nextSmall;
    activeIndex = null;
    container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = isSmallScreen ? 'hs-mobile-list' : 'hs-stage';
    stageEl = isSmallScreen ? null : wrapper;

    cardEls = HOVER_STACK_REVIEWS.map((card, index) => {
      const cardEl = createCardElement(card, index);
      wrapper.appendChild(cardEl);
      return cardEl;
    });

    container.appendChild(wrapper);

    if (isSmallScreen) applyMobileStyles();
    else applyDesktopStyles();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape' && activeIndex !== null) {
      setActive(null);
    }
  };

  buildLayout();
  window.addEventListener('resize', buildLayout);
  window.addEventListener('keydown', onKeyDown);

  container._hoverStackCleanup = () => {
    window.removeEventListener('resize', buildLayout);
    window.removeEventListener('keydown', onKeyDown);
  };
}

// --- INITIALIZE THE PEOPLE EXHIBITION (Scene 03: GSAP Flip Card Gallery) ---
function createFlipGalleryItems(photos) {
  return photos.slice(0, 5).map((photo, idx) => ({
    id: photo.id || `people-${idx}`,
    image: photo.full || photo.thumb,
    alt: `${photo.title} — ${photo.location}`,
    title: photo.title,
    meta: `${photo.location} / SoundWave Archive / ${photo.timestamp}`,
    description: photo.caption,
    caption: `Captured on 35mm film at ${photo.location}. Part of the SoundWave Living Archive Collection.`,
  }));
}

function renderPeopleGallery() {
  const container = elements.peopleGrid;
  if (!container) return;

  if (typeof container._flipCleanup === 'function') {
    container._flipCleanup();
  }
  container.innerHTML = '';

  const items = createFlipGalleryItems(PEOPLE_GALLERY);
  if (items.length === 0) return;

  const gsapLib = window.gsap;
  const FlipPlugin = window.Flip;
  if (gsapLib && FlipPlugin) {
    gsapLib.registerPlugin(FlipPlugin);
  }

  const CFG = {
    rounded: 20,
    thumbGap: 11,
    heroHeight: 490,
    duration: 0.7,
    ease: 'power3.inOut',
    stackOffsetX: 5,
    stackOffsetY: 10,
  };

  let order = items.map((_, i) => i);
  let opened = false;
  let isAnimating = false;
  let mobileMode = null;
  let captionTween = null;

  const prefersReduced = () =>
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

  const computeMetrics = (stageWidth) => {
    const isMobile = stageWidth > 0 && stageWidth <= 1025;
    const isNarrow = stageWidth > 0 && stageWidth < 900;
    const scale = isNarrow ? Math.min(1, stageWidth / 900) : 1;
    const railCount = Math.max(items.length - 1, 0);
    const vh = window.innerHeight || 760;
    const stageH = Math.max(520, Math.min(640, Math.round(vh * 0.78)));
    const centerY = Math.round((stageH - 44) / 2);

    const hH = Math.min(CFG.heroHeight, Math.max(380, Math.round(stageH - 84)));
    const hW = Math.min(400, Math.round(hH * 0.81), Math.round(stageWidth * 0.36));

    const gap = Math.round(CFG.thumbGap * scale);
    const maxRailH = hH - 32;
    const tH = Math.min(
      100,
      Math.max(78, Math.floor((maxRailH - Math.max(0, railCount - 1) * gap) / Math.max(1, railCount)))
    );
    const tW = Math.round(tH * 0.92);

    const railX = Math.max(36, Math.round(stageWidth * 0.048));
    const rightInset = Math.max(82, Math.round(stageWidth * 0.065));
    const heroX = stageWidth - hW - rightInset;

    const stackHeight = Math.min(355, Math.max(275, Math.round(hH * 0.76)));
    const stackWidth = Math.round(stackHeight * 0.74);

    return {
      isMobile,
      isNarrow,
      scale,
      railCount,
      tW,
      tH,
      gap,
      hW,
      hH,
      railX,
      heroX,
      stackWidth,
      stackHeight,
      stageH,
      centerY,
    };
  };

  let desktopEls = null;
  let mobileEls = null;

  const updateTextDOM = (textEls, counterCurEl, itemIndex) => {
    const active = items[itemIndex];
    if (!active) return;
    if (counterCurEl) {
      counterCurEl.textContent = String(itemIndex + 1).padStart(2, '0');
    }
    textEls.title.textContent = active.title;
    textEls.meta.textContent = active.meta;
    textEls.desc.textContent = active.description;
    textEls.caption.textContent = active.caption;
  };

  const transitionText = (contentEl, textEls, counterCurEl, itemIndex) => {
    const targets = contentEl.querySelectorAll('[data-card-text]');
    if (!gsapLib || prefersReduced()) {
      updateTextDOM(textEls, counterCurEl, itemIndex);
      if (gsapLib) gsapLib.set(targets, { opacity: 1, y: 0 });
      return;
    }

    if (captionTween) captionTween.kill();
    captionTween = gsapLib.to(targets, {
      opacity: 0,
      y: -8,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        updateTextDOM(textEls, counterCurEl, itemIndex);
        captionTween = gsapLib.fromTo(
          targets,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: 'power3.out',
          }
        );
      },
    });
  };

  const applyDesktopLayout = () => {
    if (!desktopEls) return;
    const stageWidth = container.clientWidth || window.innerWidth;
    const m = computeMetrics(stageWidth);
    const centerY = m.centerY;

    container.style.minHeight = `${m.stageH}px`;
    desktopEls.stage.style.minHeight = `${m.stageH}px`;
    desktopEls.stage.classList.toggle('is-collapsed', !opened);

    desktopEls.counter.style.left = `${m.railX}px`;
    desktopEls.counter.style.top = '14px';
    desktopEls.counter.style.opacity = opened ? '1' : '0';
    desktopEls.counter.style.pointerEvents = opened ? 'auto' : 'none';

    const contentLeft = m.railX + m.tW + Math.max(40, Math.round(stageWidth * 0.045));
    const contentMaxW = Math.max(220, m.heroX - contentLeft - 40);
    desktopEls.content.style.left = `${contentLeft}px`;
    desktopEls.content.style.top = `${centerY}px`;
    desktopEls.content.style.maxWidth = `${contentMaxW}px`;
    desktopEls.content.style.display = m.isNarrow ? 'none' : 'block';
    desktopEls.content.style.opacity = opened ? '1' : '0';

    desktopEls.hint.textContent = opened
      ? 'Click any frame to swap it in,\nor click background to stack'
      : 'Click the stack to spread it out,\nthen any frame to swap it in';

    const heroItemIndex = order[0];
    const railHeight = m.railCount * m.tH + Math.max(0, m.railCount - 1) * m.gap;
    const railCenterY = centerY + 14;
    const stackTotalOffsetY = (items.length - 1) * CFG.stackOffsetY;

    desktopEls.cards.forEach((card, itemIndex) => {
      const slot = order.indexOf(itemIndex);
      const isHero = itemIndex === heroItemIndex;
      card.classList.toggle('is-hero', opened && isHero);
      card.setAttribute('aria-current', opened && isHero ? 'true' : 'false');
      card.tabIndex = !opened ? (slot === 0 ? 0 : -1) : (isHero ? -1 : 0);
      card.setAttribute(
        'aria-label',
        opened ? `${items[itemIndex].title} — ${items[itemIndex].meta}` : `Open gallery — ${items.length} frames`
      );

      card.style.transform = 'none';
      if (!opened) {
        card.style.left = `${Math.round(stageWidth / 2 - m.stackWidth / 2 + slot * CFG.stackOffsetX)}px`;
        card.style.top = `${Math.round(centerY - m.stackHeight / 2 - stackTotalOffsetY / 2 + slot * CFG.stackOffsetY)}px`;
        card.style.width = `${m.stackWidth}px`;
        card.style.height = `${m.stackHeight}px`;
        card.style.borderRadius = `${Math.round(CFG.rounded * 0.85 * m.scale)}px`;
        card.style.zIndex = String(items.length - slot);
      } else if (slot === 0) {
        card.style.left = `${m.heroX}px`;
        card.style.top = `${centerY - m.hH / 2}px`;
        card.style.width = `${m.hW}px`;
        card.style.height = `${m.hH}px`;
        card.style.borderRadius = `${Math.round(CFG.rounded * m.scale)}px`;
        card.style.zIndex = String(items.length + 1);
      } else {
        card.style.left = `${m.railX}px`;
        card.style.top = `${Math.round(railCenterY - railHeight / 2 + (slot - 1) * (m.tH + m.gap))}px`;
        card.style.width = `${m.tW}px`;
        card.style.height = `${m.tH}px`;
        card.style.borderRadius = `${Math.round(CFG.rounded * 0.65 * m.scale)}px`;
        card.style.zIndex = String(items.length - slot);
      }
    });
  };

  const runDesktopFlip = (mutateState, opts = {}) => {
    if (!desktopEls || isAnimating) return;
    if (!gsapLib || !FlipPlugin || prefersReduced()) {
      mutateState();
      applyDesktopLayout();
      return;
    }

    const cardEls = order.map((idx) => desktopEls.cards[idx]);
    const flipState = FlipPlugin.getState(cardEls, { props: 'borderRadius' });
    mutateState();
    applyDesktopLayout();

    isAnimating = true;
    FlipPlugin.from(flipState, {
      duration: opts.duration ?? CFG.duration,
      ease: CFG.ease,
      absolute: true,
      props: 'borderRadius',
      stagger: opts.stagger ?? 0,
      onComplete: () => {
        isAnimating = false;
      },
    });
  };

  const selectItem = (itemIndex) => {
    if (itemIndex === order[0] || isAnimating) return;
    playSubtlePulse(180, 0.12);

    const swapOrder = () => {
      const next = [...order];
      const from = next.indexOf(itemIndex);
      next[from] = next[0];
      next[0] = itemIndex;
      order = next;
    };

    if (mobileMode) {
      swapOrder();
      updateMobileView();
      return;
    }

    runDesktopFlip(swapOrder);
    transitionText(desktopEls.content, desktopEls.text, desktopEls.counterCur, itemIndex);
  };

  const openStack = () => {
    if (opened || isAnimating || mobileMode) return;
    playSubtlePulse(160, 0.14);
    runDesktopFlip(() => {
      opened = true;
    }, { duration: CFG.duration, stagger: 0.04 });
  };

  const closeStack = () => {
    if (!opened || isAnimating || mobileMode) return;
    playSubtlePulse(110, 0.12);
    runDesktopFlip(() => {
      opened = false;
    }, { duration: CFG.duration * 0.9, stagger: { each: 0.035, from: 'end' } });
  };

  const updateMobileView = () => {
    if (!mobileEls) return;
    const heroIdx = order[0];
    const heroItem = items[heroIdx];
    mobileEls.heroImg.src = heroItem.image;
    mobileEls.heroImg.alt = heroItem.alt;
    transitionText(mobileEls.content, mobileEls.text, mobileEls.counterCur, heroIdx);

    mobileEls.thumbsWrap.innerHTML = '';
    order.slice(1).forEach((itemIndex) => {
      const item = items[itemIndex];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hxs-flip-mobile-thumb';
      btn.setAttribute('aria-label', `${item.title} — ${item.meta}`);
      btn.innerHTML = `<img src="${item.image}" alt="${item.alt}" draggable="false" />`;
      btn.addEventListener('click', () => selectItem(itemIndex));
      mobileEls.thumbsWrap.appendChild(btn);
    });
  };

  const buildDesktop = () => {
    container.innerHTML = '';
    container.style.minHeight = '';
    mobileEls = null;
    mobileMode = false;

    const counter = document.createElement('div');
    counter.className = 'hxs-flip-counter';
    const counterCur = document.createElement('span');
    counterCur.className = 'hxs-flip-counter-current';
    counterCur.textContent = String(order[0] + 1).padStart(2, '0');
    const counterTotal = document.createElement('span');
    counterTotal.className = 'hxs-flip-counter-total';
    counterTotal.textContent = ` / ${String(items.length).padStart(2, '0')}`;
    counter.append(counterCur, counterTotal);

    const stage = document.createElement('div');
    stage.className = 'hxs-flip-stage';
    stage.addEventListener('click', (e) => {
      if (e.target === stage) closeStack();
    });

    const content = document.createElement('div');
    content.className = 'hxs-flip-content';
    content.innerHTML = `
      <h4 class="hxs-flip-title" data-card-text></h4>
      <p class="hxs-flip-meta" data-card-text></p>
      <p class="hxs-flip-desc" data-card-text></p>
      <p class="hxs-flip-caption" data-card-text></p>
    `;
    const textEls = {
      title: content.querySelector('.hxs-flip-title'),
      meta: content.querySelector('.hxs-flip-meta'),
      desc: content.querySelector('.hxs-flip-desc'),
      caption: content.querySelector('.hxs-flip-caption'),
    };
    updateTextDOM(textEls, counterCur, order[0]);

    const cards = items.map((item, itemIndex) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hxs-flip-card';
      btn.dataset.flipId = `hxs-card-${item.id}`;
      btn.innerHTML = `<img src="${item.image}" alt="${item.alt}" draggable="false" />`;
      btn.addEventListener('click', () => (opened ? selectItem(itemIndex) : openStack()));
      stage.appendChild(btn);
      return btn;
    });

    const hint = document.createElement('p');
    hint.className = 'hxs-flip-hint';

    stage.append(content, hint);
    container.append(counter, stage);

    desktopEls = { counter, counterCur, stage, content, text: textEls, cards, hint };
    applyDesktopLayout();
  };

  const buildMobile = () => {
    container.innerHTML = '';
    container.style.minHeight = '';
    desktopEls = null;
    mobileMode = true;

    const wrap = document.createElement('div');
    wrap.className = 'hxs-flip-mobile-wrap';

    const counter = document.createElement('div');
    counter.className = 'hxs-flip-counter';
    const counterCur = document.createElement('span');
    counterCur.className = 'hxs-flip-counter-current';
    const counterTotal = document.createElement('span');
    counterTotal.className = 'hxs-flip-counter-total';
    counterTotal.textContent = ` / ${String(items.length).padStart(2, '0')}`;
    counter.append(counterCur, counterTotal);

    const heroBox = document.createElement('div');
    heroBox.className = 'hxs-flip-mobile-hero';
    const heroImg = document.createElement('img');
    heroImg.draggable = false;
    heroBox.appendChild(heroImg);

    const content = document.createElement('div');
    content.className = 'hxs-flip-content';
    content.innerHTML = `
      <h4 class="hxs-flip-title" data-card-text></h4>
      <p class="hxs-flip-meta" data-card-text></p>
      <p class="hxs-flip-desc" data-card-text></p>
      <p class="hxs-flip-caption" data-card-text></p>
    `;
    const textEls = {
      title: content.querySelector('.hxs-flip-title'),
      meta: content.querySelector('.hxs-flip-meta'),
      desc: content.querySelector('.hxs-flip-desc'),
      caption: content.querySelector('.hxs-flip-caption'),
    };

    const thumbsWrap = document.createElement('div');
    thumbsWrap.className = 'hxs-flip-mobile-thumbs';

    wrap.append(counter, heroBox, content, thumbsWrap);
    container.appendChild(wrap);

    mobileEls = { counterCur, heroImg, content, text: textEls, thumbsWrap };
    updateTextDOM(textEls, counterCur, order[0]);
    updateMobileView();
  };

  const syncModeAndLayout = () => {
    const width = container.clientWidth || window.innerWidth;
    const nextIsMobile = width <= 1025;
    if (nextIsMobile && mobileMode !== true) {
      buildMobile();
    } else if (!nextIsMobile && mobileMode !== false) {
      buildDesktop();
    } else if (!nextIsMobile && !isAnimating) {
      applyDesktopLayout();
    }
  };

  syncModeAndLayout();

  const ro = new ResizeObserver(() => syncModeAndLayout());
  ro.observe(container);

  const onKeyDown = (e) => {
    if (e.key === 'Escape' && opened && !mobileMode) {
      const rect = container.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
      if (inView || container.contains(document.activeElement)) {
        closeStack();
      }
      return;
    }

    if (!opened || mobileMode) return;
    const isArrowLR = e.key === 'ArrowRight' || e.key === 'ArrowLeft';
    const isArrowUD = e.key === 'ArrowDown' || e.key === 'ArrowUp';
    const hasFocus = container.contains(document.activeElement);
    const rect = container.getBoundingClientRect();
    const centeredInView = rect.top < window.innerHeight * 0.55 && rect.bottom > window.innerHeight * 0.45;

    if ((isArrowLR && (hasFocus || centeredInView)) || (isArrowUD && hasFocus)) {
      e.preventDefault();
      const step = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : -1;
      const nextItemIndex = (order[0] + step + items.length) % items.length;
      selectItem(nextItemIndex);
    }
  };

  window.addEventListener('keydown', onKeyDown);

  container._flipCleanup = () => {
    ro.disconnect();
    window.removeEventListener('keydown', onKeyDown);
    if (captionTween) captionTween.kill();
  };
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
      // In Scene 04 Frequency Field: sleek muted archival monochrome waves
      ctx4.strokeStyle = layer === 0 ? 'rgba(244, 237, 224, 0.45)' : (layer === 1 ? 'rgba(244, 237, 224, 0.28)' : 'rgba(244, 237, 224, 0.16)');

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
  const sceneList = Array.from(elements.scenes);

  // Robust scroll spy that accurately tracks which section is in view regardless of section height
  function updateActiveSceneOnScroll() {
    const scrollPos = window.scrollY + window.innerHeight * 0.4;
    let currentIdx = 0;

    sceneList.forEach((scene, idx) => {
      const top = scene.offsetTop;
      if (scrollPos >= top) {
        currentIdx = idx;
      }
    });

    if (state.activeScene !== currentIdx) {
      state.activeScene = currentIdx;
      elements.railDots.forEach((dot, dIdx) => {
        dot.classList.toggle('active', dIdx === currentIdx);
      });
      playSubtlePulse(90 + currentIdx * 25, 0.12);
    }
  }

  window.addEventListener('scroll', updateActiveSceneOnScroll, { passive: true });
  // Initial check
  updateActiveSceneOnScroll();

  // Rail dot click navigation
  elements.railDots.forEach((dot, idx) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute('data-target');
      const targetScene = document.getElementById(targetId);
      if (targetScene) {
        targetScene.scrollIntoView({ behavior: 'smooth' });
        state.activeScene = idx;
        elements.railDots.forEach((d, dIdx) => {
          d.classList.toggle('active', dIdx === idx);
        });
      }
    });
  });
}

// --- EXIT TRANSITION INTO HOMEPAGE (index.html) ---
function setupEnterTransition() {
  function handleFestivalTransition(e) {
    if (e) e.preventDefault();
    playSubtlePulse(320, 0.4);
    sessionStorage.setItem('sw_archive_seen', 'true');

    if (elements.veil) {
      elements.veil.classList.add('active');
    }

    setTimeout(() => {
      window.location.href = './index.html';
    }, 780);
  }

  if (elements.btnEnter) {
    elements.btnEnter.addEventListener('click', handleFestivalTransition);
  }

  // Also handle "Skip to Festival" link in top HUD
  const btnSkip = document.getElementById('btn-skip-to-festival');
  if (btnSkip) {
    btnSkip.addEventListener('click', handleFestivalTransition);
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

// --- DJ MIXER DROP AUDIO SYNTHESIS ---
function playDjDropSound() {
  if (!state.audioCtx) return;
  try {
    const ctx = state.audioCtx;

    // 1. DJ Play transient & Punchy Sub Kick (130Hz -> 32Hz deep 808 drop)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(130, ctx.currentTime);
    subOsc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.35);
    subGain.gain.setValueAtTime(0.35, ctx.currentTime);
    subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start();
    subOsc.stop(ctx.currentTime + 0.48);

    // 2. Vinyl/jogwheel cue sweep (highpass filter sweep mimicking a crisp cue touch)
    const bufferSize = Math.floor(ctx.sampleRate * 0.35);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.08;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const sweepFilter = ctx.createBiquadFilter();
    sweepFilter.type = 'bandpass';
    sweepFilter.frequency.setValueAtTime(450, ctx.currentTime);
    sweepFilter.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.3);
    sweepFilter.Q.setValueAtTime(3.5, ctx.currentTime);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.12, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);

    noiseSource.connect(sweepFilter);
    sweepFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSource.start(ctx.currentTime);

    // 3. Resonant synth chord opening into the festival archive (D Minor 9th: 146.8Hz, 220Hz, 261.6Hz, 329.6Hz)
    [146.83, 220.0, 261.63, 329.63].forEach((f, idx) => {
      const chordOsc = ctx.createOscillator();
      const chordGain = ctx.createGain();
      chordOsc.type = 'triangle';
      chordOsc.frequency.setValueAtTime(f, ctx.currentTime + 0.06);
      chordGain.gain.setValueAtTime(0.001, ctx.currentTime + 0.06);
      chordGain.gain.linearRampToValueAtTime(0.08 / (idx + 1), ctx.currentTime + 0.25);
      chordGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);
      chordOsc.connect(chordGain);
      chordGain.connect(ctx.destination);
      chordOsc.start(ctx.currentTime + 0.06);
      chordOsc.stop(ctx.currentTime + 1.7);
    });
  } catch (e) {
    console.warn("DJ drop audio error:", e);
  }
}

// --- OPTION 1: DJ MIXER GATEWAY CONTROLLER (SPLIT SHUTTER PORTAL) ---
function setupDjGateway() {
  const gateway = document.getElementById('dj-gateway');
  const mixer = document.getElementById('dj-mixer-unit');
  const sceneSignal = document.getElementById('scene-signal');
  const hud = document.querySelector('.archive-hud');

  if (!gateway || !mixer) return;

  let isActivating = false;

  function triggerDjDrop() {
    if (isActivating) return;
    isActivating = true;

    // Initialize audio context on user interaction
    initAudio();

    // 1. Mixer zooms forward towards camera with deep bass blur
    mixer.classList.add('dj-activating');

    // Ensure page is pinned strictly to top before revealing archive
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 2. Play punchy DJ drop sound
    playDjDropSound();

    // 3. Split shutters smoothly part open up and down
    setTimeout(() => {
      gateway.classList.add('dj-opening');
      if (sceneSignal) {
        sceneSignal.classList.add('scene-revealed');
      }
    }, 140);

    // 4. Reveal top HUD smoothly
    setTimeout(() => {
      if (hud) {
        hud.classList.add('hud-revealed');
      }
    }, 350);

    // 5. Dismiss gateway overlay and unlock scroll
    setTimeout(() => {
      gateway.classList.add('portal-dismissed');
      document.body.classList.remove('dj-portal-locked');
      window.scrollTo(0, 0);
    }, 980);

    // 6. Clean up after transition completes
    setTimeout(() => {
      gateway.style.display = 'none';
    }, 1300);
  }

  // Click & Keydown triggers on the DJ mixer
  mixer.addEventListener('click', triggerDjDrop);
  mixer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerDjDrop();
    }
  });
}

// --- DOM BOOT ---
window.addEventListener('DOMContentLoaded', () => {
  setupDjGateway();
  renderArchiveTable();
  renderPeopleGallery();
  initFrequencyCanvas();
  initSceneObserver();
  setupEnterTransition();
});
