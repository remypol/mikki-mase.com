# Mikki Mase Rebrand Plan v1
**Architectuur geïnspireerd op angelguardprayers.com (AG). Stijl eigen, gambling-native.**

Gebaseerd op:
- Claude Browser pre-paywall audit (pagina's 1–13 van 24; synthesis nog missend)
- AG visuele systeem uit `~/father-dan-platform/src/styles/globals.css`
- Bestaand Astro project: `~/Desktop/Mikki Money Mase/mikki-mase.com/`

---

## 0. TL;DR

Wat Mikki nu is: **2020-style dark affiliate blog** met één goed template (home/story/timeline/wins/net-worth — allemaal hetzelfde) en **twee afwijkende product-pagina's die letterlijk PUA-copy bevatten** ("YES, MAKE ME UNFORGETTABLE", "She's Shaking Guarantee", "What Men Are Saying"). Body-typografie zit onder 2026-standaard (16/1.5). Stats-component lekt JS-source naar DOM. Cijfers spreken zichzelf tegen (150+ vs 47+ bans, $20–40M vs $20–43M).

Wat Mikki wordt: **2026 premium editorial** met serif display (Fraunces) + sans body (Inter), één dominante accent (chip-red of money-green — zie §2), semantic color tokens via CSS vars, radial hero glow, subtiele card-gradient wash, consistente CTA-taal (max 3 labels voor 3 intents).

Niet de AG religieuze esthetiek kopiëren — wel de **architecturale properties**: tokens, typografische hiërarchie, micro-interacties, ruimte.

---

## 1. Directe brand-safety fix (moet vóór rebrand)

| # | Wat | Waar | Ernst |
|---|---|---|---|
| 1 | "YES, MAKE ME UNFORGETTABLE" CTA vervangen | /beat-the-casino, /cheatsheets | 🔴 kritiek |
| 2 | "The 'She's Shaking' Guarantee" weg | /beat-the-casino | 🔴 kritiek |
| 3 | "What Men Are Saying" → "What Players Are Saying" | /beat-the-casino | 🔴 kritiek |
| 4 | Stat-component lekt JS source naar DOM | home `AnimatedStat.astro` | 🟠 hoog (SEO + a11y) |
| 5 | 150+ vs 47+ bans — kies één bron van waarheid | /banned, /home, footer | 🟠 hoog (trust) |
| 6 | Net worth range: $20–40M OF $20–43M | /net-worth, /home, meta | 🟡 medium |
| 7 | Hero mobile overflow /beat-the-casino | 96px Playfair H1 @ 390px | 🟠 hoog |
| 8 | Logo wrap op mobile (MIKKI MASE splitst) | `Header.astro` | 🟡 medium |

Deze lijst gaat door de rebrand heen als onderdeel van Phase 0.

---

## 2. Color tokens (semantic)

AG gebruikt `--bg-page`, `--bg-elevated`, `--bg-card`, `--text-primary/secondary/tertiary`, `--border-subtle`, `--accent-gold`. Mikki krijgt dezelfde structuur met eigen waarden.

### Aanbevolen accent: **Chip-Red `#D4183D`**
Rationale:
- Mikki's persona is risk + banned + losses-mutually-owned — rood is brand-native (baccarat dealer's cut, stop signs, casino risk).
- AG gebruikt al goud; home heeft ook al goud #CFB53B. Goud is "priester/wealth-pretend"; rood is "scherp, compromisloos, winnaar-met-wonden".
- Rood contrasteert beter met nachtelijke baccarat photography dan goud.
- Backup-optie: **Money-Green `#1B6B3F`** (jade/felt-green, rustiger, meer "house"). Onderhandelbaar.

### Tokens (dark-first, light als secundaire theme)

```css
:root, .theme-dark {
  --bg-page: 8 9 14;              /* near-black, iets warmer dan pure #000 */
  --bg-elevated: 14 16 24;
  --bg-card: 20 22 32;
  --bg-card-hover: 28 30 42;
  --text-primary: 246 244 239;    /* warm off-white, NIET pure white */
  --text-secondary: 170 167 160;
  --text-tertiary: 120 118 114;
  --border-subtle: 38 40 54;
  --accent: 212 24 61;             /* chip-red #D4183D */
  --accent-soft: 212 24 61 / 0.12;
  --accent-glow: 212 24 61 / 0.22;
  --verified: 27 107 63;           /* money-green als semantic "verified win" */
  --warning: 207 181 59;           /* behoud bestaand goud voor "claimed/unverified" */
}

.theme-light {
  --bg-page: 250 248 244;
  --bg-elevated: 242 238 230;
  --bg-card: 255 255 255;
  --text-primary: 14 16 24;
  --text-secondary: 90 86 82;
  --accent: 168 0 30;              /* donkerder rood voor light */
}
```

**Implementatie:** Mikki's Tailwind config breidt uit met `colors: { bg: { page, elevated, card }, text: { primary, secondary, tertiary }, accent, ... }` via `rgb(var(--x) / <alpha-value>)` pattern (exact zoals AG).

---

