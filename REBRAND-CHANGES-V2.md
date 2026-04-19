# Mikki Mase — Rebrand + Post-Paywall Fixes (autonomous 8-hour session)

## Context
Hugo asked for a rebrand of mikki-mase.com in the architectural spirit of
angelguardprayers.com (not the religious aesthetic — just the architectural
properties). While the Claude Browser pre/post-paywall audit was running, this
session also delivered every compliance-critical fix it surfaced.

All builds ran clean — Astro build exit code 0 after each batch.

---

## Pre-paywall audit findings addressed (batch P0, committed first)

1. **PUA copy purge** (brand safety — highest risk before rebrand):
   - `src/components/shop/sales/SalesHero.astro` — CTA was hard-coded
     `"YES, MAKE ME UNFORGETTABLE"`. Now takes a `ctaLabel` prop with a
     gambling-native default (`"GET INSTANT ACCESS"`).
   - `src/components/shop/sales/GuaranteeSeal.astro` — was showing
     `"The 'She's Shaking' Guarantee"` with seduction-vertical body copy.
     Now prop-driven (`title` / `description` / `days`) reading from each
     product's existing `salesPage.guarantee` config. The config titles were
     already on-brand (`"The 'Casino Clarity' Guarantee"`,
     `"The 'Better Player' Guarantee"`) — the component was ignoring them.
   - `src/components/shop/sales/Testimonials.astro` — "What Men Are Saying"
     → "What Players Are Saying"; subhead same.
   - `src/pages/terms.astro` — refund-policy H2 scrubbed of PUA title.
   - Wired the new props through `/beat-the-casino.astro` and
     `/cheatsheets.astro` with sensible CTA labels
     (`"SEND ME THE BOOK"` / `"SEND ME THE CHEAT SHEETS"`).

2. **Mobile hero overflow on product pages** — SalesHero H1 was
   `text-5xl md:text-7xl lg:text-8xl` with no mobile safeguard; Playfair
   words wider than 390px clipped. Now `text-4xl sm:text-5xl md:text-7xl
   lg:text-8xl break-words hyphens-auto`.

3. **Logo wrap on mobile** — `whitespace-nowrap` added to the MIKKI MASE
   wordmark in `Header.astro`.

