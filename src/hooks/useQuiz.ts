'use client';

import { useState, useCallback, useEffect } from 'react';
import type { QuizItem, QuizResult, MistakeDetail } from '@/types/quiz';

type FeedbackState = 'correct' | 'incorrect' | null;

interface UseQuizOptions {
  items: QuizItem[];
  onComplete: (result: QuizResult) => void;
}

export function useQuiz({ items, onComplete }: UseQuizOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [mistakes, setMistakes] = useState<MistakeDetail[]>([]);
  const [startTime] = useState(() => Date.now());
  const [isComplete, setIsComplete] = useState(false);

  const currentItem = items[currentIndex];
  const progress = {
    current: currentIndex + 1,
    total: items.length,
  };

  /**
   * Normalize answer for comparison (case-insensitive, trimmed)
   */
  const normalizeAnswer = (answer: string): string => {
    return answer.trim().toLowerCase();
  };

  /**
   * Get the correct answer from the current item's content
   */
  const getCorrectAnswer = useCallback((item: QuizItem): string => {
    const content = item.content as { answer: string };
    return content.answer;
  }, []);

  /**
   * Get the prompt from the current item's content
   */
  const getPrompt = useCallback((item: QuizItem): string => {
    const content = item.content as { prompt?: string; instruction?: string };
    return content.prompt || content.instruction || '';
  }, []);

  /**
   * Check if the user's answer is correct
   */
  const checkAnswer = useCallback(
    (answer: string): boolean => {
      const correctAnswer = getCorrectAnswer(currentItem);
      return normalizeAnswer(answer) === normalizeAnswer(correctAnswer);
    },
    [currentItem, getCorrectAnswer]
  );

  /**
   * Submit the current answer
   */
  const submitAnswer = useCallback(() => {
    if (!userAnswer.trim() || feedback !== null) return;

    const isCorrect = checkAnswer(userAnswer);
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    // Record mistake if incorrect
    if (!isCorrect) {
      const correctAnswer = getCorrectAnswer(currentItem);
      const prompt = getPrompt(currentItem);

      setMistakes((prev) => [
        ...prev,
        {
          itemId: currentItem.id,
          prompt,
          correctAnswer,
          userAnswer: userAnswer.trim(),
        },
      ]);
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentIndex < items.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setUserAnswer('');
        setFeedback(null);
      } else {
        // Quiz complete
        const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
        const score = items.length - (isCorrect ? mistakes.length : mistakes.length + 1);

        const result: QuizResult = {
          score,
          total: items.length,
          time: timeElapsed,
          mistakes: isCorrect ? mistakes : [...mistakes, {
            itemId: currentItem.id,
            prompt: getPrompt(currentItem),
            correctAnswer: getCorrectAnswer(currentItem),
            userAnswer: userAnswer.trim(),
          }],
        };

        setIsComplete(true);
        onComplete(result);
      }
    }, 800);
  }, [
    userAnswer,
    feedback,
    checkAnswer,
    currentItem,
    currentIndex,
    items.length,
    mistakes,
    startTime,
    onComplete,
    getCorrectAnswer,
    getPrompt,
  ]);

  /**
   * Reset quiz to start over
   */
  const reset = useCallback(() => {
    setCurrentIndex(0);
    setUserAnswer('');
    setFeedback(null);
    setMistakes([]);
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
