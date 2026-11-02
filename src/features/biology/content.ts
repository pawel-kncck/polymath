import type { ContentModule } from "@/content/types";

export type MissionId =
  "bio-life" | "bio-research" | "bio-microscope" | "bio-chemistry" | "bio-cell";
export type BioQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
  visual?: "cell" | "microscope" | "levels";
};
export type Mission = {
  id: MissionId;
  number: string;
  title: string;
  subtitle: string;
  badge: string;
  minutes: number;
  labTitle: string;
  concepts: { title: string; text: string }[];
  tip: string;
  questions: BioQuestion[];
};

// Original content, inspired only by the topics in sources/biology.
export const MISSIONS: Mission[] = [
  {
    id: "bio-life",
    number: "01",
    title: "Po czym poznasz życie?",
    subtitle: "Od pojedynczej komórki do całego organizmu.",
    badge: "Tropiciel życia",
    minutes: 8,
    labTitle: "Życie na pięciu poziomach",
    concepts: [
      {
        title: "Biologia pyta o życie",
        text: "Biologia bada organizmy, ich budowę, czynności życiowe i związki z otoczeniem. Botanik zajmuje się roślinami, zoolog zwierzętami, a ekolog bada zależności między organizmami oraz ich środowiskiem.",
      },
      {
        title: "Ruch to nie wszystko",
        text: "Samochód się porusza, a kryształ może rosnąć — to jeszcze nie czyni ich żywymi. Organizmy mają budowę komórkową i wykonują czynności życiowe: odżywiają się, oddychają, wydalają, reagują na bodźce, rosną i rozwijają się. Rozmnażanie umożliwia trwanie gatunku.",
      },
      {
        title: "Małe części współpracują",
        text: "Komórka jest podstawową jednostką życia. W organizmie wielokomórkowym komórki tworzą tkanki, tkanki budują narządy, a narządy współpracują w układach. Całość to organizm. U roślin mówimy także o organach i systemach.",
      },
    ],
    tip: "Nie każdy osobnik musi się rozmnażać. Brak potomstwa nie oznacza, że organizm nie żyje. Organizm jednokomórkowy, np. drożdżak, wykonuje czynności życiowe za pomocą jednej komórki.",
    questions: [
      {
        id: "life-1",
        prompt:
          "Dlaczego jeż jest organizmem, a poruszający się rower nim nie jest?",
        options: [
          "Jeż jest większy",
          "Jeż ma budowę komórkową i wykonuje czynności życiowe",
          "Rower porusza się za szybko",
          "Jeż zawsze się porusza",
        ],
        correct: 1,
        explanation:
          "Ruch nie wystarcza do rozpoznania życia. Organizm jest zbudowany z komórek i wykonuje czynności życiowe.",
      },
      {
        id: "life-2",
        prompt:
          "Która kolejność prowadzi od najmniejszego poziomu budowy do największego?",
        options: [
          "Narząd → komórka → tkanka → organizm",
          "Tkanka → komórka → układ → narząd",
          "Organizm → układ → tkanka → komórka",
          "Komórka → tkanka → narząd → układ → organizm",
        ],
        correct: 3,
        explanation:
          "Komórki budują tkanki, tkanki narządy, a współpracujące narządy układy. Układy tworzą organizm.",
      },
      {
        id: "life-3",
        prompt: "Który element przedstawionego szeregu jest narządem?",
        options: [
          "Komórka mięśniowa",
          "Tkanka mięśniowa",
          "Serce",
          "Układ krwionośny",
        ],
        correct: 2,
        explanation:
          "Serce to narząd zbudowany z różnych tkanek. Współpracuje z naczyniami krwionośnymi.",
        visual: "levels",
      },
      {
        id: "life-4",
        prompt:
          "Siewka wygina się w stronę światła. Jaką czynność życiową obserwujesz?",
        options: [
          "Reagowanie na bodziec",
          "Wydalanie",
          "Rozmnażanie",
          "Pobieranie gotowego pokarmu",
        ],
        correct: 0,
        explanation:
          "Światło jest bodźcem, na który roślina reaguje zmianą kierunku wzrostu.",
      },
      {
        id: "life-5",
        prompt:
          "Badacz sprawdza, jak liczba owadów wpływa na ptaki w ogrodzie. Z jaką dziedziną wiąże się to pytanie?",
        options: [
          "Wyłącznie z budową skał",
          "Z ekologią",
          "Wyłącznie z anatomią",
          "Z astronomią",
        ],
        correct: 1,
        explanation:
          "Ekologia bada między innymi zależności między organizmami, np. ptakami i ich pokarmem.",
      },
      {
        id: "life-6",
        prompt: "Drożdżak jest jednokomórkowy. Co to oznacza?",
        options: [
          "Nie wykonuje czynności życiowych",
          "Jest fragmentem większego zwierzęcia",
          "Jedna komórka jest całym organizmem",
          "Nie potrzebuje substancji odżywczych",
        ],
        correct: 2,
        explanation:
          "Organizm jednokomórkowy wykonuje niezbędne czynności życiowe w obrębie jednej komórki.",
      },
    ],
  },
  {
    id: "bio-research",
    number: "02",
    title: "Pytaj jak naukowiec",
    subtitle: "Zaplanuj doświadczenie, któremu można zaufać.",
    badge: "Uważny badacz",
    minutes: 10,
    labTitle: "Czy nasiona potrzebują wody?",
    concepts: [
      {
        title: "Obserwacja czy doświadczenie?",
        text: "Podczas obserwacji przyglądasz się obiektowi lub zjawisku, nie zmieniając celowo badanych warunków. W doświadczeniu świadomie zmieniasz wybrany czynnik i sprawdzasz jego wpływ. Liczenie ptaków przy stawie to obserwacja; porównanie kiełkowania nasion z wodą i bez niej to doświadczenie.",
      },
      {
        title: "Jedno pytanie, jedna zmiana",
        text: "Problem badawczy ma postać pytania, np. „Czy dostęp do wody wpływa na kiełkowanie fasoli?”. Hipoteza to odpowiedź, którą dopiero sprawdzimy. W próbie badawczej zmieniamy badany czynnik, a próba kontrolna daje punkt odniesienia. Pozostałe warunki utrzymujemy takie same.",
      },
      {
        title: "Najpierw dane, potem wniosek",
        text: "Zapisz plan i sposób pomiaru. Użyj kilku nasion tego samego gatunku w każdej próbie, prowadź obserwacje równie długo i notuj wyniki. Wniosek musi wynikać z danych, nawet gdy nie zgadza się z hipotezą. Jedno doświadczenie nie rozstrzyga wszystkich pytań o wszystkie rośliny.",
      },
    ],
    tip: "W naszym doświadczeniu próba kontrolna ma dostęp do wody. W próbie badawczej go odbieramy. „Kontrolna” nie znaczy zawsze „bez badanego czynnika” — jej rolą jest zapewnienie porównania.",
    questions: [
      {
        id: "research-1",
        prompt:
          "Zosia liczy biedronki na liściach i niczego celowo nie zmienia. Co robi?",
        options: [
          "Stawia gotowy wniosek",
          "Przeprowadza doświadczenie",
          "Prowadzi obserwację",
          "Zmienia próbę kontrolną",
        ],
        correct: 2,
        explanation:
          "Obserwacja polega na zbieraniu informacji bez celowej zmiany badanego czynnika.",
      },
      {
        id: "research-2",
        prompt: "Które zdanie jest problemem badawczym?",
        options: [
          "Czy dostęp do wody wpływa na kiełkowanie fasoli?",
          "Fasola na pewno wykiełkuje",
          "W próbie A wykiełkowało 8 nasion",
          "Doświadczenie trwało tydzień",
        ],
        correct: 0,
        explanation:
          "Problem badawczy jest pytaniem. Hipoteza jest proponowaną odpowiedzią, a wynik opisuje zebrane dane.",
      },
      {
        id: "research-3",
        prompt:
          "Badasz wpływ wody. W jednej próbie zmieniasz także temperaturę. Co jest problemem?",
        options: [
          "Temperatura nie ma żadnego znaczenia",
          "Trudno rozdzielić wpływ wody i temperatury",
          "Nie wolno liczyć nasion",
          "Każde doświadczenie wymaga trzech zmian",
        ],
        correct: 1,
        explanation:
          "Zmiana kilku czynników naraz utrudnia ustalenie, który z nich spowodował różnicę wyników.",
      },
      {
        id: "research-4",
        prompt: "Po co stosujemy próbę kontrolną?",
        options: [
          "Aby nie zapisywać wyników",
          "Aby zawsze udowodnić hipotezę",
          "Aby zastąpić wszystkie powtórzenia",
          "Aby mieć punkt odniesienia dla próby badawczej",
        ],
        correct: 3,
        explanation:
          "Próba kontrolna pozwala porównać wynik z warunkami, w których nie wprowadzono badanej zmiany.",
      },
      {
        id: "research-5",
        prompt:
          "Wyniki przeczą twojej hipotezie. Co powinien zrobić rzetelny badacz?",
        options: [
          "Usunąć niewygodne wyniki",
          "Dopisać korzystne dane",
          "Zapisać wyniki i sformułować zgodny z nimi wniosek",
          "Uznać, że wyników nie trzeba sprawdzać",
        ],
        correct: 2,
        explanation:
          "Hipoteza może się nie potwierdzić. To także wartościowa informacja, jeśli badanie przeprowadzono rzetelnie.",
      },
      {
        id: "research-6",
        prompt:
          "Co powinno być takie samo w próbach badających wpływ wody na kiełkowanie?",
        options: [
          "Gatunek i liczba nasion, temperatura oraz czas obserwacji",
          "Dostęp do wody, ale nic innego",
          "Tylko nazwa doniczki",
          "Wynik, jeszcze przed rozpoczęciem",
        ],
        correct: 0,
        explanation:
          "Zmieniamy dostęp do wody, a inne istotne warunki utrzymujemy jednakowe, by porównanie było miarodajne.",
      },
    ],
  },
  {
    id: "bio-microscope",
    number: "03",
    title: "Zajrzyj do mikroświata",
    subtitle: "Poznaj mikroskop i odkryj komórki skórki cebuli.",
    badge: "Mistrz ostrego obrazu",
    minutes: 10,
    labTitle: "Twój wirtualny mikroskop",
    concepts: [
      {
        title: "Dwie soczewki, wspólne zadanie",
        text: "W mikroskopie optycznym obiektyw tworzy powiększony obraz preparatu, a okular dodatkowo go powiększa. Powiększenie całkowite to iloczyn obu wartości: okular 10× i obiektyw 4× dają razem 40×. Nie dodajemy tych liczb.",
      },
      {
        title: "Najpierw znajdź, potem powiększ",
        text: "Zacznij od najmniejszego powiększenia, ustaw oświetlenie i ostrość, a interesujący obiekt przesuń na środek pola widzenia. Dopiero potem zmień obiektyw. Przy większym powiększeniu widzisz mniejszy fragment preparatu, a ostrość ustawiasz ostrożnie śrubą mikrometryczną.",
      },
      {
        title: "Preparat przepuszcza światło",
        text: "Cienki materiał umieszcza się na szkiełku podstawowym, zwykle w kropli wody, i przykrywa szkiełkiem nakrywkowym. Na lekcji korzystaj z preparatów i instrukcji nauczyciela. Obraz przez mikroskop to często płaski przekrój trójwymiarowej struktury.",
      },
    ],
    tip: "Powiększenie nie gwarantuje szczegółów: obraz musi być ostry i właściwie oświetlony. Nasz widok jest schematem komórek skórki łuski cebuli, nie prawdziwym zdjęciem. Kolory i szczegóły są umowne.",
    questions: [
      {
        id: "micro-1",
        prompt:
          "Okular ma powiększenie 10×, a obiektyw 40×. Ile wynosi powiększenie całkowite?",
        options: ["50×", "400×", "40×", "4×"],
        correct: 1,
        explanation:
          "Mnożymy powiększenia: 10 × 40 = 400. Dodanie wartości byłoby błędem.",
        visual: "microscope",
      },
      {
        id: "micro-2",
        prompt:
          "Od którego obiektywu najlepiej rozpocząć szukanie obiektu w preparacie?",
        options: [
          "Od 40×",
          "Od największego dostępnego",
          "Od dowolnego, bez ustawiania ostrości",
          "Od 4×, czyli najmniejszego z tych obiektywów",
        ],
        correct: 3,
        explanation:
          "Małe powiększenie daje większe pole widzenia, więc łatwiej znaleźć i ustawić obiekt.",
      },
      {
        id: "micro-3",
        prompt:
          "Zwiększasz powiększenie tego samego preparatu. Co dzieje się z widocznym obszarem?",
        options: [
          "Zwykle widzisz mniejszy fragment",
          "Widzisz cały preparat naraz",
          "Obszar zawsze pozostaje taki sam",
          "Preparat naprawdę rośnie",
        ],
        correct: 0,
        explanation:
          "Większe powiększenie pokazuje mniejszy fragment preparatu, ale jego elementy wyglądają na większe.",
      },
      {
        id: "micro-4",
        prompt: "Do czego służy śruba mikrometryczna?",
        options: [
          "Do mnożenia powiększeń",
          "Do barwienia preparatu",
          "Do precyzyjnego ustawiania ostrości",
          "Do zamiany komórki w tkankę",
        ],
        correct: 2,
        explanation:
          "Śruba mikrometryczna pozwala wykonywać bardzo małe ruchy potrzebne do dokładnego ustawienia ostrości.",
      },
      {
        id: "micro-5",
        prompt: "Na czym układamy materiał do obserwacji w typowym preparacie?",
        options: [
          "Bezpośrednio na okularze",
          "Na szkiełku podstawowym",
          "Na pokrętle ostrości",
          "Na obudowie lampy",
        ],
        correct: 1,
        explanation:
          "Szkiełko podstawowe podtrzymuje materiał, a małe szkiełko nakrywkowe go przykrywa.",
      },
      {
        id: "micro-6",
        prompt: "Okular 15× i obiektyw 10× dają razem…",
        options: ["25×", "1 500×", "5×", "150×"],
        correct: 3,
        explanation:
          "15 × 10 = 150. Powiększenie całkowite jest iloczynem powiększeń okularu i obiektywu.",
      },
    ],
  },
  {
    id: "bio-chemistry",
    number: "04",
    title: "Z czego powstaje życie?",
    subtitle: "Odkryj zadania wody, białek, cukrów i DNA.",
    badge: "Odkrywca składników",
    minutes: 9,
    labTitle: "Sześć składników, wiele zadań",
    concepts: [
      {
        title: "Pierwiastki łączą się w związki",
        text: "Organizmy zawierają m.in. węgiel, wodór, tlen, azot, fosfor i siarkę. Pierwiastki tworzą związki chemiczne. Do ważnych składników organizmów należą woda, sole mineralne, cukry, białka, tłuszcze i kwasy nukleinowe.",
      },
      {
        title: "Woda i składniki mineralne",
        text: "Woda jest środowiskiem wielu reakcji i umożliwia transport rozpuszczonych substancji. Jej parowanie pomaga chłodzić organizm. Składniki mineralne pełnią różne funkcje: np. wapń współtworzy kości, a magnez jest częścią chlorofilu.",
      },
      {
        title: "Budulec, zapas i informacja",
        text: "Białka budują struktury i uczestniczą w przebiegu wielu procesów. Cukry dostarczają energii, ale mogą też budować struktury lub tworzyć zapasy. Tłuszcze są wydajnym materiałem zapasowym i mogą chronić przed utratą ciepła. DNA przechowuje informację genetyczną.",
      },
    ],
    tip: "Jedna grupa związków może mieć kilka funkcji. Glukoza jest źródłem energii, skrobia materiałem zapasowym, a celuloza buduje ściany komórek roślinnych — wszystkie należą do cukrów.",
    questions: [
      {
        id: "chem-1",
        prompt:
          "Który składnik umożliwia transport wielu rozpuszczonych substancji?",
        options: [
          "Woda",
          "Wyłącznie DNA",
          "Wyłącznie celuloza",
          "Powietrze w kościach",
        ],
        correct: 0,
        explanation:
          "Woda rozpuszcza wiele substancji i umożliwia ich transport w organizmie.",
      },
      {
        id: "chem-2",
        prompt: "Gdzie jest zapisana informacja genetyczna?",
        options: [
          "Wyłącznie w tłuszczu zapasowym",
          "W wodzie",
          "W DNA",
          "W skrobi",
        ],
        correct: 2,
        explanation:
          "DNA jest kwasem nukleinowym przechowującym informację genetyczną.",
      },
      {
        id: "chem-3",
        prompt: "Które zdanie o cukrach jest poprawne?",
        options: [
          "Wszystkie są wyłącznie słodkim pokarmem",
          "Nie występują w roślinach",
          "Służą tylko do budowy kości",
          "Mogą dostarczać energii, tworzyć zapasy lub budować struktury",
        ],
        correct: 3,
        explanation:
          "Różne cukry pełnią różne funkcje: glukoza dostarcza energii, skrobia jest zapasem, a celuloza buduje ściany komórkowe.",
      },
      {
        id: "chem-4",
        prompt:
          "Która grupa związków jest ważnym budulcem i obejmuje wiele substancji regulujących procesy w komórce?",
        options: [
          "Tylko sole mineralne",
          "Białka",
          "Tylko woda",
          "Wyłącznie tłuszcze zapasowe",
        ],
        correct: 1,
        explanation:
          "Białka mają wiele zadań: budują struktury oraz uczestniczą w regulacji i przebiegu procesów, np. jako enzymy.",
      },
      {
        id: "chem-5",
        prompt: "Warstwa tłuszczu pod skórą niektórych zwierząt pomaga…",
        options: [
          "Ograniczać utratę ciepła i magazynować energię",
          "Zastąpić całkowicie wodę",
          "Usunąć potrzebę oddychania",
          "Zapisać wszystkie informacje genetyczne",
        ],
        correct: 0,
        explanation:
          "Tłuszcz może stanowić zapas energii i warstwę izolującą przed utratą ciepła.",
      },
      {
        id: "chem-6",
        prompt:
          "Magnez w chlorofilu i wapń w kościach pokazują, że składniki mineralne…",
        options: [
          "Nie mają żadnej funkcji",
          "Występują tylko w zwierzętach",
          "Są potrzebne do budowy i działania organizmów",
          "Są tym samym co DNA",
        ],
        correct: 2,
        explanation:
          "Składniki mineralne są niezbędne, chociaż organizm może potrzebować ich w mniejszych ilościach niż wody.",
      },
    ],
  },
  {
    id: "bio-cell",
    number: "05",
    title: "Mały świat w komórce",
    subtitle: "Poznaj zespół, który pracuje wewnątrz zwierzęcia.",
    badge: "Znawca komórek",
    minutes: 10,
    labTitle: "Wejdź do komórki zwierzęcej",
    concepts: [
      {
        title: "Granica, która wybiera",
        text: "Błona komórkowa oddziela wnętrze komórki od otoczenia i kontroluje transport substancji. Komórka zwierzęca nie ma ściany komórkowej ani chloroplastów. Jej kształt wiąże się z funkcją — np. komórka nerwowa ma wypustki do kontaktu z innymi komórkami.",
      },
      {
        title: "Wnętrze pełne współpracy",
        text: "Cytozol to płynna część wnętrza komórki. Wraz z zanurzonymi w nim strukturami, poza jądrem, tworzy cytoplazmę. Jądro zawiera DNA i uczestniczy w kierowaniu procesami komórki. Rybosomy wytwarzają białka.",
      },
      {
        title: "Energia i transport",
        text: "W mitochondriach zachodzą ważne etapy oddychania komórkowego, które udostępnia energię z substancji odżywczych. Aparat Golgiego modyfikuje i sortuje m.in. białka, a pęcherzyki pomagają w ich transporcie. Te elementy współpracują, zamiast działać osobno.",
      },
    ],
    tip: "Ilustracja to powiększony, uproszczony model, a nie zdjęcie. Kolory pomagają odróżnić elementy. Nie wszystkie szczegóły modelu można zobaczyć przez szkolny mikroskop optyczny.",
    questions: [
      {
        id: "cell-1",
        prompt:
          "Który element oddziela wnętrze komórki od otoczenia i kontroluje transport?",
        options: ["Jądro", "Rybosom", "Mitochondrium", "Błona komórkowa"],
        correct: 3,
        explanation:
          "Błona komórkowa tworzy granicę komórki i reguluje przenikanie substancji.",
      },
      {
        id: "cell-2",
        prompt:
          "Który element typowej komórki zwierzęcej zawiera większość jej DNA?",
        options: [
          "Jądro komórkowe",
          "Pęcherzyk transportowy",
          "Błona komórkowa",
          "Aparat Golgiego",
        ],
        correct: 0,
        explanation:
          "Większość DNA komórki zwierzęcej znajduje się w jądrze. Niewielka część występuje też w mitochondriach.",
      },
      {
        id: "cell-3",
        prompt: "Które struktury wytwarzają białka?",
        options: [
          "Wyłącznie błona komórkowa",
          "Rybosomy",
          "Krople wody",
          "Ściana komórkowa zwierzęcia",
        ],
        correct: 1,
        explanation:
          "Rybosomy uczestniczą w wytwarzaniu białek. Komórki zwierzęce nie mają ściany komórkowej.",
      },
      {
        id: "cell-4",
        prompt:
          "Element A ma pofałdowaną błonę wewnętrzną. Z jakim procesem jest związany?",
        options: [
          "Wyłącznie z zapisywaniem wszystkich cech organizmu",
          "Z fotosyntezą",
          "Z oddychaniem komórkowym i udostępnianiem energii",
          "Z powstawaniem ściany komórkowej",
        ],
        correct: 2,
        explanation:
          "A oznacza mitochondrium. Zachodzą w nim ważne etapy oddychania komórkowego.",
        visual: "cell",
      },
      {
        id: "cell-5",
        prompt: "Której struktury nie ma komórka zwierzęca?",
        options: ["Błony komórkowej", "Rybosomów", "Cytozolu", "Chloroplastu"],
        correct: 3,
        explanation:
          "Chloroplasty występują m.in. w fotosyntetyzujących komórkach roślin. Komórka zwierzęca ich nie ma.",
      },
      {
        id: "cell-6",
        prompt: "Dlaczego komórka nerwowa ma długie wypustki?",
        options: [
          "Jej budowa pomaga przekazywać informacje",
          "Każda komórka musi mieć ten sam kształt",
          "Służą tylko do przechowywania wody",
          "Zastępują wszystkie inne elementy komórki",
        ],
        correct: 0,
        explanation:
          "Kształt komórki jest związany z jej funkcją. Wypustki komórki nerwowej umożliwiają kontakt z innymi komórkami.",
      },
    ],
  },
];
export const biologyModules: ContentModule[] = MISSIONS.map((m) => ({
  id: m.id,
  title: { pl: m.title },
  description: { pl: m.subtitle },
  subject: "BIOLOGY",
  category: "BIOLOGY",
  areaId: "biology-foundations",
  languages: ["pl"],
  items: m.questions.map((q) => ({
    id: q.id,
    type: "SINGLE_CHOICE",
    content: {
      prompt: { pl: q.prompt },
      options: { pl: q.options },
      answer: { pl: q.options[q.correct] },
    },
  })),
}));
