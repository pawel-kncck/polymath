/**
 * Content type for TEXT items (vocabulary, translations)
 */
export interface TextContent {
  prompt: string;
  answer: string;
  hint?: string;
}

/**
 * Content type for SINGLE_CHOICE items (one correct option from a list)
 */
export interface SingleChoiceContent {
  prompt: string;
  options: string[];
  answer: string;
  hint?: string;
}

/**
 * Content type for MATH_EQ items (algebra, equations)
 */
export interface MathContent {
  latex: string;
  instruction: string;
  answer: string;
}

/**
 * Content type for GEOMETRY items (shapes, diagrams)
 */
export interface GeometryContent {
  instruction: string;
  shapeType: string;
  props: Record<string, unknown>;
  labels?: string[];
  answer: string;
}
