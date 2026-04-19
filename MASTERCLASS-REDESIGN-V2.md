# Mikki Mase Masterclass — Redesign v2 (post-audit merge)

Supersedes v1. Merges my original product vision with the full content audit.

---

## The single sentence

**We are not rebuilding a Masterclass. We are exposing what Mikki's content actually is: a negotiator's field manual that got dressed up as a video course.** The redesign's job is to stop pretending otherwise, ship the visual/interactive layer the field manual always needed, and reposition the marketing around where the content is actually strongest.

---

## What the audit changed about the plan

### Thesis shift #1 — this is not a video course, and we should stop pretending
V1 plan included "60-second Mikki voice-over per lesson." **Kill that.** Audit confirms zero video/audio exists and the content is declaratively written. Adding ElevenLabs voice-overs to 30 text lessons is lipstick. What the content needs is TABLES, DIAGRAMS, and INTERACTIVE WIDGETS — not a narrator.

### Thesis shift #2 — the course's center of gravity is M7+M8, not M3
V1 assumed Blackjack Mastery (M3) as flagship. Audit puts authenticity scores at:
- M3 Blackjack: 8/10
- **M7 Negotiation: 10/10**
- **M8 Discounts: 10/10**
- M5 L3 Break-Even: 9/10
- M10 Discipline: 9/10

Mikki's voice is strongest when he talks about **negotiation, comps, discounts, and session discipline** — not when he explains basic strategy. Marketing + sales page + sequencing should reflect that.

### Thesis shift #3 — M5 and M6 are not weak
V1 inherited UX audit's M5 4/10, M6 3/10 scores and proposed demoting them. Content audit: M5 L3 9/4/9/9/5, M6 L1 7/3/8/9/5. **Previous UX audit measured packaging not content.** Keep M5 and M6; upgrade visuals; don't demote.

### Thesis shift #4 — M9 is the weak spot nobody named
V1 didn't flag M9. Content audit: M9 Authenticity 6-7, two generic lessons (comp-slips, front-money). **M9 gets the rewrite hammer**, not M5/M6.

### Thesis shift #5 — Casino IQ Assessment is a hidden engine
V1 treated it as an add-on. Audit reveals it has **card-SVG rendering + Hit/Stand/Double/Split + 4-station scoring + dynamic module recommendations + prior-result tracking** already built. That infrastructure is the template for everything else. **The M3 Basic Strategy Trainer doesn't need to be built from scratch — it needs to be extracted from the Assessment.**

---

## Definitive module sequence (final)

After Part 2+3 audit data, my v1 re-sequencing argument gets revised. **Sequence becomes:**

| # | Module | Hold position | Reason |
|---|---|---|---|
| 1 | Mindset & Disclaimer | keep | Emotional-flatness foundation |
| 2 | Session Discipline | **promoted from M10** | Stop-loss before any strategy — protects learners from harming themselves with what they learn |
| 3 | Casino Psychology | stays M2 original | Environment awareness before tactics |
| 4 | Casino Negotiation & Hosts | **promoted from M7** | Audit: highest-authenticity content. Leading with it sets product positioning correctly. |
| 5 | The Discount System | **promoted from M8, expanded with Bankroll Math** | Mikki's most Mikki-native edge. Merge with a new "Bankroll Math" lesson (Kelly + RoR) to close the missing-content gap. |
| 6 | Blackjack Mastery | demoted from M3 | Still 5 lessons, still flagship-within-game-mechanics. But now students have foundation first. |
| 7 | Pai Gow | stays M5 | Low-variance counterpoint to blackjack. M5 L3 Break-Even is sleeper gem. |
| 8 | Side Bets | stays M4 | Tactical add-on after games covered. |
| 9 | UTH & Group Play | stays M6 | Advanced, niche — fine here. |
| 10 | Comps & Perks Maximization | **demoted from M9, rewritten** | Weakest module; rewrite pass mandatory before it ships in v2. |

