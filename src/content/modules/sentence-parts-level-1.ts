import type { ContentModule } from '../types';

export const sentencePartsLevel1: ContentModule = {
  id: 'sentence-parts-level-1',
  title: { pl: 'Części zdania — poziom 1: Podmiot i orzeczenie' },
  description: { pl: 'Rozpoznawanie podmiotu i orzeczenia w prostych zdaniach' },
  subject: 'LANGUAGE',
  languages: ['pl'],
  items: [
    {
      id: 'sentence-parts-level-1-01',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest podmiotem w zdaniu: 'Pies biega po łące.'?" },
        options: { pl: ['pies', 'biega', 'łące', 'po'] },
        answer: { pl: 'pies' },
      },
    },
    {
      id: 'sentence-parts-level-1-02',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest orzeczeniem w zdaniu: 'Dzieci śpiewają piosenkę.'?" },
        options: { pl: ['dzieci', 'śpiewają', 'piosenkę', 'żadne z powyższych'] },
        answer: { pl: 'śpiewają' },
      },
    },
    {
      id: 'sentence-parts-level-1-03',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest podmiotem w zdaniu: 'Słońce świeci jasno.'?" },
        options: { pl: ['słońce', 'świeci', 'jasno', 'nie ma podmiotu'] },
        answer: { pl: 'słońce' },
      },
    },
    {
      id: 'sentence-parts-level-1-04',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest orzeczeniem w zdaniu: 'Anna pisze list.'?" },
        options: { pl: ['Anna', 'pisze', 'list', 'nie ma orzeczenia'] },
        answer: { pl: 'pisze' },
      },
    },
    {
      id: 'sentence-parts-level-1-05',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest podmiotem w zdaniu: 'Kot śpi na krześle.'?" },
        options: { pl: ['kot', 'śpi', 'krześle', 'na'] },
        answer: { pl: 'kot' },
      },
    },
    {
      id: 'sentence-parts-level-1-06',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest orzeczeniem w zdaniu: 'Mama gotuje obiad.'?" },
        options: { pl: ['mama', 'gotuje', 'obiad', 'wszystkie są orzeczeniem'] },
        answer: { pl: 'gotuje' },
      },
    },
    {
      id: 'sentence-parts-level-1-07',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest podmiotem w zdaniu: 'Ptaki fruwają po niebie.'?" },
        options: { pl: ['ptaki', 'fruwają', 'niebie', 'po niebie'] },
        answer: { pl: 'ptaki' },
      },
    },
    {
      id: 'sentence-parts-level-1-08',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest orzeczeniem w zdaniu: 'Uczniowie czytają książkę.'?" },
        options: { pl: ['uczniowie', 'czytają', 'książkę', 'uczniowie i książkę'] },
        answer: { pl: 'czytają' },
      },
    },
    {
      id: 'sentence-parts-level-1-09',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest podmiotem w zdaniu: 'Wiatr wieje mocno.'?" },
        options: { pl: ['wiatr', 'wieje', 'mocno', 'nie ma'] },
        answer: { pl: 'wiatr' },
      },
    },
    {
      id: 'sentence-parts-level-1-10',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest orzeczeniem w zdaniu: 'Tomek gra w piłkę.'?" },
        options: { pl: ['Tomek', 'gra', 'piłkę', 'w'] },
        answer: { pl: 'gra' },
      },
    },
    {
      id: 'sentence-parts-level-1-11',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest podmiotem w zdaniu: 'Róża pachnie pięknie.'?" },
        options: { pl: ['róża', 'pachnie', 'pięknie', 'nie ma'] },
        answer: { pl: 'róża' },
      },
    },
    {
      id: 'sentence-parts-level-1-12',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest orzeczeniem w zdaniu: 'Chłopiec rzuca kamień.'?" },
        options: { pl: ['chłopiec', 'rzuca', 'kamień', 'żadne'] },
        answer: { pl: 'rzuca' },
      },
    },
    {
      id: 'sentence-parts-level-1-13',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest podmiotem w zdaniu: 'Rzeka płynie wolno.'?" },
        options: { pl: ['rzeka', 'płynie', 'wolno', 'nie ma'] },
        answer: { pl: 'rzeka' },
      },
    },
    {
      id: 'sentence-parts-level-1-14',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest orzeczeniem w zdaniu: 'Babcia piecze ciasto.'?" },
        options: { pl: ['babcia', 'piecze', 'ciasto', 'żadne'] },
        answer: { pl: 'piecze' },
      },
    },
    {
      id: 'sentence-parts-level-1-15',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest podmiotem w zdaniu: 'Dziewczynka tańczy na scenie.'?" },
        options: { pl: ['dziewczynka', 'tańczy', 'scenie', 'na scenie'] },
        answer: { pl: 'dziewczynka' },
      },
    },
    {
      id: 'sentence-parts-level-1-16',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest orzeczeniem w zdaniu: 'Piotr buduje zamek.'?" },
        options: { pl: ['Piotr', 'buduje', 'zamek', 'wszystkie są orzeczeniem'] },
        answer: { pl: 'buduje' },
      },
    },
    {
      id: 'sentence-parts-level-1-17',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest podmiotem w zdaniu: 'Pszczoły zbierają nektar.'?" },
        options: { pl: ['pszczoły', 'zbierają', 'nektar', 'nie ma'] },
        answer: { pl: 'pszczoły' },
      },
    },
    {
      id: 'sentence-parts-level-1-18',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest orzeczeniem w zdaniu: 'Nauczyciel tłumaczy lekcję.'?" },
        options: { pl: ['nauczyciel', 'tłumaczy', 'lekcję', 'żadne'] },
        answer: { pl: 'tłumaczy' },
      },
    },
    {
      id: 'sentence-parts-level-1-19',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest podmiotem w zdaniu: 'Kwiat kwitnie pięknie.'?" },
        options: { pl: ['kwiat', 'kwitnie', 'pięknie', 'nie ma'] },
        answer: { pl: 'kwiat' },
      },
    },
    {
      id: 'sentence-parts-level-1-20',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest orzeczeniem w zdaniu: 'Kierowca prowadzi samochód.'?" },
        options: { pl: ['kierowca', 'prowadzi', 'samochód', 'wszystkie są orzeczeniem'] },
        answer: { pl: 'prowadzi' },
      },
    },
  ],
};
