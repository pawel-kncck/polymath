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
  level?: number;
}

export function QuizClient({ moduleId, items, level }: QuizClientProps) {
  const router = useRouter();
  const t = useT();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [savedResultId, setSavedResultId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [key, setKey] = useState(0);

  const handleComplete = async (quizResult: QuizResult) => {
    setResult(quizResult);
    setIsSaving(true);

    try {
      const saved = await saveResult(moduleId, quizResult, level);
      setSavedResultId(saved.id);
    } catch (error) {
      console.error('Failed to save result:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRetry = () => {
    setResult(null);
    setSavedResultId(null);
    // Always remount QuizRunner so useQuiz state reinitializes. For leveled
    // modules also kick a server round-trip so the items prop is re-sampled
    // from the level pool.
    setKey((prev) => prev + 1);
    if (level !== undefined) {
      router.refresh();
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div>
      {result ? (
        <QuizResults
          result={result}
          onRetry={handleRetry}
          onBack={handleBack}
          reviewHref={savedResultId ? `/progress/${savedResultId}` : null}
        />
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
