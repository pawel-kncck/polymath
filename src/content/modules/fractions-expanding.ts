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
      // Already in lowest terms — expanding only makes sense from a base form.
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

  // Cartesian product, then deterministically sample QUESTIONS_PER_LEVEL.
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
      id: `fractions-expanding-l${level}-${String(idx + 1).padStart(2, '0')}`,
      type: 'FRACTION_EXPAND',
      level,
      content: {
        numerator: p.numerator,
        denominator: p.denominator,
        factor: p.factor,
        answer: `${targetN}/${targetD}`,
        instruction: {
          pl: `Rozszerz ułamek ${p.numerator}/${p.denominator}, mnożąc przez ${p.factor}`,
          en: `Expand the fraction ${p.numerator}/${p.denominator} by a factor of ${p.factor}`,
        },
      },
    };
  });
}

const items: ContentItem[] = FRACTION_LEVELS.flatMap((level) =>
  buildItemsForLevel(level)
);

export const fractionsExpanding: ContentModule = {
  id: 'fractions-expanding',
  title: {
    pl: 'Ułamki: rozszerzanie',
    en: 'Fractions: Expanding',
  },
  description: {
    pl: 'Rozszerzanie ułamków przez wybrany czynnik (3 poziomy trudności)',
    en: 'Expand fractions by a given factor across three difficulty levels',
  },
  subject: 'MATH',
  category: 'MATH',
  languages: ['pl', 'en'],
  levels: [...FRACTION_LEVELS],
  defaultTestSize: DEFAULT_TEST_SIZE,
  items,
};
