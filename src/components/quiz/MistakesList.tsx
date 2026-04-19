'use client';

import type { MistakeDetail } from '@/types/quiz';
import { useT } from '@/i18n/provider';
import { format } from '@/i18n/format';

interface MistakesListProps {
  mistakes: MistakeDetail[];
}

export function MistakesList({ mistakes }: MistakesListProps) {
  const t = useT();

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
            {format(t.results.questionNumber, { n: index + 1 })}: {mistake.prompt}
          </div>
          <div className="space-y-1 text-sm">
            <div className="text-red-700 dark:text-red-300">
              {t.results.yourAnswer}:{' '}
              <span className="font-semibold">{mistake.userAnswer}</span>
            </div>
            <div className="text-green-700 dark:text-green-300">
              {t.results.correctAnswer}:{' '}
              <span className="font-semibold">{mistake.correctAnswer}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
