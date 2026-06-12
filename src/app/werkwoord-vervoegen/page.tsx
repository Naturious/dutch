'use client';

import { useState } from 'react';
import { verbs, VerbConjugation } from '@/data/verbs';
import FeedbackMessage from '@/components/FeedbackMessage';
import ScoreTracker from '@/components/ScoreTracker';

type Person = 'ik' | 'jij' | 'hij' | 'wij' | 'jullie' | 'zij';
type Tense = 'presens' | 'imperfectum';

const persons: Person[] = ['ik', 'jij', 'hij', 'wij', 'jullie', 'zij'];
const tenses: { key: Tense; label: string }[] = [
  { key: 'presens', label: 'Presens (OTT)' },
  { key: 'imperfectum', label: 'Imperfectum (OVT)' },
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateQuestion() {
  const verb = getRandomItem(verbs);
  const person = getRandomItem(persons);
  const tense = getRandomItem(tenses);
  return { verb, person, tense };
}

export default function WerkwoordVervoegen() {
  const [question, setQuestion] = useState(generateQuestion);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  const getCorrectAnswer = (verb: VerbConjugation, person: Person, tense: Tense): string => {
    return verb[tense][person];
  };

  const correctAnswer = getCorrectAnswer(question.verb, question.person as Person, question.tense.key);

  const checkAnswer = () => {
    const correct = userInput.trim().toLowerCase() === correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setAnswered((a) => a + 1);
    if (correct) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    setQuestion(generateQuestion());
    setUserInput('');
    setIsCorrect(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Werkwoord Vervoegen</h1>
      <p className="text-slate-600 mb-6">
        Vervoeg het werkwoord in de juiste persoon en tijd.
      </p>

      <ScoreTracker score={score} total={answered} />

      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
            {question.tense.label}
          </span>
          <span className="inline-block bg-slate-100 text-slate-800 text-xs font-medium px-3 py-1 rounded-full">
            {question.verb.type}
          </span>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-slate-500 mb-1">Werkwoord:</p>
          <p className="text-3xl font-bold text-slate-800 mb-1">{question.verb.infinitive}</p>
          <p className="text-sm text-slate-400">({question.verb.translation})</p>
        </div>

        <div className="text-center mb-6">
          <p className="text-lg text-slate-700">
            <span className="font-bold text-blue-700">{question.person}</span> + {question.verb.infinitive} ({question.tense.label})
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && isCorrect === null) checkAnswer();
              if (e.key === 'Enter' && isCorrect !== null) nextQuestion();
            }}
            placeholder="Typ de vervoeging..."
            className="flex-1 border border-slate-300 rounded-lg px-4 py-2 text-slate-800 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            disabled={isCorrect !== null}
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
              onClick={nextQuestion}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Volgende
            </button>
          )}
        </div>

        <FeedbackMessage
          isCorrect={isCorrect}
          correctAnswer={`${question.person} ${correctAnswer}`}
        />
      </div>
    </div>
  );
}
