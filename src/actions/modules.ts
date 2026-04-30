'use server';

import { getAllContentModules, getContentModule } from '@/content';
import { getCurrentUserModuleAccess, isModuleAccessible } from '@/lib/access';
import { getLocale } from '@/i18n/server';

/**
 * Modules and items are stored in the repo under `src/content/` (knowledge
 * base / question bank), not in the database. These helpers read from the
 * static content loader and return the same shape the UI already consumes,
 * while filtering out modules the current user has not been granted access
 * to (admins always see everything).
 */

export async function getModules() {
  const locale = await getLocale();
  const access = await getCurrentUserModuleAccess();
  return getAllContentModules()
    .filter((m) => m.languages.includes(locale))
    .filter((m) => isModuleAccessible(access, m.id))
    .map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      subject: m.subject,
      category: m.category,
      areaId: m.areaId,
      languages: m.languages,
      _count: { items: m.items.length },
    }));
}

/**
 * Like getModules but ignores the per-user access filter. Use this from
 * admin-only contexts (e.g. the access-management UI) where the admin needs
 * to see every module regardless of their own grants.
 */
export async function getAllModulesForAdmin() {
  const locale = await getLocale();
  return getAllContentModules()
    .filter((m) => m.languages.includes(locale))
    .map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      subject: m.subject,
      category: m.category,
      areaId: m.areaId,
      languages: m.languages,
      _count: { items: m.items.length },
    }));
}

export async function getModuleById(id: string) {
  const access = await getCurrentUserModuleAccess();
  if (!isModuleAccessible(access, id)) return null;
  return getContentModule(id);
}

/**
 * Return a module with a randomly ordered (optionally truncated, optionally
 * level-filtered) item list. When `level` is provided, only items matching
 * that level are considered before sampling.
 */
export async function getModuleWithRandomItems(
  moduleId: string,
  count?: number,
  level?: number
) {
  const access = await getCurrentUserModuleAccess();
  if (!isModuleAccessible(access, moduleId)) return null;

  const m = getContentModule(moduleId);
  if (!m) return null;

  const pool =
    level !== undefined ? m.items.filter((i) => i.level === level) : m.items;

  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return {
    ...m,
    items: count ? shuffled.slice(0, count) : shuffled,
  };
}
