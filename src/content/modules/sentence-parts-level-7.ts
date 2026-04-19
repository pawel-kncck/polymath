import type { ContentModule } from '../types';

export const sentencePartsLevel7: ContentModule = {
  id: 'sentence-parts-level-7',
  title: { pl: 'Części zdania — poziom 7: Rodzaje okolicznika i przydawki' },
  description: {
    pl: 'Okolicznik miejsca / czasu / sposobu / przyczyny / celu / stopnia; przydawka przymiotna / rzeczowna / liczebna / zaimkowa',
  },
  subject: 'LANGUAGE',
  languages: ['pl'],
  items: [
    {
      id: 'sentence-parts-level-7-01',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Wyrażenie 'w parku' w zdaniu 'Dzieci bawią się w parku.' to okolicznik...",
        },
        options: { pl: ['czasu', 'miejsca', 'sposobu', 'celu'] },
        answer: { pl: 'miejsca' },
      },
    },
    {
      id: 'sentence-parts-level-7-02',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Słowo 'wczoraj' w zdaniu 'Wczoraj padał deszcz.' to okolicznik..." },
        options: { pl: ['czasu', 'miejsca', 'sposobu', 'przyczyny'] },
        answer: { pl: 'czasu' },
      },
    },
    {
      id: 'sentence-parts-level-7-03',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Słowo 'szybko' w zdaniu 'Ania biegnie szybko.' to okolicznik..." },
        options: { pl: ['czasu', 'miejsca', 'sposobu', 'celu'] },
        answer: { pl: 'sposobu' },
      },
    },
    {
      id: 'sentence-parts-level-7-04',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Wyrażenie 'z powodu deszczu' w zdaniu 'Został w domu z powodu deszczu.' to okolicznik...",
        },
        options: { pl: ['czasu', 'miejsca', 'sposobu', 'przyczyny'] },
        answer: { pl: 'przyczyny' },
      },
    },
    {
      id: 'sentence-parts-level-7-05',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Wyrażenie 'po zakupy' w zdaniu 'Poszła do sklepu po zakupy.' to okolicznik...",
        },
        options: { pl: ['czasu', 'miejsca', 'sposobu', 'celu'] },
        answer: { pl: 'celu' },
      },
    },
    {
      id: 'sentence-parts-level-7-06',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Wyrażenie 'w lesie' w zdaniu 'Grzyby rosną w lesie.' to okolicznik..." },
        options: { pl: ['czasu', 'miejsca', 'sposobu', 'celu'] },
        answer: { pl: 'miejsca' },
      },
    },
    {
      id: 'sentence-parts-level-7-07',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Słowo 'rano' w zdaniu 'Rano pije kawę.' to okolicznik..." },
        options: { pl: ['czasu', 'miejsca', 'sposobu', 'celu'] },
        answer: { pl: 'czasu' },
      },
    },
    {
      id: 'sentence-parts-level-7-08',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Słowo 'cicho' w zdaniu 'Mówił cicho.' to okolicznik..." },
        options: { pl: ['czasu', 'miejsca', 'sposobu', 'celu'] },
        answer: { pl: 'sposobu' },
      },
    },
    {
      id: 'sentence-parts-level-7-09',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Wyrażenie 'z powodu choroby' w zdaniu 'Nie przyszedł z powodu choroby.' to okolicznik...",
        },
        options: { pl: ['czasu', 'miejsca', 'przyczyny', 'celu'] },
        answer: { pl: 'przyczyny' },
      },
    },
    {
      id: 'sentence-parts-level-7-10',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Wyrażenie 'po chleb' w zdaniu 'Idę do sklepu po chleb.' to okolicznik...",
        },
        options: { pl: ['miejsca', 'czasu', 'celu', 'sposobu'] },
        answer: { pl: 'celu' },
      },
    },
    {
      id: 'sentence-parts-level-7-11',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Słowo 'czerwony' w zdaniu 'Czerwony samochód jedzie.' to przydawka...",
        },
        options: { pl: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'] },
        answer: { pl: 'przymiotna' },
      },
    },
    {
      id: 'sentence-parts-level-7-12',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Słowo 'brata' w zdaniu 'To jest książka brata.' to przydawka..." },
        options: { pl: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'] },
        answer: { pl: 'rzeczowna' },
      },
    },
    {
      id: 'sentence-parts-level-7-13',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Słowo 'trzy' w zdaniu 'Trzy koty siedzą na płocie.' to przydawka...",
        },
        options: { pl: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'] },
        answer: { pl: 'liczebna' },
      },
    },
    {
      id: 'sentence-parts-level-7-14',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Słowo 'moja' w zdaniu 'Moja siostra gra na pianinie.' to przydawka...",
        },
        options: { pl: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'] },
        answer: { pl: 'zaimkowa' },
      },
    },
    {
      id: 'sentence-parts-level-7-15',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Słowo 'zielone' w zdaniu 'Zielone liście spadają.' to przydawka..." },
        options: { pl: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'] },
        answer: { pl: 'przymiotna' },
      },
    },
    {
      id: 'sentence-parts-level-7-16',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Słowo 'pięciu' w zdaniu 'Pięciu chłopców gra w piłkę.' to przydawka...",
        },
        options: { pl: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'] },
        answer: { pl: 'liczebna' },
      },
    },
    {
      id: 'sentence-parts-level-7-17',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Słowo 'mamy' w zdaniu 'To jest torebka mamy.' to przydawka..." },
        options: { pl: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'] },
        answer: { pl: 'rzeczowna' },
      },
    },
    {
      id: 'sentence-parts-level-7-18',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Słowo 'twój' w zdaniu 'Twój pies szczeka.' to przydawka..." },
        options: { pl: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'] },
        answer: { pl: 'zaimkowa' },
      },
    },
    {
      id: 'sentence-parts-level-7-19',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Słowo 'bardzo' w zdaniu 'Jest bardzo wysoki.' to okolicznik..." },
        options: { pl: ['czasu', 'miejsca', 'sposobu', 'stopnia'] },
        answer: { pl: 'stopnia' },
      },
    },
    {
      id: 'sentence-parts-level-7-20',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Słowo 'piękne' w zdaniu 'Piękne kwiaty pachną.' to przydawka..." },
        options: { pl: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'] },
        answer: { pl: 'przymiotna' },
      },
    },
  ],
};
