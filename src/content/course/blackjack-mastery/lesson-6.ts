import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 6: The Property Rule Matrix
 * Module 4 - Blackjack Mastery
 *
 * New lesson shipped Sprint 5c per V3 redesign. Audit flagged that blackjack
 * lessons told players "look for 3:2, S17, DAS" but never showed them a
 * property-by-property map of where those rules actually live.
 * Visual slot (visualSlotId) could be added later pointing to a rule matrix
 * table component.
 */
export const lesson6: Lesson = {
  id: 'mod4-lesson6-property-rule-matrix',
  slug: 'property-rule-matrix',
  title: 'The Property Rule Matrix',
  subtitle: 'Not all blackjack is created equal. Rules swing the house edge by 1% between properties on the same strip — know the map before you sit down.',
  difficulty: 'intermediate',
  fieldNote:
    'On your next Vegas trip, spend one hour scouting tables across three properties WITHOUT playing. Photograph the "Blackjack pays" placard at every table. Note: deck count, S17/H17, DAS, double any two, surrender, penetration. Build your own matrix. The scouting hour is worth more than most sessions.',
  promise: [
    'Know the six rule variables that determine blackjack house edge',
    'Have a property-by-property scouting framework for Vegas',
    'Stop playing by vibe — start playing by edge',
  ],
  estimatedMinutes: 12,
  keyTakeaways: [
    'Six rules drive the blackjack house edge: payout (3:2 vs 6:5), deck count, soft 17 rule (S17 vs H17), double after split (DAS), late surrender, and rule of double on any two cards.',
    '3:2 payout is the single biggest rule — it swings the edge by ~1.4% vs 6:5.',
    'S17 (dealer stands on soft 17) is worth ~0.22% to the player over H17.',
    'Late surrender is worth ~0.08% and is only available at high-limit rooms at select properties.',
    'Before any session, know the rules at three properties and pick the best one — don\'t play the first open table.',
  ],
  proTip:
    'Build a personal rule matrix in your phone notes. For every property you\'ve played: deck count, payout, S17/H17, DAS yes/no, surrender yes/no, min bet, typical comp rate. Update it every trip. The matrix is the real edge — every time you walk into town, you\'re pulling up a living database that most players don\'t even know exists. Mine lives in a note called "Vegas matrix" and it\'s the first thing I open when I land.',
  content: `
    <h3>Why "Blackjack" Isn't One Game</h3>

    <p>You walk into three casinos on the same strip. You sit at three tables all called "Blackjack." You play identical basic strategy. Your expected loss rate at the three tables might differ by <strong>more than 1%</strong> — which, on a $500-a-hand 4-hour session, is the difference between expected loss of $700 and expected loss of $2,100.</p>

    <p>Same game. Same skill. Same bet. Three times the bleed — because the rules in the fine print are different at each property.</p>

    <blockquote>
      "The biggest edge in blackjack isn't counting. It's table selection. A bad counter at a good game beats a great counter at a bad game every time."
    </blockquote>

    <h3>The Six Variables That Matter</h3>

    <p>Here are the six rules that determine your house edge, roughly in order of importance:</p>

    <h3>1. The Blackjack Payout (3:2 vs 6:5)</h3>

    <p>The single biggest rule. On a $100 bet, a natural blackjack pays:</p>

    <ul>
      <li><strong>3:2 (good):</strong> $150 payout</li>
      <li><strong>6:5 (bad):</strong> $120 payout</li>
      <li><strong>1:1 (walk away):</strong> $100 payout — rare in Vegas and usually on specialty variants rather than standard blackjack, but if you see it, it's a hard pass.</li>
    </ul>

    <p>Moving from 3:2 to 6:5 adds approximately <strong>1.4% to the house edge</strong>. That's more than all the other rule variations combined. A 6:5 table with otherwise perfect rules is still a worse game than a 3:2 table with slightly worse rules.</p>

    <p>The rule of thumb: <strong>if it's not 3:2, don't play.</strong> Full stop. No exceptions for "but the minimum is only $15!" or "but there's a good host here." The math doesn't care about the other things.</p>

    <h3>2. Deck Count (Fewer Is Better — All Else Equal)</h3>

    <p>All else equal, fewer decks means better odds for the player. Approximate reductions in house edge vs. an 8-deck baseline (standard rules otherwise held constant):</p>

    <ul>
      <li>Single deck: roughly <strong>−0.48%</strong> (biggest player improvement)</li>
      <li>Double deck: roughly <strong>−0.19%</strong></li>
      <li>6-deck: roughly <strong>−0.02%</strong></li>
      <li>8-deck: baseline</li>
    </ul>

    <p>These deltas are approximate — run the exact ruleset in a simulator like the Wizard of Odds calculator if you want precise numbers for your table.</p>

    <p>BUT — and this is the trap most players miss — <strong>the single-deck advantage is often offset by 6:5 payouts</strong>. Casinos figured out that players associate "single deck" with "better game," so they roll out single-deck tables with 6:5 payouts. You think you're getting the good game. You're actually getting the worst game on the floor.</p>

    <p>Always check the payout before you check the deck count. If it's 6:5 single deck, walk.</p>

    <h3>3. Soft 17 Rule (S17 vs H17)</h3>

    <p>Does the dealer stand or hit on soft 17 (Ace-6)?</p>

    <ul>
      <li><strong>S17 (Stands on soft 17):</strong> better for player. Player edge improvement: ~0.22%.</li>
      <li><strong>H17 (Hits on soft 17):</strong> worse for player. Dealer gets a free re-roll.</li>
    </ul>

    <p>On most Vegas tables, H17 is the default for 6:5 games and S17 is more common on 3:2 tables in high-limit rooms. Always check the felt or ask the dealer.</p>

    <h3>4. Double After Split (DAS)</h3>

    <p>Can you double down after splitting pairs?</p>

    <ul>
      <li><strong>DAS allowed:</strong> player advantage of ~0.14%</li>
      <li><strong>No DAS:</strong> slightly worse</li>
    </ul>

    <p>This matters most when you split 2s, 3s, or 7s and catch a 9 or 10 — the double becomes profitable. Without DAS, you're stuck standing on a weaker hand.</p>

    <h3>5. Late Surrender</h3>

    <p>Surrender lets you fold your hand after seeing the dealer's upcard and lose only half your bet. Player advantage: ~0.08%.</p>

    <p>This rule is rare — mostly available in high-limit rooms at Caesars properties, certain Wynn tables, and a handful of off-strip locals casinos. When you find it, use it: 16 vs dealer 9/10/A, 15 vs dealer 10 are the key surrender hands.</p>

    <h3>6. Double On Any Two Cards (vs 9-11 Only)</h3>

    <p>Can you double down on any two cards, or only on totals of 9, 10, or 11?</p>

    <ul>
      <li><strong>Any two:</strong> better for player</li>
      <li><strong>9-11 only:</strong> ~0.09% worse</li>
    </ul>

    <p>"9-11 only" rules are more common in Atlantic City and some off-strip Vegas tables. Strip high-limit rooms almost always allow doubling on any two.</p>

    <h3>The Las Vegas Reality Check</h3>

    <p>Here's what the Vegas strip actually looks like on a typical 2026 night, in rough buckets (this shifts — scout every trip):</p>

    <p><strong>Generally strong rules (3:2, S17, DAS, sometimes surrender) in high-limit rooms:</strong> Wynn, Bellagio, Aria, Cosmopolitan high-limit salons. Minimums usually $100-200+.</p>

    <p><strong>Mixed rules on the main floor (3:2 in select pits, 6:5 at lower limits):</strong> Venetian, MGM Grand, Caesars Palace. Shop carefully.</p>

    <p><strong>Generally weak rules (6:5 dominant, H17, no surrender):</strong> most main-floor low-minimum tables across the strip. If it's a $15 or $25 minimum, assume 6:5 until proven otherwise.</p>

    <p><strong>Strong rules at low minimums (rare):</strong> off-strip locals casinos like El Cortez, Orleans, Red Rock, and the downtown spots. Sometimes single-deck 3:2 at sub-$50 minimums.</p>

    <p>The matrix shifts every year. The only way to know is to scout.</p>

    <h3>Your Scouting Hour</h3>

    <p>Before your first session of any trip, I want you to do this:</p>

    <ol>
      <li><strong>Pick three properties.</strong> One you know, two you don't.</li>
      <li><strong>Walk the main floor AND the high-limit room.</strong> If you're a $500 player, you need to see both.</li>
      <li><strong>Photograph every table placard.</strong> The placard tells you payout, deck count, min/max, and sometimes S17/H17.</li>
      <li><strong>Ask one dealer at each property:</strong> "Is this S17 or H17? Is surrender allowed? Can I double on any two?" Dealers will answer these honestly.</li>
      <li><strong>Log it in your phone.</strong> Date, property, rules. That's your personal matrix.</li>
    </ol>

    <p>This takes an hour. It's worth more than any strategy tweak. You can be a 0.5% edge player at a 3:2/S17/DAS table, or a 2.0% negative-EV player at a 6:5/H17 table. Same basic strategy. Four times the bleed rate. The only thing that changed was where you sat down.</p>

    <h3>When the Rules Change Mid-Session</h3>

    <p>One more warning: casinos sometimes <strong>change the rules on you mid-shift.</strong> A shift change happens, a new pit boss comes on, and suddenly the table that was 3:2 at 2 PM is 6:5 at 10 PM. Or the surrender option quietly disappears. This is legal. It's sneaky. It happens more than you'd think.</p>

    <p>The fix is to re-check the placard after any dealer change or pit boss change. If the rules got worse, color up and walk. You can always find a better table — or go back to your room and wait for a better shift.</p>

    <blockquote>
      "The game on the felt is not the game in the glossy ad. The game is whatever the placard says right now. Check it every time you sit down, and check it again after every shift change."
    </blockquote>

    <h3>The Takeaway</h3>

    <p>Basic strategy is 90% of your blackjack edge. Table selection is the other 90%. Yes, I know that adds to 180%. That's the point. Most players get one half right and the other half wrong, and the two errors don't cancel out — they compound.</p>

    <p>Build the matrix. Scout before you sit. Never play the first open table without at least checking the placard. The boring pre-game hour is the game.</p>
  `,
};