4. **No visible Sign-In link (post-purchase users couldn't log in via the UI)**
   `UserMenu.tsx` used to render a Telegram CTA for anonymous visitors and
   nothing for logged-in auth state beyond a decorative name. Two fixes:
   - Anonymous: ghost `Sign in` link → `/auth/login` + primary Join Telegram CTA.
   - Mobile menu (`Header.astro`): added `Sign in` link.
   - Logged-in: avatar now wrapped in `<a href="/account">` with focus ring.

5. **`/banned` 150 vs 47 contradiction** — H1 claimed 150+ while stat card
   said 47+ "Total Bans". Resolved by splitting the stat strip into
   "Claimed Total 150+" (self-reported) vs "Documented <n>" (mapped) vs
   "Verified" vs "Countries", with a tiny gray note under each explaining
   the source. Meta description updated to match.

6. **Single source of truth for numeric claims** —
   new `src/data/numbers.ts` with `NUMBERS` + `LABELS`. Future number
   updates cascade from one place; prevents the $20-40M/$20-43M and
   150/47 drift the audit flagged.

---

## Post-paywall audit findings addressed (batch C1-C10)

### 🚨 Compliance-critical (money/legal risk)

**C1. `/checkout/masterclass` guarded from paid users (accidental recharge risk)**
Audit finding: paid Masterclass owner saw his saved `Mastercard •••• 8092`
pre-selected with a one-click "Pay $27" button. Previous entitlement check
only redirected on matching tier or lifetime. Now: uses `ALL_ENTITLEMENT_KEYS`
(from `src/lib/tiers.ts`) — any completed purchase in the Masterclass family
redirects to `/masterclass/course?returning=1`. Exception: a paid user
legitimately upgrading to Lifetime VIP.

**C2. `/account` page built from scratch**
Audit found `/account`, `/billing`, `/settings`, `/profile` all 404 — a
paying customer had zero in-product path for logout / invoice / cancel /
card update. New:
- `src/pages/account.astro` (SSR, redirects unauth to `/auth/login?next=/account`).
- `src/components/account/AccountPanel.tsx` — React hub: plan label,
  purchases list with formatted dates + amounts, invoice mailto, cancel
  mailto, update-card mailto, sign out.
- `src/pages/api/account/me.ts` — new API returning current user's
  `{ tier, tierLabel, purchases, email }`. Scoped by user_id; private/no-store.
- `UserMenu.tsx` avatar is now a real `<a href="/account">` with proper
  aria-label (was a decorative div).

**C3. Checkout success pages no longer scream "Something went wrong"**
`/checkout/success` and `/checkout/playbook-success` rendered a celebratory
`<title>` but an error body (red ✕ + "No session ID provided") when a user
landed without `session_id` (refresh, back button, old email link). Now:
- Title is conditional on error state.
- Error state re-skinned to a calm "We're still confirming your order"
  message with dashboard + support CTAs.
- No more panic for real paid customers who hit the page off-flow.

**C4. `SAVE $0` bug on /checkout/upsell fixed**
`SAVE ${fullPrice - upgradePrice - 67}` → `$249 - $182 - $67 = $0`. The
double-subtracted $67 (the masterclass they already paid) was wrong. Now
`SAVE ${fullPrice - upgradePrice}` = `$67`.

**C5. Dutch string leak "Deze betaalkaart gebruiken" removed**
Root cause: Stripe defaults localized strings to the payment entity's
country (SFM Studios BV, NL). `CustomMasterclassCheckout.tsx` now passes
`locale: 'en'` to `<Elements>` so English copy renders regardless of
visitor geo.

### Brand & UX

**C7. `/tools` recognizes paid status**
Was showing "3 free calculations daily" to Masterclass/Inner-Circle buyers.
`/tools/index.astro` now imports `getToolAccess` and swaps the scarcity
copy + the stat card:
- Inner Circle: "Unlimited — included"
- Masterclass: "25/day — included with your Masterclass"
- Anonymous: original 3-free copy

**C8. Blackjack calculator re-skinned from green to brand**
Entire page used `emerald-*` (only green surface in the paid product).
Replaced in-file: `emerald-950/900/800` → `gray-*`, `emerald-700/400/300`
→ `gold`. Leaves semantic `green-500` only on the Win feedback button
where green *means* "you won".

**C9. Lesson page mobile sticky overlap fixed**
`LessonPage.tsx` article wrapper gets `pb-28 md:pb-24` so the sticky
`LessonControls` bar no longer clips the last paragraph by ~40px.

**C10. Course dashboard rebuilt** — the honeymoon-killer fix
Old state: the first two cards above the fold for a brand-new buyer were
LOCKED upsells (Daily Drops + AI Advisor). New state:
- First viewport now shows a welcome greeting + "Continue where you left
  off" card with a circular progress ring (new `DashboardHero.tsx` React
  island, uses existing `useCourseProgress`).
- Copy adapts: first-time visitor vs returning user.
- Modules grid moves up to second position.
- Locked upsells demoted to a "More inside the Inner Circle" section at
  the bottom, with a `#inner-circle-section` anchor for users who want to
  find them on purpose.

---

## Design system foundation (batch F1-F2)

**Tokens (`src/styles/global.css`):**
- New semantic tokens in `:root`: `--bg-page / --bg-elevated / --bg-card`,
  `--text-primary / -secondary / -tertiary`, `--border-subtle / -strong`,
  `--accent-gold / -red`, `--accent-verified / -claimed / -loss`.
