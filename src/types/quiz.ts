/**
 * Details about a mistake made during the quiz
 */
export interface MistakeDetail {
  itemId: string;
  prompt: string;
  correctAnswer: string;
  userAnswer: string;
}

/**
 * Complete quiz result data
 */
export interface QuizResult {
  score: number;
  total: number;
  time: number; // in seconds
  mistakes: MistakeDetail[];
}

/**
 * Quiz item with content
 */
export interface QuizItem {
  id: string;
  type: 'TEXT' | 'MATH_EQ' | 'GEOMETRY';
  content: unknown;
}
