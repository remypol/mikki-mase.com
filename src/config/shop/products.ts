/**
 * Product Registry
 * All products available in the mikki-mase.com shop
 *
 * Products marked deprecated=true are legacy (pre-funnel pivot, April 2026).
 * Their Stripe IDs remain active so existing customers keep access.
 */

import type { Product } from './types';

// ============================================
// DEPRECATED PRODUCTS (legacy, kept for existing customers)
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
      { question: 'What format are the cheat sheets?', answer: 'PDF. Works on any device, print them, save to your phone, or keep a copy in your wallet.' },
      { question: 'Are these legal to use at casinos?', answer: "100% legal. Casinos ban advantage players not because it's illegal, but because they don't like losing." },
      { question: 'How are they delivered?', answer: 'Instant. You\'ll get an email with a download link within 60 seconds of purchase.' },
      { question: 'What\'s your refund policy?', answer: '30-day money-back guarantee. No questions asked.' },
      { question: 'Is my payment secure?', answer: 'Yes. We use Stripe, the same payment processor used by Amazon and Google. Your card info never touches our servers.' },
    ],
  },

  seo: {
    title: 'MMC Cheatsheet Bundle, Baccarat, Poker & Roulette Strategy Cards | $19.99',
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
      { number: 4, title: 'Exploiting the System', description: 'Card counting, advantage play, bonus exploitation, the techniques casinos fear most.' },
      { number: 5, title: 'Casino Security', description: 'How surveillance catches players, the evolution of detection technology, and how to stay under the radar.' },
      { number: 6, title: 'Responsible Gambling', description: 'Maintaining control, recognizing problems, and the discipline that separates winners from addicts.' },
      { number: 7, title: 'Future of Gambling', description: 'AI, VR, crypto, and mobile, how technology is reshaping the casino landscape.' },
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
      { question: 'What format is the ebook?', answer: 'PDF. Read on any device, phone, tablet, computer.' },
      { question: 'How many pages?', answer: '98 pages across 8 comprehensive chapters.' },
      { question: 'How is it delivered?', answer: 'Instant. Email with download link within 60 seconds of purchase.' },
      { question: 'What\'s your refund policy?', answer: '30-day money-back guarantee. No questions asked.' },
      { question: 'Is my payment secure?', answer: 'Yes. We use Stripe, the same payment processor used by Amazon and Google.' },
    ],
  },

  seo: {
    title: 'Beat the Casino, 98-Page Guide to Casino Psychology & Advantage Play | $29',
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
    title: 'Ultimate MMC Bundle, All Cheat Sheets + Beat the Casino Ebook | $39.99',
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
  tagline: 'Best Value, Save 44%',
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
    title: 'Inner Circle Annual | Mikki Mase, Best Value',
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
    title: 'Lifetime VIP | Mikki Mase, Everything Forever',
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

// --- 1. SESSION PLAYBOOK, $27 front-end quickstart ---

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
    subheadline: 'Bankroll discipline, game selection, and risk management, yours for $27',
    painPoints: [
      'You walk into the casino without a plan and leave with empty pockets',
      'You chase losses because you have no pre-set session limits',
      'You pick games based on atmosphere instead of edge and variance',
      'You know you need discipline but have no system to enforce it',
    ],
    chapters: [
      { number: 1, title: 'Session Planning', description: 'How to set bankroll limits, session duration, and win/loss stops before you walk through the door.' },
      { number: 2, title: 'Game Selection Framework', description: 'Which games to play, which to avoid, and how to evaluate edge and variance for your bankroll size.' },
      { number: 3, title: 'Risk Management Rules', description: 'The exact decision rules that keep you in control, when to press, when to walk, and when to stop.' },
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
      { question: 'Will this guarantee I win at the casino?', answer: 'No. This is educational content about bankroll management and decision-making. No strategy can guarantee wins, anyone who says otherwise is lying. Gambling involves risk.' },
      { question: 'What format is it?', answer: 'Digital download (PDF + printable checklists). Access instantly after purchase on any device.' },
      { question: 'How is this different from the free content?', answer: 'The free content covers concepts. The Playbook is a structured, actionable system, decision trees, checklists, and frameworks you use at the table.' },
      { question: 'What\'s the refund policy?', answer: '7-day money-back guarantee. If it\'s not for you, email us and we\'ll refund you. No questions asked.' },
    ],
  },

  seo: {
    title: 'Session Playbook, The Casino Decision Framework | $27',
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

// --- 2. SESSION TOOLKIT, $9 order bump ---

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
    title: 'Session Toolkit, Bankroll Calculator & Decision Trees | $9',
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

// --- 3. FULL MASTERCLASS, $79 OTO upsell ---

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
      'The Playbook gave you the framework, now you want the deep strategy',
      'You want game-specific breakdowns, not just general principles',
      'You learn best through interactive scenarios, not just reading',
      'You want the same education that took Mikki years to develop',
    ],
    chapters: [
      { number: 1, title: 'The Casino Environment', description: 'How casino architecture and design are engineered to manipulate your behavior and keep you playing.' },
      { number: 2, title: 'Mind Tricks of Game Design', description: 'Slot psychology, table manipulation, and the invisible systems designed to separate you from your money.' },
      { number: 3, title: 'The Manipulation of Rewards', description: 'How loyalty programs are designed to cost you more than they give. The math behind "free" perks.' },
      { number: 4, title: 'Exploiting the System', description: 'Card counting, advantage play, bonus exploitation, the techniques casinos fear most.' },
      { number: 5, title: 'Casino Security', description: 'How surveillance catches players, the evolution of detection technology, and how to stay under the radar.' },
      { number: 6, title: 'Responsible Gambling', description: 'Maintaining control, recognizing problems, and the discipline that separates winners from addicts.' },
      { number: 7, title: 'Future of Gambling', description: 'AI, VR, crypto, and mobile, how technology is reshaping the casino landscape.' },
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
    title: 'The Full Masterclass, 10-Module Casino Strategy System | $79',
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

// --- 4. INNER CIRCLE MONTHLY V2, $29/mo backend ---

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
    title: 'Inner Circle Monthly | Mikki Mase, $29/mo',
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

// --- 5. INNER CIRCLE ANNUAL V2, $249/yr backend ---

export const innerCircleAnnualV2: Product = {
  id: 'inner-circle-annual-v2',
  slug: 'inner-circle-annual-v2',
  type: 'subscription',
  fulfillment: 'digital',

  name: 'Inner Circle Annual',
  tagline: 'Best Value, Save 28%',
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
    title: 'Inner Circle Annual | Mikki Mase, $249/yr (Save 28%)',
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
// HIGH-ROLLER ALL-PDF FUNNEL (June 2026)
// New self-contained PDF funnel under /funnel/*.
// Every product here is a digital PDF/zip delivered via the existing
// download-token + sendPurchaseConfirmation flow. These are ADDITIVE —
// they do not touch any existing/legacy product, price, or route.
// Stripe price IDs are env-driven with safe placeholders; real IDs live
// in Mikki's Stripe env, so the funnel renders + builds but live charging
// is gated on those keys being present.
// ============================================

// --- FRONT: Beat the Casino (v2), $27 ---

export const bfBeatTheCasino: Product = {
  id: 'bf-beat-the-casino',
  slug: 'bf-beat-the-casino',
  type: 'ebook',
  fulfillment: 'digital',

  name: 'Beat the Casino',
  tagline: 'The High-Roller Edition',
  description:
    'The complete system Mikki Mase used to win over $32M, and get banned from nearly every major casino for it. Casino psychology, win/loss discipline, the 30-45 minute rule, bet sizing, and how the house really works. Not hope. Math.',
  cover: '/images/shop/beat-the-casino-cover.jpg',
  gallery: ['/images/shop/beat-the-casino-cover.jpg'],

  price: 27,
  compareAt: 67,
  currency: 'USD',
  billingInterval: 'one-time',

  stripePriceId: import.meta.env.STRIPE_BF_BTC_PRICE_ID || 'price_bf_btc_placeholder',
  stripeProductId: import.meta.env.STRIPE_BF_BTC_PRODUCT_ID || 'prod_bf_btc_placeholder',

  downloadFile: 'beat-the-casino-v2.pdf',

  featured: false,
  category: 'funnel',
  relatedProducts: ['bf-cheat-sheet-pack', 'bf-advantage-vault'],

  salesPage: {
    headline: "Everything Casinos Don't Want You to Know",
    subheadline: 'The exact system behind $32M in winnings, and a lifetime of bans. Not luck. Not a "system." Discipline and math, pointed at the house instead of your wallet.',
    painPoints: [
      'You always leave the casino with less than you walked in with',
      "You've chased losses trying to \"get back to even\", and lost more",
      'You play whatever game looks exciting instead of what the math favors',
      'You feel like a VIP for comps that cost you far more than they gave back',
    ],
    chapters: [
      { number: 1, title: "The Gambler's Code", description: 'Why Mikki\'s #1 piece of advice is literally "do not gamble", and the disciplined mindset required if you do.' },
      { number: 2, title: 'Why Most Players Lose', description: 'The four emotions that destroy bankrolls, the invisible house-edge tax, and why winners get banned.' },
      { number: 3, title: 'Win/Loss Limits', description: 'Set your stop-win and stop-loss BEFORE you walk in. The single rule that separates winners from everyone else.' },
      { number: 4, title: 'The 30-45 Minute Rule', description: "Mikki's signature strategy: short, aggressive sessions that keep variance on your side and the house edge off your back." },
      { number: 5, title: 'Play Big and Fast', description: 'Why fewer hands at higher bets beats grinding for hours, controlled aggression inside a strict framework.' },
      { number: 6, title: 'Kelly, Variance & Risk of Ruin', description: 'The 40-unit / 400-unit bankroll structure and why Risk of Ruin scales exponentially with bet size.' },
      { number: 7, title: 'How Casinos Manipulate You', description: 'The maze layout, scent engineering, near-miss software, chip psychology, see the strings and the show stops working.' },
      { number: 8, title: 'The Rewards Trap', description: 'How loyalty programs return only 10-30% of your losses, the theoretical-loss formula, and how to flip the comp system.' },
    ],
    bonuses: [],
    testimonials: [
      { id: 't1', name: 'David L.', location: 'Chicago', rating: 5, text: "Fifteen years of casino trips. This is the first thing that ever made me understand how much I was bleeding on 'rewards.'", verified: true },
      { id: 't2', name: 'Ryan K.', location: 'Las Vegas', rating: 5, text: 'The 30-45 minute rule alone changed how I play. In, hit my number, out. No more all-nighters.', verified: true },
      { id: 't3', name: 'Marcus W.', location: 'New York', rating: 5, text: 'Bought it for strategy, stayed for the psychology chapter. You cannot unsee the manipulation once he shows you.', verified: true },
    ],
    guarantee: {
      title: '7-Day Money-Back Guarantee',
      description: "Read the whole thing. If you don't walk away understanding how casinos actually work and how to approach them with discipline, email us within 7 days for a full refund. No questions.",
      days: 7,
    },
    faqs: [
      { question: 'What format is it?', answer: 'A digital PDF. Read it on your phone, tablet, or computer. Delivered to your email within 60 seconds of purchase.' },
      { question: 'Will this guarantee I win at the casino?', answer: 'No. This is educational content about psychology, discipline, and math. No book and no system can guarantee winnings, anyone who promises that is lying. Gambling involves real risk of real loss.' },
      { question: 'Is this for beginners or advanced players?', answer: 'Both. It starts with mindset and fundamentals and builds to bet sizing and comp mechanics. If you visit casinos at all, there is something here for you.' },
      { question: 'How is it delivered?', answer: 'Instantly. You get an email with a secure download link right after checkout.' },
      { question: "What's the refund policy?", answer: '7-day money-back guarantee. If it is not for you, reply to the email and we will refund you.' },
    ],
  },

  seo: {
    title: "Beat the Casino, The High-Roller Edition | $27",
    description: "The complete system Mikki Mase used to win $32M+ before being banned from nearly every major casino. Casino psychology, win/loss discipline, bet sizing. Instant PDF. 7-day guarantee.",
    image: '/images/shop/beat-the-casino-cover.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Beat the Casino, The High-Roller Edition',
      description: 'Casino psychology, advantage-play discipline, bankroll management, and how the house really works.',
      image: 'https://www.mikki-mase.com/images/shop/beat-the-casino-cover.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 27,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/funnel/beat-the-casino',
      },
    },
  },
};

