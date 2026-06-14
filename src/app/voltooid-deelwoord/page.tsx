'use client';

import { useState, useRef } from 'react';
import { pastParticiples, PastParticipleExercise } from '@/data/past-participles';
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

export default function VoltooidDeelwoord() {
  const [exercises] = useState(() => shuffleArray(pastParticiples));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const current: PastParticipleExercise = exercises[currentIndex % exercises.length];

  const checkAnswer = () => {
    const correct = userInput.trim().toLowerCase() === current.pastParticiple.toLowerCase();
    setIsCorrect(correct);
    setAnswered((a) => a + 1);
    if (correct) setScore((s) => s + 1);
  };

  const nextExercise = () => {
    setCurrentIndex((i) => i + 1);
    setUserInput('');
    setIsCorrect(null);
    setShowHint(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Voltooid Deelwoord</h1>
      <p className="text-slate-600 mb-6">
        Vorm het voltooid deelwoord van het werkwoord. Denk aan de regel:
        &apos;t kofschip = ge-...-t, anders ge-...-d. Onregelmatige werkwoorden moet je uit je hoofd leren!
      </p>

      <ScoreTracker score={score} total={answered} />

      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
            {current.type}
          </span>
          <span className="inline-block bg-slate-100 text-slate-800 text-xs font-medium px-3 py-1 rounded-full">
            hulpwerkwoord: {current.auxiliaryVerb}
          </span>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-slate-500 mb-1">Infinitief:</p>
          <p className="text-3xl font-bold text-slate-800 mb-1">{current.infinitive}</p>
          <p className="text-sm text-slate-400">({current.translation})</p>
        </div>

        <div className="text-center mb-6">
          <p className="text-lg text-slate-600">
            Ik <span className="font-medium text-blue-700">{current.auxiliaryVerb === 'hebben' ? 'heb' : 'ben'}</span> ... <span className="text-slate-400">(voltooid deelwoord)</span>
          </p>
        </div>

        {!showHint && current.rule && isCorrect === null && (
          <div className="text-center mb-4">
            <button
              onClick={() => setShowHint(true)}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Toon tip
            </button>
          </div>
        )}

        {showHint && current.rule && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-center">
            <p className="text-sm text-amber-800">{current.rule}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => { if (isCorrect === null) setUserInput(e.target.value); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && isCorrect === null && userInput.trim()) checkAnswer();
              if (e.key === 'Enter' && isCorrect !== null) nextExercise();
            }}
            placeholder="Typ het voltooid deelwoord..."
            className="flex-1 border border-slate-300 rounded-lg px-4 py-2 text-slate-800 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
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
          correctAnswer={current.pastParticiple}
        />
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="font-bold text-amber-800 mb-2">Regels voor het voltooid deelwoord:</h3>
        <ul className="text-sm text-amber-900 space-y-1">
          <li><strong>Regulier:</strong> ge- + stam + -t of -d</li>
          <li><strong>&apos;t kofschip:</strong> als de stam eindigt op t, k, f, s, ch, of p, dan eindigt het voltooid deelwoord op -t</li>
          <li><strong>Anders:</strong> het voltooid deelwoord eindigt op -d</li>
          <li><strong>Onregelmatig:</strong> deze moet je uit je hoofd leren (vaak ge-...-en)</li>
        </ul>
      </div>
    </div>
  );
}
