import type { ContentModule } from '../types';
import {
  sentencePartsLevelDescriptions,
  sentencePartsLevelTitles,
} from '../banks/sentence-parts';

export const sentencePartsLevel8: ContentModule = {
  id: 'sentence-parts-level-8',
  title: sentencePartsLevelTitles[8],
  description: sentencePartsLevelDescriptions[8],
  subject: 'LANGUAGE',
  category: 'POLISH',
  areaId: 'sentence-parts',
  languages: ['pl'],
  generator: { bankId: 'sentence-parts', levels: [8] },
  items: [], // populated by the loader from the sentence-parts bank
};
