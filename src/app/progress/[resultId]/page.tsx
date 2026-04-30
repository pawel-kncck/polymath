import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAuth } from '@/lib/auth-utils';
import { getResultById } from '@/actions/results';
import { getContentModule } from '@/content';
import { getLocale, getMessages } from '@/i18n/server';
import { format } from '@/i18n/format';
import { resolveLocalized } from '@/lib/localize';
import { MistakesList } from '@/components/quiz/MistakesList';
import { ResponsesList } from '@/components/quiz/ResponsesList';
import { AppShell } from '@/components/shell/AppShell';
import type { Locale } from '@/i18n/config';
import type { MistakeDetail, ResponseDetail } from '@/types/quiz';

interface ReviewPageProps {
  params: Promise<{ resultId: string }>;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  await requireAuth();
  const { resultId } = await params;

  const result = await getResultById(resultId);
  if (!result) notFound();

  const t = await getMessages();
  const locale = await getLocale();

  const content = getContentModule(result.moduleId);
  const title = result.module
    ? resolveLocalized<string>(
        result.module.title,
        locale,
        (content?.languages.filter((l) => l !== locale) as Locale[]) ?? []
      )
    : t.progress.unknownModule;

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const percent =
    result.total > 0 ? Math.round((result.score / result.total) * 100) : 0;

  const mistakes = (Array.isArray(result.mistakes)
    ? result.mistakes
    : []) as MistakeDetail[];
  // New rows carry a denormalized log of every question answered. Legacy
  // rows only have `mistakes` — fall back to that view when responses is
  // missing so the history page still works for old tests.
  const responses = (Array.isArray(result.responses)
    ? result.responses
    : null) as ResponseDetail[] | null;

  return (
    <AppShell active="progress">
      <main className="container mx-auto max-w-2xl space-y-8 px-6 py-8">
        <Link
          href="/progress"
          className="text-sm text-gray-600 hover:underline dark:text-gray-400"
        >
          {t.progress.backToHistory}
        </Link>
        <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-800">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {dateFormatter.format(new Date(result.createdAt))}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {t.results.score}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {result.score}/{result.total}{' '}
                <span className="text-base font-medium text-gray-500">
                  ({percent}%)
                </span>
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {t.results.time}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatTime(result.time)}
              </div>
            </div>
            {result.level !== null && result.level !== undefined && (
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {t.fractions.levelLabel}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {result.level}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
            {responses
              ? t.progress.reviewAllQuestions
              : mistakes.length === 0
                ? t.progress.reviewNoMistakes
                : format(t.progress.reviewMistakeCount, {
                    n: mistakes.length,
                  })}
          </h3>
          {responses ? (
            <ResponsesList responses={responses} />
          ) : mistakes.length > 0 ? (
            <MistakesList mistakes={mistakes} />
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.progress.reviewPerfectHint}
            </p>
          )}
        </div>
      </main>
    </AppShell>
  );
}
