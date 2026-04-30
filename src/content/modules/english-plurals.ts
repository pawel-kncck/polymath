import type { ContentModule } from '../types';

export const englishPlurals: ContentModule = {
  id: 'english-plurals',
  title: { en: 'English Plurals' },
  description: { en: 'Practice forming plural nouns in English' },
  subject: 'LANGUAGE',
  category: 'ENGLISH',
  areaId: 'english-plurals',
  languages: ['en'],
  generator: { bankId: 'english-plurals' },
  items: [], // populated by the loader from the english-plurals bank
};
