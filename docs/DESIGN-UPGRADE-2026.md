# Design Upgrade 2026 — "High-Limit Editorial"

*Plan d.d. 16 juli 2026. Doel: de site van "verouderd Tailwind-sjabloon" naar een
premium, cinematische fan-experience tillen — met de energie van /kirgo maar in
de eigen MMC-identiteit (zwart/goud). Geen framework-migratie, geen URL-wijzigingen,
SEO-structuur en schema blijven intact.*

---

## 1. Diagnose — waarom het nu gedateerd voelt

Concreet waargenomen (screenshots 16-07, mobiel + desktop):

1. **Chrome-stapeling.** Boven de content staan tot 5 lagen UI: 3-regelige gele
   disclaimerbanner + header + (mobiel) bottom-tabbar + exit-intent bar +
   reading-progress. De banner alleen al kost ~90px en schreeuwt.
2. **Hero zonder regie.** "Featured in"-strip zweeft los bóven de titel over een
   muddy foto; de serif-titel landt pas onder de fold; CTA-tekst **kapt af op
   mobiel** ("...Fan Communi") — echte bug. Pill-buttons (rood gevuld + goud
   outline, hover `scale(1.05)`) zijn 2021-Tailwind.
3. **Twee designtalen.** De Fraunces-editorial laag (juni) en de oude
   Inter-black laag lopen door elkaar in cards, badges, buttons en de tools.
4. **SEO-machinerie als zichtbare UI.** QuickAnswer-boxen, breadcrumbs,
   ChapterNav, 45-vragen-FAQ-walls — functioneel, maar visueel domineren ze.
5. **Fotogebruik.** ~3 foto's site-breed, zonder treatment. /kirgo bewijst wat
   één duotone-foto + spotlight-gradient doet voor de premium-factor.
6. **Flat #000 overal.** Geen diepte, geen texture. Alles even zwart = goedkoop.
7. **Tools zijn een ander universum.** Eigen mini-designsystemen per calculator
   (kleuren nu getokenized, layouts nog niet). Bonus-bug: calculators hangen aan
   Supabase-middleware en crashen zonder env — hoort losgekoppeld.
8. **De sterkste content is typografisch begraven.** $32M, 150+ bans, 54% —
   dit zijn de helden van de site en ze staan in body-tekst.

## 2. Richting: **High-Limit Editorial**

Eén zin: *de spanning van een high-limit room, gedocumenteerd als magazine.*
De merge van Hugo's Fraunces-basis met de /kirgo-energie — maar strikt in
MMC-kleuren.

- **Ondergrond:** warm-zwart in plaats van flat black — `#0C0B09` (page),
  `#14110C` (elevated), `#1B1712` (cards). Table-spotlight radial gradients
  (zoals /kirgo-hero) op section-openers; subtiel vignette/grain.
- **Typografie:** Fraunces (variable, al aanwezig) als enige display — groter en
  zelfverzekerder ingezet (clamp tot 7rem op heroes); Inter voor UI/body;
  **Playfair Display verwijderen** (1 font minder, scherper profiel).
- **Goud = signaal, geen decoratie.** Alleen voor: primaire CTA, actieve states,
  key numbers, dividers. Al het overige goud-op-zwart-ornament eruit.
- **Fototaal:** goud-zwart duotone + grain op alle foto's (CSS
  `filter`/`mix-blend-mode`, geen re-edits nodig). Stills uit zijn publieke
  interviews (fan-content framing bestaat al) om van 3 naar ~12 beelden te gaan.
- **Cijfers als helden:** serif numerals XXL met count-up (AnimatedStat bestaat
  al — restylen, niet herbouwen). Elke kernpagina opent met zijn eigen "stat".
- **Motion-taal:** één set tokens (200/400/700ms, cubic-bezier(0.22,1,0.36,1)),
  scroll-reveals verfijnen, reel-achtige pop alleen op stats/CTA's.
  `prefers-reduced-motion` overal (bestaat al).

## 3. UX-structuur

- **Chrome-dieet.** Disclaimer → één regel 11px, klapt in na scroll (blijft
  aanwezig: juridisch gewenst). Exit-intent alleen op blogpagina's.
  Reading-progress alleen op artikelen. Back-to-top weg (bottom-nav heeft Home).
