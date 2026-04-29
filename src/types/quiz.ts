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
  type:
    | 'TEXT'
    | 'SINGLE_CHOICE'
    | 'MATH_EQ'
    | 'GEOMETRY'
    | 'FRACTION_EXPAND'
    | 'FRACTION_SIMPLIFY';
  content: unknown;
  level?: number;
}
