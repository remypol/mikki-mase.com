/**
 * Scroll Reveal - Intersection Observer for entrance animations
 * 2026+ futureproof implementation with performance optimizations
 */

export function initScrollReveal() {
  if (typeof window === 'undefined') return;

  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: just show all elements
    document.querySelectorAll('.scroll-reveal, .observe-once, .scroll-animate').forEach((el) => {
      el.classList.add('revealed', 'visible', 'is-visible');
    });
    return;
  }

  // Intersection Observer options
  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Trigger when element is 100px from bottom of viewport
    threshold: 0.15 // 15% of element must be visible
  };

  // Create observer for repeating animations
  const repeatObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      } else {
        entry.target.classList.remove('revealed');
      }
    });
  }, options);

  // Create observer for one-time animations
  const onceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Add animation-complete class after animation finishes
        const element = entry.target as HTMLElement;
        const animationDuration = parseFloat(
          window.getComputedStyle(element).getPropertyValue('animation-duration')
        ) * 1000 || 600;

        setTimeout(() => {
          element.classList.add('animation-complete');
        }, animationDuration);

        // Stop observing this element
        onceObserver.unobserve(entry.target);
      }
    });
  }, options);

  // Observe all scroll-reveal elements (repeating)
  document.querySelectorAll('.scroll-reveal').forEach((el) => {
    repeatObserver.observe(el);
  });

  // Observe all observe-once elements (one-time)
  document.querySelectorAll('.observe-once').forEach((el) => {
    onceObserver.observe(el);
  });

  // Observe .scroll-animate elements (one-time) — this class is used in
  // Testimonials.astro, ArticleCTA.astro and defined in global.css with
  // `opacity: 0` waiting for `.is-visible`. Previously unobserved, which
  // left whole homepage sections permanently invisible — user-visible as
  // a big black gap under the Quick Facts cards.
  const revealAnimated = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealAnimated.unobserve(entry.target);
      }
    });
  }, options);
  document.querySelectorAll('.scroll-animate').forEach((el) => {
    revealAnimated.observe(el);
  });

  // Safety net: if an element is already in the viewport when we boot
  // (common on first paint / above-the-fold), force-reveal it immediately
  // instead of waiting for the next scroll event.
  requestAnimationFrame(() => {
    document.querySelectorAll('.scroll-animate').forEach((el) => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-visible');
      }
    });
  });
}

// Note: initScrollReveal() is called from BaseLayout.astro via astro:page-load
