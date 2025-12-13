'use server';

import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth-utils';
import type { QuizResult } from '@/types/quiz';

/**
 * Save a quiz result for the authenticated user
 */
export async function saveResult(moduleId: string, result: QuizResult) {
  const session = await requireAuth();

  const savedResult = await prisma.result.create({
    data: {
      userId: session.user.id,
      moduleId,
      score: result.score,
      total: result.total,
      time: result.time,
      mistakes: result.mistakes as any, // JSON type
    },
  });

  return savedResult;
}

/**
 * Get all results for the authenticated user
 */
export async function getUserResults() {
  const session = await requireAuth();

  const results = await prisma.result.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      module: {
        select: {
          title: true,
          subject: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return results;
}

/**
 * Get a single result by ID
 * Only returns the result if it belongs to the authenticated user
 */
export async function getResultById(resultId: string) {
  const session = await requireAuth();

  const result = await prisma.result.findFirst({
    where: {
      id: resultId,
      userId: session.user.id,
    },
    include: {
      module: {
        select: {
          title: true,
          subject: true,
        },
      },
    },
  });

  return result;
}