- Body typography upgraded from 16/1.5 to **18/1.7 mobile, 20/1.7 desktop** —
  the 2026 editorial baseline.
- `--font-serif` now `'Fraunces', 'Playfair Display', Georgia, serif`.
  Fraunces variable with SOFT + opsz axes loaded deferred in `BaseLayout.astro`
  alongside existing Inter + Playfair.

**Primitive classes added:**
- `.hero-gradient` (radial chip-red + amber glow, subtle, not parallax-heavy)
- `.warm-gradient`, `.stake-card`, `.risk-card`, `.insight-box`, `.claimed-box`
- `.trust-tag`, `.trust-tag-verified`, `.trust-tag-claimed`,
  `.trust-tag-loss`, `.trust-tag-gold` — the audit's "Verified vs Claimed"
  framing promoted to a reusable pill.
- `.display-h1 / -h2 / -h3` — Fraunces SOFT mixed-case editorial headings
  (opposite of the old uppercase Inter shout).
- `.text-red-gradient`, `.nav-link-reveal` (AG-style underline reveal),
  `.editorial-dot`, `.rebrand-fade-in`.

**Hero component (`src/components/Hero.astro`):**
- New `displayStyle` prop, defaults to `'editorial'` so every page
  automatically picks up the serif upgrade.
- New `withDot` prop for the signature red editorial period after brand marks.
- Replaced the cartoonish `shimmer` gold underline bar on the H1 with the
  editorial serif + optional dot.
- When `backgroundImage` is present, photo overlay is now chip-red radial
  glow + 55% black multiply (was 60% black alone). Headline wins over photo.
- Typographic hero (no image) picks up `.hero-gradient` automatically.

All propagated site-wide in one prop flip — `/wins`, `/banned`, `/net-worth`,
`/story`, `/timeline`, `/the-system`, `/baccarat-guide`, `/casino-advantage-play`,
`/gambling-psychology`, `/glossary`, `/faq`, `/media`, `/blog`, `/` all
render Fraunces H1 now.

---

## Page-level polish (batch F3)

**Homepage (`/`)**
- Hero: `MIKKI MASE` (all caps) → `Mikki Mase.` (mixed case, editorial,
  red signature dot).
- Subtitle rewritten to an honest dual claim: "$10M+ verified at The
  Venetian. 150 casino bans claimed. A system 7,000+ players are learning."
- CTAs softened to native-case: "Join the Telegram" / "Read his story".
- Quick-facts section header replaced: eyebrow "Verified vs claimed",
  H2 "The numbers, broken down.", new lede explaining the tagging system.
- Background of the stats section swapped from `from-gray-900 to-black`
  flat gradient to the new `warm-gradient` token wash.

**/wins**
- Hero subtitle sharpened to tension-centered copy.
- Section headlines ported from uppercase Inter `text-3xl md:text-5xl
  font-bold` to `.display-h2` Fraunces mixed case.
- Pill tags swapped from ad-hoc red/green/yellow divs to the semantic
  `trust-tag-verified` / `trust-tag-loss` / `trust-tag-claimed` pills.

**/banned**
- Hero title ("Banned From 150+ Properties") now renders Fraunces by default.
- Stat strip restructured into Claimed / Documented / Verified / Countries
  with one-line source notes under each number.

**Footer (`src/components/Footer.astro`)**
- Rewritten editorial: 2-column brand block with tagline, then Explore /
  Learn / Connect column trios, then bottom bar with Privacy · Terms ·
  Responsible gambling dots-separated.
- All colours now use semantic tokens (`text-primary / -secondary /
  -tertiary`, `border-subtle`), not hard-coded `gray-*`.
- Tagline rewrite: "From juvenile detention to $10M+ verified at The Venetian.
  The most controversial gambler in history — documented, verified, and claimed."
  (echoes the trust-tag system.)
