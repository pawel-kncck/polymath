'use client';

import Link from 'next/link';
import type { QuizResult } from '@/types/quiz';
import { MistakesList } from './MistakesList';
import { useT } from '@/i18n/provider';

interface QuizResultsProps {
  result: QuizResult;
  onRetry: () => void;
  onBack: () => void;
  reviewHref?: string | null;
}

export function QuizResults({
  result,
  onRetry,
  onBack,
  reviewHref,
}: QuizResultsProps) {
  const t = useT();
  const percentage = Math.round((result.score / result.total) * 100);
  const isPerfect = result.score === result.total;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = () => {
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <div className="rounded-lg bg-white p-8 text-center shadow-lg dark:bg-gray-800">
        {isPerfect && <div className="mb-4 text-6xl">🎉</div>}

        <h2 className="mb-4 text-3xl font-bold">{t.results.complete}</h2>

        <div className={`mb-6 text-6xl font-bold ${getScoreColor()}`}>
          {percentage}%
        </div>

        <div className="space-y-2 text-lg text-gray-600 dark:text-gray-400">
          <p>
            {t.results.score}:{' '}
            <span className="font-semibold">
              {result.score}/{result.total}
            </span>
          </p>
          <p>
            {t.results.time}:{' '}
            <span className="font-semibold">{formatTime(result.time)}</span>
          </p>
        </div>
      </div>

      {result.mistakes.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h3 className="mb-4 text-xl font-bold">{t.results.reviewMistakes}</h3>
          <MistakesList mistakes={result.mistakes} />
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        <button
          onClick={onRetry}
          className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {t.results.tryAgain}
        </button>
        <button
          onClick={onBack}
          className="flex-1 rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          {t.results.chooseAnother}
        </button>
      </div>
      {reviewHref && (
        <div className="text-center">
          <Link
            href={reviewHref}
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {t.results.openReview}
          </Link>
        </div>
      )}
    </div>
  );
}
