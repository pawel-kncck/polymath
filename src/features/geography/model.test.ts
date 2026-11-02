import { describe, expect, it } from "vitest";
import { MISSIONS, geographyModules } from "./content";
import {
  CONTOURS,
  contourShape,
  explorerRank,
  formatDistance,
  gradeAttempt,
  groundMeters,
  readProgress,
  recordAttempt,
  totalPoints,
} from "./model";
import { getContentModule } from "@/content";

describe("Geography learning content", () => {
  it("registers four distinct modules with six answerable questions each", () => {
    expect(MISSIONS).toHaveLength(4);
    const ids = MISSIONS.flatMap((m) => m.questions.map((q) => q.id));
    expect(new Set(ids).size).toBe(24);
    for (const m of MISSIONS) {
      expect(m.questions).toHaveLength(6);
      expect(getContentModule(m.id)?.category).toBe("GEOGRAPHY");
      expect(getContentModule(m.id)?.languages).toEqual(["pl"]);
      for (const q of m.questions) {
        expect(q.options[q.correct]).toBeTruthy();
        expect(new Set(q.options).size).toBe(4);
        expect(q.explanation.length).toBeGreaterThan(25);
      }
    }
    expect(geographyModules.every((m) => m.items.length === 6)).toBe(true);
  });
  it("converts scale in consistent units, including fractional map distances", () => {
    expect(groundMeters(6, 25000)).toBe(1500);
    expect(groundMeters(2.5, 10000)).toBe(250);
    expect(groundMeters(8, 10000)).toBe(800);
    expect(formatDistance(1500)).toBe("1,5 km");
    expect(formatDistance(250)).toBe("250 m");
  });
  it("uses nested contours with a steeper east slope", () => {
    for (let i = 1; i < CONTOURS.length; i++) {
      const outer = contourShape(CONTOURS[i - 1]),
        inner = contourShape(CONTOURS[i]);
      const east = outer.cx + outer.rx - (inner.cx + inner.rx);
      const west = inner.cx - inner.rx - (outer.cx - outer.rx);
      expect(east).toBeGreaterThan(0);
      expect(east).toBeLessThan(west);
      expect(inner.cy - inner.ry).toBeGreaterThan(outer.cy - outer.ry);
      expect(inner.cy + inner.ry).toBeLessThan(outer.cy + outer.ry);
    }
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
    expect(() => gradeAttempt("geo-map", [0], 0)).toThrow();
    expect(() => gradeAttempt("geo-map", [0, 0, 0, 0, 0, 99], 0)).toThrow();
    expect(() => gradeAttempt("geo-map", [0, 0, 0, 0, 0, 0.5], 0)).toThrow();
  });
  it("awards completion once and only adds points for improvements", () => {
    let p = recordAttempt({}, "geo-map", 4);
    expect(totalPoints(p)).toBe(60);
    p = recordAttempt(p, "geo-map", 4);
    expect(totalPoints(p)).toBe(60);
    p = recordAttempt(p, "geo-map", 2);
    expect(totalPoints(p)).toBe(60);
    p = recordAttempt(p, "geo-map", 6);
    expect(totalPoints(p)).toBe(80);
    expect(p["geo-map"]?.attempts).toBe(4);
    for (const m of MISSIONS) p = recordAttempt(p, m.id, 6);
    expect(totalPoints(p)).toBe(320);
    expect(explorerRank(320)).toBe("Mistrz map");
    expect(explorerRank(0)).toBe("Początkujący odkrywca");
    expect(explorerRank(60)).toBe("Odkrywca");
    expect(explorerRank(160)).toBe("Przewodnik");
  });
  it("ignores corrupt, impossible and unrelated persisted scores", () => {
    expect(readProgress("{bad json")).toEqual({});
    expect(readProgress("null")).toEqual({});
    expect(
      readProgress(
        JSON.stringify({
          "geo-map": { best: 99, attempts: 1 },
          "geo-scale": { best: 4, attempts: 2 },
          other: { best: 6, attempts: 1 },
        }),
      ),
    ).toEqual({ "geo-scale": { best: 4, attempts: 2 } });
    expect(recordAttempt({}, "geo-map", 7)).toEqual({});
    const p = recordAttempt({}, "geo-relief", 0);
    expect(totalPoints(p)).toBe(20);
    expect(readProgress(JSON.stringify(p))).toEqual(p);
  });
});
