import Link from 'next/link';
import { auth, signOut } from '@/lib/auth';
import { getModules } from '@/actions/modules';
import { getUserModuleProgress, type ModuleProgress } from '@/actions/results';
import { getLocale, getMessages } from '@/i18n/server';
import { format, questionCount } from '@/i18n/format';
import { resolveLocalized } from '@/lib/localize';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { CATEGORY_ORDER, type ContentCategory } from '@/content/types';
import type { Locale } from '@/i18n/config';

export default async function HomePage() {
  const session = await auth();
  const modules = await getModules();
  const t = await getMessages();
  const locale = await getLocale();
  const progress: Record<string, ModuleProgress> = session?.user
    ? await getUserModuleProgress()
    : {};

  const grouped = new Map<ContentCategory, typeof modules>();
  for (const c of CATEGORY_ORDER) grouped.set(c, []);
  for (const m of modules) {
    const key = (CATEGORY_ORDER as string[]).includes(m.category)
      ? (m.category as ContentCategory)
      : 'GENERAL_KNOWLEDGE';
    grouped.get(key)!.push(m);
  }

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
                <Link
                  href="/progress"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  {t.progress.viewLink}
                </Link>
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

        {modules.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400">
              {format(t.home.emptyHint, { command: 'npm run db:seed' })}
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {CATEGORY_ORDER.map((category) => {
              const items = grouped.get(category) ?? [];
              if (items.length === 0) return null;
              const categoryLabel =
                t.categories[category as keyof typeof t.categories] ?? category;
              return (
                <section key={category} data-testid={`category-${category}`}>
                  <h3 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {categoryLabel}
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((module) => {
                      const fallbacks = module.languages.filter(
                        (l): l is Locale => l !== locale
                      ) as Locale[];
                      const title = resolveLocalized<string>(
                        module.title,
                        locale,
                        fallbacks
                      );
                      const description = resolveLocalized<string>(
                        module.description,
                        locale,
                        fallbacks
                      );
                      const p = progress[module.id];
                      const percent = p
                        ? Math.round(p.bestPercent * 100)
                        : null;

                      return (
                        <Link
                          key={module.id}
                          href={`/quiz/${module.id}`}
                          className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                        >
                          <div className="mb-4 flex items-center gap-2">
                            {module.languages.length === 1 && (
                              <span className="inline-block rounded-full border border-gray-300 px-2 py-0.5 text-[10px] font-semibold uppercase text-gray-600 dark:border-gray-600 dark:text-gray-400">
                                {module.languages[0]}
                              </span>
                            )}
                            {p ? (
                              <span
                                className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900 dark:text-green-200"
                                data-testid={`progress-badge-${module.id}`}
                              >
                                {t.progress.completedBadge} · {percent}%
                              </span>
                            ) : null}
                          </div>

                          <h4 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                            {title}
                          </h4>

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
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
