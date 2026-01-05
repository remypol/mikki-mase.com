/**
 * Shop Type Definitions
 * Scalable e-commerce types for mikki-mase.com
 */

// ============================================
// CORE TYPES
// ============================================

export type ProductType = 'ebook' | 'merch' | 'course' | 'bundle';
export type FulfillmentType = 'digital' | 'physical' | 'hybrid';
export type Currency = 'USD' | 'EUR';

// ============================================
// PRODUCT
// ============================================

export interface Product {
  // Identity
  id: string;
  slug: string;
  type: ProductType;
  fulfillment: FulfillmentType;

  // Display
  name: string;
  tagline: string;
  description: string;
  cover: string;
  gallery?: string[];

  // Pricing
  price: number;
  compareAt?: number;
  previousPrice?: number; // For triple strike-through (original → previous → current)
  currency: Currency;

  // Stripe
  stripePriceId: string;
  stripeProductId: string;

  // Variants (merch)
  variants?: ProductVariant[];

  // Digital fulfillment
  downloadFile?: string;

  // Metadata
  featured: boolean;
  category: string;
  relatedProducts?: string[];

  // Sales page content
  salesPage?: SalesPageContent;

  // SEO
  seo: ProductSEO;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  stripePriceId: string;
  stock?: number;
  attributes: Record<string, string>;
}

// ============================================
// SALES PAGE CONTENT
// ============================================

export interface SalesPageContent {
  headline: string;
  subheadline: string;
  heroVideo?: string;
  painPoints: string[];
  chapters: Chapter[];
  bonuses: Bonus[];
  testimonials: Testimonial[];
  guarantee: Guarantee;
  faqs: FAQ[];
}

export interface Chapter {
  number: number;
  title: string;
  description: string;
  icon?: string;
}

export interface Bonus {
  id: string;
  name: string;
  description: string;
  value: number;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  avatar?: string;
  rating: number;
  text: string;
  verified?: boolean;
}

export interface Guarantee {
  title: string;
  description: string;
  days: number;
  icon?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// ============================================
// SEO
// ============================================

export interface ProductSEO {
  title: string;
  description: string;
  image: string;
  schema: ProductSchema;
}

export interface ProductSchema {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description: string;
  image: string;
  brand: {
    '@type': 'Brand';
    name: string;
  };
  offers: {
    '@type': 'Offer';
    price: number;
    priceCurrency: Currency;
    availability: string;
    url: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
  };
}

// ============================================
// CHECKOUT
// ============================================

export interface CheckoutSession {
  productId: string;
  variantId?: string;
  quantity: number;
  customerEmail?: string;
  metadata?: Record<string, string>;
}

export interface CheckoutResult {
  success: boolean;
  sessionId?: string;
  url?: string;
  error?: string;
}

// ============================================
// DOWNLOAD
// ============================================

export interface DownloadToken {
  token: string;
  productId: string;
  email: string;
  createdAt: number;
  expiresAt: number;
  used: boolean;
}

// ============================================
// ORDER
// ============================================

export interface Order {
  id: string;
  stripeSessionId: string;
  stripePaymentIntentId: string;
  productId: string;
  variantId?: string;
  customerEmail: string;
  amount: number;
  currency: Currency;
  status: OrderStatus;
  fulfillmentStatus: FulfillmentStatus;
  downloadToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type FulfillmentStatus = 'pending' | 'fulfilled' | 'shipped' | 'delivered';
