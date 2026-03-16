import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 2: The Rewards Trap
 * Module 2 - Casino Psychology
 */
export const lesson2: Lesson = {
  id: 'mod2-lesson2-the-rewards-trap',
  slug: 'the-rewards-trap',
  title: 'The Rewards Trap',
  estimatedMinutes: 8,
  keyTakeaways: [
    'Casino loyalty programs return only 10-30% of your losses as comps -- they are mathematically designed to keep you losing.',
    'Your "theoretical loss" is calculated as: average bet x hands per hour x house edge x hours played. The casino knows this number better than you do.',
    'Tier systems exploit status-seeking psychology -- you chase the next level while hemorrhaging money to get there.',
    'That "free" hotel room costs the casino $30 but required $3,000 in losses from you to earn.',
    'The comp system CAN be flipped in your favor -- but only if you understand how it actually works first.',
  ],
  proTip:
    'Before you ever swipe your players card, calculate your own theoretical loss using the formula: average bet x hands per hour x house edge x hours played. If the comps you receive are worth less than 30% of that number, the casino is winning the comp game too. In later modules, I will teach you how to flip this equation entirely.',
  content: `
    <h3>The Most Profitable Lie in Vegas</h3>

    <p>You walk up to the casino host desk. You flash your shiny platinum players card. The host smiles and says, "Mr. Johnson, we'd love to offer you a complimentary suite, dinner for two at the steakhouse, and tickets to tonight's show."</p>

    <p>You feel like a <strong>king</strong>. You feel valued. You feel special.</p>

    <p>You're being played.</p>

    <blockquote>
      "Every comp the casino gives you was paid for with your losses. They're not being generous -- they're giving you a receipt."
    </blockquote>

    <h3>How Loyalty Programs Actually Work</h3>

    <p>Let me break down the math that the casino <strong>never</strong> wants you to understand.</p>

    <p>Every casino tracks your play through your players card. They know your <strong>average bet</strong>, how many <strong>hands per hour</strong> you play, the <strong>house edge</strong> of the game you're playing, and how many <strong>hours</strong> you sit there. From this, they calculate something called your <strong>theoretical loss</strong>:</p>

    <p><strong>Theoretical Loss = Average Bet x Hands Per Hour x House Edge x Hours Played</strong></p>

    <p>Let's say you play blackjack:</p>

    <ul>
      <li>Average bet: <strong>$100</strong></li>
      <li>Hands per hour: <strong>70</strong></li>
      <li>House edge: <strong>0.5%</strong> (with basic strategy)</li>
      <li>Hours played: <strong>8</strong></li>
    </ul>

    <p>Your theoretical loss = $100 x 70 x 0.005 x 8 = <strong>$280</strong></p>

    <p>The casino expects you to lose $280 over that session. Now here's where it gets interesting -- they'll give you back somewhere between <strong>10% and 30%</strong> of that theoretical loss in comps. So you might get $28 to $84 worth of "free" stuff.</p>

    <p>Notice I said <strong>theoretical</strong> loss. Even if you win that session, the casino still calculates your comps based on what you were <strong>expected</strong> to lose. The math doesn't care about your actual results.</p>

    <h3>The Tier System Trap</h3>

    <p>This is where it gets really insidious. Casinos have tier systems -- Gold, Platinum, Diamond, Seven Stars, whatever they call them. Each tier unlocks better perks: nicer rooms, bigger meal credits, exclusive events, airport limo service.</p>

    <p>And what does your brain do? It <strong>chases the next tier</strong>.</p>

    <p>"I'm only $2,000 in points away from Platinum! I should play a few more hours this trip." That's not you talking. That's the <strong>system</strong> working exactly as designed.</p>

    <p>The tier system exploits your <strong>status-seeking psychology</strong>. Humans are hardwired to pursue status markers. The casino figured this out and turned it into a retention machine. You're not chasing better comps -- you're chasing a feeling. And that feeling costs thousands.</p>

    <blockquote>
      "The casino doesn't give you status because you're special. They give you status because it makes you spend more. You're not their VIP -- you're their best customer. There's a difference."
    </blockquote>

    <h3>The Real Cost of "Free"</h3>

    <p>Let's do some real math on what those "free" perks actually cost you:</p>

    <ul>
      <li><strong>That "free" hotel room:</strong> Costs the casino about $30-50 to provide (housekeeping, utilities). But you lost $3,000 in theoretical play to earn it. You paid 60x the actual cost.</li>
      <li><strong>That "free" dinner:</strong> Costs the casino $15-40 (food cost on a $150 menu item). Your theoretical loss to earn it? $500-1,000.</li>
      <li><strong>Those "free" show tickets:</strong> Cost the casino $10-20 (they own the venue). Your theoretical loss? $200-500.</li>
      <li><strong>That "free" flight reimbursement:</strong> You literally lost five figures for them to pay for your $400 plane ticket.</li>
    </ul>

    <p>When you lay it out like that, the "free" stuff isn't free at all. It's <strong>overpriced</strong>. You're paying premium prices for discount goods and feeling grateful about it. That's the genius of the system.</p>

    <h3>Points Programs Are Loss Leaders</h3>

    <p>Casino points programs work the same way as any other loyalty program, except the "purchase" you're making is <strong>losing money at gambling</strong>.</p>

    <p>You earn points based on your play. You redeem points for comps. The casino sets the exchange rate to ensure they always come out ahead. It's a <strong>loss leader</strong> -- they give you a little bit back to keep you coming in and giving them a lot.</p>

    <p>Here's what most people miss: the points you earn playing slots are calculated differently than table games. Slot points are more generous because <strong>the house edge on slots is much higher</strong>. The casino can afford to give you more back because they're taking more from you. It's not generosity. It's math.</p>

    <h3>Can You Flip the System?</h3>

    <p>Now here's the part you've been waiting for. Can you actually use the comp system <strong>to your advantage</strong>? The answer is <strong>yes</strong> -- and it's exactly what I do.</p>

    <p>The secret is playing games with the <strong>lowest possible house edge</strong> while maximizing the <strong>perceived</strong> value of your play to the casino. If you can make the casino think your theoretical loss is high while keeping your actual expected loss low (or even positive), you can get comps that are worth <strong>more</strong> than what you're expected to lose.</p>

    <p>I'll teach you exactly how to do this in later modules. But for now, what I need you to understand is the baseline: <strong>the system is designed against you</strong>. You have to see the trap before you can turn it around.</p>

    <p>Most players walk into the casino, hand over their players card, and feel good about earning "points." They never do the math. They never realize the comps they're so excited about represent a tiny fraction of what they've lost. <strong>Don't be most players.</strong></p>
  `,
};
