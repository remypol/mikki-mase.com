/**
 * BuyButton Component
 * Triggers Stripe Checkout session
 * Enhanced with better mobile sizing, price display, and pulse animation
 */

import { useState } from 'react';

declare const gtag: Function | undefined;

interface BuyButtonProps {
  productId: string;
  productName?: string;
  variantId?: string;
  price: number;
  compareAt?: number;
  label?: string;
  size?: 'default' | 'large';
  fullWidth?: boolean;
  showPriceAbove?: boolean;
  className?: string;
}

export default function BuyButton({
  productId,
  productName = 'Product',
  variantId,
  price,
  compareAt,
  label = 'GET INSTANT ACCESS',
  size = 'default',
  fullWidth = false,
  showPriceAbove = false,
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
      // Use dataLayer directly to ensure event is queued before redirect
      const dataLayer = (window as any).dataLayer || [];
      dataLayer.push({
        event: 'begin_checkout',
        ecommerce: {
          currency: 'USD',
          value: price,
          items: [{
            item_id: productId,
            item_name: productName,
            price: price,
            quantity: 1
          }]
        }
      });

      // Also fire via gtag for compatibility
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
      console.log('[GA4] begin_checkout fired:', productId, price);

      // Small delay to ensure event is sent before navigation
      await new Promise(resolve => setTimeout(resolve, 100));

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const sizeClasses = {
    default: 'px-8 py-4 text-base min-h-[56px]',
    large: 'px-10 py-5 text-lg md:text-xl min-h-[60px] md:min-h-[64px]'
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${showPriceAbove ? 'text-center' : ''}`}>
      {/* Price display above button */}
      {showPriceAbove && (
        <div className="mb-4">
          <div className="flex items-baseline justify-center gap-3">
            {compareAt && (
              <span className="text-gray-500 line-through text-xl">${compareAt}</span>
            )}
            <span className="text-white font-bold text-4xl md:text-5xl">${price}</span>
          </div>
          {compareAt && (
            <p className="text-[#CFB53B] text-sm mt-1">
              Save ${compareAt - price} ({Math.round(((compareAt - price) / compareAt) * 100)}% off)
            </p>
          )}
        </div>
      )}

      <button
        onClick={handleClick}
        disabled={loading}
        className={`
          ${sizeClasses[size]}
          ${fullWidth ? 'w-[90%] md:w-full mx-auto' : ''}
          bg-[#A8001E] hover:bg-[#8B0018]
          text-white font-bold
          rounded-lg
          transition-all duration-200
          hover:-translate-y-0.5
          shadow-[0_0_30px_rgba(168,0,30,0.3)]
          hover:shadow-[0_4px_20px_rgba(168,0,30,0.4)]
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          flex items-center justify-center gap-2
          animate-pulse-glow
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
            {label}
            {!showPriceAbove && (
              <svg className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            )}
          </>
        )}
      </button>

      {error && (
        <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
      )}

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168,0,30,0.3); }
          50% { box-shadow: 0 0 35px rgba(168,0,30,0.5); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
