import type { MistakeDetail } from '@/types/quiz';

interface MistakesListProps {
  mistakes: MistakeDetail[];
}

export function MistakesList({ mistakes }: MistakesListProps) {
  if (mistakes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {mistakes.map((mistake, index) => (
        <div
          key={mistake.itemId}
          className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950"
        >
          <div className="mb-2 text-sm font-semibold text-red-900 dark:text-red-100">
            Question {index + 1}: {mistake.prompt}
          </div>
          <div className="space-y-1 text-sm">
            <div className="text-red-700 dark:text-red-300">
              Your answer: <span className="font-semibold">{mistake.userAnswer}</span>
            </div>
            <div className="text-green-700 dark:text-green-300">
              Correct answer: <span className="font-semibold">{mistake.correctAnswer}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
