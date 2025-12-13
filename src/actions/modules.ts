'use server';

import { prisma } from '@/lib/db';

/**
 * Get all modules with their item counts
 */
export async function getModules() {
  const modules = await prisma.module.findMany({
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

/**
 * Get a single module by ID with all its items
 */
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
 * Get a module with a random selection of items for quiz
 * @param moduleId - The module ID
 * @param count - Number of random items to return (default: all items)
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

  // Shuffle items using Fisher-Yates algorithm
  const shuffledItems = [...module.items];
  for (let i = shuffledItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
  }

  // Return specified count or all items
  const selectedItems = count ? shuffledItems.slice(0, count) : shuffledItems;

  return {
    ...module,
    items: selectedItems,
  };
}
