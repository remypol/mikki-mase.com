/**
 * Scroll Reveal - Intersection Observer for entrance animations
 * 2026+ futureproof implementation with performance optimizations
 */

export function initScrollReveal() {
  if (typeof window === 'undefined') return;

  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: just show all elements
    document.querySelectorAll('.scroll-reveal, .observe-once').forEach((el) => {
      el.classList.add('revealed', 'visible');
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
}

// Auto-initialize on DOM ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }
}
