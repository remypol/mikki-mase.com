# POINTER — Chat Funnel Plan

**Het volledige bouwplan voor de /chat → Kirgo funnel staat NIET hier, maar in de bot-repo:**

```
~/Developer/mikki-ai-bot/PLAN-CHAT-FUNNEL.md
```

**Waarom daar:** de funnel-logica (bot state machine, Kirgo registratie, deposit links, journey tracking) leeft in `mikki-ai-bot`. Deze site-repo (`mikki-mase`) levert alleen het **Blok A** deel: de /chat landing page.

## Wat deze repo moet bouwen (Blok A, Sprint 1)

| Taak | File | Status |
|------|------|--------|
| Click-tracking op CTA | `src/pages/chat.astro` | te bouwen |
| UTM tracker component | `src/components/chat/Tracker.astro` | nieuw |
| Social proof (live count) | `src/components/chat/SocialProof.astro` | nieuw |
| QR fallback desktop | `src/components/chat/QRCode.astro` | nieuw |
| Urgency indicator | `src/components/chat/Urgency.astro` | nieuw |
| `/api/track` endpoint | `src/pages/api/track.ts` | nieuw |

Exacte code-snippets voor elk onderdeel staan in het masterplan onder **BLOK A**.

## Env vars die deze site nodig heeft

```bash
PUBLIC_SUPABASE_URL=https://xthmutmwvwsntucecfjo.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<anon key van het mikki-ai-bot Supabase project>
```

(Social proof leest de whale-count uit dezelfde Supabase als de bot — via een `get_whale_count` RPC die in het masterplan staat.)

---

*Laatste update: 4 augustus 2026 — Hugo + Hermes review, alle 5 besluiten verwerkt.*
