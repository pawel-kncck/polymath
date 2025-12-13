'use client';

import { useQuiz } from '@/hooks/useQuiz';
import { QuizProgress } from './QuizProgress';
import { QuizInput } from './QuizInput';
import { TextRenderer } from '@/components/renderers/TextRenderer';
import type { QuizItem, QuizResult } from '@/types/quiz';

interface QuizRunnerProps {
  items: QuizItem[];
  onComplete: (result: QuizResult) => void;
}

export function QuizRunner({ items, onComplete }: QuizRunnerProps) {
  const {
    currentItem,
    progress,
    userAnswer,
    setUserAnswer,
    feedback,
    submitAnswer,
    isComplete,
  } = useQuiz({ items, onComplete });

  if (isComplete) {
    return null; // Parent component will show results
  }

  if (!currentItem) {
    return (
      <div className="text-center text-gray-600">
        <p>No questions available</p>
      </div>
    );
  }

  /**
   * Render the appropriate component based on item type
   */
  const renderContent = () => {
    switch (currentItem.type) {
      case 'TEXT':
        return <TextRenderer content={currentItem.content} />;
      case 'MATH_EQ':
        // Future: MathRenderer
        return (
          <div className="text-center text-gray-600">
            <p>Math renderer not yet implemented</p>
          </div>
        );
      case 'GEOMETRY':
        // Future: GeometryRenderer
        return (
          <div className="text-center text-gray-600">
            <p>Geometry renderer not yet implemented</p>
          </div>
        );
      default:
        return (
          <div className="text-center text-red-600">
            <p>Unknown item type</p>
          </div>
        );
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      {/* Progress indicator */}
      <QuizProgress current={progress.current} total={progress.total} />

      {/* Question content */}
      <div className="min-h-[200px]">{renderContent()}</div>

      {/* Answer input */}
      <QuizInput
        value={userAnswer}
        onChange={setUserAnswer}
        onSubmit={submitAnswer}
        feedback={feedback}
      />

      {/* Instructions */}
      <div className="text-center text-sm text-gray-500">
        <p>Press Enter to submit your answer</p>
      </div>
    </div>
  );
}
