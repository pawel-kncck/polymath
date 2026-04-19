import type { ContentModule } from '../types';

export const sentencePartsLevel8: ContentModule = {
  id: 'sentence-parts-level-8',
  title: { pl: 'Części zdania — poziom 8: Zdania złożone i trudne przypadki' },
  description: {
    pl: 'Orzeczenie złożone (imienne, modalne, fazowe), podmiot domyślny i szeregowy, dopełnienie bliższe vs dalsze',
  },
  subject: 'LANGUAGE',
  languages: ['pl'],
  items: [
    {
      id: 'sentence-parts-level-8-01',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Jutro będziemy musieli pójść do lekarza.' orzeczenie 'będziemy musieli pójść' to orzeczenie...",
        },
        options: { pl: ['proste', 'złożone imienne', 'złożone modalne', 'złożone fazowe'] },
        answer: { pl: 'złożone modalne' },
      },
    },
    {
      id: 'sentence-parts-level-8-02',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Ania jest nauczycielką.' orzeczenie 'jest nauczycielką' to orzeczenie...",
        },
        options: { pl: ['proste', 'złożone imienne', 'złożone modalne', 'złożone fazowe'] },
        answer: { pl: 'złożone imienne' },
      },
    },
    {
      id: 'sentence-parts-level-8-03',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Zaczął pisać list.' orzeczenie 'zaczął pisać' to orzeczenie...",
        },
        options: { pl: ['proste', 'złożone imienne', 'złożone modalne', 'złożone fazowe'] },
        answer: { pl: 'złożone fazowe' },
      },
    },
    {
      id: 'sentence-parts-level-8-04',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "W zdaniu 'Idę do szkoły.' podmiot jest..." },
        options: { pl: ['gramatyczny', 'logiczny', 'domyślny (ukryty)', 'szeregowy'] },
        answer: { pl: 'domyślny (ukryty)' },
      },
    },
    {
      id: 'sentence-parts-level-8-05',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Ania i Kasia bawią się razem.' podmiot 'Ania i Kasia' to podmiot...",
        },
        options: { pl: ['gramatyczny', 'logiczny', 'domyślny', 'szeregowy'] },
        answer: { pl: 'szeregowy' },
      },
    },
    {
      id: 'sentence-parts-level-8-06',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "W zdaniu 'Brakuje mi czasu.' podmiot 'czasu' to podmiot..." },
        options: { pl: ['gramatyczny', 'logiczny (dopełniaczowy)', 'domyślny', 'szeregowy'] },
        answer: { pl: 'logiczny (dopełniaczowy)' },
      },
    },
    {
      id: 'sentence-parts-level-8-07',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "W zdaniu 'Pisze list.' dopełnienie 'list' to dopełnienie..." },
        options: { pl: ['bliższe', 'dalsze', 'przydawkowe', 'okoliczne'] },
        answer: { pl: 'bliższe' },
      },
    },
    {
      id: 'sentence-parts-level-8-08',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "W zdaniu 'Dałem bratu prezent.' dopełnienie 'bratu' to dopełnienie..." },
        options: { pl: ['bliższe', 'dalsze', 'przydawkowe', 'okoliczne'] },
        answer: { pl: 'dalsze' },
      },
    },
    {
      id: 'sentence-parts-level-8-09',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "W zdaniu 'Nie lubię kawy.' dopełnienie 'kawy' to..." },
        options: {
          pl: ['bliższe (dopełniacz w przeczeniu)', 'dalsze', 'okolicznik', 'przydawka'],
        },
        answer: { pl: 'bliższe (dopełniacz w przeczeniu)' },
      },
    },
    {
      id: 'sentence-parts-level-8-10',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: 'Wskaż zdanie z podmiotem domyślnym:' },
        options: {
          pl: [
            'Ania czyta książkę.',
            'Pisze list do babci.',
            'Mój brat śpi.',
            'Dzieci bawią się.',
          ],
        },
        answer: { pl: 'Pisze list do babci.' },
      },
    },
    {
      id: 'sentence-parts-level-8-11',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: 'Wskaż zdanie z orzeczeniem imiennym:' },
        options: {
          pl: ['Biegnie szybko.', 'Zaczął pisać.', 'Jest lekarzem.', 'Musi iść.'],
        },
        answer: { pl: 'Jest lekarzem.' },
      },
    },
    {
      id: 'sentence-parts-level-8-12',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: 'Wskaż zdanie z orzeczeniem modalnym:' },
        options: {
          pl: ['Pływa dobrze.', 'Kończy pracę.', 'Musi się uczyć.', 'Jest miły.'],
        },
        answer: { pl: 'Musi się uczyć.' },
      },
    },
    {
      id: 'sentence-parts-level-8-13',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Bardzo miły starszy pan rozmawiał z sąsiadem.' słowo 'starszy' jest...",
        },
        options: { pl: ['podmiotem', 'okolicznikiem', 'przydawką', 'dopełnieniem'] },
        answer: { pl: 'przydawką' },
      },
    },
    {
      id: 'sentence-parts-level-8-14',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Wczoraj wieczorem poszliśmy do kina.' drugim okolicznikiem czasu (obok 'wczoraj') jest:",
        },
        options: {
          pl: ['wieczorem', 'do kina', 'poszliśmy', 'nie ma drugiego okolicznika czasu'],
        },
        answer: { pl: 'wieczorem' },
      },
    },
    {
      id: 'sentence-parts-level-8-15',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Zawsze chce pić po meczu.' 'chce pić' to orzeczenie...",
        },
        options: { pl: ['proste', 'złożone imienne', 'złożone modalne', 'złożone fazowe'] },
        answer: { pl: 'złożone modalne' },
      },
    },
    {
      id: 'sentence-parts-level-8-16',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Mój starszy brat był kiedyś doskonałym sportowcem.' słowo 'sportowcem' jest...",
        },
        options: {
          pl: [
            'podmiotem',
            'częścią orzeczenia imiennego',
            'dopełnieniem',
            'przydawką',
          ],
        },
        answer: { pl: 'częścią orzeczenia imiennego' },
      },
    },
    {
      id: 'sentence-parts-level-8-17',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Zakończyła czytać książkę.' 'zakończyła czytać' to orzeczenie...",
        },
        options: { pl: ['proste', 'złożone imienne', 'złożone modalne', 'złożone fazowe'] },
        answer: { pl: 'złożone fazowe' },
      },
    },
    {
      id: 'sentence-parts-level-8-18',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Ania dała siostrze książkę.' słowo 'siostrze' jest dopełnieniem...",
        },
        options: { pl: ['bliższym', 'dalszym', 'okolicznym', 'przydawkowym'] },
        answer: { pl: 'dalszym' },
      },
    },
    {
      id: 'sentence-parts-level-8-19',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "W zdaniu 'Piją kawę.' podmiot jest..." },
        options: { pl: ["gramatyczny ('kawę')", 'logiczny', 'domyślny', 'szeregowy'] },
        answer: { pl: 'domyślny' },
      },
    },
    {
      id: 'sentence-parts-level-8-20',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "W zdaniu 'Nie widziałem filmu.' słowo 'filmu' jest dopełnieniem...",
        },
        options: {
          pl: [
            'bliższym (dopełniacz w przeczeniu)',
            'dalszym',
            'okolicznym',
            'przydawkowym',
          ],
        },
        answer: { pl: 'bliższym (dopełniacz w przeczeniu)' },
      },
    },
  ],
};
