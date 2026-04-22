import type { ContentModule } from '../types';

export const sentencePartsLevel2: ContentModule = {
  id: 'sentence-parts-level-2',
  title: { pl: 'Części zdania — poziom 2: Dopełnienie' },
  description: {
    pl: 'Do podmiotu i orzeczenia dochodzi dopełnienie — na co pada czynność',
  },
  subject: 'LANGUAGE',
  category: 'POLISH',
  languages: ['pl'],
  items: [
    {
      id: 'sentence-parts-level-2-01',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest dopełnieniem w zdaniu: 'Tomek pije herbatę.'?" },
        options: { pl: ['Tomek', 'pije', 'herbatę', 'nie ma dopełnienia'] },
        answer: { pl: 'herbatę' },
      },
    },
    {
      id: 'sentence-parts-level-2-02',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest dopełnieniem w zdaniu: 'Kasia pisze list.'?" },
        options: { pl: ['Kasia', 'pisze', 'list', 'żadne'] },
        answer: { pl: 'list' },
      },
    },
    {
      id: 'sentence-parts-level-2-03',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest dopełnieniem w zdaniu: 'Mama kocha dziecko.'?" },
        options: { pl: ['mama', 'kocha', 'dziecko', 'wszystkie'] },
        answer: { pl: 'dziecko' },
      },
    },
    {
      id: 'sentence-parts-level-2-04',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest podmiotem w zdaniu: 'Paweł czyta gazetę.'?" },
        options: { pl: ['Paweł', 'czyta', 'gazetę', 'nie ma podmiotu'] },
        answer: { pl: 'Paweł' },
      },
    },
    {
      id: 'sentence-parts-level-2-05',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest dopełnieniem w zdaniu: 'Kucharz gotuje zupę.'?" },
        options: { pl: ['kucharz', 'gotuje', 'zupę', 'żadne'] },
        answer: { pl: 'zupę' },
      },
    },
    {
      id: 'sentence-parts-level-2-06',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest orzeczeniem w zdaniu: 'Dzieci oglądają film.'?" },
        options: { pl: ['dzieci', 'oglądają', 'film', 'wszystkie'] },
        answer: { pl: 'oglądają' },
      },
    },
    {
      id: 'sentence-parts-level-2-07',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest dopełnieniem w zdaniu: 'Ogrodnik sadzi drzewo.'?" },
        options: { pl: ['ogrodnik', 'sadzi', 'drzewo', 'żadne'] },
        answer: { pl: 'drzewo' },
      },
    },
    {
      id: 'sentence-parts-level-2-08',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest dopełnieniem w zdaniu: 'Michał kupuje rower.'?" },
        options: { pl: ['Michał', 'kupuje', 'rower', 'nie ma'] },
        answer: { pl: 'rower' },
      },
    },
    {
      id: 'sentence-parts-level-2-09',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest dopełnieniem w zdaniu: 'Nauczyciel ocenia ucznia.'?" },
        options: { pl: ['nauczyciel', 'ocenia', 'ucznia', 'żadne'] },
        answer: { pl: 'ucznia' },
      },
    },
    {
      id: 'sentence-parts-level-2-10',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest podmiotem w zdaniu: 'Kot łowi mysz.'?" },
        options: { pl: ['kot', 'łowi', 'mysz', 'żadne'] },
        answer: { pl: 'kot' },
      },
    },
    {
      id: 'sentence-parts-level-2-11',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest dopełnieniem w zdaniu: 'Kierowca prowadzi autobus.'?" },
        options: { pl: ['kierowca', 'prowadzi', 'autobus', 'wszystkie'] },
        answer: { pl: 'autobus' },
      },
    },
    {
      id: 'sentence-parts-level-2-12',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest dopełnieniem w zdaniu: 'Lekarz bada pacjenta.'?" },
        options: { pl: ['lekarz', 'bada', 'pacjenta', 'nie ma'] },
        answer: { pl: 'pacjenta' },
      },
    },
    {
      id: 'sentence-parts-level-2-13',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest orzeczeniem w zdaniu: 'Pies gryzie kość.'?" },
        options: { pl: ['pies', 'gryzie', 'kość', 'żadne'] },
        answer: { pl: 'gryzie' },
      },
    },
    {
      id: 'sentence-parts-level-2-14',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest dopełnieniem w zdaniu: 'Jan maluje obraz.'?" },
        options: { pl: ['Jan', 'maluje', 'obraz', 'nie ma'] },
        answer: { pl: 'obraz' },
      },
    },
    {
      id: 'sentence-parts-level-2-15',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest dopełnieniem w zdaniu: 'Ewa zamyka drzwi.'?" },
        options: { pl: ['Ewa', 'zamyka', 'drzwi', 'żadne'] },
        answer: { pl: 'drzwi' },
      },
    },
    {
      id: 'sentence-parts-level-2-16',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest dopełnieniem w zdaniu: 'Dziecko je jabłko.'?" },
        options: { pl: ['dziecko', 'je', 'jabłko', 'wszystkie'] },
        answer: { pl: 'jabłko' },
      },
    },
    {
      id: 'sentence-parts-level-2-17',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest dopełnieniem w zdaniu: 'Tata naprawia samochód.'?" },
        options: { pl: ['tata', 'naprawia', 'samochód', 'nie ma'] },
        answer: { pl: 'samochód' },
      },
    },
    {
      id: 'sentence-parts-level-2-18',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest podmiotem w zdaniu: 'Babcia opowiada bajkę.'?" },
        options: { pl: ['babcia', 'opowiada', 'bajkę', 'żadne'] },
        answer: { pl: 'babcia' },
      },
    },
    {
      id: 'sentence-parts-level-2-19',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest dopełnieniem w zdaniu: 'Malarz maluje ścianę.'?" },
        options: { pl: ['malarz', 'maluje', 'ścianę', 'żadne'] },
        answer: { pl: 'ścianę' },
      },
    },
    {
      id: 'sentence-parts-level-2-20',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Które słowo jest orzeczeniem w zdaniu: 'Anna gotuje makaron.'?" },
        options: { pl: ['Anna', 'gotuje', 'makaron', 'żadne'] },
        answer: { pl: 'gotuje' },
      },
    },
  ],
};