## 3. Typografie

### Display heading: **Fraunces** (variable, optical sizing)
Niet Playfair (Mikki gebruikt die al — weinig nieuws). Niet Lora (AG-specifiek, te kalm). Fraunces is editorial + heeft een **"SOFT" opsize axis** die uitstekend werkt op grote hero H1's zonder "wedding-card" te worden. Gevoel: Gambler magazine, niet kerkboek.

### Body: **Inter var** (blijft, al geladen)
Geen wijziging, wel groter: **18px mobile / 20px desktop / line-height 1.7**.

### Hiërarchie
| rol | font | mobile | desktop | weight |
|---|---|---|---|---|
| H1 hero | Fraunces SOFT 144 | 48px | 88px | 500 |
| H1 article | Fraunces SOFT 72 | 36px | 56px | 500 |
| H2 section | Fraunces SOFT 48 | 28px | 36px | 500 |
| H3 | Inter | 20px | 22px | 700 |
| eyebrow | Inter | 12px | 13px | 700 tracking 0.14em uppercase |
| body | Inter | 18px | 20px | 400 lh 1.7 |
| caption | Inter | 14px | 15px | 500 lh 1.5 |

**Weg met uppercase-everything.** Huidige site: "MIKKI MASE", "BANNED FROM 150+ PROPERTIES", "THE SYSTEM" — alles schreeuwt in sans. In de rebrand: H1's worden **mixed-case Fraunces serif**, alleen eyebrows blijven uppercase small-caps.

Zo wordt `MIKKI MASE` → `Mikki Mase.` (met punt — editorial signature).

---

## 4. Componenten-laag (AG-patterns vertaald)

| AG component | Mikki equivalent | Gebruikt op |
|---|---|---|
| `.hero-gradient` (radial gold + softBlue) | `.hero-gradient-red` (radial chip-red + amber) | elke hero |
| `.prayer-card` (subtle gold wash) | `.stake-card` (subtle red wash, verified-green voor wins) | win/loss cards, stat cards |
| `.warning-box` (gold translucent) | `.claimed-box` (amber voor "claimed not verified") | /wins, /net-worth |
| `.insight-box` (neutral card) | `.fact-box` | alle guides |
| `.nav-link` (underline reveal) | ident. (accent = rood) | Header.astro |
| `.text-gold-gradient` | `.text-red-gradient` (voor accent-woorden) | hero H1 accent-woord |
| `.guide-content p` 18/1.8 | ident. | story, alle guides |

### Nieuw: `VerifiedTag` / `ClaimedTag` / `LossTag` componenten
Audit noemde `/wins` als "site's strongest trust anchor" dankzij Verified-vs-Claimed framing. Promote dat naar een herbruikbaar label-systeem:
- ✓ Verified — money-green pill met micro-source-link
- ~ Claimed — amber pill
- ✕ Loss — red pill

Deze pills vervangen de huidige ad-hoc "(VERIFIED)" text-labels en worden site-breed gebruikt.

---

## 5. Hero-systeem

Huidige probleem: dezelfde carfoto wordt hergebruikt op home/story/timeline/wins/net-worth/gambling-psychology. Eén beeld = geen visuele hiërarchie.

### Nieuw hero-model
1. **Typographic hero by default** (Fraunces H1 + eyebrow + 1-regel subhead + 2 CTAs), geen foto achter. Radial red glow bovenaan, verder warme near-black.
2. **Photographic hero alleen voor canoniale pagina's**: / (car), /story (rattan-chair portrait), /advantage-play (rooftop firepit — audit noemde deze "best-looking on the site").
3. Elke andere pagina krijgt haar **eigen serif phrase** in plaats van stockfoto.

Dat ruimt meteen op dat /timeline/wins/net-worth/banned/gambling-psychology nu allemaal dezelfde auto tonen. Duidelijke identiteit per route.

---

## 6. CTA-systeem (consolideren)

Audit vond **10 CTA-varianten voor 2 acties**. Zo hoort het:

| intent | label | kleur | vorm |
|---|---|---|---|
| Free community | `Join the Telegram` | accent chip-red vol | pill |
| Paid offer | `Get the Masterclass · $67` | outline accent | pill |
| Learn more | `Read the full story → /story` | ghost link (underline reveal) | inline |

Alle andere varianten ("Full Story", "Read His Story", "Join Telegram Community", "View the complete timeline", enz.) worden geherstruct naar deze drie.

**Sticky mobile CTA** (zoals AG heeft via `StickyMobileCTA.tsx`): één knop onderaan, context-aware (op free pages = Telegram, op product pages = Get Masterclass). Vervangt de huidige bottom tab-bar die volgens audit onnodig verticale ruimte eet.

---

## 7. Page-prioriteit (impact × moeite)

