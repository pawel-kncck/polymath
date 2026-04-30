import type { ContentModule } from '../types';
import {
  sentencePartsLevelDescriptions,
  sentencePartsLevelTitles,
} from '../banks/sentence-parts';

export const sentencePartsLevel1: ContentModule = {
  id: 'sentence-parts-level-1',
  title: sentencePartsLevelTitles[1],
  description: sentencePartsLevelDescriptions[1],
  subject: 'LANGUAGE',
  category: 'POLISH',
  areaId: 'sentence-parts',
  languages: ['pl'],
  generator: { bankId: 'sentence-parts', levels: [1] },
  items: [], // populated by the loader from the sentence-parts bank
};
