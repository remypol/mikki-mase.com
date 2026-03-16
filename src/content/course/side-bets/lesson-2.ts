import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 2: Side Bets to Avoid
 * Module 4 - Side Bets That Actually Work
 */
export const lesson2: Lesson = {
  id: 'mod4-lesson2-side-bets-to-avoid',
  slug: 'side-bets-to-avoid',
  title: 'Side Bets to Avoid',
  estimatedMinutes: 8,
  keyTakeaways: [
    'Insurance is a side bet with a 7.7% house edge disguised as a protective measure -- never take it under any circumstances.',
    'Perfect Pairs, Lucky Ladies, Dealer Bust, and progressive jackpot side bets all carry enormous house edges ranging from 5% to over 25%.',
    'The golden rule: if the casino is heavily promoting a side bet, it is because that bet is extremely profitable for THEM.',
    'Casinos continuously add more side bets to their tables because side bets have dramatically higher margins than the base game.',
    'Every dollar you put into a bad side bet is a dollar taken away from your base blackjack game where you actually have a fighting chance.',
  ],
  proTip:
    'Here is a simple test for any side bet: ask yourself, "Can I find the house edge for this bet?" If the casino does not openly publish it, it is because the number is embarrassingly bad. Any side bet with a house edge above 3% is a hard no. Most of the ones I am about to list are above 5%, and some exceed 20%.',
  content: `
    <h3>The Graveyard of Bad Bets</h3>

    <p>In the last lesson, I showed you the one side bet that can be worth your time. Now let me show you <strong>every other side bet that's designed to rob you.</strong></p>

    <p>Casinos love side bets because the house edge on them is <strong>astronomical</strong> compared to the base game. While blackjack with basic strategy has a 0.5% house edge, most side bets run between 5% and 25%. Some are even worse. They're the most profitable square footage on the entire casino floor.</p>

    <blockquote>
      "Side bets are where the casino makes its real money. The base game is almost a loss leader to get you to the table. The side bets are the profit center."
    </blockquote>

    <h3>Insurance: The Most Successful Scam in Casino History</h3>

    <p>I've said it before and I'll say it again: <strong>never take insurance.</strong> But let me go deeper on why, because this is the most common mistake I see.</p>

    <p>Insurance is offered when the dealer shows an Ace. You can bet up to half your original bet that the dealer has blackjack. It pays 2:1.</p>

    <p>The house edge on insurance is <strong>7.7%</strong>. Here's why:</p>

    <ul>
      <li>In a standard deck, there are 16 ten-value cards out of 52 total cards</li>
      <li>That means the dealer has a 10 underneath about <strong>30.8% of the time</strong></li>
      <li>For a 2:1 bet to break even, the event needs to happen <strong>33.3% of the time</strong></li>
      <li>30.8% is less than 33.3% -- so the math <strong>always</strong> favors the house</li>
    </ul>

    <p>The word "insurance" is the most brilliant marketing in casino history. It makes you think you're <strong>protecting</strong> your hand. You're not. You're making a completely separate bet with terrible odds. It has nothing to do with your hand. It's a pure side bet on whether the dealer has a 10 underneath.</p>

    <p><strong>"Even money"</strong> is the same trap dressed differently. When you have blackjack and the dealer shows an Ace, the casino offers you "even money" -- guaranteed 1:1 payout instead of waiting to see if the dealer also has blackjack. This is mathematically identical to taking insurance. Decline it every time.</p>

    <h3>Dealer Bust Side Bet</h3>

    <p>This bet wins if the dealer busts. Sounds reasonable -- dealers bust a lot, right? About 28% of the time overall.</p>

    <p>The problem: the <strong>payouts don't match the odds</strong>. The house edge on Dealer Bust bets ranges from <strong>5% to 10%</strong> depending on the specific payout table. You're betting on an event that happens frequently but being paid as if it's rarer than it is.</p>

    <p>Some variations pay more for specific bust totals (dealer busts with exactly 22, 23, etc.). This sounds more exciting but the house edge is usually <strong>even worse</strong> on these structured versions.</p>

    <h3>Perfect Pairs</h3>

    <p>This bet wins if your first two cards are a pair. Payouts vary by pair type:</p>

    <ul>
      <li><strong>Mixed pair</strong> (same rank, different color): pays 5:1</li>
      <li><strong>Colored pair</strong> (same rank, same color, different suit): pays 10:1</li>
      <li><strong>Perfect pair</strong> (same rank, same suit): pays 30:1</li>
    </ul>

    <p>The house edge: <strong>5.8% to 7.9%</strong> depending on the number of decks and the specific payout table.</p>

    <p>You'll get a pair roughly once every 17 hands. Most of those will be mixed pairs paying only 5:1. The perfect pairs that pay 30:1 are extremely rare. Over time, you're hemorrhaging money on this bet.</p>

    <h3>Lucky Ladies</h3>

    <p>Lucky Ladies pays based on your first two cards totaling 20, with bonuses for specific combinations (two Queens of Hearts being the jackpot). The top payout can be 1000:1 or more.</p>

    <p>The house edge: <strong>17% to 25%</strong>. Yes, you read that right. This is one of the worst bets on the entire casino floor. The massive jackpot payout distorts your perception -- you think "if I hit that Queen of Hearts combo, I'll be rich!" The reality is you'll lose your side bet hundreds of times before you hit anything significant.</p>

    <h3>Progressive Jackpot Side Bets</h3>

    <p>Some tables feature a progressive jackpot side bet -- usually $1 or $5 per hand. The jackpot grows until someone hits a specific hand combination (like a Royal Flush in your first two cards plus the dealer's upcard).</p>

    <p>The house edge: often <strong>20% to 35%</strong>. These are essentially <strong>slot machines disguised as table game side bets</strong>. The jackpot number looks big and exciting, but the probability of hitting it is astronomically low. You'd need to play tens of thousands of hands to have a reasonable shot, and by then you've fed hundreds or thousands of dollars into the side bet.</p>

    <p>The progressive element is psychologically powerful -- "someone has to win it eventually" -- but that someone almost certainly won't be you, and the math ensures you lose money chasing it.</p>

    <h3>The Golden Rule of Side Bets</h3>

    <blockquote>
      "If the casino is promoting it, it's because it's profitable for them. Every time you see a flashy side bet with a big payout number, that number exists to distract you from the house edge that's eating you alive."
    </blockquote>

    <p>Think about this logically: casinos are businesses. They don't add features to their games that cost them money. Every side bet on that felt was put there because someone did the math and said, <strong>"This will generate X million in additional revenue per year."</strong></p>

    <p>The more aggressively a side bet is marketed -- with lit-up signs, special chip placements, dealer prompts -- the more profitable it is for the casino. The marketing budget comes from the edge they're taking from you.</p>

    <h3>Why Casinos Keep Adding More Side Bets</h3>

    <p>Ten years ago, a blackjack table had one game: blackjack. Today, some tables have <strong>three or four side bet options</strong> crowding the felt. Why?</p>

    <ul>
      <li><strong>Higher margins.</strong> The base blackjack game has a thin 0.5% edge with basic strategy. Side bets have edges of 5-25%. The casino makes dramatically more money per dollar wagered on side bets.</li>
      <li><strong>Player demand.</strong> Recreational players love the excitement of big payouts. Side bets create lottery-ticket moments that keep people coming back.</li>
      <li><strong>Distraction.</strong> The more side bets on the table, the more players split their attention and bankroll. Every dollar on a side bet is a dollar <strong>not</strong> being played on the base game where you have the best odds.</li>
      <li><strong>Revenue diversification.</strong> If a player runs the base game well, side bets still generate profit for the house. The casino wins either way.</li>
    </ul>

    <h3>The Bottom Line</h3>

    <p>Here is your complete guide to side bets:</p>

    <ul>
      <li><strong>21+3 (flat 9:1):</strong> The only side bet worth considering. Bet at 10% of your main bet.</li>
      <li><strong>Everything else:</strong> Do not play. Not insurance. Not Perfect Pairs. Not Lucky Ladies. Not Dealer Bust. Not the progressive. Not anything with a flashy sign.</li>
    </ul>

    <p>Every dollar you put into a bad side bet is a dollar <strong>stolen from your base game</strong> -- the game where you actually have the tools and knowledge to compete. Protect your bankroll. Play the base game right. And let the tourists fund the casino's electricity bill with their side bet dollars.</p>
  `,
};
