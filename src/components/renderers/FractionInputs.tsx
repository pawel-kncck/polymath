'use client';

import { useEffect, useRef, useState } from 'react';
import { useT } from '@/i18n/provider';

/**
 * Shared visual: numerator stacked over denominator with a horizontal bar.
 * Used by every fraction renderer's "presented" side.
 */
export function StackedFraction({
  numerator,
  denominator,
  size = 'md',
}: {
  numerator: number | string;
  denominator: number | string;
  size?: 'md' | 'lg';
}) {
  const text = size === 'lg' ? 'text-4xl' : 'text-3xl';
  const bar = size === 'lg' ? 'w-16' : 'w-12';
  return (
    <div className="inline-flex flex-col items-center px-2 align-middle">
      <span className={`${text} font-bold leading-none`}>{numerator}</span>
      <span className={`my-1 block h-0.5 ${bar} bg-gray-800 dark:bg-gray-200`} />
      <span className={`${text} font-bold leading-none`}>{denominator}</span>
    </div>
  );
}

interface FractionInputsProps {
  numerator: string;
  denominator: string;
  setNumerator: (v: string) => void;
  setDenominator: (v: string) => void;
  onSubmit: () => void;
  feedback: 'correct' | 'incorrect' | null;
  // Re-mount when this changes so the auto-focus + cleared state re-applies
  // for the next question.
  resetKey: string;
}

function feedbackStyles(feedback: 'correct' | 'incorrect' | null): string {
  if (feedback === 'correct')
    return 'border-green-500 bg-green-50 dark:bg-green-950';
  if (feedback === 'incorrect')
    return 'border-red-500 bg-red-50 dark:bg-red-950 animate-shake';
  return 'border-gray-300 dark:border-gray-600';
}

/**
 * Two stacked numeric inputs separated by a horizontal bar — the visual
 * shorthand for a fraction. Used by both fraction renderers; the difference
 * is in the prompt above, not the input layout itself.
 */
export function FractionInputs({
  numerator,
  denominator,
  setNumerator,
  setDenominator,
  onSubmit,
  feedback,
  resetKey,
}: FractionInputsProps) {
  const t = useT();
  const numRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!feedback) numRef.current?.focus();
  }, [feedback, resetKey]);

  const isLocked = feedback !== null;
  const styles = feedbackStyles(feedback);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLocked) {
      e.preventDefault();
      onSubmit();
    }
  };

  const baseInput =
    'w-24 rounded-lg border-2 px-3 py-2 text-center text-2xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50';

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-2">
        <input
          ref={numRef}
          type="text"
          inputMode="numeric"
          pattern="-?\d*"
          value={numerator}
          onChange={(e) => setNumerator(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLocked}
          aria-label={t.fractions.numeratorLabel}
          data-testid="fraction-numerator"
          className={`${baseInput} ${styles}`}
        />
        <div className="h-1 w-32 rounded bg-gray-700 dark:bg-gray-300" />
        <input
          type="text"
          inputMode="numeric"
          pattern="-?\d*"
          value={denominator}
          onChange={(e) => setDenominator(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLocked}
          aria-label={t.fractions.denominatorLabel}
          data-testid="fraction-denominator"
          className={`${baseInput} ${styles}`}
        />
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={isLocked || !numerator.trim() || !denominator.trim()}
        className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {t.fractions.submitAnswer}
      </button>
    </div>
  );
}

/**
 * Convenience hook for fraction renderers — owns the local numerator /
 * denominator state and exposes a single submit() that joins them and pushes
 * to the quiz runner. Renderers should be keyed by item id at the call site
 * so they remount on question change; this hook does not reset on its own.
 */
export function useFractionAnswer(onSubmit: (answer: string) => void) {
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');

  const submit = () => {
    const n = numerator.trim();
    const d = denominator.trim();
    if (!n || !d) return;
    onSubmit(`${n}/${d}`);
  };

  return {
    numerator,
    denominator,
    setNumerator,
    setDenominator,
    submit,
  };
}
