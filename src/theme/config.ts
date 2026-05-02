export const THEMES = ['light', 'dark', 'sunrise'] as const;
export type Theme = (typeof THEMES)[number];

// Per-role default applied when no explicit cookie is set. STUDENT users get
// the warm "sunrise" palette; everyone else gets the neutral "light" palette.
export const DEFAULT_THEME_BY_ROLE: Record<string, Theme> = {
  STUDENT: 'sunrise',
};
export const FALLBACK_THEME: Theme = 'light';

export const THEME_COOKIE = 'theme';

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark' || value === 'sunrise';
}

export function defaultThemeForRole(role: string | undefined | null): Theme {
  if (role && DEFAULT_THEME_BY_ROLE[role]) return DEFAULT_THEME_BY_ROLE[role]!;
  return FALLBACK_THEME;
}
