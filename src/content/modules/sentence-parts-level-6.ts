import type { ContentModule } from '../types';
import {
  sentencePartsLevelDescriptions,
  sentencePartsLevelTitles,
} from '../banks/sentence-parts';

export const sentencePartsLevel6: ContentModule = {
  id: 'sentence-parts-level-6',
  title: sentencePartsLevelTitles[6],
  description: sentencePartsLevelDescriptions[6],
  subject: 'LANGUAGE',
  category: 'POLISH',
  areaId: 'sentence-parts',
  languages: ['pl'],
  generator: { bankId: 'sentence-parts', levels: [6] },
  items: [], // populated by the loader from the sentence-parts bank
};
