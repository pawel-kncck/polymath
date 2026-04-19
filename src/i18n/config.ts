export const LOCALES = ['pl', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'pl';
export const LOCALE_COOKIE = 'locale';

export function isLocale(value: unknown): value is Locale {
  return value === 'pl' || value === 'en';
}
