/**
 * SessionTimer — the "35-minute rule" widget from Module 2 L2.
 *
 * Both dual-model reviewers flagged this as the highest product-distribution
 * leverage widget: it's used AT THE TABLE, not just inside the course. PWA
 * install prompt makes it a real tool on the user's home screen.
 *
 * Design — intentionally simple, no fancy state machine:
 *   - Set bankroll (total session money at risk)
 *   - Set session length (default 35 min per Mikki's rule)
 *   - Set stop-loss % and win-limit %
 *   - Countdown + progress bar. Colour shifts green → amber → red as time
 *     elapses (mirrors bankroll health)
 *   - Press LOG WIN / LOG LOSS to record realized P/L. When realized P/L
 *     crosses stop-loss or win-limit, siren + lock the widget (user must
 *     confirm they're walking away — can't just ignore)
 *   - Optional vibration + audio alert at 80% of session window
 *
 * This is intentionally a client-only widget. No Supabase sync in Sprint 3
 * — that's a Sprint 4/5 job tying into course_progress.
 */

import { useEffect, useMemo, useRef, useState } from 'react';

type Phase = 'setup' | 'running' | 'stop-loss' | 'win-limit' | 'time-up' | 'done';

const DEFAULTS = {
  bankroll: 1000,
  minutes: 35,
  stopLossPct: 30,
  winLimitPct: 50,
};

