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
      duration: 1.2,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
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
          offset: -72,
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

  document.addEventListener("DOMContentLoaded", function () {
    initLenisSmoothScroll();
    initBlurInHeadlines();
    initInteractiveCarousels();
  });
})();
