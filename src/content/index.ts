import type { ContentModule } from './types';
import { englishPlurals } from './modules/english-plurals';
import { generalKnowledge } from './modules/general-knowledge';
import { kartaRowerowa } from './modules/karta-rowerowa';
import { sentencePartsLevel1 } from './modules/sentence-parts-level-1';
import { sentencePartsLevel2 } from './modules/sentence-parts-level-2';
import { sentencePartsLevel3 } from './modules/sentence-parts-level-3';
import { sentencePartsLevel4 } from './modules/sentence-parts-level-4';
import { sentencePartsLevel5 } from './modules/sentence-parts-level-5';
import { sentencePartsLevel6 } from './modules/sentence-parts-level-6';
import { sentencePartsLevel7 } from './modules/sentence-parts-level-7';
import { sentencePartsLevel8 } from './modules/sentence-parts-level-8';

// Source of truth for all learning content. Add new modules here so the
// loader picks them up. Order in this array becomes the display order on
// the home page — newest-first if you want that, just unshift.
const modules: ContentModule[] = [
  sentencePartsLevel1,
  sentencePartsLevel2,
  sentencePartsLevel3,
  sentencePartsLevel4,
  sentencePartsLevel5,
  sentencePartsLevel6,
  sentencePartsLevel7,
  sentencePartsLevel8,
  englishPlurals,
  generalKnowledge,
  kartaRowerowa,
];

const moduleIndex = new Map<string, ContentModule>(
  modules.map((m) => [m.id, m])
);

export function getAllContentModules(): ContentModule[] {
  return modules;
}

export function getContentModule(id: string): ContentModule | null {
  return moduleIndex.get(id) ?? null;
}