// --- BUMP: The Casino Cheat Sheet Pack, $17 ---

export const bfCheatSheetPack: Product = {
  id: 'bf-cheat-sheet-pack',
  slug: 'bf-cheat-sheet-pack',
  type: 'bundle',
  fulfillment: 'digital',

  name: 'The Casino Cheat Sheet Pack',
  tagline: 'Print. Pocket. Profit.',
  description:
    'Wallet-sized strategy cards for every table you sit at: blackjack basic-strategy grid, baccarat, roulette odds, Pai Gow, plus the pre-session checklist and the host-negotiation crib sheet. Print them, screenshot them, keep them on you.',
  cover: '/images/shop/cheatsheet-bundle-cover.jpg',
  gallery: ['/images/shop/cheatsheet-bundle-cover.jpg'],

  price: 17,
  compareAt: 47,
  currency: 'USD',
  billingInterval: 'one-time',

  stripePriceId: import.meta.env.STRIPE_BF_CHEATPACK_PRICE_ID || 'price_bf_cheatpack_placeholder',
  stripeProductId: import.meta.env.STRIPE_BF_CHEATPACK_PRODUCT_ID || 'prod_bf_cheatpack_placeholder',

  downloadFile: 'the-casino-cheat-sheet-pack.pdf',

  featured: false,
  category: 'funnel',
  relatedProducts: ['bf-beat-the-casino'],

  seo: {
    title: 'The Casino Cheat Sheet Pack, Printable Strategy Cards | $17',
    description: 'Blackjack, baccarat, roulette, and Pai Gow strategy cards plus a pre-session checklist and host-negotiation crib sheet. Print-friendly PDF. Instant download.',
    image: '/images/shop/cheatsheet-bundle-cover.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'The Casino Cheat Sheet Pack',
      description: 'Printable strategy cards for blackjack, baccarat, roulette, and Pai Gow, plus checklists.',
      image: 'https://www.mikki-mase.com/images/shop/cheatsheet-bundle-cover.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 17,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/funnel/checkout',
      },
    },
  },
};

