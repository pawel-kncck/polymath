'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface SidebarShellProps {
  children: React.ReactNode;
  // Localized aria-labels for the open / close affordances.
  openLabel: string;
  closeLabel: string;
}

const STORAGE_KEY = 'sidebar-open';
const MD_QUERY = '(min-width: 768px)';

/**
 * Client wrapper that controls sidebar visibility.
 *
 * One unified mechanism on every screen size:
 *   • Default (no explicit user choice) — open on desktop, closed on mobile.
 *   • A close button inside the sidebar dismisses it on any screen size.
 *   • A hamburger appears whenever the sidebar is closed and reopens it.
 *   • The user's choice is persisted in localStorage.
 *
 * On mobile the sidebar is an overlay drawer with a backdrop. On desktop it
 * is in-flow (sticky), so closing it lets the main content reclaim the
 * width — there's no backdrop and no animation.
 *
 * `open` starts as `null` so SSR can render a sensible default per
 * breakpoint via CSS without committing to a value before we've checked
 * localStorage. The first effect resolves it.
 */
export function SidebarShell({
  children,
  openLabel,
  closeLabel,
}: SidebarShellProps) {
  const [open, setOpen] = useState<boolean | null>(null);
  const pathname = usePathname();

  // Initial resolution: prefer the stored preference, fall back to the
  // viewport default.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === '1' || stored === '0') {
      setOpen(stored === '1');
      return;
    }
    setOpen(window.matchMedia(MD_QUERY).matches);
  }, []);

  // Persist explicit choices.
  useEffect(() => {
    if (typeof window === 'undefined' || open === null) return;
    window.localStorage.setItem(STORAGE_KEY, open ? '1' : '0');
  }, [open]);

  // On mobile, navigating dismisses the drawer. Desktop ignores this:
  // there's no backdrop, so the user's "open" state should persist across
  // route changes.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia(MD_QUERY).matches) return;
    setOpen(false);
  }, [pathname]);

  // Esc to close + lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!open) return;
    if (typeof window === 'undefined') return;
    const isDesktop = window.matchMedia(MD_QUERY).matches;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    let restoreOverflow: (() => void) | null = null;
    if (!isDesktop) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      restoreOverflow = () => {
        document.body.style.overflow = previous;
      };
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      restoreOverflow?.();
    };
  }, [open]);

  // Conditional class blocks. The three-way logic comes up enough to factor
  // out for clarity. `open === null` is the SSR / pre-hydration state where
  // we want the per-breakpoint default to apply via Tailwind responsive
  // utilities.
  const asideStateClasses =
    open === null
      ? // SSR default: closed on mobile (off-canvas), open on desktop.
        '-translate-x-full md:translate-x-0'
      : open
        ? 'translate-x-0 shadow-xl md:shadow-none'
        : // Explicitly closed: off-canvas on mobile, removed on desktop.
          '-translate-x-full md:hidden';

  const hamburgerStateClasses =
    open === null
      ? 'inline-flex md:hidden'
      : open
        ? 'hidden'
        : 'inline-flex';

  // Mobile-only backdrop. Skipped on desktop because the open sidebar is
  // in-flow there — main content is beside it, not under it.
  const showMobileBackdrop = open === true;

  return (
    <>
      <button
        type="button"
        aria-label={openLabel}
        aria-expanded={open ?? undefined}
        aria-controls="app-sidebar"
        onClick={() => setOpen(true)}
        className={`fixed left-3 top-3 z-30 ${hamburgerStateClasses} h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
          <path
            d="M3 5h14M3 10h14M3 15h14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {showMobileBackdrop && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed left-0 top-0 z-40 flex h-screen w-72 max-w-[85vw] flex-col border-r border-gray-200 bg-white px-3 py-4 transition-transform duration-200 ease-out dark:border-gray-800 dark:bg-gray-950 md:sticky md:w-64 md:max-w-none md:transition-none ${asideStateClasses}`}
      >
        {/* Close button — visible on every screen size since the user can
            now close the sidebar on desktop too. */}
        <div className="mb-2 flex justify-end">
          <button
            type="button"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {children}
      </aside>
    </>
  );
}
