import type { ContentModule } from '../types';
import {
  sentencePartsLevelDescriptions,
  sentencePartsLevelTitles,
} from '../banks/sentence-parts';

export const sentencePartsLevel3: ContentModule = {
  id: 'sentence-parts-level-3',
  title: sentencePartsLevelTitles[3],
  description: sentencePartsLevelDescriptions[3],
  subject: 'LANGUAGE',
  category: 'POLISH',
  areaId: 'sentence-parts',
  languages: ['pl'],
  generator: { bankId: 'sentence-parts', levels: [3] },
  items: [], // populated by the loader from the sentence-parts bank
};
