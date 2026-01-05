/**
 * Product Registry
 * All products available in the mikki-mase.com shop
 */

import type { Product } from './types';

// ============================================
// BEDROOM BOSS EBOOK
// ============================================

export const bedroomBoss: Product = {
  // Identity
  id: 'bedroom-boss',
  slug: 'bedroom-boss',
  type: 'ebook',
  fulfillment: 'digital',

  // Display
  name: 'Bedroom Boss',
  tagline: 'The Mikki Mase Playbook',
  description:
    'Decoded from hundreds of hours analyzing what separates Mikki from every other guy. 11 chapters on seduction, pleasure, and creating obsession.',
  cover: '/images/shop/bedroom-boss-cover.png',
  gallery: [
    '/images/shop/bedroom-boss-cover.png',
  ],

  // Pricing
  price: 29,
  compareAt: 97,
  previousPrice: 47, // For triple strike-through display
  currency: 'USD',

  // Stripe
  stripePriceId: 'price_1SmJPDL6BPyNd2GhFYS5R0fS',
  stripeProductId: 'prod_TjfnsKZiOtc1XF',

  // Digital fulfillment
  downloadFile: 'bedroom-boss-v1.pdf',

  // Metadata
  featured: true,
  category: 'ebooks',
  relatedProducts: [],

  // Sales page content
  salesPage: {
    headline: "She Won't Just Remember You. She'll Obsess Over You.",
    subheadline:
      "The complete playbook decoded from hundreds of hours analyzing what makes Mikki Mase different from every other guy she's ever met.",
    painPoints: [
      "You've read the pickup artist books. They feel manipulative and fake.",
      "You've tried being 'nice.' She friendzoned you.",
      "You've tried being 'alpha.' She saw right through it.",
      "You're tired of guessing what women actually want.",
    ],
    chapters: [
      {
        number: 1,
        title: 'The Mikki Mindset',
        description: 'Why confidence is a skill, not a trait — and how to build it from scratch.',
      },
      {
        number: 2,
        title: 'First Impressions That Stick',
        description: 'The 7-second window and how to own it every single time.',
      },
      {
        number: 3,
        title: 'Conversation Mastery',
        description: "How to talk so she leans in — and actually remembers what you said.",
      },
      {
        number: 4,
        title: 'The Art of Escalation',
        description: 'Reading signals, building tension, and making moves that feel natural.',
      },
      {
        number: 5,
        title: 'Digital Game',
        description: 'Texts, DMs, and dating apps — the new rules for the modern player.',
      },
      {
        number: 6,
        title: 'The Date Blueprint',
        description: "Planning experiences she'll brag about to her friends.",
      },
      {
        number: 7,
        title: 'Physical Presence',
        description: 'Body language, grooming, and style that commands attention.',
      },
      {
        number: 8,
        title: 'Handling Tests',
        description: "Why she's testing you and the only correct responses.",
      },
      {
        number: 9,
        title: 'The Bedroom',
        description: 'Performance, presence, and what actually matters between the sheets.',
      },
      {
        number: 10,
        title: 'Keeping Her Hooked',
        description: 'Long-term game — making her work to keep YOU.',
      },
      {
        number: 11,
        title: 'The Mikki Rules',
        description: 'The non-negotiables that separate players from legends.',
      },
    ],
    bonuses: [
      {
        id: 'bonus-1',
        name: 'The First Text Template Pack',
        description: '15 proven openers that actually get responses. Copy, paste, customize.',
        value: 27,
      },
      {
        id: 'bonus-2',
        name: 'The Red Flag Checklist',
        description: 'Spot the warning signs before you waste your time. Save yourself months.',
        value: 17,
      },
      {
        id: 'bonus-3',
        name: 'Audio Companion',
        description: 'Full audiobook version. Learn while you drive, lift, or grind.',
        value: 47,
      },
    ],
    testimonials: [
      {
        id: 't1',
        name: 'Marcus T.',
        location: 'Miami, FL',
        rating: 5,
        text: "I've spent thousands on dating coaches. This ebook taught me more than all of them combined. The mindset chapter alone changed everything.",
        verified: true,
      },
      {
        id: 't2',
        name: 'Jake R.',
        location: 'Los Angeles, CA',
        rating: 5,
        text: "Finally, something that doesn't feel like manipulation. This is just... how to be a better man. And it works.",
        verified: true,
      },
      {
        id: 't3',
        name: 'Daniel K.',
        location: 'New York, NY',
        rating: 5,
        text: "My girlfriend asked what changed. I just smiled. Chapter 9 is worth 10x the price.",
        verified: true,
      },
    ],
    guarantee: {
      title: '60-Day Money-Back Guarantee',
      description:
        "If you don't see a noticeable difference in how women respond to you within 60 days, email us for a full refund. No questions, no hassle, no hard feelings.",
      days: 60,
    },
    faqs: [
      {
        question: 'Is this written by Mikki Mase?',
        answer:
          "This playbook is decoded from hundreds of hours analyzing Mikki's approach, interviews, and philosophy. It's the system behind his success, made actionable for you.",
      },
      {
        question: 'Is this just pickup artist garbage?',
        answer:
          "No. This isn't manipulation tactics or scripted routines. It's about becoming the kind of man women are genuinely attracted to. Authentic, not artificial.",
      },
      {
        question: 'How is this delivered?',
        answer:
          "Instantly. After purchase, you'll get immediate access to download the PDF. The audiobook bonus is included in the same download.",
      },
      {
        question: 'What if it doesn\'t work for me?',
        answer:
          "60-day money-back guarantee. If you're not seeing results, email us and we'll refund you immediately. We've had less than 1% refund rate.",
      },
      {
        question: 'Is my payment secure?',
        answer:
          'Yes. We use Stripe, the same payment processor used by Amazon and Google. Your card info never touches our servers.',
      },
    ],
  },

  // SEO
  seo: {
    title: 'Bedroom Boss: The Mikki Mase Playbook | $29 Launch Special',
    description:
      "The complete playbook on seduction, confidence, and creating obsession. 11 chapters decoded from the Mikki Mase approach. 60-day guarantee.",
    image: '/images/shop/bedroom-boss-cover.png',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Bedroom Boss: The Mikki Mase Playbook',
      description:
        'Digital ebook on seduction, confidence, and creating obsession. 11 chapters with bonus materials.',
      image: 'https://mikki-mase.com/images/shop/bedroom-boss-cover.png',
      brand: {
        '@type': 'Brand',
        name: 'Mikki Mase',
      },
      offers: {
        '@type': 'Offer',
        price: 29,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://mikki-mase.com/bedroom-boss',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 4.9,
        reviewCount: 127,
      },
    },
  },
};

// ============================================
// PRODUCT REGISTRY
// ============================================

export const products: Record<string, Product> = {
  'bedroom-boss': bedroomBoss,
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

// Alias for getProductById (used by webhook handler)
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
