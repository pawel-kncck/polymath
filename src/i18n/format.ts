import type { Locale } from './config';

/**
 * Interpolate `{name}` placeholders in a template string.
 */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => {
    const v = vars[k];
    return v === undefined ? '' : String(v);
  });
}

/**
 * Pick a plural form for `count` using the locale's plural rules.
 * Currently we support PL (one/few/many) and EN (one/other).
 */
export function questionCount(
  locale: Locale,
  count: number,
  forms: { questionsOne: string; questionsFew: string; questionsMany: string }
): string {
  const rule = new Intl.PluralRules(locale).select(count);
  let template: string;
  switch (rule) {
    case 'one':
      template = forms.questionsOne;
      break;
    case 'few':
      template = forms.questionsFew;
      break;
    default:
      template = forms.questionsMany;
  }
  return format(template, { n: count });
}

