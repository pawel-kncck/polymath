import { auth } from './auth';
import { prisma } from './db';

/**
 * Module-access helper. Admins always see everything (no filter). Students
 * see only the modules listed in their `accessibleModuleIds`. Unauthenticated
 * callers see nothing — the auth-required pages redirect before this is
 * called, but defaulting to "deny" on null sessions keeps stray callers safe.
 */
export type ModuleAccess =
  | { mode: 'all' }
  | { mode: 'allowList'; ids: Set<string> };

export async function getCurrentUserModuleAccess(): Promise<ModuleAccess> {
  const session = await auth();
  if (!session?.user?.id) return { mode: 'allowList', ids: new Set() };
  if (session.user.role === 'ADMIN') return { mode: 'all' };

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { accessibleModuleIds: true },
  });
  return {
    mode: 'allowList',
    ids: new Set(user?.accessibleModuleIds ?? []),
  };
}

export function isModuleAccessible(
  access: ModuleAccess,
  moduleId: string
): boolean {
  return access.mode === 'all' || access.ids.has(moduleId);
}
