import type { ContentModule } from '../types';

export const kartaRowerowa: ContentModule = {
  id: 'karta-rowerowa',
  title: {
    pl: 'Karta rowerowa',
  },
  description: {
    pl: 'Przygotowanie do egzaminu na kartę rowerową: przepisy, znaki drogowe, pierwszeństwo, wyposażenie roweru i pierwsza pomoc',
  },
  subject: 'LOGIC',
  category: 'KARTA_ROWEROWA',
  areaId: 'karta-rowerowa',
  languages: ['pl'],
  generator: { bankId: 'karta-rowerowa' },
  items: [], // populated by the loader from the karta-rowerowa bank
};
