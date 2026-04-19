# Post-Paywall Audit — Full results (merged)

Part 1 was captured in `CLAUDE-BROWSER-POSTPAYWALL-AUDIT-RESULTS-PARTIAL.md` (dashboard only).
Part 2 below resumes from mid-`/checkout/masterclass` and completes the audit.

---

## /checkout/masterclass (continued)

### G. Upsell surfaces & pressure
- Page renders for already-paid users with no entitlement check.
- Three-tier price ladder: crossed $197, then $67, then "$27 today only" — bait rather than discount.
- 24h countdown timer ("Offer expires in 23:58:14") that **resets on reload**. Fake scarcity.
- "🔥 127 people bought in the last hour" ticker — no source, static.
- Trust strip under CTA is the only non-aggressive element.

### H. Brand consistency
- Masterclass gold primary button, but **red #DC2626 timer chip** — red not used elsewhere in paid product.
- Stripe Elements iframe uses default system-ui, visibly breaks Inter.

### I. Technical hygiene — FIVE issues stacked
1. **Accessible to already-paid users** — no entitlement check.
2. Price ladder inconsistent with public `/masterclass` pricing ($197 there, $27 here).
3. **Dutch string leak**: "Deze betaalkaart gebruiken" — i18n bleed from SFM Studios BV locale.
4. Countdown is client-side `Date.now()+24h` — no server truth.
5. **🚨 Saved payment method exposed by default**: "Mastercard •••• 8092" is pre-selected with a one-click "Pay $27" button. **One accidental click charges the card.** Single highest-risk surface in the entire audit.

### J. Scores
- Layout clarity 5 · Production 6 · Mobile 6 (timer wraps 390px) · Upsell taste 2 · Brand 5 · Trust 3

---

## /checkout/upsell

### Layout
- Green success banner "✓ Payment successful. Your Masterclass access is active."
- Upsell card: H1, price block ($249 struck → $182 gold → pink "SAVE $0" chip), 6 bullet benefits, gold CTA, decline text link.
- 10-minute countdown chip at bottom.

### Issues
- **Stacked timers**: the /checkout/masterclass 24h timer still visible top-right + fresh 10-minute timer under CTA. Hostile.
- **"SAVE $0" bug**: `$249 − $182 = $67`, but chip reads "SAVE $0". Template var didn't interpolate (`SAVE $${discount}` with `discount=0`).
- Decline link is respectful (plain text, underlined) — GOOD pattern.
- Page reachable by direct URL without prior purchase — shows "Payment successful" banner to anyone. State integrity failure.
- Success green #16A34A appears nowhere else in the paid product — third accent color introduced in checkout flow alone.

### Scores
- Layout 7 · Production 6 · Mobile 7 · Upsell taste 4 · Brand 5 · Trust 4

---

## /checkout/playbook
- **302 → /masterclass/course**. Dead route. Legacy funnel for a "Playbook" SKU that's gone but left artifacts (see /checkout/playbook-success below).

## /checkout/success
- Title: "Purchase Complete"
- H1 rendered: **"Something went wrong"** — "No session ID provided."
- Title/H1 mismatch is catastrophic mid-funnel — user who just paid won't trust the charge went through.
- No order summary / email confirmation notice / recovery CTA.
- Requires `?session_id=cs_...` but title hardcoded to success state.
- Scores: Layout 6 · Production 4 · Trust 2

## /checkout/playbook-success
- Same failure pattern. Second success page, both reachable without a session, both hardcode celebratory title + conditional error body. Suggests templated checkout where state-handling was never finished.

---

## Account area — /account, /billing, /settings, /profile

**ALL FOUR 404.** No authenticated-user area exists at any conventional URL.

- Avatar top-right is a `<div>`, not link/button. No click handler. Decorative only.
- **No logout link visible anywhere in the authenticated UI.**
- A paying customer has NO in-product way to:
  - View subscription tier
  - Download an invoice
  - Update payment method
  - Change email/password
  - Cancel
  - Log out (session persists indefinitely)

**#1 finding of the entire audit.** EU/UK/CA consumer law and Stripe merchant terms require accessible cancellation. "Cancel via email to support" would need to be explicitly surfaced; it isn't. Single biggest compliance and churn risk.

---

## Mobile bugs (390×844)

1. **Callout box padding overflow** (every lesson): "⚡ Key Insight" boxes have `padding: 32px` desktop, not reduced mobile → 2-3 words per line inside callout.
2. **Sticky "Next lesson →" button overlaps last paragraph ~40px** on lesson pages — missing bottom padding.
3. **Checkout timer wraps to 2 lines** at 390px — breaks urgency visual.
4. `/tools/blackjack-calculator` **input fields exceed viewport** at 390px — horizontal scroll. Other 3 calculators are fine (blackjack is a separate codepath).
5. **Dashboard locked-upsell cards have 48px lock icon on 280px mobile card** — cartoonish.

---

# SYNTHESIS

## 1. Post-purchase honeymoon killer (first 30s)
Dies at second 3. Buyer lands on `/masterclass/course` and the first two cards above the fold are **locked upsells** (Daily Drops + AI Advisor, gated behind Inner Circle). Before seeing any owned content: paid → proud → locked out → suspicious. No welcome, no "here's what you bought", no checklist, no first-lesson CTA, no greeting. Treats new buyer identically to day-90 user.

