import { describe, it, expect } from 'vitest';
import { kartaRowerowa } from './karta-rowerowa';
import type { Locale } from '@/i18n/config';

type LocalizedString = Partial<Record<Locale, string>>;
type LocalizedArray = Partial<Record<Locale, string[]>>;
type ItemContent = {
  prompt: LocalizedString;
  options: LocalizedArray;
  answer: LocalizedString;
  hint?: LocalizedString;
};

describe('karta-rowerowa module', () => {
  it('has the expected id, subject, and Polish-only locale', () => {
    expect(kartaRowerowa.id).toBe('karta-rowerowa');
    expect(kartaRowerowa.subject).toBe('LOGIC');
    expect(kartaRowerowa.languages).toEqual(['pl']);
  });

  it('has a Polish title and description', () => {
    expect(kartaRowerowa.title.pl).toBeTruthy();
    expect(kartaRowerowa.description.pl).toBeTruthy();
  });

  it('contains at least 25 items (karta rowerowa exam length)', () => {
    expect(kartaRowerowa.items.length).toBeGreaterThanOrEqual(25);
  });

  it('uses SINGLE_CHOICE for every item', () => {
    for (const item of kartaRowerowa.items) {
      expect(item.type).toBe('SINGLE_CHOICE');
    }
  });

  it('gives every item a unique id following the module-prefixed pattern', () => {
    const ids = kartaRowerowa.items.map((i) => i.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^karta-rowerowa-\d{2}$/);
    }
  });

  it('provides a Polish prompt, options, and answer for every item', () => {
    for (const item of kartaRowerowa.items) {
      const c = item.content as ItemContent;
      expect(c.prompt.pl, `item ${item.id} missing pl prompt`).toBeTruthy();
      expect(c.options.pl, `item ${item.id} missing pl options`).toBeTruthy();
      expect(c.options.pl!.length).toBeGreaterThanOrEqual(2);
      expect(c.answer.pl, `item ${item.id} missing pl answer`).toBeTruthy();
    }
  });

  it('ensures the correct answer is one of the provided options', () => {
    for (const item of kartaRowerowa.items) {
      const c = item.content as ItemContent;
      expect(
        c.options.pl,
        `item ${item.id} is missing options`
      ).toContain(c.answer.pl);
    }
  });

  it('has non-duplicate options within each item', () => {
    for (const item of kartaRowerowa.items) {
      const c = item.content as ItemContent;
      const opts = c.options.pl!;
      expect(new Set(opts).size, `item ${item.id} has duplicate options`).toBe(
        opts.length
      );
    }
  });
});
