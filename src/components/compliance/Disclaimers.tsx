/**
 * Disclaimers — Reusable disclaimer banner for compliance
 * Variants: educational, gambling, ai, full
 */

interface Props {
  variant: 'educational' | 'gambling' | 'ai' | 'full';
  className?: string;
}

const DISCLAIMERS = {
  educational:
    'For educational purposes only. No guarantee of winnings. Gambling involves risk of loss.',
  gambling:
    'Gambling involves risk. Only gamble with money you can afford to lose. If you have a gambling problem, call 1-800-522-4700.',
  ai: 'AI-generated educational content. Not a betting recommendation.',
} as const;

function WarningIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      style={{ color: '#CFB53B' }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    </svg>
  );
}

export default function Disclaimers({ variant, className = '' }: Props) {
  const texts =
    variant === 'full'
      ? [DISCLAIMERS.educational, DISCLAIMERS.gambling, DISCLAIMERS.ai]
      : [DISCLAIMERS[variant]];

  return (
    <div
      className={`w-full ${className}`}
      style={{
        background: '#0A0A0A',
        borderTop: '1px solid #1A1A1A',
      }}
    >
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-2">
          {texts.map((text, i) => (
            <div key={i} className="flex items-start gap-2">
              <WarningIcon />
              <p className="text-xs leading-relaxed text-gray-500">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
