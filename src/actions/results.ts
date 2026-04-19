'use server';

import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth-utils';
import { getContentModule } from '@/content';
import type { QuizResult } from '@/types/quiz';

type RawResult = {
  id: string;
  userId: string;
  moduleId: string;
  score: number;
  total: number;
  time: number;
  mistakes: unknown;
  createdAt: Date;
};

/**
 * Attach module metadata from the content loader. Results store only a
 * moduleId string — modules live in `src/content/`, not the DB.
 */
function attachModule<T extends { moduleId: string }>(result: T) {
  const m = getContentModule(result.moduleId);
  return {
    ...result,
    module: m ? { title: m.title, subject: m.subject } : null,
  };
}

export async function saveResult(moduleId: string, result: QuizResult) {
  const session = await requireAuth();

  return prisma.result.create({
    data: {
      userId: session.user.id,
      moduleId,
      score: result.score,
      total: result.total,
      time: result.time,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mistakes: result.mistakes as any,
    },
  });
}

export async function getUserResults() {
  const session = await requireAuth();

  const results = (await prisma.result.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })) as RawResult[];

  return results.map(attachModule);
}

export async function getResultById(resultId: string) {
  const session = await requireAuth();

  const result = (await prisma.result.findFirst({
    where: { id: resultId, userId: session.user.id },
  })) as RawResult | null;

  return result ? attachModule(result) : null;
}
