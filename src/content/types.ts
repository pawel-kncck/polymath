import type { Locale } from '@/i18n/config';
import type { LocalizedString } from '@/lib/localize';

export type ContentSubject = 'LANGUAGE' | 'MATH' | 'LOGIC';
export type ContentItemType = 'TEXT' | 'SINGLE_CHOICE' | 'MATH_EQ' | 'GEOMETRY';

export type ContentItem = {
  id: string;
  type: ContentItemType;
  // Content payload is polymorphic on `type` and may contain LocalizedString
  // values that get flattened to the active locale by resolveContent().
  content: unknown;
};

export type ContentModule = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  subject: ContentSubject;
  languages: Locale[];
  items: ContentItem[];
};
