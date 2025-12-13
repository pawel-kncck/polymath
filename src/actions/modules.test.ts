import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getModules, getModuleById, getModuleWithRandomItems } from './modules';

// Mock Prisma
vi.mock('@/lib/db', () => ({
  prisma: {
    module: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

import { prisma } from '@/lib/db';

describe('modules actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getModules', () => {
    it('should return all modules with item counts', async () => {
      const mockModules = [
        {
          id: '1',
          title: 'English Plurals',
          subject: 'LANGUAGE',
          description: 'Practice plurals',
          createdAt: new Date(),
          updatedAt: new Date(),
          _count: { items: 10 },
        },
        {
          id: '2',
          title: 'Math Quiz',
          subject: 'MATH',
          description: 'Basic math',
          createdAt: new Date(),
          updatedAt: new Date(),
          _count: { items: 5 },
        },
      ];

      vi.mocked(prisma.module.findMany).mockResolvedValue(mockModules as any);

      const result = await getModules();

      expect(result).toEqual(mockModules);
      expect(prisma.module.findMany).toHaveBeenCalledWith({
        include: {
          _count: {
            select: { items: true },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    });

    it('should return empty array when no modules exist', async () => {
      vi.mocked(prisma.module.findMany).mockResolvedValue([]);

      const result = await getModules();

      expect(result).toEqual([]);
    });
  });

  describe('getModuleById', () => {
    it('should return module with items', async () => {
      const mockModule = {
        id: '1',
        title: 'English Plurals',
        subject: 'LANGUAGE',
        description: 'Practice plurals',
        createdAt: new Date(),
        updatedAt: new Date(),
        items: [
          {
            id: 'item1',
            moduleId: '1',
            type: 'TEXT',
            content: { prompt: 'cat', answer: 'cats' },
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      };

      vi.mocked(prisma.module.findUnique).mockResolvedValue(mockModule as any);

      const result = await getModuleById('1');

      expect(result).toEqual(mockModule);
      expect(prisma.module.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: {
          items: true,
        },
      });
    });

    it('should return null for non-existent module', async () => {
      vi.mocked(prisma.module.findUnique).mockResolvedValue(null);

      const result = await getModuleById('invalid-id');

      expect(result).toBeNull();
    });
  });

  describe('getModuleWithRandomItems', () => {
    const mockModule = {
      id: '1',
      title: 'English Plurals',
      subject: 'LANGUAGE',
      description: 'Practice plurals',
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [
        {
          id: 'item1',
          moduleId: '1',
          type: 'TEXT',
          content: { prompt: 'cat', answer: 'cats' },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'item2',
          moduleId: '1',
          type: 'TEXT',
          content: { prompt: 'dog', answer: 'dogs' },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'item3',
          moduleId: '1',
          type: 'TEXT',
          content: { prompt: 'box', answer: 'boxes' },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'item4',
          moduleId: '1',
          type: 'TEXT',
          content: { prompt: 'baby', answer: 'babies' },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'item5',
          moduleId: '1',
          type: 'TEXT',
          content: { prompt: 'child', answer: 'children' },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    };

    it('should return module with all items when count not specified', async () => {
      vi.mocked(prisma.module.findUnique).mockResolvedValue(mockModule as any);

      const result = await getModuleWithRandomItems('1');

      expect(result).toBeDefined();
      expect(result?.items).toHaveLength(5);
      expect(result?.title).toBe('English Plurals');
    });

    it('should return module with specified number of items', async () => {
      vi.mocked(prisma.module.findUnique).mockResolvedValue(mockModule as any);

      const result = await getModuleWithRandomItems('1', 3);

      expect(result).toBeDefined();
      expect(result?.items).toHaveLength(3);
    });

    it('should shuffle items (items in different order)', async () => {
      vi.mocked(prisma.module.findUnique).mockResolvedValue(mockModule as any);

      // Run multiple times to check for randomization
      const results: string[][] = [];
      for (let i = 0; i < 5; i++) {
        const result = await getModuleWithRandomItems('1');
        if (result) {
          results.push(result.items.map((item) => item.id));
        }
      }

      // At least one result should be different from the original order
      const originalOrder = mockModule.items.map((item) => item.id);
      const hasShuffled = results.some(
        (order) => JSON.stringify(order) !== JSON.stringify(originalOrder)
      );

      // Note: There's a small chance all 5 shuffles are the same as original
      // but it's extremely unlikely with 5 items (1/120 chance per shuffle)
      expect(hasShuffled).toBe(true);
    });

    it('should return null for non-existent module', async () => {
      vi.mocked(prisma.module.findUnique).mockResolvedValue(null);

      const result = await getModuleWithRandomItems('invalid-id');

      expect(result).toBeNull();
    });

    it('should handle count larger than available items', async () => {
      vi.mocked(prisma.module.findUnique).mockResolvedValue(mockModule as any);

      const result = await getModuleWithRandomItems('1', 100);

      expect(result).toBeDefined();
      expect(result?.items).toHaveLength(5); // Only 5 items available
    });
  });
});
