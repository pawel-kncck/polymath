import { auth } from './auth';
import { redirect } from 'next/navigation';

/**
 * Ensures the user is authenticated.
 * Redirects to /signin if not authenticated.
 * @returns The authenticated session
 */
export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect('/signin');
  }
  return session;
}

/**
 * Ensures the user is authenticated and has admin role.
 * Redirects to /signin if not authenticated.
 * Redirects to / if authenticated but not an admin.
 * @returns The authenticated session with admin user
 */
export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== 'ADMIN') {
    redirect('/');
  }
  return session;
}
