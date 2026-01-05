/**
 * StickyBuyBar Component
 * Fixed bottom bar that appears on scroll
 */

import { useState, useEffect } from 'react';

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
      const footerBuffer = 200;

      // Show after trigger offset, hide near footer
      const shouldShow = scrollY > triggerOffset &&
                        scrollY < (docHeight - winHeight - footerBuffer);

      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
      window.location.href = url;
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50
        bg-black/95 backdrop-blur-sm border-t border-gray-800
        transform transition-transform duration-300 ease-out
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
        safe-area-pb
      `}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">

          {/* Product info (hidden on small mobile) */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[#CFB53B]">🔥</span>
            <div>
              <p className="text-white font-semibold">{productName}</p>
              <p className="text-gray-500 text-sm hidden md:block">The Mikki Mase Playbook</p>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Price */}
            <div className="flex items-baseline gap-2">
              {compareAt && (
                <span className="text-gray-500 line-through text-sm">${compareAt}</span>
              )}
              <span className="text-white font-bold text-xl">${price}</span>
            </div>

            {/* Button */}
            <button
              onClick={handleBuy}
              disabled={loading}
              className="
                bg-[#A8001E] hover:bg-[#8B0018]
                text-white font-semibold
                px-6 py-3 rounded-lg
                transition-all duration-200
                min-h-[44px] min-w-[140px]
                flex items-center justify-center gap-2
                disabled:opacity-50
                shadow-[0_0_20px_rgba(168,0,30,0.3)]
              "
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <>
                  BUY NOW
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
