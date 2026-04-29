import Link from 'next/link';
import { getMessages } from '@/i18n/server';
import { format } from '@/i18n/format';

interface LevelPickerProps {
  moduleId: string;
  levels: number[];
  testSize: number;
  pool: Record<number, number>;
}

/**
 * Server component shown before the quiz starts on modules that declare
 * difficulty levels. Each button navigates to /quiz/{moduleId}?level=N which
 * triggers the actual sampling on the next render.
 */
export async function LevelPicker({
  moduleId,
  levels,
  testSize,
  pool,
}: LevelPickerProps) {
  const t = await getMessages();

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
          {t.fractions.chooseLevelTitle}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {format(t.fractions.chooseLevelDescription, { count: testSize })}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {levels.map((level) => {
          const count = pool[level] ?? 0;
          return (
            <Link
              key={level}
              href={`/quiz/${moduleId}?level=${level}`}
              data-testid={`level-option-${level}`}
              className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white px-6 py-8 text-center transition hover:border-blue-500 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400 dark:hover:bg-blue-950"
            >
              <span className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {t.fractions.levelLabel}
              </span>
              <span className="mt-1 text-4xl font-bold text-gray-900 dark:text-gray-100">
                {level}
              </span>
              <span className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                {format(t.fractions.poolSize, { count })}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
