/**
 * Product Registry
 * All products available in the mikki-mase.com shop
 *
 * Products marked deprecated=true are legacy (pre-funnel pivot, April 2026).
 * Their Stripe IDs remain active so existing customers keep access.
 */

import type { Product } from './types';

// ============================================
// DEPRECATED PRODUCTS (legacy — kept for existing customers)
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

  featured: false,
  category: 'bundles',
  relatedProducts: ['beat-the-casino', 'ultimate-mmc-bundle'],
  deprecated: true,

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
      { id: 't1', name: 'Alex M.', location: 'Las Vegas', rating: 5, text: 'Printed the baccarat sheet and laminated it. Use it every Vegas trip. Saved me at least $2K in bad bets.', verified: true },
      { id: 't2', name: 'Chris P.', location: 'Atlantic City', rating: 5, text: 'The roulette 007 bet alone paid for the entire bundle on my first session.', verified: true },
      { id: 't3', name: 'Jordan T.', location: 'Miami', rating: 5, text: 'Finally a reference card that makes sense and fits in my wallet.', verified: true },
    ],
    guarantee: {
      title: "The 'Better Player' Guarantee",
      description: "Use these cheat sheets for 30 full days. If you're not making smarter bets and feeling more confident at the table, email us. Full refund.",
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
    description: 'The exact strategy cards used by the Mikki Mase Casino Community. Baccarat, Poker, and Roulette cheat sheets. Instant PDF download. 30-day guarantee.',
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

export const beatTheCasino: Product = {
  id: 'beat-the-casino',
  slug: 'beat-the-casino',
  type: 'ebook',
  fulfillment: 'digital',

  name: 'Beat the Casino',
  tagline: 'The Complete Guide',
  description: '98 pages. 8 chapters. Everything casinos don\'t want you to know about casino psychology, advantage play, and beating the house.',
  cover: '/images/shop/beat-the-casino-cover.jpg',
  gallery: ['/images/shop/beat-the-casino-cover.jpg'],

  price: 29,
  compareAt: 67,
  currency: 'USD',

  stripePriceId: 'price_1TA7EsL6BPyNd2GhztnMMASX',
  stripeProductId: 'prod_U8O0U2UkWPFp78',

  downloadFile: 'beat-the-casino.pdf',

  featured: false,
  category: 'ebooks',
  relatedProducts: ['mmc-cheatsheet-bundle', 'ultimate-mmc-bundle'],
  deprecated: true,

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
      { id: 't1', name: 'David L.', location: 'Chicago', rating: 5, text: "15 years of casino visits. This book showed me how much I've wasted on their 'rewards' programs.", verified: true },
      { id: 't2', name: 'Ryan K.', location: 'Las Vegas', rating: 5, text: 'Chapter 4 on advantage play changed how I approach every table. Worth 100x.', verified: true },
      { id: 't3', name: 'Marcus W.', location: 'New York', rating: 5, text: 'Bought for the strategy, stayed for the psychology. Casino design chapter blew my mind.', verified: true },
    ],
    guarantee: {
      title: "The 'Casino Clarity' Guarantee",
      description: "Read all 8 chapters. If you don't understand how casinos really work, full refund.",
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
    description: '8 chapters on casino psychology, advantage play, and beating the house. Everything casinos don\'t want you to know. Instant PDF download. 30-day guarantee.',
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

export const ultimateMmcBundle: Product = {
  id: 'ultimate-mmc-bundle',
  slug: 'ultimate-mmc-bundle',
  type: 'bundle',
  fulfillment: 'digital',

  name: 'Ultimate MMC Bundle',
  tagline: 'The Complete Arsenal',
  description: 'Everything in one package: all 3 cheat sheets + the full 98-page ebook. The complete strategy arsenal for serious players.',
  cover: '/images/shop/ultimate-bundle-cover.jpg',
  gallery: ['/images/shop/ultimate-bundle-cover.jpg'],

  price: 39.99,
  compareAt: 68.99,
  previousPrice: 48.99,
  currency: 'USD',

  stripePriceId: 'price_1TA7EtL6BPyNd2Ghb8ZIRB9E',
  stripeProductId: 'prod_U8O0q73jWT2qzK',

  downloadFile: 'ultimate-mmc-bundle.zip',

  featured: false,
  category: 'bundles',
  relatedProducts: ['mmc-cheatsheet-bundle', 'beat-the-casino'],
  deprecated: true,

  seo: {
    title: 'Ultimate MMC Bundle — All Cheat Sheets + Beat the Casino Ebook | $39.99',
    description: 'The complete Mikki Mase Casino Community strategy arsenal. All 3 cheat sheets + 98-page ebook. Best value. Instant download. 30-day guarantee.',
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

export const masterclass: Product = {
  id: 'masterclass',
  slug: 'masterclass',
  type: 'course',
  fulfillment: 'digital',

  name: 'The Mikki Mase Masterclass',
  tagline: 'Beat the Casino. Play Smart. Get Paid.',
  description: '10 modules, 30+ lessons, interactive scenarios, quizzes, and bonus cheatsheets + ebook. The complete casino strategy system from the man who won $32M+.',
  cover: '/images/masterclass/og-image.jpg',
  gallery: [],

  price: 67,
  compareAt: 197,
  currency: 'USD',
  billingInterval: 'one-time',

  stripePriceId: import.meta.env.STRIPE_MASTERCLASS_PRICE_ID || 'price_masterclass_placeholder',
  stripeProductId: import.meta.env.STRIPE_MASTERCLASS_PRODUCT_ID || 'prod_masterclass_placeholder',

  featured: false,
  category: 'courses',
  deprecated: true,

  seo: {
    title: 'The Mikki Mase Masterclass | Beat the Casino. Play Smart. Get Paid.',
    description: '10 modules, 30+ lessons, interactive scenarios, quizzes. The complete casino strategy system from the man who won $32M+ and got banned from 150+ casinos.',
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
        price: 67,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/masterclass',
      },
    },
  },
};

export const innerCircleMonthly: Product = {
  id: 'inner-circle-monthly',
  slug: 'inner-circle-monthly',
  type: 'subscription',
  fulfillment: 'digital',

  name: 'Inner Circle Monthly',
  tagline: 'Masterclass + Community + Monthly Updates',
  description: 'Full masterclass access plus the Inner Circle: daily strategy drops, community feed, new scenarios monthly, and exclusive content.',
  cover: '/images/masterclass/og-image.jpg',
  gallery: [],

  price: 14.99,
  currency: 'USD',
  billingInterval: 'monthly',

  stripePriceId: import.meta.env.STRIPE_INNER_CIRCLE_MONTHLY_PRICE_ID || 'price_ic_monthly_placeholder',
  stripeProductId: import.meta.env.STRIPE_INNER_CIRCLE_PRODUCT_ID || 'prod_ic_placeholder',

  featured: false,
  category: 'subscriptions',
  deprecated: true,

  seo: {
    title: 'Inner Circle Monthly | Mikki Mase',
    description: 'Monthly access to the Mikki Mase Masterclass, Inner Circle community, and exclusive strategy updates.',
    image: '/images/masterclass/og-image.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Inner Circle Monthly',
      description: 'Monthly masterclass and community membership.',
      image: 'https://www.mikki-mase.com/images/masterclass/og-image.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 14.99,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/masterclass',
      },
    },
  },
};

