import Link from 'next/link';
import { auth, signOut } from '@/lib/auth';
import { getModules } from '@/actions/modules';
import { getLocale, getMessages } from '@/i18n/server';
import { format, questionCount } from '@/i18n/format';
import { resolveLocalized } from '@/lib/localize';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import type { Locale } from '@/i18n/config';

export default async function HomePage() {
  const session = await auth();
  const modules = await getModules();
  const t = await getMessages();
  const locale = await getLocale();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t.common.appName}
          </h1>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            {session?.user ? (
              <div className="flex items-center gap-4">
                {session.user.role === 'ADMIN' && (
                  <Link
                    href="/admin/users"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {t.common.admin}
                  </Link>
                )}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {session.user.name || session.user.email}
                </span>
                <form
                  action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/' });
                  }}
                >
                  <button
                    type="submit"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    {t.common.signOut}
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/signin"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                {t.common.signIn}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t.home.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{t.home.subtitle}</p>
        </div>

        {/* Modules grid */}
        {modules.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => {
              const fallbacks = module.languages.filter(
                (l): l is Locale => l !== locale
              ) as Locale[];
              const title = resolveLocalized<string>(module.title, locale, fallbacks);
              const description = resolveLocalized<string>(
                module.description,
                locale,
                fallbacks
              );
              const subjectLabel =
                t.subjects[module.subject as keyof typeof t.subjects] ?? module.subject;

              return (
                <Link
                  key={module.id}
                  href={`/quiz/${module.id}`}
                  className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {subjectLabel}
                    </span>
                    {module.languages.length === 1 && (
                      <span className="inline-block rounded-full border border-gray-300 px-2 py-0.5 text-[10px] font-semibold uppercase text-gray-600 dark:border-gray-600 dark:text-gray-400">
                        {module.languages[0]}
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                    {title}
                  </h3>

                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    {description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                    <span>
                      {questionCount(locale, module._count.items, t.home)}
                    </span>
                    <span className="text-blue-600 group-hover:underline dark:text-blue-400">
                      {t.home.startQuiz}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400">
              {format(t.home.emptyHint, { command: 'npm run db:seed' })}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
