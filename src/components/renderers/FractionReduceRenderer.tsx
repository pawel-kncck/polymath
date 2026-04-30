'use client';

import { useT } from '@/i18n/provider';
import type { FractionReduceContent } from '@/types/content';
import {
  FractionInputs,
  StackedFraction,
  useFractionAnswer,
} from './FractionInputs';

interface FractionReduceRendererProps {
  itemId: string;
  content: unknown;
  feedback: 'correct' | 'incorrect' | null;
  onSubmit: (answer: string) => void;
}

export function FractionReduceRenderer({
  itemId,
  content,
  feedback,
  onSubmit,
}: FractionReduceRendererProps) {
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

  const c = content as FractionReduceContent;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-6">
      <p className="max-w-xl text-center text-lg text-gray-700 dark:text-gray-300">
        {c.genericInstruction}
      </p>

      {/* "przez" / "by" instead of ÷ — same wording as the expand renderer.
          The student reads the operation as "skróć ułamek przez 2" / "reduce
          the fraction by 2". */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-gray-900 dark:text-gray-100">
        <StackedFraction
          numerator={c.numerator}
          denominator={c.denominator}
          size="lg"
        />
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
