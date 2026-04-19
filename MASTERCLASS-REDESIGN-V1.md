# Mikki Mase Masterclass — Redesign v1

Versie 1, als Hugo weken de tijd had. Te lezen als productvisie + concreet
plan. Bedoeld om door Claude Browser content-audit heen geharmoniseerd te
worden tot v2.

---

## 1. Wat is dit product werkelijk?

Nu: 10 modules, ~30 lessen, tekst-only. Voelt als een uitgebreide blog.

**Wat het moet zijn**: een **playbook + simulator + journal** voor mensen die
serieus geld aan casino's verliezen (of willen stoppen met verliezen). Drie
gelijkwaardige onderdelen:

1. **Playbook** — de daadwerkelijke strategische kennis, redactioneel
   geschreven, zoals een Ryan Holiday of Stripe-documentatie aanvoelt.
2. **Simulator** — per module één interactief element waar de theorie in de
   vingers gaat zitten. Niet "lees en memoriseer" maar "doe en voel het
   verschil."
3. **Journal** — persoonlijke notities, sessie-tracker, streak, laatste
   sessie-retrospectief. Zorgt dat het product na de cursus niet stopt.

Zonder die drie is het een $27 PDF. Mét die drie is het $200+ waard en kunnen
mensen door naar Inner Circle.

---

## 2. Doelgroep herijking

Drie personas die nu ongeadresseerd zijn:

**A. De verliezer die wakker wordt** (primary, ~60% van buyers)
Heeft $5k-$50k verloren. Voelt schaamte. Is niet op zoek naar "hoe word ik
Mikki" — is op zoek naar "hoe stop ik met bloeden." Voor hem is Module 1
(Mindset) en Module 10 (Session Discipline) het belangrijkst. Leg die voorop.

**B. De aspirant-advantage-player** (~25%)
Heeft gelezen over edge-play, denkt dat hij het systeem kan kraken. Wil de
specifieke tactieken: side bets, Pai Gow break-even, UTH group play. Voor hem
is M3-M8 de core value. Hij is ook degene die Inner Circle upsellt.

**C. De fan die toegang wil** (~15%)
Kent Mikki van SWU/Bert/NELK. Wil achter-de-schermen-access. Voor hem is de
VOICE het belangrijkst — persoonlijke anekdotes, specifieke hands, specifieke
bedragen. Die voice ontbreekt nu grotendeels.

**Implicatie**: de cursus moet op drie niveaus leesbaar zijn. Nu is het één
homogene lecture-toon.

---

## 3. Module re-sequencing

Huidige volgorde (laat het audit-rapport zien dat dit psychologisch niet
klopt):

```
M1 Mindset → M2 Psychology → M3 Blackjack → M4 Side Bets → M5 Pai Gow →
M6 UTH → M7 Negotiation → M8 Discount → M9 Comps → M10 Discipline

Engagement-arc: 6-6-7-5-4-3-6-5-4-3
```

Probleem: piek op M3 (Blackjack flagship), inzakking M5-M6 (niche games waar
veel studenten afhaken), zwak einde met Session Discipline.

**Nieuwe volgorde (v1)**:

| # | Module | Reden |
|---|---|---|
| 1 | **Mindset** | Blijft. Emotional flatness is de poort tot alles. |
| 2 | **Session Discipline** | Was M10 — nu pos 2. Voordat iemand ook maar één strategie leert moet hij stop-loss / win-limit / 30-min-rule weten. Anders leer je iemand harder te verliezen. |
| 3 | **Bankroll Math** | *Nieuw* of heropgetrokken uit /tools + current M8. De unit economics: hoe groot moet een bankroll zijn voor een $250 table, hoe reken je variance. Dit is wat een verliezer nu NOOIT weet. |
| 4 | **Casino Psychology** | Was M2. Nu je weet hoe jij jezelf disciplineert, leer nu hoe het casino je manipuleert. Angle shifts van introspectie naar vijand-analyse. |
| 5 | **Blackjack Mastery** (flagship) | Was M3. Eerst 4 fundamentals-modules, nu pas game-specific. Bloom's: we zitten op application-niveau. |
| 6 | **Pai Gow** | Was M5. Als "lage variance counterweight to blackjack" — contextueel gekoppeld, niet losse silo. |
| 7 | **Side Bets That Work** | Was M4. Voor wie al goed blackjack speelt; aanvullend. |
| 8 | **UTH & Group Play** | Was M6. Geavanceerd, alleen voor wie Blackjack al in de vingers heeft. |
| 9 | **Casino Negotiation & Hosts** | Was M7. Pas relevant als je al speelt. Juiste plek. |
| 10 | **Comps, Discounts & Lifetime Value** | **Gemerged M8 + M9**. Deze twee overlapten al. |

