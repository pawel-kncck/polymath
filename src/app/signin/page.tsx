import { getMessages } from '@/i18n/server';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { SignInForm } from './SignInForm';

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const t = await getMessages();
  const callbackUrl = params.callbackUrl ?? '/';

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

        <SignInForm
          callbackUrl={callbackUrl}
          labels={{
            emailLabel: t.signin.emailLabel,
            passwordLabel: t.signin.passwordLabel,
            submit: t.signin.submit,
            invalidCredentials: t.signin.invalidCredentials,
          }}
        />
      </div>
    </div>
  );
}
