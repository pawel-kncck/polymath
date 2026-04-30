import { describe, it, expect } from 'vitest';
import {
  fractionsBank,
  FRACTION_LEVELS,
  QUESTIONS_PER_LEVEL,
  gcd,
  pickN,
} from './fractions';
import type {
  FractionExpandContent,
  FractionReduceContent,
  FractionSimplifyContent,
} from '@/types/content';

describe('gcd / pickN helpers', () => {
  it('gcd handles typical and edge inputs', () => {
    expect(gcd(12, 18)).toBe(6);
    expect(gcd(0, 5)).toBe(5);
    expect(gcd(7, 0)).toBe(7);
    expect(gcd(7, 13)).toBe(1);
  });

  it('pickN is deterministic for the same seed and varies across seeds', () => {
    const list = Array.from({ length: 30 }, (_, i) => i);
    expect(pickN(list, 8, 17)).toEqual(pickN(list, 8, 17));
    expect(pickN(list, 8, 17)).not.toEqual(pickN(list, 8, 99));
  });

  it('pickN returns the original list when shorter than n', () => {
    expect(pickN([1, 2, 3], 5, 1)).toEqual([1, 2, 3]);
  });
});

describe('fractions bank', () => {
  const expand = fractionsBank.items.filter(
    (i) => i.topic === 'FRACTION_EXPAND'
  );
  const simplify = fractionsBank.items.filter(
    (i) => i.topic === 'FRACTION_SIMPLIFY'
  );
  const reduce = fractionsBank.items.filter(
    (i) => i.topic === 'FRACTION_REDUCE'
  );

  it('produces QUESTIONS_PER_LEVEL items per (topic, level)', () => {
    for (const level of FRACTION_LEVELS) {
      expect(expand.filter((i) => i.level === level)).toHaveLength(
        QUESTIONS_PER_LEVEL
      );
      expect(simplify.filter((i) => i.level === level)).toHaveLength(
        QUESTIONS_PER_LEVEL
      );
      expect(reduce.filter((i) => i.level === level)).toHaveLength(
        QUESTIONS_PER_LEVEL
      );
    }
  });

  it('every item has a unique id and a topic that matches its type', () => {
    const seen = new Set<string>();
    for (const item of fractionsBank.items) {
      expect(seen.has(item.id)).toBe(false);
      seen.add(item.id);
      expect(item.topic).toBe(item.type);
    }
  });

  it('FRACTION_EXPAND answers equal numerator*factor / denominator*factor', () => {
    for (const item of expand) {
      const c = item.content as FractionExpandContent;
      expect(c.answer).toBe(
        `${c.numerator * c.factor}/${c.denominator * c.factor}`
      );
      expect(gcd(c.numerator, c.denominator)).toBe(1); // base in lowest terms
    }
  });

  it('FRACTION_SIMPLIFY answers are equivalent and fully reduced', () => {
    for (const item of simplify) {
      const c = item.content as FractionSimplifyContent;
      expect(gcd(c.numerator, c.denominator)).toBeGreaterThan(1);
      const [an, ad] = c.answer.split('/').map(Number);
      expect(gcd(an, ad)).toBe(1);
      expect(c.numerator * ad).toBe(c.denominator * an);
    }
  });

  it('FRACTION_REDUCE answers equal numerator/factor / denominator/factor', () => {
    for (const item of reduce) {
      const c = item.content as FractionReduceContent;
      expect(c.numerator % c.factor).toBe(0);
      expect(c.denominator % c.factor).toBe(0);
      expect(c.factor).toBeGreaterThan(1);
      expect(c.answer).toBe(
        `${c.numerator / c.factor}/${c.denominator / c.factor}`
      );
    }
  });
});
