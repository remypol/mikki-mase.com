/**
 * RebateCalculator — Module 8 L1 "Understanding Loss Rebates".
 *
 * Takes the four numbers that matter in a rebate negotiation:
 *   - Total action (avg bet × hands/hour × hours)
 *   - Base house edge of the game (%)
 *   - Rebate percentage offered by the host
 *   - Rebate threshold ($ lost before the rebate kicks in — often 0)
 *
 * Outputs:
 *   - Expected loss before rebate
 *   - Rebate paid out
 *   - Net expected loss after rebate
 *   - Effective house edge (%)
 *   - Verdict chip: still -EV, break-even, or +EV (rebate > edge)
 *
 * Lets the player translate a verbal host offer into the one number that
 * matters: is this game still negative after the rebate?
 */

import { useMemo, useState } from 'react';

interface Inputs {
  avgBet: number;       // $ per hand
  handsPerHour: number; // decisions / hr
  hours: number;        // session length
  houseEdgePct: number; // % (e.g. 0.5 for blackjack basic strategy)
  rebatePct: number;    // % (e.g. 15)
  threshold: number;    // $ — rebate only applies above this loss
}

const DEFAULTS: Inputs = {
  avgBet: 500,
  handsPerHour: 70,
  hours: 4,
  houseEdgePct: 0.5,
  rebatePct: 15,
  threshold: 0,
};

function money(n: number): string {
  const rounded = Math.round(n);
  return rounded.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function pct(n: number): string {
  return `${n.toFixed(2)}%`;
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-tertiary font-semibold">
        {label}
      </span>
      <div
        className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2"
        style={{
          border: '1px solid rgb(var(--border-subtle))',
          backgroundColor: 'rgb(var(--bg-elevated))',
        }}
      >
        {prefix && <span className="text-tertiary text-sm">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => {
            const n = parseFloat(e.target.value);
            onChange(Number.isFinite(n) ? n : 0);
          }}
          className="w-full bg-transparent outline-none text-primary text-base font-semibold"
        />
        {suffix && <span className="text-tertiary text-sm">{suffix}</span>}
      </div>
    </label>
  );
}

export default function RebateCalculator() {
  const [i, setI] = useState<Inputs>(DEFAULTS);

  const derived = useMemo(() => {
    const totalAction = Math.max(0, i.avgBet * i.handsPerHour * i.hours);
    const expectedLoss = totalAction * (i.houseEdgePct / 100);
    const rebatableLoss = Math.max(0, expectedLoss - i.threshold);
    const rebate = rebatableLoss * (i.rebatePct / 100);
    const netLoss = expectedLoss - rebate;
    const effectiveEdgePct = totalAction > 0 ? (netLoss / totalAction) * 100 : 0;
    let verdict: 'advantage' | 'breakeven' | 'negative' = 'negative';
    if (effectiveEdgePct <= 0) verdict = 'advantage';
    else if (effectiveEdgePct < 0.2) verdict = 'breakeven';
    return { totalAction, expectedLoss, rebate, netLoss, effectiveEdgePct, verdict };
  }, [i]);

  const verdictStyle = {
    advantage: { bg: 'rgba(27,107,63,0.15)',  color: '#6EE7A8', label: 'Player advantage' },
    breakeven: { bg: 'rgba(212,165,64,0.15)', color: '#F5C96D', label: 'Break-even zone' },
    negative:  { bg: 'rgba(212,24,61,0.15)',  color: '#F08692', label: 'House still favored' },
  }[derived.verdict];

  return (
    <figure className="stake-card">
      <figcaption className="mb-6">
        <p className="text-xs uppercase tracking-widest text-tertiary font-semibold mb-1">
          The Drill · Rebate Calculator
        </p>
        <h3 className="display-h3">Run the rebate math</h3>
        <p className="text-secondary text-sm mt-1">
          Enter your session numbers and the rebate the host is offering. Watch the effective house edge move.
        </p>
      </figcaption>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <NumberField
          label="Average bet"
          prefix="$"
          value={i.avgBet}
          step={25}
          onChange={(v) => setI({ ...i, avgBet: v })}
        />
        <NumberField
          label="Hands / hour"
          value={i.handsPerHour}
          step={5}
          onChange={(v) => setI({ ...i, handsPerHour: v })}
        />
        <NumberField
          label="Session hours"
          value={i.hours}
          step={0.5}
          onChange={(v) => setI({ ...i, hours: v })}
        />
        <NumberField
          label="House edge"
          suffix="%"
          value={i.houseEdgePct}
          step={0.1}
          onChange={(v) => setI({ ...i, houseEdgePct: v })}
        />
        <NumberField
          label="Rebate offered"
          suffix="%"
          value={i.rebatePct}
          step={1}
          onChange={(v) => setI({ ...i, rebatePct: v })}
        />
        <NumberField
          label="Rebate threshold"
          prefix="$"
          value={i.threshold}
          step={500}
          onChange={(v) => setI({ ...i, threshold: v })}
        />
      </div>

      <div
        className="rounded-xl p-5 mb-5"
        style={{
          background: 'linear-gradient(135deg, rgba(212,165,64,0.08), rgba(212,165,64,0.02))',
          border: '1px solid rgba(212,165,64,0.25)',
        }}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-tertiary font-semibold mb-1">
              Effective house edge after rebate
            </p>
            <p
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 6vw, 3rem)',
                lineHeight: 1,
                color: verdictStyle.color,
                fontVariationSettings: '"opsz" 48',
              }}
            >
              {pct(derived.effectiveEdgePct)}
            </p>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest whitespace-nowrap"
            style={{ backgroundColor: verdictStyle.bg, color: verdictStyle.color }}
          >
            {verdictStyle.label}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-tertiary font-semibold mb-1">
              Total action
            </div>
            <div className="text-primary font-semibold">{money(derived.totalAction)}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-tertiary font-semibold mb-1">
              Expected loss
            </div>
            <div className="text-primary font-semibold">{money(derived.expectedLoss)}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-tertiary font-semibold mb-1">
              Rebate paid
            </div>
            <div className="font-semibold" style={{ color: '#6EE7A8' }}>
              {money(derived.rebate)}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-tertiary font-semibold mb-1">
              Net expected
            </div>
            <div
              className="font-semibold"
              style={{ color: derived.netLoss > 0 ? '#F08692' : '#6EE7A8' }}
            >
              {derived.netLoss > 0 ? `-${money(derived.netLoss)}` : `+${money(-derived.netLoss)}`}
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-tertiary leading-relaxed">
        <strong className="text-secondary">How to read this:</strong> the effective edge is the house's
        real take after the rebate is paid out. When it drops below the game's base edge by more than
        half, the rebate is doing serious work. When it goes negative, the host is paying you to play.
        Always confirm the threshold, the payout cadence, and the loss calculation window in writing
        before your first bet.
      </p>
    </figure>
  );
}
