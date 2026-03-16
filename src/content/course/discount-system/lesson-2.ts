import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 2: Multi-Casino Discount Strategy
 * Module 8 - The Discount System
 */
export const lesson2: Lesson = {
  id: 'mod8-lesson2-multi-casino-discount-strategy',
  slug: 'multi-casino-discount-strategy',
  title: 'Multi-Casino Discount Strategy',
  estimatedMinutes: 10,
  keyTakeaways: [
    'Playing at 3-5 casinos simultaneously with loss rebates at each creates a mathematical edge through variance alone.',
    'You collect rebates from the casinos where you lose while keeping 100% of the profits from casinos where you win.',
    'Geographic strategy matters -- pick casinos close enough to rotate between them in a single trip.',
    'Meticulous record-keeping across all properties is non-negotiable for this strategy to work.',
    'Over time, variance guarantees you will win at some properties and lose at others -- the rebates turn this into a net positive.',
  ],
  proTip:
    'Set up your multi-casino rotation in a city like Las Vegas where you can hit 3-5 major properties in one trip. Play your 30-45 minute sessions at each one, collect your rated play at all of them, and let the variance math do its thing. At the end of the trip, some will be wins, some will be losses. You keep all the wins and get rebates on all the losses. This is not theory -- this is how I operate every single time I go to Vegas.',
  content: `
    <h3>The Multi-Property Playbook</h3>

    <p>Now that you understand what loss rebates are and how to get them, let me show you how to <strong>weaponize</strong> them. Because a loss rebate at one casino is good. Loss rebates at five casinos simultaneously? That's how you build a machine that prints money.</p>

    <blockquote>
      "One casino is a gamble. Five casinos with loss rebates is a business model."
    </blockquote>

    <h3>The Core Strategy</h3>

    <p>Here's Mikki's key strategy, and it's deceptively simple:</p>

    <p><strong>Play at 3-5 casinos simultaneously, each with a negotiated loss rebate.</strong></p>

    <p>Why? Because of how variance works. Over any given trip or session, you're going to win at some casinos and lose at others. That's just math -- it's called variance, and it's unavoidable. But here's the beautiful part:</p>

    <ul>
      <li><strong>Casino A:</strong> You lose $50,000. Your 15% rebate gives you $7,500 back.</li>
      <li><strong>Casino B:</strong> You win $40,000. You keep every dollar. No rebate needed.</li>
      <li><strong>Casino C:</strong> You lose $20,000. Your 12% rebate gives you $2,400 back.</li>
      <li><strong>Casino D:</strong> You win $15,000. You keep every dollar.</li>
      <li><strong>Casino E:</strong> You lose $10,000. Your 10% rebate gives you $1,000 back.</li>
    </ul>

    <p>Let's add it up:</p>

    <ul>
      <li><strong>Total losses:</strong> $80,000</li>
      <li><strong>Total wins:</strong> $55,000</li>
      <li><strong>Net without rebates:</strong> -$25,000</li>
      <li><strong>Total rebates collected:</strong> $10,900</li>
      <li><strong>Actual net result:</strong> -$14,100</li>
    </ul>

    <p>You just turned a $25,000 loss into a $14,100 loss. And that's on a <strong>bad trip</strong>. On a good trip where variance swings your way, you keep all the wins AND still collect rebates on whatever losses you did have.</p>

    <h3>Why This Creates a Mathematical Edge</h3>

    <p>Here's what most people don't understand about this strategy: <strong>it creates an edge even without changing how you play.</strong></p>

    <p>Think about it. Over a large sample size:</p>

    <ul>
      <li>You're going to win at roughly half the properties and lose at roughly half (assuming you're playing games with a small house edge)</li>
      <li>When you win, you keep 100% of the profit</li>
      <li>When you lose, you get 10-25% back</li>
      <li>This asymmetry -- keeping all wins while recovering a portion of losses -- shifts the math in your favor</li>
    </ul>

    <p>It's like playing a coin flip where heads you win a dollar and tails you only lose 80 cents. Over time, you're making money.</p>

    <blockquote>
      "Variance is the one thing the casino can't control. I use their own rebate system to turn variance from my enemy into my business partner."
    </blockquote>

    <h3>How to Structure Your Casino Rotation</h3>

    <p>You can't just randomly walk into casinos. You need a system. Here's how to build one:</p>

    <ul>
      <li><strong>Pick your market:</strong> Las Vegas is the obvious choice because of the concentration of properties. But Atlantic City, Macau, and regional casino clusters work too.</li>
      <li><strong>Select 3-5 properties:</strong> You want enough diversity for variance to work, but not so many that you can't build real relationships with hosts.</li>
      <li><strong>Negotiate rebates at each one:</strong> Use the tactics from the previous lesson. Each property should have a formal agreement in place.</li>
      <li><strong>Create a rotation schedule:</strong> Don't play the same casino every day. Spread your action across properties. This keeps each host happy and your play looking natural.</li>
    </ul>

    <h3>Geographic Strategy</h3>

    <p>Location matters more than you think. You want your casinos to be <strong>close enough to move between them efficiently</strong>.</p>

    <p>In Vegas, this is easy. You can hit Wynn, Encore, Bellagio, Aria, and Venetian all on the same strip within a 10-minute drive. That's five properties with five separate rebate agreements and five separate host relationships.</p>

    <p>Your geographic strategy should consider:</p>

    <ul>
      <li><strong>Proximity:</strong> Can you hit all your properties in one day if needed?</li>
      <li><strong>Travel time:</strong> The less time in transit, the more time executing your plan.</li>
      <li><strong>Property competition:</strong> Casinos in the same area compete for players. Use this -- "Bellagio offered me 15%, can you match it?"</li>
      <li><strong>Different ownership groups:</strong> Spread across MGM, Caesars, Wynn, and independents. Different companies means truly independent play records.</li>
    </ul>

    <h3>Timing Strategy</h3>

    <p>How you spread your play across properties within a trip matters:</p>

    <ul>
      <li><strong>Don't dump all your action at one place in one night.</strong> Spread it out. Hit Casino A in the morning, Casino B in the afternoon, Casino C at night.</li>
      <li><strong>Keep sessions short at each property:</strong> Remember the 30-45 minute rule? That applies everywhere. Short, aggressive sessions at each stop.</li>
      <li><strong>Vary your schedule:</strong> Don't be so predictable that casinos can track your patterns. Mix up which properties you visit and when.</li>
      <li><strong>End-of-month play:</strong> Hosts need to hit quarterly numbers. Concentrating some play at the end of each quarter gives your hosts something to report and gives you leverage for better rebate terms.</li>
    </ul>

    <h3>Record Keeping Across Properties</h3>

    <p>This is where most people fall apart. When you're playing at five casinos, you <strong>must</strong> track everything. I'm talking:</p>

    <ul>
      <li><strong>Date and property</strong> for every session</li>
      <li><strong>Buy-in amount</strong> at each casino</li>
      <li><strong>Cash-out amount</strong> at each casino</li>
      <li><strong>Win/loss per session</strong></li>
      <li><strong>Running win/loss per property</strong></li>
      <li><strong>Rebate percentage and terms</strong> at each property</li>
      <li><strong>Rebates collected</strong> (date and amount)</li>
      <li><strong>Host name and contact</strong> at each property</li>
      <li><strong>Total net across all properties combined</strong></li>
    </ul>

    <p>I use a spreadsheet. Some people use apps. I don't care what you use as long as you use <strong>something</strong>. You cannot manage what you don't measure. And when you're running a multi-property strategy, you need to know your exact position at every casino at all times.</p>

    <blockquote>
      "If you can't tell me your exact win/loss at every casino you play at, you're not running a strategy -- you're just gambling at multiple places."
    </blockquote>

    <h3>A Note on Tax Implications</h3>

    <p>I'm not a tax advisor and this is not tax advice. But you need to know that gambling winnings are taxable income, and loss rebates have their own tax treatment. <strong>Get a CPA who understands gambling income.</strong> This is not the place to wing it or use TurboTax.</p>

    <p>What I will say is this: your meticulous record-keeping across all properties? It's not just for strategy purposes. It's also your documentation if the IRS ever comes knocking. Professional gamblers have different tax treatment than recreational gamblers, and the records you keep can make the difference between a fair tax outcome and a nightmare.</p>

    <p>Keep every receipt. Log every session. Track every rebate. Your future self will thank you.</p>

    <h3>Putting It All Together</h3>

    <p>The multi-casino discount strategy is not complicated. It's just disciplined execution of a simple concept:</p>

    <ul>
      <li>Play at multiple properties with rebate agreements</li>
      <li>Let variance do what variance does</li>
      <li>Keep 100% of your wins</li>
      <li>Get 10-25% back on your losses</li>
      <li>Track everything obsessively</li>
      <li>Repeat</li>
    </ul>

    <p>Over time, this asymmetry -- keeping all wins, recovering a chunk of losses -- creates a mathematical edge that most players don't even know is possible. And the casinos? They're happy to offer it because they assume you'll be like every other player who loses way more than the math says they should.</p>

    <p><strong>But you're not every other player. Not anymore.</strong></p>
  `,
};
