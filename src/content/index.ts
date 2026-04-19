import type { ContentModule } from './types';
import { englishPlurals } from './modules/english-plurals';
import { generalKnowledge } from './modules/general-knowledge';

// Source of truth for all learning content. Add new modules here so the
// loader picks them up. Order in this array becomes the display order on
// the home page — newest-first if you want that, just unshift.
const modules: ContentModule[] = [englishPlurals, generalKnowledge];

const moduleIndex = new Map<string, ContentModule>(
  modules.map((m) => [m.id, m])
);

export function getAllContentModules(): ContentModule[] {
  return modules;
}

export function getContentModule(id: string): ContentModule | null {
  return moduleIndex.get(id) ?? null;
}
