import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 2: Card Sharing & Calculating Outs
 * Module 6 - Ultimate Texas Hold'em Group Strategy
 */
export const lesson2: Lesson = {
  id: 'mod6-lesson2-card-sharing-and-calculating-outs',
  slug: 'card-sharing-and-calculating-outs',
  title: 'Card Sharing & Calculating Outs',
  estimatedMinutes: 12,
  keyTakeaways: [
    'Quick, efficient card communication at the table is the foundation of group UTH strategy -- you need to share information in seconds, not minutes.',
    'With 5 players seeing 10 cards plus 3-5 community cards, you can know 13-15 out of 52 cards, leaving only 37-39 unknown.',
    'Elimination math is simple: if you need a King and two Kings are visible, only 2 remain in the unknown cards instead of 4.',
    'Verbal communication about face-up cards is legal at most casinos -- you are discussing publicly visible information in a public game.',
    'Practice at home until card scanning and communication becomes second nature before bringing this strategy to a real casino.',
  ],
  proTip:
    'Develop a simple shorthand with your group before you hit the casino. Something like calling out "two Kings out" or "hearts are heavy" (meaning lots of hearts are visible). Keep it natural and conversational. If you\'re using obvious coded signals, you\'ll attract attention from the pit. The best groups sound like friends chatting about the game -- because that\'s exactly what they are.',
  content: `
    <h3>Communication Is Everything</h3>

    <p>You can have 5 brilliant players at a UTH table, but if you can't share information quickly and clearly, you have <strong>nothing</strong>. The speed of communication is what makes or breaks this strategy.</p>

    <blockquote>
      "You have maybe 30 seconds between when cards are dealt and when the dealer expects a decision. In those 30 seconds, your group needs to scan, process, and communicate 10 cards worth of information. Practice makes perfect."
    </blockquote>

    <p>Here's the thing -- you don't need to communicate every card. You need to communicate <strong>what matters</strong>. And what matters depends on what each player is holding.</p>

    <h3>What to Communicate and How</h3>

    <p>When cards are dealt, here's the priority of information to share:</p>

    <ul>
      <li><strong>High cards:</strong> Where are the Aces, Kings, Queens, and Jacks? These are the cards that make or break premium hands. A quick "I've got an Ace" or "two Kings on the table" tells everyone critical information.</li>
      <li><strong>Pairs visible:</strong> If two players each have a King, that's two Kings accounted for. The dealer's chance of holding a King just dropped by 50%.</li>
      <li><strong>Suit concentration:</strong> If you can see 4 hearts across the table, that dramatically reduces the chance of a heart flush for the dealer. "Hearts are stacked" is all you need to say.</li>
      <li><strong>Connected cards:</strong> If lots of middle cards (7-8-9-10-J) are visible, straight possibilities for the dealer decrease.</li>
    </ul>

    <h3>The Math of Elimination</h3>

    <p>This is poker math 101, but with a massive information advantage. Let me walk you through it.</p>

    <p><strong>Standard UTH (solo play):</strong></p>
    <ul>
      <li>You see 2 cards out of 52</li>
      <li>50 unknown cards remain</li>
      <li>You need an Ace? There are 4 Aces in 50 unknown cards = 8% chance per card</li>
    </ul>

    <p><strong>Group UTH (5 players):</strong></p>
    <ul>
      <li>You see 10 cards out of 52</li>
      <li>42 unknown cards remain</li>
      <li>You need an Ace, but your group has spotted 2 Aces already? There are 2 Aces in 42 unknown cards = 4.8% chance per card</li>
    </ul>

    <p>That's a <strong>40% reduction</strong> in the probability of the dealer having what you're worried about. And this is before community cards.</p>

    <h3>After the Flop: Even More Information</h3>

    <p>Once the flop comes out (3 community cards), your group now knows <strong>13 cards</strong>. That's 25% of the entire deck. The remaining 39 unknown cards include the dealer's 2 cards and 36 cards nobody has seen.</p>

    <p>At this point, your calculations become extremely precise:</p>

    <ul>
      <li><strong>Flush draws:</strong> Count how many of each suit are visible across all hands + community cards. If you see 7 hearts out of 13, there are only 6 hearts left in 39 cards. The dealer completing a heart flush is nearly impossible.</li>
      <li><strong>Straight draws:</strong> Count the gaps. If 8, 9, 10, J are all visible across the table, nobody's making a straight through those cards.</li>
      <li><strong>Pair/trips:</strong> If 3 Queens are visible, there's only 1 Queen left. The dealer having queens is a 1-in-39 shot.</li>
    </ul>

    <h3>Practical Examples</h3>

    <p>Let me give you some real scenarios.</p>

    <p><strong>Scenario 1:</strong> You hold A-K. Across the other 4 players, you can see the other 3 Aces. There is <strong>zero chance</strong> the dealer has an Ace. Your Ace-high hand just became significantly more valuable because the dealer cannot pair an Ace.</p>

    <p><strong>Scenario 2:</strong> You hold 7-2 offsuit (garbage). But across the table, you can see that all 4 Aces and 3 Kings are already dealt to players. The dealer's maximum likely hand is Queen-high. Your garbage hand suddenly has a much better chance because the deck is stripped of premium cards.</p>

    <p><strong>Scenario 3:</strong> You hold a pair of Jacks. The flop comes Q-10-3. Across the table, you can see 3 Queens already out. There's only 1 Queen left in the deck -- the dealer's chance of having a Queen to beat your Jacks just dropped from ~9% to ~2.5%.</p>

    <h3>Hand Signals and Table Talk</h3>

    <p>Let me be very clear about something:</p>

    <blockquote>
      "Verbal communication about face-up cards is legal. You are discussing publicly visible information. The casino dealt these cards face-up in a public game. There is no rule against talking about what everyone can see."
    </blockquote>

    <p>That said, you want to be <strong>natural</strong> about it. Here's what works:</p>

    <ul>
      <li><strong>Casual commentary:</strong> "Oh nice, you got pocket Kings" -- this tells your whole group that two Kings are accounted for</li>
      <li><strong>General observations:</strong> "Lot of face cards on the table tonight" -- alerts everyone to count the high cards</li>
      <li><strong>Suit mentions:</strong> "I'm seeing spades everywhere" -- signals a suit concentration</li>
      <li><strong>Simple counts:</strong> Holding up fingers to indicate how many of a key card you've spotted</li>
    </ul>

    <p>What you do NOT want to do:</p>

    <ul>
      <li>Use obvious code words that sound unnatural</li>
      <li>Whisper to each other like you're planning a heist</li>
      <li>Take forever to make decisions while you count and recount</li>
      <li>Tell other players how to bet (that crosses into collusion territory)</li>
    </ul>

    <p>Keep it casual. Keep it quick. Keep it natural. You're friends playing cards and chatting about the hands -- that's all the casino needs to see.</p>

    <p>Next lesson, we put it all together: the full execution strategy, from pre-game planning to profit splitting.</p>
  `,
};
