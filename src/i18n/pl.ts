export const pl = {
  common: {
    appName: 'Polymath',
    signIn: 'Zaloguj się',
    signOut: 'Wyloguj się',
    language: 'Język',
    languagePl: 'Polski',
    languageEn: 'English',
  },
  signin: {
    subtitle: 'Zaloguj się, aby kontynuować naukę',
    withGoogle: 'Zaloguj się przez Google',
    devLoginLabel: 'Logowanie deweloperskie',
    devLoginHint:
      'Podaj dowolny e-mail, aby zalogować się lokalnie. Adresy zaczynające się od admin@ otrzymają rolę ADMIN; pozostałe — STUDENT.',
    devLoginSubmit: 'Zaloguj (dev)',
  },
  home: {
    title: 'Wybierz quiz',
    subtitle: 'Wybierz moduł, aby rozpocząć naukę',
    questionsOne: '1 pytanie',
    questionsFew: '{n} pytania',
    questionsMany: '{n} pytań',
    startQuiz: 'Rozpocznij →',
    emptyHint:
      'Brak dostępnych modułów. Uruchom {command}, aby wypełnić bazę danych.',
    noModulesForLocale:
      'Brak modułów w wybranym języku. Przełącz język, aby zobaczyć inne moduły.',
  },
  subjects: {
    LANGUAGE: 'Język',
    MATH: 'Matematyka',
    LOGIC: 'Logika',
  },
  quiz: {
    questionOf: 'Pytanie {current} z {total}',
    hint: 'Podpowiedź',
    typeAnswerPlaceholder: 'Wpisz odpowiedź...',
    pressEnterToSubmit: 'Naciśnij Enter, aby zatwierdzić',
    clickOptionToSubmit: 'Kliknij opcję, aby zatwierdzić',
    noQuestions: 'Brak pytań',
    invalidContent: 'Nieprawidłowy format treści',
    missingPrompt: 'Brak pytania',
    missingPromptOrOptions: 'Brak pytania lub opcji',
    unknownItemType: 'Nieznany typ pytania',
    mathNotImplemented: 'Renderer matematyczny jeszcze nie jest gotowy',
    geometryNotImplemented: 'Renderer geometryczny jeszcze nie jest gotowy',
    exit: 'Wyjdź',
    exitConfirm: 'Czy na pewno chcesz wyjść? Twój postęp zostanie utracony.',
  },
  results: {
    complete: 'Quiz ukończony!',
    score: 'Wynik',
    time: 'Czas',
    reviewMistakes: 'Przejrzyj swoje błędy',
    yourAnswer: 'Twoja odpowiedź',
    correctAnswer: 'Poprawna odpowiedź',
    questionNumber: 'Pytanie {n}',
    tryAgain: 'Spróbuj ponownie',
    chooseAnother: 'Wybierz inny moduł',
    savingResult: 'Zapisywanie wyniku...',
  },
};

export type Messages = typeof pl;
