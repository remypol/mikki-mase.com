/**
 * Product Registry
 * All products available in the mikki-mase.com shop
 */

import type { Product } from './types';

// ============================================
// MMC CHEATSHEET BUNDLE
// ============================================

export const mmcCheatsheetBundle: Product = {
  id: 'mmc-cheatsheet-bundle',
  slug: 'mmc-cheatsheet-bundle',
  type: 'bundle',
  fulfillment: 'digital',

  name: 'MMC Cheatsheet Bundle',
  tagline: 'The Strategy Arsenal',
  description:
    'Baccarat, Poker, and Roulette strategy cheat sheets. The exact cards used by the Mikki Mase Casino Community. Print-friendly, wallet-sized format.',
  cover: '/images/shop/cheatsheet-bundle-cover.jpg',
  gallery: ['/images/shop/cheatsheet-bundle-cover.jpg'],

  price: 19.99,
  compareAt: 57,
  currency: 'USD',

  stripePriceId: 'price_1TA7EsL6BPyNd2GhSP4KrS1P',
  stripeProductId: 'prod_U8O0UlaoEUIOc6',

  downloadFile: 'mmc-cheatsheet-bundle.zip',

  featured: true,
  category: 'bundles',
  relatedProducts: ['beat-the-casino', 'ultimate-mmc-bundle'],

  salesPage: {
    headline: 'The exact strategy cards used by the Mikki Mase Casino Community.',
    subheadline: 'Baccarat. Poker. Roulette. All three cheat sheets in one bundle.',
    painPoints: [
      "You've lost money making 'gut feel' bets",
      "You've searched for strategy and found confusing academic papers",
      "You know the house has an edge but don't know how to minimize it",
      "You've watched other players win and wondered what they know",
    ],
    chapters: [
      { number: 1, title: 'Baccarat Strategy Guide', description: 'The complete baccarat strategy system. Pattern recognition, bankroll management, betting progressions. 16 pages.' },
      { number: 2, title: 'Poker Cheatsheet', description: 'Hand rankings, position strategy, pot odds calculator, pre-flop decision matrix. 9 pages.' },
      { number: 3, title: 'Roulette Cheatsheet', description: 'European vs American odds, Martingale, Labouchère, D\'Alembert, and the 007 bet. 2 pages.' },
    ],
    bonuses: [],
    testimonials: [
      {
        id: 't1',
        name: 'Alex M.',
        location: 'Las Vegas',
        rating: 5,
        text: 'Printed the baccarat sheet and laminated it. Use it every Vegas trip. Saved me at least $2K in bad bets.',
        verified: true,
      },
      {
        id: 't2',
        name: 'Chris P.',
        location: 'Atlantic City',
        rating: 5,
        text: 'The roulette 007 bet alone paid for the entire bundle on my first session.',
        verified: true,
      },
      {
        id: 't3',
        name: 'Jordan T.',
        location: 'Miami',
        rating: 5,
        text: 'Finally a reference card that makes sense and fits in my wallet.',
        verified: true,
      },
    ],
    guarantee: {
      title: "The 'Better Player' Guarantee",
      description:
        "Use these cheat sheets for 30 full days. If you're not making smarter bets and feeling more confident at the table, email us. Full refund.",
      days: 30,
    },
    faqs: [
      { question: 'What format are the cheat sheets?', answer: 'PDF. Works on any device — print them, save to your phone, or keep a copy in your wallet.' },
      { question: 'Are these legal to use at casinos?', answer: "100% legal. Casinos ban advantage players not because it's illegal, but because they don't like losing." },
      { question: 'How are they delivered?', answer: 'Instant. You\'ll get an email with a download link within 60 seconds of purchase.' },
      { question: 'What\'s your refund policy?', answer: '30-day money-back guarantee. No questions asked.' },
      { question: 'Is my payment secure?', answer: 'Yes. We use Stripe — the same payment processor used by Amazon and Google. Your card info never touches our servers.' },
    ],
  },

  seo: {
    title: 'MMC Cheatsheet Bundle — Baccarat, Poker & Roulette Strategy Cards | $19.99',
    description:
      'The exact strategy cards used by the Mikki Mase Casino Community. Baccarat, Poker, and Roulette cheat sheets. Instant PDF download. 30-day guarantee.',
    image: '/images/shop/cheatsheet-bundle-cover.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'MMC Cheatsheet Bundle',
      description: 'Baccarat, Poker, and Roulette strategy cheat sheets. Print-friendly PDF format.',
      image: 'https://www.mikki-mase.com/images/shop/cheatsheet-bundle-cover.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 19.99,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/cheatsheets',
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.9, reviewCount: 89 },
    },
  },
};

