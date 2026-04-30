'use client';

import { useT } from '@/i18n/provider';
import type { FractionSimplifyContent } from '@/types/content';
import {
  FractionInputs,
  StackedFraction,
  useFractionAnswer,
} from './FractionInputs';

interface FractionSimplifyRendererProps {
  itemId: string;
  content: unknown;
  feedback: 'correct' | 'incorrect' | null;
  onSubmit: (answer: string) => void;
}

export function FractionSimplifyRenderer({
  itemId,
  content,
  feedback,
  onSubmit,
}: FractionSimplifyRendererProps) {
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

  const c = content as FractionSimplifyContent;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-6">
      <p className="max-w-xl text-center text-lg text-gray-700 dark:text-gray-300">
        {c.genericInstruction}
      </p>

      <div className="flex items-center gap-6 text-gray-900 dark:text-gray-100">
        <StackedFraction
          numerator={c.numerator}
          denominator={c.denominator}
          size="lg"
        />
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
