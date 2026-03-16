import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 1: Face-Up Pai Gow Fundamentals
 * Module 5 - Pai Gow Poker Strategy
 */
export const lesson1: Lesson = {
  id: 'mod5-lesson1-face-up-pai-gow-fundamentals',
  slug: 'face-up-pai-gow-fundamentals',
  title: 'Face-Up Pai Gow Fundamentals',
  estimatedMinutes: 10,
  keyTakeaways: [
    'Pai Gow Poker is the single best game for bankroll preservation -- you push (tie) roughly 40% of hands, meaning your money lasts longer than any other table game.',
    'In Face-Up Pai Gow, the dealer\'s hand is completely visible, which removes guesswork and lets you make mathematically optimal decisions every time.',
    'The 5% commission on winning hands is the casino\'s built-in edge -- but it\'s manageable when combined with the right bonus strategy.',
    'The "house way" is how the dealer sets their hand -- understanding when to follow it and when to deviate is the foundation of Pai Gow mastery.',
    'Low hourly loss rate means you can play long sessions without destroying your bankroll, which is critical for accumulating comps and bonus payouts.',
  ],
  proTip:
    'When you sit down at a Pai Gow table, your goal is NOT to win hand after hand. Your goal is to survive. Every push is a victory because you\'re preserving your bankroll while getting rated for action. The longer you sit, the more comps pile up and the more shots you get at bonus payouts. Think of Pai Gow as your office -- you\'re clocking in for a shift, not rolling the dice on your life savings.',
  content: `
    <h3>What Is Pai Gow Poker?</h3>

    <p>Alright, let me introduce you to what I genuinely believe is the <strong>most underrated game in any casino</strong>. Pai Gow Poker. Most people walk right past it because it looks confusing and the action is slow. That's exactly why I love it.</p>

    <blockquote>
      "The best game in the casino is the one nobody else is playing. Pai Gow Poker is my ATM machine."
    </blockquote>

    <p>Here's the basics. You get dealt <strong>7 cards</strong>. You split them into two hands:</p>

    <ul>
      <li><strong>A 5-card hand</strong> (your "high" hand) -- this follows standard poker rankings</li>
      <li><strong>A 2-card hand</strong> (your "low" hand) -- the best you can get here is a pair of aces</li>
    </ul>

    <p>The rule is simple: your 5-card hand <strong>must</strong> be stronger than your 2-card hand. If you put a pair of kings in your 2-card hand, your 5-card hand better have something that beats a pair of kings. Otherwise it's a foul and you lose automatically.</p>

    <p>You're playing against the dealer. If both your hands beat both the dealer's hands, you win. If the dealer beats both of yours, you lose. If you each win one hand -- which happens <strong>a lot</strong> -- it's a push. Nobody wins, nobody loses.</p>

    <h3>Why Face-Up Specifically?</h3>

    <p>Now here's where it gets interesting. In regular Pai Gow, the dealer's hand is face down. You're guessing. In <strong>Face-Up Pai Gow</strong>, you can see the dealer's entire hand before you set yours.</p>

    <p>Think about how powerful that is. You see all 7 of the dealer's cards. You know exactly what you need to beat. This isn't poker where you're bluffing -- this is <strong>pure math</strong>. You can calculate the optimal way to set your hand every single time.</p>

    <p>The tradeoff? In Face-Up, the dealer wins all copies (ties go to the dealer instead of splitting). But that's a small price to pay for <strong>perfect information</strong>.</p>

    <h3>The 5% Commission</h3>

    <p>Every time you win a hand in Pai Gow, the casino takes a <strong>5% commission</strong>. You win $100, they take $5. This is how they make money on the game.</p>

    <p>Sounds annoying, right? It is. But here's the thing -- the commission combined with the high push rate means the house edge on Pai Gow is roughly <strong>1.5%</strong>. Compare that to roulette at 5.26% or slots at 5-15%. Pai Gow is one of the lowest house edges you'll find.</p>

    <h3>The Push Rate: Your Best Friend</h3>

    <p>This is the thing most people don't understand about Pai Gow, and it's the <strong>entire reason</strong> I play this game.</p>

    <blockquote>
      "In Pai Gow, you push about 40% of the time. That means 40% of your hands cost you absolutely nothing. Show me another table game that lets you sit there for free almost half the time."
    </blockquote>

    <p>A 40% push rate means:</p>

    <ul>
      <li>Your bankroll lasts <strong>significantly longer</strong> than at any other table game</li>
      <li>You're getting rated for full action while barely losing money</li>
      <li>You have more time and more hands to hit bonus payouts</li>
      <li>Your hourly loss rate is tiny compared to blackjack or baccarat</li>
    </ul>

    <p>At a $100 average bet, your theoretical hourly loss in Pai Gow is around <strong>$15-20</strong>. Compare that to blackjack where you might be losing $50-60/hour at the same bet size. You're paying a fraction of the cost for the same amount of rated action.</p>

    <h3>The House Way</h3>

    <p>Every casino has what's called a <strong>"house way"</strong> -- it's the predetermined strategy the dealer uses to set their hand. Most casinos will also set YOUR hand the house way if you ask.</p>

    <p>Here's what you need to know: the house way is <strong>decent but not optimal</strong>. It's designed to be a reasonable strategy that works for the casino. But when you can see the dealer's cards in Face-Up, you can often find better ways to set your hand.</p>

    <p>For now, if you're just starting out, ask the dealer to set your hand the house way. There's no shame in it. As you get more comfortable, you'll start seeing spots where you can deviate for an edge. We'll get into specific deviations in Lesson 3.</p>

    <h3>Why Long Sessions Are Okay</h3>

    <p>Remember what I said in Module 1 about playing fast and getting out? Pai Gow is the <strong>one exception</strong> to that rule.</p>

    <p>Because the hourly loss rate is so low, you can actually afford to sit for extended sessions. And you <strong>want</strong> to sit for extended sessions because:</p>

    <ul>
      <li>More hands = more chances to hit the bonus bet (which is where the real money is)</li>
      <li>Longer sessions = higher comp value (the casino rates you for time played)</li>
      <li>The math barely hurts you -- you're essentially treading water while accumulating value</li>
    </ul>

    <p>In the next lesson, I'm going to show you exactly how the bonus bet turns this breakeven game into a <strong>money printer</strong>. That's where the magic happens.</p>
  `,
};
