import { signIn } from '@/lib/auth';
import { getMessages } from '@/i18n/server';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default async function SignInPage() {
  const isDev = process.env.NODE_ENV !== 'production';
  const t = await getMessages();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold">{t.common.appName}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t.signin.subtitle}
          </p>
        </div>

        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/' });
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t.signin.withGoogle}
          </button>
        </form>

        {isDev && (
          <div className="space-y-3 rounded-lg border border-dashed border-amber-400 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950/30">
            <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
              {t.signin.devLoginLabel}
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              {t.signin.devLoginHint}
            </p>
            <form
              action={async (formData) => {
                'use server';
                await signIn('credentials', {
                  email: formData.get('email'),
                  redirectTo: '/',
                });
              }}
              className="space-y-2"
            >
              <input
                name="email"
                type="email"
                required
                defaultValue="dev@localhost"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
              <button
                type="submit"
                className="w-full rounded-md bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-700"
              >
                {t.signin.devLoginSubmit}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