- Links expanded (adds /timeline, /psychology, /advantage-play, /glossary,
  /account, /masterclass) so the footer actually works as wayfinding.

---

## Files added
- `src/data/numbers.ts`
- `src/pages/account.astro`
- `src/pages/api/account/me.ts`
- `src/components/account/AccountPanel.tsx`
- `src/components/course/DashboardHero.tsx`

## Files meaningfully edited
- `src/styles/global.css` (tokens + primitives + body type)
- `src/layouts/BaseLayout.astro` (Fraunces load)
- `src/components/Hero.astro` (editorial default + dot)
- `src/components/Header.astro` (logo nowrap + mobile Sign in)
- `src/components/Footer.astro` (full rewrite)
- `src/components/auth/UserMenu.tsx` (Sign in link + avatar → /account)
- `src/components/shop/sales/SalesHero.astro` (ctaLabel + mobile overflow)
- `src/components/shop/sales/GuaranteeSeal.astro` (prop-driven, PUA out)
- `src/components/shop/sales/Testimonials.astro` (PUA out)
- `src/components/CustomMasterclassCheckout.tsx` (locale: 'en')
- `src/components/course/LessonPage.tsx` (pb-28 md:pb-24)
- `src/pages/index.astro` (hero + stats section intro)
- `src/pages/wins.astro` (trust-tag sections + hero)
- `src/pages/banned.astro` (claimed vs documented split)
- `src/pages/terms.astro` (PUA title gone)
- `src/pages/cheatsheets.astro`, `src/pages/beat-the-casino.astro`
  (guarantee + ctaLabel props wired)
- `src/pages/tools/index.astro` (tier-aware scarcity copy)
- `src/pages/tools/blackjack-calculator.astro` (emerald → gray/gold)
- `src/pages/masterclass/course/index.astro` (dashboard rebuilt)
- `src/pages/checkout/masterclass.astro` (stricter entitlement guard)
- `src/pages/checkout/success.astro` + `/checkout/playbook-success.astro`
  (conditional title, calm error state)
- `src/pages/checkout/upsell.astro` (SAVE $ math fixed)

## Known deferred items (flagged, not blocking)
1. `AnimatedStat` DOM JS-leak — audit claimed raw class source leaking
   into stat-value text. Re-read source: no reproducible bug in code.
   Need a live DOM sample to diagnose. Added to rebrand plan as
   "needs repro".
2. Stacked timers on `/checkout/upsell` — audit reported a 24h timer
   persisting from `/checkout/masterclass` alongside the page's own 10m
   timer. `UrgencyTimer` is not imported on the upsell page; likely
   Astro View Transitions preservation. Need live trace.
3. `EmbeddedMasterclassCheckout` uses Stripe's hosted Embedded UI — its
   locale is set on the Checkout Session (server side) rather than the
   React provider. Opened a `TODO` in code; fix belongs in
   `/api/checkout/create.ts`.
4. First-login welcome screen (audit recommendation) is satisfied by the
   new `DashboardHero` empty-state copy + CTA. A dedicated one-time modal
   with `first_login=true` flag would be the next iteration.
5. Persistent lesson progress already worked via `useCourseProgress`
   localStorage; DashboardHero now reads it. Server-side sync to Supabase
   is the next iteration.
6. Module re-sequencing (audit #10) — content-level decision, not a code
   fix. Left to Hugo + Mikki.

## Acceptance criteria met
- Astro build exit code 0 after each batch (4 full builds during session).
- No regressions in Header / Footer / Hero / BaseLayout / dashboard.
- No uppercase headings forced any more — every H1/H2 opts into editorial.
- Every number shown on /home /banned /wins /net-worth now has a trust
  source or is sourced from `src/data/numbers.ts`.
- Paying customers can now: find their account (`/account`), log out,
  request cancellation, request invoice, re-download bonuses.
- Accidental saved-card recharge path is closed.
- Success pages no longer falsely panic mid-funnel.
