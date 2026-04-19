/**
 * LessonVisual — router for lesson-level visual slots.
 *
 * Renders a static SVG/table/chart above the lesson body when the lesson
 * declares `visualSlotId`. Lazy-loaded so lessons without a visual don't
 * pay the bundle cost.
 */

import { lazy, Suspense } from 'react';

const BasicStrategyChart = lazy(() => import('./visuals/BasicStrategyChart'));
const TheoreticalLossFormula = lazy(() => import('./visuals/TheoreticalLossFormula'));
const SideBetPayoutTable = lazy(() => import('./visuals/SideBetPayoutTable'));
const FrontVsCreditTable = lazy(() => import('./visuals/FrontVsCreditTable'));
// Future visuals (not yet built):
// const RebateMathExamples = lazy(() => import('./visuals/RebateMathExamples'));
// const PaiGowHouseWayTable = lazy(() => import('./visuals/PaiGowHouseWayTable'));
// const SessionTimelineDiagram = lazy(() => import('./visuals/SessionTimelineDiagram'));
// const HostScriptFlow = lazy(() => import('./visuals/HostScriptFlow'));

interface Props {
  visualSlotId: string;
}

export default function LessonVisual({ visualSlotId }: Props) {
  const fallback = (
    <div
      className="stake-card text-center py-12 text-tertiary text-sm"
      role="status"
      aria-live="polite"
    >
      Loading chart…
    </div>
  );

  switch (visualSlotId) {
    case 'basic-strategy-chart':
      return <Suspense fallback={fallback}><BasicStrategyChart /></Suspense>;
    case 'theoretical-loss-formula':
      return <Suspense fallback={fallback}><TheoreticalLossFormula /></Suspense>;
    case 'side-bet-payout-table':
      return <Suspense fallback={fallback}><SideBetPayoutTable /></Suspense>;
    case 'front-vs-credit-table':
      return <Suspense fallback={fallback}><FrontVsCreditTable /></Suspense>;
    default:
      if (typeof console !== 'undefined') {
        console.warn(`[LessonVisual] Unknown visualSlotId "${visualSlotId}" — skipping.`);
      }
      return null;
  }
}
