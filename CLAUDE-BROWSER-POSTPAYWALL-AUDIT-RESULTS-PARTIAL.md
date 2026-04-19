# Post-Paywall Audit — Partial (Dashboard only)

Browser crashed after dashboard analysis. Key findings captured below so we don't lose them.

## Route structure correction (important)

The prompt had incorrect URL structure. Actual URL pattern:

```
/masterclass/course/<module-slug>/<lesson-slug>
```

Lesson slugs are **named**, not `lesson-1/lesson-2`. E.g.
`/masterclass/course/mindset-disclaimer/the-gamblers-code`

## Module order per live dashboard (authoritative)

Confirmed against `src/content/course/index.ts`:

| # | Module | Slug |
|---|---|---|
| 1 | Mindset & Disclaimer | `mindset-disclaimer` |
| 2 | Casino Psychology | `casino-psychology` |
| 3 | Blackjack Mastery (flagship) | `blackjack-mastery` |
| 4 | Side Bets That Actually Work | `side-bets` |
| 5 | Pai Gow Poker Strategy | `pai-gow` |
| 6 | Ultimate Texas Hold'em Group Play | `uth-group-play` |
| 7 | Casino Negotiation & Hosts | `casino-negotiation` |
| 8 | The Discount System | `discount-system` |
| 9 | Comps & Perks Maximization | `comps-perks` |
| 10 | Session Discipline & Bankroll Management | `session-discipline` |

## Dashboard findings (Browser captured before crash)

### Identity
- URL: `https://www.mikki-mase.com/masterclass/course`
- Title: `Course Dashboard | The Mikki Mase Masterclass`
- H1: `Course Dashboard` (eyebrow "THE MIKKI MASE MASTERCLASS")
- Intent: hub / navigation / upsell shelf

### Layout (top → bottom)
1. Public-site header (Learn More / Tools / Masterclass nav + H avatar + "hpol369" + "Sign Out")
2. Gold eyebrow "THE MIKKI MASE MASTERCLASS", centered
3. H1 "Course Dashboard" (48px Inter 900), centered
4. Subhead "10 modules · 8 hours · Interactive scenarios"
5. **Upsell card #1** — "The Inner Circle — LOCKED" with avatar thumbnail + "Upgrade to Inner Circle →"
6. **Upsell card #2** — "🤖 AI Casino Strategy Advisor — LOCKED" + "Upgrade to unlock →"
7. Ten module cards (numbered 01–10), each with number badge, eyebrow, title, 1-line description, metadata pills
8. "Your Bonus Downloads" row (MMC Cheatsheet Bundle + Beat the Casino Ebook)
9. Full public-site footer (438px tall)

### Critical issues on dashboard
- **First-screen hierarchy broken**: dominant element is static "Course Dashboard" title. No "Continue where you left off", no "Resume Module X", no streak, no progress ring, no onboarding moment.
- **Upsell density too high on entry**: 2 of first 3 content blocks below title are LOCKED upsells. Post-$67-purchase honeymoon killer.
- **No completion affordance**: cannot tell from dashboard what's been done or where user is. No per-module progress bars.
- **No welcome video / no first-lesson suggestion / no zero-state illustration / no "Start Here" CTA on Module 1**.
- Module presentation as vertical 1→10 list is good.

_Browser hung at "C. Content quality" of dashboard — no deeper routes audited._