// --- OTO1: The Advantage Player's Vault, $47 ---

export const bfAdvantageVault: Product = {
  id: 'bf-advantage-vault',
  slug: 'bf-advantage-vault',
  type: 'ebook',
  fulfillment: 'digital',

  name: "The Advantage Player's Vault",
  tagline: 'The Plays the Casinos Hate',
  description:
    'The pro-level material that moves real money: how to find and work a casino host, what to say (and what to be strategically creative about), game-specific edges the paytables forgot to fix, loss-rebate math, and how to walk out having paid for nothing.',
  cover: '/images/shop/ultimate-bundle-cover.jpg',
  gallery: ['/images/shop/ultimate-bundle-cover.jpg'],

  price: 47,
  compareAt: 97,
  currency: 'USD',
  billingInterval: 'one-time',

  stripePriceId: import.meta.env.STRIPE_BF_VAULT_PRICE_ID || 'price_bf_vault_placeholder',
  stripeProductId: import.meta.env.STRIPE_BF_VAULT_PRODUCT_ID || 'prod_bf_vault_placeholder',

  downloadFile: 'the-advantage-vault.pdf',

  featured: false,
  category: 'funnel',
  relatedProducts: ['bf-blackjack-bundle', 'bf-beat-the-casino'],

  salesPage: {
    headline: "The Edges the Casinos Would Rather Keep Off the Page",
    subheadline: 'This is the vault. Not the beginner stuff. How you talk to the people who control the comps, how you turn the games nobody understands into income, and how you pay for nothing.',
    painPoints: [
      "You've never been assigned a casino host, and you're leaving free money on the table",
      "You take whatever comp you're handed instead of negotiating a better one",
      'You play the popular games instead of the ones with exploitable paytables',
      'You pay full freight for rooms, meals, and flights a rated player gets comped',
    ],
    chapters: [
      { number: 1, title: 'Casino Negotiation & Hosts', description: 'What a host really is, how to get one assigned, why you want one at every property, and the first-contact script that sets your anchor.' },
      { number: 2, title: 'What to Say (and What to Be Creative About)', description: 'The art of strategic honesty, what to always tell the truth about and where the negotiation actually happens.' },
      { number: 3, title: 'Game-Specific Edges', description: 'The games most players ignore, the paytables the math forgot to fix, and where the real value hides on the floor.' },
      { number: 4, title: 'The Discount & Rebate System', description: 'How loss rebates actually work, how they shift your effective edge, and the math that decides whether an offer is worth it.' },
      { number: 5, title: 'The Comp Machine', description: 'How to make your theoretical loss look high while keeping your real expected loss low, and get comped for everything.' },
    ],
    bonuses: [],
    testimonials: [
      { id: 't1', name: 'Anthony R.', location: 'Atlantic City', rating: 5, text: 'Walked up to the players desk, asked for a host like the book said, and had two competing offers by the next trip.', verified: true },
      { id: 't2', name: 'Sofia M.', location: 'Las Vegas', rating: 5, text: 'The negotiation scripts are worth the price ten times over. I have not paid for a room since.', verified: true },
    ],
    guarantee: {
      title: '7-Day Money-Back Guarantee',
      description: "Go through the Vault. If the host, rebate, and comp playbooks don't change how you approach a casino, email us within 7 days for a full refund.",
      days: 7,
    },
    faqs: [
      { question: 'Is this legal?', answer: 'Yes. Negotiating with a host and choosing favorable games is completely legal. Casinos may ban advantage players, but that is their business decision, not a law.' },
      { question: 'Do I need to be a high roller?', answer: "No. The book is explicit that even a $25 player should have a host. The principles scale up as your action (or perceived action) grows." },
      { question: 'Will this guarantee I win?', answer: 'No. This is educational content. It teaches you how to shrink the house edge and extract value the casino leaves on the table, not a guarantee. Gambling involves risk.' },
      { question: 'What format is it?', answer: 'A digital PDF, delivered to your email instantly after purchase.' },
    ],
  },

  seo: {
    title: "The Advantage Player's Vault, Host, Rebate & Comp Playbook | $47",
    description: "The pro-level edges casinos hate: how to work a host, negotiate comps, exploit game-specific paytables, and use loss rebates. Instant PDF. 7-day guarantee.",
    image: '/images/shop/ultimate-bundle-cover.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: "The Advantage Player's Vault",
      description: 'Host negotiation, loss rebates, comp mechanics, and game-specific casino edges.',
      image: 'https://www.mikki-mase.com/images/shop/ultimate-bundle-cover.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 47,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/funnel/upsell/advantage-vault',
      },
    },
  },
};

