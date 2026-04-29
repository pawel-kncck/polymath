import { describe, it, expect } from 'vitest';
import { fractionsSimplifying } from './fractions-simplifying';
import {
  FRACTION_LEVELS,
  QUESTIONS_PER_LEVEL,
  gcd,
} from './fractions-shared';
import type { FractionSimplifyContent } from '@/types/content';

describe('fractionsSimplifying module', () => {
  it('declares all three levels and a default test size', () => {
    expect(fractionsSimplifying.levels).toEqual([1, 2, 3]);
    expect(fractionsSimplifying.defaultTestSize).toBeGreaterThan(0);
  });

  it('produces the configured number of items per level', () => {
    for (const level of FRACTION_LEVELS) {
      const items = fractionsSimplifying.items.filter((i) => i.level === level);
      expect(items).toHaveLength(QUESTIONS_PER_LEVEL);
    }
  });

  it('every presented fraction is reducible (gcd > 1) and the answer is fully reduced', () => {
    for (const item of fractionsSimplifying.items) {
      const c = item.content as FractionSimplifyContent;
      expect(gcd(c.numerator, c.denominator)).toBeGreaterThan(1);

      const [an, ad] = c.answer.split('/').map(Number);
      expect(an).toBeGreaterThan(0);
      expect(ad).toBeGreaterThan(0);
      expect(gcd(an, ad)).toBe(1);
      // the answer is mathematically equivalent to the presented fraction
      expect(c.numerator * ad).toBe(c.denominator * an);
    }
  });

  it('item ids are unique', () => {
    const seen = new Set<string>();
    for (const item of fractionsSimplifying.items) {
      expect(item.type).toBe('FRACTION_SIMPLIFY');
      expect(seen.has(item.id)).toBe(false);
      seen.add(item.id);
    }
  });
});