function fmt(ms: number): string {
  if (ms < 0) ms = 0;
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function money(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

export default function SessionTimer() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [bankroll, setBankroll] = useState(DEFAULTS.bankroll);
  const [minutes, setMinutes] = useState(DEFAULTS.minutes);
  const [stopLossPct, setStopLossPct] = useState(DEFAULTS.stopLossPct);
  const [winLimitPct, setWinLimitPct] = useState(DEFAULTS.winLimitPct);

  // Realized P/L in dollars. Positive = up, negative = down.
  const [realized, setRealized] = useState(0);
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [now, setNow] = useState<number>(() => Date.now());
  const twoMinuteWarningFiredRef = useRef(false);

  // Tick.
  useEffect(() => {
    if (phase !== 'running') return;
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, [phase]);

  const remainingMs = endsAt ? Math.max(0, endsAt - now) : 0;
  const totalMs = minutes * 60 * 1000;
  const elapsedPct = totalMs === 0 ? 0 : Math.min(1, (totalMs - remainingMs) / totalMs);

  const stopLossAmount = Math.round((stopLossPct / 100) * bankroll);
  const winLimitAmount = Math.round((winLimitPct / 100) * bankroll);

  // Trigger phase transitions.
  useEffect(() => {
    if (phase !== 'running') return;
    if (realized <= -stopLossAmount) {
      vibrate([400, 120, 400]);
      setPhase('stop-loss');
      return;
    }
    if (realized >= winLimitAmount) {
      vibrate([200, 80, 200, 80, 200]);
      setPhase('win-limit');
      return;
    }
    if (endsAt && remainingMs <= 0) {
      vibrate([600]);
      setPhase('time-up');
      return;
    }
    // Two-minute warning.
    if (endsAt && remainingMs <= 2 * 60 * 1000 && !twoMinuteWarningFiredRef.current) {
      twoMinuteWarningFiredRef.current = true;
      vibrate([120, 60, 120]);
    }
  }, [realized, remainingMs, endsAt, phase, stopLossAmount, winLimitAmount]);

  function start() {
    setRealized(0);
    twoMinuteWarningFiredRef.current = false;
    setEndsAt(Date.now() + minutes * 60 * 1000);
    setNow(Date.now());
    setPhase('running');
  }

  function adjust(delta: number) {
    if (phase !== 'running') return;
    setRealized((r) => r + delta);
  }

  function reset() {
    setPhase('setup');
    setRealized(0);
    setEndsAt(null);
  }

  function acknowledge() {
    setPhase('done');
  }

  const progressColor = useMemo(() => {
    if (phase === 'stop-loss') return '#C41E3A';
    if (phase === 'win-limit') return '#1B6B3F';
    if (elapsedPct < 0.7) return 'rgb(var(--accent-gold))';
    if (elapsedPct < 0.9) return '#D97706';
    return '#C41E3A';
  }, [elapsedPct, phase]);

  // ================= SETUP =================
  if (phase === 'setup') {
    return (
      <div className="stake-card">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-widest text-tertiary font-semibold mb-1">
            The drill
          </p>
          <h3 className="display-h3">Session timer</h3>
          <p className="text-secondary text-sm mt-1">
            The 35-minute rule, made audible. Set your bankroll, stop-loss, and win-limit — the timer enforces them so you don't have to trust yourself in the moment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <NumberField label="Bankroll" prefix="$" value={bankroll} onChange={setBankroll} step={50} />
          <NumberField label="Session length" suffix="min" value={minutes} onChange={setMinutes} step={5} min={5} max={120} />
          <NumberField label="Stop-loss" suffix="%" value={stopLossPct} onChange={setStopLossPct} step={5} min={5} max={80} />
          <NumberField label="Win-limit" suffix="%" value={winLimitPct} onChange={setWinLimitPct} step={5} min={5} max={200} />
        </div>

        <div className="text-xs text-tertiary mb-5">
          Stop at {money(stopLossAmount)} down or {money(winLimitAmount)} up. Timer alerts at 2 minutes remaining.
        </div>

        <button
          onClick={start}
          className="w-full min-h-[52px] rounded-xl font-semibold text-white bg-accent-red hover:brightness-110 transition"
        >
          Start session
        </button>
      </div>
    );
  }

  // ================= ALERT PHASES =================
  if (phase === 'stop-loss' || phase === 'win-limit' || phase === 'time-up') {
    const isLoss = phase === 'stop-loss';
    const isWin = phase === 'win-limit';
    const title = isLoss ? 'Stop-loss hit. Walk away.' : isWin ? 'Win-limit hit. Cash out.' : 'Session ended.';
    const tint = isLoss ? '#C41E3A' : isWin ? '#1B6B3F' : 'rgb(var(--accent-gold))';
    return (
      <div className="stake-card" role="alert" aria-live="assertive">
        <div
          className="rounded-xl p-6 text-center mb-5"
          style={{
            background: `linear-gradient(135deg, ${tint}22 0%, rgba(20,22,32,1) 100%)`,
            border: `1px solid ${tint}`,
          }}
        >
          <p className="text-[11px] uppercase tracking-widest font-semibold mb-2" style={{ color: tint }}>
            {isLoss ? 'Loss limit' : isWin ? 'Win limit' : 'Time up'}
          </p>
          <h3 className="display-h2 mb-2">{title}</h3>
          <p className="text-secondary">
            Realized P/L: <span className="font-bold" style={{ color: tint }}>{realized >= 0 ? '+' : ''}{money(realized)}</span>
          </p>
        </div>
        <p className="text-secondary text-sm mb-5">
          The timer is locked. Stand up, cash out, step away from the floor. Come back if you want, but not this session.
        </p>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={acknowledge}
            className="flex-1 min-h-[48px] rounded-xl font-semibold text-white bg-accent-red hover:brightness-110 transition"
          >
            I'm walking away
          </button>
        </div>
      </div>
    );
  }

  // ================= DONE =================
  if (phase === 'done') {
    return (
      <div className="stake-card text-center">
        <h3 className="display-h3 mb-3">Session logged.</h3>
        <p className="text-secondary mb-5">
          Realized P/L: <strong className="text-primary">{realized >= 0 ? '+' : ''}{money(realized)}</strong>.
          You followed the rule — that's the whole win.
        </p>
        <button
          onClick={reset}
          className="min-h-[48px] px-6 rounded-xl font-semibold text-primary border border-subtle hover:bg-white/5 transition"
        >
          Start another session
        </button>
      </div>
    );
  }

  // ================= RUNNING =================
  return (
    <div className="stake-card">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-widest text-tertiary font-semibold">Session in progress</p>
        <button
          onClick={() => confirm('End session early?') && reset()}
          className="text-xs text-tertiary hover:text-primary"
          aria-label="End session early"
        >
          End early
        </button>
      </div>

      {/* Countdown */}
      <div className="text-center mb-5">
        <p className="tabular-nums text-5xl md:text-6xl font-black text-primary mb-1" style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>
          {fmt(remainingMs)}
        </p>
        <p className="text-tertiary text-xs">remaining of {minutes}-minute window</p>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full overflow-hidden mb-6" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${elapsedPct * 100}%`,
            background: progressColor,
          }}
        />
      </div>

      {/* Realized P/L */}
      <div className="grid grid-cols-3 gap-3 mb-5 text-center">
        <div>
          <p className="text-tertiary text-[10px] uppercase tracking-widest">P/L</p>
          <p
            className="text-lg font-bold tabular-nums"
            style={{ color: realized >= 0 ? '#6EE7A8' : '#F87171' }}
          >
            {realized >= 0 ? '+' : ''}{money(realized)}
          </p>
        </div>
        <div>
          <p className="text-tertiary text-[10px] uppercase tracking-widest">Stop at</p>
          <p className="text-lg font-bold tabular-nums text-primary">−{money(stopLossAmount)}</p>
        </div>
        <div>
          <p className="text-tertiary text-[10px] uppercase tracking-widest">Walk at</p>
          <p className="text-lg font-bold tabular-nums text-primary">+{money(winLimitAmount)}</p>
        </div>
      </div>

      {/* Adjust buttons — realistic chip-size buttons */}
      <p className="text-xs text-tertiary mb-2 text-center">Log change after each hand / round</p>
      <div className="grid grid-cols-3 gap-2 mb-2">
        {[25, 100, 500].map((amt) => (
          <button
            key={`up-${amt}`}
            onClick={() => adjust(amt)}
            className="min-h-[48px] rounded-xl font-bold text-sm border-2 transition"
            style={{ borderColor: 'rgba(27,107,63,0.4)', background: 'rgba(27,107,63,0.08)', color: '#6EE7A8' }}
          >
            +${amt}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[25, 100, 500].map((amt) => (
          <button
            key={`down-${amt}`}
            onClick={() => adjust(-amt)}
            className="min-h-[48px] rounded-xl font-bold text-sm border-2 transition"
            style={{ borderColor: 'rgba(196,30,58,0.4)', background: 'rgba(196,30,58,0.08)', color: '#F87171' }}
          >
            −${amt}
          </button>
        ))}
      </div>
    </div>
  );
}

function NumberField({
  label, value, onChange, step = 1, min, max, prefix, suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs text-tertiary uppercase tracking-widest font-semibold mb-1 block">{label}</span>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary">{prefix}</span>}
        <input
          type="number"
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-full rounded-xl px-4 py-3 tabular-nums text-lg font-semibold text-primary"
          style={{
            background: 'rgb(var(--bg-card))',
            border: '1px solid rgb(var(--border-subtle))',
            paddingLeft: prefix ? '1.75rem' : undefined,
            paddingRight: suffix ? '3rem' : undefined,
          }}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-tertiary">{suffix}</span>}
      </div>
    </label>
  );
}

function vibrate(pattern: number[]) {
  if (typeof navigator === 'undefined') return;
  try {
    if ('vibrate' in navigator) (navigator as any).vibrate(pattern);
  } catch { /* non-critical */ }
}