| fase | pages | wat |
|---|---|---|
| **P0 brand safety** | /beat-the-casino, /cheatsheets, /banned | PUA-copy weg, 150/47 nummer-reconciliatie, overflow bug |
| **P1 tokens + typografie** | global.css + BaseLayout + Header + Footer + Hero | nieuwe CSS vars, Fraunces load, body 18/1.7, nav underline |
| **P2 home** | / | typographic hero, stat-component fix (JS-leak), press logo strip (NELK/Kreischer/Inked als SVG icons niet text), 3 CTA-consolidatie |
| **P3 trust anchor** | /wins, /banned, /net-worth | VerifiedTag/ClaimedTag componenten, cijfer-consistentie, single source of truth in een `src/data/numbers.ts` file |
| **P4 product pages** | /beat-the-casino, /cheatsheets, /masterclass sales | nieuwe asymmetrische hero binnen het token-systeem (niet een "second template"), Fraunces H1 mixed case, bug-fix mobile |
| **P5 guides** | /story, /timeline, /system, /baccarat-guide, /casino-advantage-play, /gambling-psychology | floating TOC-rail desktop (AG-style), pull-quotes met red glow border, reading progress bar |
| **P6 utility** | /faq, /glossary, /tools, /join, /support, /media, /blog | category filter pills, accordion polish, video hover-preview |
| **P7 legal** | /privacy-policy, /terms, /responsible-gambling | editorial type-only template, geen hero-foto, max 72 karakters per regel |

---

## 8. Data single-source-of-truth

Cijfers slippen nu op meerdere plekken. Maak:

```ts
// src/data/numbers.ts
export const NUMBERS = {
  totalWinnings: 32_000_000,
  totalWinningsVerified: 10_000_000,
  bansTotal: 47,           // hard: kies één. Audit vond 3 tegenstrijdige cijfers.
  bansVegas: 21,
  bansVerified: 13,
  netWorthMin: 20_000_000,
  netWorthMax: 43_000_000, // hard: kies 40 of 43. Een bron site-breed.
  telegramMembers: 7_000,
  masterclassPrice: 67,
  lastVerified: "2026-04-01",
};
```

Elke pagina die een cijfer toont importeert hieruit. Eén update = site-breed consistent.

---

## 9. Motion & interactie (waar wel / niet)

**Wel:**
- Count-up op stats (al aanwezig — alleen JS-leak fixen)
- Scroll-reveal fade (AG-style, subtiel — niet de huidige "explode-in")
- Nav underline reveal (AG-pattern)
- Subtle hover-lift op cards (translate-y 2px + border glow)
- Smooth scroll naar TOC anchors

**Niet:**
- Parallax hero (audit doc vroeg erom, 2026-conventie zegt: niet doen, TBT-hit)
- 3D tilt op cards (2022 Awwwards — dated in 2026)
- Glassmorphism overload (AG doet het ook niet meer)
- Video-bg op hero (zwaar + legalitisch riskant met baccarat footage)

---

## 10. Dark/light theme parity

AG heeft beide. Mikki heeft nu alleen pitch-black. Toevoegen: `.theme-light` variant (warm cream `#FAF8F4`, dark navy text). Toggle in footer (subtiel), geen system-preference default (dark blijft default — gambling is 's nachts).

---

## 11. Acceptance criteria (per fase)

Elke fase PR-bar:
1. Lighthouse ≥ 95 performance / 100 a11y / 100 best-practices / 100 SEO.
2. Geen console errors.
3. Mobile 390px — geen horizontale overflow, alle CTA's bereikbaar.
4. Dark + light parity (beide visueel reviewed).
5. `rg -n "MAKE ME UNFORGETTABLE|She's Shaking|What Men Are Saying"` returns 0.
6. Alle cijfers komen uit `src/data/numbers.ts`.

---

## 12. Open vragen voor Hugo (vóór implementatie)

1. **Accent:** chip-red #D4183D of money-green #1B6B3F? Ik recommend rood. Jouw call.
2. **Display font:** Fraunces SOFT akkoord of liever Tiempos/Canela (premium $$$)?
3. **Nummer-reconciliatie:** 47 bans (audit van `/banned` feitelijk) of 150 (storyline door de site heen)? Eén keuze moet.
4. **Net worth range:** $20–40M of $20–43M? Eén keuze moet.
5. **Logo:** "MIKKI MASE" wordmark blijft, of wil je een serif "Mikki Mase." (editorial punt) als nieuwe marque?
6. **Bottom mobile tab-bar:** schrappen (mijn advies) of behouden?
7. **Light theme:** prio P1 of later P8?

---

## 13. Volgende stappen

1. Jij antwoordt §12 open vragen (+/- 3 min).
2. Ik stuur dit plan naar **Gemini 3.1 Pro + GPT 5.4** voor dual-review.
3. Beide reviews → plan v2 (eventuele bijstellingen).
4. Start P0 brand-safety, dan P1 tokens, dan verder.
5. Na P2 (home live): tweede Browser-audit voor diff-check.
6. Parallel: als je tijd hebt, plak de **resterende tail van de Browser audit** (pages 14–24 + synthesis/Top-10) — dan verwerk ik nog extra fixes in het plan.

---

**Opgeslagen als:** `/Users/hugolol/Desktop/Mikki Money Mase/mikki-mase.com/REBRAND-PLAN-V1.md`
