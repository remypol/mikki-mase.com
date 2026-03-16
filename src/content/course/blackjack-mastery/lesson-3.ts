import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 3: Soft Hands & Splitting
 * Module 3 - Blackjack Mastery
 */
export const lesson3: Lesson = {
  id: 'mod3-lesson3-soft-hands-and-splitting',
  slug: 'soft-hands-and-splitting',
  title: 'Soft Hands & Splitting',
  estimatedMinutes: 12,
  keyTakeaways: [
    'A soft hand contains an Ace counting as 11 -- you cannot bust by hitting a soft hand, which gives you more aggressive options.',
    'Always split Aces -- every time, no exceptions. Two shots at 21 is always better than one hand of 12.',
    'Mikki says DO NOT split 8s against a dealer 10 -- surrender or hit instead. This is controversial but the math supports losing less money.',
    'Never split 10s -- you already have 20, which is one of the strongest hands in the game.',
    'Soft 18 (A-7) is NOT a standing hand against strong dealer upcards -- hit against 9, 10, and Ace.',
  ],
  proTip:
    'The splitting 8s debate is one of the most controversial topics in blackjack. Most books and strategy charts say to always split 8s. I disagree when the dealer shows a 10 or Ace. The math says you lose less money by surrendering (if available) or hitting. Test it yourself with a simulator -- the numbers don\'t lie.',
  content: `
    <h3>Soft Hands: Your Hidden Weapon</h3>

    <p>A <strong>soft hand</strong> is any hand that contains an Ace counting as 11. So A-6 is a soft 17. A-7 is a soft 18. A-5 is a soft 16. The reason they're called "soft" is that they're <strong>flexible</strong> -- if you hit and get a high card, the Ace automatically drops to 1 and you can't bust.</p>

    <p>This flexibility is incredibly powerful, and <strong>most players waste it</strong>.</p>

    <blockquote>
      "A soft hand is a free lottery ticket. You can take a swing with zero risk of busting. Why would you ever stand on a mediocre soft total?"
    </blockquote>

    <p>The biggest mistake I see is people standing on soft 17 or soft 18 when they should be hitting or doubling. Let me break down the key soft hand plays.</p>

    <h3>Soft 18 (A-7): The Most Misplayed Hand</h3>

    <p>Soft 18 is the <strong>most commonly misplayed hand</strong> in blackjack. Here's why: people see "18" and think it's a good hand. It's decent. But it's not as strong as you think.</p>

    <p>Here's the correct play for A-7:</p>

    <ul>
      <li><strong>Dealer shows 2, 7, or 8:</strong> STAND. You've got a solid hand against a neutral or weak dealer.</li>
      <li><strong>Dealer shows 3, 4, 5, or 6:</strong> DOUBLE DOWN. The dealer is in the bust zone. You want maximum money on the table.</li>
      <li><strong>Dealer shows 9, 10, or Ace:</strong> HIT. This is the one that shocks people. Your 18 is going to lose to the dealer's likely 19-21. Hitting gives you a chance to improve. You can't bust, remember?</li>
    </ul>

    <p>Standing on soft 18 against a dealer 9, 10, or Ace is one of the most costly mistakes in the game. You lose about 3.5% extra on that hand compared to the correct play.</p>

    <h3>Other Key Soft Hand Plays</h3>

    <ul>
      <li><strong>Soft 17 (A-6):</strong> Always hit. Double against dealer 3-6. This is never a standing hand.</li>
      <li><strong>Soft 16 (A-5) and Soft 15 (A-4):</strong> Hit. Double against dealer 4-6.</li>
      <li><strong>Soft 14 (A-3) and Soft 13 (A-2):</strong> Hit. Double against dealer 5-6.</li>
      <li><strong>Soft 19 (A-8):</strong> Stand. Almost always. Some advanced players double against dealer 6, but standing is fine.</li>
      <li><strong>Soft 20 (A-9):</strong> Stand. You have 20. Don't get cute.</li>
    </ul>

    <p>The pattern: the weaker your soft hand, the more situations where you hit. The stronger the dealer's bust potential (4-5-6), the more you double. <strong>Never stand on a bad soft total when you can improve for free.</strong></p>

    <h3>Splitting: When Two Hands Beat One</h3>

    <p>When you're dealt a pair, you have the option to split them into two separate hands. Each hand gets its own bet. This is a powerful weapon -- but only when used correctly.</p>

    <h3>Always Split Aces</h3>

    <p><strong>Every single time. No exceptions. No debate.</strong></p>

    <p>Here's why: A pair of Aces gives you a total of 12 (or soft 2). That's a terrible hand. But split them, and each Ace becomes the start of a new hand with a great shot at 21. You're turning one bad hand into two hands that each have about a 31% chance of hitting blackjack-strength totals.</p>

    <p>Some casinos restrict re-splitting Aces or only allow one card per Ace. Even with these restrictions, <strong>splitting Aces is always the correct play</strong>.</p>

    <h3>The 8s Controversy</h3>

    <p>Now here's where I'm going to say something that will make blackjack purists lose their minds.</p>

    <p>Every basic strategy chart in the world says: <strong>"Always split 8s."</strong> The logic is that 16 is the worst hand in blackjack, so splitting gives you two shots at making a better hand.</p>

    <p>I disagree -- <strong>specifically when the dealer shows a 10 or Ace</strong>.</p>

    <blockquote>
      "Everyone says always split 8s. I say always split 8s EXCEPT against a dealer 10. Why would I pay double to put myself in a bad situation twice?"
    </blockquote>

    <p>Think about it: you have 16 (bad) against a dealer 10 (strong). If you split, you now have TWO bets in play, each starting with an 8 against the strongest dealer upcard. You're doubling your exposure in a situation where you're the underdog on both hands.</p>

    <p>My play: if <strong>surrender is available</strong>, surrender 8-8 against a dealer 10 or Ace. You lose half your bet instead of likely losing two full bets. If surrender isn't available, hit. Yes, hit. I'd rather risk busting one hand than guarantee two bad hands.</p>

    <p>This is <strong>controversial</strong>. Most strategy charts disagree. But when you run the simulations, surrendering 8-8 vs dealer 10 loses less money than splitting. The math doesn't care about tradition.</p>

    <h3>Never Split 10s</h3>

    <p>You have a pair of 10s. That's <strong>20</strong>. You have one of the best hands in blackjack. The only hand that beats you is 21.</p>

    <p>Why would you break up a 20 to gamble on two hands that might be worse? You wouldn't. <strong>Never split 10s.</strong></p>

    <p>I see recreational players split 10s against a dealer 6 because "the dealer is going to bust anyway." Yeah, maybe. But you already have 20! Even if the dealer busts, you win the same amount. And if the dealer doesn't bust, you might end up with two hands worth less than the 20 you gave up.</p>

    <p>Don't get greedy. Take your 20 and be happy.</p>

    <h3>Other Splitting Rules</h3>

    <ul>
      <li><strong>Split 2s and 3s</strong> against dealer 4-7. The dealer is in weak-to-mid territory, and your low pairs benefit from a fresh start.</li>
      <li><strong>Split 6s</strong> against dealer 3-6. The dealer is in the bust zone, and a 6 is a bad starting card -- better to restart.</li>
      <li><strong>Split 7s</strong> against dealer 2-7. Similar logic -- 14 is weak, and you have a chance at two decent hands.</li>
      <li><strong>Split 9s</strong> against dealer 2-6 and 8-9. Stand against dealer 7 (your 18 beats their likely 17). Stand against dealer 10 and Ace (don't double your exposure).</li>
      <li><strong>Never split 4s.</strong> A total of 8 is a decent starting point for hitting. Two hands of 4 are terrible.</li>
      <li><strong>Never split 5s.</strong> You have 10 -- that's a doubling hand, not a splitting hand. Double down against dealer 2-9.</li>
    </ul>

    <h3>The Golden Rule of Splitting</h3>

    <p>Ask yourself one question before splitting: <strong>"Am I turning one bad hand into two better opportunities, or am I turning one decent hand into two gambles?"</strong></p>

    <p>If the answer is the first one -- split. If the answer is the second one -- don't. Keep it that simple.</p>
  `,
};