export const innerCircleYearly: Product = {
  id: 'inner-circle-yearly',
  slug: 'inner-circle-yearly',
  type: 'subscription',
  fulfillment: 'digital',

  name: 'Inner Circle Annual',
  tagline: 'Best Value — Save 44%',
  description: 'Full masterclass access plus the Inner Circle for a full year. Daily strategy drops, community, new scenarios, and exclusive content. Save 44% vs monthly.',
  cover: '/images/masterclass/og-image.jpg',
  gallery: [],

  price: 99.99,
  compareAt: 179.88,
  currency: 'USD',
  billingInterval: 'yearly',
  monthlyEquivalent: 8.33,

  stripePriceId: import.meta.env.STRIPE_INNER_CIRCLE_YEARLY_PRICE_ID || 'price_ic_yearly_placeholder',
  stripeProductId: import.meta.env.STRIPE_INNER_CIRCLE_PRODUCT_ID || 'prod_ic_placeholder',

  featured: false,
  category: 'subscriptions',
  deprecated: true,

  seo: {
    title: 'Inner Circle Annual | Mikki Mase — Best Value',
    description: 'Annual access to the Mikki Mase Masterclass, Inner Circle community, and exclusive strategy updates. Save 44%.',
    image: '/images/masterclass/og-image.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Inner Circle Annual',
      description: 'Annual masterclass and community membership.',
      image: 'https://www.mikki-mase.com/images/masterclass/og-image.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 99.99,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/masterclass',
      },
    },
  },
};

