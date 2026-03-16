import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 1: Blackjack Types Ranked
 * Module 3 - Blackjack Mastery
 */
export const lesson1: Lesson = {
  id: 'mod3-lesson1-blackjack-types-ranked',
  slug: 'blackjack-types-ranked',
  title: 'Blackjack Types Ranked',
  estimatedMinutes: 10,
  keyTakeaways: [
    'Double deck blackjack with 3:2 payouts is the best variant for advantage players -- fewer cards and fair payout structure.',
    'Single deck sounds ideal but almost always pays 6:5 on blackjack instead of 3:2, which dramatically increases the house edge.',
    'Continuous Shuffle Machines (CSMs) make it impossible to gain any edge -- walk away from these tables immediately.',
    'Penetration (how deep the dealer goes before reshuffling) is one of the most important factors in choosing a table.',
    'NEVER play at a table that pays 6:5 on blackjack -- the 3:2 payout is non-negotiable.',
  ],
  proTip:
    'Before you sit down at any blackjack table, check three things: (1) Does it pay 3:2 on blackjack? This is printed on the felt. (2) How many decks are in the shoe? Ask the dealer. (3) Is it a continuous shuffle machine? If you see cards going back in after every hand, walk away. These three checks take 10 seconds and save you thousands.',
  content: `
    <h3>Not All Blackjack Is Created Equal</h3>

    <p>Most people walk into a casino, find a blackjack table with an open seat, and sit down. They never look at the rules. They never check the payout structure. They never count the decks.</p>

    <p><strong>This is how you lose before you play your first hand.</strong></p>

    <p>The difference between the best and worst blackjack games is enormous. We're talking about a house edge swing of <strong>several percentage points</strong> -- which over a session of play can mean the difference between winning and getting crushed. Table selection is the first decision you make, and it's the most important one.</p>

    <blockquote>
      "Sitting down at the wrong blackjack table is like showing up to a fight with your hands tied behind your back. The game is already over."
    </blockquote>

    <h3>The Ranking: Worst to Best</h3>

    <h3>#6 (WORST): Continuous Shuffle Machines</h3>

    <p>If you take <strong>one thing</strong> from this entire lesson, let it be this: <strong>never, ever play at a table with a Continuous Shuffle Machine.</strong></p>

    <p>A CSM takes the cards that were just played and feeds them right back into the shoe. There's no discard pile. There's no shuffle point. The cards are in a constant state of randomization. This means:</p>

    <ul>
      <li>Card counting is <strong>completely impossible</strong></li>
      <li>Any form of advantage play based on card information is <strong>eliminated</strong></li>
      <li>The house edge grinds you down with zero opportunity to fight back</li>
      <li>More hands per hour (no shuffle breaks) = more exposure to the house edge</li>
    </ul>

    <p>CSMs exist for one reason: <strong>to neutralize advantage players</strong>. If the casino is using them, they're telling you exactly who they're worried about. I'll cover how to spot these machines in a later lesson.</p>

    <h3>#5: 8-Deck Shoe</h3>

    <p>Eight decks of cards. That's <strong>416 cards</strong> in play. Even with card tracking techniques, the sheer volume of cards makes it extremely difficult to gain a meaningful edge. The more decks in the shoe, the closer the game plays to "true" probability -- which favors the house.</p>

    <p>On top of that, 8-deck games often come with other bad rules: restricted doubling, no surrender, dealer hits on soft 17. It's a bad game wrapped in worse rules.</p>

    <h3>#4: Single Deck (The Trap)</h3>

    <p>This is where casinos get <strong>sneaky</strong>. Single deck blackjack sounds incredible -- only 52 cards, maximum card information, easiest to track. And mathematically, single deck <strong>does</strong> have a lower base house edge.</p>

    <p>But here's the catch: almost every single deck game in a modern casino pays <strong>6:5 on blackjack instead of 3:2</strong>.</p>

    <p>Let me show you what that means in real money:</p>

    <ul>
      <li><strong>3:2 payout:</strong> You bet $100, get blackjack, you win <strong>$150</strong></li>
      <li><strong>6:5 payout:</strong> You bet $100, get blackjack, you win <strong>$120</strong></li>
    </ul>

    <p>That's <strong>$30 less every single time you hit blackjack.</strong> Over a session, this adds roughly <strong>1.4% to the house edge</strong>. That completely destroys the advantage of having fewer decks. The casino gives you the illusion of a better game while actually making it worse.</p>

    <blockquote>
      "6:5 blackjack is a scam wearing a tuxedo. It looks premium. It plays like a slot machine."
    </blockquote>

    <h3>#3: 6-Deck Shoe</h3>

    <p>Now we're getting into playable territory. A 6-deck shoe with good rules and good <strong>penetration</strong> is a solid game. Not the best, but workable.</p>

    <p>What's penetration? It's how deep the dealer goes into the shoe before reshuffling. If they deal through 5 out of 6 decks before shuffling, that's great penetration (about 83%). If they only deal 3 out of 6 decks, that's terrible.</p>

    <p>Why does this matter? Because the deeper into the shoe you go, the <strong>more information you have about remaining cards</strong>. Better penetration means better opportunities for informed play.</p>

    <p>Look for 6-deck games that:</p>

    <ul>
      <li>Pay <strong>3:2</strong> on blackjack (non-negotiable)</li>
      <li>Have penetration of <strong>75% or better</strong></li>
      <li>Allow <strong>doubling on any two cards</strong></li>
      <li>Offer <strong>surrender</strong></li>
      <li>Dealer <strong>stands on soft 17</strong> (S17, not H17)</li>
    </ul>

    <h3>#2: Double Deck (BEST)</h3>

    <p>Double deck blackjack is the <strong>gold standard</strong> for advantage players. Here's why:</p>

    <ul>
      <li><strong>Only 104 cards</strong> -- manageable amount of card information</li>
      <li>Almost always pays <strong>3:2</strong> on blackjack</li>
      <li>Lower base house edge than multi-deck games</li>
      <li>Better opportunity for card-aware play</li>
      <li>Found in high-limit rooms at most major casinos</li>
    </ul>

    <p>A double deck game with good rules and good penetration is <strong>beatable</strong>. This is where I spend most of my time at the blackjack table. If you can find a double deck game that pays 3:2, allows doubling on any two cards, and deals at least 60-65% penetration -- you've found a good game.</p>

    <h3>Why the Number of Decks Matters</h3>

    <p>Let me make this crystal clear. With fewer decks:</p>

    <ul>
      <li>Each card removed has a <strong>bigger impact</strong> on the remaining composition</li>
      <li>Your <strong>information advantage</strong> increases with every card you see</li>
      <li>The natural frequency of blackjack is <strong>slightly higher</strong> (and pays more at 3:2)</li>
      <li>Doubling down becomes <strong>more effective</strong> because high/low card ratios shift more dramatically</li>
    </ul>

    <p>More decks = more dilution = less information = less edge. It's that simple.</p>

    <h3>The Non-Negotiable Rule</h3>

    <p>I don't care what the game is, how many decks are in play, or how friendly the dealer looks. If the table pays <strong>6:5 on blackjack, you do not sit down</strong>. Period. End of discussion.</p>

    <p>The 3:2 payout is <strong>non-negotiable</strong>. It's printed right on the felt -- usually in the semicircle where it says "Blackjack pays..." Check it before you put a single chip on the table. If it says 6:5, stand up and find another table. There is no strategy in the world that overcomes a 6:5 payout.</p>

    <p>In the next lesson, we'll get into the actual strategy -- how to play every hand correctly. But all the strategy in the world is worthless if you're sitting at the wrong table.</p>
  `,
};