Nieuwe engagement-arc target: **7-7-8-7-9-6-7-6-8-7**. Piek op M5 Blackjack
(flagship moment), geen valleien onder 6, sterke landing op M10 (het vak
"maak geld terug via comps" voelt als meta-level revelatie).

---

## 4. Lesson template v2 (het belangrijkste ontwerpdocument)

Elke lesson krijgt een herhaalbare 8-secties layout:

```
┌────────────────────────────────────────────────────────┐
│ HEADER STRIP                                           │
│ [← Back to module]     [Module 3 · Lesson 2]    [ ◯ ]  │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ HERO                                                   │
│                                                        │
│   MODULE 3 · BLACKJACK MASTERY                        │
│                                                        │
│   Basic Strategy,                                      │
│   Decoded.                                             │
│                                                        │
│   In 9 minutes you'll know every correct play          │
│   without a chart in your pocket.                      │
│                                                        │
│   ⏱ 9 min read · Difficulty: intermediate             │
│   🎧 Audio version (8:43)                             │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ PROMISE CARD                                           │
│ ┌──────────────────────────────────────────────────┐  │
│ │ BY THE END OF THIS LESSON YOU WILL               │  │
│ │  ✓ Know why the chart exists                     │  │
│ │  ✓ Memorize the 3 rows that matter most          │  │
│ │  ✓ Recognize when NOT to follow it               │  │
│ └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ MEDIA SLOT (optional but aim for one per lesson)       │
│  - Mikki voice-over audio player (ElevenLabs if needed)│
│  - OR strategy table rendered as SVG                   │
│  - OR casino-floor photo with annotations              │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ LESSON BODY                                            │
│ 600-1200 words. Fraunces headings, Inter body 20/1.7.  │
│ Broken into 2-5 H3 sections.                           │
│ Pull quotes for Mikki's voice lines.                   │
│ Tables as real <table>.                                │
│ Diagrams as inline SVG.                                │
│ Concrete examples in `.stake-card` boxes.              │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ ⚡ THE DRILL                   (THE interactive moment)│
│ ┌──────────────────────────────────────────────────┐  │
│ │ You have: 16                                      │  │
│ │ Dealer shows: 10                                  │  │
│ │                                                   │  │
│ │ [ Hit ]  [ Stand ]  [ Double ]  [ Surrender ]    │  │
│ │                                                   │  │
│ │ → Correct answer appears with EV explanation      │  │
│ │ → Ratcheting streak counter                       │  │
│ │ → "Next hand" button, unlimited replays           │  │
│ └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ KEY TAKEAWAYS (existing block, styled better)          │
│  1. …                                                  │
│  2. …                                                  │
│  3. …                                                  │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ PRO TIP (existing block, Mikki's voice)                │
│ ◉  "When the pit boss hovers, bet flat for 3 hands.   │
│     They'll rotate and you'll be alone again."        │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ FIELD NOTE (new)                                       │
│ "This week, try this at a table near you"             │
│                                                        │
│ At your next session, pick ONE hand that would have    │
│ been a gut-call and apply basic strategy instead.     │
│ Log it in your journal.                                │
│                                                        │
│ [ Open journal ]                                       │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ END-OF-LESSON STICKY BAR (existing)                    │
│ [← Previous]  ✓ Mark complete  [Next lesson →]        │
└────────────────────────────────────────────────────────┘
```