export const lifetimeVip: Product = {
  id: 'lifetime-vip',
  slug: 'lifetime-vip',
  type: 'lifetime',
  fulfillment: 'digital',

  name: 'Lifetime VIP',
  tagline: 'Everything. Forever.',
  description: 'Full masterclass + Inner Circle forever. Founding Member badge, priority support, all future content included. Limited to 500 members.',
  cover: '/images/masterclass/og-image.jpg',
  gallery: [],

  price: 249,
  compareAt: 497,
  currency: 'USD',
  billingInterval: 'lifetime',

  stripePriceId: import.meta.env.STRIPE_LIFETIME_VIP_PRICE_ID || 'price_lifetime_placeholder',
  stripeProductId: import.meta.env.STRIPE_LIFETIME_VIP_PRODUCT_ID || 'prod_lifetime_placeholder',

  featured: false,
  category: 'lifetime',
  deprecated: true,

  seo: {
    title: 'Lifetime VIP | Mikki Mase — Everything Forever',
    description: 'Lifetime access to the Mikki Mase Masterclass, Inner Circle, all future content, and Founding Member status.',
    image: '/images/masterclass/og-image.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Lifetime VIP',
      description: 'Lifetime masterclass and community access with Founding Member status.',
      image: 'https://www.mikki-mase.com/images/masterclass/og-image.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 249,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/masterclass',
      },
    },
  },
};

// ============================================
// NEW FUNNEL PRODUCTS (April 2026)
// ============================================

// --- 1. SESSION PLAYBOOK — $27 front-end quickstart ---

export const sessionPlaybook: Product = {
  id: 'session-playbook',
  slug: 'session-playbook',
  type: 'course',
  fulfillment: 'digital',

  name: 'The Mikki Mase Masterclass',
  tagline: 'Casino Strategy Course',
  description:
    'Bankroll discipline, game selection, and risk management. The quickstart framework behind Mikki Mase\'s approach to every casino session.',
  cover: '/images/shop/session-playbook-cover.jpg',
  gallery: ['/images/shop/session-playbook-cover.jpg'],

  price: 27,
  compareAt: 97,
  currency: 'USD',
  billingInterval: 'one-time',

  stripePriceId: import.meta.env.STRIPE_PLAYBOOK_PRICE_ID || 'price_playbook_placeholder',
  stripeProductId: import.meta.env.STRIPE_PLAYBOOK_PRODUCT_ID || 'prod_playbook_placeholder',

  featured: true,
  category: 'quickstart',
  relatedProducts: ['session-toolkit', 'full-masterclass'],

  salesPage: {
    headline: "The Casino Decision Framework Behind Mikki Mase's Approach",
    subheadline: 'Bankroll discipline, game selection, and risk management — yours for $27',
    painPoints: [
      'You walk into the casino without a plan and leave with empty pockets',
      'You chase losses because you have no pre-set session limits',
      'You pick games based on atmosphere instead of edge and variance',
      'You know you need discipline but have no system to enforce it',
    ],
    chapters: [
      { number: 1, title: 'Session Planning', description: 'How to set bankroll limits, session duration, and win/loss stops before you walk through the door.' },
      { number: 2, title: 'Game Selection Framework', description: 'Which games to play, which to avoid, and how to evaluate edge and variance for your bankroll size.' },
      { number: 3, title: 'Risk Management Rules', description: 'The exact decision rules that keep you in control — when to press, when to walk, and when to stop.' },
      { number: 4, title: 'Pre-Session Checklist', description: 'A printable checklist and decision tree to run through before every casino visit.' },
    ],
    bonuses: [],
    testimonials: [],
    guarantee: {
      title: '7-Day Money-Back Guarantee',
      description:
        'Go through the entire playbook. If you don\'t feel more prepared and disciplined for your next casino session, email us within 7 days for a full refund.',
      days: 7,
    },
    faqs: [
      { question: 'Is this a subscription?', answer: 'No. One-time payment of $27. You get lifetime access, no recurring charges.' },
      { question: 'Will this guarantee I win at the casino?', answer: 'No. This is educational content about bankroll management and decision-making. No strategy can guarantee wins — anyone who says otherwise is lying. Gambling involves risk.' },
      { question: 'What format is it?', answer: 'Digital download (PDF + printable checklists). Access instantly after purchase on any device.' },
      { question: 'How is this different from the free content?', answer: 'The free content covers concepts. The Playbook is a structured, actionable system — decision trees, checklists, and frameworks you use at the table.' },
      { question: 'What\'s the refund policy?', answer: '7-day money-back guarantee. If it\'s not for you, email us and we\'ll refund you. No questions asked.' },
    ],
  },

  seo: {
    title: 'Session Playbook — The Casino Decision Framework | $27',
    description: 'Bankroll discipline, game selection, and risk management. The quickstart framework behind Mikki Mase\'s approach. Instant download. 7-day guarantee.',
    image: '/images/shop/session-playbook-cover.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Session Playbook',
      description: 'Casino decision framework covering bankroll discipline, game selection, and risk management.',
      image: 'https://www.mikki-mase.com/images/shop/session-playbook-cover.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 27,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/checkout/playbook',
      },
    },
  },
};

