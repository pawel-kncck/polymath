import type { ContentModule } from '../types';
import {
  sentencePartsLevelDescriptions,
  sentencePartsLevelTitles,
} from '../banks/sentence-parts';

export const sentencePartsLevel5: ContentModule = {
  id: 'sentence-parts-level-5',
  title: sentencePartsLevelTitles[5],
  description: sentencePartsLevelDescriptions[5],
  subject: 'LANGUAGE',
  category: 'POLISH',
  areaId: 'sentence-parts',
  languages: ['pl'],
  generator: { bankId: 'sentence-parts', levels: [5] },
  items: [], // populated by the loader from the sentence-parts bank
};
