'use client';

import { useState, useMemo, useRef } from 'react';
import { sentences, SentenceExercise } from '@/data/sentences';
import FeedbackMessage from '@/components/FeedbackMessage';
import ScoreTracker from '@/components/ScoreTracker';

interface HistoryEntry {
  exercise: SentenceExercise;
  userAnswer: string;
  wasCorrect: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ZinnenBouwen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [exerciseOrder] = useState(() => shuffleArray(sentences));
  const [shuffleKey, setShuffleKey] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [historyFilter, setHistoryFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const currentExercise: SentenceExercise = exerciseOrder[currentIndex % exerciseOrder.length];

  const displayWords = useMemo(() => {
    void shuffleKey;
    return shuffleArray(currentExercise.words);
  }, [currentExercise, shuffleKey]);

  const normalize = (s: string) => s.trim().toLowerCase().replace(/[.!?]+$/, '').replace(/\s+/g, ' ');

  const checkAnswer = () => {
    const correct = normalize(userInput) === normalize(currentExercise.correctSentence);
    setIsCorrect(correct);
    setAnswered((a) => a + 1);
    if (correct) {
      setScore((s) => s + 1);
    }
    setHistory((h) => [
      { exercise: currentExercise, userAnswer: userInput, wasCorrect: correct },
      ...h,
    ]);
  };

  const nextExercise = () => {
    setCurrentIndex((i) => (i + 1) % exerciseOrder.length);
    setUserInput('');
    setIsCorrect(null);
    setShuffleKey((k) => k + 1);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const filteredHistory = history.filter((entry) => {
    if (historyFilter === 'correct') return entry.wasCorrect;
    if (historyFilter === 'incorrect') return !entry.wasCorrect;
    return true;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Zinnen Bouwen</h1>
      <p className="text-slate-600 mb-6">
        Maak een correcte zin van de gegeven woorden. Vervoeg het werkwoord zelf in de juiste tijd!
      </p>

      <ScoreTracker score={score} total={answered} />

      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
            {currentExercise.tense}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {displayWords.map((word, i) => (
            <span
              key={i}
              className="inline-block bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium"
            >
              {word}
            </span>
          ))}
        </div>

        {currentExercise.hint && (
          <p className="text-sm text-slate-500 mb-4 italic">
            Tip: {currentExercise.hint}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => { if (isCorrect === null) setUserInput(e.target.value); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && isCorrect === null && userInput.trim()) checkAnswer();
              if (e.key === 'Enter' && isCorrect !== null) nextExercise();
            }}
            placeholder="Typ je zin hier..."
            className="flex-1 border border-slate-300 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          {isCorrect === null ? (
            <button
              onClick={checkAnswer}
              disabled={!userInput.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Controleer
            </button>
          ) : (
            <button
              onClick={nextExercise}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Volgende
            </button>
          )}
        </div>

        <FeedbackMessage
          isCorrect={isCorrect}
          correctAnswer={currentExercise.correctSentence}
        />
      </div>

      {/* History Section */}
      {history.length > 0 && (
        <div className="mt-8">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 text-slate-700 font-medium hover:text-slate-900 transition-colors"
          >
            <span className={`transform transition-transform ${showHistory ? 'rotate-90' : ''}`}>
              &#9654;
            </span>
            Geschiedenis ({history.length} zinnen)
          </button>

          {showHistory && (
            <div className="mt-4">
              <div className="flex gap-2 mb-4">
                {(['all', 'correct', 'incorrect'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setHistoryFilter(filter)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      historyFilter === filter
                        ? 'bg-slate-800 text-white border-slate-800'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {filter === 'all' && 'Alle'}
                    {filter === 'correct' && `Goed (${history.filter(h => h.wasCorrect).length})`}
                    {filter === 'incorrect' && `Fout (${history.filter(h => !h.wasCorrect).length})`}
                  </button>
                ))}
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredHistory.map((entry, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg border ${
                      entry.wasCorrect
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-500">
                        {entry.exercise.tense}
                      </span>
                      <span className={`text-xs font-bold ${entry.wasCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                        {entry.wasCorrect ? 'GOED' : 'FOUT'}
                      </span>
                    </div>
                    {!entry.wasCorrect && (
                      <p className="text-sm text-red-700 line-through mb-1">
                        {entry.userAnswer}
                      </p>
                    )}
                    <p className="text-sm font-medium text-slate-800">
                      {entry.exercise.correctSentence}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