This is a meaningful change from v1. **The course now leads with mindset → discipline → psychology → negotiation → discounts (Mikki's core edge) BEFORE game mechanics.**

---

## Definitive lesson template v2

Unchanged from v1 conceptually, but now with audit-validated priorities for what MUST be in each:

```
┌──────────────────────────────────────────────────────┐
│ HEADER — module/lesson, progress dot                │
├──────────────────────────────────────────────────────┤
│ HERO                                                 │
│  eyebrow: MODULE X · LESSON Y                       │
│  display-h1 (Fraunces mixed case)                   │
│  subtitle: ONE-sentence thesis                      │
│  ⏱ read time · difficulty                           │
├──────────────────────────────────────────────────────┤
│ PROMISE CARD — "by the end you'll…" (3 checkmarks) │
├──────────────────────────────────────────────────────┤
│ MEDIA SLOT (per-lesson-mandatory — choose ONE):     │
│   1. Inline SVG table (house-edge, payouts, rules)  │
│   2. SVG diagram (floor plan, seat geometry, flow)  │
│   3. Strategy chart (basic strategy, house way)     │
│   4. Annotated screenshot (real casino UI)          │
│   → NO stock photos, NO voice-over fluff            │
├──────────────────────────────────────────────────────┤
│ BODY (600-1200 words, Fraunces H2s, Inter 20/1.7)  │
│   - Pull-quotes for Mikki's voice (gold left bar)   │
│   - Inline stake-card examples                      │
│   - Cross-module callouts where concepts link       │
├──────────────────────────────────────────────────────┤
│ ⚡ THE DRILL — interactive widget (see §Widgets)    │
├──────────────────────────────────────────────────────┤
│ KEY TAKEAWAYS — 3-5 bullets (exists, keep)          │
├──────────────────────────────────────────────────────┤
│ PRO TIP — Mikki's voice, gold border (exists, keep)│
├──────────────────────────────────────────────────────┤
│ FIELD NOTE — "this week, try this" + journal link  │
├──────────────────────────────────────────────────────┤
│ STICKY BAR — Prev / Mark complete / Next           │
└──────────────────────────────────────────────────────┘
```

**Hard content rule** added from audit: every lesson citing numbers (house edge %, payout ratio, rating formula, dollar amount) MUST render those numbers in a table/diagram, not in prose. Enforce in PR review.

---

## Widget specs (merged v1 concepts + audit proposals)

Final ranked build order, 10 widgets, 3 already have ready-to-extract infra:

### Tier A — Build first (leverage the Assessment infra)

**A1. Basic Strategy Trainer + Chart (M6 Blackjack L2)**
- Extract the Blackjack Blitz mechanic from the Casino IQ Assessment
- Add complete 3:2/H17 SVG chart as static reference
- Drill mode: random hand → Hit/Stand/Double/Split → EV feedback
- Miss-tracking: heatmap of the 10×10 strategy matrix showing user's weak cells
- Persist via `useCourseProgress` → Supabase
- **This is #1 redesign hit per audit.**

**A2. Session Timer & Limit Tracker (M2 Session Discipline)**
- 35-min default countdown, configurable
- Win/loss limit inputs (dollars OR % of bankroll)
- Audio + vibration alert at thresholds
- Stand-up-mid-hand forced behavior via full-screen overlay
- Session log auto-submit to journal on stop
- PWA installable — real tool for actual casino use
- **Used outside the course → brand anchor.**

**A3. Rebate EV Calculator (M5 Discount System L1)**
- Inputs: avg bet · hours · rebate% · threshold · target RoR
- Outputs: effective house edge · optimal stop-loss · expected net
- Specific rebate scenarios from M8 L1 content
- Save scenarios for multi-casino comparison (ties to A4)

### Tier B — High-leverage, more work

**A4. Multi-Casino Tracker (M5 Discount L2 + M10 Session)**
- Spreadsheet → first-class product feature
- Per-session: casino · game · buy-in · result · rebate · hours · comps received
- Monthly summary with AI commentary (OpenAI call, pre-rendered per month)
- Ties to the journal layer in v1

**A5. Comp-Math Calculator (M3 Psychology L2)**
- Theoretical Loss = avg bet × hands/hour × house edge × hours
- Live calculation with visual breakdown
- Comp % comparison: "you're getting X% of TL back"
- Break-even point highlighted

**A6. Host Script Role-Play (M4 Negotiation L2+L3)**
- Flow-diagram UI
- Scripts come directly from M7 L2 + L3 lesson bodies — content is already written
- User picks response → host responds → branches to "good comp / bad comp / blacklisted"
- 3-5 minute playthrough, repeatable

### Tier C — Nice to have

**A7. Side-Bet EV Calculator (M8 Side Bets)** — dropdown + live edge
**A8. Pai Gow House Way Simulator (M7 Pai Gow)** — deal 7 cards, grade user's split
**A9. UTH Seat Geometry (M9 UTH)** — 6 seats, shared cards → updated flop odds
**A10. Folio Auditor (M10 Comps)** — paste folio → flag issues

### Widgets explicitly skipped from v1
- Emotional Tilt Journal (M1) — too soft, replaced by wiring Casino IQ as pre/post
- Casino Floor Overlay (M3 Psychology) — nice but low leverage; can be static SVG instead

---

## Visual system per module (locked)

No change from v1 on illustration briefs. Priorities adjusted:

| Module | Critical visual (must ship) | Hero illustration (Nano Banana) |
|---|---|---|
| M1 Mindset | (none — text-heavy is OK for reflection) | Portrait, closed eyes, gold dust |
| M2 Session Discipline | Timer/session-structure timeline SVG | Hourglass with chips as sand |
| M3 Psychology | Casino floor layout SVG + Theoretical Loss formula highlight | Overhead floor cutaway |
| **M4 Negotiation** | **Host script flow diagram** | Host-player silhouettes |
| **M5 Discount System** | **Rebate math worked examples table** | Casino loyalty card hero |
| **M6 Blackjack** | **Full 3:2/H17 strategy chart SVG** | Perfect-21 hand close-up |
| M7 Pai Gow | House-way rules table + bonus payout tiers | Pai Gow tiles zen-garden |
| M8 Side Bets | 21+3 payout schedule table + edge comparison | Stacked chips + EV% overlay |
| M9 UTH | Seat-geometry + information-flow SVG | Group of 4 hands, overhead |
| M10 Comps | Comp-slip vs room-charge flowchart | Loyalty card hero |

**12 visuals shipping in v2** (7 tables + 5 diagrams/charts, plus 10 hero illustrations).

---

## Content rewrite priority

### Tier 1 — mandatory rewrite (generic voice, per audit)
1. M1 L2 why-most-players-lose
2. M3 L1 how-casinos-manipulate-you
3. M8 L2 side-bets-to-avoid
4. M10 L1 comp-slips-vs-room-charges
5. M10 L2 front-money-vs-credit-lines

**Rewrite brief:** inject Mikki voice per checklist (1 "I" sentence, 1 specific dollar amount, 1 casino name, 1 dated anecdote, 1 actionable close). Minimum of 3 specific property references per lesson using consistent names (Venetian / Bellagio / Wynn / Cosmopolitan / Mandalay).

### Tier 2 — content additions (fill AP curriculum gaps)
NEW lessons, bolted on but not replacing existing:

- **M5 Discount System L3 (new):** *"Bankroll Math: Kelly, Fractional Kelly, and Risk of Ruin"* — closes biggest missing-content gap per audit
- **M6 Blackjack L6 (new, optional/advanced):** *"The Property Rule Matrix"* — Strip properties × rules × payouts. Also lives as a standalone SVG reference.
- **M10 Comps L4 (new):** *"Taxes, W-2Gs, and the Professional Gambler Question"* — closes tax gap per audit

Deliberate omissions retained from audit: Hi-Lo count, KO count, wonging, hole-card play, shuffle tracking. These don't fit Mikki's positioning and inclusion would dilute the brand.

### Tier 3 — structural fixes (not rewrites, just edits)
- Add explicit cross-module callouts where audit showed silos (M6 → M8, M4 → M6 blackjack, M10 → all prior)
- M6 L2 "basic-strategy-decoded": remove the flagship failure by shipping the chart (structural, not text rewrite)
- M1 L1: move Disclaimer to END of lesson, not opening (opens with "My #1 piece of gambling advice" which is the real hook)

---

## Quiz redesign (audit-specific)

### Per-quiz upgrades
All 10 quizzes get:
1. **Pass threshold visible** (default 80%)
2. **Retake policy visible** (unlimited, question shuffling after first miss)
3. **Back-link in wrong-answer feedback** — "← Reread this section" linking to the specific paragraph
4. **Bloom lift** — rewrite at least 50% of questions to L3 Apply level per audit methodology
5. **L5 Evaluate question** in at least M6 Blackjack, M4 Negotiation, M5 Discount System quizzes ("Critique this player's decision…", "Would you take this comp offer?")

### Casino IQ Assessment wiring (MAJOR)
- **Pre-test on first dashboard visit** (gated — must take to unlock M1)
- **Per-module mini-assessment** — 3-5 diagnostic questions BEFORE each module, scored against post-module quiz
- **Dashboard delta** — "Your Casino IQ: +12 this week" as retention metric
- **Module completion gated on score delta**, not on "Mark Complete" button
- **Blackjack Blitz exported as widget A1** (the drill — see §Widgets)

---

## Commercial structure (final)

### Tiers
**Free** — no change from v1:
- M1 Mindset + M2 Session Discipline (full)
- Casino IQ Assessment (full)
- Session journal (10-session history)
- Reasoning: schaamte-reducerende modules, hoogste conversion-lift

**Masterclass** ($27) — unchanged scope, better product:
- All 10 modules (v2 sequence)
- All 10 widgets
- Full journal history
- Bonus downloads
- Graduate exam + badge

**Inner Circle** ($29/mo or $249/yr) — fixed UX issue per audit #10:
- **Daily Drops** — freemium: 1 free drop/week for Masterclass tier users (audit flagged pure lockout as biggest trust-breaker)
- **AI Advisor** — freemium: 3 free questions/month for Masterclass tier
- Inner Circle unlock = unlimited both + community forum + monthly Mikki AMA + field-note-feedback

**Lifetime VIP** ($249) — unchanged

### Marketing repositioning
Change homepage + /masterclass sales hero from "casino strategy course" to explicit value prop per audit's content DNA finding:

> **Current (audit):** "Bankroll discipline, game selection, and risk management for serious players."
>
> **Proposed (v2):** "How Mikki Mase negotiates with casinos, flips discounts into profit, and walks out ahead. 10 modules, 29 lessons, 10 interactive drills."

Leads with the course's actual strength (negotiation + discounts + discipline) instead of the generic "casino strategy" framing.

---

## 5-week roadmap (revised from 4-week v1)

### Week 1 — foundation + extraction
- Re-sequence modules in `src/content/course/index.ts`
- Update dashboard to new order
- Template v2 in `LessonContent.tsx` (new slots: promise card, media slot, field note)
- Free-tier herdefinitie (M1 + M2 free)
- **EXTRACT Blackjack Blitz mechanic from Casino IQ Assessment** into reusable `<BlackjackDrill />` component
- Assessment pre/post wiring infrastructure (pre-test on dashboard, post-test per module)

### Week 2 — visual shipments (tables + diagrams)
- Basic strategy chart SVG (M6 L2 — flagship fix)
- Theoretical Loss formula highlight (M3 L2)
- 21+3 payout schedule table (M8 L1)
- Pai Gow house-way rules table (M7 L1)
- Session timer/structure timeline (M2)
- Host script flow diagram (M4 L2+L3)
- Rebate math worked examples table (M5 L1)
- Front vs Credit comparison table (M10 L2)

### Week 3 — Tier A widgets
- `<BlackjackDrill />` in M6 L2 (extending the extracted mechanic)
- `<SessionTimer />` in M2 L2 (+ PWA install prompt)
- `<RebateCalculator />` in M5 L1

### Week 4 — Tier B widgets + quiz upgrade
- `<HostRolePlay />` in M4 L2+L3
- `<CompMathCalculator />` in M3 L2
- `<MultiCasinoTracker />` as standalone journal component
- All 10 quizzes: threshold + retake + back-links + Bloom lift to ≥L3

### Week 5 — content + rewrite + polish
- 5 Tier 1 rewrites (generic → Mikki)
- 3 new lessons (Kelly/RoR, Property Rule Matrix, Taxes)
- 10 Nano Banana Pro 2 hero illustrations
- Cross-module callouts
- Marketing repositioning (homepage + /masterclass hero)
- Dashboard Casino IQ delta display

---

## Acceptance criteria (lesson-level, hard gates)

A lesson is v2-done if:
- [ ] Hero with display-h1 Fraunces + promise card
- [ ] At least one visual (table / diagram / chart / SVG) — NOT stock photo
- [ ] If lesson cites numbers, those numbers render in a table
- [ ] Minimum one Mikki voice checklist item (I-sentence + specific $ + casino name + anecdote + actionable close)
- [ ] Interactive widget OR field note with journal link
- [ ] Key takeaways + Pro Tip (keep, promote visually)
- [ ] Cross-module callout where audit flagged a silo
- [ ] Quiz has back-link to lesson section, threshold visible, Bloom ≥L3

Module is v2-done if:
- [ ] All lessons v2-done
- [ ] Hero illustration shipped
- [ ] Minimum 2 tables or diagrams
- [ ] 1 interactive widget (Tier A or B)
- [ ] Pre-test (3-5Q) + post-test (module quiz)
- [ ] Casino IQ delta visible after module completion

---

## Open questions (from v1, now narrower)

1. **5 new lessons to rewrite Tier 1**: do you + Mikki write first-drafts, or do I ship Mikki-voice first-drafts with placeholder-bracketed stories for Mikki to fill in?
2. **3 new lesson additions** (Kelly/RoR, Property Rule Matrix, Taxes): approved for scope? These close the biggest credibility gaps per audit but add ~30% content.
3. **Inner Circle freemium** (1 free Drop/week, 3 free AI Q's/month for Masterclass tier): approved? Audit calls this the biggest trust-breaker; freemium + upsell converts better than hard lockout.
4. **PWA for Session Timer**: ship as PWA install or web-only? PWA gets us phone home-screen icon which is huge for the "use this at the table" positioning.
5. **Marketing repositioning copy**: "How Mikki Mase negotiates with casinos, flips discounts into profit, and walks out ahead." OK to test against current "Bankroll discipline, game selection, risk management"?

---

## Next step

**If green-lit on the 5 open questions**, I can start Week 1 tonight:
1. Re-sequence course manifest
2. Template v2 in `LessonContent.tsx`
3. Extract `<BlackjackDrill />` from Casino IQ Assessment as first shippable widget

Or I spawn a dual-model review (Gemini 3.1 Pro + GPT 5.4) on this plan first. Your call.
