import { notFound } from 'next/navigation';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth-utils';
import {
  getModuleById,
  getModuleWithRandomItems,
} from '@/actions/modules';
import { getLocale, getMessages } from '@/i18n/server';
import { resolveContent, resolveLocalized } from '@/lib/localize';
import { QuizClient } from './QuizClient';
import { LevelPicker } from '@/components/quiz/LevelPicker';
import type { Locale } from '@/i18n/config';

interface QuizPageProps {
  params: Promise<{
    moduleId: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function parseLevel(raw: string | string[] | undefined): number | undefined {
  if (typeof raw !== 'string') return undefined;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : undefined;
}

export default async function QuizPage({
  params,
  searchParams,
}: QuizPageProps) {
  await requireAuth();

  const { moduleId } = await params;
  const sp = await searchParams;
  const requestedLevel = parseLevel(sp.level);

  const moduleMeta = await getModuleById(moduleId);
  if (!moduleMeta) notFound();

  const locale = await getLocale();
  const fallbacks = moduleMeta.languages.filter(
    (l): l is Locale => l !== locale
  ) as Locale[];
  const title = resolveLocalized<string>(moduleMeta.title, locale, fallbacks);
  const description = resolveLocalized<string>(
    moduleMeta.description,
    locale,
    fallbacks
  );

  // Modules that declare `levels` go through a level picker before any items
  // are sampled. This keeps the picker server-rendered and side-effect-free.
  if (moduleMeta.levels && moduleMeta.levels.length > 0 && !requestedLevel) {
    const t = await getMessages();
    const pool: Record<number, number> = {};
    for (const lv of moduleMeta.levels) {
      pool[lv] = moduleMeta.items.filter((i) => i.level === lv).length;
    }
    return (
      <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
          <LevelPicker
            moduleId={moduleMeta.id}
            levels={moduleMeta.levels}
            testSize={moduleMeta.defaultTestSize ?? moduleMeta.items.length}
            pool={pool}
          />
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:underline dark:text-gray-400"
            >
              {t.progress.backToHome}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const sampleSize = moduleMeta.levels
    ? moduleMeta.defaultTestSize
    : undefined;
  const sampled = await getModuleWithRandomItems(
    moduleId,
    sampleSize,
    requestedLevel
  );

  if (!sampled || sampled.items.length === 0) notFound();

  // Flatten every localized field in each item's content to the current locale
  // so renderers and useQuiz can keep operating on plain strings.
  const resolvedItems = sampled.items.map((item) => ({
    id: item.id,
    type: item.type,
    level: item.level,
    content: resolveContent(item.content, locale, fallbacks),
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
          {requestedLevel && (
            <p className="mt-2 text-sm font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
              {(await getMessages()).fractions.levelLabel} {requestedLevel}
            </p>
          )}
        </div>

        <QuizClient
          moduleId={sampled.id}
          items={resolvedItems}
          level={requestedLevel}
        />
      </div>
    </div>
  );
}
