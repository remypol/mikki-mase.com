import { useState, useCallback } from 'react';
import type { Quiz as QuizType } from '../../../config/course/types';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';

interface Props {
  quiz: QuizType;
  moduleTitle: string;
  moduleSlug?: string;
  onComplete: (score: number) => void;
  bestScore: number | null;
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
    </svg>
  );
}

export default function Quiz({ quiz, moduleTitle, moduleSlug, onComplete, bestScore }: Props) {
  if (quiz.questions.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-white text-2xl font-bold mb-2">No questions available</h3>
        <p className="text-sm" style={{ color: '#9A9A9A' }}>This quiz is being updated. Check back soon.</p>
      </div>
    );
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [waitingForNext, setWaitingForNext] = useState(false);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    if (isCorrect) setCorrectCount((prev) => prev + 1);
    setWaitingForNext(true);
  }, [answers]);

  const handleNext = useCallback(() => {
    setWaitingForNext(false);
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const finalCorrect = answers.filter(Boolean).length;
      const score = quiz.questions.length > 0
        ? Math.round((finalCorrect / quiz.questions.length) * 100)
        : 0;
      setIsFinished(true);
      onComplete(score);
    }
  }, [currentQuestion, quiz.questions.length, answers, onComplete]);

  const handlePrev = useCallback(() => {
    // Allow going back to review previous questions (read-only)
    if (currentQuestion > 0 && !waitingForNext) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion, waitingForNext]);

  const handleRetry = () => {
    setCurrentQuestion(0);
    setCorrectCount(0);
    setAnswers([]);
    setIsFinished(false);
    setWaitingForNext(false);
  };

  if (isFinished) {
    const score = Math.round((correctCount / quiz.questions.length) * 100);
    // Collect source-lesson review links for questions the user got wrong.
    const missedReview: Array<{ slug: string; question: string }> = [];
    answers.forEach((correct, idx) => {
      if (correct) return;
      const q = quiz.questions[idx];
      if (q?.sourceLessonSlug) {
        // De-dupe so we don't link the same lesson five times.
        if (!missedReview.some((r) => r.slug === q.sourceLessonSlug)) {
          missedReview.push({ slug: q.sourceLessonSlug, question: q.question });
        }
      }
    });
    return (
      <QuizResult
        score={score}
        totalQuestions={quiz.questions.length}
        correctCount={correctCount}
        passingScore={quiz.passingScore}
        bestScore={bestScore}
        onRetry={handleRetry}
        moduleSlug={moduleSlug}
        missedReview={missedReview}
      />
    );
  }

  const isLastQuestion = currentQuestion === quiz.questions.length - 1;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Quiz header */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#CFB53B' }}>
            {moduleTitle}
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-widest rounded-full px-2.5 py-1"
            style={{
              color: '#CFB53B',
              backgroundColor: 'rgba(207, 181, 59, 0.12)',
              border: '1px solid rgba(207, 181, 59, 0.3)',
            }}
            title="Minimum score required to pass. You can retake as many times as you want."
          >
            Pass: {quiz.passingScore}% · Unlimited retakes
          </span>
        </div>
        <h2 className="text-2xl font-black text-white mt-2">Knowledge Check</h2>

        {/* Progress dots */}
        <div className="flex gap-1.5 mt-4">
          {quiz.questions.map((_, idx) => (
            <div
              key={idx}
              className="h-2.5 flex-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  idx < answers.length
                    ? answers[idx]
                      ? '#059669'
                      : '#A8001E'
                    : idx === currentQuestion
                      ? '#CFB53B'
                      : '#3A3A3A',
              }}
            />
          ))}
        </div>
      </div>

      {/* Current question */}
      <QuizQuestion
        key={currentQuestion}
        question={quiz.questions[currentQuestion]}
        questionNumber={currentQuestion + 1}
        totalQuestions={quiz.questions.length}
        onAnswer={handleAnswer}
        showResult={false}
      />

      {/* Navigation buttons — shown after answering */}
      {waitingForNext && (
        <div className="mt-8 flex items-center justify-between">
          <div />
          <button
            onClick={handleNext}
            className="flex items-center gap-2 min-h-[48px] px-8 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            style={{ backgroundColor: '#A8001E' }}
          >
            <span>{isLastQuestion ? 'See Results' : 'Next Question'}</span>
            <ArrowRightIcon />
          </button>
        </div>
      )}

      {/* Best score badge */}
      {bestScore !== null && !waitingForNext && (
        <div className="mt-6 text-center">
          <span className="text-sm" style={{ color: '#9A9A9A' }}>
            Your best score: <span style={{ color: '#CFB53B' }}>{bestScore}%</span>
          </span>
        </div>
      )}
    </div>
  );
}
