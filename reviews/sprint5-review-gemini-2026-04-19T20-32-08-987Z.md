# Gemini 3.1 Pro Review — Sprint 5 Content

Here is the senior editorial review of the Sprint 5b/5c lesson drop. 

You asked for a blunt assessment of factual correctness, pedagogical structure, and brand voice. Overall, the content strategy is excellent and the "Mikki" voice is largely dialed in—but you have some serious mathematical collisions and one massive credibility-killing urban legend that need immediate fixing before these hit paying customers.

## BLOCKERS (must-fix before shipping)

*   **M3 L1 (Casino Manipulation) — The "Extra Oxygen" Myth:** 
    You have Mikki claiming, *"Casinos pump extra oxygen through their ventilation systems."* **This is a 100% false urban legend.** Pumping oxygen into a crowded building is a massive fire hazard and highly illegal. A real casino insider knows this is a myth. Having Mikki state this as fact completely destroys his credibility for any player who actually knows Vegas. 
    *Fix:* Flip this to enhance his insider authority. Have him *debunk* it: *"Amateurs think casinos pump oxygen to keep you awake. That's an illegal fire hazard. What they actually pump is chilled air and proprietary scents..."*

*   **M2 L4 (Kelly & Variance) — The 1/40 vs 400-Unit Contradiction:**
    The lesson has a massive structural contradiction. Mikki states he uses the "1/40 rule" for his session bankroll (meaning his bankroll is 40 units—e.g., $40K bankroll = $1,000 bet). But two paragraphs later, the "400-Hand Session Test" tells the player: *"Session units should be $\ge$ 400 for standard blackjack."* You cannot tell a player to use a 40-unit bankroll and then fail them for not having a 400-unit bankroll. 
    *Fix:* Clarify the difference between a *Session* Bankroll (40 units) and a *Trip/Lifetime* Bankroll (400 units). 

*   **M2 L4 (Kelly & Variance) — The Risk of Ruin Math is Mangled:**
    The formula provided ($e^{-2ef/variance}$) is misstated depending on how $f$ is defined, but more importantly, the explanation contradicts itself. The text says: *"Doubling your average bet doesn't double your Risk of Ruin — it squares it. A 1% RoR becomes 0.01% if you halve the bet. A 1% RoR becomes 10% if you double the bet."* 
    Going from 1% (0.01) to 10% (0.10) is taking the **square root**, not squaring it. (0.01 squared is 0.0001).
    *Fix:* Mikki wouldn't sound like an MIT textbook anyway. Cut the algebra formula entirely and fix the phrasing: *"Risk of Ruin scales exponentially. Doubling your bet doesn't double your risk of going broke—it magnifies it violently. A safe 1% Risk of Ruin becomes a 10% Risk of Ruin just by doubling your bet size."*

## HIGH-IMPORTANCE (should-fix soon)

*   **M10 L4 (Taxes) — Outdated State Tax Laws:**
    The lesson claims Michigan and Ohio do NOT allow loss deductions. This is out of date as of 2026. Michigan passed the Taxpayer Protection Act in 2021 allowing gambling loss deductions, and Ohio also allows them up to winnings. 
    *Fix:* Swap Michigan and Ohio out for **Illinois, Connecticut, and Wisconsin**—these states notoriously still screw gamblers by taxing gross wins while disallowing itemized loss deductions.

*   **M4 L6 (Property Matrix) — Deck Count Math:**
    The text states: *"Single deck: ~0.17% advantage vs 8-deck. Double deck: ~0.19% advantage vs 8-deck."* This implies a double-deck game is *better* for the player than a single-deck game. 
    *Fix:* Clarify if these are base house edges or relative advantages. A standard 8-deck game has roughly a 0.65% house edge. A single-deck game drops that edge by about 0.48%, and a double-deck drops it by about 0.18%. Adjust the copy so it doesn't accidentally tell players 2-deck is mathematically superior to 1-deck.

*   **M8 L2 (Side Bets) — Insurance Edge:**
    The text lists the house edge of Insurance at 7.7%. On a standard 6-deck shoe, the house edge for insurance is roughly 7.4%. On an 8-deck it's ~7.47%. Single deck is ~5.9%. 
    *Fix:* Change "7.7%" to "~7.4%" to survive scrutiny from card counters who obsess over these exact basis points.

## POLISH (nice-to-fix)

*   **M1 L2 (Why Most Players Lose) — Compounding Math:**
    The math ($500/hand at 70 hands/hr for 4 hours = $140,000 action) is spot on. However, making it *slightly* punchier by comparing the actual dollar cost of a 6:5 table vs 3:2 table directly in the text helps drive the narrative home. The rewrite does this well, but bolding the final dollar amounts ($700 bleed vs $2,660 bleed) will make it skimmable for mobile readers.
*   **Voice in M2 L4 (Kelly):** 
    When explaining the Kelly criterion, the tone briefly slips from "Mikki at Carbone" to "Investopedia article." Re-read the "Step 1/Step 2" section and punch it up with a bit more colloquial grit so it matches the excellent intro. 

## OVERALL

*   **Kelly lesson rating (3/10):** Conceptually necessary, but the internal math contradictions (40 vs 400 units) and mangled RoR explanation will confuse players and damage trust.
*   **Taxes lesson rating (9/10):** Exceptional, pragmatic, and high-leverage; it just needs the state-law examples updated for 2026 accuracy.
*   **Property Rule Matrix rating (8/10):** A great actionable field guide that accurately hits the 6 key rules, only held back by the slightly confusing deck-count percentages.
*   **Overall voice consistency rating (8.5/10):** The rewrites succeeded in elevating the grit and authority. Aside from the oxygen myth, it reads exactly like the established M7/M8 baseline.