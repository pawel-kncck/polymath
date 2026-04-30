import type { ContentModule } from '../types';
import {
  sentencePartsLevelDescriptions,
  sentencePartsLevelTitles,
} from '../banks/sentence-parts';

export const sentencePartsLevel7: ContentModule = {
  id: 'sentence-parts-level-7',
  title: sentencePartsLevelTitles[7],
  description: sentencePartsLevelDescriptions[7],
  subject: 'LANGUAGE',
  category: 'POLISH',
  areaId: 'sentence-parts',
  languages: ['pl'],
  generator: { bankId: 'sentence-parts', levels: [7] },
  items: [], // populated by the loader from the sentence-parts bank
};
