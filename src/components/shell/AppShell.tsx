import Link from 'next/link';
import { auth, signOut } from '@/lib/auth';
import { getCurrentUserModuleAccess, isModuleAccessible } from '@/lib/access';
import { getAllContentModules } from '@/content';
import { getLocale, getMessages } from '@/i18n/server';
import { CATEGORY_ORDER, type ContentCategory } from '@/content/types';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { SidebarShell } from './SidebarShell';
import { UserMenu } from './UserMenu';

interface AppShellProps {
  children: React.ReactNode;
  // Pass when the page is "in" a domain — sidebar highlights that link.
  currentCategory?: ContentCategory;
  // Pass when the page is the progress page — sidebar highlights that link.
  active?: 'progress' | 'home';
}

/**
 * Authenticated app shell. Left rail with domain navigation, progress link,
 * and a user-info block at the bottom. The header that used to live on each
 * individual page is gone — every authenticated route now wraps its content
 * in <AppShell>.
 */
export async function AppShell({
  children,
  currentCategory,
  active,
}: AppShellProps) {
  const session = await auth();
  const t = await getMessages();
  const locale = await getLocale();
  const access = await getCurrentUserModuleAccess();

  // Determine which domain links to render. Admins see every category that
  // has any module in the active locale; students see only categories that
  // contain at least one module they can access.
  const accessibleCategories = new Set<ContentCategory>();
  for (const m of getAllContentModules()) {
    if (!m.languages.includes(locale)) continue;
    if (!isModuleAccessible(access, m.id)) continue;
    if ((CATEGORY_ORDER as string[]).includes(m.category)) {
      accessibleCategories.add(m.category as ContentCategory);
    }
  }

  const navItems = CATEGORY_ORDER.filter((c) => accessibleCategories.has(c));

  const userName = session?.user?.name ?? '';
  const userEmail = session?.user?.email ?? '';
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarShell
        openLabel={t.shell.openMenu}
        closeLabel={t.shell.closeMenu}
      >
        <div className="mb-6 px-2">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-gray-100"
          >
            {t.common.appName}
          </Link>
        </div>

        <nav className="flex-1 space-y-1">
          <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {t.shell.domains}
          </div>
          {navItems.length === 0 ? (
            <p className="px-2 text-xs text-gray-500 dark:text-gray-400">
              {t.shell.noAccess}
            </p>
          ) : (
            navItems.map((cat) => {
              const isActive = currentCategory === cat;
              const label =
                t.categories[cat as keyof typeof t.categories] ?? cat;
              return (
                <Link
                  key={cat}
                  href={`/d/${cat}`}
                  className={`block rounded-md px-2 py-1.5 text-sm ${
                    isActive
                      ? 'bg-blue-50 font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  {label}
                </Link>
              );
            })
          )}

          <div className="mt-6 px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {t.shell.activity}
          </div>
          <Link
            href="/progress"
            className={`block rounded-md px-2 py-1.5 text-sm ${
              active === 'progress'
                ? 'bg-blue-50 font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            {t.progress.viewLink}
          </Link>
        </nav>

        <div className="mt-4 border-t border-gray-200 pt-3 dark:border-gray-800">
          {session?.user && (
            <UserMenu
              name={userName}
              email={userEmail}
              isAdmin={isAdmin}
              signOutAction={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
              }}
              languageSwitcher={<LanguageSwitcher />}
              labels={{
                language: t.common.language,
                signOut: t.common.signOut,
                admin: t.common.admin,
              }}
            />
          )}
        </div>
      </SidebarShell>

      {/* Top padding reserves space for the fixed hamburger button when the
          sidebar is closed. We keep it on every breakpoint because the user
          can now close the sidebar on desktop too — and we don't want to
          read viewport state here in the server component. */}
      <main className="flex-1 pt-14">{children}</main>
    </div>
  );
}
