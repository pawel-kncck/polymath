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
  category: 'GENERAL_KNOWLEDGE',
  areaId: 'general-knowledge',
  languages: ['pl', 'en'],
  generator: { bankId: 'general-knowledge' },
  items: [], // populated by the loader from the general-knowledge bank
};
