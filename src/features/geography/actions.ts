"use server";

import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth-utils";
import { getCurrentUserModuleAccess, isModuleAccessible } from "@/lib/access";
import { gradeAttempt } from "./model";

export async function saveGeographyAttempt(
  missionId: string,
  answers: number[],
  time: number,
  attemptId: string,
): Promise<void> {
  const session = await requireAuth();
  const access = await getCurrentUserModuleAccess();
  if (!isModuleAccessible(access, missionId))
    throw new Error("Brak dostępu do tej wyprawy.");
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      attemptId,
    )
  )
    throw new Error("Nieprawidłowy identyfikator próby.");
  const result = gradeAttempt(missionId, answers, time);
  const existing = await prisma.result.findUnique({
    where: { id: attemptId },
    select: { userId: true },
  });
  if (existing && existing.userId !== session.user.id)
    throw new Error("Nieprawidłowa próba.");
  // A retry after a lost network response must not create a duplicate result.
  await prisma.result.upsert({
    where: { id: attemptId },
    update: {},
    create: {
      id: attemptId,
      userId: session.user.id,
      moduleId: missionId,
      score: result.score,
      total: result.total,
      time: result.time,
      mistakes: result.mistakes.map((m) => ({ ...m })),
      responses: result.responses.map((r) => ({ ...r })),
      level: null,
    },
  });
}
