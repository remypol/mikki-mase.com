import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 2: Basic Strategy Decoded
 * Module 3 - Blackjack Mastery
 */
export const lesson2: Lesson = {
  id: 'mod3-lesson2-basic-strategy-decoded',
  slug: 'basic-strategy-decoded',
  title: 'Basic Strategy Decoded',
  subtitle: 'The chart that runs blackjack. Memorise it then drill it until it fires before you think.',
  difficulty: 'intermediate',
  promise: [
    'Know why the chart exists and what it actually optimises for',
    'Recognise the three rows where amateurs bleed the most money',
    'Drill enough hands that the right play fires before you hesitate',
  ],
  drillId: 'basic-strategy',
  fieldNote:
    'At your next session, pick one hand that would have been a gut call and play basic strategy instead. Note the outcome — your gut will lose more often than the chart.',
  estimatedMinutes: 15,
  keyTakeaways: [
    'Basic strategy is the mathematically optimal play for every possible hand combination -- deviating from it costs you real money.',
    'Always hit 16 against a dealer 7 or higher, even though it feels wrong -- the math demands it.',
    'Never take insurance -- it carries a 7.7% house edge and is a pure sucker bet regardless of your hand.',
    'Doubling down on 9, 10, and 11 against dealer 4-5-6 is where you make your money -- these are your profit hands.',
    'When surrender is available, use it on 16 vs dealer 10 and 15 vs dealer 10 -- losing half your bet is better than losing all of it.',
  ],
  proTip:
    'Print out a basic strategy card and bring it to the casino. This is completely legal -- casinos even sell them in their gift shops. Use it until you have every decision memorized. There is zero shame in using a card. The shame is in guessing and losing money because of ego.',
  content: `
    <h3>The Blueprint That Changes Everything</h3>

    <p>Basic strategy is the <strong>single most important thing</strong> you will learn in this entire course. It's the foundation that everything else is built on. Without it, you're guessing. And guessers lose.</p>

    <blockquote>
      "Basic strategy isn't a suggestion. It's a command. Every time you deviate from it, you're handing money to the casino."
    </blockquote>

    <p>Here's what basic strategy actually is: mathematicians ran <strong>millions of computer simulations</strong> to determine the statistically optimal play for every possible hand combination against every possible dealer upcard. The result is a chart that tells you exactly what to do in every situation. No thinking. No guessing. No "feeling."</p>

    <p>When you play perfect basic strategy, the house edge in a good blackjack game drops to about <strong>0.5%</strong>. Without it, the average player faces a house edge of <strong>2-4%</strong>. That's the difference between losing $5 per hour and losing $40 per hour on the same bets.</p>

    <h3>The Plays Most People Get Wrong</h3>

    <h3>Always Hit 16 vs Dealer 7+</h3>

    <p>This is the play that separates the educated from the clueless. You're sitting there with 16. The dealer shows a 7, 8, 9, 10, or Ace. Every instinct in your body says <strong>"don't hit -- you'll bust."</strong></p>

    <p>Hit anyway.</p>

    <p>Yes, you'll bust a lot. About 62% of the time. But here's what your gut doesn't understand: if you <strong>stand</strong> on 16 against a dealer 7+, you lose even more often. The dealer will make a hand that beats 16 roughly 74% of the time. So you're choosing between losing 62% of the time (hit) and losing 74% of the time (stand).</p>

    <p><strong>Hitting 16 against a high card is less bad. That's the game -- you're often choosing the least terrible option.</strong></p>

    <h3>Double Down Ranges: Your Money Makers</h3>

    <p>Doubling down is where you make your <strong>profit</strong> in blackjack. When you double, you put up an extra bet and receive exactly one more card. You're betting big when the math is in your favor.</p>

    <p>The key doubling situations:</p>

    <ul>
      <li><strong>Double 11</strong> against dealer 2 through 10. This is your best double down. You have 11 and any 10-value card gives you 21. Against a weak or mid-range dealer card, this is a monster.</li>
      <li><strong>Double 10</strong> against dealer 2 through 9. Same logic -- you're likely to get a strong hand, and the dealer is likely to bust or make a weak hand.</li>
      <li><strong>Double 9</strong> against dealer 3 through 6. This is the sweet spot where the dealer's bust probability is highest. Your 9 plus a 10-value card gives you 19 -- strong enough to win most of the time.</li>
    </ul>

    <p>The common thread: you double when <strong>you're strong and the dealer is weak</strong>. Specifically, dealer 4, 5, and 6 are the dream upcards -- these bust the most. When you see those cards, it's time to get aggressive.</p>

    <h3>Never Take Insurance. Ever.</h3>

    <p>When the dealer shows an Ace, the casino offers you "insurance" -- a side bet that pays 2:1 if the dealer has blackjack. Sounds reasonable, right? Protect your hand?</p>

    <p><strong>It's a trap.</strong></p>

    <p>Insurance has a <strong>7.7% house edge</strong>. That makes it one of the worst bets on the entire casino floor. To put that in perspective, the house edge on the main blackjack bet with basic strategy is 0.5%. Insurance is <strong>15 times worse</strong>.</p>

    <p>The math: in a standard deck, only about 30.8% of cards are worth 10. So the dealer has blackjack only about 30.8% of the time when showing an Ace. You're paying for 2:1 insurance on an event that happens less than a third of the time. The numbers don't work. They never work.</p>

    <blockquote>
      "Insurance is not insurance. It's a side bet with terrible odds dressed up in a comforting name. The casino loves it because the name alone makes people take it."
    </blockquote>

    <p>Don't take it with a 20. Don't take it with a blackjack. Don't take "even money" (which is the same thing). <strong>Never take insurance.</strong></p>

    <h3>Hit on Soft 17 (A-6)</h3>

    <p>You have an Ace and a 6. That's a soft 17. Most recreational players stand here because they see "17" and think it's decent.</p>

    <p>It's not decent. It's <strong>terrible</strong>.</p>

    <p>17 is the worst "made hand" in blackjack. It beats nothing the dealer is likely to make. But because you have an Ace (soft hand), you can hit <strong>without risk of busting</strong>. If you draw a 10, your hand becomes a hard 17 -- same as standing. If you draw a small card, your hand improves. There is literally no downside to hitting here.</p>

    <p><strong>Always hit soft 17.</strong> In many situations, you should actually <strong>double down</strong> on soft 17 (against dealer 3-6). We'll cover soft hands in more detail in the next lesson.</p>

    <h3>Stand on Hard 17+ Always</h3>

    <p>Hard 17, 18, 19, 20 -- you stand. Every time. No exceptions.</p>

    <p>Yes, hard 17 is a bad hand. You'll lose more often than you'll win with it. But hitting a hard 17 means any card 5 or higher busts you. The bust probability is too high. Standing on 17 is the lesser evil.</p>

    <p>And if you have 18, 19, or 20 -- why would you risk it? You've got a strong hand. Lock it in.</p>

    <h3>When to Surrender</h3>

    <p>Surrender is the most <strong>underused weapon</strong> in blackjack. If the table offers it (not all do), surrender lets you give up half your bet and fold your hand. It sounds like quitting, but it's actually smart math.</p>

    <p>Use surrender in these situations:</p>

    <ul>
      <li><strong>16 vs dealer 9, 10, or Ace:</strong> You're going to lose this hand the majority of the time. Losing half your bet is better than losing all of it.</li>
      <li><strong>15 vs dealer 10:</strong> Same logic. The math says surrender saves you money over the long run.</li>
    </ul>

    <p>Most players refuse to surrender because it feels like giving up. That's ego, not strategy. <strong>Surrender is a mathematical tool, not a white flag.</strong> Use it.</p>

    <h3>The Dealer Upcard Ranges</h3>

    <p>Understanding the dealer's upcard is the key to everything. Here's how to think about it:</p>

    <ul>
      <li><strong>Dealer 2-3:</strong> Weak cards, but not bust-heavy. Play your hand conservatively but don't get too aggressive with doubles.</li>
      <li><strong>Dealer 4-5-6:</strong> The <strong>bust zone</strong>. The dealer busts 40-42% of the time with these cards. This is where you double down, split aggressively, and make your money.</li>
      <li><strong>Dealer 7-8:</strong> Mid-range. The dealer is likely to make a 17-18. You need to build your hand to beat that.</li>
      <li><strong>Dealer 9-10-A:</strong> Danger zone. The dealer is likely to make a strong hand (19-21). Play defensively. Hit your weak hands. Use surrender when available.</li>
    </ul>

    <h3>The Cost of Deviating</h3>

    <p>Every time you deviate from basic strategy, you increase the house edge. Every single time. There are no exceptions. There are no "gut feelings" that are mathematically correct.</p>

    <p>Common deviations and what they cost you:</p>

    <ul>
      <li>Standing on 16 vs dealer 10 (instead of hitting): costs you about <strong>4% on that hand</strong></li>
      <li>Not doubling 11 vs dealer 6: costs you about <strong>6% on that hand</strong></li>
      <li>Taking insurance: costs you <strong>7.7% every time</strong></li>
      <li>Standing on soft 18 vs dealer 9 (instead of hitting): costs you about <strong>3.5% on that hand</strong></li>
    </ul>

    <p>These add up fast. Over a hundred hands, incorrect play costs you hundreds of dollars. Over a thousand hands, it costs thousands. <strong>Learn the strategy. Memorize the strategy. Never deviate from the strategy.</strong></p>
  `,
};
