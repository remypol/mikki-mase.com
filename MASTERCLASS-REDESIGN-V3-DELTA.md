# Masterclass Redesign v3 — post-review delta

Supersedes v2 on 3 convergent findings from GPT 5.4 + Gemini 3.1 Pro.
Both reviewers independently hit the same CRITICAL + HIGH items.

## DELTA #1 — Module sequence (CRITICAL, both reviewers)

V2 put Blackjack at position 6 after Negotiation + Discounts. Both reviewers
say that kills the "I just lost $10k, teach me tonight" emotional arc.
Gemini: "pedagogical mistake." GPT: "emotionally risky."

**V3 final sequence:**

| # | Module | Change vs V2 |
|---|---|---|
| 1 | Mindset | keep |
| 2 | Session Discipline | keep (promoted from M10 original) |
| 3 | Casino Psychology | keep |
| 4 | **Blackjack Mastery** | **moved up from V2 pos 6 → V3 pos 4** |
| 5 | Casino Negotiation | was V2 pos 4, now V3 pos 5 |
| 6 | Discount System + Bankroll Math | was V2 pos 5, now V3 pos 6 |
| 7 | Pai Gow | keep |
| 8 | Side Bets | keep |
| 9 | UTH Group Play | keep |
| 10 | Comps & Perks | keep (rewritten) |

Philosophy: Foundation (M1-M3) → Game the buyer came for (M4) → Metagame
mastery (M5-M6) → Advanced games (M7-M9) → Operational close (M10).

Satisfies GPT's "early tactical win" and Gemini's "can't negotiate comps on a
game you don't know." Preserves the audit-validated repositioning (M5+M6 are
the Mikki-native edges) without burying blackjack.

## DELTA #2 — Casino IQ Assessment NOT a hard gate (CRITICAL, both)

V2 said "gated — must take to unlock M1" and "module completion gated on
score delta, not on Mark Complete button."

Both reviewers: **no.** Gemini: "LMS bloat. Will cause chargebacks."
GPT: "recreates the honeymoon-killer."

**V3 rule — soft-gate personalization, hard-gate nothing:**
- Casino IQ Assessment = **strongly recommended, NEVER required**
- "Mark Complete" stays frictionless, user-controlled
- Casino IQ feeds:
  - Dashboard "IQ delta" metric (opt-in visibility)
  - Personalized module recommendations
  - "Get your leak report" CTA after M1
- Casino IQ does NOT gate:
  - Module progression
  - Lesson access
  - Advancing to M3 because you scored poorly on M2 quiz

Phase 2 (post-usage-data) can experiment with optional "certification badge"
tiers for voluntary gated advancement, but V3 ships with fully unlocked
progression.

## DELTA #3 — Sprint 1 scope reduction (HIGH, GPT)

V2 Week 1 mixed: re-sequencing + template + free-tier + widget extraction +
assessment pre/post wiring. GPT: "too many dependency-heavy moves."

**V3 Sprint 1 (scope-reduced):**
1. Re-sequence modules in `src/content/course/index.ts`
2. Template v2 in `LessonContent.tsx` (promise card, media slot, field note)
3. Extract `<BlackjackDrill />` from Casino IQ Assessment as reusable component
4. Purge in-lesson upsell banners (see Delta #4)
5. Free-tier M1+M2 (no M2 was already partly in V2)

**Moved to Sprint 4 (after Tier A widgets ship + we have usage data):**
- Dashboard "IQ delta" metric
- Per-module mini-assessments
- "Recommended next module" personalization
- Casino IQ as opt-in dashboard widget

## DELTA #4 — Purge in-lesson upsell banners (HIGH, Gemini, missing from V2)

Audit Part 2 flagged M3 L1 has "Inner Circle banner above footer — present
in lesson body." V2 didn't address this. Gemini: "conflicts with the
editorial, verified, premium rebrand."

**V3 acceptance criterion added:**
> No UpsellBanner / Upgrade components inside any lesson body. Upsells live
> on dashboard, /tools, and a dedicated sticky footer only.

Sprint 1 includes a grep pass across all content files + component usage:
`rg -n "Inner Circle|Upgrade|UpsellBanner" src/content/course` — remove
anything found.

## DELTA #5 — Marketing copy refinement (LOW, GPT)

V2 proposed: *"How Mikki Mase negotiates with casinos, flips discounts into
profit, and walks out ahead."*

GPT flag: undersells breadth — buyer might think "only hosts and comps."

**V3 copy:**
> *"How Mikki Mase manages sessions, negotiates with casinos, flips discounts into profit, and leaves with the edge."*

Adds "manages sessions" upfront so session-discipline + game-mechanics
breadth is implied.

## DELTA #6 — Widget build order clarified (MEDIUM, GPT)

V2 Tier A was a single ranking. GPT: split into two rankings because
engineering-leverage vs product-leverage differ.

**V3 explicit rankings:**

*Pedagogical (course fix priority, Sprint 3 order):*
1. BlackjackDrill (M4 blackjack — extract, fastest to ship)
2. Rebate Calculator (M6 discounts)
3. Session Timer PWA (M2 session discipline)

*Product-distribution (marketing / post-launch hero):*
1. Session Timer PWA (installable, at-table utility, word-of-mouth)
2. BlackjackDrill
3. Rebate Calculator

Sprint 3 builds in the pedagogical order (shipping speed wins).
Post-Sprint-3 marketing pushes Session Timer PWA as the flagship tool.

## V3 sprint plan (final)

- **S1** — Re-sequence modules · template v2 · extract BlackjackDrill ·
  purge in-lesson upsells · free-tier M1+M2
- **S2** — 8 tables/diagrams (basic strategy chart #1 priority)
- **S3** — Tier A widgets: BlackjackDrill wired into M4 L2 · Session Timer PWA · Rebate Calculator
- **S4** — Quiz overhaul (threshold + retake + back-links + Bloom ≥L3) + Casino IQ soft-wiring
- **S5** — Content rewrite Tier 1 (5 generic lessons) + 3 new lessons (Kelly/RoR, Property Rule Matrix, Taxes)
- **S6** — 10 Nano Banana illustraties + marketing reposition + Inner Circle freemium (1 Daily Drop/wk + 3 AI Q's/mo)
- **S7** — Build verify + deploy + post-deploy smoke audit

Sprints run back-to-back. Target: all 7 sprints shipped sequentially.

## Where V2 was right (kept unchanged)

Per both reviewers:
- Content rewrite ROI: mandatory, do NOT cut scope
- Freemium risk: low, drives Product-Led Growth
- Visual gap priorities ranking (basic strategy chart is #1)
- Extracting Blackjack drill from existing Assessment infra
- 3 new content additions (Kelly/RoR, Rule Matrix, Taxes) to close AP credibility gap

## Ready to start Sprint 1

All 3 open questions from V2 that both reviewers resolved:
- Sequence: Blackjack earlier ✓
- Assessment: soft-gated ✓
- Sprint 1 scope: reduced ✓

Remaining open (low-severity, shippable with defaults):
- Rewrite workflow (placeholder brackets vs jij+Mikki) — default: ship
  first-draft with `[Mikki: specific $ amount]` brackets for review
- PWA for Session Timer — default: YES, ship as PWA (home screen install)

Starting S1 now.