// --- 2. SESSION TOOLKIT — $9 order bump ---

export const sessionToolkit: Product = {
  id: 'session-toolkit',
  slug: 'session-toolkit',
  type: 'bundle',
  fulfillment: 'digital',

  name: 'Session Toolkit',
  tagline: 'Templates & Calculators',
  description:
    'Bankroll calculator, session planner, and printable decision trees. The companion toolkit to the Session Playbook.',
  cover: '/images/shop/session-toolkit-cover.jpg',
  gallery: ['/images/shop/session-toolkit-cover.jpg'],

  price: 9,
  compareAt: 29,
  currency: 'USD',
  billingInterval: 'one-time',

  stripePriceId: import.meta.env.STRIPE_TOOLKIT_PRICE_ID || 'price_toolkit_placeholder',
  stripeProductId: import.meta.env.STRIPE_TOOLKIT_PRODUCT_ID || 'prod_toolkit_placeholder',

  downloadFile: 'session-toolkit.zip',

  deprecated: true,

  featured: false,
  category: 'bundles',
  relatedProducts: ['session-playbook'],

  seo: {
    title: 'Session Toolkit — Bankroll Calculator & Decision Trees | $9',
    description: 'Bankroll calculator, session planner, and printable decision trees. Companion toolkit to the Session Playbook.',
    image: '/images/shop/session-toolkit-cover.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Session Toolkit',
      description: 'Bankroll calculator, session planner, and printable decision trees.',
      image: 'https://www.mikki-mase.com/images/shop/session-toolkit-cover.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 9,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/checkout/playbook',
      },
    },
  },
};

// --- 3. FULL MASTERCLASS — $79 OTO upsell ---

