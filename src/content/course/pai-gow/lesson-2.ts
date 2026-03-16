import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 2: Bonus Betting with 7 Cards
 * Module 5 - Pai Gow Poker Strategy
 */
export const lesson2: Lesson = {
  id: 'mod5-lesson2-bonus-betting-with-7-cards',
  slug: 'bonus-betting-with-7-cards',
  title: 'Bonus Betting with 7 Cards',
  estimatedMinutes: 12,
  keyTakeaways: [
    'The bonus bet in Face-Up Pai Gow pays based on your BEST possible 7-card poker hand, regardless of how you set your two hands.',
    'The base Pai Gow game is close to breakeven -- the bonus bet is where you actually make money.',
    'Bonus payouts escalate dramatically: trips pay 2:1, but a straight flush can pay 50:1 or more depending on the casino.',
    'You should ALWAYS play the bonus bet in Face-Up Pai Gow -- skipping it means leaving the most profitable part of the game on the table.',
    'Proper bet sizing on the bonus relative to your base bet is critical to maximizing your expected value.',
  ],
  proTip:
    'Here\'s something most players miss: your bonus bet pays on your best 7-card combination, NOT on how you set your hands. So even if you push or lose the base game, you can still collect a massive bonus payout. I\'ve had sessions where I lost money on the base game and walked away up thousands because of bonus hits. Always, always, always play the bonus.',
  content: `
    <h3>The Bonus Bet: Where the Real Money Lives</h3>

    <p>Everything I taught you in Lesson 1 was setup. This is the payoff. The <strong>bonus bet</strong> in Pai Gow Poker is the entire reason I play this game, and it's the thing that 90% of Pai Gow players either ignore or don't understand.</p>

    <blockquote>
      "The base game in Pai Gow is the cover charge. The bonus bet is the VIP section where the money's at."
    </blockquote>

    <p>Here's how it works. When you sit down at a Face-Up Pai Gow table, there's a separate betting circle for the <strong>bonus bet</strong> (sometimes called the "Fortune" or "Progressive" bet depending on the casino). This bet pays based on the <strong>best possible poker hand you can make with all 7 of your cards</strong>.</p>

    <p>Read that again. <strong>All 7 cards.</strong> Not your 5-card hand. Not your 2-card hand. The best hand you can construct from all 7 cards combined.</p>

    <h3>The Bonus Payout Table</h3>

    <p>Payouts vary by casino, but here's a typical structure:</p>

    <ul>
      <li><strong>Three of a Kind:</strong> 2:1</li>
      <li><strong>Straight:</strong> 3:1</li>
      <li><strong>Flush:</strong> 4:1</li>
      <li><strong>Full House:</strong> 5:1</li>
      <li><strong>Four of a Kind:</strong> 25:1</li>
      <li><strong>Straight Flush:</strong> 50:1</li>
      <li><strong>Royal Flush:</strong> 150:1</li>
      <li><strong>7-Card Straight Flush (no Joker):</strong> 8,000:1</li>
    </ul>

    <p>Look at those numbers. A $25 bonus bet that hits quads pays you <strong>$625</strong>. A straight flush on a $25 bet? <strong>$1,250</strong>. And you're collecting these payouts while the base game is barely costing you anything.</p>

    <h3>The Math That Makes This Work</h3>

    <p>Here's the key insight, and I need you to really internalize this:</p>

    <blockquote>
      "The base Pai Gow game is designed to be close to breakeven. You're not supposed to make money on it. The bonus bet is where the casino accidentally gave you a real shot."
    </blockquote>

    <p>Think about it from a probability standpoint. With 7 cards, your chances of making a qualifying bonus hand are significantly higher than with 5 cards:</p>

    <ul>
      <li>You'll hit <strong>three of a kind or better</strong> roughly 30-35% of the time with 7 cards</li>
      <li>Straights and flushes appear more frequently because you have more card combinations</li>
      <li>Even quads, while rare, show up more often than you'd expect with 7 cards to work with</li>
    </ul>

    <p>The house edge on the bonus bet varies by paytable, but at many properties it's around <strong>2-7%</strong>. That sounds high, but when you factor in the occasional big hit -- quads, straight flushes -- the <strong>variance</strong> works in your favor over sessions.</p>

    <h3>Bet Sizing Strategy</h3>

    <p>This is where most people screw up. They either bet too little on the bonus (making the wins meaningless) or too much (risking their bankroll on a side bet).</p>

    <p>Here's my approach:</p>

    <ul>
      <li><strong>Base bet:</strong> This is your main bet. Size it based on your bankroll and what gets you the comp level you want.</li>
      <li><strong>Bonus bet:</strong> I typically play the bonus at <strong>25-50% of my base bet</strong>. If I'm betting $100 on the base game, I'm putting $25-50 on the bonus.</li>
      <li><strong>Never skip the bonus:</strong> Even on your minimum bet, always have something on the bonus circle. A $5 bonus bet that hits a straight flush pays $250. That's free money you left on the table if you didn't play it.</li>
    </ul>

    <p>Some casinos have a <strong>minimum</strong> bonus bet of $5 or $10. Always check before you sit down. And look at the paytable -- not all bonus paytables are created equal. You want the one with the highest payouts for quads and straight flushes.</p>

    <h3>Calculating Expected Bonus Payouts</h3>

    <p>Over the course of a session, here's roughly what you can expect per 100 hands with a $25 bonus bet:</p>

    <ul>
      <li><strong>~30 hands</strong> will hit trips or better (mostly trips and straights)</li>
      <li>Average bonus payout per qualifying hand: roughly $75-100</li>
      <li>Total bonus payouts per 100 hands: approximately <strong>$2,250-3,000</strong></li>
      <li>Total bonus bets wagered: <strong>$2,500</strong></li>
    </ul>

    <p>See what happened there? Your bonus bets are roughly <strong>breaking even or slightly profitable</strong> on the frequent small hits, with the potential for a massive windfall when you catch quads or better. Meanwhile, your base game is treading water.</p>

    <h3>Why You Should ALWAYS Play the Bonus</h3>

    <p>I cannot stress this enough. If you sit down at a Pai Gow table and don't play the bonus, you are literally leaving the best part of the game untouched. It's like going to a steakhouse and only ordering the bread.</p>

    <ul>
      <li>The bonus bet pays <strong>regardless</strong> of whether you win, lose, or push the base game</li>
      <li>Your 7-card hand will frequently qualify for bonus payouts</li>
      <li>The big hits (quads+) are what turn a breakeven session into a huge win</li>
      <li>You're already sitting at the table -- the marginal cost of the bonus bet is tiny compared to the potential upside</li>
    </ul>

    <p>In the next lesson, I'm going to tie everything together and show you the complete break-even strategy -- how to turn Pai Gow into a <strong>net positive</strong> proposition when you combine the base game, bonus bets, and comps. This is the stuff casinos don't want you to figure out.</p>
  `,
};
