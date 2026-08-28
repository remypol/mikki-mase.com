// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.mikki-mase.com',
  output: 'static',
  adapter: vercel(),
  // /chat springt DIRECT naar de Telegram-bot (Hugo 18-jul: geen tussenpagina).
  // 302 bewust: browsers cachen geen permanent-redirect naar een extern doel,
  // dus het doel blijft aanpasbaar. De ?start=site_chat deeplink-bron laat de
  // bot registreren dat iemand via de site binnenkwam. De oude landingspagina
  // (chat.astro) blijft bestaan als onbereikbare fallback.
  // Kanaalwoorden voor de drie YouTube-fankanalen (Hugo, 10 aug 2026). Ze droegen tot nu
  // een tweetekencode op angelguard.app, het linkdomein van een andere app: die kliks
  // stuurden het Mikki-publiek naar AngelGuard. Ze horen naar de chat.
  //
  // Elk kanaal heeft een EIGEN start-waarde, want dat is het enige veld dat Telegram
  // doorgeeft aan de bot (users.source). Een ?s= of ?utm_source= achter de t.me-URL
  // plakken werkt niet: gemeten 10 aug komt die parameter wel mee in de URL, maar de bot
  // ziet alleen start=. Daarom een aparte regel per kanaal en geen generieke.
  //
  // Geen tussenpagina, conform het besluit van 18 juli. Alle drie de paden zijn op
  // 10 aug live gemeten op 404 en botsen niet met een bestaande pagina.
  redirects: {
    '/chat': { status: 302, destination: 'https://t.me/MikkiMaseTeam_bot?start=site_chat' },
    // Cheatsheets-groeilink (Hugo 28-aug) -> MikkiMaseCommunity-bot met ManyChat-
    // groeicode. De oude cheat-sheet-bundle-pagina is verhuisd naar /cheat-sheets,
    // dus deze route is vrij. LET OP: vercel.json-redirects werken NIET op dit
    // project (de astro-vercel-adapter negeert ze; alleen deze config-redirects
    // vuren), gemeten 28-aug: /bedroom-boss viel ook naar home.
    '/cheatsheets': { status: 302, destination: 'https://telegram.me/MikkiMaseCommunity_bot?start=w37592478' },
    '/clips': { status: 302, destination: 'https://t.me/MikkiMaseTeam_bot?start=yt_clips' },
    '/room': { status: 302, destination: 'https://t.me/MikkiMaseTeam_bot?start=yt_room' },
    '/highlights': { status: 302, destination: 'https://t.me/MikkiMaseTeam_bot?start=yt_highlights' },
    // IG-story-codewoorden (Hugo 26-aug): de DM-hoofdknop toont het merk-domein
    // en dit pad geeft de bron per vraag door. Zelfde patroon: 1 regel per woord.
    '/chat/edge': { status: 302, destination: 'https://t.me/MikkiMaseTeam_bot?start=ig_story_edge' },
    '/chat/wheel': { status: 302, destination: 'https://t.me/MikkiMaseTeam_bot?start=ig_story_wheel' },
    '/chat/felt': { status: 302, destination: 'https://t.me/MikkiMaseTeam_bot?start=ig_story_felt' },
    '/chat/side': { status: 302, destination: 'https://t.me/MikkiMaseTeam_bot?start=ig_story_side' },
    '/chat/field': { status: 302, destination: 'https://t.me/MikkiMaseTeam_bot?start=ig_story_field' },
    '/chat/seven': { status: 302, destination: 'https://t.me/MikkiMaseTeam_bot?start=ig_story_seven' },
    '/chat/basket': { status: 302, destination: 'https://t.me/MikkiMaseTeam_bot?start=ig_story_basket' },
    '/chat/joker': { status: 302, destination: 'https://t.me/MikkiMaseTeam_bot?start=ig_story_joker' },
    '/chat/pairs': { status: 302, destination: 'https://t.me/MikkiMaseTeam_bot?start=ig_story_pairs' },
    '/chat/double': { status: 302, destination: 'https://t.me/MikkiMaseTeam_bot?start=ig_story_double' },
    '/chat/test': { status: 302, destination: 'https://t.me/MikkiMaseTeam_bot?start=ig_story_test' },
  },
  compressHTML: true,
  prefetch: {
    defaultStrategy: 'hover',
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      filter(page) {
        // Exclude pages that shouldn't be in sitemap
        return !page.includes('/bedroom-boss') &&
               !page.includes('/checkout/') &&
               !page.includes('/join-old') &&
               !page.includes('/bankroll-calculator-old') &&
               !page.includes('/funnel') &&
               !page.includes('/kirgo');
      },
      serialize(item) {
        // Homepage = highest priority
        if (item.url.endsWith('mikki-mase.com/')) {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        // Core story pages = very high priority
        else if (
          item.url.includes('/story/') ||
          item.url.includes('/wins/') ||
          item.url.includes('/the-system/') ||
          item.url.includes('/banned/')
        ) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        }
        // Pillar content pages = high priority (SEO targets)
        else if (
          item.url.includes('/baccarat-guide/') ||
          item.url.includes('/gambling-psychology/') ||
          item.url.includes('/casino-advantage-play/') ||
          item.url.includes('/net-worth/') ||
          item.url.includes('/faq/')
        ) {
          item.priority = 0.85;
          item.changefreq = 'weekly';
        }
        // Blog posts = good priority
        else if (item.url.includes('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        // Tools = high priority (interactive, rankable content)
        else if (item.url.includes('/tools/')) {
          item.priority = 0.85;
          item.changefreq = 'monthly';
        }
        // Utility pages
        else if (
          item.url.includes('/glossary/') ||
          item.url.includes('/media/') ||
          item.url.includes('/join/')
        ) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }
        // Everything else
        else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
});
