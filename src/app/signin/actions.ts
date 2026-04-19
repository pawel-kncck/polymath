'use server';

import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { signIn } from '@/lib/auth';

export type SignInState = { error: string | null } | null;

export async function authenticate(
  _prevState: SignInState,
  formData: FormData
): Promise<SignInState> {
  const callbackUrl =
    typeof formData.get('callbackUrl') === 'string'
      ? (formData.get('callbackUrl') as string)
      : '/';

  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'CredentialsSignin' };
    }
    throw error;
  }

  redirect(callbackUrl);
}
