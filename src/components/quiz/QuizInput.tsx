'use client';

import { useEffect, useRef } from 'react';
import { useT } from '@/i18n/provider';

interface QuizInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  feedback: 'correct' | 'incorrect' | null;
  disabled?: boolean;
}

export function QuizInput({
  value,
  onChange,
  onSubmit,
  feedback,
  disabled = false,
}: QuizInputProps) {
  const t = useT();
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on mount and when feedback clears
  useEffect(() => {
    if (!feedback && !disabled) {
      inputRef.current?.focus();
    }
  }, [feedback, disabled]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      e.preventDefault();
      onSubmit();
    }
  };

  const getFeedbackStyles = () => {
    if (feedback === 'correct') {
      return 'border-green-500 bg-green-50 dark:bg-green-950 animate-flash-green';
    }
    if (feedback === 'incorrect') {
      return 'border-red-500 bg-red-50 dark:bg-red-950 animate-shake';
    }
    return 'border-gray-300 dark:border-gray-600';
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled || feedback !== null}
        className={`w-full rounded-lg border-2 px-4 py-3 text-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${getFeedbackStyles()}`}
        placeholder={t.quiz.typeAnswerPlaceholder}
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
}
