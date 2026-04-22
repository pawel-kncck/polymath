import Link from 'next/link';
import { requireAuth } from '@/lib/auth-utils';
import { getUserResults } from '@/actions/results';
import { getLocale, getMessages } from '@/i18n/server';
import { resolveLocalized } from '@/lib/localize';
import type { Locale } from '@/i18n/config';
import type { ContentCategory } from '@/content/types';
import { getContentModule } from '@/content';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default async function ProgressPage() {
  await requireAuth();
  const t = await getMessages();
  const locale = await getLocale();
  const results = await getUserResults();

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t.common.appName}
          </h1>
          <Link
            href="/"
            className="text-sm text-gray-600 hover:underline dark:text-gray-400"
          >
            {t.progress.backToHome}
          </Link>
        </div>
      </header>

      <main className="container mx-auto space-y-8 px-4 py-8">
        <div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t.progress.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t.progress.subtitle}
          </p>
        </div>

        {results.length === 0 ? (
          <div
            className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800"
            data-testid="progress-empty"
          >
            <p className="text-gray-600 dark:text-gray-400">{t.progress.empty}</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    {t.progress.columnModule}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    {t.progress.columnCategory}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    {t.progress.columnScore}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    {t.progress.columnTime}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    {t.progress.columnDate}
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => {
                  const content = getContentModule(r.moduleId);
                  const title = r.module
                    ? resolveLocalized<string>(
                        r.module.title,
                        locale,
                        (content?.languages.filter(
                          (l) => l !== locale
                        ) as Locale[]) ?? []
                      )
                    : t.progress.unknownModule;
                  const category = content?.category as
                    | ContentCategory
                    | undefined;
                  const categoryLabel = category
                    ? t.categories[category as keyof typeof t.categories] ??
                      category
                    : '—';
                  const percent =
                    r.total > 0 ? Math.round((r.score / r.total) * 100) : 0;
                  return (
                    <tr
                      key={r.id}
                      className="border-b border-gray-100 last:border-0 dark:border-gray-700"
                      data-testid="progress-row"
                    >
                      <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                        {title}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {categoryLabel}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {r.score}/{r.total}{' '}
                        <span className="text-gray-500">({percent}%)</span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {formatTime(r.time)}
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                        {dateFormatter.format(new Date(r.createdAt))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
