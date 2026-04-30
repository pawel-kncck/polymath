import type { ContentModule } from '../types';
import {
  sentencePartsLevelDescriptions,
  sentencePartsLevelTitles,
} from '../banks/sentence-parts';

export const sentencePartsLevel2: ContentModule = {
  id: 'sentence-parts-level-2',
  title: sentencePartsLevelTitles[2],
  description: sentencePartsLevelDescriptions[2],
  subject: 'LANGUAGE',
  category: 'POLISH',
  areaId: 'sentence-parts',
  languages: ['pl'],
  generator: { bankId: 'sentence-parts', levels: [2] },
  items: [], // populated by the loader from the sentence-parts bank
};