// --- DOWNSELL 1: The Advantage Player's Vault (discounted), $27 ---

export const bfAdvantageVaultDs: Product = {
  id: 'bf-advantage-vault-ds',
  slug: 'bf-advantage-vault-ds',
  type: 'ebook',
  fulfillment: 'digital',

  name: "The Advantage Player's Vault",
  tagline: 'Last-Chance Price',
  description:
    "The same pro-level host, rebate, and comp playbook, at a one-time reduced price because you're already in.",
  cover: '/images/shop/ultimate-bundle-cover.jpg',
  gallery: ['/images/shop/ultimate-bundle-cover.jpg'],

  price: 27,
  compareAt: 47,
  currency: 'USD',
  billingInterval: 'one-time',

  stripePriceId: import.meta.env.STRIPE_BF_VAULT_DS_PRICE_ID || 'price_bf_vault_ds_placeholder',
  stripeProductId: import.meta.env.STRIPE_BF_VAULT_DS_PRODUCT_ID || 'prod_bf_vault_ds_placeholder',

  // Same file as the full-price Vault
  downloadFile: 'the-advantage-vault.pdf',

  featured: false,
  category: 'funnel',
  relatedProducts: ['bf-blackjack-bundle'],

  seo: {
    title: "The Advantage Player's Vault, Last-Chance Price | $27",
    description: "Host negotiation, loss rebates, and comp mechanics, the same Vault at a one-time reduced price. Instant PDF download.",
    image: '/images/shop/ultimate-bundle-cover.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: "The Advantage Player's Vault (Discounted)",
      description: 'Host negotiation, loss rebates, and comp mechanics at a reduced price.',
      image: 'https://www.mikki-mase.com/images/shop/ultimate-bundle-cover.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 27,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/funnel/upsell/advantage-vault',
      },
    },
  },
};

