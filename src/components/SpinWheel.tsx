/**
 * SpinWheel — Casino-themed fortune wheel for A/B test variant B
 * Always lands on "30% OFF" ($27 price). Pure CSS animation, no dependencies.
 */

import { useState, useRef, useEffect } from 'react';

interface Props {
  onComplete: () => void;
}

const SEGMENTS = [
  { label: '$10 OFF', color: '#1A1A1A' },
  { label: '$15 OFF', color: '#222222' },
  { label: '$5 OFF',  color: '#1A1A1A' },
  { label: 'RETRY',   color: '#222222' },
  { label: '$12 OFF', color: '#1A1A1A' },
  { label: '$20 OFF', color: '#222222' },  // INDEX 5 — winning segment ($47 - $20 = $27)
  { label: '$8 OFF',  color: '#1A1A1A' },
  { label: '$3 OFF',  color: '#222222' },
];

const WINNING_INDEX = 5; // "30% OFF"
const SEGMENT_ANGLE = 360 / SEGMENTS.length; // 45°

export default function SpinWheel({ onComplete }: Props) {
  const [spinning, setSpinning] = useState(false);
  const [won, setWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const spinTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const confettiTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (spinTimerRef.current) clearTimeout(spinTimerRef.current);
      if (confettiTimerRef.current) clearTimeout(confettiTimerRef.current);
    };
  }, []);

  function spin() {
    if (spinning || won) return;
    setSpinning(true);

    // GA4 tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: 'spin_wheel_started' });
    }

    // Calculate final rotation: land on winning segment
    // Pointer is at top (12 o'clock). Segment 0 starts at right (3 o'clock) in SVG.
    // We need the center of winning segment to be at the top.
    // Segment center = WINNING_INDEX * SEGMENT_ANGLE + SEGMENT_ANGLE/2
    // To land at top: 360 - (center_angle - 90) adjusted for SVG coordinate system
    const segmentCenter = WINNING_INDEX * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    // Offset so pointer (top = 270° in standard math / top of SVG) hits segment center
    const targetAngle = 360 - segmentCenter + 90;
    // Add extra full rotations for dramatic effect (5-7 spins)
    const extraSpins = (5 + Math.random() * 2) * 360;
    const finalRotation = extraSpins + targetAngle;

    const wheel = wheelRef.current;
    if (wheel) {
      wheel.style.transition = 'transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
      wheel.style.transform = `rotate(${finalRotation}deg)`;
    }

    spinTimerRef.current = setTimeout(() => {
      setSpinning(false);
      setWon(true);
      setShowConfetti(true);

      // GA4 tracking
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({ event: 'spin_wheel_completed', discount: '$20' });
      }

      // Hide confetti after 3 seconds
      confettiTimerRef.current = setTimeout(() => setShowConfetti(false), 3000);
    }, 5000);
  }

  if (won) {
    return (
      <div className="text-center py-8 relative">
        {/* Confetti particles */}
        {showConfetti && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: i % 3 === 0 ? '#CFB53B' : i % 3 === 1 ? '#FFD700' : '#FFF',
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  animation: `confetti-fall ${1.5 + Math.random() * 2}s ease-out forwards`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}

        <div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
          style={{ background: 'rgba(207, 181, 59, 0.15)', border: '2px solid #CFB53B' }}
        >
          <svg className="w-10 h-10" style={{ color: '#CFB53B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>

        <h2 className="text-3xl font-black text-white mb-2">YOU SAVED $20!</h2>
        <p className="text-lg mb-1" style={{ color: '#9A9A9A' }}>
          Your exclusive price:
        </p>
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-2xl line-through" style={{ color: '#6B6B6B' }}>$47</span>
          <span className="text-5xl font-black" style={{ color: '#CFB53B' }}>$27</span>
        </div>
        <p className="text-sm mb-6" style={{ color: '#6B6B6B' }}>
          This discount expires when you leave this page
        </p>

        <button
          onClick={onComplete}
          className="inline-flex items-center justify-center font-bold text-black min-h-[56px] rounded-xl px-10 text-lg transition-all hover:brightness-110 active:scale-[0.98]"
          style={{ backgroundColor: '#CFB53B' }}
        >
          Claim Your Discount
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        <style>{`
          @keyframes confetti-fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(600px) rotate(720deg); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="text-center py-6">
      <h2 className="text-2xl font-black text-white mb-2">Spin to Win Your Discount!</h2>
      <p className="text-sm mb-8" style={{ color: '#9A9A9A' }}>
        Every spin wins. Tap the wheel to reveal your exclusive price.
      </p>

      {/* Wheel container */}
      <div className="relative inline-block mx-auto mb-8">
        {/* Pointer triangle (top center) */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '14px solid transparent',
              borderRight: '14px solid transparent',
              borderTop: '24px solid #CFB53B',
            }}
          />
        </div>

        {/* Outer ring glow */}
        <div
          className="rounded-full p-1"
          style={{
            background: 'linear-gradient(135deg, #CFB53B, #8B7A2B, #CFB53B)',
            boxShadow: '0 0 40px rgba(207, 181, 59, 0.3)',
          }}
        >
          {/* Wheel */}
          <div
            ref={wheelRef}
            className="relative rounded-full overflow-hidden cursor-pointer"
            onClick={spin}
            style={{
              width: '300px',
              height: '300px',
              background: '#0A0A0A',
            }}
          >
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {SEGMENTS.map((seg, i) => {
                const startAngle = i * SEGMENT_ANGLE;
                const endAngle = startAngle + SEGMENT_ANGLE;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                const midRad = ((startAngle + SEGMENT_ANGLE / 2) * Math.PI) / 180;

                const x1 = 150 + 150 * Math.cos(startRad);
                const y1 = 150 + 150 * Math.sin(startRad);
                const x2 = 150 + 150 * Math.cos(endRad);
                const y2 = 150 + 150 * Math.sin(endRad);

                // Text position (at 65% radius)
                const textX = 150 + 100 * Math.cos(midRad);
                const textY = 150 + 100 * Math.sin(midRad);
                const textAngle = startAngle + SEGMENT_ANGLE / 2;

                const isWinner = i === WINNING_INDEX;

                return (
                  <g key={i}>
                    <path
                      d={`M150,150 L${x1},${y1} A150,150 0 0,1 ${x2},${y2} Z`}
                      fill={isWinner ? '#1a1507' : seg.color}
                      stroke="#333"
                      strokeWidth="0.5"
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="central"
                      transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                      fill={isWinner ? '#CFB53B' : '#BEBEBE'}
                      fontSize={isWinner ? '13' : '11'}
                      fontWeight={isWinner ? '800' : '600'}
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      {seg.label}
                    </text>
                  </g>
                );
              })}

              {/* Center circle */}
              <circle cx="150" cy="150" r="28" fill="#111" stroke="#CFB53B" strokeWidth="2" />
              <text
                x="150"
                y="150"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#CFB53B"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                SPIN
              </text>
            </svg>
          </div>
        </div>
      </div>

      {!spinning && (
        <button
          onClick={spin}
          className="inline-flex items-center justify-center font-bold text-black min-h-[52px] rounded-xl px-8 text-lg transition-all hover:brightness-110 active:scale-[0.98] animate-pulse"
          style={{ backgroundColor: '#CFB53B' }}
        >
          Tap to Spin!
        </button>
      )}

      {spinning && (
        <p className="text-sm animate-pulse" style={{ color: '#CFB53B' }}>
          Spinning...
        </p>
      )}
    </div>
  );
}
