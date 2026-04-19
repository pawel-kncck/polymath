'use server';

import { getAllContentModules, getContentModule } from '@/content';
import { getLocale } from '@/i18n/server';

/**
 * Modules and items are stored in the repo under `src/content/` (knowledge
 * base / question bank), not in the database. These helpers read from the
 * static content loader and return the same shape the UI already consumes.
 */

export async function getModules() {
  const locale = await getLocale();
  return getAllContentModules()
    .filter((m) => m.languages.includes(locale))
    .map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      subject: m.subject,
      languages: m.languages,
      _count: { items: m.items.length },
    }));
}

export async function getModuleById(id: string) {
  return getContentModule(id);
}

/**
 * Return a module with a randomly ordered (optionally truncated) item list.
 */
export async function getModuleWithRandomItems(
  moduleId: string,
  count?: number
) {
  const m = getContentModule(moduleId);
  if (!m) return null;

  const shuffled = [...m.items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return {
    ...m,
    items: count ? shuffled.slice(0, count) : shuffled,
  };
}
