import type { ContentModule } from '../types';

export const sentencePartsLevel6: ContentModule = {
  id: 'sentence-parts-level-6',
  title: { pl: 'Części zdania — poziom 6: Pytania pomocnicze' },
  description: { pl: 'Dopasowanie części zdania do pytań, na które odpowiada' },
  subject: 'LANGUAGE',
  category: 'POLISH',
  languages: ['pl'],
  items: [
    {
      id: 'sentence-parts-level-6-01',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: 'Na jakie pytania odpowiada podmiot?' },
        options: {
          pl: ['kto? co?', 'co robi? co się z nim dzieje?', 'jaki? który? czyj?', 'gdzie? kiedy? jak?'],
        },
        answer: { pl: 'kto? co?' },
      },
    },
    {
      id: 'sentence-parts-level-6-02',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: 'Na jakie pytania odpowiada orzeczenie?' },
        options: {
          pl: ['kto? co?', 'co robi? co się z nim dzieje?', 'jaki? który? czyj?', 'kogo? czego?'],
        },
        answer: { pl: 'co robi? co się z nim dzieje?' },
      },
    },
    {
      id: 'sentence-parts-level-6-03',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: 'Na jakie pytania odpowiada przydawka?' },
        options: {
          pl: ['kto? co?', 'co robi?', 'jaki? który? czyj? ile?', 'gdzie? kiedy? jak?'],
        },
        answer: { pl: 'jaki? który? czyj? ile?' },
      },
    },
    {
      id: 'sentence-parts-level-6-04',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: 'Na jakie pytania odpowiada okolicznik?' },
        options: {
          pl: ['kto? co?', 'co robi?', 'jaki? który?', 'gdzie? kiedy? jak? dlaczego?'],
        },
        answer: { pl: 'gdzie? kiedy? jak? dlaczego?' },
      },
    },
    {
      id: 'sentence-parts-level-6-05',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: 'Które pytania to typowe pytania dopełnienia?' },
        options: {
          pl: ['kto? co?', 'kogo? czego? komu? czemu?', 'jaki? który?', 'gdzie? kiedy?'],
        },
        answer: { pl: 'kogo? czego? komu? czemu?' },
      },
    },
    {
      id: 'sentence-parts-level-6-06',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Na jakie pytanie odpowiada słowo 'szybko' w zdaniu 'Ania biegnie szybko.'?",
        },
        options: { pl: ['kto?', 'co robi?', 'jak?', 'jaki?'] },
        answer: { pl: 'jak?' },
      },
    },
    {
      id: 'sentence-parts-level-6-07',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Na jakie pytanie odpowiada słowo 'wczoraj' w zdaniu 'Wczoraj padał deszcz.'?",
        },
        options: { pl: ['kto?', 'co?', 'kiedy?', 'dlaczego?'] },
        answer: { pl: 'kiedy?' },
      },
    },
    {
      id: 'sentence-parts-level-6-08',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Na jakie pytanie odpowiada słowo 'czerwony' w zdaniu 'Czerwony samochód stoi.'?",
        },
        options: { pl: ['kto?', 'co robi?', 'gdzie?', 'jaki?'] },
        answer: { pl: 'jaki?' },
      },
    },
    {
      id: 'sentence-parts-level-6-09',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Na jakie pytanie odpowiada słowo 'list' w zdaniu 'Ania pisze list.'?",
        },
        options: { pl: ['kto?', 'co?', 'jak?', 'gdzie?'] },
        answer: { pl: 'co?' },
      },
    },
    {
      id: 'sentence-parts-level-6-10',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Na jakie pytanie odpowiada wyrażenie 'w parku' w zdaniu 'Dzieci bawią się w parku.'?",
        },
        options: { pl: ['kto?', 'co robi?', 'gdzie?', 'jak?'] },
        answer: { pl: 'gdzie?' },
      },
    },
    {
      id: 'sentence-parts-level-6-11',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Słowo, które odpowiada na pytanie 'kto?' lub 'co?', to najczęściej:",
        },
        options: { pl: ['podmiot', 'orzeczenie', 'przydawka', 'okolicznik'] },
        answer: { pl: 'podmiot' },
      },
    },
    {
      id: 'sentence-parts-level-6-12',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Słowo, które odpowiada na pytanie 'jaki?', to:" },
        options: { pl: ['podmiot', 'orzeczenie', 'przydawka', 'okolicznik'] },
        answer: { pl: 'przydawka' },
      },
    },
    {
      id: 'sentence-parts-level-6-13',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Słowo, które odpowiada na pytanie 'dlaczego?', to:" },
        options: { pl: ['podmiot', 'orzeczenie', 'dopełnienie', 'okolicznik'] },
        answer: { pl: 'okolicznik' },
      },
    },
    {
      id: 'sentence-parts-level-6-14',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Słowo, które odpowiada na pytanie 'co robi?', to:" },
        options: { pl: ['podmiot', 'orzeczenie', 'przydawka', 'dopełnienie'] },
        answer: { pl: 'orzeczenie' },
      },
    },
    {
      id: 'sentence-parts-level-6-15',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Słowo odpowiadające na pytania 'kogo? czego? komu?' (inne niż podmiot) to:",
        },
        options: { pl: ['podmiot', 'orzeczenie', 'dopełnienie', 'okolicznik'] },
        answer: { pl: 'dopełnienie' },
      },
    },
    {
      id: 'sentence-parts-level-6-16',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Na jakie pytanie odpowiada wyrażenie 'z powodu bólu' w zdaniu 'Została w domu z powodu bólu.'?",
        },
        options: { pl: ['kiedy?', 'gdzie?', 'dlaczego?', 'jak?'] },
        answer: { pl: 'dlaczego?' },
      },
    },
    {
      id: 'sentence-parts-level-6-17',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Na jakie pytanie odpowiada słowo 'dwie' w zdaniu 'Dwie dziewczynki tańczą.'?",
        },
        options: { pl: ['kto?', 'co robi?', 'ile?', 'jak?'] },
        answer: { pl: 'ile?' },
      },
    },
    {
      id: 'sentence-parts-level-6-18',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Na jakie pytanie odpowiada słowo 'mojego' w zdaniu 'To jest dom mojego brata.'?",
        },
        options: { pl: ['kto?', 'co robi?', 'gdzie?', 'czyj?'] },
        answer: { pl: 'czyj?' },
      },
    },
    {
      id: 'sentence-parts-level-6-19',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: { pl: "Słowo, które odpowiada na pytanie 'gdzie?', to:" },
        options: { pl: ['podmiot', 'orzeczenie', 'dopełnienie', 'okolicznik'] },
        answer: { pl: 'okolicznik' },
      },
    },
    {
      id: 'sentence-parts-level-6-20',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: "Na jakie pytanie odpowiada słowo 'siostrze' w zdaniu 'Dał siostrze prezent.'?",
        },
        options: { pl: ['kto?', 'co?', 'komu?', 'jaki?'] },
        answer: { pl: 'komu?' },
      },
    },
  ],
};
