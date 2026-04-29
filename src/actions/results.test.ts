import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  saveResult,
  getUserResults,
  getResultById,
  getUserModuleProgress,
} from './results';
import type { QuizResult } from '@/types/quiz';

// Mock dependencies
vi.mock('@/lib/db', () => ({
  prisma: {
    result: {
      create: vi.fn(),
      findMany: vi.fn(),
      findFirst: vi.fn(),
    },
  },
}));

vi.mock('@/lib/auth-utils', () => ({
  requireAuth: vi.fn(),
}));

import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth-utils';

describe('results actions', () => {
  const mockSession = {
    user: {
      id: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
      role: 'STUDENT',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requireAuth).mockResolvedValue(mockSession as any);
  });

  describe('saveResult', () => {
    const mockQuizResult: QuizResult = {
      score: 8,
      total: 10,
      time: 120,
      mistakes: [
        {
          itemId: 'item1',
          prompt: 'cat',
          correctAnswer: 'cats',
          userAnswer: 'cat',
        },
      ],
    };

    it('should save result with correct user ID', async () => {
      const mockSavedResult = {
        id: 'result-123',
        userId: 'user-123',
        moduleId: 'english-plurals',
        score: 8,
        total: 10,
        time: 120,
        mistakes: mockQuizResult.mistakes,
        level: null,
        createdAt: new Date(),
      };

      vi.mocked(prisma.result.create).mockResolvedValue(mockSavedResult as any);

      const result = await saveResult('english-plurals', mockQuizResult);

      expect(requireAuth).toHaveBeenCalled();
      expect(prisma.result.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-123',
          moduleId: 'english-plurals',
          score: 8,
          total: 10,
          time: 120,
          mistakes: mockQuizResult.mistakes,
          level: null,
        },
      });
      expect(result).toEqual(mockSavedResult);
    });

    it('persists the difficulty level when supplied', async () => {
      const mockSavedResult = {
        id: 'result-456',
        userId: 'user-123',
        moduleId: 'fractions-expanding',
        score: 5,
        total: 5,
        time: 90,
        mistakes: [],
        level: 2,
        createdAt: new Date(),
      };
      vi.mocked(prisma.result.create).mockResolvedValue(mockSavedResult as any);

      await saveResult(
        'fractions-expanding',
        { ...mockQuizResult, score: 5, total: 5, time: 90, mistakes: [] },
        2
      );

      expect(prisma.result.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          moduleId: 'fractions-expanding',
          level: 2,
        }),
      });
    });

    it('should throw error if not authenticated', async () => {
      vi.mocked(requireAuth).mockRejectedValue(new Error('Not authenticated'));

      await expect(
        saveResult('english-plurals', mockQuizResult)
      ).rejects.toThrow('Not authenticated');

      expect(prisma.result.create).not.toHaveBeenCalled();
    });
  });

  describe('getUserResults', () => {
    it('attaches module metadata from the content loader', async () => {
      const dbRows = [
        {
          id: 'result-1',
          userId: 'user-123',
          moduleId: 'english-plurals',
          score: 8,
          total: 10,
          time: 120,
          mistakes: [],
          createdAt: new Date('2024-01-02'),
        },
      ];
      vi.mocked(prisma.result.findMany).mockResolvedValue(dbRows as any);

      const results = await getUserResults();

      expect(requireAuth).toHaveBeenCalled();
      expect(prisma.result.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
        orderBy: { createdAt: 'desc' },
      });
      expect(results).toHaveLength(1);
      expect(results[0].module).toEqual({
        title: { en: 'English Plurals' },
        subject: 'LANGUAGE',
      });
    });

    it('returns module=null when the moduleId no longer resolves to a content file', async () => {
      vi.mocked(prisma.result.findMany).mockResolvedValue([
        {
          id: 'result-orphan',
          userId: 'user-123',
          moduleId: 'removed-module',
          score: 0,
          total: 1,
          time: 10,
          mistakes: [],
          createdAt: new Date(),
        },
      ] as any);

      const results = await getUserResults();
      expect(results[0].module).toBeNull();
    });

    it('should return empty array when user has no results', async () => {
      vi.mocked(prisma.result.findMany).mockResolvedValue([]);

      const results = await getUserResults();
      expect(results).toEqual([]);
    });

    it('should throw error if not authenticated', async () => {
      vi.mocked(requireAuth).mockRejectedValue(new Error('Not authenticated'));

      await expect(getUserResults()).rejects.toThrow('Not authenticated');
    });
  });

  describe('getResultById', () => {
    it('returns the result with attached module metadata when owned by user', async () => {
      const dbRow = {
        id: 'result-123',
        userId: 'user-123',
        moduleId: 'english-plurals',
        score: 8,
        total: 10,
        time: 120,
        mistakes: [],
        createdAt: new Date(),
      };
      vi.mocked(prisma.result.findFirst).mockResolvedValue(dbRow as any);

      const result = await getResultById('result-123');

      expect(requireAuth).toHaveBeenCalled();
      expect(prisma.result.findFirst).toHaveBeenCalledWith({
        where: { id: 'result-123', userId: 'user-123' },
      });
      expect(result?.module).toEqual({
        title: { en: 'English Plurals' },
        subject: 'LANGUAGE',
      });
    });

    it('should return null if result does not exist or belongs to different user', async () => {
      vi.mocked(prisma.result.findFirst).mockResolvedValue(null);

      const result = await getResultById('result-456');
      expect(result).toBeNull();
    });

    it('should throw error if not authenticated', async () => {
      vi.mocked(requireAuth).mockRejectedValue(new Error('Not authenticated'));

      await expect(getResultById('result-123')).rejects.toThrow(
        'Not authenticated'
      );
    });
  });

  describe('getUserModuleProgress', () => {
    it('aggregates attempts and keeps the best score per module', async () => {
      vi.mocked(prisma.result.findMany).mockResolvedValue([
        {
          moduleId: 'english-plurals',
          score: 6,
          total: 10,
          createdAt: new Date('2024-01-01T10:00:00Z'),
        },
        {
          moduleId: 'english-plurals',
          score: 9,
          total: 10,
          createdAt: new Date('2024-01-02T10:00:00Z'),
        },
        {
          moduleId: 'general-knowledge',
          score: 5,
          total: 5,
          createdAt: new Date('2024-01-03T10:00:00Z'),
        },
      ] as any);

      const progress = await getUserModuleProgress();

      expect(prisma.result.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
        select: {
          moduleId: true,
          score: true,
          total: true,
          createdAt: true,
        },
      });
      expect(progress['english-plurals']).toMatchObject({
        attempts: 2,
        bestScore: 9,
        bestTotal: 10,
        bestPercent: 0.9,
      });
      expect(progress['english-plurals'].lastAttemptAt).toEqual(
        new Date('2024-01-02T10:00:00Z')
      );
      expect(progress['general-knowledge']).toMatchObject({
        attempts: 1,
        bestScore: 5,
        bestTotal: 5,
        bestPercent: 1,
      });
    });

    it('returns an empty object when the user has no results', async () => {
      vi.mocked(prisma.result.findMany).mockResolvedValue([] as any);
      const progress = await getUserModuleProgress();
      expect(progress).toEqual({});
    });

    it('handles a zero-total guard without dividing by zero', async () => {
      vi.mocked(prisma.result.findMany).mockResolvedValue([
        {
          moduleId: 'empty-mod',
          score: 0,
          total: 0,
          createdAt: new Date(),
        },
      ] as any);
      const progress = await getUserModuleProgress();
      expect(progress['empty-mod'].bestPercent).toBe(0);
    });

    it('throws when not authenticated', async () => {
      vi.mocked(requireAuth).mockRejectedValue(new Error('Not authenticated'));
      await expect(getUserModuleProgress()).rejects.toThrow(
        'Not authenticated'
      );
    });
  });
});
