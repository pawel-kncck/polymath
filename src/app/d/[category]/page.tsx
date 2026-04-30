import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAuth } from '@/lib/auth-utils';
import { getModules } from '@/actions/modules';
import {
  getUserModuleProgress,
  type ModuleProgress,
} from '@/actions/results';
import { getLocale, getMessages } from '@/i18n/server';
import { format, questionCount } from '@/i18n/format';
import { resolveLocalized } from '@/lib/localize';
import { AppShell } from '@/components/shell/AppShell';
import { CATEGORY_ORDER, type ContentCategory } from '@/content/types';
import { getArea } from '@/content/areas';
import type { Locale } from '@/i18n/config';

interface DomainPageProps {
  params: Promise<{ category: string }>;
}

function isCategory(value: string): value is ContentCategory {
  return (CATEGORY_ORDER as string[]).includes(value);
}

export default async function DomainPage({ params }: DomainPageProps) {
  await requireAuth();
  const { category } = await params;
  if (!isCategory(category)) notFound();

  const t = await getMessages();
  const locale = await getLocale();
  const allModules = await getModules();
  const modulesInDomain = allModules.filter((m) => m.category === category);
  const progress: Record<string, ModuleProgress> =
    await getUserModuleProgress();

  const categoryLabel =
    t.categories[category as keyof typeof t.categories] ?? category;

  // Group modules in this domain by Area. Insertion order follows the
  // existing display order from getModules() (which mirrors the registry
  // order in src/content/index.ts), so areas appear in a stable sequence.
  type DomainModule = (typeof modulesInDomain)[number];
  type AreaGroup = { areaId: string; areaTitle: string; modules: DomainModule[] };
  const groups = new Map<string, AreaGroup>();
  for (const m of modulesInDomain) {
    const fallbacks = m.languages.filter(
      (l): l is Locale => l !== locale
    ) as Locale[];
    const moduleTitle = resolveLocalized<string>(m.title, locale, fallbacks);
    const area = m.areaId ? getArea(m.areaId) : null;
    const areaId = m.areaId ?? `__module:${m.id}`;
    const areaTitle = area
      ? resolveLocalized<string>(area.title, locale, fallbacks)
      : moduleTitle;
    let group = groups.get(areaId);
    if (!group) {
      group = { areaId, areaTitle, modules: [] };
      groups.set(areaId, group);
    }
    group.modules.push(m);
  }

  return (
    <AppShell currentCategory={category}>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {categoryLabel}
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {t.home.subtitle}
          </p>
        </div>

        {modulesInDomain.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400">
              {t.shell.noModulesInDomain}
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {Array.from(groups.values()).map((group) => (
              <section key={group.areaId}>
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {group.areaTitle}
                </h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {group.modules.map((module) => {
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
                    const avgPercent =
                      p && p.attempts > 0
                        ? Math.round(p.avgPercent * 100)
                        : null;
                    const avgTime = p && p.attempts > 0 ? p.avgTime : null;

                    return (
                      <Link
                        key={module.id}
                        href={`/quiz/${module.id}`}
                        className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                      >
                        <div className="mb-3 flex items-center gap-2">
                          {module.languages.length === 1 && (
                            <span className="inline-block rounded-full border border-gray-300 px-2 py-0.5 text-[10px] font-semibold uppercase text-gray-600 dark:border-gray-600 dark:text-gray-400">
                              {module.languages[0]}
                            </span>
                          )}
                        </div>

                        <h4 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                          {title}
                        </h4>
                        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                          {description}
                        </p>

                        <div className="mb-3 text-xs text-gray-500 dark:text-gray-500">
                          {questionCount(locale, module._count.items, t.home)}
                        </div>

                        {p && p.attempts > 0 ? (
                          <dl
                            data-testid={`module-stats-${module.id}`}
                            className="grid grid-cols-3 gap-2 rounded-md bg-gray-50 px-3 py-2 text-center text-xs dark:bg-gray-900"
                          >
                            <div>
                              <dt className="text-gray-500 dark:text-gray-400">
                                {t.shell.statAttempts}
                              </dt>
                              <dd className="font-semibold text-gray-900 dark:text-gray-100">
                                {p.attempts}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-gray-500 dark:text-gray-400">
                                {t.shell.statAvgScore}
                              </dt>
                              <dd className="font-semibold text-gray-900 dark:text-gray-100">
                                {avgPercent}%
                              </dd>
                            </div>
                            <div>
                              <dt className="text-gray-500 dark:text-gray-400">
                                {t.shell.statAvgTime}
                              </dt>
                              <dd className="font-semibold text-gray-900 dark:text-gray-100">
                                {format(t.shell.secondsShort, {
                                  n: avgTime ?? 0,
                                })}
                              </dd>
                            </div>
                          </dl>
                        ) : (
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {t.shell.noAttemptsYet}
                          </p>
                        )}

                        <div className="mt-4 text-right text-sm text-blue-600 group-hover:underline dark:text-blue-400">
                          {t.home.startQuiz}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
