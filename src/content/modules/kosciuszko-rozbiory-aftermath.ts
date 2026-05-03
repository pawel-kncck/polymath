import type { ContentModule } from '../types';
import {
  KOSCIUSZKO_ROZBIORY_LEVELS,
  KOSCIUSZKO_ROZBIORY_TEST_SIZE,
} from '../banks/kosciuszko-rozbiory';

export const kosciuszkoRozbioryAftermath: ContentModule = {
  id: 'kosciuszko-rozbiory-aftermath',
  title: {
    pl: 'III rozbiór i utrata niepodległości',
  },
  description: {
    pl: 'III rozbiór Polski, abdykacja króla, los Kościuszki po klęsce, Panorama Racławicka oraz 123 lata zaborów (3 poziomy trudności, 10 losowych pytań w teście).',
  },
  subject: 'LOGIC',
  category: 'HISTORY',
  areaId: 'kosciuszko-rozbiory',
  languages: ['pl'],
  generator: {
    bankId: 'kosciuszko-rozbiory',
    topics: ['AFTERMATH'],
  },
  items: [],
  levels: [...KOSCIUSZKO_ROZBIORY_LEVELS],
  defaultTestSize: KOSCIUSZKO_ROZBIORY_TEST_SIZE,
};
