import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 3: Executing the Strategy
 * Module 6 - Ultimate Texas Hold'em Group Strategy
 */
export const lesson3: Lesson = {
  id: 'mod6-lesson3-executing-the-strategy',
  slug: 'executing-the-strategy',
  title: 'Executing the Strategy',
  estimatedMinutes: 8,
  keyTakeaways: [
    'A pre-game briefing where everyone agrees on communication methods and profit splitting is essential before sitting down.',
    'The 4x pre-flop bet is the highest-value play in UTH -- shared card knowledge tells you exactly when to pull the trigger.',
    'Seat positioning matters: spread out around the table so you can see all cards easily without craning your necks.',
    'Lower-traffic times (weekday mornings, late nights) give you the best chance of getting 5 seats together and less casino scrutiny.',
    'When casinos push back, stay calm, be polite, and know your rights -- discussing face-up cards is not against any gaming regulation.',
  ],
  proTip:
    'The absolute best time to run this strategy is Tuesday through Thursday, early afternoon. Tables are empty, dealers are relaxed, and pit bosses are paying less attention. Weekend nights? Forget it -- tables are full of random players, the energy is chaotic, and floor staff are on high alert. Pick your spots like you pick your cards.',
  content: `
    <h3>The Pre-Game Briefing</h3>

    <p>Before your group walks into the casino, you need to have a meeting. I'm serious. Sit down at a coffee shop, a hotel room, whatever. And get aligned on everything.</p>

    <blockquote>
      "You wouldn't walk into a business meeting without a plan. This is a business meeting where the conference room happens to have slot machines."
    </blockquote>

    <p>Here's what you cover in the pre-game briefing:</p>

    <ul>
      <li><strong>Communication method:</strong> How will you share card info? Casual table talk? Specific phrases? Hand signals? Everyone needs to be using the same system.</li>
      <li><strong>Key cards to track:</strong> Agree on priorities. High cards first, then suits, then connected cards.</li>
      <li><strong>Bankroll and bet sizing:</strong> Everyone should be betting similar amounts. If one person is betting $10 and another is betting $500, it looks suspicious and creates uneven risk.</li>
      <li><strong>Profit splitting:</strong> Agree BEFORE you play. Equal split? Proportional to buy-in? Get this sorted now, not when someone's up $5,000 and someone else is down $500.</li>
      <li><strong>Exit strategy:</strong> When do you leave? Set a time limit or a profit/loss target as a group.</li>
    </ul>

    <h3>Bankroll Pooling: How to Split Profits</h3>

    <p>This is where friendships get tested. Be smart about it.</p>

    <p>My recommended approach:</p>

    <ul>
      <li><strong>Equal buy-ins, equal splits.</strong> Everyone puts in the same amount, everyone gets the same share of profits (or losses). This is the simplest and fairest method.</li>
      <li><strong>Track individual results.</strong> Even though you're splitting evenly, keep track of what each player won or lost individually. This helps you analyze which seats and strategies are working.</li>
      <li><strong>Settle at the end of the session, not during.</strong> Don't start moving chips around at the table. Cash out individually and settle up later.</li>
    </ul>

    <p>The math works because even if some players lose and others win, the <strong>group total</strong> should be positive over time with the information advantage. Individual variance evens out when you pool results.</p>

    <h3>Position Strategy: Where to Sit</h3>

    <p>This matters more than you think.</p>

    <ul>
      <li><strong>Spread out:</strong> Don't all sit in a cluster. If seats 1-5 are all your crew and seat 6-7 are strangers, it's obvious you're a group. Alternate with gaps if possible.</li>
      <li><strong>Visibility:</strong> Make sure everyone can see everyone else's cards without being obvious about it. If you're at seat 1 and your buddy is at seat 7, you need to be able to glance at their cards casually.</li>
      <li><strong>Dealer's blind spot:</strong> The dealer watches the middle of the table most closely. Players on the ends have slightly more freedom to scan the table.</li>
    </ul>

    <h3>The 4x Bet: Your Biggest Weapon</h3>

    <p>The <strong>4x pre-flop bet</strong> is the most valuable play in UTH. It's also the most intimidating because you're betting 4 times your ante before seeing community cards. Most solo players only make this bet with premium holdings.</p>

    <p>But with group information? The 4x bet becomes <strong>surgical</strong>.</p>

    <ul>
      <li><strong>When to 4x with confidence:</strong> You hold a strong hand AND you can see that the key cards the dealer would need are already distributed among your group. For example: you have A-Q, and your group has spotted the other 3 Aces. The dealer cannot have an Ace. Slam the 4x.</li>
      <li><strong>When to 4x despite a mediocre hand:</strong> Your hand is okay (like K-10), but the table has absorbed most of the premium cards. The dealer's hand is statistically weak. A 4x bet here has positive expected value because of your information edge.</li>
      <li><strong>When NOT to 4x:</strong> Your group can see that very few high cards have been dealt to players. That means the high cards are either in the dealer's hand or in the deck. This is a danger sign -- check or make a smaller bet.</li>
    </ul>

    <h3>The 2x Bet: Medium Confidence</h3>

    <p>After the flop (3 community cards), you now know <strong>13 cards</strong> as a group. The 2x bet is for situations where:</p>

    <ul>
      <li>The community cards helped your hand but you're not certain you're ahead</li>
      <li>Your elimination math shows the dealer is <strong>probably</strong> weak but you can't be sure</li>
      <li>You have a decent draw and the cards you need haven't appeared on the table</li>
    </ul>

    <p>The 2x bet is your <strong>medium-confidence play</strong>. You have an edge, but it's not overwhelming. The information advantage still makes this a profitable bet in spots where a solo player would check.</p>

    <h3>When to Check and Fold</h3>

    <p>Even with group information, sometimes the right play is to <strong>fold</strong>. Don't get greedy.</p>

    <ul>
      <li><strong>Fold when:</strong> The premium cards are NOT on the table (meaning the dealer likely has them), your hand is weak, and the community cards don't help you</li>
      <li><strong>Check when:</strong> You're unsure. Checking keeps you in the hand at minimum cost and gives you more information when the next community cards come</li>
    </ul>

    <blockquote>
      "The discipline to fold a bad hand is just as valuable as the courage to bet big on a good one. Information doesn't help you if you don't act on it -- including the information that says 'sit this one out.'"
    </blockquote>

    <h3>Dealing with Casino Pushback</h3>

    <p>Let's be real -- if you run this strategy well, the casino will eventually notice. Here's how to handle it:</p>

    <ul>
      <li><strong>Stay calm and polite.</strong> Getting confrontational accomplishes nothing. You're a paying customer enjoying a legal game.</li>
      <li><strong>Know the rules.</strong> In most jurisdictions, discussing face-up cards is not against any gaming regulation. The cards are public information.</li>
      <li><strong>If they ask you to stop talking:</strong> Comply politely, but know that visual information is impossible to restrict. You can still see all the cards. You just can't verbally discuss them.</li>
      <li><strong>If they ask you to leave:</strong> Casinos are private property and can refuse service. Don't make a scene. Cash out and go to a different property. There are hundreds of casinos.</li>
      <li><strong>Rotate properties:</strong> Don't hit the same casino every day. Spread your action around so you don't build a reputation at any single property.</li>
    </ul>

    <h3>Why Lower-Traffic Times Are Better</h3>

    <p>This strategy works best when your group can fill most or all of the seats at a table. That's much easier at off-peak times:</p>

    <ul>
      <li><strong>Weekday mornings and early afternoons:</strong> Tables are often empty. You might get a private table.</li>
      <li><strong>Late weeknights:</strong> After the dinner crowd leaves, tables thin out.</li>
      <li><strong>Avoid:</strong> Friday and Saturday nights, holidays, and big event weekends. Tables are packed with random players who will disrupt your coordination.</li>
    </ul>

    <p>When you control the table, you control the information. That's the whole game.</p>
  `,
};
