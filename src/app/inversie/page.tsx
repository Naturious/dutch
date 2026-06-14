'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { inversionExercises } from '@/data/inversion';
import FeedbackMessage from '@/components/FeedbackMessage';
import ScoreTracker from '@/components/ScoreTracker';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Inversie() {
  const [exercises] = useState(() => shuffleArray(inversionExercises));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  const current = exercises[currentIndex % exercises.length];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo(() => current.options ? shuffleArray(current.options) : [], [currentIndex]);

  const checkAnswer = useCallback((option: string) => {
    setSelectedOption(option);
    const correct = option === current.correctSentence;
    setIsCorrect(correct);
    setAnswered((a) => a + 1);
    if (correct) setScore((s) => s + 1);
  }, [current.correctSentence]);

  const nextExercise = useCallback(() => {
    setCurrentIndex((i) => i + 1);
    setSelectedOption(null);
    setIsCorrect(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

      if (selectedOption === null) {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= options.length) {
          e.preventDefault();
          checkAnswer(options[num - 1]);
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          nextExercise();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOption, options, checkAnswer, nextExercise]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Inversie Spel</h1>
      <p className="text-slate-600 mb-6">
        In het Nederlands staat het werkwoord altijd op de tweede plaats (V2-regel).
        Als de zin begint met iets anders dan het onderwerp, wisselen onderwerp en werkwoord van plaats.
      </p>

      <ScoreTracker score={score} total={answered} />

      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
        <div className="mb-6">
          <p className="text-sm text-slate-500 mb-2">De zin begint met:</p>
          <p className="text-xl font-bold text-blue-700">&quot;{current.starter}...&quot;</p>
          <p className="text-sm text-slate-500 mt-2">
            Onderwerp: <span className="font-medium text-slate-700">{current.subject}</span> |
            Werkwoord: <span className="font-medium text-slate-700">{current.verb}</span>
            {current.rest && <> | Rest: <span className="font-medium text-slate-700">{current.rest}</span></>}
          </p>
        </div>

        <p className="text-sm font-medium text-slate-700 mb-3">Kies de correcte zin:</p>

        <div className="space-y-3">
          {options.map((option, i) => {
            let buttonClass = 'w-full text-left p-4 rounded-lg border transition-all ';
            if (selectedOption === null) {
              buttonClass += 'border-slate-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer';
            } else if (option === current.correctSentence) {
              buttonClass += 'border-green-400 bg-green-50';
            } else if (option === selectedOption) {
              buttonClass += 'border-red-400 bg-red-50';
            } else {
              buttonClass += 'border-slate-200 opacity-50';
            }

            return (
              <button
                key={i}
                onClick={() => checkAnswer(option)}
                disabled={selectedOption !== null}
                className={buttonClass}
              >
                <span className="inline-flex items-center gap-3">
                  <span className="inline-block w-6 h-6 rounded bg-slate-100 border border-slate-300 text-xs font-mono text-slate-500 leading-6 text-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-slate-800">{option}</span>
                </span>
              </button>
            );
          })}
        </div>

        <FeedbackMessage
          isCorrect={isCorrect}
          correctAnswer={current.correctSentence}
        />

        {isCorrect !== null && (
          <div className="mt-4">
            <button
              onClick={nextExercise}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Volgende
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
