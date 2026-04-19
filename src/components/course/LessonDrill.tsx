/**
 * LessonDrill — drill router for lesson-level "The Drill" slot.
 *
 * A lesson declares `drillId: 'basic-strategy'` in its content file and the
 * lesson template renders <LessonDrill drillId="basic-strategy" />. This
 * component maps the id to the correct widget and lazily renders it so
 * we don't pay the bundle cost on lessons that don't use a drill.
 */

import { lazy, Suspense } from 'react';

const BlackjackDrill = lazy(() => import('./drills/BlackjackDrill'));
const SessionTimer = lazy(() => import('./drills/SessionTimer'));
const RebateCalculator = lazy(() => import('./drills/RebateCalculator'));

interface Props {
  drillId: string;
}

export default function LessonDrill({ drillId }: Props) {
  const fallback = (
    <div
      className="stake-card text-center py-12 text-tertiary text-sm"
      role="status"
      aria-live="polite"
    >
      Loading drill…
    </div>
  );

  switch (drillId) {
    case 'basic-strategy':
      return (
        <Suspense fallback={fallback}>
          <BlackjackDrill />
        </Suspense>
      );
    case 'session-timer':
      return (
        <Suspense fallback={fallback}>
          <SessionTimer />
        </Suspense>
      );
    case 'rebate-calculator':
      return (
        <Suspense fallback={fallback}>
          <RebateCalculator />
        </Suspense>
      );
    default:
      // Unknown drill id — render nothing rather than crashing the lesson.
      if (typeof console !== 'undefined') {
        console.warn(`[LessonDrill] Unknown drillId "${drillId}" — skipping.`);
      }
      return null;
  }
}
