interface ReviewLink {
  slug: string;
  question: string;
}

interface Props {
  score: number;
  totalQuestions: number;
  correctCount: number;
  passingScore: number;
  bestScore: number | null;
  onRetry: () => void;
  /** Module slug for building lesson review deep-links, e.g. `'blackjack-mastery'`. */
  moduleSlug?: string;
  /** Missed questions with their source lesson slugs (de-duped). */
  missedReview?: ReviewLink[];
}

export default function QuizResult({
  score,
  totalQuestions,
  correctCount,
  passingScore,
  bestScore,
  onRetry,
  moduleSlug,
  missedReview = [],
}: Props) {
  const passed = score >= passingScore;
  const isPerfect = score === 100;
  const hasReview = Boolean(moduleSlug) && missedReview.length > 0;

  return (
    <div className="max-w-lg mx-auto text-center py-8">
      {/* Result icon */}
      <div className="text-6xl mb-6">
        {isPerfect ? '🏆' : passed ? '🎯' : '💪'}
      </div>

      {/* Score */}
      <div className="mb-4">
        <span
          className="text-6xl font-black"
          style={{ color: isPerfect ? '#CFB53B' : passed ? '#059669' : '#A8001E' }}
        >
          {score}%
        </span>
      </div>

      <h3 className="text-2xl font-bold text-white mb-2">
        {isPerfect
          ? 'Perfect Score!'
          : passed
            ? 'Quiz Passed!'
            : 'Not Quite — Review and Retake'}
      </h3>

      <p className="mb-6" style={{ color: '#BEBEBE' }}>
        {correctCount} of {totalQuestions} correct · Pass threshold: {passingScore}%
      </p>

      {/* Points earned */}
      {passed && (
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{ backgroundColor: 'rgba(207, 181, 59, 0.15)', border: '1px solid #CFB53B' }}
        >
          <span style={{ color: '#CFB53B' }} className="font-bold">
            {isPerfect ? '+75 XP' : '+50 XP'}
          </span>
          <span className="text-xs" style={{ color: '#9A9A9A' }}>
            {isPerfect ? '(Pass + Perfect bonus)' : '(First pass bonus)'}
          </span>
        </div>
      )}

      {/* Best score */}
      {bestScore !== null && bestScore !== score && (
        <p className="text-sm mb-6" style={{ color: '#9A9A9A' }}>
          Your best score: <span style={{ color: '#CFB53B' }}>{Math.max(bestScore, score)}%</span>
        </p>
      )}

      {/* Review these lessons before retaking */}
      {hasReview && (
        <div
          className="text-left mb-6 rounded-xl p-4"
          style={{
            border: '1px solid rgba(207, 181, 59, 0.25)',
            backgroundColor: 'rgba(207, 181, 59, 0.04)',
          }}
        >
          <p
            className="text-[10px] font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#CFB53B' }}
          >
            Review these lessons before retaking
          </p>
          <ul className="space-y-2">
            {missedReview.map((r) => (
              <li key={r.slug}>
                <a
                  href={`/masterclass/${moduleSlug}/${r.slug}`}
                  className="text-sm underline decoration-dotted underline-offset-4 hover:decoration-solid transition-all capitalize"
                  style={{ color: '#E8E8E8' }}
                >
                  {r.slug.replace(/-/g, ' ')}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions — retake always available */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onRetry}
          className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 min-h-[44px]"
          style={{
            backgroundColor: passed ? 'transparent' : '#A8001E',
            borderWidth: passed ? 2 : 0,
            borderStyle: 'solid',
            borderColor: passed ? '#CFB53B' : 'transparent',
            color: passed ? '#CFB53B' : '#FFFFFF',
          }}
        >
          {passed ? 'Retake for a Better Score' : 'Try Again'}
        </button>
        {!passed && hasReview && (
          <a
            href={`/masterclass/${moduleSlug}/${missedReview[0].slug}`}
            className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 border-2 min-h-[44px] flex items-center justify-center"
            style={{
              borderColor: '#3A3A3A',
              color: '#BEBEBE',
              backgroundColor: 'transparent',
            }}
          >
            Review First Missed Lesson
          </a>
        )}
      </div>
    </div>
  );
}
