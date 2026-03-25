/**
 * WheelCheckout — Spin Wheel + Checkout combo for A/B variant B
 * Shows the wheel first, then calls server to set eligibility cookie,
 * then transitions to the branded checkout at $27.
 */

import { useState } from 'react';
import SpinWheel from './SpinWheel';
import CustomMasterclassCheckout from './CustomMasterclassCheckout';

export default function WheelCheckout() {
  const [wheelComplete, setWheelComplete] = useState(false);

  async function handleWheelComplete() {
    // Tell server wheel was completed — sets httpOnly cookie for $27 eligibility
    try {
      const res = await fetch('/api/checkout/wheel-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        console.warn('Wheel eligibility failed:', res.status);
        // Still proceed — server will fall back to $47
      }
    } catch (err) {
      console.warn('Wheel eligibility request failed:', err);
    }
    setWheelComplete(true);
  }

  if (!wheelComplete) {
    return (
      <div
        className="rounded-2xl p-6 md:p-8"
        style={{ background: '#111', border: '1px solid #2D2D2D' }}
      >
        <SpinWheel onComplete={handleWheelComplete} />
      </div>
    );
  }

  return (
    <div>
      {/* Discount banner */}
      <div
        className="rounded-xl p-3 mb-4 text-center"
        style={{ background: 'rgba(207, 181, 59, 0.1)', border: '1px solid rgba(207, 181, 59, 0.3)' }}
      >
        <span className="text-sm font-bold" style={{ color: '#CFB53B' }}>
          Exclusive discount applied — Your price: $27
        </span>
      </div>
      <CustomMasterclassCheckout />
    </div>
  );
}
