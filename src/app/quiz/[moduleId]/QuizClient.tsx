'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuizRunner } from '@/components/quiz/QuizRunner';
import { QuizResults } from '@/components/quiz/QuizResults';
import { saveResult } from '@/actions/results';
import { useT } from '@/i18n/provider';
import type { QuizItem, QuizResult } from '@/types/quiz';

interface QuizClientProps {
  moduleId: string;
  items: QuizItem[];
}

export function QuizClient({ moduleId, items }: QuizClientProps) {
  const router = useRouter();
  const t = useT();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [key, setKey] = useState(0);

  const handleComplete = async (quizResult: QuizResult) => {
    setResult(quizResult);
    setIsSaving(true);

    try {
      await saveResult(moduleId, quizResult);
    } catch (error) {
      console.error('Failed to save result:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRetry = () => {
    setResult(null);
    setKey((prev) => prev + 1);
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div>
      {result ? (
        <QuizResults result={result} onRetry={handleRetry} onBack={handleBack} />
      ) : (
        <QuizRunner
          key={key}
          items={items}
          onComplete={handleComplete}
          onExit={handleBack}
        />
      )}

      {isSaving && (
        <div className="fixed bottom-4 right-4 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg">
          {t.results.savingResult}
        </div>
      )}
    </div>
  );
}
