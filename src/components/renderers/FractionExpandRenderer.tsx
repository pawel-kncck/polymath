'use client';

import { useT } from '@/i18n/provider';
import type { FractionExpandContent } from '@/types/content';
import {
  FractionInputs,
  StackedFraction,
  useFractionAnswer,
} from './FractionInputs';

interface FractionExpandRendererProps {
  itemId: string;
  content: unknown;
  feedback: 'correct' | 'incorrect' | null;
  onSubmit: (answer: string) => void;
}

export function FractionExpandRenderer({
  itemId,
  content,
  feedback,
  onSubmit,
}: FractionExpandRendererProps) {
  const t = useT();
  const {
    numerator,
    denominator,
    setNumerator,
    setDenominator,
    submit,
  } = useFractionAnswer(onSubmit);

  if (!content || typeof content !== 'object') {
    return (
      <div className="text-center text-red-600">
        <p>{t.quiz.invalidContent}</p>
      </div>
    );
  }

  const c = content as FractionExpandContent;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-6">
      <p className="max-w-xl text-center text-lg text-gray-700 dark:text-gray-300">
        {c.genericInstruction}
      </p>

      {/* The connector is the localized word for "by" ("przez" / "by") rather
          than × — expanding multiplies BOTH parts of the fraction, not the
          value, and an "×" reads as scalar multiplication. */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-gray-900 dark:text-gray-100">
        <StackedFraction numerator={c.numerator} denominator={c.denominator} />
        <span className="text-xl font-medium">{t.fractions.byWord}</span>
        <span className="text-3xl font-bold">{c.factor}</span>
        <span className="text-3xl font-bold">=</span>
        <FractionInputs
          numerator={numerator}
          denominator={denominator}
          setNumerator={setNumerator}
          setDenominator={setDenominator}
          onSubmit={submit}
          feedback={feedback}
          resetKey={itemId}
        />
      </div>
    </div>
  );
}
