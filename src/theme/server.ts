import { cookies } from 'next/headers';
import { auth } from '@/lib/auth';
import {
  THEME_COOKIE,
  defaultThemeForRole,
  isTheme,
  type Theme,
} from './config';

export async function getTheme(): Promise<Theme> {
  const store = await cookies();
  const cookieValue = store.get(THEME_COOKIE)?.value;
  if (isTheme(cookieValue)) return cookieValue;

  const session = await auth();
  return defaultThemeForRole(session?.user?.role);
}
