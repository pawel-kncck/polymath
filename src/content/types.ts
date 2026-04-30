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
  | 'FRACTION_SIMPLIFY'
  | 'FRACTION_REDUCE';

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
  // Free-form topic tag that question banks use to slice their pool. Lets
  // multiple modules share a single bank file (e.g. all fractions live in
  // one bank tagged FRACTION_EXPAND / FRACTION_SIMPLIFY / FRACTION_REDUCE).
  topic?: string;
};

/**
 * A module's "generator" — an explicit recipe describing which questions to
 * pull from the underlying bank. Modules now resolve their `items` lazily by
 * filtering a shared bank, so the same questions can feed multiple modules.
 */
export type ModuleGenerator = {
  // Inline, fully self-contained item list (legacy modules).
  items?: ContentItem[];
  // Reference into a registered question bank by id.
  bankId?: string;
  // When `bankId` is set, only items whose topic is in this list are pulled.
  topics?: string[];
  // When `bankId` is set, only items whose level is in this list are pulled.
  // Independent of `ContentModule.levels` (which controls the user-facing
  // level picker before the test starts).
  levels?: number[];
};

export type ContentModule = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  subject: ContentSubject;
  category: ContentCategory;
  // Area id (see content/areas.ts). The taxonomy is Domain → Area → Module.
  // Many modules share an area (e.g. all fractions sit under "Fractions").
  areaId: string;
  languages: Locale[];
  // Inline items for legacy modules. Modules that pull from a shared bank
  // start with `items: []` and `generator` set; the loader replaces `items`
  // with the resolved bank slice at read time.
  items: ContentItem[];
  generator?: ModuleGenerator;
  // When set, the quiz route shows a level picker before starting and samples
  // `defaultTestSize` items at the chosen level. Modules without `levels` use
  // the legacy "show all items" flow.
  levels?: number[];
  defaultTestSize?: number;
};
