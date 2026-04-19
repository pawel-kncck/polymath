'use client';

import { createContext, useContext } from 'react';
import type { Messages } from './pl';
import type { Locale } from './config';

interface I18nContextValue {
  t: Messages;
  locale: Locale;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function TranslationsProvider({
  messages,
  locale,
  children,
}: {
  messages: Messages;
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ t: messages, locale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useT(): Messages {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useT must be used inside TranslationsProvider');
  return ctx.t;
}

export function useLocale(): Locale {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useLocale must be used inside TranslationsProvider');
  return ctx.locale;
}
