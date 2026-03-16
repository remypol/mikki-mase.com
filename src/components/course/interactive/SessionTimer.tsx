import { useState, useEffect, useCallback, useRef } from 'react';

interface Props {
  maxMinutes?: number;
  onComplete?: () => void;
}

export default function SessionTimer({ maxMinutes = 45, onComplete }: Props) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [speed, setSpeed] = useState(60); // 60x speed for demo (1 real second = 1 demo minute)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const demoElapsedMinutes = Math.floor((elapsed * speed) / 60);
  const percentage = Math.min((demoElapsedMinutes / maxMinutes) * 100, 100);
  const completedRef = useRef(false);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    if (demoElapsedMinutes >= maxMinutes && isRunning && !completedRef.current) {
      completedRef.current = true;
      setIsRunning(false);
      onComplete?.();
    }
  }, [demoElapsedMinutes, maxMinutes, isRunning, onComplete]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setElapsed(0);
    completedRef.current = false;
  };

  // Alert thresholds
  const getPhaseInfo = useCallback(() => {
    if (percentage >= 90) return { label: 'CASH OUT NOW', color: '#A8001E', pulse: true, message: 'Your session is over. Walk away with your money. NOW.' };
    if (percentage >= 75) return { label: 'FINAL WARNING', color: '#D97706', pulse: true, message: 'You have 10 minutes left. Start wrapping up. Set your final stop-win.' };
    if (percentage >= 50) return { label: 'HALFWAY', color: '#CFB53B', pulse: false, message: 'Half your session is done. Check your bankroll. Are you up? Consider leaving early.' };
    if (percentage >= 25) return { label: 'ON PACE', color: '#059669', pulse: false, message: 'Quarter through. Stay disciplined. Don\'t chase losses.' };
    return { label: 'SESSION START', color: '#059669', pulse: false, message: 'Play big, play fast, play aggressive. The clock is ticking.' };
  }, [percentage]);

  const phase = getPhaseInfo();

  return (
    <div className="max-w-lg mx-auto text-center">
      <h3 className="text-xl font-bold text-white mb-2">Session Discipline Timer</h3>
      <p className="text-sm mb-6" style={{ color: '#9A9A9A' }}>
        Mikki's rule: play for 30-45 minutes MAX. This demo runs at {speed}x speed.
      </p>

      {/* Timer display */}
      <div className="relative mb-6">
        <div
          className="w-48 h-48 mx-auto rounded-full flex flex-col items-center justify-center border-4"
          style={{
            borderColor: phase.color,
            boxShadow: phase.pulse ? `0 0 30px ${phase.color}40` : 'none',
            animation: phase.pulse ? 'pulse 1.5s ease-in-out infinite' : 'none',
          }}
        >
          <span className="text-4xl font-black text-white">
            {demoElapsedMinutes}
          </span>
          <span className="text-sm" style={{ color: '#9A9A9A' }}>
            / {maxMinutes} min
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 rounded-full mb-4" style={{ backgroundColor: '#2D2D2D' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: phase.color,
            boxShadow: percentage > 75 ? `0 0 10px ${phase.color}` : 'none',
          }}
        />
      </div>

      {/* Phase indicator */}
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
        style={{ backgroundColor: `${phase.color}20`, border: `1px solid ${phase.color}` }}
      >
        {phase.pulse && (
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: phase.color }} />
        )}
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: phase.color }}>
          {phase.label}
        </span>
      </div>

      {/* Message */}
      <p className="text-sm mb-6" style={{ color: '#BEBEBE' }}>
        {phase.message}
      </p>

      {/* Controls */}
      <div className="flex gap-3 justify-center">
        {!isRunning && elapsed === 0 && (
          <button
            onClick={handleStart}
            className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 min-h-[44px]"
            style={{ backgroundColor: '#059669', color: '#FFFFFF' }}
          >
            Start Session
          </button>
        )}
        {isRunning && (
          <button
            onClick={handlePause}
            className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 min-h-[44px]"
            style={{ backgroundColor: '#D97706', color: '#FFFFFF' }}
          >
            Pause
          </button>
        )}
        {!isRunning && elapsed > 0 && demoElapsedMinutes < maxMinutes && (
          <button
            onClick={handleStart}
            className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 min-h-[44px]"
            style={{ backgroundColor: '#059669', color: '#FFFFFF' }}
          >
            Resume
          </button>
        )}
        {elapsed > 0 && (
          <button
            onClick={handleReset}
            className="px-8 py-4 rounded-xl font-bold text-lg border-2 transition-all duration-200 min-h-[44px]"
            style={{ borderColor: '#3A3A3A', color: '#BEBEBE', backgroundColor: 'transparent' }}
          >
            Reset
          </button>
        )}
      </div>

      {/* Speed selector */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <span className="text-xs" style={{ color: '#6B6B6B' }}>Speed:</span>
        {[30, 60, 120].map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className="px-3 py-1 rounded text-xs font-bold transition-all min-h-[32px]"
            style={{
              backgroundColor: speed === s ? '#CFB53B' : '#2D2D2D',
              color: speed === s ? '#000' : '#9A9A9A',
            }}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}
