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
    'Before your next trip, open a spreadsheet and calculate: your average bet × 400 hands (a single long day of play). That\'s your minimum session bankroll for a 1% edge game at quarter-Kelly sizing. Anything less and you\'re overbet — a two-sigma losing streak will stop you out.',
  promise: [
    'Know the Kelly formula and why you should never bet full-Kelly at a casino',
    'Size a session bankroll that survives normal variance',
    'Understand Risk of Ruin and how bet sizing drives it',
  ],
  estimatedMinutes: 12,
  keyTakeaways: [
    'Kelly sizing says bet a fraction of bankroll equal to edge ÷ variance — full Kelly is too aggressive for real casino variance.',
    'Quarter-Kelly (25% of full Kelly) is the standard professional sizing — it cuts expected growth slightly but crashes Risk of Ruin to near zero.',
    'Session bankroll should be at least 40-50× average bet for standard blackjack — anything less and ordinary variance stops you out.',
    'Risk of Ruin is the probability you lose everything before variance can smooth out — it compounds with bet size.',
    'A bigger bankroll does not let you bet bigger — the only thing that changes your correct bet size is your edge.',
  ],
  proTip:
    'Here\'s the sizing I actually use: average bet is 1/40th of my session bankroll. So for a $40K session, I\'m a $1,000-a-hand player. Not $2K, not $5K — $1K. When you size this way, a 10-hand losing streak is a bad afternoon, not a career-ender. Size smaller than feels exciting. That\'s the signal you\'re doing it right.',
  content: `
    <h3>The Question Every Serious Player Has to Answer</h3>

    <p>How much of your bankroll should you put on the next hand?</p>

    <p>Most players have never asked this question. They just bet whatever feels right — maybe $500, maybe $1,000, depends on the mood. That's not strategy. That's a mood ring with a credit line attached.</p>

    <blockquote>
      "Bet sizing is the single biggest separator between recreational players and professionals. Amateurs size for the dream. Pros size for the variance."
    </blockquote>

    <p>There is an actual answer to the sizing question. It was published in 1956 by John Kelly Jr., a physicist at Bell Labs, and it's the foundation of every serious bankroll management framework used by advantage players, professional sports bettors, and quantitative hedge funds.</p>

    <h3>The Kelly Formula (Simplified)</h3>

    <p>The Kelly criterion says the optimal fraction of your bankroll to bet on any advantaged proposition is:</p>

    <p><strong>Kelly fraction = edge ÷ variance</strong></p>

    <p>For an even-money bet where you have a 51% chance of winning:</p>

    <ul>
      <li>Edge = 51% - 49% = 2% = 0.02</li>
      <li>Variance on even money ≈ 1</li>
      <li>Kelly fraction = 0.02 / 1 = 0.02 = <strong>2% of bankroll per bet</strong></li>
    </ul>

    <p>On a $100,000 bankroll that's $2,000 per bet. On a $10,000 bankroll that's $200. Full Kelly keeps your sizing proportional to your edge and your capital — it's the bet size that maximises the expected logarithmic growth of your bankroll.</p>

    <h3>Why You Should Never Bet Full Kelly at a Casino</h3>

    <p>Here's where Kelly gets misunderstood. Full Kelly assumes you know your edge precisely. At a casino, <strong>you don't</strong>. Rules change. Penetration changes. The pit heats up and your comp math shifts mid-session. Your edge is an estimate, and if you overestimate by even a little bit, full Kelly becomes destructive fast.</p>

    <p>Worse: full Kelly is designed to maximise long-run growth, but it accepts brutal short-run drawdowns. A full-Kelly bettor with a real 2% edge will, over any given year, experience a drawdown of 50% or more with roughly 1-in-3 probability. Most humans cannot psychologically handle a 50% drawdown without deviating from the plan.</p>

    <p>So real professionals don't bet full Kelly. They bet <strong>quarter-Kelly</strong> (0.25× the Kelly fraction) or sometimes half-Kelly. Here's what that trades off:</p>

    <ul>
      <li><strong>Full Kelly:</strong> Maximum growth rate. ~30% chance of a 50%+ drawdown in a year.</li>
      <li><strong>Half Kelly:</strong> 75% of full growth rate. ~12% chance of 50%+ drawdown.</li>
      <li><strong>Quarter Kelly:</strong> 50% of full growth rate. Less than 1% chance of 50%+ drawdown.</li>
    </ul>

    <p>You give up some growth to sleep at night and survive a bad month. That's the trade professional players take every time.</p>

    <h3>Translating to Casino Play</h3>

    <p>Here's how to turn the theory into a real bet size at the table:</p>

    <p><strong>Step 1 — Estimate your edge.</strong> Basic-strategy blackjack (3:2, S17, DAS, late surrender): your edge is -0.5% (house edge). With a 15% loss rebate applied, the effective edge drops to around -0.4%. With a 20% rebate and a 5-hour average session, you can get to -0.2% or even break-even. You are almost never positive-EV without counting or a sharp rebate.</p>

    <p><strong>Step 2 — Recognise that at negative EV, Kelly is negative.</strong> Which means <em>technically</em> you shouldn't bet at all. But in the real world you're playing for the comp stack and the rebate math, not for the table EV. So we size for <strong>survival</strong>, not growth.</p>

    <p><strong>Step 3 — Use the 1/40 rule.</strong> For standard blackjack-style variance, set your average bet at 1/40th of your session bankroll. So:</p>

    <ul>
      <li>$4,000 session bankroll → $100 average bet</li>
      <li>$20,000 session bankroll → $500 average bet</li>
      <li>$100,000 session bankroll → $2,500 average bet</li>
    </ul>

    <p>At 1/40 sizing, your session can absorb about 15-20 consecutive losing hands before you're down 40% of your bankroll. That's roughly a 2-sigma losing streak — something that happens regularly enough that you need to be able to absorb it without stopping out.</p>

    <h3>Risk of Ruin</h3>

    <p>Risk of Ruin (RoR) is the probability that you lose your entire session bankroll before variance smooths out. It's the number that should keep you up at night if your bet sizing is wrong.</p>

    <p>Roughly, RoR for an even-money proposition with edge <em>e</em>, bet fraction <em>f</em>, and variance ≈ 1:</p>

    <p><strong>RoR ≈ e<sup>-2ef/variance</sup></strong></p>

    <p>You don't need to memorise the formula. What you need to internalise is this: <strong>RoR is exponential in bet size</strong>. Doubling your average bet doesn't double your Risk of Ruin — it squares it. A 1% RoR becomes 0.01% if you halve the bet. A 1% RoR becomes 10% if you double the bet.</p>

    <p>This is the math behind "never press your bet when you're losing." Pressing up doubles or triples your sizing at exactly the moment the session variance is already against you. That's how 4-sigma bad sessions become career-enders.</p>

    <h3>The 400-Hand Session Test</h3>

    <p>A full day of blackjack at a normal table is around 60-80 hands per hour, for 4-6 hours. Call it 300-500 hands. Here's the self-check I use before every trip:</p>

    <ul>
      <li>Total session bankroll / average bet = session units</li>
      <li>Session units should be ≥ <strong>400</strong> for standard blackjack</li>
      <li>Session units should be ≥ <strong>200</strong> for pai gow (lower variance)</li>
      <li>Session units should be ≥ <strong>800</strong> if you're betting a big side bet (21+3, Perfect Pairs, etc.)</li>
    </ul>

    <p>If your sessions units come in lower than that, you're overbet. Raise the bankroll or lower the bet. Don't rationalise the sizing because you "feel hot" or "the count is good."</p>

    <h3>Why a Bigger Bankroll Doesn't Mean Bigger Bets</h3>

    <p>This is the counter-intuitive one. If your edge is fixed, then scaling your bet up with your bankroll doesn't change your Kelly fraction — it changes your dollar sizing but not your percentage sizing.</p>

    <p>In practice, most recreational players get the direction wrong: they have a winning day, their bankroll grows, and they scale their bet up emotionally (not per Kelly). Then a bad day wipes out the growth. Professional players do the opposite: they scale up only when the edge itself improves (better rules, better rebate, better count).</p>

    <blockquote>
      "A bigger bankroll doesn't let you bet bigger. Better information lets you bet bigger. If nothing changed about your edge, your correct bet size hasn't changed either."
    </blockquote>

    <h3>The Practical Sizing I Use</h3>

    <p>Here's the rule I actually follow. I call it <strong>"1/40 with a governor."</strong></p>

    <ul>
      <li><strong>Session bankroll:</strong> the amount I'm willing to lose in a single session. Not my net worth. Not my trip bankroll. This session.</li>
      <li><strong>Average bet:</strong> 1/40th of the session bankroll.</li>
      <li><strong>Max bet on any single hand:</strong> 3× average (for doubles and splits), never more.</li>
      <li><strong>Progressive sizing:</strong> I do NOT press bets on wins. I do NOT chase on losses. The bet is the bet.</li>
      <li><strong>Governor:</strong> if I'm down 30% of session bankroll, I cut average bet in half. If I'm down 50%, I stop.</li>
    </ul>

    <p>This sizing gives up some theoretical growth vs. a more aggressive framework. It also means I've never been stopped out of a session by variance alone. I've lost plenty of sessions. I've never been ruined by one. That's the difference 1/40 sizing makes.</p>

    <h3>The One-Sentence Summary</h3>

    <p><strong>Size for the bad day you will one day have, not the good day you're hoping for.</strong></p>

    <p>That's the whole module. The Kelly math tells you why. The 1/40 rule tells you how. Your ability to stay in the game five years from now tells you whether you listened.</p>
  `,
};
