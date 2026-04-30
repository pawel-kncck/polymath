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
 * One question's full denormalized record — saved with the result so
 * reviewing past tests still works after the source bank changes.
 */
export interface ResponseDetail {
  itemId: string;
  prompt: string;
  correctAnswer: string;
  userAnswer: string;
  correct: boolean;
}

/**
 * Complete quiz result data
 */
export interface QuizResult {
  score: number;
  total: number;
  time: number; // in seconds
  mistakes: MistakeDetail[];
  responses: ResponseDetail[];
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
    | 'FRACTION_SIMPLIFY'
    | 'FRACTION_REDUCE';
  content: unknown;
  level?: number;
}
