/**
 * CourseGate — Simplified pass-through
 *
 * Server-side middleware now handles all auth + purchase gating.
 * This component is kept as a no-op wrapper for backward compatibility.
 * It will be removed entirely once we go live.
 */

import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function CourseGate({ children }: Props) {
  return <>{children}</>;
}
