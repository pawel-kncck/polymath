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

/**
 * Content type for FRACTION_EXPAND items (multiply numerator + denominator
 * by `factor` to produce an equivalent fraction).
 */
export interface FractionExpandContent {
  numerator: number;
  denominator: number;
  factor: number;
  // Computed at content build time: `${numerator * factor}/${denominator * factor}`.
  answer: string;
  instruction: string;
}

/**
 * Content type for FRACTION_SIMPLIFY items (reduce to lowest terms).
 */
export interface FractionSimplifyContent {
  numerator: number;
  denominator: number;
  // Computed at content build time: `${reducedNumerator}/${reducedDenominator}`.
  answer: string;
  instruction: string;
}

/**
 * Content type for FRACTION_REDUCE items (divide numerator + denominator by
 * `factor`). Unlike SIMPLIFY, the result is not necessarily in lowest terms —
 * the student is told exactly which factor to divide by.
 */
export interface FractionReduceContent {
  numerator: number;
  denominator: number;
  factor: number;
  // Computed at content build time: `${numerator/factor}/${denominator/factor}`.
  answer: string;
  instruction: string;
}
