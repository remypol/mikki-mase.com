// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://mikki-mase.com',
  output: 'static',
  adapter: vercel(),
  compressHTML: true,
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
