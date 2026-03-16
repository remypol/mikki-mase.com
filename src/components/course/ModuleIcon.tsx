/**
 * Premium SVG icons for each course module.
 * Gold-outlined, luxury feel — replaces basic emojis.
 */

interface Props {
  moduleSlug: string;
  size?: number;
  className?: string;
}

const GOLD = '#CFB53B';
const GOLD_DIM = 'rgba(207, 181, 59, 0.15)';

function IconWrapper({ size = 40, className = '', children }: { size?: number; className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: GOLD_DIM,
      }}
    >
      {children}
    </div>
  );
}

// Module 1: Mindset & Disclaimer — Shield / Foundation
function MindsetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

// Module 2: Casino Psychology — Brain / Eye
function PsychologyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
      <path d="M9 21h6" />
      <path d="M10 17v4" />
      <path d="M14 17v4" />
      <circle cx="10" cy="9" r="1" fill={GOLD} stroke="none" />
      <circle cx="14" cy="9" r="1" fill={GOLD} stroke="none" />
    </svg>
  );
}

// Module 3: Blackjack Mastery — Cards / Spade
function BlackjackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="14" height="18" rx="2" />
      <rect x="7" y="4" width="14" height="18" rx="2" />
      <path d="M14 10c0-1.5-1-2.5-2-3s-2-1.5-2-3" strokeWidth="1.5" />
      <circle cx="14" cy="15" r="0.5" fill={GOLD} stroke="none" />
    </svg>
  );
}

// Module 4: Side Bets — Diamond / Gem
function SideBetsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 13L2 9z" />
      <path d="M2 9h20" />
      <path d="M10 3l-2 6 4 13 4-13-2-6" />
    </svg>
  );
}

// Module 5: Pai Gow — Tiles / Strategy
function PaiGowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="8" height="16" rx="1.5" />
      <rect x="14" y="4" width="8" height="16" rx="1.5" />
      <circle cx="6" cy="8" r="1" fill={GOLD} stroke="none" />
      <circle cx="6" cy="12" r="1" fill={GOLD} stroke="none" />
      <circle cx="6" cy="16" r="1" fill={GOLD} stroke="none" />
      <circle cx="18" cy="9" r="1" fill={GOLD} stroke="none" />
      <circle cx="18" cy="15" r="1" fill={GOLD} stroke="none" />
    </svg>
  );
}

// Module 6: UTH Group Play — People / Team
function GroupPlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="7" r="3" />
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      <path d="M17 15a4 4 0 014 4v2" />
    </svg>
  );
}

// Module 7: Casino Negotiation — Handshake / Deal
function NegotiationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
      <path d="M12 5.36V21" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  );
}

// Module 8: Discount System — Percentage / Money back
function DiscountIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9l-6 6" />
      <circle cx="9.5" cy="9.5" r="1.5" fill={GOLD} stroke="none" />
      <circle cx="14.5" cy="14.5" r="1.5" fill={GOLD} stroke="none" />
    </svg>
  );
}

// Module 9: Comps & Perks — Crown / VIP
function CompsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20" />
      <path d="M4 20l2-14 4 6 2-8 2 8 4-6 2 14" />
      <circle cx="12" cy="4" r="1" fill={GOLD} stroke="none" />
    </svg>
  );
}

// Module 10: Session Discipline — Timer / Hourglass
function DisciplineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

const ICON_MAP: Record<string, () => React.ReactNode> = {
  'mindset-disclaimer': MindsetIcon,
  'casino-psychology': PsychologyIcon,
  'blackjack-mastery': BlackjackIcon,
  'side-bets': SideBetsIcon,
  'pai-gow': PaiGowIcon,
  'uth-group-play': GroupPlayIcon,
  'casino-negotiation': NegotiationIcon,
  'discount-system': DiscountIcon,
  'comps-perks': CompsIcon,
  'session-discipline': DisciplineIcon,
};

export default function ModuleIcon({ moduleSlug, size = 40, className = '' }: Props) {
  const IconComponent = ICON_MAP[moduleSlug];

  if (!IconComponent) {
    return (
      <IconWrapper size={size} className={className}>
        <span style={{ color: GOLD, fontSize: size * 0.45 }}>?</span>
      </IconWrapper>
    );
  }

  return (
    <IconWrapper size={size} className={className}>
      <IconComponent />
    </IconWrapper>
  );
}

export { ICON_MAP };
