import { describe, it, expect } from 'vitest';
import { gcd, pickN } from './fractions-shared';

describe('gcd', () => {
  it('returns the greatest common divisor for typical inputs', () => {
    expect(gcd(12, 18)).toBe(6);
    expect(gcd(15, 25)).toBe(5);
    expect(gcd(7, 13)).toBe(1);
  });

  it('handles either argument being zero', () => {
    expect(gcd(0, 5)).toBe(5);
    expect(gcd(7, 0)).toBe(7);
  });

  it('treats negative inputs by absolute value', () => {
    expect(gcd(-12, 18)).toBe(6);
    expect(gcd(12, -18)).toBe(6);
  });
});

describe('pickN', () => {
  it('returns the original list when it is shorter than n', () => {
    expect(pickN([1, 2, 3], 5, 1)).toEqual([1, 2, 3]);
  });

  it('returns exactly n items when input is larger', () => {
    const list = Array.from({ length: 50 }, (_, i) => i);
    const sample = pickN(list, 10, 42);
    expect(sample).toHaveLength(10);
    for (const v of sample) expect(list).toContain(v);
  });

  it('is deterministic for the same seed', () => {
    const list = Array.from({ length: 30 }, (_, i) => i);
    const a = pickN(list, 8, 17);
    const b = pickN(list, 8, 17);
    expect(a).toEqual(b);
  });

  it('produces different samples for different seeds', () => {
    const list = Array.from({ length: 30 }, (_, i) => i);
    const a = pickN(list, 8, 17);
    const b = pickN(list, 8, 99);
    expect(a).not.toEqual(b);
  });
});
