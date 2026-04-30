'use client';

import { useCallback, useRef, useState } from 'react';
import type {
  QuizItem,
  QuizResult,
  MistakeDetail,
  ResponseDetail,
} from '@/types/quiz';

type FeedbackState = 'correct' | 'incorrect' | null;

interface UseQuizOptions {
  items: QuizItem[];
  onComplete: (result: QuizResult) => void;
}

const FEEDBACK_DELAY_MS = 800;

function normalize(answer: string): string {
  return answer.trim().toLowerCase();
}

function getCorrectAnswer(item: QuizItem): string {
  return (item.content as { answer: string }).answer;
}

function getPrompt(item: QuizItem): string {
  // Prefer specificInstruction (numbers baked in) over genericInstruction
  // (number-free): the history view has no visual equation alongside it, so
  // it needs the self-contained text. Falls back to legacy `prompt` /
  // `instruction` fields for non-fraction content types.
  const content = item.content as {
    prompt?: string;
    instruction?: string;
    genericInstruction?: string;
    specificInstruction?: string;
  };
  return (
    content.specificInstruction ||
    content.prompt ||
    content.instruction ||
    content.genericInstruction ||
    ''
  );
}

export function useQuiz({ items, onComplete }: UseQuizOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswerState] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [responses, setResponses] = useState<ResponseDetail[]>([]);
  const [startTime] = useState(() => Date.now());
  const [isComplete, setIsComplete] = useState(false);

  // Keep a synchronous mirror of userAnswer so submitAnswer can see the
  // latest value even when callers call setUserAnswer + submitAnswer in the
  // same render batch (the ref updates immediately; React state would not
  // flush until after the batch).
  const userAnswerRef = useRef('');
  const setUserAnswer = useCallback((v: string) => {
    userAnswerRef.current = v;
    setUserAnswerState(v);
  }, []);

  const currentItem = items[currentIndex];
  const progress = {
    current: currentIndex + 1,
    total: items.length,
  };

  /**
   * Submit the current answer. Pass an override to submit a value directly
   * without waiting for setUserAnswer to flush (e.g. click-to-submit
   * renderers). Records the question in the responses log either way.
   */
  const submitAnswer = useCallback(
    (overrideAnswer?: string) => {
      const answer = overrideAnswer ?? userAnswerRef.current;
      if (!answer.trim() || feedback !== null) return;

      if (overrideAnswer !== undefined) setUserAnswer(overrideAnswer);

      const correctAnswer = getCorrectAnswer(currentItem);
      const isCorrect = normalize(answer) === normalize(correctAnswer);
      setFeedback(isCorrect ? 'correct' : 'incorrect');

      const response: ResponseDetail = {
        itemId: currentItem.id,
        prompt: getPrompt(currentItem),
        correctAnswer,
        userAnswer: answer.trim(),
        correct: isCorrect,
      };
      // Build the up-to-date list once so both the next-question setTimeout
      // and the completion branch see the same data.
      const nextResponses = [...responses, response];
      setResponses(nextResponses);

      setTimeout(() => {
        if (currentIndex < items.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setUserAnswer('');
          setFeedback(null);
          return;
        }

        const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
        const score = nextResponses.filter((r) => r.correct).length;
        const mistakes: MistakeDetail[] = nextResponses
          .filter((r) => !r.correct)
          .map(({ itemId, prompt, correctAnswer, userAnswer }) => ({
            itemId,
            prompt,
            correctAnswer,
            userAnswer,
          }));

        setIsComplete(true);
        onComplete({
          score,
          total: items.length,
          time: timeElapsed,
          mistakes,
          responses: nextResponses,
        });
      }, FEEDBACK_DELAY_MS);
    },
    [
      feedback,
      currentItem,
      currentIndex,
      items.length,
      responses,
      startTime,
      onComplete,
    ]
  );

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setUserAnswer('');
    setFeedback(null);
    setResponses([]);
    setIsComplete(false);
  }, []);

  return {
    currentItem,
    currentIndex,
    progress,
    userAnswer,
    setUserAnswer,
    feedback,
    submitAnswer,
    reset,
    isComplete,
  };
}
