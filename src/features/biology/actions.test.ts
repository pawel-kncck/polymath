import { beforeEach, describe, expect, it, vi } from "vitest";
import { MISSIONS } from "./content";
const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  access: vi.fn(),
  find: vi.fn(),
  upsert: vi.fn(),
}));
vi.mock("@/lib/auth-utils", () => ({ requireAuth: mocks.auth }));
vi.mock("@/lib/access", () => ({
  getCurrentUserModuleAccess: mocks.access,
  isModuleAccessible: (
    access: { mode: string; ids?: Set<string> },
    id: string,
  ) => access.mode === "all" || access.ids?.has(id),
}));
vi.mock("@/lib/db", () => ({
  prisma: { result: { findUnique: mocks.find, upsert: mocks.upsert } },
}));
import { saveBiologyAttempt } from "./actions";
const id = "12345678-1234-4123-8123-123456789abc";
const answers = MISSIONS[0].questions.map((q) => q.correct);
beforeEach(() => {
  vi.clearAllMocks();
  mocks.auth.mockResolvedValue({ user: { id: "student" } });
  mocks.access.mockResolvedValue({ mode: "all" });
  mocks.find.mockResolvedValue(null);
  mocks.upsert.mockResolvedValue({ id });
});
describe("Biology result persistence", () => {
  it("grades on the server and saves under the authenticated student", async () => {
    await saveBiologyAttempt("bio-life", answers, 25, id);
    expect(mocks.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id },
        update: {},
        create: expect.objectContaining({
          userId: "student",
          score: 6,
          total: 6,
          moduleId: "bio-life",
          time: 25,
        }),
      }),
    );
  });
  it("denies inaccessible missions before any database write", async () => {
    mocks.access.mockResolvedValue({ mode: "allowList", ids: new Set() });
    await expect(
      saveBiologyAttempt("bio-life", answers, 0, id),
    ).rejects.toThrow("Brak dostępu");
    expect(mocks.upsert).not.toHaveBeenCalled();
  });
  it("requires authentication", async () => {
    mocks.auth.mockRejectedValue(new Error("Unauthorized"));
    await expect(
      saveBiologyAttempt("bio-life", answers, 0, id),
    ).rejects.toThrow("Unauthorized");
    expect(mocks.upsert).not.toHaveBeenCalled();
  });
  it("rejects invalid submissions and another user’s attempt id", async () => {
    await expect(
      saveBiologyAttempt("bio-life", answers, 0, "bad"),
    ).rejects.toThrow();
    await expect(saveBiologyAttempt("bio-life", [], 0, id)).rejects.toThrow();
    mocks.find.mockResolvedValue({ userId: "someone-else" });
    await expect(
      saveBiologyAttempt("bio-life", answers, 0, id),
    ).rejects.toThrow();
    expect(mocks.upsert).not.toHaveBeenCalled();
  });
  it("rejects reuse of an attempt id from another module", async () => {
    mocks.find.mockResolvedValue({ userId: "student", moduleId: "geo-map" });
    await expect(
      saveBiologyAttempt("bio-life", answers, 0, id),
    ).rejects.toThrow();
    expect(mocks.upsert).not.toHaveBeenCalled();
  });
  it("retries the same attempt without updating or duplicating it", async () => {
    mocks.find.mockResolvedValue({ userId: "student", moduleId: "bio-life" });
    await saveBiologyAttempt("bio-life", answers, 25, id);
    expect(mocks.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id }, update: {} }),
    );
  });
});
