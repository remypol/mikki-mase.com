# Claude Browser — Masterclass Deep Content Audit

Unlike the post-paywall UX audit, this one dives INSIDE every lesson body.
Goal: understand the current pedagogical + visual state of the course so we can
rebuild it into a proper "Masterclass" (playbook + simulator + journal), not a
long blog post.

Session: logged in as hpol369 (Masterclass tier). Do NOT sign out, do NOT click
Upgrade/Buy, do NOT submit payment.

---

## COPY-PASTE PROMPT

```
You are auditing the content and pedagogy of the Mikki Mase Masterclass. Already
logged in as hpol369 (Masterclass tier). Don't sign out, don't purchase anything.

For EVERY lesson route below, capture the complete content schema. This is not
a UX audit — we already did that. This one is about:
  (a) what Mikki actually teaches,
  (b) how it's structured pedagogically,
  (c) what's visually present vs missing,
  (d) what a world-class version would include.

The course is 10 modules, ~30 lessons + quizzes + an assessment. Full route list:

### Pre-course
1.  /masterclass/course                                  (dashboard)
2.  /masterclass/course/daily-drops                      (Inner Circle — locked, just note)
3.  /masterclass/course/ai-advisor                       (AI Advisor — locked, just note)

### Module 1 — Mindset & Disclaimer (2 lessons + quiz + assessment)
4.  /masterclass/course/mindset-disclaimer/the-gamblers-code
5.  /masterclass/course/mindset-disclaimer/why-most-players-lose
6.  /masterclass/course/mindset-disclaimer/quiz
7.  /masterclass/course/mindset-disclaimer/assessment           (Casino IQ Assessment)

### Module 2 — Casino Psychology (3 lessons + quiz)
8.  /masterclass/course/casino-psychology/how-casinos-manipulate-you
9.  /masterclass/course/casino-psychology/the-rewards-trap
10. /masterclass/course/casino-psychology/playing-dumb
11. /masterclass/course/casino-psychology/quiz

### Module 3 — Blackjack Mastery (5 lessons + quiz) — flagship
12. /masterclass/course/blackjack-mastery/blackjack-types-ranked
13. /masterclass/course/blackjack-mastery/basic-strategy-decoded
14. /masterclass/course/blackjack-mastery/soft-hands-and-splitting
15. /masterclass/course/blackjack-mastery/high-limit-vs-low-limit
16. /masterclass/course/blackjack-mastery/avoiding-continuous-shuffle
17. /masterclass/course/blackjack-mastery/quiz

### Module 4 — Side Bets That Actually Work (2 lessons + quiz)
18. /masterclass/course/side-bets/the-21-plus-3-side-bet
19. /masterclass/course/side-bets/side-bets-to-avoid
20. /masterclass/course/side-bets/quiz

### Module 5 — Pai Gow (3 lessons + quiz)
21. /masterclass/course/pai-gow/face-up-pai-gow-fundamentals
22. /masterclass/course/pai-gow/bonus-betting-with-7-cards
23. /masterclass/course/pai-gow/break-even-strategy
24. /masterclass/course/pai-gow/quiz

### Module 6 — UTH / Group Play (3 lessons + quiz)
25. /masterclass/course/uth-group-play/the-group-play-concept
26. /masterclass/course/uth-group-play/card-sharing-and-outs
27. /masterclass/course/uth-group-play/executing-the-strategy
28. /masterclass/course/uth-group-play/quiz

### Module 7 — Casino Negotiation & Hosts (3 lessons + quiz)
29. /masterclass/course/casino-negotiation/finding-a-casino-host
30. /masterclass/course/casino-negotiation/what-to-say
31. /masterclass/course/casino-negotiation/leveraging-competing-casinos
32. /masterclass/course/casino-negotiation/quiz

### Module 8 — The Discount System (2 lessons + quiz)
33. /masterclass/course/discount-system/understanding-loss-rebates
34. /masterclass/course/discount-system/multi-casino-discount-strategy
35. /masterclass/course/discount-system/quiz

### Module 9 — Comps & Perks (3 lessons + quiz)
36. /masterclass/course/comps-perks/comp-slips-vs-room-charges
37. /masterclass/course/comps-perks/front-money-vs-credit-lines
38. /masterclass/course/comps-perks/maximizing-every-dollar
39. /masterclass/course/comps-perks/quiz

### Module 10 — Session Discipline (3 lessons + quiz)
40. /masterclass/course/session-discipline/win-loss-limits
41. /masterclass/course/session-discipline/the-30-45-minute-rule
42. /masterclass/course/session-discipline/play-big-and-fast
43. /masterclass/course/session-discipline/quiz

## Schema per LESSON route

### A. Identity
- URL, module, lesson number in module (first/second/third/…), lesson slug,
  lesson title, estimated minutes (from the left-rail sidebar).

### B. Content spine — verbatim capture
Use document.querySelector to grab the ACTUAL content node (not the chrome).
Report:
- First 150 words of the lesson body (verbatim) — this is the hook
- Full list of H2/H3 headings in order
- Number of paragraphs
- Word count (approximate — use `document.querySelector('[lesson-content]')?.innerText.split(/\s+/).length` or similar)
- Any <ul>/<ol> lists: count, plus first 3 bullets of the longest list verbatim
- Any <blockquote>/<q>/pull-quote: full text
- Any <table> present (yes/no, if yes: column headers + row count)
- Any inline images or SVG diagrams (yes/no, describe)
- Any embedded video or audio (yes/no)
- Any interactive widget (yes/no, describe — e.g. "drag-rank exercise", "hand
  simulator", "multiple choice")

### C. Pedagogical signals
- Does the lesson open with a clear question or promise? Quote the opening sentence.
- Is there an explicit "what you'll learn" checklist at the top?
- Are concepts introduced with an example before the abstract rule, or the
  abstract rule first then example, or no example at all?
- Number of concrete examples cited in the lesson
- Mikki's voice presence: how many times does "I" or "Mikki" appear in the body?
- Authority cues: casino names dropped, specific hand amounts, specific dates,
  specific house-edge percentages — note any with line references
- Fluff / generic claims: any paragraph that could appear in any casino blog
  without knowing it's Mikki's? Quote the worst offender.

### D. Key takeaways block
- Bullet count
- Full verbatim capture of takeaways
- Do they map 1:1 to the lesson content, or are they padding?

### E. Pro Tip block
- Full verbatim capture
- Is it a genuinely actionable tactic, or decorative?

### F. End-of-lesson UX
- Is there a visible "Mark complete" button or auto-advance?
- Is there a "Next lesson" link? What's it labeled?
- Is there a contextual upsell inside the lesson body? Location + copy?
- Is there a "Questions?" / feedback / community link?

### G. Visual hierarchy
- Font families actually rendered on H1/H2/body (computed styles)
- Ratio of text to whitespace (eyeball — "dense wall" / "balanced" / "sparse")
- Use of color beyond the black+gold base: any?
- Any fixed-height containers clipping content on mobile? Resize to 390 and report.

### H. Score (1–10, be harsh)
- Pedagogical rigor
- Visual craft
- Actionability (would a student actually do something after reading this?)
- Authenticity (does this sound like Mikki or like AI-generated casino blog?)
- Retention design (will a student remember anything from this a week later?)

## Schema per QUIZ route

- Number of questions
- Types (multiple choice / T/F / scenario / ordering / match)
- Pass threshold shown? Retake policy shown?
- Feedback on wrong answers: just "wrong" / explanation / citation back to lesson
- Quote the HARDEST question verbatim and its answer options
- Quote the EASIEST question verbatim — is it testing understanding or just recall?

## Schema for the Casino IQ Assessment (route 7)

- Number of questions
- Scoring rubric: what score means what
- Does it gate anything, or purely diagnostic?
- Does it recommend a study path based on result?

## Dashboard + locked-surface notes (brief)
- On the dashboard: how many "Mark complete" checkmarks vs open circles does
  hpol369 have? (Tells us what this test account has already worked through.)
- Locked surfaces (daily-drops, ai-advisor): one line each on what they
  promise and what the unlock state looks like.

## After all lessons: SYNTHESIS section

1. **Content DNA.** In 5 sentences: what is this course actually teaching? Is
   it mindset-forward, math-forward, or anecdote-forward?

2. **Per-module content quality score (1–10):** rigor, actionability,
   authenticity, retention-design. Call out the single worst lesson + the single
   best lesson by URL.

3. **Learning arc.** Does the sequence build on itself (later lessons reference
   earlier ones), or are the modules isolated silos? Give 3 examples either way.

4. **Where Mikki's voice is strongest vs. weakest.** Which 5 lessons feel
   unmistakably like Mikki, and which 5 feel like they could be any casino blog?

5. **Missing content.** List the top 10 topics a real advantage-play masterclass
   would cover that are ABSENT here — Wonging, KO count, Shuffle tracking, Hole
   card play, Advantage bet sizing, specific casino-by-casino policies, etc.
   Note which are intentional omissions (legal / not Mikki's game) and which
   feel like gaps.

6. **Interactivity gap.** Zero of the 30 lessons contain a genuine interactive
   exercise per the post-paywall audit. For each module, propose ONE concrete
   interactive widget that would lock the concept in.

7. **Visual gap.** Zero lessons have videos. How many currently have any image
   / SVG / diagram / table at all? List those that do, so we know what's
   already there.

8. **Quiz pedagogy.** Are the 10 quizzes testing recall, understanding, or
   application? Score each quiz on Bloom's taxonomy level (1 = recall → 6 = create).

9. **Assessment utility.** Is the Casino IQ Assessment a genuine diagnostic
   that could route students, or is it vanity content?

10. **Redesign hit-list (top 10 changes, ranked by leverage).** Concrete,
    actionable. E.g. "Rewrite Module 5 Lesson 2 with a Pai Gow hand table
    because right now it's 4 paragraphs of prose with no visual aid."

## Hard rules
- Do NOT sign out, submit payment, change settings.
- Do NOT click "Upgrade to Inner Circle" / "Upgrade to unlock" CTAs.
- If a gate blocks you (unexpected), note it + move on.
- Capture VERBATIM strings where specified — no summarising inside per-lesson
  blocks. Summarise only in the SYNTHESIS.
- For every lesson: take ONE screenshot of its first viewport. Attach under
  the lesson's H2 header.
- 30 lessons × verbatim first-150-words + 10 quizzes + 1 assessment + 1
  synthesis block is a LOT. That's the point. Don't skimp.

## Deliverable format
Single markdown document, H1 "Mikki Mase Masterclass — Content Audit",
H2 per route, H3 sections A–H (skip N/A). SYNTHESIS block at the end.
Return the full document.
```

---

## Nadat Browser het rapport retourneert

Plak de markdown terug in deze chat. Dan voeg ik het toe aan mijn redesign-plan
(`MASTERCLASS-REDESIGN-V1.md`) en begin ik met:

1. Re-sequencing modules op basis van de learning-arc bevindingen
2. Per-module interactive widget-specificaties bouwen (React islands)
3. Beeldmateriaal-brief voor elke module (Nano Banana Pro 2 prompts of SVG's)
4. Lesson-template v2 (new layout: promise → media → content → interactive → takeaways → field note)
5. Quiz upgrade (van recall naar application level per Bloom's)
6. Free-tier reshuffle: Mindset + Session Discipline als "proef 2 modules gratis"
