import { setTheme } from '@/theme/actions';
import { getTheme } from '@/theme/server';
import { THEMES, type Theme } from '@/theme/config';
import { getMessages } from '@/i18n/server';

export async function ThemeSwitcher() {
  const current = await getTheme();
  const t = await getMessages();

  const labelOf = (theme: Theme): string => {
    switch (theme) {
      case 'light':
        return t.common.themeLight;
      case 'dark':
        return t.common.themeDark;
      case 'sunrise':
        return t.common.themeSunrise;
    }
  };

  return (
    <div className="flex items-center gap-1" aria-label={t.common.theme}>
      {THEMES.map((theme) => {
        const isActive = theme === current;
        return (
          <form
            key={theme}
            action={async () => {
              'use server';
              await setTheme(theme);
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
              {labelOf(theme)}
            </button>
          </form>
        );
      })}
    </div>
  );
}
