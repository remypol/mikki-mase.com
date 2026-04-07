/**
 * PricingSection — 3-tier pricing with Hormozi Value Stack
 * Shows each item with dollar value, FREE bonuses with strikethrough,
 * total perceived value vs actual price.
 */
import { motion } from 'framer-motion';
import { EASE_SMOOTH, DISTANCE } from './tokens';
import { pricingTiers } from '../../config/shop/products';
import type { ValueStackItem } from '../../config/shop/products';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: DISTANCE.pricing, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_SMOOTH },
  },
};

function CheckIcon({ gold }: { gold?: boolean }) {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: gold ? '#CFB53B' : '#22c55e' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ValueItem({ item }: { item: ValueStackItem }) {
  return (
    <li className="flex items-start justify-between gap-2">
      <div className="flex items-start gap-2 flex-1 min-w-0">
        <CheckIcon gold={item.isFree} />
        <span className="text-sm text-white">{item.name}</span>
      </div>
      <span className="text-xs flex-shrink-0 mt-0.5 tabular-nums" style={{ minWidth: '52px', textAlign: 'right' }}>
        {item.isFree ? (
          <>
            <span style={{ color: '#4A4A4A', textDecoration: 'line-through' }}>${item.value}</span>
            {' '}
            <span style={{ color: '#22c55e', fontWeight: 700 }}>FREE</span>
          </>
        ) : item.value > 0 ? (
          <span style={{ color: '#6B6B6B' }}>${item.value} value</span>
        ) : (
          <span style={{ color: '#CFB53B' }}>&#x1F451;</span>
        )}
      </span>
    </li>
  );
}

export default function PricingSection() {
  return (
    <section
      className="py-16 md:py-24"
      id="pricing"
      style={{ background: '#0A0A0A', borderTop: '1px solid #1A1A1A' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#CFB53B' }}>
            Choose Your Level
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-3">
            One Bad Session Costs More Than Any of These
          </h2>
          <p className="text-sm mt-3 mx-auto" style={{ color: '#BEBEBE', maxWidth: '48ch' }}>
            The average casino visitor loses $500+ per trip. One framework saves you thousands.
          </p>
        </motion.div>

        {/* Pricing grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 items-start"
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={cardVariants}
              className="relative rounded-2xl p-6 md:p-7 flex flex-col"
              style={{
                background: tier.highlighted ? '#111' : '#0D0D0D',
                border: tier.highlighted
                  ? '1px solid rgba(207, 181, 59, 0.4)'
                  : '1px solid #1A1A1A',
                boxShadow: tier.highlighted
                  ? '0 0 80px rgba(207, 181, 59, 0.1), 0 0 30px rgba(207, 181, 59, 0.05)'
                  : 'none',
              }}
            >
              {/* Badge */}
              {tier.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                  style={{
                    background: tier.badge === 'MOST POPULAR' ? '#CFB53B' : '#1A1A1A',
                    color: tier.badge === 'MOST POPULAR' ? '#000' : '#CFB53B',
                    border: tier.badge === 'LIMITED' ? '1px solid rgba(207, 181, 59, 0.3)' : 'none',
                  }}
                >
                  {tier.badge}
                </div>
              )}

              {/* Tier name */}
              <div className="mb-4">
                <h3 className="text-lg font-black text-white">{tier.name}</h3>
                <p className="text-xs mt-1" style={{ color: '#9A9A9A' }}>{tier.tagline}</p>
              </div>

              {/* Price */}
              <div className="mb-5">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-black text-white">
                    ${tier.price % 1 === 0 ? tier.price : tier.price.toFixed(2)}
                  </span>
                  {tier.compareAt && (
                    <span className="text-base line-through" style={{ color: '#4A4A4A' }}>
                      ${tier.compareAt % 1 === 0 ? tier.compareAt : tier.compareAt.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-xs mt-1" style={{ color: '#6B6B6B' }}>
                  {tier.billingLabel === 'one-time'
                    ? 'One-time payment · Lifetime access'
                    : tier.monthlyEquivalent
                      ? `$${tier.monthlyEquivalent.toFixed(2)}/mo · Billed annually`
                      : `Billed ${tier.billingLabel.replace('/', '')}`}
                </p>
              </div>

              {/* Value Stack */}
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: '#9A9A9A' }}>
                  What's included
                </p>
                <ul className="space-y-2.5">
                  {tier.valueStack.map((item, i) => (
                    <ValueItem key={i} item={item} />
                  ))}
                </ul>
              </div>

              {/* Total value vs price */}
              <div
                className="rounded-lg px-4 py-3 mb-5 text-center"
                style={{ background: 'rgba(207, 181, 59, 0.06)', border: '1px solid rgba(207, 181, 59, 0.12)' }}
              >
                <p className="text-xs" style={{ color: '#9A9A9A' }}>
                  Total value: <span className="line-through">${tier.totalValue}</span>
                </p>
                <p className="text-sm font-bold text-white mt-0.5">
                  You pay: <span style={{ color: '#CFB53B' }}>${tier.price % 1 === 0 ? tier.price : tier.price.toFixed(2)}</span>
                  {tier.billingLabel !== 'one-time' && <span className="text-xs font-normal" style={{ color: '#6B6B6B' }}>{tier.billingLabel}</span>}
                </p>
              </div>

              {/* Extra features (non-value-stack items) */}
              {tier.features.length > 0 && (
                <ul className="space-y-1.5 mb-5">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckIcon />
                      <span className="text-xs" style={{ color: '#BEBEBE' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA */}
              <a
                href={tier.ctaHref}
                className="w-full inline-flex items-center justify-center font-bold min-h-[48px] rounded-xl px-6 transition-all hover:brightness-110 active:scale-[0.98] mt-auto"
                style={{
                  backgroundColor: tier.highlighted ? '#CFB53B' : 'transparent',
                  color: tier.highlighted ? '#000' : '#CFB53B',
                  border: tier.highlighted ? 'none' : '1px solid rgba(207, 181, 59, 0.3)',
                }}
              >
                {tier.ctaText}
              </a>

              <p className="text-center text-[11px] mt-2.5" style={{ color: '#4A4A4A' }}>
                {tier.id === 'masterclass'
                  ? 'No account needed · 7-day guarantee'
                  : tier.id === 'lifetime-vip'
                    ? 'Never pay again · All future content'
                    : 'Cancel anytime · 7-day guarantee'}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Value reframe */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE_SMOOTH }}
          className="text-center mt-10"
        >
          <p className="text-xs" style={{ color: '#4A4A4A' }}>
            All plans include a 7-day money-back guarantee. Secure payment via Stripe.
          </p>
        </motion.div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_SMOOTH }}
          className="max-w-lg mx-auto mt-12 rounded-2xl p-6 text-center"
          style={{ background: '#0D0D0D', border: '1px solid #1A1A1A' }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg className="w-5 h-5" style={{ color: '#22c55e' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-bold" style={{ color: '#22c55e' }}>7-Day Money-Back Guarantee</span>
          </div>
          <p className="text-xs" style={{ color: '#9A9A9A' }}>
            Go through the masterclass. If it doesn't sharpen your casino discipline and decision-making, email us within 7 days for a full refund. No questions asked.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