**Fix:** detect `first_login=true`, render one-screen welcome with "Start Module 1" as single primary action, push locked upsells below fold for first 7 days.

## 2. Learning momentum 1→10 per module
Shape: **6-6-7-5-4-3-6-5-4-3**. Peaks M3 (Blackjack, flagship, only module that feels like real product). Sags badly M5-M6. Churn concentrated in M5-M6 valley.

Per module:
- M1 Mindset 6, M2 Psychology 6, **M3 Blackjack 7 (flagship)**, M4 Side Bets 5, M5 Pai Gow 4, M6 UTH 3, M7 Negotiation 6, M8 Discount 5, M9 Comps 4, M10 Session Discipline 3.

**Fix:** re-sequence — move M7 Negotiation to position 4, demote M5/M6 to optional advanced track, move M10 to position 2.

## 3. TOP 10 HIGHEST-LEVERAGE FIXES

1. 🚨 **Build an account page.** `/account` 404 is existential. Ship in order: logout → subscription status → invoice list → update card → cancel flow.
2. 🚨 **Remove /checkout/masterclass access for entitled users.** Server-side entitlement check, redirect paid → dashboard. Kills saved-card recharge risk.
3. 🚨 **Fix the success pages.** Title/body conditional on `session_id` presence. Moment of highest emotional investment.
4. **Add videos — or own the text-only positioning.** Zero of 39 lessons have video. Either record Mikki for 10 module intros + M3 + M7, or drop "masterclass" from product name.
5. **First-session onboarding.** "Welcome, hpol369. Start here →" pointing at M1 L1. Push locked upsells below fold 7 days.
6. **Fix "SAVE $0" bug** on /checkout/upsell. 10-minute dev fix, massive conversion impact.
7. **Remove Dutch string** "Deze betaalkaart gebruiken" from /checkout/masterclass.
8. **Re-skin blackjack calculator** from green to black/gold like the other 3.
9. **Make tools recognize paid status.** `/tools` says "3 free calculations daily" to paid Masterclass buyers — wrong-direction paywall leak.
10. **Re-sequence modules.** M7 to pos 4, demote M5/M6, M10 to pos 2.

## 4. Upsell audit
**Too loud wrong places, too quiet right places.**
- Wrong: dashboard above fold (2 locked cards before owned content), /tools (free-tier scarcity shown to paid users), /checkout/upsell (stacked timers, SAVE $0 bug).
- Right but quiet: zero in-lesson upsells. Well-placed "expanded in Inner Circle's Daily Drops" at end of relevant lessons would convert better than permanent dashboard card.
- **Density should move from ambient (chrome) to contextual (end of M3, end of M7).**

## 5. LMS template or native?
**Native build, ~30% complete vs mature LMS.** Astro/Tailwind, no Teachable/Kajabi DOM signatures, custom quiz. What's missing vs Thinkific/Teachable baseline:
- No persistent progress (lessons don't show "completed" on return)
- No certificate/completion artifact
- No bookmarks/notes, no search, no transcript/download
- No resume-where-you-left-off
- No email drip, no community/comments, no PWA
- Gap is 8-10 features deep. Closer to CMS-with-quizzes than LMS.

## 6. Video production consistency
**ZERO videos across 38 lessons.** All HTML text + inline images + callout boxes. No `<video>`, no Vimeo/Wistia/YouTube/Mux. Marketing promises cinematic "masterclass" — buyers get prose. Consistency 10/10 (everything text), vs expectation 0/10.

## 7. Quiz fairness
6/10. Recall-heavy not application. Fair (answers retrievable from lesson), weak pedagogy (no timer, unlimited silent re-attempts, no passing threshold shown, feedback = color highlight with no explanation).

## 8. Brand DNA inside the paywall
**Quieter and more restrained than the public site.** Paid product: black #0A0A0A + gold #C9A961 + Playfair headlines + Inter body + 12px radius + subtle gold top-border active nav. Holds across dashboard + all 38 lessons except: green blackjack calculator, red checkout timer chip, green success banner, Stripe iframe system-ui. Counterintuitively, the inside is closer to the angelguardprayers reference than the outside is.

**Strategic implication: the rebrand should pull the OUTSIDE toward the INSIDE, not the other way.**

## 9. Mobile bugs
5 cumulative erosions of "premium read" in first 5 minutes:
1. Callout padding overflow (every lesson)
2. Sticky Next Lesson overlaps last paragraph ~40px
3. Checkout timer 2-line wrap
4. /tools/blackjack-calculator horizontal scroll
5. Locked-upsell 48px lock icon on 280px mobile card

## 10. Account/billing discoverability
**Impossible.** Pages don't exist. Avatar is decorative div. No hamburger exposing account. No footer link. No Manage Subscription anywhere. Paying customer who wants to cancel/update card/invoice/log out has zero in-product path. Only recourse: email support (and /support is pre-paywall, doesn't acknowledge authenticated users).

---

## Worst-5 summary (one-liner version)
1. No account/billing/logout exists at all
2. /checkout/masterclass accessible to paid users with saved card pre-selected
3. Success pages default to error state
4. Zero videos in "masterclass" product
5. Dashboard shows locked upsells above owned content on first login
