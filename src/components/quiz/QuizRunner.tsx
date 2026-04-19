'use client';

import { useQuiz } from '@/hooks/useQuiz';
import { useT } from '@/i18n/provider';
import { QuizProgress } from './QuizProgress';
import { QuizInput } from './QuizInput';
import { TextRenderer } from '@/components/renderers/TextRenderer';
import { SingleChoiceRenderer } from '@/components/renderers/SingleChoiceRenderer';
import type { QuizItem, QuizResult } from '@/types/quiz';

interface QuizRunnerProps {
  items: QuizItem[];
  onComplete: (result: QuizResult) => void;
  onExit?: () => void;
}

export function QuizRunner({ items, onComplete, onExit }: QuizRunnerProps) {
  const t = useT();

  const handleExitClick = () => {
    if (!onExit) return;
    if (window.confirm(t.quiz.exitConfirm)) {
      onExit();
    }
  };
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
    return null;
  }

  if (!currentItem) {
    return (
      <div className="text-center text-gray-600">
        <p>{t.quiz.noQuestions}</p>
      </div>
    );
  }

  const usesTextInput =
    currentItem.type === 'TEXT' ||
    currentItem.type === 'MATH_EQ' ||
    currentItem.type === 'GEOMETRY';

  const renderContent = () => {
    switch (currentItem.type) {
      case 'TEXT':
        return <TextRenderer content={currentItem.content} />;
      case 'SINGLE_CHOICE':
        return (
          <SingleChoiceRenderer
            content={currentItem.content}
            selectedValue={userAnswer}
            feedback={feedback}
            onSelect={(option) => submitAnswer(option)}
          />
        );
      case 'MATH_EQ':
        return (
          <div className="text-center text-gray-600">
            <p>{t.quiz.mathNotImplemented}</p>
          </div>
        );
      case 'GEOMETRY':
        return (
          <div className="text-center text-gray-600">
            <p>{t.quiz.geometryNotImplemented}</p>
          </div>
        );
      default:
        return (
          <div className="text-center text-red-600">
            <p>{t.quiz.unknownItemType}</p>
          </div>
        );
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <QuizProgress current={progress.current} total={progress.total} />
        </div>
        {onExit && (
          <button
            type="button"
            onClick={handleExitClick}
            className="shrink-0 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {t.quiz.exit}
          </button>
        )}
      </div>

      <div className="min-h-[200px]">{renderContent()}</div>

      {usesTextInput && (
        <>
          <QuizInput
            value={userAnswer}
            onChange={setUserAnswer}
            onSubmit={submitAnswer}
            feedback={feedback}
          />
          <div className="text-center text-sm text-gray-500">
            <p>{t.quiz.pressEnterToSubmit}</p>
          </div>
        </>
      )}

      {currentItem.type === 'SINGLE_CHOICE' && (
        <div className="text-center text-sm text-gray-500">
          <p>{t.quiz.clickOptionToSubmit}</p>
        </div>
      )}
    </div>
  );
}