- **CTA-hiërarchie.** Eén conversie per pagina: **Fan Community (Telegram)** —
  dat is sinds de verkoop-stop hét doel (+ Kirgo-affiliate via footer/tools).
  Eén primaire buttonstijl (goud, zoals /kirgo) + één ghost. Rood reserveren
  voor accenten, niet voor CTA's.
- **Hero-systeem.** Eén component, 3 varianten: `home` (foto-forward,
  spotlight), `article` (compact, stat-eyebrow), `landing` (/join-stijl).
  Fixt meteen de CTA-overflow bug.
- **Nav.** Mega-menu behouden maar visueel gelijktrekken (al deels gedaan);
  mobiele drawer van 8 links → 5 (Story, Wins, The System, FAQ, Community).
  Bottom-tabbar behouden (werkt voor social traffic) maar restylen op tokens.
- **Lange pagina's.** FAQ → accordions per categorie met zoekveld bovenaan;
  content-pagina's → sticky mini-TOC (ChapterNav restylen), kortere secties,
  pull-quotes in Fraunces italic als ademruimte.

## 4. Per pagina (prioriteit ≈ traffic)

| # | Pagina | Ingreep |
|---|--------|---------|
| 1 | **Home** | Volledige hero-rebuild (duotone foto, titel boven de fold, stats-strip eronder), secties terugbrengen tot: proof (stats) → story-teaser → wins-highlights → community-CTA. "Featured in" als stille logo-regel onder de hero. |
| 2 | **Story** | Al editorial qua headings; nu fototreatment, pull-quotes, timeline-restyle (EnhancedTimeline op tokens), leesritme. |
| 3 | **Wins** | Win/loss-cards → één card-systeem; grote serif-bedragen; chart-styling op tokens. |
| 4 | **Net-worth** | Stat-hero ($20–40M XXL), tabel-restyle, bronnen-badges. |
| 5 | **Banned** | Leaflet-kaart dark-style, ban-redenen als speelkaart-flip cards (signature moment). |
| 6 | **The System** | Vergelijkingstabellen → visueel, stappen-flow zoals /kirgo-steps. |
| 7 | **FAQ** | Accordions + zoek; schema blijft (rendert uit dezelfde data). |
| 8 | **Join** | Belangrijkste conversie: /kirgo-niveau geven (spotlight, social proof, één CTA). |
| 9 | **Tools** | Eén gedeelde calculator-shell (input-panel + result-panel componenten); Supabase-afhankelijkheid uit de middleware voor deze routes. |
| 10 | Blog/glossary/media | Meeliften op tokens + hero-systeem; laagste prio. |

## 5. Tech dat meelift

- Fraunces **self-hosten** (variable subset, ~45KB) → geen Google Fonts flash;
  Playfair volledig verwijderen incl. preloads.
- Foto-pipeline: bestaande AVIF/WebP-aanpak hergebruiken voor nieuwe beelden.
- Tools loskoppelen van Supabase-middleware (crasht nu lokaal zonder env).
- Contrast-pass (gray-500-op-zwart zit op de rand) + focus-states al goed.

## 6. Fasering (elke fase: build + visuele verificatie + aparte commit)

| Fase | Inhoud | Omvang |
|------|--------|--------|
| **0 — Quick wins** | CTA-overflow bug, banner-dieet, button-unificatie (goud primair), Playfair eruit, foto-duotone op bestaande hero's | ~1 sessie |
| **1 — Fundament** | Tokens (warm zwart, motion, radius), hero-systeem (3 varianten), header/footer/bottom-nav restyle | 1–2 sessies |
| **2 — Kernpagina's** | Home, story, wins, net-worth, banned | 2–3 sessies |
| **3 — Rest content** | The-system, FAQ, join, blog-index | 1–2 sessies |
| **4 — Tools & polish** | Calculator-shell, microinteracties, contrast/a11y-pass, Lighthouse | 1–2 sessies |

**Totaal: ± 7–10 sessies.** Fase 0+1 geven al het grootste visuele verschil;
daarna is elke fase zelfstandig shipbaar.

## 7. Expliciet buiten scope

Geen framework/CMS-migratie, geen URL- of contentwijzigingen (SEO), geen
verkoop-features terug, /kirgo blijft zoals hij is (die is af).
