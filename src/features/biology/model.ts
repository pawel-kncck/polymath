import { MISSIONS, type MissionId } from "./content";
import type { QuizResult } from "@/types/quiz";

export const POINTS_PER_ANSWER = 10;
export const COMPLETION_POINTS = 20;
export type ExpeditionProgress = Partial<
  Record<MissionId, { best: number; attempts: number }>
>;

export function gradeAttempt(
  missionId: string,
  answers: number[],
  time: number,
): QuizResult {
  const mission = MISSIONS.find((m) => m.id === missionId);
  if (
    !mission ||
    answers.length !== mission.questions.length ||
    !answers.every(
      (a, i) =>
        Number.isInteger(a) &&
        a >= 0 &&
        a < mission.questions[i].options.length,
    )
  ) {
    throw new Error("Nieprawidłowy zestaw odpowiedzi.");
  }
  const responses = mission.questions.map((q, i) => ({
    itemId: q.id,
    prompt: q.prompt,
    correctAnswer: q.options[q.correct],
    userAnswer: q.options[answers[i]],
    correct: q.correct === answers[i],
  }));
  return {
    score: responses.filter((r) => r.correct).length,
    total: responses.length,
    time: Number.isFinite(time)
      ? Math.max(0, Math.min(86400, Math.round(time)))
      : 0,
    responses,
    mistakes: responses
      .filter((r) => !r.correct)
      .map(({ itemId, prompt, correctAnswer, userAnswer }) => ({
        itemId,
        prompt,
        correctAnswer,
        userAnswer,
      })),
  };
}
export function recordAttempt(
  progress: ExpeditionProgress,
  id: MissionId,
  score: number,
): ExpeditionProgress {
  const mission = MISSIONS.find((m) => m.id === id);
  if (
    !mission ||
    !Number.isInteger(score) ||
    score < 0 ||
    score > mission.questions.length
  )
    return progress;
  const previous = progress[id];
  return {
    ...progress,
    [id]: {
      best: Math.max(previous?.best ?? 0, score),
      attempts: (previous?.attempts ?? 0) + 1,
    },
  };
}
export function totalPoints(progress: ExpeditionProgress): number {
  return MISSIONS.reduce(
    (sum, m) =>
      sum +
      (progress[m.id]
        ? COMPLETION_POINTS + progress[m.id]!.best * POINTS_PER_ANSWER
        : 0),
    0,
  );
}
export function readProgress(raw: string | null): ExpeditionProgress {
  try {
    const value: unknown = JSON.parse(raw ?? "{}");
    if (!value || typeof value !== "object") return {};
    const result: ExpeditionProgress = {};
    for (const m of MISSIONS) {
      const entry = (
        value as Record<string, { best?: unknown; attempts?: unknown }>
      )[m.id];
      if (
        entry &&
        typeof entry.best === "number" &&
        Number.isInteger(entry.best) &&
        entry.best >= 0 &&
        entry.best <= m.questions.length &&
        typeof entry.attempts === "number" &&
        Number.isSafeInteger(entry.attempts) &&
        entry.attempts > 0
      ) {
        result[m.id] = { best: entry.best, attempts: entry.attempts };
      }
    }
    return result;
  } catch {
    return {};
  }
}
export function explorerRank(points: number): string {
  return points >= 350
    ? "Znawca życia"
    : points >= 200
      ? "Przyrodnik"
      : points >= 60
        ? "Badacz"
        : "Młody obserwator";
}

export function microscopePower(ocular: number, objective: number) {
  return ocular * objective;
}
export function waterExperiment(
  water: boolean,
  sameLight: boolean,
  sameTemperature: boolean,
) {
  const changed =
    Number(!water) + Number(!sameLight) + Number(!sameTemperature);
  return { changed, valid: !water && sameLight && sameTemperature };
}
