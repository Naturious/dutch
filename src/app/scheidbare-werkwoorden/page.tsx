'use client';

import { useState, useRef } from 'react';
import { separableVerbs } from '@/data/separable-verbs';
import FeedbackMessage from '@/components/FeedbackMessage';
import ScoreTracker from '@/components/ScoreTracker';

interface FlatExercise {
  verbName: string;
  prefix: string;
  translation: string;
  tense: string;
  sentence: string;
  answer: string;
  hint?: string;
}

function buildExercises(): FlatExercise[] {
  const all: FlatExercise[] = [];
  for (const verb of separableVerbs) {
    for (const ex of verb.exercises) {
      all.push({
        verbName: verb.verb,
        prefix: verb.prefix,
        translation: verb.translation,
        tense: ex.tense,
        sentence: ex.sentence,
        answer: ex.answer,
        hint: ex.hint,
      });
    }
  }
  return all;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ScheidbareWerkwoorden() {
  const [exercises] = useState(() => shuffleArray(buildExercises()));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const current = exercises[currentIndex % exercises.length];

  const normalize = (s: string) => s.trim().toLowerCase().replace(/[.!?]+$/, '').replace(/\s+/g, ' ');

  const checkAnswer = () => {
    const correct = normalize(userInput) === normalize(current.answer);
    setIsCorrect(correct);
    setAnswered((a) => a + 1);
    if (correct) setScore((s) => s + 1);
  };

  const nextExercise = () => {
    setCurrentIndex((i) => i + 1);
    setUserInput('');
    setIsCorrect(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Scheidbare Werkwoorden</h1>
      <p className="text-slate-600 mb-6">
        Scheidbare werkwoorden splitsen in de presens (prefix gaat naar het einde),
        maar blijven samen in het perfectum (prefix + ge + stam).
      </p>

      <ScoreTracker score={score} total={answered} />

      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
            {current.tense}
          </span>
          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
            {current.verbName}
          </span>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-slate-500 mb-1">Werkwoord:</p>
          <p className="text-2xl font-bold text-slate-800">
            <span className="text-purple-600">{current.prefix}</span>
            {current.verbName.slice(current.prefix.length)}
          </p>
          <p className="text-sm text-slate-400">({current.translation})</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
          <p className="text-slate-700 text-lg text-center font-mono">{current.sentence}</p>
        </div>

        {current.hint && (
          <p className="text-sm text-slate-500 mb-4 italic text-center">
            Tip: {current.hint}
          </p>
        )}

        <p className="text-sm text-slate-600 mb-3 text-center">Schrijf de volledige zin:</p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => { if (isCorrect === null) setUserInput(e.target.value); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && isCorrect === null && userInput.trim()) checkAnswer();
              if (e.key === 'Enter' && isCorrect !== null) nextExercise();
            }}
            placeholder="Typ de volledige zin..."
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
          correctAnswer={current.answer}
        />
      </div>
    </div>
  );
}