Constraints:
- Geen lesson langer dan 1200 woorden. Langer → split in twee.
- Geen lesson zonder minstens één visual (SVG/tabel/foto/diagram).
- Geen lesson zonder een "Field Note" (het doe-moment).
- Waar mogelijk: een drill of calculator.

---

## 5. Interactieve widgets per module

Dit is waar "Masterclass" van "PDF" gaat verschillen. Mijn concrete
voorstellen:

### M1 Mindset
**Widget: Emotional Tilt Journal**
User vult in: "Wat voelde je toen je je laatste $X verloor?" — dropdown van
emoties (rage / denial / numb / alert). Streak: hoe vaak per week "alert." Dat
is het doel-gevoel.

### M2 Session Discipline
**Widget: Session Timer with Stop-Win/Stop-Loss**
Live web widget: set buy-in, set stop-loss (%), set win-goal (%). 30-min
ratchet: na 30 min trek stop-loss op naar break-even. Visuele countdown met
audio-cue bij hard stops. Gekoppeld aan een sessie-log (journal).

### M3 Bankroll Math
**Widget: Variance Visualizer**
Input: bankroll, bet size, hours played. Output: Monte Carlo grafiek met
1000 simulated sessions. User ziet "bij deze bet size heb je X% kans op
ruin." Ontnuchtering in 3 seconden.

### M4 Casino Psychology
**Widget: Casino Floor Overlay**
Interactieve SVG-kaart van een typisch Vegas floorplan. Hover over slot-clusters
→ zie de psychologische trick (verliezende machines aan de randen, oorverdovende
winstgeluiden vanuit center, toiletten diep in het pand). Educational.

### M5 Blackjack Mastery
**Widget: Basic Strategy Drill**
Zoals het mock-voorbeeld hierboven. Hand vs dealer up-card → 4 action
buttons → immediate EV feedback + Bloom's application-level check. Tracks
accuracy per cell in de strategy matrix. Visual heatmap van wat de user goed/
slecht doet. Dit is de killer-app van de cursus.

### M6 Pai Gow
**Widget: House Way vs Your Way**
Simulator: 7 kaarten dealt. User moet ze splitten in 5+2 hands volgens House
Way. Immediate feedback met uitleg. 50 hands → pass/fail.

### M7 Side Bets
**Widget: EV Calculator for Side Bets**
Dropdown: 21+3, Lucky Lucky, Perfect Pairs, Match the Dealer. Input:
deck penetration, count. Output: live EV. Meer dan 95% van de tijd: "Skip."
Dat is de les.

### M8 UTH & Group Play
**Widget: Group Table Simulator**
2-6 seats. User ziet eigen hand, dealer up-card, én de hands van 3 teammates.
Beslissing: ante, check, raise. Uitkomst met juiste vs gespeelde beslissing.

### M9 Casino Negotiation
**Widget: Host Conversation Tree**
"Host says: 'What can I do for you tonight?' → You pick response." 10 decision
points. Eindigt in "good comp" / "bad comp" / "blacklisted." Flowchart-style
game.

### M10 Comps, Discounts & Lifetime Value
**Widget: Lifetime Comp Calculator**
Input: jaarlijkse play volume, ADT, theoretical loss, casino. Output: wat je
recht hebt op (comps, suite, loss rebate %). Real numbers, geanonimiseerde
policies van 5 casinos.

Elke widget ship baar als **React island**, `client:visible`. Data flow via
Supabase waar nodig (journal, streak, scores).

---

## 6. Visual system per lesson

### Illustraties
Per module één hero-illustratie, in dezelfde Fraunces-editorial stijl als de
AngelGuard illustraties. Generation pipeline: Nano Banana Pro 2 met Mikki's
branding (black + gold + chip-red accents). Concrete briefs:

| Module | Illustratie brief |
|---|---|
| M1 Mindset | Cinematic portrait van speler met gesloten ogen aan een lege tafel, cold colour grade, gold dust accent |
| M2 Session Discipline | Editorial hourglass met casino chips als zand, warm low-light |
| M3 Bankroll Math | Pyramid stack van chips in verschillende denominaties, overlay van een bell curve in chip-red |
| M4 Casino Psychology | Overhead cutaway van een casino floor, geometric patterns highlighted, soft neon |
| M5 Blackjack | Close-up van een perfect 21 hand (Ace + Face), low angle, gold light |
| M6 Pai Gow | Pai Gow tiles gerangschikt als een kleine zen-garden, monochrome |
| M7 Side Bets | Layered stack van side-bet chips met EV % overlay numbers |
| M8 UTH | Group van 4 hands aan één tafel, overhead, red felt |
| M9 Negotiation | Host-player gesprek silhouet vanaf achter een zuil, cinematic |
| M10 Comps | Casino loyaliteitskaart als hero object, soft depth-of-field |

### Diagrams / tabellen
- Basic strategy chart als interactieve SVG (niet JPEG-scan)
- Bankroll pyramide als SVG
- Pai Gow house way als SVG board
- Comp value ladder per casino als tabel

### Typografie
- Lesson H1: Fraunces SOFT 144, mixed-case, 48-72px
- Lesson H2: Fraunces SOFT 48, 28-36px
- Lesson H3: Inter 700, 20px uppercase eyebrow
- Body: Inter 20/1.7 desktop, 18/1.7 mobile
- Code/monospace (voor specific bedragen, hand notation): JetBrains Mono

### Kleur binnen lessons
Buiten de base palette:
- **Verified-green** voor "dit is correct"
- **Claimed-amber** voor "house claims this but house edge still favors casino"
- **Loss-red** voor "don't do this"
- **Gold** voor "Mikki's voice"

Nooit meer dan drie accent-kleuren in één lesson.

---

## 7. Voice & tone overhaul

Huidige lessons voelen generiek. Brand-voice fix:

### Mikki's voice regels (per-lesson checklist)
- [ ] Minstens één "I"- of "mijn"-zin (eerste persoon)
- [ ] Minstens één specifiek bedrag genoemd ($X gewonnen / $X verloren)
- [ ] Minstens één specifieke casino-naam (Venetian / Wynn / Bellagio)
- [ ] Minstens één anekdote met datum of jaar
- [ ] Geen passieve constructies ("it is known that") — Mikki is blunt
- [ ] Geen jargon zonder uitleg
- [ ] Sluit af met een concrete "do this"

### Pull-quote formatting (Fraunces italic, gold left-border)
```
"The Venetian didn't ban me because I cheated.
 They banned me because I kept winning and they
 ran out of excuses."
                                  — Mikki, on The Venetian
```

---

## 8. Quiz & assessment upgrade

