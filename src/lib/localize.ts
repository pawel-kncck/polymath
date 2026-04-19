import { LOCALES, type Locale } from '@/i18n/config';

export type LocalizedString = Partial<Record<Locale, string>>;
export type LocalizedStringArray = Partial<Record<Locale, string[]>>;

function isLocalizedRecord(val: unknown): val is Partial<Record<Locale, unknown>> {
  if (typeof val !== 'object' || val === null || Array.isArray(val)) return false;
  const keys = Object.keys(val as Record<string, unknown>);
  if (keys.length === 0) return false;
  return keys.every((k) => (LOCALES as readonly string[]).includes(k));
}

/**
 * Resolve a possibly-localized value to a single locale. If `val` is a plain
 * (non-localized) value, it's returned as-is. Otherwise we try `locale` first,
 * then fall back through `fallbackLocales`, then any other available locale.
 */
export function resolveLocalized<T>(
  val: unknown,
  locale: Locale,
  fallbackLocales: Locale[] = []
): T {
  if (!isLocalizedRecord(val)) return val as T;

  const record = val as Partial<Record<Locale, T>>;
  if (record[locale] !== undefined) return record[locale] as T;

  for (const fb of fallbackLocales) {
    if (record[fb] !== undefined) return record[fb] as T;
  }

  for (const l of LOCALES) {
    if (record[l] !== undefined) return record[l] as T;
  }

  throw new Error('No localized value available');
}

/**
 * Recursively flatten every localized field inside a content payload to the
 * given locale. Non-localized values pass through untouched.
 */
export function resolveContent(
  content: unknown,
  locale: Locale,
  fallbackLocales: Locale[] = []
): unknown {
  if (content === null || content === undefined) return content;
  if (isLocalizedRecord(content)) {
    return resolveLocalized(content, locale, fallbackLocales);
  }
  if (Array.isArray(content)) {
    return content.map((v) => resolveContent(v, locale, fallbackLocales));
  }
  if (typeof content === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(content as Record<string, unknown>)) {
      out[k] = resolveContent(v, locale, fallbackLocales);
    }
    return out;
  }
  return content;
}
