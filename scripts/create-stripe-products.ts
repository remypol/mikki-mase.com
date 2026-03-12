/**
 * One-time script to create Stripe products and prices
 * Run: npx tsx scripts/create-stripe-products.ts
 */
import Stripe from 'stripe';
import { writeFileSync } from 'fs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const products = [
  {
    name: 'MMC Cheatsheet Bundle',
    description: 'Baccarat, Poker, and Roulette strategy cheat sheets. Print-friendly PDF format.',
    price: 1999, // $19.99 in cents
    slug: 'mmc-cheatsheet-bundle',
  },
  {
    name: 'Beat the Casino Ebook',
    description: '98-page guide to casino psychology, advantage play, and beating the house.',
    price: 2900, // $29.00 in cents
    slug: 'beat-the-casino',
  },
  {
    name: 'Ultimate MMC Bundle',
    description: 'All cheat sheets + Beat the Casino ebook. The complete strategy arsenal.',
    price: 3999, // $39.99 in cents
    slug: 'ultimate-mmc-bundle',
  },
];

async function main() {
  console.log('Creating Stripe products...\n');

  const results: Record<string, { productId: string; priceId: string }> = {};

  for (const product of products) {
    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
      metadata: { slug: product.slug },
    });

    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: product.price,
      currency: 'usd',
    });

    results[product.slug] = {
      productId: stripeProduct.id,
      priceId: stripePrice.id,
    };

    console.log(`${product.name}:`);
    console.log(`  Product ID: ${stripeProduct.id}`);
    console.log(`  Price ID:   ${stripePrice.id}`);
    console.log();
  }

  // Write to .env.local
  const envLines = Object.entries(results)
    .flatMap(([slug, ids]) => [
      `# ${slug}`,
      `STRIPE_PRODUCT_${slug.toUpperCase().replace(/-/g, '_')}=${ids.productId}`,
      `STRIPE_PRICE_${slug.toUpperCase().replace(/-/g, '_')}=${ids.priceId}`,
      '',
    ])
    .join('\n');

  writeFileSync('.env.stripe-products', envLines);
  console.log('Written to .env.stripe-products');
  console.log('\nCopy these IDs into src/config/shop/products.ts');
}

main().catch(console.error);
