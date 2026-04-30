import type { ContentModule } from '../types';
import {
  DEFAULT_TEST_SIZE,
  FRACTION_LEVELS,
} from '../banks/fractions';

export const fractionsReduce: ContentModule = {
  id: 'fractions-reduce',
  title: {
    pl: 'Skracanie przez liczbę',
    en: 'Reduction by a number',
  },
  description: {
    pl: 'Dziel licznik i mianownik przez wskazaną liczbę — wynik nie musi być w najprostszej postaci',
    en: 'Divide numerator and denominator by the given number — the result is not necessarily in lowest terms',
  },
  subject: 'MATH',
  category: 'MATH',
  areaId: 'fractions',
  languages: ['pl', 'en'],
  generator: { bankId: 'fractions', topics: ['FRACTION_REDUCE'] },
  items: [], // populated by the loader from the fractions bank
  levels: [...FRACTION_LEVELS],
  defaultTestSize: DEFAULT_TEST_SIZE,
};
