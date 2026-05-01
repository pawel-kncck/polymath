import { describe, it, expect } from 'vitest';
import {
  THEMES,
  isTheme,
  defaultThemeForRole,
  FALLBACK_THEME,
  DEFAULT_THEME_BY_ROLE,
} from './config';

describe('theme config', () => {
  describe('THEMES list', () => {
    it('includes the three built-in themes', () => {
      expect(THEMES).toContain('light');
      expect(THEMES).toContain('dark');
      expect(THEMES).toContain('sunrise');
    });
  });

  describe('isTheme', () => {
    it('accepts every theme in THEMES', () => {
      for (const t of THEMES) expect(isTheme(t)).toBe(true);
    });
    it('rejects unknown strings', () => {
      expect(isTheme('rainbow')).toBe(false);
      expect(isTheme('')).toBe(false);
    });
    it('rejects non-string values', () => {
      expect(isTheme(undefined)).toBe(false);
      expect(isTheme(null)).toBe(false);
      expect(isTheme(0)).toBe(false);
      expect(isTheme({})).toBe(false);
    });
  });

  describe('defaultThemeForRole', () => {
    it('returns sunrise for STUDENT', () => {
      expect(defaultThemeForRole('STUDENT')).toBe('sunrise');
    });
    it('returns the fallback theme for ADMIN', () => {
      expect(defaultThemeForRole('ADMIN')).toBe(FALLBACK_THEME);
    });
    it('returns the fallback theme for missing role', () => {
      expect(defaultThemeForRole(undefined)).toBe(FALLBACK_THEME);
      expect(defaultThemeForRole(null)).toBe(FALLBACK_THEME);
      expect(defaultThemeForRole('')).toBe(FALLBACK_THEME);
    });
    it('keeps the STUDENT mapping pointed at sunrise', () => {
      expect(DEFAULT_THEME_BY_ROLE.STUDENT).toBe('sunrise');
    });
  });
});
