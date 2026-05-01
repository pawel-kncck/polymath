'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface UserMenuLabels {
  language: string;
  theme: string;
  signOut: string;
  admin: string;
}

interface UserMenuProps {
  name: string;
  email: string;
  isAdmin: boolean;
  signOutAction: () => void;
  // Server-rendered LanguageSwitcher passed in as a child since UserMenu
  // itself is a client component and can't import server-only code.
  languageSwitcher: React.ReactNode;
  themeSwitcher: React.ReactNode;
  labels: UserMenuLabels;
}

function initialsOf(name: string, email: string): string {
  const source = name?.trim() || email;
  const parts = source.split(/[\s@.]+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}

export function UserMenu({
  name,
  email,
  isAdmin,
  signOutAction,
  languageSwitcher,
  themeSwitcher,
  labels,
}: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Click-outside / escape to close.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      {/* Whole row is the button so the click target is generous on both
          mobile and desktop (Fitts' law: avatar + name + kebab area is much
          easier to hit than the kebab alone). */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="User menu"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <span
          aria-hidden
          className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white"
        >
          {initialsOf(name, email)}
        </span>
        <span className="min-w-0 flex-1 text-left">
          <span className="block truncate text-sm font-medium text-gray-900 dark:text-gray-100">
            {name || email}
          </span>
          {name && (
            <span className="block truncate text-xs text-gray-500 dark:text-gray-400">
              {email}
            </span>
          )}
        </span>
        <span aria-hidden className="rounded-md p-1 text-gray-500">
          {/* vertical kebab */}
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
            <circle cx="8" cy="3" r="1.4" fill="currentColor" />
            <circle cx="8" cy="8" r="1.4" fill="currentColor" />
            <circle cx="8" cy="13" r="1.4" fill="currentColor" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute bottom-14 left-2 right-2 z-30 rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="mb-2 flex items-center justify-between gap-2 px-1 text-xs text-gray-500 dark:text-gray-400">
            <span>{labels.language}</span>
            {languageSwitcher}
          </div>
          <div className="mb-2 flex items-center justify-between gap-2 px-1 text-xs text-gray-500 dark:text-gray-400">
            <span>{labels.theme}</span>
            {themeSwitcher}
          </div>
          {isAdmin && (
            <Link
              href="/admin/users"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {labels.admin}
            </Link>
          )}
          <form action={signOutAction}>
            <button
              role="menuitem"
              type="submit"
              className="w-full rounded-md px-2 py-1.5 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
            >
              {labels.signOut}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
