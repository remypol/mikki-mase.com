import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 1: The 21+3 Side Bet
 * Module 4 - Side Bets That Actually Work
 */
export const lesson1: Lesson = {
  id: 'mod4-lesson1-the-21-plus-3-side-bet',
  slug: 'the-21-plus-3-side-bet',
  title: 'The 21+3 Side Bet',
  estimatedMinutes: 10,
  keyTakeaways: [
    'The 21+3 side bet combines your two cards plus the dealer upcard to form a three-card poker hand -- paying 9:1 on any qualifying combination.',
    'Unlike most side bets, 21+3 can approach a player-favorable edge when combined with card information from the main game.',
    'The sweet spot for 21+3 is betting approximately 10% of your main blackjack bet -- enough to profit when it hits without draining your bankroll.',
    'Qualifying hands include flush, straight, three of a kind, straight flush, and suited trips -- learn to recognize them instantly.',
    'The 21+3 bet is one of the very few side bets worth considering, but only at tables where the payout structure is favorable.',
  ],
  proTip:
    'Not all 21+3 payouts are created equal. The best version pays a flat 9:1 for any qualifying hand. Some casinos have changed to tiered payouts (5:1 for a flush, 10:1 for a straight, etc.) which can actually be worse overall. Check the payout table printed on the felt before you place the bet. The flat 9:1 version is what you want.',
  content: `
    <h3>The One Side Bet Worth Your Money</h3>

    <p>In the last module, I told you that basic strategy and game selection are everything. And they are. But there's <strong>one side bet</strong> that actually deserves your attention -- and it's the 21+3.</p>

    <p>Let me be clear upfront: <strong>most side bets are garbage.</strong> They exist to separate stupid money from stupid people. But the 21+3 is different, and I'm going to explain exactly why.</p>

    <blockquote>
      "I don't play side bets because they're fun. I play exactly one side bet because the math occasionally works in my favor. If the math didn't work, I wouldn't touch it."
    </blockquote>

    <h3>What Is the 21+3 Side Bet?</h3>

    <p>The 21+3 is simple: your <strong>two cards</strong> plus the <strong>dealer's upcard</strong> form a three-card poker hand. If those three cards make a qualifying poker combination, you win. If they don't, you lose your side bet.</p>

    <p>The standard payout is <strong>9:1</strong> for any qualifying hand. That means if you bet $10 on 21+3 and hit, you win $90.</p>

    <p>The qualifying hands are:</p>

    <ul>
      <li><strong>Flush:</strong> All three cards are the same suit (e.g., 7 of hearts, King of hearts, 3 of hearts)</li>
      <li><strong>Straight:</strong> Three cards in sequential order (e.g., 5-6-7, regardless of suit)</li>
      <li><strong>Three of a Kind:</strong> Three cards of the same rank (e.g., three 8s of different suits)</li>
      <li><strong>Straight Flush:</strong> Three sequential cards of the same suit (e.g., 4-5-6 of spades)</li>
      <li><strong>Suited Trips:</strong> Three cards of the same rank AND same suit (e.g., three Kings of diamonds -- extremely rare)</li>
    </ul>

    <p>With the flat 9:1 payout, you get the same return regardless of which hand type you hit. Some casinos use tiered payouts where better hands pay more, but the flat 9:1 is often the better deal overall.</p>

    <h3>Why the Math Can Work</h3>

    <p>Here's where the 21+3 gets interesting. The base house edge on this bet, with no additional information, is roughly <strong>3.2-3.7%</strong> depending on the number of decks. That's not great on its own -- worse than basic strategy blackjack.</p>

    <p>But here's the key: you're playing the 21+3 <strong>alongside your main blackjack hand</strong>. And as you play blackjack, you naturally observe cards being dealt. Over the course of a shoe, the composition of remaining cards changes. And that changing composition can occasionally push the 21+3 into <strong>player-favorable territory</strong>.</p>

    <p>When the remaining shoe is rich in certain card concentrations -- lots of suited cards, lots of sequential cards, lots of same-rank cards -- the probability of hitting a 21+3 qualifying hand goes up. If you know what to look for, you can identify these situations and bet accordingly.</p>

    <p>This isn't card counting in the traditional sense. You're not tracking a running count. You're developing an <strong>awareness</strong> of the shoe composition that informs your side bet decisions.</p>

    <h3>The Sweet Spot: 10% of Your Main Bet</h3>

    <p>The key to the 21+3 is <strong>bet sizing</strong>. You never want the side bet to become a significant portion of your action. Here's the rule:</p>

    <p><strong>Bet your 21+3 at approximately 10% of your main blackjack bet.</strong></p>

    <ul>
      <li>Main bet: $100 → 21+3 bet: $10</li>
      <li>Main bet: $500 → 21+3 bet: $50</li>
      <li>Main bet: $200 → 21+3 bet: $20</li>
    </ul>

    <p>Why 10%? Because at this level:</p>

    <ul>
      <li>A win pays 9:1, giving you a nice boost ($90 on a $10 bet) without needing to win to have a profitable session</li>
      <li>A loss is small enough that it doesn't meaningfully impact your blackjack bankroll</li>
      <li>Over time, the side bet adds variance but doesn't dramatically increase your overall house edge exposure</li>
      <li>When conditions are favorable, the 10% bet captures value without overcommitting</li>
    </ul>

    <h3>How to Identify Tables That Offer 21+3</h3>

    <p>Not every blackjack table has the 21+3 side bet. Here's how to find them:</p>

    <ul>
      <li><strong>Look at the felt.</strong> 21+3 tables have an extra betting circle (or diamond shape) printed near the main betting area, usually labeled "21+3."</li>
      <li><strong>Check the payout table.</strong> The qualifying hands and their payouts will be printed on the felt or on a placard at the table. Look for the flat 9:1 structure.</li>
      <li><strong>Ask the dealer.</strong> "Does this table have the 21+3 side bet?" Simple and direct.</li>
      <li><strong>Check the minimums.</strong> 21+3 typically has its own minimum bet, often $5 or $10, regardless of the table minimum.</li>
    </ul>

    <h3>Understanding the Poker Hands</h3>

    <p>You need to be able to <strong>instantly recognize</strong> whether your three cards (your two plus dealer's upcard) form a qualifying hand. Practice this until it's automatic:</p>

    <ul>
      <li><strong>Flush recognition:</strong> All three cards the same suit? That's a flush. Hearts-hearts-hearts. Spades-spades-spades. This is the most common qualifying hand.</li>
      <li><strong>Straight recognition:</strong> Are the three cards in sequence? Remember that Ace can be high or low (A-2-3 counts, Q-K-A counts). Suits don't matter for a basic straight.</li>
      <li><strong>Three of a kind:</strong> All three cards the same rank? Three 7s, three Jacks, etc. Different suits.</li>
      <li><strong>Straight flush:</strong> Sequential AND same suit. This is rare and beautiful. 7-8-9 of clubs, for example.</li>
      <li><strong>Suited trips:</strong> All three cards same rank AND same suit. This is astronomically rare in a multi-deck game.</li>
    </ul>

    <p>The most common winner you'll see is the flush, followed by the straight. Three of a kind happens less often. Straight flushes and suited trips are rare enough that they're a nice surprise when they hit.</p>

    <h3>When NOT to Play 21+3</h3>

    <p>The 21+3 is the only side bet I'll consider, but even I don't play it all the time:</p>

    <ul>
      <li><strong>Don't play it at CSM tables.</strong> You gain zero informational edge, so you're paying the full base house edge.</li>
      <li><strong>Don't play it if the payout structure is bad.</strong> Some casinos have modified payouts that increase the house edge significantly.</li>
      <li><strong>Don't play it if you're on a short bankroll.</strong> The side bet adds variance. If your bankroll can't handle swings, skip it.</li>
      <li><strong>Don't increase the side bet to chase losses.</strong> It stays at 10% of your main bet. Always.</li>
    </ul>

    <p>In the next lesson, I'll walk you through every other side bet on the casino floor and explain exactly why you should avoid them. The 21+3 is the exception. Everything else is a trap.</p>
  `,
};
