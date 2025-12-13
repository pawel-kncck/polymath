'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuizRunner } from '@/components/quiz/QuizRunner';
import { QuizResults } from '@/components/quiz/QuizResults';
import { saveResult } from '@/actions/results';
import type { QuizResult } from '@/types/quiz';
import type { Item } from '@/generated/prisma/client';

interface QuizClientProps {
  moduleId: string;
  items: Item[];
}

export function QuizClient({ moduleId, items }: QuizClientProps) {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [key, setKey] = useState(0); // Key to force QuizRunner remount on retry

  const handleComplete = async (quizResult: QuizResult) => {
    setResult(quizResult);
    setIsSaving(true);

    try {
      // Save result to database
      await saveResult(moduleId, quizResult);
    } catch (error) {
      console.error('Failed to save result:', error);
      // Continue showing results even if save fails
    } finally {
      setIsSaving(false);
    }
  };

  const handleRetry = () => {
    setResult(null);
    setKey((prev) => prev + 1); // Force remount to reset state
  };

  const handleBack = () => {
    router.push('/quiz');
  };

  // Transform Prisma items to QuizItem format
  const quizItems = items.map((item) => ({
    id: item.id,
    type: item.type as 'TEXT' | 'MATH_EQ' | 'GEOMETRY',
    content: item.content,
  }));

  return (
    <div>
      {result ? (
        <QuizResults result={result} onRetry={handleRetry} onBack={handleBack} />
      ) : (
        <QuizRunner key={key} items={quizItems} onComplete={handleComplete} />
      )}

      {isSaving && (
        <div className="fixed bottom-4 right-4 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg">
          Saving result...
        </div>
      )}
    </div>
  );
}
