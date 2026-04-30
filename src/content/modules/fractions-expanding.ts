import type { ContentModule } from '../types';
import {
  DEFAULT_TEST_SIZE,
  FRACTION_LEVELS,
} from '../banks/fractions';

export const fractionsExpanding: ContentModule = {
  id: 'fractions-expanding',
  title: {
    pl: 'Rozszerzanie',
    en: 'Expanding',
  },
  description: {
    pl: 'Rozszerzanie ułamków przez wybrany czynnik (3 poziomy trudności)',
    en: 'Expand fractions by a given factor across three difficulty levels',
  },
  subject: 'MATH',
  category: 'MATH',
  areaId: 'fractions',
  languages: ['pl', 'en'],
  generator: { bankId: 'fractions', topics: ['FRACTION_EXPAND'] },
  items: [], // populated by the content loader from the fractions bank
  levels: [...FRACTION_LEVELS],
  defaultTestSize: DEFAULT_TEST_SIZE,
};
