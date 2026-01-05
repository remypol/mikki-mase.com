/**
 * BuyButton Component
 * Triggers Stripe Checkout session
 */

import { useState } from 'react';

interface BuyButtonProps {
  productId: string;
  productName?: string;
  variantId?: string;
  price: number;
  label?: string;
  size?: 'default' | 'large';
  fullWidth?: boolean;
  className?: string;
}

export default function BuyButton({
  productId,
  productName = 'Product',
  variantId,
  price,
  label = 'GET INSTANT ACCESS',
  size = 'default',
  fullWidth = false,
  className = ''
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, variantId })
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();

      // Track GA4 ecommerce: begin_checkout
      if (typeof gtag !== 'undefined') {
        gtag('event', 'begin_checkout', {
          currency: 'USD',
          value: price,
          items: [{
            item_id: productId,
            item_name: productName,
            price: price,
            quantity: 1
          }]
        });
      }

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const sizeClasses = {
    default: 'px-8 py-4 text-base',
    large: 'px-10 py-5 text-lg'
  };

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`
          ${sizeClasses[size]}
          ${fullWidth ? 'w-full' : ''}
          bg-[#A8001E] hover:bg-[#8B0018]
          text-white font-semibold
          rounded-lg
          transition-all duration-200
          hover:-translate-y-0.5
          shadow-[0_0_30px_rgba(168,0,30,0.3)]
          hover:shadow-[0_4px_20px_rgba(168,0,30,0.4)]
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          flex items-center justify-center gap-2
          min-h-[44px]
          ${className}
        `}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </>
        ) : (
          <>
            {label} — ${price}
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>

      {error && (
        <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