// ============================================
// BEAT THE CASINO EBOOK
// ============================================

export const beatTheCasino: Product = {
  id: 'beat-the-casino',
  slug: 'beat-the-casino',
  type: 'ebook',
  fulfillment: 'digital',

  name: 'Beat the Casino',
  tagline: 'The Complete Guide',
  description:
    '98 pages. 8 chapters. Everything casinos don\'t want you to know about casino psychology, advantage play, and beating the house.',
  cover: '/images/shop/beat-the-casino-cover.jpg',
  gallery: ['/images/shop/beat-the-casino-cover.jpg'],

  price: 29,
  compareAt: 67,
  currency: 'USD',

  stripePriceId: 'price_1TA7EsL6BPyNd2GhztnMMASX',
  stripeProductId: 'prod_U8O0U2UkWPFp78',

  downloadFile: 'beat-the-casino.pdf',

  featured: true,
  category: 'ebooks',
  relatedProducts: ['mmc-cheatsheet-bundle', 'ultimate-mmc-bundle'],

  salesPage: {
    headline: 'Everything casinos don\'t want you to know.',
    subheadline: '98 pages. 8 chapters. Casino psychology, advantage play, and beating the house.',
    painPoints: [
      'You always lose more than you win',
      "You've fallen for 'rewards' that cost you money",
      'You suspected games were rigged',
      'You never understood why winners get banned',
    ],
    chapters: [
      { number: 1, title: 'The Casino Environment', description: 'How casino architecture and design are engineered to manipulate your behavior and keep you playing.' },
      { number: 2, title: 'Mind Tricks of Game Design', description: 'Slot psychology, table manipulation, and the invisible systems designed to separate you from your money.' },
      { number: 3, title: 'The Manipulation of Rewards', description: 'How loyalty programs are designed to cost you more than they give. The math behind "free" perks.' },
      { number: 4, title: 'Exploiting the System', description: 'Card counting, advantage play, bonus exploitation — the techniques casinos fear most.' },
      { number: 5, title: 'Casino Security', description: 'How surveillance catches players, the evolution of detection technology, and how to stay under the radar.' },
      { number: 6, title: 'Responsible Gambling', description: 'Maintaining control, recognizing problems, and the discipline that separates winners from addicts.' },
      { number: 7, title: 'Future of Gambling', description: 'AI, VR, crypto, and mobile — how technology is reshaping the casino landscape.' },
      { number: 8, title: 'Thriving in the Future', description: 'New regulations, emerging technologies, and how to maintain a competitive edge.' },
    ],
    bonuses: [],
    testimonials: [
      {
        id: 't1',
        name: 'David L.',
        location: 'Chicago',
        rating: 5,
        text: "15 years of casino visits. This book showed me how much I've wasted on their 'rewards' programs.",
        verified: true,
      },
      {
        id: 't2',
        name: 'Ryan K.',
        location: 'Las Vegas',
        rating: 5,
        text: 'Chapter 4 on advantage play changed how I approach every table. Worth 100x.',
        verified: true,
      },
      {
        id: 't3',
        name: 'Marcus W.',
        location: 'New York',
        rating: 5,
        text: 'Bought for the strategy, stayed for the psychology. Casino design chapter blew my mind.',
        verified: true,
      },
    ],
    guarantee: {
      title: "The 'Casino Clarity' Guarantee",
      description:
        "Read all 8 chapters. If you don't understand how casinos really work, full refund.",
      days: 30,
    },
    faqs: [
      { question: 'What format is the ebook?', answer: 'PDF. Read on any device — phone, tablet, computer.' },
      { question: 'How many pages?', answer: '98 pages across 8 comprehensive chapters.' },
      { question: 'How is it delivered?', answer: 'Instant. Email with download link within 60 seconds of purchase.' },
      { question: 'What\'s your refund policy?', answer: '30-day money-back guarantee. No questions asked.' },
      { question: 'Is my payment secure?', answer: 'Yes. We use Stripe — the same payment processor used by Amazon and Google.' },
    ],
  },

  seo: {
    title: 'Beat the Casino — 98-Page Guide to Casino Psychology & Advantage Play | $29',
    description:
      '8 chapters on casino psychology, advantage play, and beating the house. Everything casinos don\'t want you to know. Instant PDF download. 30-day guarantee.',
    image: '/images/shop/beat-the-casino-cover.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Beat the Casino',
      description: '98-page guide to casino psychology, advantage play, and beating the house.',
      image: 'https://www.mikki-mase.com/images/shop/beat-the-casino-cover.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 29,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/beat-the-casino',
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.9, reviewCount: 64 },
    },
  },
};

