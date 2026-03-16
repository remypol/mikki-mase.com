import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 2: What to Say (and What to Lie About)
 * Module 7 - Casino Negotiation & Hosts
 */
export const lesson2: Lesson = {
  id: 'mod7-lesson2-what-to-say-and-what-to-lie-about',
  slug: 'what-to-say-and-what-to-lie-about',
  title: 'What to Say (and What to Lie About)',
  estimatedMinutes: 12,
  keyTakeaways: [
    'Strategically inflating your action at competing casinos is a standard negotiation tactic -- hosts expect it and can\'t easily verify it.',
    'Always tell the truth about your identity and contact information, but be strategic about your average bet, frequency, and competing casino relationships.',
    'Hosts calculate your "theoretical value" using: average bet x hands per hour x house edge x hours x days. Understanding this formula lets you manipulate how they perceive your worth.',
    'Never accept the first offer from a host -- everything is negotiable, from room quality to food credits to loss rebate percentages.',
    'Ask for specific things rather than vague requests. "Can I get the suite instead of the standard room?" is better than "Can you do something nice for me?"',
  ],
  proTip:
    'The single most effective thing you can say to a casino host is: "I usually play $500 a hand at [competing casino]." Even if your actual average is $100. The host cannot call up the other casino and verify your play. They\'ll take your word for it and comp you based on $500 action. Just make sure you actually play enough at their property to justify the relationship -- you don\'t need to match the number you quoted, but you need to show some real action.',
  content: `
    <h3>The Art of Strategic Honesty</h3>

    <p>Let me be very clear about something before we get into this. I'm not telling you to be a pathological liar. I'm telling you to be a <strong>negotiator</strong>. And in negotiation, information is power.</p>

    <blockquote>
      "I don't lie. I negotiate. There's a difference. When a car dealership asks your budget, do you tell them the truth? No. You lowball them. Same game, different table."
    </blockquote>

    <p>Casino hosts expect players to embellish. It's part of the game. They know you're going to inflate your numbers. They factor that in. Your job is to inflate them <strong>just enough</strong> to get better treatment without making claims so outrageous that you lose credibility.</p>

    <h3>What to ALWAYS Tell the Truth About</h3>

    <ul>
      <li><strong>Your name:</strong> Obviously. They'll verify your ID.</li>
      <li><strong>Your contact information:</strong> They need to reach you for offers. Wrong number = missed comps.</li>
      <li><strong>Your game preference:</strong> If you say you play baccarat but they see you at the blackjack table, it creates confusion. Be honest about what you play.</li>
      <li><strong>Your physical presence:</strong> Don't claim to visit 3 times a month if you can only come once a quarter. Your players card data will eventually reveal the truth.</li>
    </ul>

    <h3>What to Be "Strategically Creative" About</h3>

    <p>Here's where the negotiation happens:</p>

    <p><strong>Your average bet at OTHER casinos:</strong></p>
    <ul>
      <li>"I usually play $500 a hand at Bellagio" -- even if you play $100-200</li>
      <li>The host <strong>cannot verify this</strong>. Casinos don't share player data with competitors.</li>
      <li>This sets the anchor for how they perceive your value and what they'll offer you</li>
    </ul>

    <p><strong>Your frequency at other properties:</strong></p>
    <ul>
      <li>"I'm at Wynn twice a month" -- even if it's once a quarter</li>
      <li>This creates urgency. If you're playing that much elsewhere, that's action they're missing out on.</li>
    </ul>

    <p><strong>What other casinos are offering you:</strong></p>
    <ul>
      <li>"Aria just offered me 3 nights comped with food credit" -- this gives your host a target to match or beat</li>
      <li>Even if Aria offered you a discounted room, your host doesn't know that</li>
    </ul>

    <p><strong>Your total annual action:</strong></p>
    <ul>
      <li>When they ask how much you gamble per year, round way up</li>
      <li>"I probably put through $200K-300K a year across all properties"</li>
      <li>This positions you as a mid-level whale worth investing in</li>
    </ul>

    <h3>How Hosts Calculate Your Value</h3>

    <p>Every host uses a version of this formula to determine how much you're worth to them:</p>

    <p><strong>Theoretical Loss = Average Bet x Hands Per Hour x House Edge x Hours Played x Days</strong></p>

    <p>Let's break this down with a real example:</p>

    <ul>
      <li><strong>Average bet:</strong> $200 per hand</li>
      <li><strong>Hands per hour:</strong> 60 (blackjack)</li>
      <li><strong>House edge:</strong> 2% (they use a standard number, not perfect strategy)</li>
      <li><strong>Hours per trip:</strong> 4 hours</li>
      <li><strong>Trips per year:</strong> 12</li>
    </ul>

    <p>$200 x 60 x 0.02 x 4 x 12 = <strong>$11,520 theoretical annual loss</strong></p>

    <p>That's how much the casino <strong>expects</strong> to win from you per year. They'll comp you roughly <strong>25-40% of that theoretical</strong>, which means $2,880-4,608 in annual comps. That's rooms, food, shows, and more.</p>

    <p>Now see why inflating your average bet matters? If you say $200 instead of $100, you just doubled your theoretical -- and doubled your comps.</p>

    <h3>What to Ask For</h3>

    <p>Don't be vague. Don't say "what can you do for me?" Be <strong>specific</strong>:</p>

    <ul>
      <li><strong>Rooms:</strong> "Can I get the suite instead of the deluxe room?" Always ask for an upgrade.</li>
      <li><strong>Food:</strong> "I'd like $200 per day in food credit." Name a number. If they counter, negotiate from there.</li>
      <li><strong>Shows and entertainment:</strong> "Can you get me 2 tickets to [specific show]?" Don't ask if they can get you "something" -- ask for what you want.</li>
      <li><strong>Spa and amenities:</strong> "I'd like spa credits for my partner and me." These cost the casino almost nothing and hosts love giving them because they seem generous.</li>
      <li><strong>Loss rebates:</strong> This is the big one. "What kind of loss rebate program do you offer?" We'll cover this extensively in the next lesson.</li>
    </ul>

    <h3>Never Accept the First Offer</h3>

    <blockquote>
      "The first offer from a casino host is their opening bid, not their best offer. Treat it like a starting point, not a final answer."
    </blockquote>

    <p>When a host offers you 2 comped nights, ask for 3. When they offer a standard room, ask for a suite. When they offer $100 in food credit, ask for $200. The worst they can say is no -- and usually they'll meet you somewhere in the middle.</p>

    <p>Hosts have <strong>discretionary budgets</strong>. They have room to negotiate. They expect you to push back. If you accept the first offer every time, you're signaling that you're easy to please -- and they'll give you the minimum going forward.</p>

    <p>Here's the psychology: the host wants to close the deal. They want you to commit to coming. Every counter-offer you make is still a signal that you're interested. They'd rather give you an extra night than lose your business entirely.</p>

    <h3>The Power of Patience</h3>

    <p>Don't rush the negotiation. If a host makes an offer you don't love, it's perfectly fine to say:</p>

    <p><strong>"Let me think about it. I have an offer from [competing casino] that's a bit better. I'd love to come to your property but I need to make sure it makes sense for me."</strong></p>

    <p>This does three things:</p>

    <ul>
      <li>Creates competition (they're not the only option)</li>
      <li>Creates urgency (they might lose you)</li>
      <li>Gives them time to go to their manager for a better offer</li>
    </ul>

    <p>Patience pays. Literally.</p>
  `,
};
