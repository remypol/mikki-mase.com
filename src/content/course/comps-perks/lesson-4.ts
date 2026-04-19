import type { Lesson } from '../../../config/course/types';

/**
 * Lesson 4: Taxes on Gambling Winnings
 * Module 10 - Comps & Perks Maximization
 *
 * New lesson shipped Sprint 5c per V3 redesign. Audit flagged taxes as the
 * single biggest content gap — course teaches players how to win but not what
 * the IRS expects after they do. This lesson is educational only — players
 * must consult a licensed CPA for their specific situation.
 */
export const lesson4: Lesson = {
  id: 'mod10-lesson4-taxes-on-winnings',
  slug: 'taxes-on-winnings',
  title: 'Taxes on Gambling Winnings',
  subtitle: 'Every win is taxable. Every session is documentable. Know the rules before April 15 knows them for you.',
  difficulty: 'advanced',
  fieldNote:
    'After your next session, write down in your notes: date, property, game, buy-in, cash-out, net. Take a photo of the cashier\'s receipt if you got one. Do this every session for 90 days and send the log to your CPA. Tell them you want a gambling deduction plan built around your actual play style.',
  promise: [
    'Know what a W-2G is and when the casino is required to issue one',
    'Understand how gambling losses can offset winnings — and when they cannot',
    'Build a session log that will survive an IRS audit',
  ],
  estimatedMinutes: 10,
  keyTakeaways: [
    'All US gambling winnings are taxable income — whether or not the casino issues paperwork.',
    'W-2G thresholds vary by game: slot/bingo $1,200, keno $1,500, poker tournaments $5,000 net, other wagers at $600+ AND at least 300× the stake. Most blackjack and pai gow wins do NOT generate a W-2G.',
    'Gambling losses are deductible ONLY up to the amount of winnings AND only if you itemize. Casual players who take the standard deduction cannot write off losses at all.',
    'Professional gambler status can change the math substantially — but self-employment tax and deduction rules are contested and time-sensitive. This is a CPA-only decision.',
    'A contemporaneous session log (date, location, game, buy-in, cash-out, witness if any) is your single best audit defense.',
  ],
  proTip:
    'This lesson is educational. Gambling tax law is complex, changes frequently, and depends heavily on your personal situation, state of residence, and whether you qualify as a professional gambler. Before you make any tax decision based on this lesson, talk to a CPA who specialises in gaming clients. Most major Vegas accounting firms have a gambling specialty group — use one. The fee is the cheapest insurance you\'ll ever buy.',
  content: `
    <h3>The Part of Winning Nobody Teaches</h3>

    <p>Every masterclass, every strategy book, every YouTube channel teaches you how to win. Almost none of them teach you what happens the morning after.</p>

    <p>Here's the short version: the IRS considers <strong>every dollar of gambling winnings taxable income</strong>, whether you receive paperwork for it or not. Your lucky $800 Friday night blackjack score? Taxable. The $12,000 you won at pai gow? Taxable. The comped suite you got because you played $200K through the cage? Technically, the comp value is taxable too.</p>

    <blockquote>
      "The only thing harder than winning at a casino is keeping it after you do. The casino takes its edge at the table. The IRS takes its edge on April 15."
    </blockquote>

    <p><strong>Before we go further: this is an educational lesson. Consult a licensed CPA before making any tax decision — every jurisdiction and every personal situation is different, and the rules change every few years.</strong></p>

    <h3>What the Casino Reports to the IRS</h3>

    <p>The casino doesn't automatically tell the IRS about every hand you play. But it IS required to file paperwork on certain wins. The form is called a <strong>W-2G</strong>.</p>

    <p>A W-2G is triggered when (as of tax year 2025/2026 — thresholds change, check current guidance):</p>

    <ul>
      <li><strong>Slot machines &amp; bingo:</strong> any win of $1,200 or more on a single event</li>
      <li><strong>Keno:</strong> any win of $1,500 or more (net of wager)</li>
      <li><strong>Poker tournaments:</strong> any net win of $5,000 or more</li>
      <li><strong>"Other wagers"</strong> (most long-shot side bets, progressive jackpots, certain table-game propositions): gross payout of $600 or more AND at least 300× the amount wagered</li>
    </ul>

    <p>Notice what's NOT on this list: regular blackjack wins, pai gow wins, baccarat wins, craps wins, and most table games. <strong>The casino does not issue a W-2G on these</strong> — even if you win $50,000 on one blackjack hand. The casino knows because every chip in and out of your front money account is logged, but they are not required to send the IRS a form.</p>

    <p>This leads a lot of recreational players to assume "if the casino didn't report it, the IRS doesn't know." That's dangerous thinking. The IRS doesn't need the casino's report — it can subpoena your cage records, your Players Club activity, your wire transfers in and out, and your credit card receipts. <strong>Under-reporting gambling income is tax fraud.</strong> Report everything.</p>

    <h3>W-2G Withholding</h3>

    <p>When a W-2G is issued, the casino may withhold federal tax at the source. Withholding rules:</p>

    <ul>
      <li><strong>Regular withholding (24% federal):</strong> triggered on certain wins over $5,000 when the payout is at least 300× the wager, and in a few other specific scenarios.</li>
      <li><strong>Backup withholding (24% federal):</strong> triggered if you don't provide a valid SSN/TIN at the cage.</li>
      <li><strong>State withholding:</strong> varies. Nevada has no state income tax. California, New York, and most other states do — and many require withholding on gambling winnings.</li>
    </ul>

    <p>The withheld amount is not a final tax — it's a prepayment. You settle up at filing time. If you had a losing year overall and can itemize, you may get the withholding refunded. If you had a winning year, you may owe more.</p>

    <h3>Deducting Losses (The Biggest Trap)</h3>

    <p>Here's where most recreational players get crushed. The tax code lets you deduct gambling losses, but ONLY with these restrictions:</p>

    <ul>
      <li><strong>You can only deduct losses up to the amount of your winnings.</strong> Net losses are not deductible. If you won $10,000 and lost $30,000, you can deduct $10,000 of losses. The other $20,000 of real loss is just gone.</li>
      <li><strong>You must itemize deductions.</strong> If you take the standard deduction, you cannot deduct gambling losses at all. Period. This is the single biggest trap. Most W-2 employees take the standard deduction. If you do, the IRS treats your $50,000 of winnings as fully taxable and your $50,000 of losses as if they never existed.</li>
      <li><strong>You must have a contemporaneous log.</strong> The IRS expects a session-by-session written record. A spreadsheet. A diary. Receipts. Witnesses. Without this, your loss deduction is unsupportable.</li>
    </ul>

    <p>Let me make this concrete. You fly to Vegas four times in a year. You win $18,000 on one trip and lose $15,000 across the other three. Your "true" net is +$3,000. If you take the standard deduction, the IRS sees $18,000 of winnings and $15,000 of losses that you cannot deduct — your taxable gambling income is $18,000, not $3,000. At a 24% federal rate plus state tax, you could owe $5,000+ on a trip set where you only netted $3,000 of actual profit.</p>

    <p><strong>This is why every serious player who isn't a pro gambler either itemizes or considers amateur status very carefully.</strong></p>

    <h3>Professional Gambler Status</h3>

    <p>If you gamble for a living and can meet the IRS's "trade or business" standard (regular, continuous, profit-motivated activity), you can file as a professional gambler on Schedule C instead of as an amateur. This is a materially different tax regime — and also a materially more complicated one. A few things to know, all of which are time-sensitive and require a specialist:</p>

    <ul>
      <li>You file on Schedule C as self-employed.</li>
      <li>Whether gambling winnings are subject to self-employment tax for pros has been contested in IRS memoranda and Tax Court cases cutting both ways. Don't assume SE tax applies automatically — ask your CPA how they file similar clients.</li>
      <li>Under the Tax Cuts and Jobs Act (tax years 2018–2025), professional gamblers could deduct ordinary business expenses (travel, lodging, research materials, subscriptions) but the <em>total</em> of gambling losses plus expenses was capped at gambling winnings — meaning a pro gambler could not generate a net gambling loss for the year. Whether that specific limitation continues past 2025 is uncertain as of this writing and depends on current law. Get current-year guidance.</li>
      <li>The IRS scrutiny is much higher for pros. You have to demonstrate it's your primary livelihood, conducted regularly, with profit motive and rigorous recordkeeping.</li>
    </ul>

    <p>Being a pro gambler is not a tax dodge — it's a different tax regime with its own tradeoffs. For players netting six or seven figures a year it's often worth exploring. For smaller-net players the amateur-with-itemized-deductions route can be cheaper. This is 100% a CPA decision, not a DIY one.</p>

    <h3>The Session Log You Need</h3>

    <p>Whether you're an amateur or a pro, your audit defense depends on a contemporaneous session log. The IRS has published guidance on what it expects. At minimum, each entry should contain:</p>

    <ul>
      <li><strong>Date and time</strong> of the session</li>
      <li><strong>Location</strong> (property name and address)</li>
      <li><strong>Game played</strong> (blackjack, pai gow, baccarat, etc.)</li>
      <li><strong>Table or machine number</strong> where possible</li>
      <li><strong>Buy-in amount</strong></li>
      <li><strong>Cash-out amount</strong></li>
      <li><strong>Net result</strong> (win or loss)</li>
      <li><strong>Name of anyone you played with</strong> who can corroborate</li>
    </ul>

    <p>Keep it in a dedicated notebook, or a dedicated Notes file, or a spreadsheet. The important word is <strong>contemporaneous</strong> — the IRS doesn't want a ledger you reconstructed from memory after getting the audit letter. They want one you kept in real time.</p>

    <p>I keep mine in Apple Notes with a photo of the cage receipt attached to each entry. Takes 30 seconds per session. Saves six figures in potential audit disputes.</p>

    <h3>State Taxes Matter</h3>

    <p>Federal is only half the story. States treat gambling winnings very differently, and the rules <strong>change frequently</strong> — do not assume what was true in one year is true the next. General shape:</p>

    <ul>
      <li><strong>No state income tax at all:</strong> Nevada, Florida, Texas, Washington, Wyoming, South Dakota, Alaska, Tennessee, New Hampshire.</li>
      <li><strong>State tax, loss deduction allowed if you itemize federally:</strong> most states conform to federal treatment.</li>
      <li><strong>State tax, no loss deduction allowed (or severely limited):</strong> a handful of states — Illinois, Connecticut, Wisconsin have historically been notorious here, but specific states change status as they pass reform legislation (Michigan and Ohio, for example, liberalised their treatment in recent years). Do not rely on a static list — check your state's current rules for the tax year you're filing.</li>
      <li><strong>Source-state withholding:</strong> you may owe taxes in the state where you gambled, regardless of where you live. Your home state usually offers a credit for out-of-state taxes paid.</li>
    </ul>

    <p>If you live in a state that disallows loss deductions and play professionally, the state tax bill alone can be crushing. This is why a lot of professional players establish Nevada or Florida residency.</p>

    <h3>Comps and Taxes</h3>

    <p>Comp treatment is one of the murkier areas in gambling tax. Many practitioners treat comps (hotel, food, show tickets) as non-taxable promotional rebates rather than income — essentially a price discount on something you wouldn't have bought at retail anyway. Others treat significant comps (large cash-equivalent rewards, airfare, tournament entries) as FMV-reportable. There is no bright-line rule that applies to every comp in every situation. Track the fair market value of your comps in your session log and let your CPA decide what, if anything, gets reported.</p>

    <p>Timing-wise, wins credited to your front money account are often treated as constructively received when available to you (not when you wire them home), but "constructive receipt" is nuanced — talk to your CPA about year-end timing if you're sitting on a significant front-money balance at December 31.</p>

    <h3>The Practical Playbook</h3>

    <p>Here's the short action list:</p>

    <ol>
      <li><strong>Keep a session log.</strong> Every session. In real time. Include the fields listed above.</li>
      <li><strong>Photograph every W-2G.</strong> Save digital copies to a tax folder.</li>
      <li><strong>Track comp value separately.</strong> It may or may not matter, but you want the data if the question comes up.</li>
      <li><strong>Decide your filing posture before April.</strong> Itemize vs standard deduction. Amateur vs professional. This decision should be made in consultation with a CPA based on the full year's numbers.</li>
      <li><strong>If you had a big win, consider quarterly estimated tax payments.</strong> Otherwise you'll owe penalties on top of the tax when you file.</li>
      <li><strong>Talk to a CPA who specialises in gaming clients.</strong> Rosen, Kepper, Dean Patenaude, and several other firms run dedicated gaming practices. The annual fee is nothing compared to a botched audit defense.</li>
    </ol>

    <blockquote>
      "The best session log is the one you're keeping right now, not the one you'll build after the audit letter shows up. Start tonight."
    </blockquote>

    <p>You cannot out-skill the IRS. You can only out-document them. Build the log, keep the receipts, hire the specialist. That's the tax strategy. It's less fun than the table strategy, but it's the one that lets you keep what you win.</p>
  `,
};
