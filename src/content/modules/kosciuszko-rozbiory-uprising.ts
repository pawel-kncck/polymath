import type { ContentModule } from '../types';
import {
  KOSCIUSZKO_ROZBIORY_LEVELS,
  KOSCIUSZKO_ROZBIORY_TEST_SIZE,
} from '../banks/kosciuszko-rozbiory';

export const kosciuszkoRozbioryUprising: ContentModule = {
  id: 'kosciuszko-rozbiory-uprising',
  title: {
    pl: 'Powstanie kościuszkowskie',
  },
  description: {
    pl: 'Tadeusz Kościuszko, przysięga w Krakowie, kosynierzy, bitwy pod Racławicami i Maciejowicami (3 poziomy trudności, 10 losowych pytań w teście).',
  },
  subject: 'LOGIC',
  category: 'HISTORY',
  areaId: 'kosciuszko-rozbiory',
  languages: ['pl'],
  generator: {
    bankId: 'kosciuszko-rozbiory',
    topics: ['UPRISING'],
  },
  items: [],
  levels: [...KOSCIUSZKO_ROZBIORY_LEVELS],
  defaultTestSize: KOSCIUSZKO_ROZBIORY_TEST_SIZE,
};
