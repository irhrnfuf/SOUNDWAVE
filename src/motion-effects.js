/* ==========================================================================
   SOUNDWAVE 2026 — Smooth Inertia Scroll (Lenis) & Blur-In Headline Reveals
   ========================================================================== */
(function () {
  "use strict";

  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initLenisSmoothScroll() {
    if (prefersReducedMotion || typeof window.Lenis !== "function") {
      return null;
    }

    const lenis = new window.Lenis({
      duration: 0.72,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.5,
      prevent: function (node) {
        // Allow native scrolling inside modals, dialogs, and custom scroll containers
        return Boolean(
          node.closest &&
            node.closest(
              "[data-lenis-prevent], .order-modal-backdrop, dialog, .schedule-items-list"
            )
        );
      }
    });

    window.soundwaveLenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth inertia scroll for in-page anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;

        e.preventDefault();
        lenis.scrollTo(targetEl, {
          offset: -24,
          duration: 1.25
        });
      });
    });

    return lenis;
  }

  function initBlurInHeadlines() {
    const headlineSelectors = [
      ".big-hero-title",
      ".deck-copy-col h2",
      ".panel-header h2",
      ".welcome-hero-copy h1",
      ".lolla-poster-banner h2",
      ".stage-card h3",
      ".footer-festival-title"
    ];

    const targets = Array.from(
      document.querySelectorAll(headlineSelectors.join(", "))
    );

    if (targets.length === 0) return;

    if (prefersReducedMotion || typeof window.IntersectionObserver !== "function") {
      targets.forEach(function (el) {
        el.classList.add("blur-in-visible");
      });
      return;
    }

    const hasEntranceCurtain = Boolean(document.querySelector(".entrance-curtain"));
    const heroTargets = [];
    const scrollTargets = [];

    targets.forEach(function (el) {
      el.classList.add("blur-reveal");
      if (el.classList.contains("big-hero-title")) {
        el.classList.add("blur-reveal--hero");
        heroTargets.push(el);
      } else {
        scrollTargets.push(el);
      }
    });

    // Reveal hero title smoothly on entry (synced with entrance curtain if present)
    if (heroTargets.length > 0) {
      const heroDelay = hasEntranceCurtain ? 320 : 80;
      setTimeout(function () {
        requestAnimationFrame(function () {
          heroTargets.forEach(function (el) {
            el.classList.add("blur-in-visible");
          });
        });
      }, heroDelay);
    }

    // Reveal section headlines as they scroll into view
    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("blur-in-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -36px 0px"
      }
    );

    scrollTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initInteractiveCarousels() {
    document.querySelectorAll(".sw-carousel").forEach(function (carousel) {
      const slides = Array.from(carousel.querySelectorAll(".sw-carousel-slide"));
      const pills = Array.from(carousel.querySelectorAll(".sw-carousel-pill"));
      const dots = Array.from(carousel.querySelectorAll(".sw-carousel-dot"));
      const prevBtn = carousel.querySelector('.sw-carousel-arrow[data-dir="-1"]');
      const nextBtn = carousel.querySelector('.sw-carousel-arrow[data-dir="1"]');

      if (slides.length === 0) return;

      let activeIndex = slides.findIndex(function (s) {
        return s.classList.contains("is-active");
      });
      if (activeIndex < 0) activeIndex = 0;

      function setSlide(newIndex) {
        activeIndex = (newIndex + slides.length) % slides.length;
        slides.forEach(function (slide, idx) {
          slide.classList.toggle("is-active", idx === activeIndex);
        });
        pills.forEach(function (pill, idx) {
          const isMatch = idx === activeIndex;
          pill.classList.toggle("is-active", isMatch);
          pill.setAttribute("aria-selected", isMatch ? "true" : "false");
        });
        dots.forEach(function (dot, idx) {
          const isMatch = idx === activeIndex;
          dot.classList.toggle("is-active", isMatch);
          dot.setAttribute("aria-current", isMatch ? "true" : "false");
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", function () {
          setSlide(activeIndex - 1);
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          setSlide(activeIndex + 1);
        });
      }

      pills.forEach(function (pill, idx) {
        pill.addEventListener("click", function () {
          setSlide(idx);
        });
      });

      dots.forEach(function (dot, idx) {
        dot.addEventListener("click", function () {
          setSlide(idx);
        });
      });

      carousel.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setSlide(activeIndex - 1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setSlide(activeIndex + 1);
        }
      });

      setSlide(activeIndex);
    });
  }

  function getPixelIconSvg(href, isCta) {
    // Crisp 16x16 pixelated SVG icons matching retro pixel-grid style
    if (isCta) {
      // Pixel Star / Sparkle
      return '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="7" y="1" width="2" height="3"/><rect x="7" y="12" width="2" height="3"/><rect x="1" y="7" width="3" height="2"/><rect x="12" y="7" width="3" height="2"/><rect x="5" y="5" width="6" height="6"/><rect x="3" y="3" width="2" height="2"/><rect x="11" y="3" width="2" height="2"/><rect x="3" y="11" width="2" height="2"/><rect x="11" y="11" width="2" height="2"/></svg>';
    }
    if (href.includes("index.html")) {
      // Pixel Home / Welcome Hub
      return '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="7" y="2" width="2" height="2"/><rect x="5" y="4" width="6" height="2"/><rect x="3" y="6" width="10" height="2"/><rect x="3" y="8" width="3" height="6"/><rect x="10" y="8" width="3" height="6"/><rect x="6" y="8" width="4" height="2"/><rect x="6" y="12" width="4" height="2"/></svg>';
    }
    if (href.includes("lineup.html")) {
      // Pixel Music Eighth-Note
      return '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="6" y="2" width="7" height="2"/><rect x="6" y="4" width="2" height="7"/><rect x="11" y="4" width="2" height="6"/><rect x="3" y="10" width="5" height="4"/><rect x="9" y="9" width="4" height="4"/></svg>';
    }
    if (href.includes("schedule-builder.html")) {
      // Pixel Clock / Timetable
      return '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="5" y="2" width="6" height="2"/><rect x="5" y="12" width="6" height="2"/><rect x="2" y="5" width="2" height="6"/><rect x="12" y="5" width="2" height="6"/><rect x="4" y="4" width="1" height="1"/><rect x="11" y="4" width="1" height="1"/><rect x="4" y="11" width="1" height="1"/><rect x="11" y="11" width="1" height="1"/><rect x="7" y="4" width="2" height="5"/><rect x="9" y="7" width="2" height="2"/></svg>';
    }
    if (href.includes("stage")) {
      // Pixel Equalizer / Stages
      return '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="2" y="9" width="3" height="5"/><rect x="6" y="3" width="3" height="11"/><rect x="10" y="6" width="3" height="8"/><rect x="2" y="6" width="3" height="2"/><rect x="10" y="3" width="3" height="2"/></svg>';
    }
    if (href.includes("passes.html")) {
      // Pixel Ticket / Diamond Pass
      return '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="2" y="4" width="12" height="2"/><rect x="2" y="10" width="12" height="2"/><rect x="2" y="6" width="2" height="4"/><rect x="12" y="6" width="2" height="4"/><rect x="6" y="7" width="4" height="2"/><rect x="9" y="5" width="2" height="1"/><rect x="9" y="10" width="2" height="1"/></svg>';
    }
    if (href.includes("shuttles-orders.html")) {
      // Pixel Lightning / Express Transit
      return '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="8" y="1" width="3" height="2"/><rect x="6" y="3" width="4" height="2"/><rect x="4" y="5" width="5" height="2"/><rect x="3" y="7" width="10" height="2"/><rect x="7" y="9" width="4" height="2"/><rect x="6" y="11" width="3" height="2"/><rect x="5" y="13" width="2" height="2"/></svg>';
    }
    return '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="3" y="3" width="10" height="10"/></svg>';
  }

  function getExpandArrowSvg(isExpanded) {
    // Crisp 16x16 pixelated vinyl record icon (pink label when collapsed, bright gold when expanded)
    const labelColor = isExpanded ? "#ffe600" : "#ff2a85";
    const grooveColor = isExpanded ? "#ffe600" : "#f7b2d4";
    return (
      '<svg viewBox="0 0 16 16" width="26" height="26" style="shape-rendering:crispEdges; display:block;" aria-hidden="true">' +
      // Outer pixel vinyl disc silhouette
      '<rect x="5" y="1" width="6" height="1" fill="#ffffff"/>' +
      '<rect x="3" y="2" width="10" height="1" fill="#ffffff"/>' +
      '<rect x="2" y="3" width="12" height="2" fill="#2a2628"/>' +
      '<rect x="1" y="5" width="14" height="6" fill="#2a2628"/>' +
      '<rect x="2" y="11" width="12" height="2" fill="#2a2628"/>' +
      '<rect x="3" y="13" width="10" height="1" fill="#ffffff"/>' +
      '<rect x="5" y="14" width="6" height="1" fill="#ffffff"/>' +
      // Pixel outer rim sides
      '<rect x="1" y="5" width="1" height="6" fill="#ffffff"/>' +
      '<rect x="14" y="5" width="1" height="6" fill="#ffffff"/>' +
      '<rect x="2" y="3" width="1" height="2" fill="#ffffff"/>' +
      '<rect x="13" y="3" width="1" height="2" fill="#ffffff"/>' +
      '<rect x="2" y="11" width="1" height="2" fill="#ffffff"/>' +
      '<rect x="13" y="11" width="1" height="2" fill="#ffffff"/>' +
      // Pixel groove highlights
      '<rect x="4" y="4" width="2" height="1" fill="' + grooveColor + '"/>' +
      '<rect x="3" y="5" width="1" height="2" fill="' + grooveColor + '"/>' +
      '<rect x="12" y="9" width="1" height="2" fill="' + grooveColor + '"/>' +
      '<rect x="10" y="11" width="2" height="1" fill="' + grooveColor + '"/>' +
      // Center pixel label
      '<rect x="6" y="5" width="4" height="6" fill="' + labelColor + '"/>' +
      '<rect x="5" y="6" width="6" height="4" fill="' + labelColor + '"/>' +
      // Center spindle hole
      '<rect x="7" y="7" width="2" height="2" fill="#161415"/>' +
      "</svg>"
    );
  }

  function initToggleSidebar() {
    const nav = document.querySelector(".sticky-navbar");
    if (!nav || nav.classList.contains("sw-rail-sidebar")) return;

    nav.classList.add("sw-rail-sidebar");
    nav.setAttribute("data-lenis-prevent", "");
    document.body.classList.add("has-sw-rail");

    const navInner = nav.querySelector(".nav-inner");
    const brandLink = navInner ? navInner.querySelector(".brand-link") : null;

    // Expand / Retract button at the top of the rail
    const expandBtn = document.createElement("button");
    expandBtn.type = "button";
    expandBtn.className = "sw-rail-expand-btn";
    expandBtn.setAttribute("aria-expanded", "false");
    expandBtn.setAttribute("aria-label", "Expand navigation sidebar");
    expandBtn.setAttribute("title", "Expand / Collapse Sidebar");
    expandBtn.innerHTML = getExpandArrowSvg(false);

    if (navInner && brandLink) {
      const headerRow = document.createElement("div");
      headerRow.className = "sw-rail-header";
      navInner.insertBefore(headerRow, brandLink);
      headerRow.appendChild(brandLink);
      headerRow.appendChild(expandBtn);
    } else if (navInner) {
      navInner.prepend(expandBtn);
    }

    // Inject pixelated icons + hover tooltips into each nav link
    nav.querySelectorAll("ul li a").forEach(function (link) {
      const rawText = (link.textContent || "").trim();
      const cleanLabel = rawText.replace(/^[←→\s]+|[←→\s]+$/g, "").trim() || rawText;
      const href = link.getAttribute("href") || "";
      const isCta = link.classList.contains("nav-cta-btn");

      link.setAttribute("data-tooltip", cleanLabel);
      link.setAttribute("aria-label", cleanLabel);
      link.innerHTML =
        '<span class="sw-rail-icon">' +
        getPixelIconSvg(href, isCta) +
        '</span><span class="sw-rail-label">' +
        rawText +
        "</span>";
    });

    // Translucent backdrop when expanded
    const backdrop = document.createElement("div");
    backdrop.className = "sw-rail-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(backdrop);

    function setExpanded(isExpanded) {
      nav.classList.toggle("is-expanded", isExpanded);
      backdrop.classList.toggle("is-open", isExpanded);
      expandBtn.setAttribute("aria-expanded", isExpanded ? "true" : "false");
      expandBtn.setAttribute(
        "aria-label",
        isExpanded ? "Retract navigation sidebar" : "Expand navigation sidebar"
      );
      expandBtn.innerHTML = getExpandArrowSvg(isExpanded);
    }

    expandBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      setExpanded(!nav.classList.contains("is-expanded"));
    });

    // Clicking empty rail space (not a link) also expands/retracts
    nav.addEventListener("click", function (e) {
      if (!e.target.closest("a") && !e.target.closest("button")) {
        setExpanded(!nav.classList.contains("is-expanded"));
      }
    });

    backdrop.addEventListener("click", function () {
      setExpanded(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-expanded")) {
        setExpanded(false);
      }
    });
  }

  function initBitmapFontTester() {
    const STORAGE_KEY = "sw_bitmap_font_preview";
    const options = [
      { id: "jersey", label: "Jersey 15" },
      { id: "jacquard", label: "Jacquard 12" },
      { id: "pixelify", label: "Pixelify" },
      { id: "silkscreen", label: "Silkscreen" },
      { id: "off", label: "Original" }
    ];

    let activeFont = "jersey";
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved && options.some(function (o) { return o.id === saved; })) {
        activeFont = saved;
      }
    } catch (e) {}

    function applyFont(fontId) {
      document.documentElement.setAttribute("data-bitmap-font", fontId);
      try {
        sessionStorage.setItem(STORAGE_KEY, fontId);
      } catch (e) {}
      bar.querySelectorAll("button").forEach(function (btn) {
        btn.classList.toggle("is-active", btn.getAttribute("data-font-id") === fontId);
      });
    }

    const bar = document.createElement("div");
    bar.className = "sw-font-tester";
    bar.setAttribute("aria-label", "Bitmap Typeface Preview Switcher");
    bar.innerHTML =
      '<span class="sw-font-tester-label">Bitmap Test:</span>' +
      options
        .map(function (opt) {
          return (
            '<button type="button" data-font-id="' +
            opt.id +
            '">' +
            opt.label +
            "</button>"
          );
        })
        .join("");

    bar.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyFont(btn.getAttribute("data-font-id"));
      });
    });

    document.body.appendChild(bar);
    applyFont(activeFont);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initBitmapFontTester();
    initToggleSidebar();
    initLenisSmoothScroll();
    initBlurInHeadlines();
    initInteractiveCarousels();
  });
})();