export const fullMasterclass: Product = {
  id: 'full-masterclass',
  slug: 'full-masterclass',
  type: 'course',
  fulfillment: 'digital',

  name: 'The Full Masterclass',
  tagline: 'The Complete Casino Strategy System',
  description:
    '10 modules, 30+ in-depth lessons, interactive scenarios, quizzes, and the complete Beat the Casino ebook. Everything you need to approach the casino like a professional.',
  cover: '/images/masterclass/og-image.jpg',
  gallery: [],

  price: 79,
  compareAt: 149,
  currency: 'USD',
  billingInterval: 'one-time',

  stripePriceId: import.meta.env.STRIPE_FULL_MASTERCLASS_PRICE_ID || 'price_masterclass_placeholder',
  stripeProductId: import.meta.env.STRIPE_FULL_MASTERCLASS_PRODUCT_ID || 'prod_masterclass_placeholder',

  deprecated: true,

  featured: true,
  category: 'courses',
  relatedProducts: ['session-playbook', 'inner-circle-monthly-v2'],

  salesPage: {
    headline: 'The Complete Casino Strategy System',
    subheadline: '10 modules. 30+ lessons. Interactive scenarios and quizzes. Go from Session Playbook to full mastery.',
    painPoints: [
      'The Playbook gave you the framework — now you want the deep strategy',
      'You want game-specific breakdowns, not just general principles',
      'You learn best through interactive scenarios, not just reading',
      'You want the same education that took Mikki years to develop',
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
      { number: 9, title: 'Advanced Game Strategies', description: 'Deep dives into Baccarat, Blackjack, Poker, and Roulette with game-specific frameworks.' },
      { number: 10, title: 'Putting It All Together', description: 'Interactive scenarios, quizzes, and your personalized strategy plan.' },
    ],
    bonuses: [
      { id: 'b1', name: 'Beat the Casino Ebook (98 pages)', description: 'The full 8-chapter ebook covering casino psychology, advantage play, and beating the house.', value: 29 },
      { id: 'b2', name: 'MMC Cheatsheet Bundle', description: 'Baccarat, Poker, and Roulette strategy cheat sheets. Print-friendly format.', value: 57 },
    ],
    testimonials: [],
    guarantee: {
      title: '7-Day Money-Back Guarantee',
      description: 'Go through the first 3 modules. If the Masterclass isn\'t for you, email us within 7 days for a full refund.',
      days: 7,
    },
    faqs: [
      { question: 'Do I need the Session Playbook first?', answer: 'No, but it helps. The Masterclass includes everything in the Playbook plus much more depth.' },
      { question: 'Is this a subscription?', answer: 'No. One-time payment of $79. Lifetime access, no recurring charges.' },
      { question: 'Will this guarantee I win?', answer: 'No. This is educational content. Gambling involves risk. We teach strategy and discipline, not magic.' },
      { question: 'How long to complete?', answer: 'Most students finish in 2-3 weeks going at their own pace. You have lifetime access.' },
      { question: 'What\'s the refund policy?', answer: '7-day money-back guarantee. No questions asked.' },
    ],
  },

  seo: {
    title: 'The Full Masterclass — 10-Module Casino Strategy System | $79',
    description: '10 modules, 30+ lessons, interactive scenarios, quizzes. The complete casino strategy system. Instant access. 7-day guarantee.',
    image: '/images/masterclass/og-image.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'The Full Masterclass',
      description: '10-module casino strategy masterclass with interactive scenarios and quizzes.',
      image: 'https://www.mikki-mase.com/images/masterclass/og-image.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 79,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/masterclass',
      },
    },
  },
};

// --- 4. INNER CIRCLE MONTHLY V2 — $29/mo backend ---

export const innerCircleMonthlyV2: Product = {
  id: 'inner-circle-monthly-v2',
  slug: 'inner-circle-monthly-v2',
  type: 'subscription',
  fulfillment: 'digital',

  name: 'Inner Circle Monthly',
  tagline: 'Live Strategy + Community',
  description:
    'Monthly membership: live strategy sessions, community feed, AI casino advisor, and all Masterclass content. Cancel anytime.',
  cover: '/images/masterclass/og-image.jpg',
  gallery: [],

  price: 29,
  currency: 'USD',
  billingInterval: 'monthly',

  stripePriceId: import.meta.env.STRIPE_INNER_CIRCLE_V2_MONTHLY_PRICE_ID || 'price_ic_v2_monthly_placeholder',
  stripeProductId: import.meta.env.STRIPE_INNER_CIRCLE_V2_PRODUCT_ID || 'prod_ic_v2_placeholder',

  featured: false,
  category: 'subscriptions',
  relatedProducts: ['inner-circle-annual-v2', 'full-masterclass'],

  seo: {
    title: 'Inner Circle Monthly | Mikki Mase — $29/mo',
    description: 'Monthly Inner Circle membership: live strategy, community, AI advisor, and full Masterclass access. Cancel anytime.',
    image: '/images/masterclass/og-image.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Inner Circle Monthly',
      description: 'Monthly Inner Circle membership with live strategy and community access.',
      image: 'https://www.mikki-mase.com/images/masterclass/og-image.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 29,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/inner-circle',
      },
    },
  },
};

// --- 5. INNER CIRCLE ANNUAL V2 — $249/yr backend ---

