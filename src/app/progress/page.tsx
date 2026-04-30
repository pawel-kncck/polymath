import Link from 'next/link';
import { requireAuth } from '@/lib/auth-utils';
import { getUserResults } from '@/actions/results';
import { getLocale, getMessages } from '@/i18n/server';
import { resolveLocalized } from '@/lib/localize';
import type { Locale } from '@/i18n/config';
import { CATEGORY_ORDER, type ContentCategory } from '@/content/types';
import { getContentModule } from '@/content';
import { getArea } from '@/content/areas';
import { AppShell } from '@/components/shell/AppShell';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

interface RowVM {
  id: string;
  moduleTitle: string;
  level: number | null;
  score: number;
  total: number;
  percent: number;
  time: number;
  createdAt: Date;
  category: ContentCategory | null;
  areaId: string | null;
  areaTitle: string;
}

export default async function ProgressPage() {
  await requireAuth();
  const t = await getMessages();
  const locale = await getLocale();
  const results = await getUserResults();

  // Compact date — drops time-of-day so the row fits without horizontal
  // overflow on phones. e.g. "30 Apr" / "2026-04-30" depending on locale.
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  });

  // Hydrate each result row with its module + area metadata, then group.
  const rows: RowVM[] = results.map((r) => {
    const content = getContentModule(r.moduleId);
    const fallbacks =
      (content?.languages.filter((l) => l !== locale) as Locale[]) ?? [];
    const moduleTitle = r.module
      ? resolveLocalized<string>(r.module.title, locale, fallbacks)
      : t.progress.unknownModule;
    const area = content?.areaId ? getArea(content.areaId) : null;
    const areaTitle = area
      ? resolveLocalized<string>(area.title, locale, fallbacks)
      : moduleTitle;
    return {
      id: r.id,
      moduleTitle,
      level: r.level,
      score: r.score,
      total: r.total,
      percent: r.total > 0 ? Math.round((r.score / r.total) * 100) : 0,
      time: r.time,
      createdAt: new Date(r.createdAt),
      category: (content?.category as ContentCategory | undefined) ?? null,
      areaId: content?.areaId ?? null,
      areaTitle,
    };
  });

  // Group: domain → area → rows. Map preserves insertion order; we drive the
  // outer iteration via CATEGORY_ORDER so the rendered order is stable.
  type AreaGroup = { areaTitle: string; rows: RowVM[] };
  const byDomain = new Map<string, Map<string, AreaGroup>>();
  for (const row of rows) {
    const domainKey = row.category ?? '__unknown__';
    const areaKey = row.areaId ?? row.moduleTitle;
    let areas = byDomain.get(domainKey);
    if (!areas) {
      areas = new Map();
      byDomain.set(domainKey, areas);
    }
    let group = areas.get(areaKey);
    if (!group) {
      group = { areaTitle: row.areaTitle, rows: [] };
      areas.set(areaKey, group);
    }
    group.rows.push(row);
  }

  const orderedDomains = [
    ...CATEGORY_ORDER.filter((c) => byDomain.has(c)),
    ...Array.from(byDomain.keys()).filter(
      (k) => !(CATEGORY_ORDER as readonly string[]).includes(k)
    ),
  ];

  return (
    <AppShell active="progress">
      <main className="container mx-auto space-y-8 px-4 py-8 sm:px-6">
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
          <div className="space-y-8">
            {orderedDomains.map((domainKey) => {
              const areas = byDomain.get(domainKey)!;
              const domainLabel =
                domainKey === '__unknown__'
                  ? t.progress.unknownModule
                  : (t.categories[
                      domainKey as keyof typeof t.categories
                    ] ?? domainKey);
              return (
                <section key={domainKey} className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {domainLabel}
                  </h3>
                  <div className="space-y-4">
                    {Array.from(areas.entries()).map(([areaKey, group]) => (
                      <div
                        key={areaKey}
                        className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <h4 className="border-b border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100">
                          {group.areaTitle}
                        </h4>
                        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                          {group.rows.map((r) => (
                            <ProgressRow
                              key={r.id}
                              row={r}
                              dateFormatter={dateFormatter}
                              levelLabel={t.fractions.levelLabel}
                              reviewLabel={t.progress.reviewLink}
                              formatTime={formatTime}
                            />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>
    </AppShell>
  );
}

interface ProgressRowProps {
  row: RowVM;
  dateFormatter: Intl.DateTimeFormat;
  levelLabel: string;
  reviewLabel: string;
  formatTime: (seconds: number) => string;
}

function ProgressRow({
  row,
  dateFormatter,
  levelLabel,
  reviewLabel,
  formatTime,
}: ProgressRowProps) {
  return (
    <li className="px-4 py-3" data-testid="progress-row">
      <Link
        href={`/progress/${row.id}`}
        aria-label={reviewLabel}
        className="flex items-center gap-3"
        data-testid={`progress-review-link-${row.id}`}
      >
        <div className="min-w-0 flex-1">
          {/* Line 1 — module name. truncate keeps it on one line so a long
              title can never push the row past two lines total. */}
          <div className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
            {row.moduleTitle}
          </div>
          {/* Line 2 — metadata. Each chunk is small so they fit horizontally
              even on narrow phones. The truncate guards against the rare
              very-large score string. */}
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-500 dark:text-gray-400">
            {row.level !== null && (
              <span>
                {levelLabel} {row.level}
              </span>
            )}
            <span>
              {row.score}/{row.total} ({row.percent}%)
            </span>
            <span>{formatTime(row.time)}</span>
            <span>{dateFormatter.format(row.createdAt)}</span>
          </div>
        </div>
        {/* Review icon — chevron-right. Saves the horizontal real estate the
            "Przejrzyj" / "Review" word used to occupy. */}
        <span
          aria-hidden
          className="shrink-0 rounded-md p-1 text-blue-600 transition group-hover:bg-blue-50 dark:text-blue-400"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              d="M6 4l6 5-6 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </li>
  );
}
