'use client';

interface ScoreTrackerProps {
  score: number;
  total: number;
  highScore?: number;
  streak?: number;
}

export default function ScoreTracker({ score, total, highScore, streak }: ScoreTrackerProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center text-sm">
      <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
        <span className="text-blue-600 font-medium">Score:</span>{' '}
        <span className="text-blue-800 font-bold">{score}/{total}</span>
      </div>
      {highScore !== undefined && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
          <span className="text-amber-600 font-medium">Hoogste score:</span>{' '}
          <span className="text-amber-800 font-bold">{highScore}</span>
        </div>
      )}
      {streak !== undefined && streak > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
          <span className="text-emerald-600 font-medium">Reeks:</span>{' '}
          <span className="text-emerald-800 font-bold">{streak}</span>
        </div>
      )}
    </div>
  );
}
