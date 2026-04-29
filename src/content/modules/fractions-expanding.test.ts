import { describe, it, expect } from 'vitest';
import { fractionsExpanding } from './fractions-expanding';
import {
  FRACTION_LEVELS,
  QUESTIONS_PER_LEVEL,
  gcd,
} from './fractions-shared';
import type { FractionExpandContent } from '@/types/content';

describe('fractionsExpanding module', () => {
  it('declares all three levels and the configured test size', () => {
    expect(fractionsExpanding.levels).toEqual([1, 2, 3]);
    expect(fractionsExpanding.defaultTestSize).toBeGreaterThan(0);
  });

  it('produces the configured number of items per level', () => {
    for (const level of FRACTION_LEVELS) {
      const items = fractionsExpanding.items.filter((i) => i.level === level);
      expect(items).toHaveLength(QUESTIONS_PER_LEVEL);
    }
  });

  it('every item has a stable id, matching type and level', () => {
    const seen = new Set<string>();
    for (const item of fractionsExpanding.items) {
      expect(item.type).toBe('FRACTION_EXPAND');
      expect(typeof item.level).toBe('number');
      expect(seen.has(item.id)).toBe(false);
      seen.add(item.id);
    }
  });

  it('answer = numerator*factor / denominator*factor for every item', () => {
    for (const item of fractionsExpanding.items) {
      const c = item.content as FractionExpandContent;
      expect(c.numerator).toBeGreaterThan(0);
      expect(c.denominator).toBeGreaterThan(0);
      expect(c.factor).toBeGreaterThan(1);
      expect(c.answer).toBe(
        `${c.numerator * c.factor}/${c.denominator * c.factor}`
      );
    }
  });

  it('base fractions are always in lowest terms (so expanding is meaningful)', () => {
    for (const item of fractionsExpanding.items) {
      const c = item.content as FractionExpandContent;
      expect(gcd(c.numerator, c.denominator)).toBe(1);
    }
  });
});
