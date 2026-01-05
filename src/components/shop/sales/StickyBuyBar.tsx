/**
 * StickyBuyBar Component
 * Mobile-only fixed bottom bar that appears on scroll
 * Hides when pricing card is visible to avoid double CTA
 */

import { useState, useEffect } from 'react';

declare const gtag: Function | undefined;

interface StickyBuyBarProps {
  productId: string;
  productName: string;
  price: number;
  compareAt?: number;
  triggerOffset?: number;
}

export default function StickyBuyBar({
  productId,
  productName,
  price,
  compareAt,
  triggerOffset = 600
}: StickyBuyBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // Find the pricing card section to hide when it's visible
      const pricingCard = document.querySelector('[data-pricing-card]');
      let hiddenByPricing = false;

      if (pricingCard) {
        const rect = pricingCard.getBoundingClientRect();
        // Hide if pricing card is in view (with some buffer)
        hiddenByPricing = rect.top < winHeight - 100 && rect.bottom > 100;
      }

      // Also hide near footer
      const footerBuffer = 300;
      const nearFooter = scrollY > (docHeight - winHeight - footerBuffer);

      // Show after trigger offset, hide when pricing visible or near footer
      const shouldShow = scrollY > triggerOffset && !hiddenByPricing && !nearFooter;

      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerOffset]);

  const handleBuy = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });

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

      window.location.href = url;
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50
        md:hidden
        bg-black/95 backdrop-blur-md border-t border-gray-800
        transform transition-transform duration-300 ease-out
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
      `}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="px-4 py-3">
        {/* Main CTA Button */}
        <button
          onClick={handleBuy}
          disabled={loading}
          className="
            w-full bg-[#A8001E] hover:bg-[#8B0018]
            text-white font-bold text-lg
            py-4 rounded-lg
            transition-all duration-200
            min-h-[56px]
            flex items-center justify-center gap-2
            disabled:opacity-50
            shadow-[0_0_30px_rgba(168,0,30,0.4)]
            animate-pulse-subtle
          "
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <>
              GET INSTANT ACCESS — ${price}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </button>

        {/* Guarantee text */}
        <p className="text-center text-gray-400 text-xs mt-2 flex items-center justify-center gap-1">
          <svg className="w-3 h-3 text-[#CFB53B]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          30-Day Money-Back Guarantee
        </p>
      </div>

      <style>{`
        @keyframes pulse-subtle {
          0%, 100% { box-shadow: 0 0 20px rgba(168,0,30,0.3); }
          50% { box-shadow: 0 0 30px rgba(168,0,30,0.5); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
