import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 3: The Break-Even Strategy
 * Module 5 - Pai Gow Poker Strategy
 */
export const lesson3: Lesson = {
  id: 'mod5-lesson3-the-break-even-strategy',
  slug: 'the-break-even-strategy',
  title: 'The Break-Even Strategy',
  estimatedMinutes: 8,
  keyTakeaways: [
    'You do NOT need to win at the base Pai Gow game to profit -- breaking even on the base game while collecting bonus payouts is the entire strategy.',
    'The compounding effect of breakeven base game + bonus wins + comps = net positive expected value over time.',
    'Casinos rate you for your total action, not your net result -- so you get full comp value while barely losing money.',
    'Optimal hand-setting sometimes means sacrificing your base game win probability to protect a bonus-qualifying hand.',
    'Most casinos have not caught on to this strategy because Pai Gow is low-traffic and the edge is subtle.',
  ],
  proTip:
    'Here\'s the nuclear move: find a casino that offers loss rebates AND has Face-Up Pai Gow with a good bonus paytable. You play the break-even strategy, collect bonus payouts, rack up comps, and if you DO lose on the base game, you get 10-25% of your losses back. You\'re literally getting paid to sit at a table where you barely lose. This is how I turned Pai Gow into one of my most consistent income sources.',
  content: `
    <h3>The Key Insight Nobody Talks About</h3>

    <p>Okay, this is the lesson that brings it all together. This is the strategy that has made me hundreds of thousands of dollars at Pai Gow tables across the country. And it's so simple it's almost embarrassing.</p>

    <blockquote>
      "You don't need to win at Pai Gow. You just need to not lose."
    </blockquote>

    <p>Let me say that differently. The <strong>entire goal</strong> of the base Pai Gow game is to <strong>break even</strong>. That's it. You're not trying to crush the dealer. You're not trying to go on a heater. You're trying to push as many hands as possible, win a few, lose a few, and end up roughly where you started.</p>

    <p>Because while the base game treads water, two other things are happening:</p>

    <ul>
      <li><strong>Your bonus bets are hitting</strong> -- and those payouts go straight to your profit</li>
      <li><strong>Your comp value is accumulating</strong> -- the casino is rating you for every dollar you bet</li>
    </ul>

    <h3>The Compounding Effect</h3>

    <p>This is the magic formula. Write it down. Tattoo it on your arm. Whatever you need to do to remember it:</p>

    <p><strong>Breakeven on base game + Bonus payouts + Comp value = NET POSITIVE</strong></p>

    <p>Let me walk you through a real session to make this concrete.</p>

    <ul>
      <li><strong>Base bet:</strong> $100 per hand</li>
      <li><strong>Bonus bet:</strong> $25 per hand</li>
      <li><strong>Session length:</strong> 4 hours, roughly 120 hands</li>
      <li><strong>Base game result:</strong> Down $200 (close to breakeven over 120 hands)</li>
      <li><strong>Bonus payouts:</strong> Hit trips 8 times ($400), two straights ($150), one flush ($100), one full house ($125) = <strong>$775 in bonus wins</strong></li>
      <li><strong>Bonus bets wagered:</strong> 120 x $25 = $3,000. Minus $775 in payouts = $2,225 cost... but wait, several of those hands pushed or lost on the base game too, so your net bonus cost is lower.</li>
      <li><strong>Comp value:</strong> 4 hours at $100 average = $400/hour theoretical = $1,600 in rated action. At typical comp rates, that's $160-480 in comps.</li>
    </ul>

    <p>Add it all up: you might be down a couple hundred on the day, but you've got hundreds in comps, plus you only need <strong>one big bonus hit</strong> -- quads or better -- to flip the entire session into massive profit.</p>

    <h3>How Comps Supercharge This Strategy</h3>

    <p>Here's what makes Pai Gow absolutely <strong>broken</strong> from a comp perspective:</p>

    <blockquote>
      "The casino rates you on your total action, not your net result. So you're getting full comp value for a game where you're barely losing money. It's the best deal in gambling."
    </blockquote>

    <p>When you bet $100 a hand at blackjack, the casino expects you to lose about $50-60 per hour. They comp you based on that expectation. When you bet $100 a hand at Pai Gow, they still rate you at $100 per hand -- but your actual loss rate is $15-20 per hour. You're getting <strong>blackjack-level comps for a fraction of the cost</strong>.</p>

    <p>This means:</p>

    <ul>
      <li>Free rooms that would cost $300-500/night</li>
      <li>Free meals at premium restaurants</li>
      <li>Free show tickets, spa treatments, limo service</li>
      <li>All while your bankroll is essentially treading water</li>
    </ul>

    <h3>Why Casinos Haven't Caught On</h3>

    <p>You might be thinking, "If this is so good, why don't casinos shut it down?" Great question. A few reasons:</p>

    <ul>
      <li><strong>Pai Gow is low-volume.</strong> It's not a high-traffic game. The casino makes most of its money from slots, blackjack, and baccarat. Pai Gow is an afterthought.</li>
      <li><strong>The edge is subtle.</strong> You're not winning huge amounts -- you're grinding small edges. It doesn't set off alarms the way counting cards at blackjack does.</li>
      <li><strong>Most players are bad at it.</strong> The average Pai Gow player sets their hands wrong, doesn't play the bonus, and loses more than they should. You're subsidized by the fish.</li>
      <li><strong>The casino still makes money on commission.</strong> They take 5% of every win. Even if you're breaking even, they feel like they're earning.</li>
    </ul>

    <p>At some properties, floor managers are starting to pay attention. But at most casinos, Pai Gow is flying under the radar. Take advantage of that while you can.</p>

    <h3>Optimal Hand-Setting for Break-Even</h3>

    <p>Here's where the strategy gets tactical. When you're setting your hands, your priority order is:</p>

    <ul>
      <li><strong>Priority #1:</strong> Protect your bonus. If you have a hand that qualifies for a big bonus payout, don't break it up unnecessarily to win the base game.</li>
      <li><strong>Priority #2:</strong> Maximize push probability. You'd rather push than gamble on a marginal win. Pushes cost you nothing and keep you in the seat.</li>
      <li><strong>Priority #3:</strong> Win when it's free. If you can win the base game without sacrificing your bonus hand or taking on significant risk, take the win.</li>
    </ul>

    <h3>When to Deviate from House Way</h3>

    <p>The house way is fine for most hands. But here are the spots where I deviate:</p>

    <ul>
      <li><strong>When you have a qualifying bonus hand:</strong> If your 7 cards make a flush, don't break the flush to put a pair in your 2-card hand unless you absolutely have to. Protect the bonus payout.</li>
      <li><strong>When the dealer's hand is weak:</strong> In Face-Up, you can see exactly what the dealer has. If the dealer's hand is garbage, you can afford to play more aggressively with your 2-card hand because you know you'll likely win or push the 5-card hand.</li>
      <li><strong>When the dealer's hand is very strong:</strong> If the dealer has a monster, don't try to be a hero. Set your hand to maximize the chance of winning at least one of the two comparisons (creating a push).</li>
    </ul>

    <blockquote>
      "Pai Gow is the tortoise, not the hare. You're not trying to get rich in one hand. You're trying to survive, accumulate bonus payouts, and let the comps pile up. Slow and steady wins this race."
    </blockquote>

    <p>This strategy works. I've used it for years. It's boring, it's methodical, and it won't make for exciting Instagram stories. But it <strong>makes money</strong>. And at the end of the day, that's all that matters.</p>
  `,
};
