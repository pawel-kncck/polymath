import type { Locale } from '@/i18n/config';
import type { LocalizedString } from '@/lib/localize';

export type ContentSubject = 'LANGUAGE' | 'MATH' | 'LOGIC';
export type ContentCategory =
  | 'GENERAL_KNOWLEDGE'
  | 'POLISH'
  | 'ENGLISH'
  | 'MATH'
  | 'KARTA_ROWEROWA';
export type ContentItemType =
  | 'TEXT'
  | 'SINGLE_CHOICE'
  | 'MATH_EQ'
  | 'GEOMETRY'
  | 'FRACTION_EXPAND'
  | 'FRACTION_SIMPLIFY';

// Display order of categories on the home page. Unknown values go last.
export const CATEGORY_ORDER: ContentCategory[] = [
  'GENERAL_KNOWLEDGE',
  'POLISH',
  'ENGLISH',
  'MATH',
  'KARTA_ROWEROWA',
];

export type ContentItem = {
  id: string;
  type: ContentItemType;
  // Content payload is polymorphic on `type` and may contain LocalizedString
  // values that get flattened to the active locale by resolveContent().
  content: unknown;
  // Optional difficulty bucket. When a module declares `levels`, the test
  // generator filters items by the chosen level before sampling.
  level?: number;
};

export type ContentModule = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  subject: ContentSubject;
  category: ContentCategory;
  languages: Locale[];
  items: ContentItem[];
  // When set, the quiz route shows a level picker before starting and samples
  // `defaultTestSize` items at the chosen level. Modules without `levels` use
  // the legacy "show all items" flow.
  levels?: number[];
  defaultTestSize?: number;
};