// --- OTO2: The Blackjack Bundle, $37 ---

export const bfBlackjackBundle: Product = {
  id: 'bf-blackjack-bundle',
  slug: 'bf-blackjack-bundle',
  type: 'bundle',
  fulfillment: 'digital',

  name: 'The Blackjack Bundle',
  tagline: 'Master the Only Beatable Game',
  description:
    'The complete blackjack package: The Blackjack Edge (table selection, basic strategy, the tools in your hands) plus the interactive bankroll, Risk-of-Ruin, and rebate calculators. Everything you need to find the right table and play it perfectly.',
  cover: '/images/shop/cheatsheet-bundle-cover.jpg',
  gallery: ['/images/shop/cheatsheet-bundle-cover.jpg'],

  price: 37,
  compareAt: 77,
  currency: 'USD',
  billingInterval: 'one-time',

  stripePriceId: import.meta.env.STRIPE_BF_BJ_BUNDLE_PRICE_ID || 'price_bf_bj_bundle_placeholder',
  stripeProductId: import.meta.env.STRIPE_BF_BJ_BUNDLE_PRODUCT_ID || 'prod_bf_bj_bundle_placeholder',

  downloadFile: 'the-blackjack-bundle.zip',

  featured: false,
  category: 'funnel',
  relatedProducts: ['bf-advantage-vault', 'bf-beat-the-casino'],

  salesPage: {
    headline: 'Blackjack Is the Only Game You Can Actually Beat',
    subheadline: "Blackjack is not one game, it's a hundred games wearing the same name. The Blackjack Bundle shows you how to find the right table and play it mathematically perfectly, plus the calculators that size every bet for you.",
    painPoints: [
      "You sit at whatever blackjack table is open without checking the payout",
      "You don't know the difference between a 3:2 and a 6:5 table (it's huge)",
      'You play hands on "feel" instead of mathematically correct basic strategy',
      'You size your bets by mood instead of bankroll math',
    ],
    chapters: [
      { number: 1, title: 'Blackjack Types, Ranked', description: 'Worst to best: why continuous shuffle machines and 6:5 single-deck are traps, and why double-deck 3:2 is the gold standard.' },
      { number: 2, title: 'Basic Strategy, Cold', description: 'The mathematically correct play for every hand, no guessing, no gut feelings, the chart that prints money over time.' },
      { number: 3, title: 'Penetration & Table Selection', description: 'How deep the deal goes, why it matters, and the 10-second checklist before you sit at any table.' },
      { number: 4, title: 'The Calculators', description: 'Interactive bankroll, Risk-of-Ruin, and loss-rebate tools so every bet size and every offer is a math decision, not a feeling.' },
    ],
    bonuses: [
      { id: 'b1', name: 'Bankroll & Risk-of-Ruin Calculator', description: 'Plug in your bankroll and bet to see your real Risk of Ruin and the 40-unit / 400-unit sizing.', value: 19 },
      { id: 'b2', name: 'Loss-Rebate Calculator', description: 'Run any rebate offer to see whether it actually flips your effective edge.', value: 19 },
    ],
    testimonials: [
      { id: 't1', name: 'Chris P.', location: 'Reno', rating: 5, text: 'I had no idea 6:5 vs 3:2 was costing me that much. Now I will not sit at a 6:5 table. Ever.', verified: true },
      { id: 't2', name: 'Jordan T.', location: 'Miami', rating: 5, text: 'The calculators are the part I keep going back to. Finally sizing bets with math instead of vibes.', verified: true },
    ],
    guarantee: {
      title: '7-Day Money-Back Guarantee',
      description: "Use the bundle and the calculators. If you're not finding better tables and sizing smarter, email us within 7 days for a full refund.",
      days: 7,
    },
    faqs: [
      { question: 'What\'s in the bundle?', answer: 'The Blackjack Edge ebook plus the interactive bankroll, Risk-of-Ruin, and rebate calculators, delivered together as a single download.' },
      { question: 'Is card counting in here?', answer: 'The focus is table selection, basic strategy, penetration, and bankroll math, the legal, foundational edges. It is education, not a guarantee, and gambling always involves risk.' },
      { question: 'What format is it?', answer: 'A ZIP file containing the PDF and the calculators, delivered to your email instantly after purchase.' },
      { question: 'Will this guarantee I win?', answer: 'No. No strategy can guarantee winnings. This teaches you to minimize the house edge and make math-based decisions. Gamble responsibly.' },
    ],
  },

  seo: {
    title: 'The Blackjack Bundle, Ebook + Bankroll & Rebate Calculators | $37',
    description: 'The Blackjack Edge plus interactive bankroll, Risk-of-Ruin, and rebate calculators. Find the right table, play it perfectly, size every bet with math. Instant download.',
    image: '/images/shop/cheatsheet-bundle-cover.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'The Blackjack Bundle',
      description: 'The Blackjack Edge ebook plus bankroll, Risk-of-Ruin, and rebate calculators.',
      image: 'https://www.mikki-mase.com/images/shop/cheatsheet-bundle-cover.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 37,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/funnel/upsell/blackjack-bundle',
      },
    },
  },
};

