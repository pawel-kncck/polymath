import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuiz } from './useQuiz';
import type { QuizItem } from '@/types/quiz';

// Drives the hook to completion using REAL timers + flushed promises so
// `setTimeout(... 800)` actually fires. The legacy useQuiz.test.ts uses fake
// timers + waitFor which deadlocks (testing-library's poller is also mocked).

const items: QuizItem[] = [
  { id: '1', type: 'TEXT', content: { prompt: 'cat', answer: 'cats' } },
  { id: '2', type: 'TEXT', content: { prompt: 'box', answer: 'boxes' } },
];

describe('useQuiz — responses array', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout'] });
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('captures every question (correct + incorrect) in the responses array', async () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() =>
      useQuiz({ items, onComplete })
    );

    // Q1: correct
    act(() => {
      result.current.setUserAnswer('cats');
      result.current.submitAnswer();
    });
    act(() => {
      vi.advanceTimersByTime(800);
    });

    // Q2: wrong
    act(() => {
      result.current.setUserAnswer('wrong');
      result.current.submitAnswer();
    });
    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
    const callArg = onComplete.mock.calls[0][0];
    expect(callArg.score).toBe(1);
    expect(callArg.total).toBe(2);
    expect(callArg.responses).toEqual([
      {
        itemId: '1',
        prompt: 'cat',
        correctAnswer: 'cats',
        userAnswer: 'cats',
        correct: true,
      },
      {
        itemId: '2',
        prompt: 'box',
        correctAnswer: 'boxes',
        userAnswer: 'wrong',
        correct: false,
      },
    ]);
    // Mistakes are derived from responses for backward compat.
    expect(callArg.mistakes).toEqual([
      {
        itemId: '2',
        prompt: 'box',
        correctAnswer: 'boxes',
        userAnswer: 'wrong',
      },
    ]);
  });
});
