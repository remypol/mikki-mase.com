interface Props {
  score: number;
  totalQuestions: number;
  correctCount: number;
  passingScore: number;
  bestScore: number | null;
  onRetry: () => void;
}

export default function QuizResult({ score, totalQuestions, correctCount, passingScore, bestScore, onRetry }: Props) {
  const passed = score >= passingScore;
  const isPerfect = score === 100;

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
            : 'Not Quite — Try Again'}
      </h3>

      <p className="mb-6" style={{ color: '#BEBEBE' }}>
        {correctCount} of {totalQuestions} questions correct
        {passed
          ? '. Complete all lessons and the quiz to earn the module badge!'
          : `. You need ${passingScore}% to pass.`}
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

      {/* Actions */}
      <div className="flex flex-col gap-3">
        {!passed && (
          <button
            onClick={onRetry}
            className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 min-h-[44px]"
            style={{ backgroundColor: '#A8001E', color: '#FFFFFF' }}
          >
            Try Again
          </button>
        )}
        <button
          onClick={onRetry}
          className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 border-2 min-h-[44px]"
          style={{
            borderColor: passed ? '#CFB53B' : '#3A3A3A',
            color: passed ? '#CFB53B' : '#BEBEBE',
            backgroundColor: 'transparent',
          }}
        >
          {passed ? 'Retake for a Better Score' : 'Review & Try Again'}
        </button>
      </div>
    </div>
  );
}
