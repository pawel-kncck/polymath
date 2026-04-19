import { notFound } from 'next/navigation';
import { requireAuth } from '@/lib/auth-utils';
import { getModuleWithRandomItems } from '@/actions/modules';
import { getLocale } from '@/i18n/server';
import { resolveContent, resolveLocalized } from '@/lib/localize';
import { QuizClient } from './QuizClient';
import type { Locale } from '@/i18n/config';

interface QuizPageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  await requireAuth();

  const { moduleId } = await params;

  const module = await getModuleWithRandomItems(moduleId);

  if (!module || module.items.length === 0) {
    notFound();
  }

  const locale = await getLocale();
  const fallbacks = module.languages.filter(
    (l): l is Locale => l !== locale
  ) as Locale[];

  const title = resolveLocalized<string>(module.title, locale, fallbacks);
  const description = resolveLocalized<string>(module.description, locale, fallbacks);

  // Flatten every localized field in each item's content to the current locale
  // so renderers and useQuiz can keep operating on plain strings.
  const resolvedItems = module.items.map((item) => ({
    id: item.id,
    type: item.type as 'TEXT' | 'SINGLE_CHOICE' | 'MATH_EQ' | 'GEOMETRY',
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
            <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
          )}
        </div>

        <QuizClient moduleId={module.id} items={resolvedItems} />
      </div>
    </div>
  );
}
