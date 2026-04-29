import { describe, it, expect, vi, beforeEach } from 'vitest';

// The module actions filter by locale via getLocale(). Stub it to 'en' so
// the bilingual module (pl+en) is included in getModules() results.
vi.mock('@/i18n/server', () => ({
  getLocale: vi.fn().mockResolvedValue('en'),
}));

import {
  getModules,
  getModuleById,
  getModuleWithRandomItems,
} from './modules';

describe('modules actions (content-loader backed)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getModules', () => {
    it('returns every module whose languages include the active locale', async () => {
      const result = await getModules();
      const ids = result.map((m) => m.id);

      expect(ids).toContain('english-plurals');
      expect(ids).toContain('general-knowledge');
    });

    it('includes an item count per module', async () => {
      const result = await getModules();
      const english = result.find((m) => m.id === 'english-plurals');

      expect(english?._count.items).toBe(10);
    });

    it('exposes the category on each module', async () => {
      const result = await getModules();

      expect(result.find((m) => m.id === 'english-plurals')?.category).toBe(
        'ENGLISH'
      );
      expect(result.find((m) => m.id === 'general-knowledge')?.category).toBe(
        'GENERAL_KNOWLEDGE'
      );
    });

    it('categorizes polish sentence-parts modules as POLISH', async () => {
      const { getLocale } = await import('@/i18n/server');
      vi.mocked(getLocale).mockResolvedValueOnce('pl');

      const result = await getModules();
      const polishModules = result.filter((m) =>
        m.id.startsWith('sentence-parts-level-')
      );
      expect(polishModules.length).toBeGreaterThan(0);
      for (const m of polishModules) {
        expect(m.category).toBe('POLISH');
      }
    });

    it('categorizes karta-rowerowa under its own category', async () => {
      const { getLocale } = await import('@/i18n/server');
      vi.mocked(getLocale).mockResolvedValueOnce('pl');

      const result = await getModules();
      expect(result.find((m) => m.id === 'karta-rowerowa')?.category).toBe(
        'KARTA_ROWEROWA'
      );
    });

    it('filters out modules that do not support the active locale', async () => {
      const { getLocale } = await import('@/i18n/server');
      vi.mocked(getLocale).mockResolvedValueOnce('pl');

      const result = await getModules();
      const ids = result.map((m) => m.id);

      // english-plurals is en-only
      expect(ids).not.toContain('english-plurals');
      // general-knowledge is bilingual
      expect(ids).toContain('general-knowledge');
    });
  });

  describe('getModuleById', () => {
    it('returns the module with its items', async () => {
      const m = await getModuleById('english-plurals');

      expect(m).not.toBeNull();
      expect(m?.items).toHaveLength(10);
      expect(m?.items[0]).toMatchObject({
        id: 'english-plurals-01',
        type: 'TEXT',
      });
    });

    it('returns null for a non-existent module', async () => {
      const m = await getModuleById('does-not-exist');
      expect(m).toBeNull();
    });
  });

  describe('getModuleWithRandomItems', () => {
    it('returns all items when count is not specified', async () => {
      const m = await getModuleWithRandomItems('english-plurals');
      expect(m?.items).toHaveLength(10);
    });

    it('truncates to the requested count', async () => {
      const m = await getModuleWithRandomItems('english-plurals', 3);
      expect(m?.items).toHaveLength(3);
    });

    it('shuffles the items across repeated calls', async () => {
      const orders: string[][] = [];
      for (let i = 0; i < 10; i++) {
        const m = await getModuleWithRandomItems('english-plurals');
        if (m) orders.push(m.items.map((it) => it.id));
      }
      const uniqueOrders = new Set(orders.map((o) => o.join(',')));
      // With 10 items the odds of 10 identical shuffles are ~1 / 10!^9 — essentially nil.
      expect(uniqueOrders.size).toBeGreaterThan(1);
    });

    it('returns null for a non-existent module', async () => {
      const m = await getModuleWithRandomItems('no-such-module');
      expect(m).toBeNull();
    });

    it('caps returned items at the module size when count is too large', async () => {
      const m = await getModuleWithRandomItems('english-plurals', 999);
      expect(m?.items).toHaveLength(10);
    });

    it('filters items by level when a level is supplied', async () => {
      const m = await getModuleWithRandomItems('fractions-expanding', 5, 2);
      expect(m).not.toBeNull();
      expect(m?.items).toHaveLength(5);
      for (const item of m!.items) {
        expect(item.level).toBe(2);
      }
    });

    it('returns an empty list when no items match the requested level', async () => {
      const m = await getModuleWithRandomItems('fractions-expanding', 5, 99);
      expect(m?.items).toEqual([]);
    });
  });
});
