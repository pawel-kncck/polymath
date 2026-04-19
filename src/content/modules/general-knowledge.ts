import type { ContentModule } from '../types';

export const generalKnowledge: ContentModule = {
  id: 'general-knowledge',
  title: {
    pl: 'Wiedza ogólna',
    en: 'General Knowledge',
  },
  description: {
    pl: 'Krótkie pytania jednokrotnego wyboru na rozgrzewkę',
    en: 'Quick single-choice questions to warm up',
  },
  subject: 'LOGIC',
  languages: ['pl', 'en'],
  items: [
    {
      id: 'general-knowledge-01',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: 'Która planeta jest najbliżej Słońca?',
          en: 'Which planet is closest to the Sun?',
        },
        options: {
          pl: ['Wenus', 'Merkury', 'Ziemia', 'Mars'],
          en: ['Venus', 'Mercury', 'Earth', 'Mars'],
        },
        answer: { pl: 'Merkury', en: 'Mercury' },
      },
    },
    {
      id: 'general-knowledge-02',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: 'Ile jest kontynentów?',
          en: 'How many continents are there?',
        },
        options: {
          pl: ['5', '6', '7', '8'],
          en: ['5', '6', '7', '8'],
        },
        answer: { pl: '7', en: '7' },
      },
    },
    {
      id: 'general-knowledge-03',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: 'Który ocean jest największy na Ziemi?',
          en: 'What is the largest ocean on Earth?',
        },
        options: {
          pl: ['Atlantycki', 'Indyjski', 'Arktyczny', 'Spokojny'],
          en: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
        },
        answer: { pl: 'Spokojny', en: 'Pacific' },
      },
    },
    {
      id: 'general-knowledge-04',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: 'Który gaz jest pochłaniany przez rośliny w procesie fotosyntezy?',
          en: 'Which gas do plants absorb from the air for photosynthesis?',
        },
        options: {
          pl: ['Tlen', 'Azot', 'Dwutlenek węgla', 'Wodór'],
          en: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
        },
        answer: { pl: 'Dwutlenek węgla', en: 'Carbon dioxide' },
        hint: {
          pl: 'Ludzie go wydychają',
          en: 'Humans breathe it out',
        },
      },
    },
    {
      id: 'general-knowledge-05',
      type: 'SINGLE_CHOICE',
      content: {
        prompt: {
          pl: 'Kto namalował obraz Mona Lisa?',
          en: 'Who painted the Mona Lisa?',
        },
        options: {
          pl: ['Michał Anioł', 'Leonardo da Vinci', 'Rafael', 'Donatello'],
          en: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'],
        },
        answer: { pl: 'Leonardo da Vinci', en: 'Leonardo da Vinci' },
      },
    },
  ],
};
