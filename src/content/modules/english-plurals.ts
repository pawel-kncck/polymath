import type { ContentModule } from '../types';

export const englishPlurals: ContentModule = {
  id: 'english-plurals',
  title: { en: 'English Plurals' },
  description: { en: 'Practice forming plural nouns in English' },
  subject: 'LANGUAGE',
  languages: ['en'],
  items: [
    {
      id: 'english-plurals-01',
      type: 'TEXT',
      content: {
        prompt: { en: 'cat' },
        answer: { en: 'cats' },
        hint: { en: 'add -s' },
      },
    },
    {
      id: 'english-plurals-02',
      type: 'TEXT',
      content: {
        prompt: { en: 'dog' },
        answer: { en: 'dogs' },
        hint: { en: 'add -s' },
      },
    },
    {
      id: 'english-plurals-03',
      type: 'TEXT',
      content: {
        prompt: { en: 'box' },
        answer: { en: 'boxes' },
        hint: { en: 'add -es' },
      },
    },
    {
      id: 'english-plurals-04',
      type: 'TEXT',
      content: {
        prompt: { en: 'watch' },
        answer: { en: 'watches' },
        hint: { en: 'add -es' },
      },
    },
    {
      id: 'english-plurals-05',
      type: 'TEXT',
      content: {
        prompt: { en: 'baby' },
        answer: { en: 'babies' },
        hint: { en: 'change y to ies' },
      },
    },
    {
      id: 'english-plurals-06',
      type: 'TEXT',
      content: {
        prompt: { en: 'city' },
        answer: { en: 'cities' },
        hint: { en: 'change y to ies' },
      },
    },
    {
      id: 'english-plurals-07',
      type: 'TEXT',
      content: {
        prompt: { en: 'child' },
        answer: { en: 'children' },
        hint: { en: 'irregular plural' },
      },
    },
    {
      id: 'english-plurals-08',
      type: 'TEXT',
      content: {
        prompt: { en: 'mouse' },
        answer: { en: 'mice' },
        hint: { en: 'irregular plural' },
      },
    },
    {
      id: 'english-plurals-09',
      type: 'TEXT',
      content: {
        prompt: { en: 'foot' },
        answer: { en: 'feet' },
        hint: { en: 'irregular plural' },
      },
    },
    {
      id: 'english-plurals-10',
      type: 'TEXT',
      content: {
        prompt: { en: 'sheep' },
        answer: { en: 'sheep' },
        hint: { en: 'stays the same' },
      },
    },
  ],
};
