import { cookies } from 'next/headers';
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from './config';
import { pl, type Messages } from './pl';
import { en } from './en';

const DICTS: Record<Locale, Messages> = { pl, en };

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export async function getMessages(): Promise<Messages> {
  return DICTS[await getLocale()];
}

export function getMessagesForLocale(locale: Locale): Messages {
  return DICTS[locale];
}
