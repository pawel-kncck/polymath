import type { ContentItem, ContentModule } from '../types';
import {
  DEFAULT_TEST_SIZE,
  FRACTION_LEVELS,
  QUESTIONS_PER_LEVEL,
  gcd,
  pickN,
  type FractionLevel,
} from './fractions-shared';

interface BaseRanges {
  numeratorMax: number;
  denominatorMax: number;
  factorMin: number;
  factorMax: number;
}

// Mirror the expanding ranges so a level-1 simplification feels comparable in
// arithmetic load to a level-1 expansion. Final unsimplified fractions stay
// within roughly the same product range.
const RANGES: Record<FractionLevel, BaseRanges> = {
  1: { numeratorMax: 6, denominatorMax: 8, factorMin: 2, factorMax: 5 },
  2: { numeratorMax: 9, denominatorMax: 12, factorMin: 3, factorMax: 8 },
  3: { numeratorMax: 14, denominatorMax: 18, factorMin: 5, factorMax: 12 },
};

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

function buildItemsForLevel(level: FractionLevel): ContentItem[] {
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

  // Use a different seed than expanding so the same base/factor combos pick a
  // different subset. Otherwise the two modules feel like mirror images.
  const sampled = pickN(all, QUESTIONS_PER_LEVEL, level * 31 + 7);

  return sampled.map((p, idx) => ({
    id: `fractions-simplifying-l${level}-${String(idx + 1).padStart(2, '0')}`,
    type: 'FRACTION_SIMPLIFY',
    level,
    content: {
      numerator: p.presentedN,
      denominator: p.presentedD,
      answer: `${p.reducedN}/${p.reducedD}`,
      instruction: {
        pl: `Skróć ułamek ${p.presentedN}/${p.presentedD} do najprostszej postaci`,
        en: `Simplify the fraction ${p.presentedN}/${p.presentedD} to its lowest terms`,
      },
    },
  }));
}

const items: ContentItem[] = FRACTION_LEVELS.flatMap((level) =>
  buildItemsForLevel(level)
);

export const fractionsSimplifying: ContentModule = {
  id: 'fractions-simplifying',
  title: {
    pl: 'Ułamki: skracanie',
    en: 'Fractions: Simplifying',
  },
  description: {
    pl: 'Skracanie ułamków do najprostszej postaci (3 poziomy trudności)',
    en: 'Reduce fractions to lowest terms across three difficulty levels',
  },
  subject: 'MATH',
  category: 'MATH',
  languages: ['pl', 'en'],
  levels: [...FRACTION_LEVELS],
  defaultTestSize: DEFAULT_TEST_SIZE,
  items,
};
