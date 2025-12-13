import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useQuiz } from './useQuiz';
import type { QuizItem } from '@/types/quiz';

describe('useQuiz', () => {
  const mockItems: QuizItem[] = [
    {
      id: '1',
      type: 'TEXT',
      content: { prompt: 'cat', answer: 'cats', hint: 'add -s' },
    },
    {
      id: '2',
      type: 'TEXT',
      content: { prompt: 'box', answer: 'boxes', hint: 'add -es' },
    },
    {
      id: '3',
      type: 'TEXT',
      content: { prompt: 'baby', answer: 'babies', hint: 'change y to ies' },
    },
  ];

  const mockOnComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it('should initialize with correct state', () => {
    const { result } = renderHook(() =>
      useQuiz({ items: mockItems, onComplete: mockOnComplete })
    );

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.currentItem).toEqual(mockItems[0]);
    expect(result.current.userAnswer).toBe('');
    expect(result.current.feedback).toBeNull();
    expect(result.current.progress).toEqual({ current: 1, total: 3 });
    expect(result.current.isComplete).toBe(false);
  });

  it('should update user answer', () => {
    const { result } = renderHook(() =>
      useQuiz({ items: mockItems, onComplete: mockOnComplete })
    );

    act(() => {
      result.current.setUserAnswer('test');
    });

    expect(result.current.userAnswer).toBe('test');
  });

  it('should accept correct answer (exact match)', () => {
    const { result } = renderHook(() =>
      useQuiz({ items: mockItems, onComplete: mockOnComplete })
    );

    act(() => {
      result.current.setUserAnswer('cats');
    });

    act(() => {
      result.current.submitAnswer();
    });

    expect(result.current.feedback).toBe('correct');
  });

  it('should accept correct answer (case insensitive)', () => {
    const { result } = renderHook(() =>
      useQuiz({ items: mockItems, onComplete: mockOnComplete })
    );

    act(() => {
      result.current.setUserAnswer('CATS');
    });

    act(() => {
      result.current.submitAnswer();
    });

    expect(result.current.feedback).toBe('correct');
  });

  it('should accept correct answer (with extra whitespace)', () => {
    const { result } = renderHook(() =>
      useQuiz({ items: mockItems, onComplete: mockOnComplete })
    );

    act(() => {
      result.current.setUserAnswer('  cats  ');
    });

    act(() => {
      result.current.submitAnswer();
    });

    expect(result.current.feedback).toBe('correct');
  });

  it('should reject incorrect answer', () => {
    const { result } = renderHook(() =>
      useQuiz({ items: mockItems, onComplete: mockOnComplete })
    );

    act(() => {
      result.current.setUserAnswer('wrong');
    });

    act(() => {
      result.current.submitAnswer();
    });

    expect(result.current.feedback).toBe('incorrect');
  });

  it('should not submit empty answer', () => {
    const { result } = renderHook(() =>
      useQuiz({ items: mockItems, onComplete: mockOnComplete })
    );

    act(() => {
      result.current.setUserAnswer('   ');
    });

    act(() => {
      result.current.submitAnswer();
    });

    expect(result.current.feedback).toBeNull();
  });

  it('should move to next question after correct answer', async () => {
    const { result } = renderHook(() =>
      useQuiz({ items: mockItems, onComplete: mockOnComplete })
    );

    act(() => {
      result.current.setUserAnswer('cats');
      result.current.submitAnswer();
    });

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.feedback).toBe('correct');

    // Fast-forward 800ms (feedback delay)
    act(() => {
      vi.advanceTimersByTime(800);
    });

    await waitFor(() => {
      expect(result.current.currentIndex).toBe(1);
      expect(result.current.currentItem).toEqual(mockItems[1]);
      expect(result.current.userAnswer).toBe('');
      expect(result.current.feedback).toBeNull();
    });
  });

  it('should track progress correctly', async () => {
    const { result } = renderHook(() =>
      useQuiz({ items: mockItems, onComplete: mockOnComplete })
    );

    expect(result.current.progress).toEqual({ current: 1, total: 3 });

    // Answer first question
    act(() => {
      result.current.setUserAnswer('cats');
      result.current.submitAnswer();
      vi.advanceTimersByTime(800);
    });

    await waitFor(() => {
      expect(result.current.progress).toEqual({ current: 2, total: 3 });
    });
  });

  it('should call onComplete after last question', async () => {
    const { result } = renderHook(() =>
      useQuiz({ items: mockItems, onComplete: mockOnComplete })
    );

    // Answer all 3 questions correctly
    for (let i = 0; i < 3; i++) {
      const answers = ['cats', 'boxes', 'babies'];
      act(() => {
        result.current.setUserAnswer(answers[i]);
        result.current.submitAnswer();
        vi.advanceTimersByTime(800);
      });
    }

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledTimes(1);
      expect(result.current.isComplete).toBe(true);
    });

    const callArgs = mockOnComplete.mock.calls[0][0];
    expect(callArgs.score).toBe(3);
    expect(callArgs.total).toBe(3);
    expect(callArgs.mistakes).toHaveLength(0);
  });

  it('should record mistakes for incorrect answers', async () => {
    const { result } = renderHook(() =>
      useQuiz({ items: mockItems, onComplete: mockOnComplete })
    );

    // Answer first question incorrectly
    act(() => {
      result.current.setUserAnswer('wrong');
      result.current.submitAnswer();
      vi.advanceTimersByTime(800);
    });

    // Answer second question correctly
    await waitFor(() => {
      expect(result.current.currentIndex).toBe(1);
    });

    act(() => {
      result.current.setUserAnswer('boxes');
      result.current.submitAnswer();
      vi.advanceTimersByTime(800);
    });

    // Answer third question correctly
    await waitFor(() => {
      expect(result.current.currentIndex).toBe(2);
    });

    act(() => {
      result.current.setUserAnswer('babies');
      result.current.submitAnswer();
      vi.advanceTimersByTime(800);
    });

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalled();
    });

    const result_data = mockOnComplete.mock.calls[0][0];
    expect(result_data.score).toBe(2);
    expect(result_data.total).toBe(3);
    expect(result_data.mistakes).toHaveLength(1);
    expect(result_data.mistakes[0]).toMatchObject({
      itemId: '1',
      prompt: 'cat',
      correctAnswer: 'cats',
      userAnswer: 'wrong',
    });
  });

  it('should calculate time correctly', async () => {
    const startTime = Date.now();
    vi.setSystemTime(startTime);

    const { result } = renderHook(() =>
      useQuiz({ items: mockItems, onComplete: mockOnComplete })
    );

    // Advance time by 10 seconds
    vi.setSystemTime(startTime + 10000);

    // Answer all questions
    for (let i = 0; i < 3; i++) {
      const answers = ['cats', 'boxes', 'babies'];
      act(() => {
        result.current.setUserAnswer(answers[i]);
        result.current.submitAnswer();
        vi.advanceTimersByTime(800);
      });
    }

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalled();
    });

    const result_data = mockOnComplete.mock.calls[0][0];
    expect(result_data.time).toBe(10); // 10 seconds
  });

  it('should reset quiz state', () => {
    const { result } = renderHook(() =>
      useQuiz({ items: mockItems, onComplete: mockOnComplete })
    );

    // Answer first question
    act(() => {
      result.current.setUserAnswer('wrong');
      result.current.submitAnswer();
    });

    expect(result.current.feedback).toBe('incorrect');
    expect(result.current.userAnswer).toBe('wrong');

    // Reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.userAnswer).toBe('');
    expect(result.current.feedback).toBeNull();
    expect(result.current.isComplete).toBe(false);
  });
});
