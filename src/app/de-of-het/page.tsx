'use client';

import { useState, useEffect } from 'react';
import { articleWords } from '@/data/articles';
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

const STORAGE_KEY = 'deOfHet_highScore';

export default function DeOfHet() {
  const [words] = useState(() => shuffleArray(articleWords));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setHighScore(parseInt(stored, 10));
  }, []);

  const currentWord = words[currentIndex % words.length];

  const handleChoice = (choice: 'de' | 'het') => {
    const correct = choice === currentWord.article;
    setIsCorrect(correct);
    setAnswered((a) => a + 1);

    if (correct) {
      const newScore = score + 1;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);

      if (newStreak > highScore) {
        setHighScore(newStreak);
        localStorage.setItem(STORAGE_KEY, String(newStreak));
      }
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setIsCorrect(null);
      setCurrentIndex((i) => i + 1);
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">De of Het?</h1>
      <p className="text-slate-600 mb-6">
        Kies het juiste lidwoord bij elk zelfstandig naamwoord.
      </p>

      <ScoreTracker score={score} total={answered} highScore={highScore} streak={streak} />

      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-8 text-center">
        <p className="text-sm text-slate-500 mb-2">Welk lidwoord hoort bij:</p>
        <p className="text-4xl font-bold text-slate-800 mb-2">{currentWord.word}</p>
        <p className="text-sm text-slate-400 mb-8">({currentWord.translation})</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleChoice('de')}
            disabled={isCorrect !== null}
            className="w-32 py-4 text-xl font-bold rounded-xl border-2 border-blue-300 bg-blue-50 text-blue-800 hover:bg-blue-100 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            de
          </button>
          <button
            onClick={() => handleChoice('het')}
            disabled={isCorrect !== null}
            className="w-32 py-4 text-xl font-bold rounded-xl border-2 border-teal-300 bg-teal-50 text-teal-800 hover:bg-teal-100 hover:border-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            het
          </button>
        </div>

        <FeedbackMessage
          isCorrect={isCorrect}
          correctAnswer={`${currentWord.article} ${currentWord.word}`}
        />
      </div>
    </div>
  );
}
