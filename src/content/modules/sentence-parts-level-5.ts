import type { ContentModule } from '../types';

export const sentencePartsLevel5: ContentModule = {
  id: 'sentence-parts-level-5',
  title: { pl: 'Części zdania — poziom 5: Wszystkie 5 części — utrwalenie' },
  description: {
    pl: 'Różne zdania — każde słowo może być dowolną częścią zdania',
  },
  subject: 'LANGUAGE',
  category: 'POLISH',
  languages: ['pl'],
  items: [
    {
      id: 'sentence-parts-level-5-01',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Mała Ania czyta ciekawą książkę w parku.' czym jest słowo 'mała'?",
        },
        options: { pl: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'przydawką'] },
        answer: { pl: 'przydawką' },
      },
    },
    {
      id: 'sentence-parts-level-5-02',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Wczoraj nauczyciel tłumaczył nową lekcję.' czym jest słowo 'wczoraj'?",
        },
        options: { pl: ['podmiotem', 'okolicznikiem', 'dopełnieniem', 'przydawką'] },
        answer: { pl: 'okolicznikiem' },
      },
    },
    {
      id: 'sentence-parts-level-5-03',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Tata kupił synowi nowy rower.' czym jest słowo 'tata'?",
        },
        options: { pl: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'przydawką'] },
        answer: { pl: 'podmiotem' },
      },
    },
    {
      id: 'sentence-parts-level-5-04',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Stary dziadek opowiadał wnukom bajki.' czym jest słowo 'opowiadał'?",
        },
        options: { pl: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'okolicznikiem'] },
        answer: { pl: 'orzeczeniem' },
      },
    },
    {
      id: 'sentence-parts-level-5-05',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Rano babcia piekła smaczne ciasto.' czym jest słowo 'smaczne'?",
        },
        options: { pl: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'przydawką'] },
        answer: { pl: 'przydawką' },
      },
    },
    {
      id: 'sentence-parts-level-5-06',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Piękne kwiaty rosną w ogrodzie.' czym jest wyrażenie 'w ogrodzie'?",
        },
        options: { pl: ['podmiotem', 'orzeczeniem', 'okolicznikiem', 'przydawką'] },
        answer: { pl: 'okolicznikiem' },
      },
    },
    {
      id: 'sentence-parts-level-5-07',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Młoda dziewczynka szyła sukienkę dla lalki.' czym jest słowo 'sukienkę'?",
        },
        options: { pl: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'okolicznikiem'] },
        answer: { pl: 'dopełnieniem' },
      },
    },
    {
      id: 'sentence-parts-level-5-08',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Mądry uczeń rozwiązał trudne zadanie szybko.' czym jest słowo 'szybko'?",
        },
        options: { pl: ['podmiotem', 'okolicznikiem', 'dopełnieniem', 'przydawką'] },
        answer: { pl: 'okolicznikiem' },
      },
    },
    {
      id: 'sentence-parts-level-5-09',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Wczoraj mój brat zbudował wielki zamek z piasku.' czym jest słowo 'wielki'?",
        },
        options: { pl: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'przydawką'] },
        answer: { pl: 'przydawką' },
      },
    },
    {
      id: 'sentence-parts-level-5-10',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Rano pies biegał po zielonej łące.' czym jest słowo 'pies'?",
        },
        options: { pl: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'okolicznikiem'] },
        answer: { pl: 'podmiotem' },
      },
    },
    {
      id: 'sentence-parts-level-5-11',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Mama gotuje pyszną zupę w kuchni.' czym jest słowo 'zupę'?",
        },
        options: { pl: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'okolicznikiem'] },
        answer: { pl: 'dopełnieniem' },
      },
    },
    {
      id: 'sentence-parts-level-5-12',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Duży pies gonił przestraszonego kota.' czym jest słowo 'duży'?",
        },
        options: { pl: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'przydawką'] },
        answer: { pl: 'przydawką' },
      },
    },
    {
      id: 'sentence-parts-level-5-13',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Ania napisała długi list do babci.' czym jest słowo 'napisała'?",
        },
        options: { pl: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'przydawką'] },
        answer: { pl: 'orzeczeniem' },
      },
    },
    {
      id: 'sentence-parts-level-5-14',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Gruby kot pił białe mleko z miski.' czym jest wyrażenie 'z miski'?",
        },
        options: { pl: ['podmiotem', 'orzeczeniem', 'przydawką', 'okolicznikiem'] },
        answer: { pl: 'okolicznikiem' },
      },
    },
    {
      id: 'sentence-parts-level-5-15',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Młodzi uczniowie czytali ciekawą historię wieczorem.' czym jest słowo 'wieczorem'?",
        },
        options: { pl: ['podmiotem', 'przydawką', 'dopełnieniem', 'okolicznikiem'] },
        answer: { pl: 'okolicznikiem' },
      },
    },
    {
      id: 'sentence-parts-level-5-16',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Słodkie jabłka rosną na wysokich drzewach.' czym jest słowo 'słodkie'?",
        },
        options: { pl: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'przydawką'] },
        answer: { pl: 'przydawką' },
      },
    },
    {
      id: 'sentence-parts-level-5-17',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Tomek jeździł na rowerze po parku.' czym jest wyrażenie 'po parku'?",
        },
        options: { pl: ['dopełnieniem', 'podmiotem', 'orzeczeniem', 'okolicznikiem'] },
        answer: { pl: 'okolicznikiem' },
      },
    },
    {
      id: 'sentence-parts-level-5-18',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Zmęczona mama piła gorącą kawę wieczorem.' czym jest słowo 'kawę'?",
        },
        options: { pl: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'okolicznikiem'] },
        answer: { pl: 'dopełnieniem' },
      },
    },
    {
      id: 'sentence-parts-level-5-19',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Mały chłopiec rzucił piłkę daleko.' czym jest słowo 'daleko'?",
        },
        options: { pl: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'okolicznikiem'] },
        answer: { pl: 'okolicznikiem' },
      },
    },
    {
      id: 'sentence-parts-level-5-20',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Nasza babcia piecze pyszne ciasto na niedzielę.' czym jest słowo 'nasza'?",
        },
        options: { pl: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'przydawką'] },
        answer: { pl: 'przydawką' },
      },
    },
  ],
};
