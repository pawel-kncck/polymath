import type { ContentModule } from '../types';
import {
  sentencePartsLevelDescriptions,
  sentencePartsLevelTitles,
} from '../banks/sentence-parts';

export const sentencePartsLevel4: ContentModule = {
  id: 'sentence-parts-level-4',
  title: sentencePartsLevelTitles[4],
  description: sentencePartsLevelDescriptions[4],
  subject: 'LANGUAGE',
  category: 'POLISH',
  areaId: 'sentence-parts',
  languages: ['pl'],
  generator: { bankId: 'sentence-parts', levels: [4] },
  items: [], // populated by the loader from the sentence-parts bank
};
