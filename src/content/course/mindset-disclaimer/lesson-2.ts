import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 2: Why Most Players Lose
 * Module 1 - Mindset & Disclaimer
 *
 * Rewritten Sprint 5b per content audit — Authenticity lift from 6 → target 9.
 * Injected Wynn/Bellagio/Cosmopolitan specificity, Mikki ban backstory,
 * and compounded-edge math the audit asked for.
 */
export const lesson2: Lesson = {
  id: 'mod1-lesson2-why-most-players-lose',
  slug: 'why-most-players-lose',
  title: 'Why Most Players Lose',
  subtitle: 'The house edge is math. Your brain is chemistry. The casino is an environment engineered to weaponise both against you.',
  difficulty: 'foundation',
  fieldNote:
    'Next time you walk into any property, set a 60-second timer and just watch the floor before you sit down. Count the clocks you see. Count the windows. Count the exits visible from the middle of the pit. Write the numbers in your phone notes. You\'ll never look at a casino the same way again.',
  promise: [
    'See the casino floor as an engineered environment, not a venue',
    'Know which four emotions blow up bankrolls and why',
    'Understand the compounding cost of the house edge over a session',
  ],
  estimatedMinutes: 10,
  keyTakeaways: [
    'Casino floors are scientifically engineered environments designed to make you lose track of time, money, and rational thought.',
    'The house edge is a built-in mathematical tax that compounds every hour you sit at a table — the longer you play, the more certain it wins.',
    'Greed, frustration, excitement, and overconfidence are the four emotions that destroy bankrolls. Math does not care about any of them.',
    'Loyalty programs are not gifts — they return 10-30% of your losses to keep you coming back and losing more.',
    'If the casino lets you win consistently, they ban you. That tells you exactly who the game is designed to favor.',
  ],
  proTip:
    'Next time you walk into a casino, look for the clocks. Look for the windows. Look for a clear path to the exit. You won\'t find any of them easily -- and that\'s by design. Knowing the tricks they\'re pulling on you is the first step to not falling for them. Do this at three different properties on the same trip — compare notes. The Wynn hides exits differently than the Cosmopolitan. Same playbook, different furniture.',
  content: `
    <h3>The Casino Is Not Your Friend</h3>

    <p>Let me paint you a picture. You walk into the Bellagio on a Friday night and what do you see? Chandeliers the size of cars. The smell of scented oxygen they literally pump through the vents. Free Macallan in your hand before you've picked a table. Cocktail waitresses who know your name. Everything feels <strong>amazing</strong>. You feel like a VIP. You feel like tonight is your night.</p>

    <p>Congratulations -- you've already started losing.</p>

    <blockquote>
      "Every single thing you experience in a casino is designed to do one thing: separate you from your money as efficiently as possible. The lobby is the beginning of the game. Most people don't realise they've been playing for forty minutes before they sit down."
    </blockquote>

    <p>This isn't a conspiracy theory. This is a multi-billion-dollar industry with teams of psychologists, architects, data scientists, and behavioral economists working around the clock to optimise their extraction of your cash. MGM spends more on behavioural research than most universities do. They're not guessing. They're using science.</p>

    <h3>The Psychology of the Casino Floor</h3>

    <p>Let's break down the tricks they're running on you, because once you see them, you can't unsee them:</p>

    <ul>
      <li><strong>No clocks, no windows:</strong> You literally have no idea what time it is. They don't want you thinking about the fact that you've been sitting there for six hours. The Wynn is famous for this — you can walk from the casino floor to the pool at 4 PM and genuinely not know if you missed dinner.</li>
      <li><strong>The lighting:</strong> It's always the same — a warm, comfortable glow that mimics permanent golden hour. 3 AM looks exactly like 3 PM. Your circadian rhythm gets completely hijacked, which is why trip-ending fatigue hits people like a truck on the flight home.</li>
      <li><strong>The sounds:</strong> Every slot machine is tuned to play in a major key. When someone wins, the whole floor erupts. When someone loses? Silence. Your brain starts associating the casino with winning, even though losing is the statistical norm on every single machine.</li>
      <li><strong>Free drinks:</strong> The oldest trick in the book. Alcohol impairs judgment. Impaired judgment means bigger bets and dumber decisions. That "free" Macallan costs them $12. If it leads to one extra emotional double-down for $500, they've just booked a 40-to-1 return on the drink.</li>
      <li><strong>The maze layout:</strong> Notice how you can never find the exit? How you have to walk past hundreds of machines and tables to get anywhere, including your own hotel room? That's deliberate. Every extra second you spend on the floor is another chance for them to catch your eye.</li>
      <li><strong>Chips instead of cash:</strong> You're not betting $500 — you're betting five little round discs. It doesn't feel like real money because it's not supposed to. The psychological distance between you and your actual cash is engineered to make you bet more than you'd ever put down in bills. When the $1,000 chips hit the felt, most people hesitate less than they would pulling out a Benjamin.</li>
    </ul>

    <h3>Why Emotional Players Always Lose</h3>

    <p>Here's the truth that nobody wants to hear: <strong>most people gamble with their emotions, not their brains.</strong></p>

    <p>They sit down at a blackjack table and they "feel" like they should hit. They "feel" like the dealer is cold. They "feel" like they're due for a win. Feelings have absolutely nothing to do with mathematics, and mathematics is the only thing that matters at a casino.</p>

    <p>The four emotions that destroy bankrolls:</p>

    <ul>
      <li><strong>Greed:</strong> "I'm up $5,000 — let me push for $10,000." This is how you leave with nothing. I've watched guys go from +$40K at the Wynn to even in an hour, chasing a number they'd already passed. Set a stop-win and honor it.</li>
      <li><strong>Frustration:</strong> "I've lost $2,000 — I need to win it back." This is called chasing losses and it's the fastest route to zero. The math on the hand doesn't care how much you've lost on previous hands. Set a stop-loss and honor it.</li>
      <li><strong>Excitement:</strong> The second you're having fun, you've stopped thinking about math. That's when the house edge eats you alive. "Fun" is the emotional state the casino is engineering for — it's not a sign things are going well.</li>
      <li><strong>Overconfidence:</strong> "I'm on a hot streak!" Streaks are random variance. They don't predict the future. The math doesn't change because you won three hands in a row. The cards don't know you're winning.</li>
    </ul>

    <h3>The House Edge: The Tax You Can't See</h3>

    <p>Every casino game has something called a <strong>house edge</strong>. It's the mathematical advantage the casino has over you on every single bet. Think of it as an invisible tax that compounds over time.</p>

    <p>Let me make this stupid simple:</p>

    <ul>
      <li><strong>Blackjack</strong> (3:2, basic strategy): ~0.5% house edge. For every $100 you bet, you lose about 50 cents on average.</li>
      <li><strong>Blackjack</strong> (6:5, same strategy): ~1.9% edge. Same game, same skill, four times the cost. Casinos quietly rolled out 6:5 across the Strip in the 2010s — most players never noticed.</li>
      <li><strong>Roulette</strong> (double zero): 5.26% house edge. For every $100, you're losing $5.26.</li>
      <li><strong>Slot machines:</strong> 5-15% house edge. This is where casinos make the most money. Stay away.</li>
      <li><strong>Pai Gow Poker:</strong> ~1.5% house edge, but with the right strategy, comps and bonuses can flip this.</li>
    </ul>

    <p>Here's the part most players miss: that edge is <strong>per hand</strong>, and it compounds over a session. At a $500-a-hand blackjack table playing 70 hands an hour for four hours, you're putting $140,000 of action through the table. At 0.5% that's $700 expected loss. At 1.9% (the same game dealt 6:5) it's $2,660. Same seat. Same skill. Four times the bleed.</p>

    <p>This is why I play fast, bet big, and get out. I'm minimising my exposure to the clock.</p>

    <blockquote>
      "The house edge is like gravity. You can't eliminate it, but you can learn to fly anyway — if you know the physics. The players who lose are the ones who pretend gravity isn't there."
    </blockquote>

    <h3>Why Winners Get Banned</h3>

    <p>Let me tell you something that should make your blood boil: <strong>casinos will ban you for winning.</strong></p>

    <p>I've been kicked out of almost every major casino in the country. Not for cheating. Not for breaking any rules. For playing the game better than they expected. The Wynn banned me. The Bellagio banned me. The Venetian, Cosmopolitan, Aria — the whole rolodex. Every one of those was a lifetime ban delivered by a pit boss with a thin smile and a security escort to the door.</p>

    <p>Think about how insane that is — they set up the game, they invite you to play, they wire you comps, they take your front money, they serve you dinner, and then when you beat them at their own game, they tell you to leave and never come back.</p>

    <p>What does that tell you? It tells you the game is designed for <strong>them</strong> to win. When someone figures out how to flip the script, they don't adapt their game — they remove the player. That should tell you everything about what you're walking into on any given Friday night.</p>

    <h3>The Commission Trick</h3>

    <p>Here's a perfect example of how casinos play with your psychology. In Pai Gow Poker, the casino takes a 5% commission on every winning hand. Sounds small, right?</p>

    <p>Let's say you win a $100 bet. They take $5. You think, "Whatever, it's just five bucks." But over a hundred hands? That's $500 they've skimmed. Over a thousand hands? $5,000. The small amounts feel worthless in the moment, but they add up to massive profits for the casino.</p>

    <p>This is exactly how they want you to think. <strong>"It's just a small percentage."</strong> That small percentage built every casino on the Strip. The Bellagio fountain runs on 5% commissions.</p>

    <h3>The Loyalty Program Trap</h3>

    <p>Casinos love to make you feel special. You get a players card, you earn "points," you get "free" rooms and meals. You feel like a VIP. You feel like they value you.</p>

    <p>Here's the reality:</p>

    <ul>
      <li>They know <strong>exactly</strong> how much you've lost to them — down to the hand.</li>
      <li>They give you back roughly <strong>10-30% of your theoretical loss</strong> in the form of comps.</li>
      <li>That "free" room at the Cosmopolitan cost them maybe $40 to flip — but you lost $4,000 at the table to earn it. You paid $4,000 for a $40 room and they told you it was free.</li>
      <li>The loyalty program is designed to keep you coming back and losing more — it's a calculated investment, not a gift.</li>
      <li>Every perk is carefully calibrated to give you just enough to feel appreciated while ensuring you never come out ahead overall.</li>
    </ul>

    <p>Now, can you use this system to your advantage? <strong>Absolutely.</strong> That's exactly what I do and what I'll teach you in Module 5 (Negotiation), Module 6 (The Discount System), and Module 10 (Comps). But first, you have to understand that the system is built against you. You have to see the game behind the game before you can start winning it.</p>

    <blockquote>
      "The casino is not in the business of giving things away. Every 'free' thing you receive has been paid for by someone — usually you. The trick is getting to the other side of that trade."
    </blockquote>

    <p>In the next modules, we'll get into specific strategies for specific games. But none of that matters if you don't internalise the lessons from this module first. <strong>Mindset comes before math.</strong> Get your head right, and the rest will follow.</p>
  `,
};
