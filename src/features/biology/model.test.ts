import { describe, expect, it } from "vitest";
import { MISSIONS, biologyModules } from "./content";
import {
  explorerRank,
  microscopePower,
  waterExperiment,
  gradeAttempt,
  readProgress,
  recordAttempt,
  totalPoints,
} from "./model";
import { getContentModule } from "@/content";

describe("Biology learning content", () => {
  it("registers five distinct modules with six answerable questions each", () => {
    expect(MISSIONS).toHaveLength(5);
    const ids = MISSIONS.flatMap((m) => m.questions.map((q) => q.id));
    expect(new Set(ids).size).toBe(30);
    for (const m of MISSIONS) {
      expect(m.questions).toHaveLength(6);
      expect(getContentModule(m.id)?.category).toBe("BIOLOGY");
      expect(getContentModule(m.id)?.languages).toEqual(["pl"]);
      for (const q of m.questions) {
        expect(q.options[q.correct]).toBeTruthy();
        expect(new Set(q.options).size).toBe(4);
        expect(q.explanation.length).toBeGreaterThan(25);
      }
    }
    expect(biologyModules.every((m) => m.items.length === 6)).toBe(true);
  });
  it("calculates magnification and isolates the water variable", () => {
    expect(microscopePower(10, 40)).toBe(400);
    expect(microscopePower(15, 10)).toBe(150);
    expect(waterExperiment(false, true, true)).toEqual({
      changed: 1,
      valid: true,
    });
    expect(waterExperiment(true, true, true)).toEqual({
      changed: 0,
      valid: false,
    });
    expect(waterExperiment(false, false, true)).toEqual({
      changed: 2,
      valid: false,
    });
    expect(waterExperiment(false, true, false).valid).toBe(false);
  });
});
describe("Expedition results and points", () => {
  it("grades answers from content, records mistakes and bounds elapsed time", () => {
    const m = MISSIONS[0],
      answers = m.questions.map((q) => q.correct);
    const result = gradeAttempt(m.id, answers, 41.8);
    expect(result).toMatchObject({
      score: 6,
      total: 6,
      time: 42,
      mistakes: [],
    });
    answers[0] = (answers[0] + 1) % 4;
    const wrong = gradeAttempt(m.id, answers, -2);
    expect(wrong.score).toBe(5);
    expect(wrong.mistakes).toHaveLength(1);
    expect(wrong.time).toBe(0);
    expect(wrong.responses[0].correct).toBe(false);
    expect(gradeAttempt(m.id, answers, Infinity).time).toBe(0);
  });
  it("rejects unknown, incomplete and invalid submissions", () => {
    expect(() => gradeAttempt("missing", [], 0)).toThrow();
    expect(() => gradeAttempt("bio-life", [0], 0)).toThrow();
    expect(() => gradeAttempt("bio-life", [0, 0, 0, 0, 0, 99], 0)).toThrow();
    expect(() => gradeAttempt("bio-life", [0, 0, 0, 0, 0, 0.5], 0)).toThrow();
  });
  it("awards completion once and only adds points for improvements", () => {
    let p = recordAttempt({}, "bio-life", 4);
    expect(totalPoints(p)).toBe(60);
    p = recordAttempt(p, "bio-life", 4);
    expect(totalPoints(p)).toBe(60);
    p = recordAttempt(p, "bio-life", 2);
    expect(totalPoints(p)).toBe(60);
    p = recordAttempt(p, "bio-life", 6);
    expect(totalPoints(p)).toBe(80);
    expect(p["bio-life"]?.attempts).toBe(4);
    for (const m of MISSIONS) p = recordAttempt(p, m.id, 6);
    expect(totalPoints(p)).toBe(400);
    expect(explorerRank(400)).toBe("Znawca życia");
    expect(explorerRank(0)).toBe("Młody obserwator");
    expect(explorerRank(60)).toBe("Badacz");
    expect(explorerRank(200)).toBe("Przyrodnik");
  });
  it("ignores corrupt, impossible and unrelated persisted scores", () => {
    expect(readProgress("{bad json")).toEqual({});
    expect(readProgress("null")).toEqual({});
    expect(
      readProgress(
        JSON.stringify({
          "bio-life": { best: 99, attempts: 1 },
          "bio-research": { best: 4, attempts: 2 },
          other: { best: 6, attempts: 1 },
        }),
      ),
    ).toEqual({ "bio-research": { best: 4, attempts: 2 } });
    expect(recordAttempt({}, "bio-life", 7)).toEqual({});
    const p = recordAttempt({}, "bio-microscope", 0);
    expect(totalPoints(p)).toBe(20);
    expect(readProgress(JSON.stringify(p))).toEqual(p);
  });
});
