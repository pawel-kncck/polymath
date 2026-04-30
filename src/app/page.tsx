import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { getCurrentUserModuleAccess, isModuleAccessible } from '@/lib/access';
import { getAllContentModules } from '@/content';
import { getLocale, getMessages } from '@/i18n/server';
import { CATEGORY_ORDER, type ContentCategory } from '@/content/types';
import { AppShell } from '@/components/shell/AppShell';

/**
 * Authenticated landing page. Redirects to the first accessible domain so the
 * student lands somewhere actionable. Unauthenticated visitors get a simple
 * sign-in prompt (no module list — those live behind auth now).
 */
export default async function HomePage() {
  const session = await auth();
  if (!session?.user) {
    const t = await getMessages();
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t.common.appName}
          </h1>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            {t.signin.subtitle}
          </p>
          <Link
            href="/signin"
            className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            {t.common.signIn}
          </Link>
        </div>
      </div>
    );
  }

  const locale = await getLocale();
  const access = await getCurrentUserModuleAccess();
  const accessibleCategories = new Set<ContentCategory>();
  for (const m of getAllContentModules()) {
    if (!m.languages.includes(locale)) continue;
    if (!isModuleAccessible(access, m.id)) continue;
    if ((CATEGORY_ORDER as string[]).includes(m.category)) {
      accessibleCategories.add(m.category as ContentCategory);
    }
  }

  const firstAccessible = CATEGORY_ORDER.find((c) =>
    accessibleCategories.has(c)
  );
  if (firstAccessible) redirect(`/d/${firstAccessible}`);

  // Authenticated user but no accessible modules — show a friendly empty
  // state so they aren't stuck on a blank screen.
  const t = await getMessages();
  return (
    <AppShell active="home">
      <div className="container mx-auto px-6 py-12">
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t.shell.noAccessTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t.shell.noAccessHint}
          </p>
        </div>
      </div>
    </AppShell>
  );
}
