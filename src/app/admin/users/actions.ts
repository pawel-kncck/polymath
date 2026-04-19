'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth-utils';
import { prisma } from '@/lib/db';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

// ─── Create user ──────────────────────────────────────────────────────────────

export type CreateUserState = {
  error?:
    | 'invalid_email'
    | 'password_too_short'
    | 'email_taken'
    | 'invalid_role'
    | 'unknown';
  success?: true;
  createdEmail?: string;
} | null;

export async function createUser(
  _prevState: CreateUserState,
  formData: FormData
): Promise<CreateUserState> {
  await requireAdmin();

  const email =
    typeof formData.get('email') === 'string'
      ? (formData.get('email') as string).trim().toLowerCase()
      : '';
  const name =
    typeof formData.get('name') === 'string'
      ? (formData.get('name') as string).trim()
      : '';
  const password =
    typeof formData.get('password') === 'string'
      ? (formData.get('password') as string)
      : '';
  const role =
    typeof formData.get('role') === 'string'
      ? (formData.get('role') as string)
      : 'STUDENT';

  if (!EMAIL_RE.test(email)) return { error: 'invalid_email' };
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { error: 'password_too_short' };
  }
  if (role !== 'STUDENT' && role !== 'ADMIN') {
    return { error: 'invalid_role' };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: 'email_taken' };

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: {
      email,
      name: name || email.split('@')[0],
      role,
      passwordHash,
    },
  });

  revalidatePath('/admin/users');
  return { success: true, createdEmail: email };
}

// ─── Delete user ──────────────────────────────────────────────────────────────

export type DeleteUserState = {
  error?: 'delete_self' | 'not_found' | 'unknown';
  success?: true;
  deletedEmail?: string;
} | null;

export async function deleteUser(
  _prevState: DeleteUserState,
  formData: FormData
): Promise<DeleteUserState> {
  const session = await requireAdmin();
  const userId =
    typeof formData.get('userId') === 'string'
      ? (formData.get('userId') as string)
      : '';

  if (!userId) return { error: 'not_found' };
  if (userId === session.user.id) return { error: 'delete_self' };

  try {
    const deleted = await prisma.user.delete({
      where: { id: userId },
      select: { email: true },
    });
    revalidatePath('/admin/users');
    return { success: true, deletedEmail: deleted.email };
  } catch {
    return { error: 'unknown' };
  }
}

// ─── Reset password ───────────────────────────────────────────────────────────

export type ResetPasswordState = {
  error?: 'password_too_short' | 'not_found' | 'unknown';
  success?: true;
  targetEmail?: string;
} | null;

export async function resetUserPassword(
  _prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  await requireAdmin();

  const userId =
    typeof formData.get('userId') === 'string'
      ? (formData.get('userId') as string)
      : '';
  const password =
    typeof formData.get('password') === 'string'
      ? (formData.get('password') as string)
      : '';

  if (!userId) return { error: 'not_found' };
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { error: 'password_too_short' };
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
      select: { email: true },
    });
    revalidatePath('/admin/users');
    return { success: true, targetEmail: updated.email };
  } catch {
    return { error: 'unknown' };
  }
}
