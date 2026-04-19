import { setLocale } from '@/i18n/actions';
import { getLocale, getMessages } from '@/i18n/server';
import { LOCALES } from '@/i18n/config';

export async function LanguageSwitcher() {
  const current = await getLocale();
  const t = await getMessages();

  return (
    <div className="flex items-center gap-1" aria-label={t.common.language}>
      {LOCALES.map((loc) => {
        const label = loc === 'pl' ? t.common.languagePl : t.common.languageEn;
        const isActive = loc === current;
        return (
          <form
            key={loc}
            action={async () => {
              'use server';
              await setLocale(loc);
            }}
          >
            <button
              type="submit"
              aria-pressed={isActive}
              className={
                isActive
                  ? 'rounded-md border border-blue-600 bg-blue-600 px-2 py-1 text-xs font-semibold text-white'
                  : 'rounded-md border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            >
              {label}
            </button>
          </form>
        );
      })}
    </div>
  );
}
