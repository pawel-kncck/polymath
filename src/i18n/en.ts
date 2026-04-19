import type { Messages } from './pl';

export const en: Messages = {
  common: {
    appName: 'Polymath',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    language: 'Language',
    languagePl: 'Polski',
    languageEn: 'English',
  },
  signin: {
    subtitle: 'Sign in to continue learning',
    withGoogle: 'Sign in with Google',
    devLoginLabel: 'Dev login',
    devLoginHint:
      'Enter any email to sign in locally. Emails starting with admin@ get the ADMIN role; everything else is STUDENT.',
    devLoginSubmit: 'Sign in (dev)',
  },
  home: {
    title: 'Choose a Quiz',
    subtitle: 'Select a module to start practicing',
    questionsOne: '1 question',
    questionsFew: '{n} questions',
    questionsMany: '{n} questions',
    startQuiz: 'Start Quiz →',
    emptyHint: 'No modules available yet. Run {command} to seed the database.',
    noModulesForLocale:
      'No modules available in the selected language. Switch language to see other modules.',
  },
  subjects: {
    LANGUAGE: 'Language',
    MATH: 'Math',
    LOGIC: 'Logic',
  },
  quiz: {
    questionOf: 'Question {current} of {total}',
    hint: 'Hint',
    typeAnswerPlaceholder: 'Type your answer...',
    pressEnterToSubmit: 'Press Enter to submit your answer',
    clickOptionToSubmit: 'Click an option to submit',
    noQuestions: 'No questions available',
    invalidContent: 'Invalid content format',
    missingPrompt: 'Missing prompt',
    missingPromptOrOptions: 'Missing prompt or options',
    unknownItemType: 'Unknown item type',
    mathNotImplemented: 'Math renderer not yet implemented',
    geometryNotImplemented: 'Geometry renderer not yet implemented',
    exit: 'Exit',
    exitConfirm: 'Are you sure you want to exit? Your progress will be lost.',
  },
  results: {
    complete: 'Quiz Complete!',
    score: 'Score',
    time: 'Time',
    reviewMistakes: 'Review Your Mistakes',
    yourAnswer: 'Your answer',
    correctAnswer: 'Correct answer',
    questionNumber: 'Question {n}',
    tryAgain: 'Try Again',
    chooseAnother: 'Choose Another Module',
    savingResult: 'Saving result...',
  },
};
