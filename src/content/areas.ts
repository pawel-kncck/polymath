import type { LocalizedString } from '@/lib/localize';
import type { ContentCategory } from './types';

/**
 * The taxonomy is three levels deep:
 *   Domain  (= ContentCategory: MATH, POLISH, ENGLISH, …)
 *   Area    (this file: a topic group like "Fractions" or "Sentence Parts")
 *   Module  (a single test generator, e.g. "Expanding")
 *
 * Areas live in their own registry so several modules can share one (e.g.
 * fractions: expand / simplify / reduce all sit under the "Fractions" area).
 * Each module references an area by id; the sidebar and progress page group
 * modules by (domain, area) using these definitions.
 */
export interface ContentArea {
  id: string;
  title: LocalizedString;
  category: ContentCategory;
}

export const AREAS: ContentArea[] = [
  {
    id: 'general-knowledge',
    title: { pl: 'Wiedza ogólna', en: 'General Knowledge' },
    category: 'GENERAL_KNOWLEDGE',
  },
  {
    id: 'sentence-parts',
    title: { pl: 'Części zdania' },
    category: 'POLISH',
  },
  {
    id: 'english-plurals',
    title: { en: 'English Plurals' },
    category: 'ENGLISH',
  },
  {
    id: 'fractions',
    title: { pl: 'Ułamki', en: 'Fractions' },
    category: 'MATH',
  },
  {
    id: 'karta-rowerowa',
    title: { pl: 'Karta rowerowa' },
    category: 'KARTA_ROWEROWA',
  },
];

const areaIndex = new Map<string, ContentArea>(AREAS.map((a) => [a.id, a]));

export function getArea(id: string): ContentArea | null {
  return areaIndex.get(id) ?? null;
}
