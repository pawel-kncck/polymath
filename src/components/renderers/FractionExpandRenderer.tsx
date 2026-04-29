'use client';

import { useT } from '@/i18n/provider';
import type { FractionExpandContent } from '@/types/content';
import { FractionInputs, useFractionAnswer } from './FractionInputs';

interface FractionExpandRendererProps {
  itemId: string;
  content: unknown;
  feedback: 'correct' | 'incorrect' | null;
  onSubmit: (answer: string) => void;
}

function StackedFraction({
  numerator,
  denominator,
}: {
  numerator: number | string;
  denominator: number | string;
}) {
  return (
    <div className="inline-flex flex-col items-center px-2 align-middle">
      <span className="text-3xl font-bold leading-none">{numerator}</span>
      <span className="my-1 block h-0.5 w-12 bg-gray-800 dark:bg-gray-200" />
      <span className="text-3xl font-bold leading-none">{denominator}</span>
    </div>
  );
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
        {c.instruction}
      </p>

      <div className="flex items-center gap-6 text-gray-900 dark:text-gray-100">
        <StackedFraction numerator={c.numerator} denominator={c.denominator} />
        <span className="text-3xl font-bold">×</span>
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
