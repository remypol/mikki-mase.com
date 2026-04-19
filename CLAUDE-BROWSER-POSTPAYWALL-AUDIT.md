# Claude Browser — Post-Paywall Audit Prompt (mikki-mase.com)

Logged in as test user `hpol369` (Masterclass tier, NOT Inner Circle). Session cookie
already active. Covers 10 modules × lessons + quizzes, 2 locked upsells, tools,
checkout surfaces, and the account area.

---

## COPY-PASTE PROMPT VOOR CLAUDE BROWSER

```
You are auditing the POST-PAYWALL experience of mikki-mase.com. You are logged in
as test user "hpol369" (Hugo's test account, Masterclass tier but NOT Inner Circle).
The session cookie is already active — you can see "hpol369 · Sign Out" in the
header. Do NOT sign out. Do NOT change password. Do NOT trigger any upgrade
payment. Do NOT click "Upgrade to Inner Circle" / "Upgrade to unlock" CTAs
(note them, but don't follow them).

I want a brutally honest, LMS-grade audit of everything a buyer sees after they pay.
This is a $67 Masterclass with a $X/month "Inner Circle" upsell and an AI Casino
Strategy Advisor upsell. The rebrand will follow angelguardprayers.com's
architectural properties (semantic tokens, serif display + sans body, single
strong accent, soft radial hero glow, subtle card gradients, 18-20px body /
1.7 line-height, no parallax gimmicks) — but styled as a premium gambling brand,
not a religious one. Keep that rebrand target in mind when scoring each screen.

## Routes to visit (in this order)

### Dashboard & hubs
1.  https://mikki-mase.com/masterclass/course              (course dashboard — landing after purchase)
2.  https://mikki-mase.com/masterclass/course/daily-drops  (Inner Circle locked state)
3.  https://mikki-mase.com/masterclass/course/ai-advisor   (AI Advisor locked state)

### Module 1 — Mindset & Disclaimer (FREE PREVIEW — fully unlocked)
4.  /masterclass/course/mindset-disclaimer/lesson-1
5.  /masterclass/course/mindset-disclaimer/lesson-2
6.  /masterclass/course/mindset-disclaimer/quiz

### Module 2 — Casino Psychology (3 lessons + quiz)
7.  /masterclass/course/casino-psychology/lesson-1
8.  /masterclass/course/casino-psychology/lesson-2
9.  /masterclass/course/casino-psychology/lesson-3
10. /masterclass/course/casino-psychology/quiz

### Module 3 — Session Discipline (3 lessons + quiz)
11. /masterclass/course/session-discipline/lesson-1
12. /masterclass/course/session-discipline/lesson-2
13. /masterclass/course/session-discipline/lesson-3
14. /masterclass/course/session-discipline/quiz

### Module 4 — Discount System (2 lessons + quiz)
15. /masterclass/course/discount-system/lesson-1
16. /masterclass/course/discount-system/lesson-2
17. /masterclass/course/discount-system/quiz

### Module 5 — Casino Negotiation (3 lessons + quiz)
18. /masterclass/course/casino-negotiation/lesson-1
19. /masterclass/course/casino-negotiation/lesson-2
20. /masterclass/course/casino-negotiation/lesson-3
21. /masterclass/course/casino-negotiation/quiz

### Module 6 — Comps & Perks (3 lessons + quiz)
22. /masterclass/course/comps-perks/lesson-1
23. /masterclass/course/comps-perks/lesson-2
24. /masterclass/course/comps-perks/lesson-3
25. /masterclass/course/comps-perks/quiz

### Module 7 — Blackjack Mastery (5 lessons + quiz) — the flagship
26. /masterclass/course/blackjack-mastery/lesson-1
27. /masterclass/course/blackjack-mastery/lesson-2
28. /masterclass/course/blackjack-mastery/lesson-3
29. /masterclass/course/blackjack-mastery/lesson-4
30. /masterclass/course/blackjack-mastery/lesson-5
31. /masterclass/course/blackjack-mastery/quiz

### Module 8 — Pai Gow (3 lessons + quiz)
32. /masterclass/course/pai-gow/lesson-1
33. /masterclass/course/pai-gow/lesson-2
34. /masterclass/course/pai-gow/lesson-3
35. /masterclass/course/pai-gow/quiz

### Module 9 — UTH / Group Play (3 lessons + quiz)
36. /masterclass/course/uth-group-play/lesson-1
37. /masterclass/course/uth-group-play/lesson-2
38. /masterclass/course/uth-group-play/lesson-3
39. /masterclass/course/uth-group-play/quiz

### Module 10 — Side Bets (2 lessons + quiz)
40. /masterclass/course/side-bets/lesson-1
41. /masterclass/course/side-bets/lesson-2
42. /masterclass/course/side-bets/quiz

### Paid tools (available to logged-in buyers)
43. /tools
44. /tools/bankroll-calculator
45. /tools/roulette-calculator
46. /tools/blackjack-calculator
47. /tools/slot-calculator

### Commerce surfaces (DO NOT submit payment — inspect layout only)
48. /checkout/masterclass   (revisit — locked or redirect?)
49. /checkout/upsell        (Inner Circle / AI Advisor upsell page)
50. /checkout/playbook      (playbook upsell page)
51. /checkout/success       (post-purchase confirmation — may 404 without session)
52. /checkout/playbook-success

### Account area (whatever exists)
53. Click the user avatar "H / hpol369" — document where it goes. If there's an
    /account, /profile, /billing, /settings route, visit it.

## Schema for EVERY lesson page

### A. Identity
- URL · module slug · lesson number · lesson title
- Intent: video-first / text-first / interactive / quiz
- Expected prior state (what module/lesson user completes before this one)

### B. Layout structure
- Ordered list of on-page elements top→bottom (header, breadcrumb, progress bar,
  sidebar nav, video player, transcript, content blocks, CTA row, next-lesson
  pill, comment/community widget, footer).
- Is there a persistent **module/course sidebar** (AG-style rail) or only
  breadcrumb?
- Where does "Mark complete" / "Next lesson" live? Sticky? Footer? Inline?
- Desktop AND mobile layout differ materially (yes/no).

### C. Content quality
- Video present? (yes/no) — if yes: provider (Mux/Vimeo/YouTube/Bunny), player
  chrome (native/custom), playback speed control, captions toggle, chapters,
  transcript sync, resume from timestamp, thumbnail seek preview.
- Video length (mm:ss) if displayed.
- Transcript available (yes/full/summary/none).
- Downloadable assets (PDF/worksheet)?
- Code/strategy cards embedded?
- Inline images: compressed, lazy-loaded, alt text present?

### D. Visual system (same rigor as pre-paywall audit)
- Dominant bg / text / accent hex
- Font families used (headings / body / code blocks)
- Heading sizes at desktop
- Body font size + line-height
- Card radius, shadow style
- Gradient use
- Dark theme only, or is there a light variant?

### E. Progression UX
- Is progress clearly shown (x/y lessons, % complete, streaks)?
- Is "Next lesson" auto-suggested or manual?
- Does "Mark complete" persist on reload? (revisit after 10s, confirm)
- Is there a breadcrumb back to the dashboard?
- Does the sidebar scroll-to-active?
- Are locked lessons visually distinct from unlocked? (they shouldn't be locked
  in the course itself, but within-module sequencing gates sometimes exist)

### F. Quiz UX (for each quiz route)
- Number of questions
- Single choice / multi choice / mixed
- Instant feedback per question OR end-of-quiz scoring?
- Explanations shown on wrong answers?
- Passing score threshold visible?
- Can you retake? Is there a cooldown?
- Does passing unlock the next module (hard gate) or is it decorative?

### G. Upsell surfaces & pressure
- Where are Inner Circle / AI Advisor upsells surfaced inside lessons?
- Do they feel organic (end-of-module "next step") or intrusive (every lesson
  header)?
- Are lockouts honest (you see WHY you'd want it) or teasy (blurred content)?
- On the /masterclass/course/daily-drops and /ai-advisor pages (locked state):
  do they sell well? What's the proof/social-proof density?

### H. Brand consistency
- Does this screen feel like the pre-paywall marketing site (same nav, same
  accent, same type, same voice) or does it feel like a bolt-on LMS template?
- Is the header identical to the public site? Is the footer?
- Does the accent color #CFB53B (current gold) feel at home here, or does the
  LMS skin introduce competing colors?

### I. Technical hygiene
- Console errors (open DevTools mentally: note any red errors if visible in UI).
- Broken images (show `alt` text).
- Layout shift on video load.
- Unexpected redirects.
- Any paywall leaks (text that implies we're NOT paid for, on a paid page).

### J. Scores (1–10)
- Layout clarity
- Learning momentum (does it pull you to next lesson?)
- Production value (video + transcript + assets)
- Mobile quality
- Upsell taste (0 = spammy, 10 = elegant)
- Brand consistency with pre-paywall
- Trust/premium feel (does $67 feel well-spent here?)

## For NON-lesson routes

Use the same A–J schema, skipping sections that don't apply. For the dashboard
specifically, add:

- First-screen hierarchy: what's the single dominant element? Is it
  "Continue where you left off" (ideal), "Course Dashboard" static title, or
  upsells?
- Is there an onboarding moment (welcome video, first-lesson suggestion,
  progress zero-state)?
- Are the 10 modules listed in a way that conveys journey (1→10) or grid
  (pick any)?
- Inner Circle + AI Advisor cards at the top: do they feel like value or like
  annoyance for the user who already paid $67?

## After everything: SYNTHESIS section

1. Post-purchase honeymoon killer (worst thing in first 30s)
2. Learning momentum score 1-10, what breaks the chain
3. Top 10 highest-leverage fixes ranked
4. Upsell audit (density, respect)
5. LMS template or native? quantify gap
6. Video production consistency across 38 lessons
7. Quiz fairness
8. Brand DNA inside the paywall — matches public promise?
9. Mobile-specific bugs
10. Account/billing discoverability

## Reference benchmarks
MasterClass.com, Scrimba, Maven cohorts, Alex Hormozi's Skool, Stripe Docs,
Hallow (aesthetic only, not religious cues).

## Deliverable
Single markdown: H1 → H2 per route → H3 sections A-J → final SYNTHESIS.
Screenshots for: dashboard, daily-drops locked, ai-advisor locked, M1L1, M7L1,
M7 quiz, /tools, /account, /checkout/upsell.

## Hard rules
- Do NOT sign out, change password, submit payment, delete data.
- Do NOT click Upgrade CTAs to payment — note + screenshot modal, close it.
- If locked-gate: mark and move on.
- Broken link / 500 / paywall leak: capture and continue.
- One screenshot per route unless synthesis needs a second.
- Keep session — no incognito, no cookie clearing.
```

---

**Opgeslagen als:** `/Users/hugolol/Desktop/Mikki Money Mase/mikki-mase.com/CLAUDE-BROWSER-POSTPAYWALL-AUDIT.md`