export const innerCircleAnnualV2: Product = {
  id: 'inner-circle-annual-v2',
  slug: 'inner-circle-annual-v2',
  type: 'subscription',
  fulfillment: 'digital',

  name: 'Inner Circle Annual',
  tagline: 'Best Value — Save 28%',
  description:
    'Annual membership: everything in Monthly plus priority support and all future content. Save 28% vs monthly billing.',
  cover: '/images/masterclass/og-image.jpg',
  gallery: [],

  price: 249,
  compareAt: 348,
  currency: 'USD',
  billingInterval: 'yearly',
  monthlyEquivalent: 20.75,

  stripePriceId: import.meta.env.STRIPE_INNER_CIRCLE_V2_YEARLY_PRICE_ID || 'price_ic_v2_yearly_placeholder',
  stripeProductId: import.meta.env.STRIPE_INNER_CIRCLE_V2_PRODUCT_ID || 'prod_ic_v2_placeholder',

  featured: false,
  category: 'subscriptions',
  relatedProducts: ['inner-circle-monthly-v2', 'full-masterclass'],

  seo: {
    title: 'Inner Circle Annual | Mikki Mase — $249/yr (Save 28%)',
    description: 'Annual Inner Circle membership. Live strategy, community, AI advisor, full Masterclass, priority support. Save 28%.',
    image: '/images/masterclass/og-image.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Inner Circle Annual',
      description: 'Annual Inner Circle membership with priority support.',
      image: 'https://www.mikki-mase.com/images/masterclass/og-image.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 249,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/inner-circle',
      },
    },
  },
};

// ============================================
// PRODUCT KEY → STRIPE PRICE MAPPING
// Used by checkout to derive price server-side
// ============================================

export const productKeyToPriceId: Record<string, string> = {
  // Legacy (deprecated)
  masterclass: masterclass.stripePriceId,
  'inner-circle-monthly': innerCircleMonthly.stripePriceId,
  'inner-circle-yearly': innerCircleYearly.stripePriceId,
  'lifetime-vip': lifetimeVip.stripePriceId,
  // New funnel
  'session-playbook': sessionPlaybook.stripePriceId,
  'session-toolkit': sessionToolkit.stripePriceId,
  'full-masterclass': fullMasterclass.stripePriceId,
  'inner-circle-monthly-v2': innerCircleMonthlyV2.stripePriceId,
  'inner-circle-annual-v2': innerCircleAnnualV2.stripePriceId,
};

// ============================================
// PRICING TIERS (single front-end offer)
// ============================================

export interface ValueStackItem {
  name: string;
  value: number;
  isFree?: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: number;
  compareAt?: number;
  billingLabel: string;
  monthlyEquivalent?: number;
  features: string[];
  valueStack: ValueStackItem[];
  totalValue: number;
  highlighted: boolean;
  badge?: string;
  ctaText: string;
  ctaHref: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'session-playbook',
    name: 'The Masterclass',
    tagline: 'Everything You Need',
    price: 27,
    billingLabel: 'one-time',
    features: [
      'Lifetime access',
      '7-day money-back guarantee',
    ],
    valueStack: [
      { name: '10-Module Casino Strategy Course', value: 197 },
      { name: 'Cheatsheet Bundle (Baccarat, Poker, Roulette)', value: 57 },
      { name: 'Beat the Casino Ebook (98 pages)', value: 67 },
      { name: 'Interactive Scenarios & Quizzes', value: 29 },
    ],
    totalValue: 350,
    highlighted: true,
    ctaText: 'Get the Masterclass — $27',
    ctaHref: '/checkout/playbook',
  },
];

// ============================================
// PRODUCT REGISTRY
// ============================================

export const products: Record<string, Product> = {
  // Legacy (deprecated — kept for existing customer access)
  'mmc-cheatsheet-bundle': mmcCheatsheetBundle,
  'beat-the-casino': beatTheCasino,
  'ultimate-mmc-bundle': ultimateMmcBundle,
  masterclass,
  'inner-circle-monthly': innerCircleMonthly,
  'inner-circle-yearly': innerCircleYearly,
  'lifetime-vip': lifetimeVip,
  // New funnel
  'session-playbook': sessionPlaybook,
  'session-toolkit': sessionToolkit,
  'full-masterclass': fullMasterclass,
  'inner-circle-monthly-v2': innerCircleMonthlyV2,
  'inner-circle-annual-v2': innerCircleAnnualV2,
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
  return Object.values(products).filter((p) => p.featured && !p.deprecated);
}

export function getProductsByCategory(category: string): Product[] {
  return Object.values(products).filter((p) => p.category === category && !p.deprecated);
}

export function getAllProducts(): Product[] {
  return Object.values(products);
}

export function getActiveProducts(): Product[] {
  return Object.values(products).filter((p) => !p.deprecated);
}

export function getDeprecatedProducts(): Product[] {
  return Object.values(products).filter((p) => p.deprecated);
}
