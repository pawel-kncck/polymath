'use client';

import { useMemo } from 'react';
import { useT } from '@/i18n/provider';
import type { SingleChoiceContent } from '@/types/content';

interface SingleChoiceRendererProps {
  content: unknown;
  selectedValue: string;
  feedback: 'correct' | 'incorrect' | null;
  onSelect: (option: string) => void;
}

/**
 * Fisher-Yates shuffle — returns a new array, does not mutate input.
 */
function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function SingleChoiceRenderer({
  content,
  selectedValue,
  feedback,
  onSelect,
}: SingleChoiceRendererProps) {
  const t = useT();

  if (!content || typeof content !== 'object') {
    return (
      <div className="text-center text-red-600">
        <p>{t.quiz.invalidContent}</p>
      </div>
    );
  }

  const choiceContent = content as SingleChoiceContent;

  if (!choiceContent.prompt || !Array.isArray(choiceContent.options) || choiceContent.options.length === 0) {
    return (
      <div className="text-center text-red-600">
        <p>{t.quiz.missingPromptOrOptions}</p>
      </div>
    );
  }

  const normalize = (v: string) => v.trim().toLowerCase();
  const isLocked = feedback !== null;
  const correct = choiceContent.answer;

  // Shuffle once per item — memo key is the options array reference,
  // which changes only when QuizRunner moves to the next item.
  const shuffledOptions = useMemo(
    () => shuffle(choiceContent.options),
    [choiceContent.options]
  );

  const getOptionStyles = (option: string) => {
    const isSelected = normalize(option) === normalize(selectedValue);
    const isCorrect = normalize(option) === normalize(correct);

    if (feedback === 'correct' && isSelected) {
      return 'border-green-500 bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100';
    }
    if (feedback === 'incorrect' && isSelected) {
      return 'border-red-500 bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100';
    }
    if (feedback === 'incorrect' && isCorrect) {
      return 'border-green-500 bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100';
    }
    return 'border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950';
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 md:text-3xl">
          {choiceContent.prompt}
        </p>
      </div>

      {choiceContent.hint && (
        <div className="rounded-lg bg-blue-50 px-4 py-2 dark:bg-blue-950">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            {t.quiz.hint}: {choiceContent.hint}
          </p>
        </div>
      )}

      <div className="grid w-full gap-3">
        {shuffledOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            disabled={isLocked}
            className={`w-full rounded-lg border-2 px-4 py-3 text-left text-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed ${getOptionStyles(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
