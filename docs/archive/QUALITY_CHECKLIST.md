# QUALITY CHECKLIST - MIKKI-MASE.COM v2

**Use this checklist for EVERY page before considering it done.**

## Design System Compliance

- [ ] **Typography:** All headings use defined scale (H1-H4), no ad-hoc font sizes
- [ ] **Spacing:** All padding/margins use design tokens (spacing-4, spacing-8, etc.), no magic numbers
- [ ] **Colors:** Only use colors from palette (black, gold, red, grays), no random hex codes
- [ ] **Max-width:** Content respects 1200px container, no random max-width values
- [ ] **Breakpoints:** Responsive behavior tested at 640px, 768px, 1024px, 1280px

## Mobile-First

- [ ] **Tested on mobile viewport** (375px width minimum)
- [ ] **Typography readable** on small screens (16px body text minimum)
- [ ] **Tap targets ≥ 44px** for all interactive elements
- [ ] **No horizontal scroll** at any viewport width
- [ ] **Content hierarchy** clear on mobile (most important content first)

## Visual Quality

- [ ] **Hero imagery** intentional and impactful (not generic stock spam)
- [ ] **Spacing rhythm** consistent (sections breathe, no cramming)
- [ ] **Alignment** perfect (no misaligned elements, use grid)
- [ ] **Numbers formatted** consistently (e.g., `$32M+` not `$32000000`)
- [ ] **No gradient spam** (max 1 subtle gradient per page, if any)

## Component Usage

- [ ] **Using component classes** (.btn, .card, .section) not inline utilities
- [ ] **Consistent button variants** (primary, secondary, tertiary)
- [ ] **Section wrapper** used for all major sections
- [ ] **Header + Footer** included on every page

## Performance

- [ ] **Images optimized** (WebP format, proper sizing)
- [ ] **Lazy loading** on below-fold images
- [ ] **No layout shift** (CLS = 0, width/height specified)
- [ ] **Fonts loading** efficiently (preconnect, display=swap)

## Accessibility

- [ ] **Semantic HTML** (proper heading hierarchy, nav, article, section tags)
- [ ] **Alt text** on all images
- [ ] **Focus states** visible on all interactive elements
- [ ] **Color contrast** meets WCAG AA minimum
- [ ] **Keyboard navigation** works (tab through page logically)

## Interactions

- [ ] **Hover states** smooth and intentional (buttons scale 1.05, cards lift)
- [ ] **Active states** provide feedback (buttons scale 0.95 on click)
- [ ] **Animations** subtle and fast (200-300ms max)
- [ ] **Reduced motion** respected (`prefers-reduced-motion` media query)

## Code Quality

- [ ] **No `!important` hacks** in CSS
- [ ] **No inline styles** (except for dynamic values like background images)
- [ ] **Component props used** for variants, not duplicate code
- [ ] **Clean file structure** (components in /components, pages in /pages)
- [ ] **Comments** only where necessary (code should be self-documenting)

## Content

- [ ] **Copy proofread** (no typos, proper grammar)
- [ ] **Links working** (no dead links, all hrefs point somewhere real)
- [ ] **CTAs clear** (user knows exactly what action to take)
- [ ] **Value prop** obvious (why should user care?)

## Final Checks

- [ ] **Build succeeds** (`npm run build` with no errors)
- [ ] **Dev server works** (`npm run dev` loads without issues)
- [ ] **Lighthouse score** 90+ (run on production build)
- [ ] **Compare to landonorris.com** - does this feel world-class?

---

## Sign-Off

**Page:** ____________________
**Date:** ____________________
**Approved by:** Claude Code / Owner

**Notes:**
(Any specific compromises or future improvements)

---

**Remember:** If it doesn't pass this checklist, it's not done. No exceptions.
