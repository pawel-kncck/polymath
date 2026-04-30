// Single source of fraction questions. Three modules (expand / simplify /
// reduce) all read from this bank, filtering by `topic`. The bank itself is
// generated procedurally so the question set is deterministic and easy to
// grow — bumping QUESTIONS_PER_LEVEL or LEVELS doesn't require touching the
// modules.

import type { ContentItem } from '../types';

export type FractionTopic =
  | 'FRACTION_EXPAND'
  | 'FRACTION_SIMPLIFY'
  | 'FRACTION_REDUCE';

export const FRACTION_LEVELS = [1, 2, 3] as const;
export type FractionLevel = (typeof FRACTION_LEVELS)[number];

export const QUESTIONS_PER_LEVEL = 25;
export const DEFAULT_TEST_SIZE = 5;

interface BaseRanges {
  numeratorMax: number;
  denominatorMax: number;
  factorMin: number;
  factorMax: number;
}

const RANGES: Record<FractionLevel, BaseRanges> = {
  1: { numeratorMax: 6, denominatorMax: 8, factorMin: 2, factorMax: 5 },
  2: { numeratorMax: 9, denominatorMax: 12, factorMin: 3, factorMax: 8 },
  3: { numeratorMax: 14, denominatorMax: 18, factorMin: 5, factorMax: 12 },
};

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function pickN<T>(list: T[], n: number, seed: number): T[] {
  if (list.length <= n) return list.slice();
  const indexed = list.map((value, i) => ({
    value,
    key: (((i + 1) * 2654435761) ^ ((seed + 1) * 1597334677)) >>> 0,
  }));
  indexed.sort((a, b) => a.key - b.key);
  return indexed.slice(0, n).map((x) => x.value);
}

function divisorsGreaterThanOne(n: number): number[] {
  const out: number[] = [];
  for (let f = 2; f <= n; f++) {
    if (n % f === 0) out.push(f);
  }
  return out;
}

function enumerateBaseFractions(level: FractionLevel) {
  const { numeratorMax, denominatorMax } = RANGES[level];
  const out: { numerator: number; denominator: number }[] = [];
  for (let d = 2; d <= denominatorMax; d++) {
    for (let n = 1; n < d && n <= numeratorMax; n++) {
      if (gcd(n, d) !== 1) continue;
      out.push({ numerator: n, denominator: d });
    }
  }
  return out;
}

function enumerateFactors(level: FractionLevel) {
  const { factorMin, factorMax } = RANGES[level];
  const out: number[] = [];
  for (let f = factorMin; f <= factorMax; f++) out.push(f);
  return out;
}

// ─── Topic builders ──────────────────────────────────────────────────────────

function buildExpandItems(level: FractionLevel): ContentItem[] {
  const bases = enumerateBaseFractions(level);
  const factors = enumerateFactors(level);

  const all: { numerator: number; denominator: number; factor: number }[] = [];
  for (const base of bases) {
    for (const factor of factors) {
      all.push({ ...base, factor });
    }
  }
  const sampled = pickN(all, QUESTIONS_PER_LEVEL, level * 31);

  return sampled.map((p, idx) => {
    const targetN = p.numerator * p.factor;
    const targetD = p.denominator * p.factor;
    return {
      id: `fractions-expand-l${level}-${String(idx + 1).padStart(2, '0')}`,
      type: 'FRACTION_EXPAND',
      level,
      topic: 'FRACTION_EXPAND',
      content: {
        numerator: p.numerator,
        denominator: p.denominator,
        factor: p.factor,
        answer: `${targetN}/${targetD}`,
        // Number-free prompt — the visual equation in the renderer carries
        // the numbers. Used during the test.
        genericInstruction: {
          pl: 'Rozszerz ułamek przez liczbę',
          en: 'Expand the fraction by a number',
        },
        // Self-contained prompt with numbers, used in the history view.
        specificInstruction: {
          pl: `Rozszerz ${p.numerator}/${p.denominator} przez ${p.factor}`,
          en: `Expand ${p.numerator}/${p.denominator} by ${p.factor}`,
        },
      },
    };
  });
}

function buildSimplifyItems(level: FractionLevel): ContentItem[] {
  const bases = enumerateBaseFractions(level);
  const factors = enumerateFactors(level);

  const all: {
    presentedN: number;
    presentedD: number;
    reducedN: number;
    reducedD: number;
  }[] = [];
  for (const base of bases) {
    for (const factor of factors) {
      all.push({
        presentedN: base.numerator * factor,
        presentedD: base.denominator * factor,
        reducedN: base.numerator,
        reducedD: base.denominator,
      });
    }
  }
  const sampled = pickN(all, QUESTIONS_PER_LEVEL, level * 31 + 7);

  return sampled.map((p, idx) => ({
    id: `fractions-simplify-l${level}-${String(idx + 1).padStart(2, '0')}`,
    type: 'FRACTION_SIMPLIFY',
    level,
    topic: 'FRACTION_SIMPLIFY',
    content: {
      numerator: p.presentedN,
      denominator: p.presentedD,
      answer: `${p.reducedN}/${p.reducedD}`,
      genericInstruction: {
        pl: 'Skróć ułamek do najprostszej postaci',
        en: 'Simplify the fraction to its lowest terms',
      },
      specificInstruction: {
        pl: `Skróć ułamek ${p.presentedN}/${p.presentedD} do najprostszej postaci`,
        en: `Simplify the fraction ${p.presentedN}/${p.presentedD} to its lowest terms`,
      },
    },
  }));
}

function buildReduceItems(level: FractionLevel): ContentItem[] {
  const bases = enumerateBaseFractions(level);
  const factors = enumerateFactors(level);

  const all: {
    presentedN: number;
    presentedD: number;
    reduceBy: number;
    answerN: number;
    answerD: number;
  }[] = [];
  for (const base of bases) {
    for (const k of factors) {
      const presentedN = base.numerator * k;
      const presentedD = base.denominator * k;
      for (const f of divisorsGreaterThanOne(k)) {
        all.push({
          presentedN,
          presentedD,
          reduceBy: f,
          answerN: presentedN / f,
          answerD: presentedD / f,
        });
      }
    }
  }
  const sampled = pickN(all, QUESTIONS_PER_LEVEL, level * 31 + 13);

  return sampled.map((p, idx) => ({
    id: `fractions-reduce-l${level}-${String(idx + 1).padStart(2, '0')}`,
    type: 'FRACTION_REDUCE',
    level,
    topic: 'FRACTION_REDUCE',
    content: {
      numerator: p.presentedN,
      denominator: p.presentedD,
      factor: p.reduceBy,
      answer: `${p.answerN}/${p.answerD}`,
      // Number-free prompt — the visual equation carries the numbers.
      genericInstruction: {
        pl: 'Skróć ułamek przez liczbę',
        en: 'Reduce the fraction by a number',
      },
      specificInstruction: {
        pl: `Skróć ${p.presentedN}/${p.presentedD} przez ${p.reduceBy}`,
        en: `Reduce ${p.presentedN}/${p.presentedD} by ${p.reduceBy}`,
      },
    },
  }));
}

// ─── Bank export ─────────────────────────────────────────────────────────────

const allItems: ContentItem[] = FRACTION_LEVELS.flatMap((level) => [
  ...buildExpandItems(level),
  ...buildSimplifyItems(level),
  ...buildReduceItems(level),
]);

export const fractionsBank = {
  id: 'fractions',
  items: allItems,
};

// Re-exports useful for tests.
export { gcd, pickN };
