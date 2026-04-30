import type { ContentModule } from '../types';
import {
  DEFAULT_TEST_SIZE,
  FRACTION_LEVELS,
} from '../banks/fractions';

export const fractionsSimplifying: ContentModule = {
  id: 'fractions-simplifying',
  title: {
    pl: 'Skracanie do najprostszej postaci',
    en: 'Simplifying',
  },
  description: {
    pl: 'Skracanie ułamków do najprostszej postaci (3 poziomy trudności)',
    en: 'Reduce fractions to lowest terms across three difficulty levels',
  },
  subject: 'MATH',
  category: 'MATH',
  areaId: 'fractions',
  languages: ['pl', 'en'],
  generator: { bankId: 'fractions', topics: ['FRACTION_SIMPLIFY'] },
  items: [], // populated by the content loader from the fractions bank
  levels: [...FRACTION_LEVELS],
  defaultTestSize: DEFAULT_TEST_SIZE,
};
