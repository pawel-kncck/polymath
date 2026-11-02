import type { ContentModule } from "@/content/types";

export type MissionId = "geo-map" | "geo-scale" | "geo-relief" | "geo-route";
export type GeoQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
  visual?: "map" | "contours";
};
export type Mission = {
  id: MissionId;
  number: string;
  title: string;
  subtitle: string;
  badge: string;
  minutes: number;
  concepts: { title: string; text: string }[];
  tip: string;
  questions: GeoQuestion[];
};

// Original lessons and questions. The supplied textbook photos inform topic
// selection only; the fictional landscape, wording and exercises are original.
export const MISSIONS: Mission[] = [
  {
    id: "geo-map",
    number: "01",
    title: "Mapa to przygoda",
    subtitle: "Odkryj znaki, legendę i kierunki świata.",
    badge: "Tropiciel znaków",
    minutes: 8,
    concepts: [
      {
        title: "Świat widziany z góry",
        text: "Mapa pokazuje wybrany obszar Ziemi na płaszczyźnie, w pomniejszeniu i za pomocą umownych znaków. Tytuł mówi, jaki obszar oglądasz; skala pozwala obliczyć odległość, a legenda wyjaśnia znaki.",
      },
      {
        title: "Trzy języki mapy",
        text: "Znak punktowy wskazuje obiekt, np. schronisko. Znak liniowy pokazuje przebieg, np. szlaku lub rzeki. Znak powierzchniowy wypełnia obszar, np. las lub jezioro. Znaczenie zawsze sprawdzaj w legendzie konkretnej mapy.",
      },
      {
        title: "Złap kierunek",
        text: "N oznacza północ, E — wschód, S — południe, W — zachód. Na naszej mapie północ jest u góry. Na innych mapach sprawdź strzałkę północy: sam układ kartki nie daje pewności.",
      },
    ],
    tip: "Geograf pyta nie tylko „gdzie?”, ale też „dlaczego właśnie tam?”. Porównuj mapy, zdjęcia i własne obserwacje — każde źródło pokazuje inny fragment świata.",
    questions: [
      {
        id: "map-1",
        prompt:
          "Co na mapie wyjaśnia znaczenie zielonego obszaru i symbolu namiotu?",
        options: ["Tytuł", "Legenda", "Skala", "Data wydania"],
        correct: 1,
        explanation:
          "Legenda jest słownikiem mapy: tłumaczy jej kolory, linie i symbole.",
      },
      {
        id: "map-2",
        prompt:
          "W którym kierunku od przystani znajduje się wieża? Spójrz na mapę.",
        options: [
          "Na północny wschód",
          "Na południowy zachód",
          "Na północny zachód",
          "Na południe",
        ],
        correct: 0,
        explanation:
          "Wieża leży wyżej i na prawo od przystani. Przy północy u góry oznacza to północny wschód.",
        visual: "map",
      },
      {
        id: "map-3",
        prompt:
          "Czerwona przerywana kreska przedstawia szlak. Jaki to rodzaj znaku?",
        options: ["Punktowy", "Powierzchniowy", "Liniowy", "Wysokościowy"],
        correct: 2,
        explanation:
          "Szlak ma przebieg i długość, dlatego przedstawia go znak liniowy.",
      },
      {
        id: "map-4",
        prompt: "Który element naszej mapy jest znakiem powierzchniowym?",
        options: [
          "Symbol wieży",
          "Napis „Dolina Odkrywców”",
          "Strzałka północy",
          "Niebieski obszar jeziora",
        ],
        correct: 3,
        explanation:
          "Powierzchnia jeziora zajmuje obszar na mapie. Wieża jest znakiem punktowym.",
        visual: "map",
      },
      {
        id: "map-5",
        prompt:
          "Obrócono mapę tak, że strzałka N wskazuje w lewo. Gdzie jest teraz północ na tej kartce?",
        options: [
          "Nadal na górze",
          "Po lewej stronie",
          "Po prawej stronie",
          "Na dole",
        ],
        correct: 1,
        explanation:
          "Kierunek wyznacza strzałka N. Obrót kartki zmienia położenie północy względem jej krawędzi.",
      },
      {
        id: "map-6",
        prompt:
          "Chcesz sprawdzić, jak zmieniła się zabudowa okolicy. Co najlepiej porównać?",
        options: [
          "Dwie takie same legendy",
          "Sam globus",
          "Mapy lub zdjęcia tego miejsca z różnych lat",
          "Wyłącznie prognozę pogody",
        ],
        correct: 2,
        explanation:
          "Porównanie tego samego obszaru w różnych latach pozwala zauważyć nowe drogi i budynki.",
      },
    ],
  },
  {
    id: "geo-scale",
    number: "02",
    title: "Mała mapa, wielki świat",
    subtitle: "Zamień centymetry w prawdziwą wyprawę.",
    badge: "Mistrz skali",
    minutes: 10,
    concepts: [
      {
        title: "1 : 25 000 — co to znaczy?",
        text: "Jedna jednostka na mapie odpowiada 25 000 takich samych jednostek w terenie. Czyli 1 cm na mapie to 25 000 cm = 250 m = 0,25 km w terenie. Najpierw przelicz jednostki, potem mnożysz odległość.",
      },
      {
        title: "Trzy zapisy, jedna informacja",
        text: "Skala liczbowa 1 : 25 000, skala mianowana 1 cm — 250 m i podziałka liniowa opisują to samo pomniejszenie. Podziałka to narysowana linijka z opisanymi odległościami w terenie.",
      },
      {
        title: "Większa skala, więcej szczegółów",
        text: "1 : 10 000 jest większą skalą niż 1 : 100 000. Ten sam park będzie na niej większy i zmieści więcej szczegółów. Po powiększeniu mapy na ekranie jej podziałka powiększa się razem z nią; zapis liczbowy sam się nie zmienia.",
      },
    ],
    tip: "Na ekranie nie przykładaj prawdziwej linijki. Korzystaj z podziałki lub długości podanej w zadaniu — rozmiar obrazu zależy od urządzenia i powiększenia.",
    questions: [
      {
        id: "scale-1",
        prompt:
          "Ile metrów w terenie odpowiada 1 cm na mapie w skali 1 : 40 000?",
        options: ["40 m", "4 000 m", "400 m", "4 m"],
        correct: 2,
        explanation: "40 000 cm dzielimy przez 100. Otrzymujemy 400 m.",
      },
      {
        id: "scale-2",
        prompt:
          "Na mapie 1 : 25 000 odcinek ma 6 cm. Jaka to odległość w terenie?",
        options: ["1,5 km", "150 m", "15 km", "6 km"],
        correct: 0,
        explanation: "1 cm to 250 m. Zatem 6 × 250 m = 1 500 m = 1,5 km.",
      },
      {
        id: "scale-3",
        prompt:
          "Skala mianowana brzmi: 1 cm — 500 m. Jaki jest jej zapis liczbowy?",
        options: ["1 : 500", "1 : 5 000", "1 : 500 000", "1 : 50 000"],
        correct: 3,
        explanation:
          "500 m to 50 000 cm. Obie strony skali liczbowej muszą oznaczać tę samą jednostkę.",
      },
      {
        id: "scale-4",
        prompt:
          "Która skala pozwoli pokazać ten sam plac jako największy rysunek?",
        options: ["1 : 100 000", "1 : 5 000", "1 : 50 000", "1 : 200 000"],
        correct: 1,
        explanation:
          "Mniejszy mianownik oznacza większą skalę i mniejsze pomniejszenie obiektów.",
      },
      {
        id: "scale-5",
        prompt:
          "Szlak ma dwa odcinki: 3 cm i 5 cm na mapie 1 : 10 000. Ile ma metrów w terenie?",
        options: ["200 m", "8 000 m", "800 m", "80 m"],
        correct: 2,
        explanation:
          "Dodajemy odcinki: 3 + 5 = 8 cm. Każdy centymetr to 100 m, więc trasa ma 800 m.",
      },
      {
        id: "scale-6",
        prompt:
          "Odległość w terenie to 2 km. Ile centymetrów zajmie na mapie 1 : 50 000?",
        options: ["4 cm", "40 cm", "2 cm", "10 cm"],
        correct: 0,
        explanation:
          "1 cm odpowiada 500 m. Dzielimy 2 000 m przez 500 m: otrzymujemy 4 cm.",
      },
    ],
  },
  {
    id: "geo-relief",
    number: "03",
    title: "Odczytaj kształt góry",
    subtitle: "Poziomice zdradzają więcej, niż myślisz.",
    badge: "Zdobywca wysokości",
    minutes: 10,
    concepts: [
      {
        title: "Wysokość ma punkt odniesienia",
        text: "Wysokość bezwzględna jest liczona od poziomu morza i zapisywana w m n.p.m. Wysokość względna to różnica wysokości dwóch miejsc. Od bazy na 150 m n.p.m. na szczyt 375 m n.p.m. pokonujesz 225 m różnicy wysokości.",
      },
      {
        title: "Poziomica łączy równych",
        text: "Każdy punkt tej samej poziomicy ma tę samą wysokość bezwzględną. W naszym modelu kolejne linie różnią się o 50 m. Gdy linie leżą blisko siebie, stok jest bardziej stromy; gdy daleko — łagodniejszy.",
      },
      {
        title: "Kolory wysokości",
        text: "Na typowej mapie hipsometrycznej zieleń oznacza niżej położone obszary, żółcie wyższe, a brązy wysokie. To wysokość, nie kolor roślin! Zawsze czytaj skalę barw. Wzniesienie ma wysokości rosnące ku środkowi; zagłębienie — malejące.",
      },
    ],
    tip: "Wysokość punktu między poziomicami można zwykle tylko oszacować. Punkt między liniami 200 i 250 m leży wyżej niż 200 m i niżej niż 250 m — nie musi mieć dokładnie 225 m.",
    questions: [
      {
        id: "relief-1",
        prompt: "Co łączy punkty leżące na tej samej poziomicy?",
        options: [
          "Taka sama temperatura",
          "Taka sama odległość od szczytu",
          "Taki sam rodzaj skał",
          "Taka sama wysokość n.p.m.",
        ],
        correct: 3,
        explanation:
          "Poziomica łączy punkty o jednakowej wysokości nad poziomem morza.",
      },
      {
        id: "relief-2",
        prompt:
          "Szczyt ma 375 m n.p.m., a baza 150 m n.p.m. Jaka jest wysokość względna szczytu względem bazy?",
        options: ["525 m", "225 m", "375 m", "150 m"],
        correct: 1,
        explanation:
          "Odejmujemy wysokość bazy od wysokości szczytu: 375 − 150 = 225 m.",
      },
      {
        id: "relief-3",
        prompt:
          "Po której stronie modelowego wzgórza stok jest bardziej stromy? Północ jest u góry.",
        options: [
          "Po zachodniej",
          "Po obu stronach tak samo",
          "Po wschodniej",
          "Nie można ocenić z poziomic",
        ],
        correct: 2,
        explanation:
          "Po wschodniej (prawej) stronie poziomice leżą bliżej siebie: ta sama zmiana wysokości przypada na krótszy odcinek.",
        visual: "contours",
      },
      {
        id: "relief-4",
        prompt:
          "Kolejne poziomice mają wartości 100, 150 i 200 m. Co ile metrów je poprowadzono?",
        options: ["Co 50 m", "Co 100 m", "Co 150 m", "Co 200 m"],
        correct: 0,
        explanation:
          "Różnica sąsiednich wartości wynosi 50 m. To odstęp wysokościowy poziomic.",
      },
      {
        id: "relief-5",
        prompt: "Punkt leży między poziomicami 250 i 300 m. Co wiemy na pewno?",
        options: [
          "Leży dokładnie na 275 m",
          "Leży powyżej 300 m",
          "Leży poniżej 250 m",
          "Leży wyżej niż 250 m i niżej niż 300 m",
        ],
        correct: 3,
        explanation:
          "Bez dodatkowego pomiaru znamy przedział wysokości, a nie dokładną wartość.",
      },
      {
        id: "relief-6",
        prompt: "Co zwykle oznacza zieleń na mapie hipsometrycznej Polski?",
        options: [
          "Wyłącznie lasy",
          "Nisko położone obszary",
          "Duże opady",
          "Granice parków",
        ],
        correct: 1,
        explanation:
          "Barwy hipsometryczne opisują wysokość terenu. Zieleń nie oznacza tutaj automatycznie lasu.",
      },
    ],
  },
  {
    id: "geo-route",
    number: "04",
    title: "Zaplanuj wyprawę",
    subtitle: "Połącz wszystkie umiejętności w terenie.",
    badge: "Przewodnik wyprawy",
    minutes: 8,
    concepts: [
      {
        title: "Wybierz właściwą mapę",
        text: "Plan miasta pomaga znaleźć ulicę i budynek. Mapa turystyczna pokazuje szlaki, atrakcje i schroniska. Mapa ogólnogeograficzna pozwala zobaczyć większy obszar: rzeki, miejscowości i ukształtowanie powierzchni.",
      },
      {
        title: "Droga nie zawsze jest prostą",
        text: "Odległość w linii prostej nie jest długością szlaku. Podziel łamaną trasę na odcinki i dodaj ich długości. Krętą trasę na papierze można zmierzyć nitką, a potem porównać ją z podziałką.",
      },
      {
        title: "Zorientuj mapę",
        text: "Ustaw mapę tak, by zaznaczone na niej kierunki zgadzały się z kierunkami w terenie. Pomaga kompas lub porównanie charakterystycznych obiektów, np. jeziora i wieży. Przed wyjściem sprawdź też pogodę i aktualność szlaku.",
      },
    ],
    tip: "Mapa to model, a nie obietnica. Remont mostu, zamknięty szlak czy zmiana pogody mogą zmienić plan wyprawy. Warto mieć aktualne informacje i zapas czasu.",
    questions: [
      {
        id: "route-1",
        prompt:
          "Która mapa najlepiej pomoże zaplanować pieszą wycieczkę szlakami?",
        options: [
          "Mapa stref czasowych",
          "Mapa polityczna świata",
          "Mapa turystyczna",
          "Mapa opadów",
        ],
        correct: 2,
        explanation:
          "Mapa turystyczna zawiera szlaki i obiekty przydatne podczas wędrówki.",
      },
      {
        id: "route-2",
        prompt:
          "Szlak z przystani do wieży prowadzi przez schronisko. Odcinki mają 0,6 km i 0,8 km. Jak długa jest trasa?",
        options: ["0,2 km", "1,4 km", "4,8 km", "0,7 km"],
        correct: 1,
        explanation:
          "Długości kolejnych odcinków dodajemy: 0,6 + 0,8 = 1,4 km.",
      },
      {
        id: "route-3",
        prompt:
          "Idziesz z przystani do schroniska. W którym głównym kierunku się poruszasz?",
        options: ["Na północ", "Na zachód", "Na południe", "Na wschód"],
        correct: 0,
        explanation:
          "Schronisko leży na mapie nad przystanią. Strzałka N wskazuje górę, czyli północ.",
        visual: "map",
      },
      {
        id: "route-4",
        prompt:
          "Dlaczego trasa szlakiem może być dłuższa niż odległość między jego końcami w linii prostej?",
        options: [
          "Bo skala zmienia się na zakrętach",
          "Bo północ jest zawsze na górze",
          "Bo kolory wydłużają mapę",
          "Bo szlak zakręca i omija przeszkody",
        ],
        correct: 3,
        explanation:
          "Szlak może omijać jezioro lub stromy stok. Prosta łączy końce najkrótszą drogą, ale nie musi być dostępna.",
      },
      {
        id: "route-5",
        prompt: "Jak zorientować mapę za pomocą obiektów w terenie?",
        options: [
          "Zawsze ustawić tytuł do siebie",
          "Obrócić ją tak, by kierunki do rozpoznanych obiektów zgadzały się z rzeczywistością",
          "Złożyć ją na pół",
          "Skierować dowolny brzeg ku Słońcu",
        ],
        correct: 1,
        explanation:
          "Rozpoznaj co najmniej charakterystyczne obiekty i dopasuj ich położenie na mapie do kierunków w terenie.",
      },
      {
        id: "route-6",
        prompt:
          "Powiększasz obraz mapy wraz z narysowaną podziałką. Co nadal pomaga odczytać odległość?",
        options: [
          "Pomiar ekranowych centymetrów i stary zapis 1 : 25 000",
          "Rozmiar czcionki tytułu",
          "Podziałka liniowa powiększona razem z mapą",
          "Jasność ekranu",
        ],
        correct: 2,
        explanation:
          "Podziałka i mapa zmieniają rozmiar w tej samej proporcji, więc porównanie ich długości nadal działa.",
      },
    ],
  },
];

export const geographyModules: ContentModule[] = MISSIONS.map((mission) => ({
  id: mission.id,
  title: { pl: mission.title },
  description: { pl: mission.subtitle },
  subject: "GEOGRAPHY",
  category: "GEOGRAPHY",
  areaId: "map-skills",
  languages: ["pl"],
  items: mission.questions.map((q) => ({
    id: q.id,
    type: "SINGLE_CHOICE",
    content: {
      prompt: { pl: q.prompt },
      options: { pl: q.options },
      answer: { pl: q.options[q.correct] },
      geographyVisual: q.visual,
    },
  })),
}));
