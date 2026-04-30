'use client';

import type { ResponseDetail } from '@/types/quiz';
import { useT } from '@/i18n/provider';
import { format } from '@/i18n/format';

interface ResponsesListProps {
  responses: ResponseDetail[];
}

/**
 * Full-history view of every question in a completed test. Correct rows are
 * tinted green, incorrect rows red. The text is the denormalized snapshot
 * captured at save time — stable even if the source bank later changes.
 */
export function ResponsesList({ responses }: ResponsesListProps) {
  const t = useT();
  if (responses.length === 0) return null;

  return (
    <div className="space-y-3">
      {responses.map((r, index) => {
        const wrapperClass = r.correct
          ? 'rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950'
          : 'rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950';
        const headerClass = r.correct
          ? 'mb-2 text-sm font-semibold text-green-900 dark:text-green-100'
          : 'mb-2 text-sm font-semibold text-red-900 dark:text-red-100';
        const userColor = r.correct
          ? 'text-green-700 dark:text-green-300'
          : 'text-red-700 dark:text-red-300';

        return (
          <div key={`${r.itemId}-${index}`} className={wrapperClass}>
            <div className={headerClass}>
              {format(t.results.questionNumber, { n: index + 1 })}: {r.prompt}
            </div>
            <div className="space-y-1 text-sm">
              <div className={userColor}>
                {t.results.yourAnswer}:{' '}
                <span className="font-semibold">{r.userAnswer}</span>
                {r.correct ? (
                  <span className="ml-2 text-xs uppercase tracking-wide text-green-600 dark:text-green-400">
                    ✓ {t.results.correctTag}
                  </span>
                ) : null}
              </div>
              {!r.correct && (
                <div className="text-green-700 dark:text-green-300">
                  {t.results.correctAnswer}:{' '}
                  <span className="font-semibold">{r.correctAnswer}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