### Nu
Kwizzen zijn recall-heavy (Bloom's level 1-2). Infra bestaat maar feedback is
kleurhighlight zonder uitleg.

### Nieuw per quiz
- 60% application scenarios ("Je zit op een hand van 15 tegen dealer 10, de
  dealer shuffelt continu, je zit 20 min in je sessie — wat is de juiste
  move?")
- 30% conceptual ("Waarom raadt Mikki af om 21+3 te spelen?")
- 10% recall (voor de belangrijkste facts)

### Feedback
- Fout antwoord → korte uitleg WAAROM fout + inline link terug naar de
  specifieke lesson-sectie
- Goed antwoord → korte bevestiging + 1 level verdiepende edge-case

### Casino IQ Assessment (de eerste assessment)
Promoot van "optioneel" naar **gated-entry**: je moet 'm doen VOOR je Module 1
Lesson 1 kan openen. Scoort je op 4 assen:
- Discipline (1-10)
- Math literacy (1-10)
- Casino knowledge (1-10)
- Psychological awareness (1-10)

Output: aanbevolen leerpad ("Jij scoort laag op Discipline — begin met M2
Session Discipline, dan M1 Mindset"). Personaliseert de cursus.

### Cumulative exam (nieuw, optional)
Na M10 complete: 30 mixed questions van alle modules. Pass → digitale
"Graduate" badge + optional NFT/PDF certificaat + shout-out in Inner Circle.

---

## 9. Journal layer (nieuw product component)

Wat nu ontbreekt: een **persoonlijke laag** die de user terugbrengt naar het
product na de cursus af is.

### Features
1. **Session log** — per gespeelde sessie: date, casino, game, buy-in,
   result, notes. Input in 30s, opgeslagen in Supabase.
2. **Streak tracker** — consecutive days waarop iets gelogd is. Mikki-style
   badges.
3. **Monthly summary** — auto-generated rapport: "deze maand: 12 sessies,
   $3.2k gewonnen, 2 stop-loss triggers, 1 disaster session." Met Mikki-tone
   commentaar via AI.
4. **Field note replies** — elke "Field Note" uit een lesson → user logt hoe
   dat eruit zag in praktijk. Optional submit naar Mikki voor feedback
   (Inner Circle tier).

### Wat dit commercieel doet
- Masterclass voelt niet "voorbij" na lezen
- Motivatie voor Inner Circle upsell (submit naar Mikki = IC-only)
- Data die Mikki kan gebruiken voor beter materiaal (met opt-in)

---

## 10. Commerciële structuur

### Tiers herijkt

**Free tier** (huidige Mindset + Disclaimer preview)
- M1 Mindset (alle 2 lessons + quiz)
- M2 Session Discipline (alle 3 lessons + quiz) ← nieuwe toevoeging
- Casino IQ Assessment
- Session journal (basis: laatste 10 sessies)

Reden voor gratis M1 + M2: dit zijn de **schaamte-reducerende** modules. De
verliezer die hier begint, voelt dat we hem zien. De kans dat hij door betaalt
voor M3-M10 is enorm verhoogd.

**Masterclass** ($27)
- Alles uit Free +
- M3 t/m M10 (alle 25 lessons + quizzes)
- Alle drills & simulators
- Cumulative exam + Graduate badge
- Journal full history
- Downloadable cheatsheets (bestaand)

**Inner Circle** ($29/mo of $249/yr)
- Alles uit Masterclass +
- Daily Drops (bestaand)
- AI Casino Advisor (bestaand)
- Monthly live AMA met Mikki (nieuw — pre-recorded OK)
- Field note → Mikki feedback (1 per maand)
- Community forum / Telegram tier upgrade

**Lifetime VIP** ($249)
- Alles + founding badge + priority support + alle future content

---

## 11. Content-niveau rewrite prioriteit

Na Claude Browser audit krijg ik per lesson een score. Rewrite volgorde:

1. **Lessons die <6/10 scoren op "authenticiteit"** (klinken niet als Mikki)
   → dit zijn eerste prio: voeg specifieke bedragen, casino namen, anekdotes
   toe. Ingangstekst voor elk: 1 echte Mikki-zin.
2. **Lessons die <6/10 scoren op "actionability"** → voeg Field Note +
   interactieve widget toe.
3. **Modules M5, M6, M10** (de 3-4-3 valley) → grootste structurele rewrite
   nodig. Evt. korter maken, samenvoegen, of vervangen.

---

## 12. Uitvoeringsplan (als Hugo 4 weken tijd zou geven)

### Week 1: Foundation
- Claude Browser deep audit uitvoeren
- Module re-sequencing in code (`src/content/course/index.ts`)
- Lesson template v2 in `LessonContent.tsx` (nieuwe secties: promise, drill-slot, field-note)
- Free-tier herdefinitie: M1 + M2 als free preview

### Week 2: Visual system
- 10 module illustraties via Nano Banana Pro 2 (zelfde pipeline als AngelGuard)
- Basic strategy chart als SVG
- Pai Gow house way board als SVG
- Bankroll pyramid SVG
- Casino floor overhead SVG

### Week 3: Interactive widgets (top 5 eerst)
1. Blackjack drill (M5) — hoogste leverage
2. Session timer (M2) — meest repeat-usable
3. Variance visualizer (M3) — ontnuchterend
4. Host conversation tree (M9) — fun
5. Lifetime comp calculator (M10) — pay-off moment

### Week 4: Content rewrite + polish
- Per-lesson rewrite op basis van Mikki voice checklist
- Alle quizzes herzien (Bloom's application target)
- Casino IQ Assessment → gated-entry + personalized recommendation
- Journal / session log MVP (Supabase table + 1 React component)
- Cumulative exam + Graduate badge

### Deploy schedule
- Re-sequencing live eind week 1 (backwards compatible met bestaande users)
- Free-tier upgrade live eind week 1
- Visual system + eerste 2 widgets live eind week 2
- Alle widgets live eind week 3
- Content rewrite + journal live eind week 4

---

## 13. Harde acceptance criteria

Een lesson is "v2-klaar" als:
- [ ] Bevat een Promise Card ("By the end of this you'll…")
- [ ] Bevat minstens één visual (SVG/tabel/foto/diagram)
- [ ] Bevat minstens één verbatim Mikki-voice zin met specifiek bedrag of casino
- [ ] Bevat of refereert een interactive widget
- [ ] Eindigt met een Field Note
- [ ] Woordentelling tussen 400 en 1200
- [ ] Mobile 390px geen overflow, geen clip
- [ ] Fraunces H1 + Inter 20/1.7 body
- [ ] Voldoet aan de Mikki voice checklist (§7)
- [ ] Quiz-vraag voor deze lesson scoort Bloom's level ≥3 (application)

Een module is "v2-klaar" als:
- [ ] Alle lessons v2-klaar
- [ ] Eigen hero-illustratie
- [ ] Minstens één widget
- [ ] Quiz in gemixte Bloom's levels
- [ ] Feedback op fout is uitleg + backlink naar lesson-sectie

---

## 14. Wat ik NIET zou veranderen

- De `displayStyle="editorial"` Fraunces basis — die klopt
- Het trust-tag systeem (Verified/Claimed/Loss)
- De dashboard Resume card
- /account (na v3-fix)
- Checkout compliance (redirect guard, Stripe locale, success states)

Wat al goed is moet je niet weer aanraken. Dit plan is alleen voor het
masterclass-product zelf.

---

## 15. Open vragen voor Hugo

1. **Budget voor illustraties?** 10 hero illustraties via Nano Banana Pro 2 is
   ~$30-50 in API costs. Oké? Of handgetekend?
2. **Mikki voice-over audio**: heb je Mikki voor 30 lesson intros (elk 60-90s)?
   Of doen we ElevenLabs custom voice?
3. **Live AMA voor Inner Circle**: realistisch te organiseren, of houden we
   pre-recorded AMA's?
4. **Graduate certificaat**: PDF, NFT, of gewoon een badge in dashboard?
5. **Free-tier uitbreiding**: is $27 geldstroom belangrijk genoeg om M2 NIET
   gratis te maken? Mijn inschatting: M2 gratis maakt conversie naar $27 beter,
   niet slechter (lower friction, hoger volume, betere funnel).
6. **Content ownership**: rewrites op basis van audit — doe ik die of schrijf
   jij met Mikki? Ik kan first-draft leveren met specifieke Mikki-voice placeholders.

---

## 16. Volgende stappen

1. **Jij**: kopieer de Claude Browser prompt uit
   `CLAUDE-BROWSER-MASTERCLASS-DEEP-AUDIT.md`, draai het af, plak het rapport
   terug in chat.
2. **Ik**: merge rapport met dit plan → v2 met concrete per-lesson rewrites +
   widget specs.
3. **Dual-model review** (Gemini 3.1 Pro + GPT 5.4) op plan v2 voor we gaan
   bouwen.
4. **Bouwen** volgens de 4-weken roadmap (of korter als je specifieke modules
   eerst wilt).
