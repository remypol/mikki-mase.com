/**
 * Single source of truth for Mikki Mase numeric claims.
 *
 * RULE: every page that displays a number (wins, bans, net worth, community size)
 * MUST import from this file. This keeps claims consistent across:
 *   - hero stats, meta descriptions, schema.org, testimonials, nav dropdown descriptions,
 *     press lines, footer.
 *
 * When any number changes, update it here once and verify site-wide with:
 *   rg -n "\\$32M|\\$10M|150\\+|47\\+|20–40|20–43" src/
 *
 * For bans specifically we split CLAIMED (storyline) vs DOCUMENTED (what we can point
 * at in `src/data/casinoBans.ts`) — this prevents the H1/stat-card contradictions the
 * Browser audit flagged on /banned.
 */

export const NUMBERS = {
  // Winnings
  totalWinnings: 32_000_000,
  totalWinningsVerified: 10_000_000, // Verified at The Venetian (Jake Ormand witness)

  // Losses (documented)
  wynnLoss: 1_500_000,
  pokerLossesDocumented: 938_000,

  // Casino bans — the site MUST use these two fields side-by-side on /banned
  bansClaimed: 150, // Mikki's own claim in interviews, repeated across the site
  // bansDocumented reads dynamically from casinoBans.ts — see getBanStats().total
  // Keep these in sync: if someone updates casinoBans.ts, the stat card updates.

  // Net worth
  netWorthMin: 20_000_000,
  netWorthMax: 40_000_000, // single source of truth — picked 40 over 43 to match home+footer
  lastWealthVerified: '2026-04-01',

  // Community
  telegramMembers: 7_000,

  // Career
  careerStartYear: 2018,
} as const;

/**
 * Formatted strings we use repeatedly. Prefer these over hand-formatted values
 * in templates — changing them here cascades everywhere.
 */
export const LABELS = {
  totalWinnings: '$32M+',
  totalWinningsVerified: '$10M+',
  netWorthRange: '$20M–$40M',
  bansClaimed: '150+ casinos',
  telegramMembers: '7,000+ members',
} as const;
