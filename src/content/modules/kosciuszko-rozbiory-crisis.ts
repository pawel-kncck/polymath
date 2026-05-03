import type { ContentModule } from '../types';
import {
  KOSCIUSZKO_ROZBIORY_LEVELS,
  KOSCIUSZKO_ROZBIORY_TEST_SIZE,
} from '../banks/kosciuszko-rozbiory';

export const kosciuszkoRozbioryCrisis: ContentModule = {
  id: 'kosciuszko-rozbiory-crisis',
  title: {
    pl: 'Kryzys Rzeczypospolitej i I–II rozbiór',
  },
  description: {
    pl: 'Kryzys państwa w XVIII wieku, Konstytucja 3 maja oraz pierwsze dwa rozbiory Polski (3 poziomy trudności, 10 losowych pytań w teście).',
  },
  subject: 'LOGIC',
  category: 'HISTORY',
  areaId: 'kosciuszko-rozbiory',
  languages: ['pl'],
  generator: {
    bankId: 'kosciuszko-rozbiory',
    topics: ['CRISIS'],
  },
  items: [],
  levels: [...KOSCIUSZKO_ROZBIORY_LEVELS],
  defaultTestSize: KOSCIUSZKO_ROZBIORY_TEST_SIZE,
};
