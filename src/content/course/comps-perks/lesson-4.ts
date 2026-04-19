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
    'A W-2G form is issued on slot wins ≥ $1,200, keno ≥ $1,500, and table game wins ≥ $5,000 at ≥300:1 odds. Most blackjack and pai gow wins do NOT generate a W-2G.',
    'Gambling losses are deductible ONLY up to the amount of winnings AND only if you itemize. Casual players who take the standard deduction cannot write off losses.',
    'Professional gambler status changes the math substantially — losses offset winnings directly on Schedule C, but you pay self-employment tax on net winnings.',
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

    <p>A W-2G is triggered when:</p>

    <ul>
      <li><strong>Slot machines:</strong> any win of $1,200 or more on a single spin</li>
      <li><strong>Keno:</strong> any win of $1,500 or more (net of wager)</li>
      <li><strong>Poker tournaments:</strong> any win of $5,000 or more (net of buy-in)</li>
      <li><strong>Bingo:</strong> any win of $1,200 or more</li>
      <li><strong>Other games (table games with ≥300:1 odds):</strong> any win of $600 or more, or 300× the wager</li>
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

    <p>If you gamble for a living and meet the IRS's "trade or business" test, you can file as a professional gambler. This changes the math dramatically:</p>

    <ul>
      <li>You file on Schedule C (business income).</li>
      <li>Losses offset winnings directly — you pay tax on net winnings, not gross.</li>
      <li>You can deduct travel, lodging, cage fees, research materials, subscription services (yes, this course would qualify), and other ordinary business expenses.</li>
      <li>You pay self-employment tax (15.3%) on net winnings in addition to income tax.</li>
      <li>The IRS scrutiny is much higher. You have to show it's your primary livelihood, conducted regularly, with profit motive and recordkeeping.</li>
    </ul>

    <p>Being a pro gambler is not a tax dodge — it's a different tax regime with its own tradeoffs. For players netting six or seven figures a year, it's almost always the right structure. For players netting less than that, the self-employment tax can make amateur status with itemized deductions the cheaper path. This is 100% a "talk to a CPA" question.</p>

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

    <p>Federal is only half the story. States treat gambling winnings very differently:</p>

    <ul>
      <li><strong>No state income tax at all:</strong> Nevada, Florida, Texas, Washington, Wyoming, South Dakota, Alaska, Tennessee, New Hampshire.</li>
      <li><strong>State tax, full loss deduction allowed if you itemize:</strong> most states.</li>
      <li><strong>State tax, NO loss deduction allowed:</strong> Illinois, Indiana, Massachusetts, Michigan, Ohio, West Virginia, Wisconsin, others. This is brutal — your state treats every win as income and refuses to acknowledge offsetting losses.</li>
      <li><strong>Source-state withholding:</strong> you may owe taxes in the state where you gambled, regardless of where you live. Your home state usually offers a credit for out-of-state taxes paid.</li>
    </ul>

    <p>If you live in a no-loss-deduction state and play professionally, the state tax bill alone can be crushing. This is why a lot of professional players establish Nevada or Florida residency.</p>

    <h3>Comps and Taxes</h3>

    <p>Here's a frequently-missed area: <strong>comp value is technically taxable income.</strong> That $2,000 steakhouse comp, that $800 show, that $400 spa day — technically the IRS considers it income at fair market value. In practice, the IRS rarely pursues comp value for amateur players because it's not reported anywhere. For pro gamblers, comp value can matter — it's often offset by the business-expense deduction for the same meal/stay.</p>

    <p>Wins credited to your front money account are treated as received the moment they hit the account, not when you wire the money home. This matters for year-end timing.</p>

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
