import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 4: Kelly, Variance, and Risk of Ruin
 * Module 2 (v3 sequence) - Session Discipline & Bankroll Management
 *
 * New lesson shipped Sprint 5c per V3 redesign. Closes the biggest content
 * gap flagged by the audit: session discipline lessons tell you to set
 * stop-losses, but never give you the math for sizing the session bankroll
 * in the first place. This lesson does that.
 */
export const lesson4: Lesson = {
  id: 'mod2-lesson4-kelly-and-risk-of-ruin',
  slug: 'kelly-and-risk-of-ruin',
  title: 'Kelly, Variance, and Risk of Ruin',
  subtitle: 'How much bankroll do you actually need? The answer is a number, not a feeling — and the number depends on three variables you already know.',
  difficulty: 'advanced',
  fieldNote:
    'Before your next trip, open a spreadsheet and split your bankroll two ways. Trip bankroll: what you brought to town. Session bankroll: 10% of that — what you\'re willing to lose on one sit-down. Your average bet should be 1/40th of the SESSION bankroll. Trip bankroll ≈ 400 units. Session bankroll ≈ 40 units. Bet ≈ 1 unit. Write the three numbers down before you ever pull a chip.',
  promise: [
    'Know the Kelly formula and why you should never bet full-Kelly at a casino',
    'Size a session bankroll that survives normal variance',
    'Understand Risk of Ruin and how bet sizing drives it',
  ],
  estimatedMinutes: 12,
  keyTakeaways: [
    'Full Kelly maximises long-run growth but accepts brutal drawdowns — real professionals bet fractional Kelly (half or quarter) to survive the variance.',
    'Split your money into a TRIP bankroll and a SESSION bankroll. Trip is what you bring; session is ~10% of that — what you risk on one sit-down.',
    'Session bankroll should be at least 40× average bet for standard blackjack. Trip bankroll should be at least 400× average bet.',
    'Risk of Ruin is the probability you lose everything before variance smooths out — and it scales exponentially with bet size, not linearly.',
    'A bigger bankroll does not let you bet bigger — the only thing that changes your correct bet size is your edge.',
  ],
  proTip:
    'Here\'s the sizing I actually use: trip bankroll sized at 400× my average bet, session bankroll sized at 40× (10% of trip), and the bet stays flat through the session. So for a $40K trip I\'m a $100-a-hand player with $4K on the table per session — not $500, not $1K. When you size this way a 10-hand losing streak is a bad afternoon, not a career-ender. Size smaller than feels exciting. That\'s the signal you\'re doing it right.',
  content: `
    <h3>The Question Every Serious Player Has to Answer</h3>

    <p>How much of your bankroll should you put on the next hand?</p>

    <p>Most players have never asked this question. They just bet whatever feels right — maybe $500, maybe $1,000, depends on the mood. That's not strategy. That's a mood ring with a credit line attached.</p>

    <blockquote>
      "Bet sizing is the single biggest separator between recreational players and professionals. Amateurs size for the dream. Pros size for the variance."
    </blockquote>

    <p>There is an actual answer to the sizing question. It was published in 1956 by John Kelly Jr., a physicist at Bell Labs, and it's the foundation of every serious bankroll management framework used by advantage players, professional sports bettors, and quantitative hedge funds.</p>

    <h3>The Kelly Formula (Keeping It Honest)</h3>

    <p>For an even-money bet where you know your win probability <em>p</em>, the Kelly criterion gives the optimal fraction of your bankroll to wager as:</p>

    <p><strong>f* = p − q</strong> &nbsp;(where q = 1 − p, i.e. your loss probability)</p>

    <p>For a 51% shot on an even-money bet: f* = 0.51 − 0.49 = 0.02 = <strong>2% of bankroll per bet</strong>.</p>

    <p>On a $100,000 bankroll that's $2,000 per bet. Full Kelly keeps your sizing proportional to your edge and your capital — it's the bet size that maximises expected logarithmic growth over the long run.</p>

    <p>Casino games are messier than even-money coin flips (pushes, doubles, splits, variable payouts), so the clean f* = p − q form is an approximation. For a practical casino application, don't try to derive a perfect closed-form — use the qualitative guidance that follows, and lean on a reputable simulator (Wizard of Odds, CVCX) if you want precise numbers for a specific ruleset.</p>

    <h3>Why You Should Never Bet Full Kelly at a Casino</h3>

    <p>Full Kelly assumes you know your edge precisely. At a casino, <strong>you don't</strong>. Rules change. Penetration changes. The pit heats up and your comp math shifts mid-session. Your edge is an estimate, and if you overestimate by even a little bit, full Kelly turns destructive fast.</p>

    <p>Worse: full Kelly is designed to maximise long-run growth, but it accepts brutal short-run drawdowns. A full-Kelly bettor with a real edge will experience a 50%+ drawdown with surprising regularity — most humans cannot psychologically handle that without deviating from the plan.</p>

    <p>So real professionals don't bet full Kelly. They bet <strong>fractional Kelly</strong> — typically half or quarter. The trade-off, qualitatively:</p>

    <ul>
      <li><strong>Full Kelly:</strong> maximum long-run growth rate, and regular, gut-wrenching drawdowns.</li>
      <li><strong>Half Kelly:</strong> roughly three-quarters of the long-run growth rate, meaningfully smaller drawdowns.</li>
      <li><strong>Quarter Kelly:</strong> roughly 40-45% of the long-run growth rate, dramatically smaller Risk of Ruin.</li>
    </ul>

    <p>You give up some growth to sleep at night and survive a bad month. That's the trade professional players take every time.</p>

    <h3>Translating to Casino Play</h3>

    <p>Here's how to turn the theory into a real bet size at the table:</p>

    <p><strong>Step 1 — Estimate your edge.</strong> Basic-strategy blackjack (3:2, S17, DAS, late surrender) sits in the <strong>−0.26% to −0.36%</strong> range depending on decks and exact rules. Add a loss rebate and the effective edge improves, but rebate math depends on how losses are calculated (per session / per trip / per year), caps, and exclusions — the "a rebate flips the game positive" story is only sometimes true. Consult the Rebate Calculator drill in the Discount System module to run your specific offer.</p>

    <p><strong>Step 2 — Recognise that at negative EV, full Kelly is negative.</strong> Which means <em>technically</em> you shouldn't bet at all. But in the real world you're playing for the comp stack, the rebate math, and the entertainment — not for the pure table EV. So we size for <strong>survival</strong>, not growth.</p>

    <p><strong>Step 3 — Use the split bankroll with the 40-unit / 400-unit structure.</strong> The cleanest framework I know:</p>

    <ul>
      <li><strong>Trip bankroll</strong> = the total money you brought to town. Size this at 400× your average bet. That's what you can afford to lose across the entire trip.</li>
      <li><strong>Session bankroll</strong> = roughly 10% of your trip bankroll — what you sit down with for one session. 40× your average bet.</li>
      <li><strong>Average bet</strong> = 1 unit. Max bet on any single hand (for doubles and splits) = 3 units, never more.</li>
    </ul>

    <p>Concrete examples:</p>

    <ul>
      <li>$40K trip, $4K session, $100 average bet.</li>
      <li>$200K trip, $20K session, $500 average bet.</li>
      <li>$1M trip, $100K session, $2,500 average bet.</li>
    </ul>

    <p>At 40-unit session sizing, your session can absorb about 15-20 consecutive losing hands before you're down meaningfully into the session bankroll. That's roughly a 2-sigma losing streak — common enough that you must be able to absorb it without tapping out.</p>

    <h3>Risk of Ruin</h3>

    <p>Risk of Ruin (RoR) is the probability you lose your entire trip bankroll before variance smooths out. It's the number that should keep you up at night if your bet sizing is wrong.</p>

    <p>I'm not going to hand you a closed-form formula here — the real math for blackjack (with pushes, doubles, splits, and variable payouts) is messy and the clean algebra textbook versions don't really apply. If you want precise numbers for your exact game, run a simulator like CVCX or the Wizard of Odds tools.</p>

    <p>What you NEED to internalise is the shape of the curve: <strong>RoR scales exponentially with bet size relative to bankroll, not linearly</strong>. Doubling your bet doesn't double your Risk of Ruin — it magnifies it violently. A safe 1% RoR at one bet size can blow up to a 10%+ RoR just by doubling the bet. A 0.1% RoR can blow up to 1% the same way. The punishment for oversizing is wildly out of proportion to the size increase.</p>

    <p>This is the math behind "never press your bet when you're losing." Pressing up doubles or triples your sizing at exactly the moment the session variance is already against you. That's how 4-sigma bad sessions become career-enders.</p>

    <h3>The Trip-Bankroll Sanity Check</h3>

    <p>A full day of blackjack at a normal table is around 60-80 hands per hour, for 4-6 hours. Call it 300-500 hands. Here's the self-check I use before every trip:</p>

    <ul>
      <li>Total TRIP bankroll / average bet = trip units</li>
      <li>Trip units should be ≥ <strong>400</strong> for standard blackjack</li>
      <li>Trip units should be ≥ <strong>200</strong> for pai gow (lower variance)</li>
      <li>Trip units should be ≥ <strong>800</strong> if you're committing real size to a side bet (21+3, etc.)</li>
    </ul>

    <p>Session bankroll stays at 40 units regardless — 10% of the trip bankroll, and what you actually sit down with for one sit-down. If your TRIP units come in lower than that 400-unit test, you're overbet for the trip as a whole — either raise the bankroll or lower the bet. Don't rationalise the sizing because you "feel hot" or "the count is good."</p>

    <h3>Why a Bigger Bankroll Doesn't Mean Bigger Bets</h3>

    <p>This is the counter-intuitive one. If your edge is fixed, then scaling your bet up with your bankroll doesn't change your Kelly fraction — it changes your dollar sizing but not your percentage sizing.</p>

    <p>In practice, most recreational players get the direction wrong: they have a winning day, their bankroll grows, and they scale their bet up emotionally (not per Kelly). Then a bad day wipes out the growth. Professional players do the opposite: they scale up only when the edge itself improves (better rules, better rebate, better count).</p>

    <blockquote>
      "A bigger bankroll doesn't let you bet bigger. Better information lets you bet bigger. If nothing changed about your edge, your correct bet size hasn't changed either."
    </blockquote>

    <h3>The Practical Sizing I Use</h3>

    <p>Here's the rule I actually follow. I call it <strong>"40 session, 400 trip, with a governor."</strong></p>

    <ul>
      <li><strong>Trip bankroll:</strong> what I brought to town. 400× average bet.</li>
      <li><strong>Session bankroll:</strong> 10% of trip bankroll. 40× average bet. What I'm willing to lose in a single sit-down.</li>
      <li><strong>Average bet:</strong> 1 unit. Set before I sit down, held flat through the session.</li>
      <li><strong>Max bet on any single hand:</strong> 3 units (for doubles and splits), never more.</li>
      <li><strong>Progressive sizing:</strong> I do NOT press bets on wins. I do NOT chase on losses. The bet is the bet.</li>
      <li><strong>Governor:</strong> if I'm down 30% of session bankroll, I cut average bet in half. If I'm down 50%, I stop.</li>
    </ul>

    <p>This sizing gives up some theoretical growth vs. a more aggressive framework. It also means I've never been stopped out of a session by variance alone. I've lost plenty of sessions. I've never been ruined by one. That's the difference 1/40 sizing makes.</p>

    <h3>The One-Sentence Summary</h3>

    <p><strong>Size for the bad day you will one day have, not the good day you're hoping for.</strong></p>

    <p>That's the whole module. The Kelly math tells you why. The 1/40 rule tells you how. Your ability to stay in the game five years from now tells you whether you listened.</p>
  `,
};