// --- DOWNSELL 2: The Blackjack Edge (ebook only), $19 ---

export const bfBlackjackEdgeDs: Product = {
  id: 'bf-blackjack-edge-ds',
  slug: 'bf-blackjack-edge-ds',
  type: 'ebook',
  fulfillment: 'digital',

  name: 'The Blackjack Edge',
  tagline: 'The Ebook, Solo',
  description:
    'Just the ebook: table selection, basic strategy, penetration, and the tools in your hands. The core of the Blackjack Bundle without the calculators, at a last-chance price.',
  cover: '/images/shop/cheatsheet-bundle-cover.jpg',
  gallery: ['/images/shop/cheatsheet-bundle-cover.jpg'],

  price: 19,
  compareAt: 37,
  currency: 'USD',
  billingInterval: 'one-time',

  stripePriceId: import.meta.env.STRIPE_BF_BJ_EDGE_DS_PRICE_ID || 'price_bf_bj_edge_ds_placeholder',
  stripeProductId: import.meta.env.STRIPE_BF_BJ_EDGE_DS_PRODUCT_ID || 'prod_bf_bj_edge_ds_placeholder',

  downloadFile: 'the-blackjack-edge.pdf',

  featured: false,
  category: 'funnel',
  relatedProducts: ['bf-beat-the-casino'],

  seo: {
    title: 'The Blackjack Edge, Table Selection & Basic Strategy | $19',
    description: 'Table selection, basic strategy, penetration, and bankroll fundamentals. The Blackjack Edge ebook at a last-chance price. Instant PDF download.',
    image: '/images/shop/cheatsheet-bundle-cover.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'The Blackjack Edge',
      description: 'Table selection, basic strategy, penetration, and bankroll fundamentals for blackjack.',
      image: 'https://www.mikki-mase.com/images/shop/cheatsheet-bundle-cover.jpg',
      brand: { '@type': 'Brand', name: 'Mikki Mase' },
      offers: {
        '@type': 'Offer',
        price: 19,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mikki-mase.com/funnel/upsell/blackjack-bundle',
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
  // High-roller all-PDF funnel (June 2026)
  'bf-beat-the-casino': bfBeatTheCasino.stripePriceId,
  'bf-cheat-sheet-pack': bfCheatSheetPack.stripePriceId,
  'bf-advantage-vault': bfAdvantageVault.stripePriceId,
  'bf-advantage-vault-ds': bfAdvantageVaultDs.stripePriceId,
  'bf-blackjack-bundle': bfBlackjackBundle.stripePriceId,
  'bf-blackjack-edge-ds': bfBlackjackEdgeDs.stripePriceId,
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
    ctaText: 'Get the Masterclass, $27',
    ctaHref: '/checkout/playbook',
  },
];

// ============================================
// PRODUCT REGISTRY
// ============================================

export const products: Record<string, Product> = {
  // Legacy (deprecated, kept for existing customer access)
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
  // High-roller all-PDF funnel (June 2026)
  'bf-beat-the-casino': bfBeatTheCasino,
  'bf-cheat-sheet-pack': bfCheatSheetPack,
  'bf-advantage-vault': bfAdvantageVault,
  'bf-advantage-vault-ds': bfAdvantageVaultDs,
  'bf-blackjack-bundle': bfBlackjackBundle,
  'bf-blackjack-edge-ds': bfBlackjackEdgeDs,
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
