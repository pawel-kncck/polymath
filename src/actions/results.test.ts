import { describe, it, expect, vi, beforeEach } from 'vitest';
import { saveResult, getUserResults, getResultById } from './results';
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
        {
          itemId: 'item2',
          prompt: 'box',
          correctAnswer: 'boxes',
          userAnswer: 'boxs',
        },
      ],
    };

    it('should save result with correct user ID', async () => {
      const mockSavedResult = {
        id: 'result-123',
        userId: 'user-123',
        moduleId: 'module-456',
        score: 8,
        total: 10,
        time: 120,
        mistakes: mockQuizResult.mistakes,
        createdAt: new Date(),
      };

      vi.mocked(prisma.result.create).mockResolvedValue(mockSavedResult as any);

      const result = await saveResult('module-456', mockQuizResult);

      expect(requireAuth).toHaveBeenCalled();
      expect(prisma.result.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-123',
          moduleId: 'module-456',
          score: 8,
          total: 10,
          time: 120,
          mistakes: mockQuizResult.mistakes,
        },
      });
      expect(result).toEqual(mockSavedResult);
    });

    it('should throw error if not authenticated', async () => {
      vi.mocked(requireAuth).mockRejectedValue(new Error('Not authenticated'));

      await expect(saveResult('module-456', mockQuizResult)).rejects.toThrow(
        'Not authenticated'
      );

      expect(prisma.result.create).not.toHaveBeenCalled();
    });
  });

  describe('getUserResults', () => {
    it('should return results for current user', async () => {
      const mockResults = [
        {
          id: 'result-1',
          userId: 'user-123',
          moduleId: 'module-1',
          score: 8,
          total: 10,
          time: 120,
          mistakes: [],
          createdAt: new Date('2024-01-02'),
          module: {
            title: 'English Plurals',
            subject: 'LANGUAGE',
          },
        },
        {
          id: 'result-2',
          userId: 'user-123',
          moduleId: 'module-1',
          score: 10,
          total: 10,
          time: 90,
          mistakes: [],
          createdAt: new Date('2024-01-01'),
          module: {
            title: 'English Plurals',
            subject: 'LANGUAGE',
          },
        },
      ];

      vi.mocked(prisma.result.findMany).mockResolvedValue(mockResults as any);

      const results = await getUserResults();

      expect(requireAuth).toHaveBeenCalled();
      expect(prisma.result.findMany).toHaveBeenCalledWith({
        where: {
          userId: 'user-123',
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
      expect(results).toEqual(mockResults);
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
    it('should return result if owned by user', async () => {
      const mockResult = {
        id: 'result-123',
        userId: 'user-123',
        moduleId: 'module-1',
        score: 8,
        total: 10,
        time: 120,
        mistakes: [],
        createdAt: new Date(),
        module: {
          title: 'English Plurals',
          subject: 'LANGUAGE',
        },
      };

      vi.mocked(prisma.result.findFirst).mockResolvedValue(mockResult as any);

      const result = await getResultById('result-123');

      expect(requireAuth).toHaveBeenCalled();
      expect(prisma.result.findFirst).toHaveBeenCalledWith({
        where: {
          id: 'result-123',
          userId: 'user-123',
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
      expect(result).toEqual(mockResult);
    });

    it('should return null if result belongs to different user', async () => {
      vi.mocked(prisma.result.findFirst).mockResolvedValue(null);

      const result = await getResultById('result-456');

      expect(result).toBeNull();
      expect(prisma.result.findFirst).toHaveBeenCalledWith({
        where: {
          id: 'result-456',
          userId: 'user-123',
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
    });

    it('should return null if result does not exist', async () => {
      vi.mocked(prisma.result.findFirst).mockResolvedValue(null);

      const result = await getResultById('invalid-id');

      expect(result).toBeNull();
    });

    it('should throw error if not authenticated', async () => {
      vi.mocked(requireAuth).mockRejectedValue(new Error('Not authenticated'));

      await expect(getResultById('result-123')).rejects.toThrow('Not authenticated');
    });
  });
});
