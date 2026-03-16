import { useState } from 'react';
import type { QuizQuestion as QuizQuestionType } from '../../../config/course/types';

interface Props {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  showResult: boolean;
}

export default function QuizQuestion({ question, questionNumber, totalQuestions, onAnswer, showResult }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedIndex(index);
    setAnswered(true);
    onAnswer(index === question.correctIndex);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#CFB53B' }}>
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white leading-snug">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          let borderColor = '#3A3A3A';
          let bgColor = 'transparent';
          let textColor = '#E8E8E8';

          if (answered && idx === question.correctIndex) {
            borderColor = '#059669';
            bgColor = 'rgba(5, 150, 105, 0.1)';
            textColor = '#FFFFFF';
          } else if (answered && idx === selectedIndex && idx !== question.correctIndex) {
            borderColor = '#A8001E';
            bgColor = 'rgba(168, 0, 30, 0.1)';
            textColor = '#FFFFFF';
          } else if (selectedIndex === idx && !answered) {
            borderColor = '#CFB53B';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={answered}
              className="w-full text-left p-4 rounded-xl border-2 transition-all duration-200 min-h-[44px] flex items-start gap-3"
              style={{ borderColor, backgroundColor: bgColor, color: textColor }}
            >
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2"
                style={{
                  borderColor: answered && idx === question.correctIndex ? '#059669' : borderColor,
                  color: answered && idx === question.correctIndex ? '#059669' : '#9A9A9A',
                }}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="pt-0.5">{option}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className="p-4 rounded-xl border"
          style={{
            borderColor: selectedIndex === question.correctIndex ? '#059669' : '#A8001E',
            backgroundColor: selectedIndex === question.correctIndex ? 'rgba(5, 150, 105, 0.08)' : 'rgba(168, 0, 30, 0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">
              {selectedIndex === question.correctIndex ? '✓' : '✗'}
            </span>
            <span className="font-bold text-white">
              {selectedIndex === question.correctIndex ? 'Correct!' : 'Not quite.'}
            </span>
          </div>
          <p className="text-sm" style={{ color: '#D4D4D4' }}>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
