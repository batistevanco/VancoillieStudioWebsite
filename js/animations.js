/**
 * Vancoillie Studio — Shared GSAP Animations
 * Tiles animate as a GROUP from the grid container (faster, no late triggers).
 * Standalone fade-in elements fire as soon as they enter the viewport.
 */
(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  /* ── Grid containers ──────────────────────────────────────────
     Animates ALL children at once from the parent container's
     scroll position. This means the whole row of tiles appears
     together the moment the grid scrolls into view.
  ────────────────────────────────────────────────────────────── */
  var GRID_SELECTORS = [
    '.feature-grid',
    '.card-grid',
    '.software-grid',
    '.steps-grid',
    '.extras-grid',
    '.pricing-grid',
    '.pricing-grid-3',
    '.logo-grid',
    '.invoxa-check-list'
  ].join(', ');

  document.querySelectorAll(GRID_SELECTORS).forEach(function (grid) {
    var children = Array.from(grid.children);
    // Start with opacity 0 / shifted down
    gsap.set(children, { opacity: 0, y: 20 });

    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.55,
      stagger: 0.07,         // fast stagger between siblings
      ease: 'power2.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 90%',   // fires when grid top is 90% down the viewport
        once: true
      }
    });
  });

  /* ── Standalone .fade-in elements ────────────────────────────
     Fires as soon as the element's top edge enters the viewport.
     Skip elements that live inside a grid (those are handled above).
  ────────────────────────────────────────────────────────────── */
  gsap.utils.toArray('.fade-in').forEach(function (el) {
    // If the element is inside one of the grid containers, skip it
    if (el.closest(GRID_SELECTORS)) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',  // fires the instant the element enters the viewport
          once: true
        }
      }
    );
  });

  /* ── Metric counters ──────────────────────────────────────────────
     Animate number counters when section scrolls into view.
  ────────────────────────────────────────────────────────────────── */
  gsap.utils.toArray('.metric-number').forEach(function (el) {
    var target = parseInt(el.dataset.target, 10);
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true
      },
      textContent: 0,
      duration: 2,
      ease: 'power2.out',
      snap: { textContent: 1 },
      onUpdate: function() {
        el.textContent = Math.ceil(this.targets()[0].textContent);
      }
    });
  });

})();

/* ── Back to top button ────────────────────────────────────────────── */
(function() {
  var backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
})();
