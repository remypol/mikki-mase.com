# Claude Browser — Pre-Paywall Audit Prompt (mikki-mase.com)

Doel: Claude Browser loopt **elke publieke pagina** (alles vóór de paywall) door, documenteert wat hij ziet, en scoort de huidige staat zodat wij daarna een AngelGuard-geïnspireerde rebrand kunnen plannen.

---

## COPY-PASTE PROMPT VOOR CLAUDE BROWSER

```
You are auditing mikki-mase.com (a public marketing site for Mikki Mase — a professional
gambler with $32M+ in baccarat winnings who was banned from 150+ casinos). I need a
comprehensive, brutally honest PRE-PAYWALL audit. DO NOT log in, do not attempt checkout,
do not enter any course/masterclass/bedroom-boss pages. Everything you audit is free/public.

## Pages to visit (in this order)

1.  https://mikki-mase.com/                     (home)
2.  https://mikki-mase.com/story                (founder story)
3.  https://mikki-mase.com/timeline             (life/career timeline)
4.  https://mikki-mase.com/wins                 (verified wins)
5.  https://mikki-mase.com/net-worth            (net worth breakdown)
6.  https://mikki-mase.com/banned               (casino bans list)
7.  https://mikki-mase.com/media                (press + video)
8.  https://mikki-mase.com/the-system           (the system overview)
9.  https://mikki-mase.com/beat-the-casino      (guide)
10. https://mikki-mase.com/baccarat-guide       (guide)
11. https://mikki-mase.com/casino-advantage-play(guide)
12. https://mikki-mase.com/gambling-psychology  (guide)
13. https://mikki-mase.com/cheatsheets          (lead magnet overview)
14. https://mikki-mase.com/glossary             (glossary)
15. https://mikki-mase.com/faq                  (FAQ)
16. https://mikki-mase.com/join                 (telegram / email capture)
17. https://mikki-mase.com/shop                 (storefront — public shelf only)
18. https://mikki-mase.com/tools                (free calculators)
19. https://mikki-mase.com/blog                 (blog index + open 2 posts)
20. https://mikki-mase.com/responsible-gambling
21. https://mikki-mase.com/support
22. https://mikki-mase.com/privacy-policy
23. https://mikki-mase.com/terms
24. https://mikki-mase.com/masterclass          (SALES PAGE ONLY — do not click Buy/Enroll)

## For EVERY page, capture this schema

### A. Identity
- URL
- Page title (<title>) and first H1
- Meta description (first 200 chars)
- Primary intent (awareness / education / social proof / lead capture / sales / legal)

### B. Structure
- Ordered list of sections (top to bottom) with a 1-line description each
- Presence of: header, hero, social proof strip, value props, testimonials, FAQ,
  CTA band, footer, exit-intent modal, sticky CTA, urgency/timer elements
- Above-the-fold: what's the single dominant element (hero image / headline / stat / form)?

### C. Visual system (be precise — read computed CSS when possible)
- Dominant background color(s) (hex)
- Dominant text color(s) (hex)
- Accent / CTA color(s) (hex)
- Font families (headings + body)
- Heading sizes (h1, h2, h3) in px at desktop
- Body font size + line-height
- Border-radius used on cards/buttons
- Shadow style (soft / hard / none)
- Gradient use (yes/no, describe direction + stops)
- Image treatment (raw / desaturated / duotone / vignette / overlay?)

### D. Motion & interaction
- Count-up animations? parallax? 3D tilt? scroll-reveal? video bg?
- Hover states on cards/buttons (describe)
- Page-load perceived speed (LCP feel, any jank)

### E. Copy & tone
- Tone in 3 adjectives (e.g. "aggressive, boastful, streetwise")
- Strongest headline on the page (verbatim)
- Weakest / most generic line on the page (verbatim)
- CTA labels used (list them all verbatim)

### F. Conversion elements
- Where is the primary CTA placed? Is it above the fold?
- Are there secondary CTAs? What do they point to?
- Is there an email capture? What does it offer?
- Is there visible social proof (numbers, logos, testimonials, press)?
- Any friction (dead links, slow images, cookie banner blocking content)?

### G. Mobile check (resize to 390px wide)
- Does the hero still work?
- Are CTAs reachable with thumb?
- Is text readable without zoom?
- Any horizontal scroll / overflow bugs?

### H. Score (1–10) on 6 axes
- Visual polish
- Information clarity
- Trust / credibility signaling
- Conversion pressure (without feeling spammy)
- Mobile quality
- Brand consistency with the rest of the site (does it feel like the same product?)

## After all pages: SYNTHESIS section

Write a synthesis with:

1. **Brand DNA you observed** (5 bullets): what IS the Mikki Mase brand today,
   visually + tonally? What's the "vibe"?

2. **Inconsistency map**: which pages feel like a different website than the others?
   Where does the design break down? List page URLs + what's off.

3. **Top 10 highest-leverage fixes** (ranked), each with:
   - Page + section
   - What's wrong today
   - What a world-class version looks like

4. **Mobile-specific bugs** (if any).

5. **Below-the-fold drop-off risks**: places where a visitor likely bounces.

6. **Trust gaps**: where does the site undersell its credibility (real wins, real
   bans, real press) and where does it oversell in a way that hurts trust?

## Reference benchmark (for your taste calibration)

We are about to rebrand Mikki Mase in the visual spirit of angelguardprayers.com
(our other site, just rebranded). Do NOT copy its religious aesthetic — Mikki is
a high-stakes gambler, not a priest. But borrow the *architectural* properties:

- Semantic color tokens (bg-page / bg-elevated / bg-card / text-primary / accent)
- Serif display headings + clean sans body (AG uses Lora + Inter — Mikki will
  likely use something like Playfair Display or Fraunces for the serif, paired
  with Inter/Satoshi)
- Single strong accent color (AG: gold #C5952E; Mikki equivalent would be a
  money-green or chip-red — flag which you'd recommend based on what you see)
- Hero with soft radial gradient glow, not flat or screaming
- Cards with subtle gradient wash (not flat, not glassmorphism overload)
- Generous whitespace, 18–20px body type, 1.7–1.8 line-height
- Micro-interactions: nav underline-reveal, gentle fade-in, no parallax gimmicks
- Dark/light theme parity via CSS custom properties

Flag any page where the CURRENT design is closer to "2010s affiliate blog" than
"2026 premium brand" and quantify the gap.

## Deliverable format

Return a single markdown document with H2 per page, the H3 sections above, then
the SYNTHESIS block at the bottom. Do not summarize inside page sections — give
me raw observations. Summarize only in the final SYNTHESIS.

## Hard rules
- Do not log in.
- Do not submit any form.
- Do not click "Buy", "Enroll", "Checkout", "Start 7-day".
- If a page redirects to login/paywall, note the URL + redirect target and move on.
- If a page errors (404/500), capture the URL + status and move on.
- Take a screenshot of the hero of each top-10 page and attach it to that page's H2.
```

---

## Nadat Browser klaar is

Geef mij het rapport terug (plak markdown in chat of dump in een file hier). Dan:

1. Ik extract de **visuele architectuur-diff** (AG ↔ Mikki huidig).
2. Ik maak een **rebrand-plan** (tokens, typografie, componenten, pagina-prioriteit).
3. **Dual-review** met Gemini 3.1 Pro + GPT 5.4.
4. Implementeren (Astro componenten + Tailwind tokens).
5. Optioneel: tweede Browser-ronde achter de paywall (masterclass / bedroom-boss / course) als jij test-account geeft of ingelogd browser laat draaien.

---

**Bestand opgeslagen als:**
`/Users/hugolol/Desktop/Mikki Money Mase/mikki-mase.com/CLAUDE-BROWSER-PREPAYWALL-AUDIT.md`
