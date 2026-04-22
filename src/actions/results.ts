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

export type ModuleProgress = {
  moduleId: string;
  attempts: number;
  bestScore: number;
  bestTotal: number;
  bestPercent: number;
  lastAttemptAt: Date;
};

/**
 * Aggregate the current user's quiz attempts per module. Used by the home
 * page to show completion badges / best score next to each quiz card.
 */
export async function getUserModuleProgress(): Promise<
  Record<string, ModuleProgress>
> {
  const session = await requireAuth();

  const results = (await prisma.result.findMany({
    where: { userId: session.user.id },
    select: {
      moduleId: true,
      score: true,
      total: true,
      createdAt: true,
    },
  })) as Array<{
    moduleId: string;
    score: number;
    total: number;
    createdAt: Date;
  }>;

  const byModule: Record<string, ModuleProgress> = {};
  for (const r of results) {
    const percent = r.total > 0 ? r.score / r.total : 0;
    const existing = byModule[r.moduleId];
    if (!existing) {
      byModule[r.moduleId] = {
        moduleId: r.moduleId,
        attempts: 1,
        bestScore: r.score,
        bestTotal: r.total,
        bestPercent: percent,
        lastAttemptAt: r.createdAt,
      };
      continue;
    }
    existing.attempts += 1;
    if (percent > existing.bestPercent) {
      existing.bestScore = r.score;
      existing.bestTotal = r.total;
      existing.bestPercent = percent;
    }
    if (r.createdAt > existing.lastAttemptAt) {
      existing.lastAttemptAt = r.createdAt;
    }
  }
  return byModule;
}
