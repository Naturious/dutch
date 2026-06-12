'use client';

interface FeedbackMessageProps {
  isCorrect: boolean | null;
  correctAnswer?: string;
}

export default function FeedbackMessage({ isCorrect, correctAnswer }: FeedbackMessageProps) {
  if (isCorrect === null) return null;

  if (isCorrect) {
    return (
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 font-semibold">Goed zo! Dat is correct!</p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-800 font-semibold">Helaas, dat is niet juist.</p>
      {correctAnswer && (
        <p className="text-red-700 mt-1">
          Het juiste antwoord is: <span className="font-mono font-bold">{correctAnswer}</span>
        </p>
      )}
    </div>
  );
}
