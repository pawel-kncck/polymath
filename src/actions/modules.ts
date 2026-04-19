'use server';

import { prisma } from '@/lib/db';
import { getLocale } from '@/i18n/server';

/**
 * Get all modules for the current locale, with item counts.
 * Filters by the `languages` array so EN-only modules hide in PL mode and
 * vice versa.
 */
export async function getModules() {
  const locale = await getLocale();
  const modules = await prisma.module.findMany({
    where: { languages: { has: locale } },
    include: {
      _count: {
        select: { items: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return modules;
}

export async function getModuleById(id: string) {
  const module = await prisma.module.findUnique({
    where: { id },
    include: {
      items: true,
    },
  });

  return module;
}

/**
 * Get a module with a random selection of items for quiz.
 */
export async function getModuleWithRandomItems(moduleId: string, count?: number) {
  const module = await prisma.module.findUnique({
    where: { id: moduleId },
    include: {
      items: true,
    },
  });

  if (!module) {
    return null;
  }

  const shuffledItems = [...module.items];
  for (let i = shuffledItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
  }

  const selectedItems = count ? shuffledItems.slice(0, count) : shuffledItems;

  return {
    ...module,
    items: selectedItems,
  };
}
