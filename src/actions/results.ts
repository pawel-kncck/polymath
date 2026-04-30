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
  responses: unknown;
  level: number | null;
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

export async function saveResult(
  moduleId: string,
  result: QuizResult,
  level?: number
) {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      responses: result.responses as any,
      level: level ?? null,
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
  avgPercent: number; // 0..1
  avgTime: number; // average seconds, rounded
  lastAttemptAt: Date;
};

/**
 * Aggregate the current user's quiz attempts per module. Each module card
 * surfaces attempts / average score / average time, since a module can be
 * taken many times across different difficulty levels — a single "best
 * score" badge would mix those buckets and mislead.
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
      time: true,
      createdAt: true,
    },
  })) as Array<{
    moduleId: string;
    score: number;
    total: number;
    time: number;
    createdAt: Date;
  }>;

  type Accumulator = {
    moduleId: string;
    attempts: number;
    sumPercent: number;
    sumTime: number;
    lastAttemptAt: Date;
  };
  const acc: Record<string, Accumulator> = {};
  for (const r of results) {
    const percent = r.total > 0 ? r.score / r.total : 0;
    const existing = acc[r.moduleId];
    if (!existing) {
      acc[r.moduleId] = {
        moduleId: r.moduleId,
        attempts: 1,
        sumPercent: percent,
        sumTime: r.time,
        lastAttemptAt: r.createdAt,
      };
      continue;
    }
    existing.attempts += 1;
    existing.sumPercent += percent;
    existing.sumTime += r.time;
    if (r.createdAt > existing.lastAttemptAt) {
      existing.lastAttemptAt = r.createdAt;
    }
  }

  const out: Record<string, ModuleProgress> = {};
  for (const [moduleId, a] of Object.entries(acc)) {
    out[moduleId] = {
      moduleId,
      attempts: a.attempts,
      avgPercent: a.sumPercent / a.attempts,
      avgTime: Math.round(a.sumTime / a.attempts),
      lastAttemptAt: a.lastAttemptAt,
    };
  }
  return out;
}
