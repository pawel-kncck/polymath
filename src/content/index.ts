import type { ContentItem, ContentModule } from './types';
import { englishPluralsBank } from './banks/english-plurals';
import { fractionsBank } from './banks/fractions';
import { generalKnowledgeBank } from './banks/general-knowledge';
import { kartaRowerowaBank } from './banks/karta-rowerowa';
import { sentencePartsBank } from './banks/sentence-parts';
import { englishPlurals } from './modules/english-plurals';
import { fractionsExpanding } from './modules/fractions-expanding';
import { fractionsReduce } from './modules/fractions-reduce';
import { fractionsSimplifying } from './modules/fractions-simplifying';
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

interface QuestionBank {
  id: string;
  items: ContentItem[];
}

const banks: QuestionBank[] = [
  englishPluralsBank,
  fractionsBank,
  generalKnowledgeBank,
  kartaRowerowaBank,
  sentencePartsBank,
];
const bankIndex = new Map(banks.map((b) => [b.id, b]));

// Source of truth for all learning content. Add new modules here so the
// loader picks them up. Order in this array becomes the display order on
// the home page — newest-first if you want that, just unshift.
const rawModules: ContentModule[] = [
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
  fractionsExpanding,
  fractionsSimplifying,
  fractionsReduce,
];

/**
 * Resolve a module's items, lazily pulling from a question bank if the module
 * declares a generator. Modules with inline items (and no generator) pass
 * through unchanged. The returned shape is the "flat" module the rest of the
 * app already consumes, so call sites don't have to care about the
 * bank-vs-inline distinction.
 */
function resolveModule(m: ContentModule): ContentModule {
  const gen = m.generator;
  if (!gen) return m;
  if (gen.items) return { ...m, items: gen.items };
  if (gen.bankId) {
    const bank = bankIndex.get(gen.bankId);
    if (!bank) {
      throw new Error(
        `Module "${m.id}" references unknown question bank "${gen.bankId}"`
      );
    }
    const { topics, levels } = gen;
    const items = bank.items.filter((i) => {
      if (topics && (i.topic === undefined || !topics.includes(i.topic))) {
        return false;
      }
      if (levels && (i.level === undefined || !levels.includes(i.level))) {
        return false;
      }
      return true;
    });
    return { ...m, items };
  }
  return m;
}

const modules: ContentModule[] = rawModules.map(resolveModule);

const moduleIndex = new Map<string, ContentModule>(
  modules.map((m) => [m.id, m])
);

export function getAllContentModules(): ContentModule[] {
  return modules;
}

export function getContentModule(id: string): ContentModule | null {
  return moduleIndex.get(id) ?? null;
}
