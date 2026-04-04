import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 3: Play Big and Fast
 * Module 10 - Session Discipline & Bankroll Management
 */
export const lesson3: Lesson = {
  id: 'mod10-lesson3-play-big-and-fast',
  slug: 'play-big-and-fast',
  title: 'Play Big and Fast',
  estimatedMinutes: 8,
  keyTakeaways: [
    'Fewer hands at higher bets means less house edge exposure than many hands at lower bets for the same total action.',
    'Never risk more than 5% of your session bankroll on a single hand -- aggressive does not mean reckless.',
    'Controlled aggression means big bets within a disciplined framework of limits, timers, and strategy.',
    'Track every session with a log: date, casino, game, buy-in, cash-out, session time, and notes.',
    'The endgame is combining ALL strategies from ALL modules: game selection, optimal play, loss rebates, comps, and session discipline.',
  ],
  proTip:
    'Create a session log on your phone or a small notebook. Before every session, write: Date, Casino, Game, Buy-in, Stop-win, Stop-loss. After every session, add: Cash-out, Session time, Notes. Review your log at the end of every trip. Over time, you\'ll see patterns -- which games are most profitable, which casinos treat you best, and whether your discipline is holding. Data doesn\'t lie. Your memory does.',
  content: `
    <h3>The Mikki Mase Philosophy</h3>

    <p>Everything in this course has been building to this. Every strategy, every technique, every mindset shift -- it all comes together in one philosophy that defines how I play:</p>

    <blockquote>
      "Bet big, play fast, and get out. That's the whole game."
    </blockquote>

    <p>This sounds reckless if you don't understand the math behind it. But by now, you understand the math. And you know that this isn't reckless at all -- it's the most calculated, disciplined approach to casino play that exists.</p>

    <h3>Why Big Bets Beat Small Bets</h3>

    <p>This is going to sound backward, so pay attention. <strong>Betting big is actually SAFER than betting small</strong> -- when you do it right.</p>

    <p>Here's why: the house edge is a percentage applied to your <strong>total action</strong> (total amount wagered). Whether you bet $100 per hand for 500 hands ($50,000 total action) or $500 per hand for 100 hands ($50,000 total action), the expected loss is the same on paper.</p>

    <p>But here's the critical difference:</p>

    <ul>
      <li><strong>500 hands at $100:</strong> You're playing for hours. Fatigue sets in. The house edge grinds consistently. The law of large numbers works against you. Your results converge toward the mathematical expectation (losing).</li>
      <li><strong>100 hands at $500:</strong> You're done in under an hour. You're fresh. Alert. The sample size is small enough that variance gives you a real shot at a positive session. You get out before the math catches up.</li>
    </ul>

    <p>Same total action. Same expected loss on paper. But the short, aggressive approach gives you <strong>more variance in your favor</strong> and <strong>less time for the house edge to compound.</strong></p>

    <h3>The Speed Advantage</h3>

    <p>Playing fast is about more than just comfort -- it's about <strong>minimizing the casino's opportunity to grind you.</strong></p>

    <ul>
      <li>Every minute at the table is a minute the house edge is working.</li>
      <li>Fast play means fewer total hands in a given session.</li>
      <li>Fewer hands means less exposure to the mathematical grind.</li>
      <li>You get your action in, you get your comps rated, and you get out before the numbers turn ugly.</li>
    </ul>

    <p>Don't be the player who agonizes over every decision for 30 seconds. Know your strategy cold. When the cards come, act. Speed is your friend because time is the casino's friend.</p>

    <h3>Bankroll Requirements for Big Betting</h3>

    <p>Let me be crystal clear about this: <strong>betting big does NOT mean betting recklessly.</strong> There are rules.</p>

    <ul>
      <li><strong>The 5% rule:</strong> Never risk more than 5% of your session bankroll on a single hand. If your session bankroll is $20,000, your max bet is $1,000.</li>
      <li><strong>The trip bankroll:</strong> Your total trip bankroll should be large enough to fund multiple sessions. If you're doing three sessions per day, your trip bankroll should be at least 3x your session bankroll.</li>
      <li><strong>The total bankroll:</strong> Your total gambling bankroll (all the money you've set aside for this) should be large enough to absorb a bad trip. Never risk your entire bankroll on one trip.</li>
    </ul>

    <p>Big betting within a disciplined framework is smart. Big betting without a framework is how people end up on the phone with the National Problem Gambling Helpline.</p>

    <blockquote>
      "There's a thin line between aggressive and reckless. Aggressive is betting $1,000 a hand with a $20,000 session bankroll, a stop-win, and a timer. Reckless is betting $1,000 a hand because you 'feel lucky.' Know the difference."
    </blockquote>

    <h3>Adjusting Bet Size Based on Session Results</h3>

    <p>Some players adjust their bets during a session based on how things are going. Here's how to think about this:</p>

    <ul>
      <li><strong>If you're winning:</strong> You can maintain your bet size or slightly increase it -- but never exceed the 5% rule based on your ORIGINAL buy-in, not your current stack. Don't let a hot streak make you reckless.</li>
      <li><strong>If you're losing:</strong> Do NOT increase your bets to chase losses. This is the single most destructive impulse in gambling. If anything, consider reducing your bet size to extend your session and give variance more room to swing back.</li>
      <li><strong>If you've hit your limit:</strong> Your bet size becomes zero. You're done. Leave.</li>
    </ul>

    <h3>Controlled Aggression: The Framework</h3>

    <p>Let me put the entire session discipline framework together for you. This is how every session should look:</p>

    <ul>
      <li><strong>Before the session:</strong> Set stop-win, stop-loss, session time (30-45 min). Write them down. Know your game and strategy cold.</li>
      <li><strong>Buy-in:</strong> Request a marker or buy chips. Set your phone timer.</li>
      <li><strong>During play:</strong> Bet big (within 5% rule). Play fast. Play optimal strategy. No drinks. No distractions. No ego. No emotion.</li>
      <li><strong>Decision points:</strong> When your timer hits 30 minutes, check your position. If you've hit stop-win or stop-loss, leave immediately. If not, decide whether 10-15 more minutes makes sense.</li>
      <li><strong>Cash out:</strong> Color up, go to the cage, log your results. Take a minimum 2-hour break before your next session.</li>
    </ul>

    <h3>The Endgame: Everything Works Together</h3>

    <p>We've covered a lot in this course. Let me show you how ALL of it connects:</p>

    <ul>
      <li><strong>Mindset (Module 1):</strong> You walk in with a plan, not hope. You treat this as a business.</li>
      <li><strong>Game selection:</strong> You play games with the lowest house edge and the best strategies. Blackjack. Pai Gow. Baccarat. Not slots. Not roulette.</li>
      <li><strong>Optimal strategy:</strong> You play every hand perfectly. No guessing. No gut feelings. Math only.</li>
      <li><strong>Loss rebates (Module 8):</strong> You have rebate agreements at multiple properties. Losses are softened. The effective house edge drops.</li>
      <li><strong>Comps (Module 9):</strong> You never pay for anything. Every meal, room, flight, and show is comped. Your actual cost of playing approaches zero.</li>
      <li><strong>Session discipline (this module):</strong> You play short, bet big, and get out. You never chase. You never overstay. You never let emotions drive.</li>
    </ul>

    <p>When you combine ALL of these strategies? You become a player that the casino didn't plan for. They planned for the guy who sits there for 8 hours drinking free vodka. They didn't plan for the player who flies in, hits three properties in 90 minutes of total play, collects loss rebates, gets comped for everything, and flies home the next day.</p>

    <h3>Your Session Log Template</h3>

    <p>Track every single session. No exceptions. Here's what to record:</p>

    <ul>
      <li><strong>Date</strong></li>
      <li><strong>Casino/Property</strong></li>
      <li><strong>Game played</strong></li>
      <li><strong>Buy-in amount</strong></li>
      <li><strong>Cash-out amount</strong></li>
      <li><strong>Win/Loss</strong></li>
      <li><strong>Session time</strong> (minutes)</li>
      <li><strong>Average bet size</strong></li>
      <li><strong>Stop-win set</strong> (and whether you honored it)</li>
      <li><strong>Stop-loss set</strong> (and whether you honored it)</li>
      <li><strong>Notes</strong> (anything notable about the session)</li>
    </ul>

    <p>Review your log weekly. Look for patterns. Are you consistently honoring your limits? Which casinos are you winning at? Which games produce the best results? Are your sessions staying within the 30-45 minute window? <strong>Data is how professionals improve. Feelings are how amateurs stay amateur.</strong></p>

    <h3>The Final Word</h3>

    <p>I'll leave you with this. I've won over $32 million in casinos. I've been banned from nearly every major property. I didn't do it by being lucky. I didn't do it by cheating. I did it by understanding math, controlling my emotions, playing a disciplined system, and treating every single session like a business operation.</p>

    <p>The house always wins... against players who don't know what they're doing. Against players who sit too long. Against players who bet with emotion. Against players who don't know about loss rebates, or comps, or optimal strategy.</p>

    <blockquote>
      "The house always wins -- unless you know what you're doing. Now you know what you're doing. Go execute."
    </blockquote>

    <p><strong>Now get out there and play smart.</strong></p>
  `,
};
