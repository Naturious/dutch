'use client';

import { useState, useEffect, useCallback } from 'react';
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

interface MistakeEntry {
  word: string;
  correctArticle: string;
  chosenArticle: string;
  translation: string;
  timestamp: string;
  count: number;
}

interface CorrectEntry {
  word: string;
  article: string;
  translation: string;
  timestamp: string;
}

interface ProgressData {
  mistakes: Record<string, MistakeEntry>;
  correct: Record<string, CorrectEntry>;
}

async function fetchProgress(): Promise<ProgressData> {
  try {
    const res = await fetch('/api/progress');
    if (res.ok) return res.json();
  } catch {}
  return { mistakes: {}, correct: {} };
}

function saveProgress(data: ProgressData) {
  fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export default function DeOfHet() {
  const [words, setWords] = useState<typeof articleWords>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [mistakes, setMistakes] = useState<Record<string, MistakeEntry>>({});
  const [correctWords, setCorrectWords] = useState<Record<string, CorrectEntry>>({});
  const [showMistakes, setShowMistakes] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [ruleReminder, setRuleReminder] = useState<string | null>(null);

  useEffect(() => {
    fetchProgress().then((data) => {
      setMistakes(data.mistakes);
      setCorrectWords(data.correct);
      const remaining = articleWords.filter((w) => !data.correct[w.word]);
      setWords(shuffleArray(remaining.length > 0 ? remaining : articleWords));
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('deOfHet_highScore');
    if (stored) setHighScore(parseInt(stored, 10));
  }, []);

  const currentWord = words[currentIndex % (words.length || 1)];

  const handleChoice = useCallback((choice: 'de' | 'het') => {
    if (!currentWord) return;
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
        localStorage.setItem('deOfHet_highScore', String(newStreak));
      }

      setCorrectWords((prev) => {
        const updated = {
          ...prev,
          [currentWord.word]: {
            word: currentWord.word,
            article: currentWord.article,
            translation: currentWord.translation,
            timestamp: new Date().toISOString(),
          },
        };
        setMistakes((prevM) => {
          const { [currentWord.word]: _, ...restM } = prevM;
          saveProgress({ mistakes: restM, correct: updated });
          return restM;
        });
        return updated;
      });
    } else {
      setStreak(0);

      if (currentWord.rule) {
        setRuleReminder(currentWord.rule);
        setTimeout(() => setRuleReminder(null), 6000);
      }

      setMistakes((prev) => {
        const existing = prev[currentWord.word];
        const updated = {
          ...prev,
          [currentWord.word]: {
            word: currentWord.word,
            correctArticle: currentWord.article,
            chosenArticle: choice,
            translation: currentWord.translation,
            timestamp: new Date().toISOString(),
            count: (existing?.count || 0) + 1,
          },
        };
        setCorrectWords((prevC) => {
          const { [currentWord.word]: _, ...restC } = prevC;
          saveProgress({ mistakes: updated, correct: restC });
          return restC;
        });
        return updated;
      });
    }

    setTimeout(() => {
      setIsCorrect(null);
      setCurrentIndex((i) => i + 1);
    }, correct ? 400 : 1500);
  }, [currentWord, score, streak, highScore]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCorrect !== null) return;
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

      if (e.key === '1' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handleChoice('de');
      } else if (e.key === '2' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleChoice('het');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCorrect, handleChoice]);

  if (!loaded || !currentWord) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-slate-400">Laden...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">De of Het?</h1>
      <p className="text-slate-600 mb-6">
        Kies het juiste lidwoord bij elk zelfstandig naamwoord.
      </p>

      <ScoreTracker score={score} total={answered} highScore={highScore} streak={streak} />

      {ruleReminder && (
        <div className="mt-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 animate-pulse">
          <span className="text-amber-600 text-lg leading-none">💡</span>
          <p className="text-sm text-amber-800 font-medium">{ruleReminder}</p>
        </div>
      )}

      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-8 text-center">
        <p className="text-sm text-slate-500 mb-2">Welk lidwoord hoort bij:</p>
        <p className="text-4xl font-bold text-slate-800 mb-2">{currentWord.word}</p>
        <p className="text-sm text-slate-400 mb-8">({currentWord.translation})</p>

        <div className="flex justify-center gap-4">
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleChoice('de')}
              disabled={isCorrect !== null}
              className="w-32 py-4 text-xl font-bold rounded-xl border-2 border-blue-300 bg-blue-50 text-blue-800 hover:bg-blue-100 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              de
            </button>
            <span className="mt-1 text-xs text-slate-400">&larr; 1</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleChoice('het')}
              disabled={isCorrect !== null}
              className="w-32 py-4 text-xl font-bold rounded-xl border-2 border-teal-300 bg-teal-50 text-teal-800 hover:bg-teal-100 hover:border-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              het
            </button>
            <span className="mt-1 text-xs text-slate-400">&rarr; 2</span>
          </div>
        </div>

        <FeedbackMessage
          isCorrect={isCorrect}
          correctAnswer={`${currentWord.article} ${currentWord.word}`}
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span>{Object.keys(correctWords).length} geleerd</span>
          <span>&middot;</span>
          <span>{Object.keys(mistakes).length} fouten</span>
          <span>&middot;</span>
          <span>{articleWords.length - Object.keys(correctWords).length} over</span>
        </div>
        <div className="flex gap-2">
          {Object.keys(mistakes).length > 0 && (
            <button
              onClick={() => setShowMistakes(!showMistakes)}
              className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
            >
              {showMistakes ? 'Verberg fouten' : 'Toon fouten'}
            </button>
          )}
          <button
            onClick={() => {
              const data = {
                mistakes: Object.values(mistakes),
                correct: Object.values(correctWords),
                exportedAt: new Date().toISOString(),
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `de-het-progress-${new Date().toISOString().slice(0, 10)}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Exporteer JSON
          </button>
        </div>
      </div>

      {showMistakes && Object.keys(mistakes).length > 0 && (
        <div className="mt-4 bg-white rounded-xl border border-slate-200 p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            Woorden om te oefenen ({Object.keys(mistakes).length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.values(mistakes)
              .sort((a, b) => b.count - a.count)
              .map((m) => (
                <div
                  key={m.word}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-red-50 border border-red-100"
                >
                  <span className="text-sm text-slate-800">
                    <span className="font-semibold text-red-700">{m.correctArticle}</span> {m.word}
                    <span className="text-slate-400 ml-1">({m.translation})</span>
                  </span>
                  <span className="text-xs text-red-500 font-medium">{m.count}x</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
