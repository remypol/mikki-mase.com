import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 1: The Group Play Concept
 * Module 6 - Ultimate Texas Hold'em Group Strategy
 */
export const lesson1: Lesson = {
  id: 'mod6-lesson1-the-group-play-concept',
  slug: 'the-group-play-concept',
  title: 'The Group Play Concept',
  estimatedMinutes: 10,
  keyTakeaways: [
    'In Ultimate Texas Hold\'em, all players\' cards are dealt face-up, meaning a group of 5 players can collectively see 10 cards out of 52 before community cards are dealt.',
    'Seeing almost 20% of the deck gives your group a significant statistical advantage over the house when making betting decisions.',
    'This strategy is completely legal -- you are not marking cards or colluding on bet amounts. You are simply using publicly visible information.',
    'Casinos hate this strategy and some have tried to ban table talk, but sharing publicly visible information is within the rules at most properties.',
    'You need a minimum of 5 players at the table for the shared information to create a meaningful mathematical edge.',
  ],
  proTip:
    'Before you try this at a casino, do a dry run at home with friends. Deal out 5 hands face-up and practice quickly scanning all 10 cards. You need to be able to assess the collective card information in seconds, not minutes. If your group is slow, the dealer will speed things up and you\'ll miss your window. Speed and coordination are everything.',
  content: `
    <h3>UTH: The Basics</h3>

    <p>Before I blow your mind with the group strategy, you need to understand how <strong>Ultimate Texas Hold'em</strong> (UTH) works at a basic level.</p>

    <p>UTH is a casino table game based on Texas Hold'em poker. But here's the key difference: <strong>you're not playing against other players. You're playing against the dealer.</strong> Everyone at the table is trying to beat the same dealer hand.</p>

    <p>The game flow:</p>

    <ul>
      <li>You make an <strong>Ante</strong> bet and a <strong>Blind</strong> bet (equal amounts)</li>
      <li>You and the dealer each get <strong>2 cards</strong></li>
      <li>Your cards are <strong>face-up</strong>. The dealer's cards are face-down.</li>
      <li>You can bet 4x your ante (pre-flop), 2x (after the flop), or 1x (after the river) -- or check and fold</li>
      <li>5 community cards are dealt (just like Hold'em)</li>
      <li>Best 5-card hand wins</li>
    </ul>

    <p>Simple enough, right? Now here's where it gets <strong>very</strong> interesting.</p>

    <h3>The Critical Insight: Shared Information</h3>

    <blockquote>
      "In UTH, every player's cards are face-up. That means if 5 of us are at the table, we can see 10 cards out of 52. That's almost 20% of the deck. Do you understand how powerful that is?"
    </blockquote>

    <p>Let me break this down because this is the <strong>entire foundation</strong> of the strategy.</p>

    <p>In standard UTH, you see your 2 cards. That's it. You're making betting decisions based on 2 out of 52 cards -- roughly 4% of the deck. Your decisions are mostly based on the strength of your starting hand.</p>

    <p>But when 5 players are at the table, and every hand is face-up, your group collectively sees <strong>10 cards</strong>. That's 19.2% of the deck. Before a single community card is dealt, you know almost one-fifth of all the cards.</p>

    <p>This changes <strong>everything</strong> about the math.</p>

    <h3>Why This Creates a Statistical Advantage</h3>

    <p>When you know 10 cards instead of 2, you can:</p>

    <ul>
      <li><strong>Eliminate outs:</strong> If you need a King to complete your hand, but you can see two Kings in other players' hands, you know there are only 2 Kings left in the remaining 42 cards instead of 4 in 50.</li>
      <li><strong>Assess the dealer's likely hand:</strong> If you can see most of the high cards on the table, the dealer is more likely to have low cards.</li>
      <li><strong>Make better 4x pre-flop bets:</strong> The 4x bet is the most valuable bet in UTH. With more information, you know when to pull the trigger and when to hold back.</li>
      <li><strong>Identify dead draws:</strong> If multiple players have cards of the same suit, flush possibilities for the dealer are reduced.</li>
    </ul>

    <h3>Why This Is Completely Legal</h3>

    <p>I know what you're thinking. "Isn't this cheating?" <strong>Absolutely not.</strong></p>

    <p>Here's why:</p>

    <ul>
      <li>The cards are dealt <strong>face-up</strong>. The casino chose to make this information public.</li>
      <li>You're not marking cards, using devices, or doing anything prohibited.</li>
      <li>You're not colluding on bet amounts -- each player makes their own independent betting decisions.</li>
      <li>You're simply <strong>looking at information the casino put on the table in front of you</strong>.</li>
      <li>Talking at the table is legal. It's a public game in a public space.</li>
    </ul>

    <p>That said, casinos <strong>hate</strong> this. Some have tried to implement "no table talk" rules specifically to counter this strategy. Some dealers will try to rush you. Some pit bosses will come over and give you dirty looks.</p>

    <blockquote>
      "They can be mad all they want. They dealt the cards face-up. I'm just using my eyes."
    </blockquote>

    <h3>Why 5 Players Is the Magic Number</h3>

    <p>Can you do this with 3 players? Sure, but the edge is minimal. With 3 players you see 6 cards -- that's only 11.5% of the deck. It helps, but it's not game-changing.</p>

    <p><strong>5 players is the sweet spot</strong> because:</p>

    <ul>
      <li>10 cards = nearly 20% of the deck revealed</li>
      <li>Most UTH tables seat 6-7 players, so 5 is realistic</li>
      <li>The information advantage at 5 players creates a measurable mathematical edge</li>
      <li>More than 5 is better, but it's harder to coordinate a group of 6-7 people</li>
    </ul>

    <p>The key is that all 5 players need to be <strong>on the same page</strong>. You need everyone scanning cards, sharing information, and making decisions based on collective knowledge. One person zoning out or playing on their phone kills the advantage.</p>

    <p>In the next lesson, I'll teach you exactly how to share card information quickly and effectively at the table, and how to calculate outs with shared knowledge. This is where it gets tactical.</p>
  `,
};
