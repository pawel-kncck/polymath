import { describe, it, expect } from 'vitest';
import { getContentModule } from '@/content';
import {
  KOSCIUSZKO_ROZBIORY_LEVELS,
  KOSCIUSZKO_ROZBIORY_TEST_SIZE,
  kosciuszkoRozbioryBank,
} from './kosciuszko-rozbiory';
import type { ContentModule } from '../types';
import type { Locale } from '@/i18n/config';

type LocalizedString = Partial<Record<Locale, string>>;
type LocalizedArray = Partial<Record<Locale, string[]>>;
type ItemContent = {
  prompt: LocalizedString;
  options: LocalizedArray;
  answer: LocalizedString;
  hint?: LocalizedString;
};

const TOPICS = ['CRISIS', 'UPRISING', 'AFTERMATH'] as const;
const MODULE_IDS = [
  'kosciuszko-rozbiory-crisis',
  'kosciuszko-rozbiory-uprising',
  'kosciuszko-rozbiory-aftermath',
] as const;

describe('kosciuszko-rozbiory bank', () => {
  it('contains roughly 200 items', () => {
    expect(kosciuszkoRozbioryBank.items.length).toBeGreaterThanOrEqual(180);
    expect(kosciuszkoRozbioryBank.items.length).toBeLessThanOrEqual(220);
  });

  it('uses unique ids that follow the bank-prefixed pattern', () => {
    const ids = kosciuszkoRozbioryBank.items.map((i) => i.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^kosciuszko-rozbiory-\d{3}$/);
    }
  });

  it('uses SINGLE_CHOICE for every item', () => {
    for (const item of kosciuszkoRozbioryBank.items) {
      expect(item.type).toBe('SINGLE_CHOICE');
    }
  });

  it('tags every item with a known topic and a level in 1..3', () => {
    for (const item of kosciuszkoRozbioryBank.items) {
      expect(TOPICS).toContain(item.topic as (typeof TOPICS)[number]);
      expect(KOSCIUSZKO_ROZBIORY_LEVELS).toContain(
        item.level as (typeof KOSCIUSZKO_ROZBIORY_LEVELS)[number]
      );
    }
  });

  it('provides Polish prompt, options, and answer for every item', () => {
    for (const item of kosciuszkoRozbioryBank.items) {
      const c = item.content as ItemContent;
      expect(c.prompt.pl, `item ${item.id} missing pl prompt`).toBeTruthy();
      expect(c.options.pl, `item ${item.id} missing pl options`).toBeTruthy();
      expect(c.options.pl!.length).toBeGreaterThanOrEqual(2);
      expect(c.answer.pl, `item ${item.id} missing pl answer`).toBeTruthy();
    }
  });

  it('ensures the correct answer is one of the provided options', () => {
    for (const item of kosciuszkoRozbioryBank.items) {
      const c = item.content as ItemContent;
      expect(c.options.pl, `item ${item.id} missing options`).toContain(
        c.answer.pl
      );
    }
  });

  it('has non-duplicate options within each item', () => {
    for (const item of kosciuszkoRozbioryBank.items) {
      const c = item.content as ItemContent;
      const opts = c.options.pl!;
      expect(
        new Set(opts).size,
        `item ${item.id} has duplicate options`
      ).toBe(opts.length);
    }
  });

  it('has at least 10 items per (topic, level) bucket so a 10-question random test always has enough pool', () => {
    for (const topic of TOPICS) {
      for (const level of KOSCIUSZKO_ROZBIORY_LEVELS) {
        const count = kosciuszkoRozbioryBank.items.filter(
          (i) => i.topic === topic && i.level === level
        ).length;
        expect(
          count,
          `topic=${topic} level=${level} has only ${count} items`
        ).toBeGreaterThanOrEqual(KOSCIUSZKO_ROZBIORY_TEST_SIZE);
      }
    }
  });
});

describe('kosciuszko-rozbiory modules', () => {
  it.each(MODULE_IDS)(
    'module "%s" loads, is Polish-only and references the shared bank',
    (id) => {
      const m = getContentModule(id) as ContentModule | null;
      expect(m).not.toBeNull();
      expect(m!.languages).toEqual(['pl']);
      expect(m!.category).toBe('HISTORY');
      expect(m!.areaId).toBe('kosciuszko-rozbiory');
      expect(m!.defaultTestSize).toBe(KOSCIUSZKO_ROZBIORY_TEST_SIZE);
      expect(m!.levels).toEqual([...KOSCIUSZKO_ROZBIORY_LEVELS]);
      // The loader resolves bank-backed modules to their filtered item slice.
      expect(m!.items.length).toBeGreaterThanOrEqual(
        KOSCIUSZKO_ROZBIORY_TEST_SIZE * KOSCIUSZKO_ROZBIORY_LEVELS.length
      );
      for (const item of m!.items) {
        expect(KOSCIUSZKO_ROZBIORY_LEVELS).toContain(
          item.level as (typeof KOSCIUSZKO_ROZBIORY_LEVELS)[number]
        );
      }
    }
  );

  it('each module owns a distinct topic slice of the bank', () => {
    const crisis = getContentModule('kosciuszko-rozbiory-crisis')!;
    const uprising = getContentModule('kosciuszko-rozbiory-uprising')!;
    const aftermath = getContentModule('kosciuszko-rozbiory-aftermath')!;
    for (const item of crisis.items) expect(item.topic).toBe('CRISIS');
    for (const item of uprising.items) expect(item.topic).toBe('UPRISING');
    for (const item of aftermath.items) expect(item.topic).toBe('AFTERMATH');
    const totalAcrossModules =
      crisis.items.length + uprising.items.length + aftermath.items.length;
    expect(totalAcrossModules).toBe(kosciuszkoRozbioryBank.items.length);
  });
});