// ============================================
// ULTIMATE MMC BUNDLE
// ============================================

export const ultimateMmcBundle: Product = {
  id: 'ultimate-mmc-bundle',
  slug: 'ultimate-mmc-bundle',
  type: 'bundle',
  fulfillment: 'digital',

  name: 'Ultimate MMC Bundle',
  tagline: 'The Complete Arsenal',
  description:
    'Everything in one package: all 3 cheat sheets + the full 98-page ebook. The complete strategy arsenal for serious players.',
  cover: '/images/shop/ultimate-bundle-cover.jpg',
  gallery: ['/images/shop/ultimate-bundle-cover.jpg'],

  price: 39.99,
  compareAt: 68.99,
  previousPrice: 48.99,
  currency: 'USD',

  stripePriceId: 'price_1TA7EtL6BPyNd2Ghb8ZIRB9E',
  stripeProductId: 'prod_U8O0q73jWT2qzK',

  downloadFile: 'ultimate-mmc-bundle.zip',

  featured: true,
  category: 'bundles',
  relatedProducts: ['mmc-cheatsheet-bundle', 'beat-the-casino'],

  seo: {
    title: 'Ultimate MMC Bundle — All Cheat Sheets + Beat the Casino Ebook | $39.99',
    description:
      'The complete Mikki Mase Casino Community strategy arsenal. All 3 cheat sheets + 98-page ebook. Best value. Instant download. 30-day guarantee.',
    image: '/images/shop/ultimate-bundle-cover.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Ultimate MMC Bundle',
      description: 'All 3 strategy cheat sheets plus the full Beat the Casino ebook.',
      image: 'https://www.mikki-mase.com/images/shop/ultimate-bundle-cover.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 39.99,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/shop',
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: 5.0, reviewCount: 31 },
    },
  },
};

// ============================================
// MASTERCLASS (course product)
// ============================================

export const masterclass: Product = {
  id: 'masterclass',
  slug: 'masterclass',
  type: 'course',
  fulfillment: 'digital',

  name: 'The Mikki Mase Masterclass',
  tagline: 'Beat the Casino. Play Smart. Get Paid.',
  description:
    '10 modules, 30+ lessons, interactive scenarios, quizzes, and bonus cheatsheets + ebook. The complete casino strategy system from the man who won $52M+.',
  cover: '/images/masterclass/og-image.jpg',
  gallery: [],

  price: 97,
  compareAt: 297,
  currency: 'USD',

  // Stripe IDs — update after creating product in Stripe Dashboard
  stripePriceId: import.meta.env.STRIPE_MASTERCLASS_PRICE_ID || 'price_masterclass_placeholder',
  stripeProductId: import.meta.env.STRIPE_MASTERCLASS_PRODUCT_ID || 'prod_masterclass_placeholder',

  featured: true,
  category: 'courses',

  seo: {
    title: 'The Mikki Mase Masterclass | Beat the Casino. Play Smart. Get Paid. | $97',
    description:
      '10 modules, 30+ lessons, interactive scenarios, quizzes. The complete casino strategy system from the man who won $52M+ and got banned from 100+ casinos.',
    image: '/images/masterclass/og-image.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'The Mikki Mase Masterclass',
      description: '10-module casino strategy masterclass with interactive scenarios and quizzes.',
      image: 'https://www.mikki-mase.com/images/masterclass/og-image.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 97,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/masterclass',
      },
    },
  },
};

// ============================================
// PRODUCT KEY → STRIPE PRICE MAPPING
// Used by checkout to derive price server-side
// ============================================

export const productKeyToPriceId: Record<string, string> = {
  masterclass: masterclass.stripePriceId,
};

// ============================================
// PRODUCT REGISTRY
// ============================================

export const products: Record<string, Product> = {
  'mmc-cheatsheet-bundle': mmcCheatsheetBundle,
  'beat-the-casino': beatTheCasino,
  'ultimate-mmc-bundle': ultimateMmcBundle,
  masterclass,
};

// ============================================
// HELPERS
// ============================================

export function getProductBySlug(slug: string): Product | undefined {
  return products[slug];
}

export function getProductById(id: string): Product | undefined {
  return Object.values(products).find((p) => p.id === id);
}

export const getProduct = getProductById;

export function getFeaturedProducts(): Product[] {
  return Object.values(products).filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return Object.values(products).filter((p) => p.category === category);
}

export function getAllProducts(): Product[] {
  return Object.values(products);
}
