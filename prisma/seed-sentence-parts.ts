import 'dotenv/config';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new (PrismaClient as any)({ adapter });

interface Question {
  prompt: string;
  options: string[];
  answer: string;
}

interface Level {
  n: number;
  title: string;
  description: string;
  questions: Question[];
}

const levels: Level[] = [
  // ============================================
  // Poziom 1 — Podmiot i orzeczenie
  // ============================================
  {
    n: 1,
    title: 'Podmiot i orzeczenie',
    description: 'Rozpoznawanie podmiotu i orzeczenia w prostych zdaniach',
    questions: [
      {
        prompt: "Które słowo jest podmiotem w zdaniu: 'Pies biega po łące.'?",
        options: ['pies', 'biega', 'łące', 'po'],
        answer: 'pies',
      },
      {
        prompt: "Które słowo jest orzeczeniem w zdaniu: 'Dzieci śpiewają piosenkę.'?",
        options: ['dzieci', 'śpiewają', 'piosenkę', 'żadne z powyższych'],
        answer: 'śpiewają',
      },
      {
        prompt: "Które słowo jest podmiotem w zdaniu: 'Słońce świeci jasno.'?",
        options: ['słońce', 'świeci', 'jasno', 'nie ma podmiotu'],
        answer: 'słońce',
      },
      {
        prompt: "Które słowo jest orzeczeniem w zdaniu: 'Anna pisze list.'?",
        options: ['Anna', 'pisze', 'list', 'nie ma orzeczenia'],
        answer: 'pisze',
      },
      {
        prompt: "Które słowo jest podmiotem w zdaniu: 'Kot śpi na krześle.'?",
        options: ['kot', 'śpi', 'krześle', 'na'],
        answer: 'kot',
      },
      {
        prompt: "Które słowo jest orzeczeniem w zdaniu: 'Mama gotuje obiad.'?",
        options: ['mama', 'gotuje', 'obiad', 'wszystkie są orzeczeniem'],
        answer: 'gotuje',
      },
      {
        prompt: "Które słowo jest podmiotem w zdaniu: 'Ptaki fruwają po niebie.'?",
        options: ['ptaki', 'fruwają', 'niebie', 'po niebie'],
        answer: 'ptaki',
      },
      {
        prompt: "Które słowo jest orzeczeniem w zdaniu: 'Uczniowie czytają książkę.'?",
        options: ['uczniowie', 'czytają', 'książkę', 'uczniowie i książkę'],
        answer: 'czytają',
      },
      {
        prompt: "Które słowo jest podmiotem w zdaniu: 'Wiatr wieje mocno.'?",
        options: ['wiatr', 'wieje', 'mocno', 'nie ma'],
        answer: 'wiatr',
      },
      {
        prompt: "Które słowo jest orzeczeniem w zdaniu: 'Tomek gra w piłkę.'?",
        options: ['Tomek', 'gra', 'piłkę', 'w'],
        answer: 'gra',
      },
      {
        prompt: "Które słowo jest podmiotem w zdaniu: 'Róża pachnie pięknie.'?",
        options: ['róża', 'pachnie', 'pięknie', 'nie ma'],
        answer: 'róża',
      },
      {
        prompt: "Które słowo jest orzeczeniem w zdaniu: 'Chłopiec rzuca kamień.'?",
        options: ['chłopiec', 'rzuca', 'kamień', 'żadne'],
        answer: 'rzuca',
      },
      {
        prompt: "Które słowo jest podmiotem w zdaniu: 'Rzeka płynie wolno.'?",
        options: ['rzeka', 'płynie', 'wolno', 'nie ma'],
        answer: 'rzeka',
      },
      {
        prompt: "Które słowo jest orzeczeniem w zdaniu: 'Babcia piecze ciasto.'?",
        options: ['babcia', 'piecze', 'ciasto', 'żadne'],
        answer: 'piecze',
      },
      {
        prompt: "Które słowo jest podmiotem w zdaniu: 'Dziewczynka tańczy na scenie.'?",
        options: ['dziewczynka', 'tańczy', 'scenie', 'na scenie'],
        answer: 'dziewczynka',
      },
      {
        prompt: "Które słowo jest orzeczeniem w zdaniu: 'Piotr buduje zamek.'?",
        options: ['Piotr', 'buduje', 'zamek', 'wszystkie są orzeczeniem'],
        answer: 'buduje',
      },
      {
        prompt: "Które słowo jest podmiotem w zdaniu: 'Pszczoły zbierają nektar.'?",
        options: ['pszczoły', 'zbierają', 'nektar', 'nie ma'],
        answer: 'pszczoły',
      },
      {
        prompt: "Które słowo jest orzeczeniem w zdaniu: 'Nauczyciel tłumaczy lekcję.'?",
        options: ['nauczyciel', 'tłumaczy', 'lekcję', 'żadne'],
        answer: 'tłumaczy',
      },
      {
        prompt: "Które słowo jest podmiotem w zdaniu: 'Kwiat kwitnie pięknie.'?",
        options: ['kwiat', 'kwitnie', 'pięknie', 'nie ma'],
        answer: 'kwiat',
      },
      {
        prompt: "Które słowo jest orzeczeniem w zdaniu: 'Kierowca prowadzi samochód.'?",
        options: ['kierowca', 'prowadzi', 'samochód', 'wszystkie są orzeczeniem'],
        answer: 'prowadzi',
      },
    ],
  },

  // ============================================
  // Poziom 2 — + Dopełnienie
  // ============================================
  {
    n: 2,
    title: 'Dopełnienie',
    description: 'Do podmiotu i orzeczenia dochodzi dopełnienie — na co pada czynność',
    questions: [
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Tomek pije herbatę.'?",
        options: ['Tomek', 'pije', 'herbatę', 'nie ma dopełnienia'],
        answer: 'herbatę',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Kasia pisze list.'?",
        options: ['Kasia', 'pisze', 'list', 'żadne'],
        answer: 'list',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Mama kocha dziecko.'?",
        options: ['mama', 'kocha', 'dziecko', 'wszystkie'],
        answer: 'dziecko',
      },
      {
        prompt: "Które słowo jest podmiotem w zdaniu: 'Paweł czyta gazetę.'?",
        options: ['Paweł', 'czyta', 'gazetę', 'nie ma podmiotu'],
        answer: 'Paweł',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Kucharz gotuje zupę.'?",
        options: ['kucharz', 'gotuje', 'zupę', 'żadne'],
        answer: 'zupę',
      },
      {
        prompt: "Które słowo jest orzeczeniem w zdaniu: 'Dzieci oglądają film.'?",
        options: ['dzieci', 'oglądają', 'film', 'wszystkie'],
        answer: 'oglądają',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Ogrodnik sadzi drzewo.'?",
        options: ['ogrodnik', 'sadzi', 'drzewo', 'żadne'],
        answer: 'drzewo',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Michał kupuje rower.'?",
        options: ['Michał', 'kupuje', 'rower', 'nie ma'],
        answer: 'rower',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Nauczyciel ocenia ucznia.'?",
        options: ['nauczyciel', 'ocenia', 'ucznia', 'żadne'],
        answer: 'ucznia',
      },
      {
        prompt: "Które słowo jest podmiotem w zdaniu: 'Kot łowi mysz.'?",
        options: ['kot', 'łowi', 'mysz', 'żadne'],
        answer: 'kot',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Kierowca prowadzi autobus.'?",
        options: ['kierowca', 'prowadzi', 'autobus', 'wszystkie'],
        answer: 'autobus',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Lekarz bada pacjenta.'?",
        options: ['lekarz', 'bada', 'pacjenta', 'nie ma'],
        answer: 'pacjenta',
      },
      {
        prompt: "Które słowo jest orzeczeniem w zdaniu: 'Pies gryzie kość.'?",
        options: ['pies', 'gryzie', 'kość', 'żadne'],
        answer: 'gryzie',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Jan maluje obraz.'?",
        options: ['Jan', 'maluje', 'obraz', 'nie ma'],
        answer: 'obraz',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Ewa zamyka drzwi.'?",
        options: ['Ewa', 'zamyka', 'drzwi', 'żadne'],
        answer: 'drzwi',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Dziecko je jabłko.'?",
        options: ['dziecko', 'je', 'jabłko', 'wszystkie'],
        answer: 'jabłko',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Tata naprawia samochód.'?",
        options: ['tata', 'naprawia', 'samochód', 'nie ma'],
        answer: 'samochód',
      },
      {
        prompt: "Które słowo jest podmiotem w zdaniu: 'Babcia opowiada bajkę.'?",
        options: ['babcia', 'opowiada', 'bajkę', 'żadne'],
        answer: 'babcia',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Malarz maluje ścianę.'?",
        options: ['malarz', 'maluje', 'ścianę', 'żadne'],
        answer: 'ścianę',
      },
      {
        prompt: "Które słowo jest orzeczeniem w zdaniu: 'Anna gotuje makaron.'?",
        options: ['Anna', 'gotuje', 'makaron', 'żadne'],
        answer: 'gotuje',
      },
    ],
  },

  // ============================================
  // Poziom 3 — + Okolicznik
  // ============================================
  {
    n: 3,
    title: 'Okolicznik',
    description: 'Do znanych części dochodzi okolicznik — gdzie, kiedy, jak, dlaczego',
    questions: [
      {
        prompt: "Które słowo jest okolicznikiem w zdaniu: 'Ania czyta książkę wieczorem.'?",
        options: ['Ania', 'czyta', 'książkę', 'wieczorem'],
        answer: 'wieczorem',
      },
      {
        prompt: "Co jest okolicznikiem w zdaniu: 'Dzieci bawią się w ogrodzie.'?",
        options: ['dzieci', 'bawią się', 'w ogrodzie', 'żadne'],
        answer: 'w ogrodzie',
      },
      {
        prompt: "Które słowo jest okolicznikiem w zdaniu: 'Paweł biega szybko.'?",
        options: ['Paweł', 'biega', 'szybko', 'nie ma'],
        answer: 'szybko',
      },
      {
        prompt: "Które słowo jest okolicznikiem w zdaniu: 'Tata wraca jutro.'?",
        options: ['tata', 'wraca', 'jutro', 'wszystkie'],
        answer: 'jutro',
      },
      {
        prompt: "Co jest okolicznikiem w zdaniu: 'Ptak siedzi na gałęzi.'?",
        options: ['ptak', 'siedzi', 'gałęzi', 'na gałęzi'],
        answer: 'na gałęzi',
      },
      {
        prompt: "Które słowo jest okolicznikiem w zdaniu: 'Wczoraj padał deszcz.'?",
        options: ['wczoraj', 'padał', 'deszcz', 'żadne'],
        answer: 'wczoraj',
      },
      {
        prompt: "Co jest okolicznikiem w zdaniu: 'Kasia śpi w łóżku.'?",
        options: ['Kasia', 'śpi', 'łóżku', 'w łóżku'],
        answer: 'w łóżku',
      },
      {
        prompt: "Co jest okolicznikiem w zdaniu: 'Marek jedzie do szkoły.'?",
        options: ['Marek', 'jedzie', 'do szkoły', 'szkoły'],
        answer: 'do szkoły',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Babcia gotuje obiad w kuchni.'?",
        options: ['babcia', 'gotuje', 'obiad', 'w kuchni'],
        answer: 'obiad',
      },
      {
        prompt: "Które słowo jest okolicznikiem w zdaniu: 'Tomek rysuje pięknie.'?",
        options: ['Tomek', 'rysuje', 'pięknie', 'żadne'],
        answer: 'pięknie',
      },
      {
        prompt: "Co jest okolicznikiem w zdaniu: 'Chłopiec biegnie do parku.'?",
        options: ['chłopiec', 'biegnie', 'do parku', 'żadne'],
        answer: 'do parku',
      },
      {
        prompt: "Co jest okolicznikiem w zdaniu: 'Mama wraca z pracy.'?",
        options: ['mama', 'wraca', 'z pracy', 'pracy'],
        answer: 'z pracy',
      },
      {
        prompt: "Które słowo jest okolicznikiem w zdaniu: 'Dzieci śpiewają głośno.'?",
        options: ['dzieci', 'śpiewają', 'głośno', 'żadne'],
        answer: 'głośno',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Zosia maluje obraz w pokoju.'?",
        options: ['Zosia', 'maluje', 'obraz', 'w pokoju'],
        answer: 'obraz',
      },
      {
        prompt: "Które słowo jest okolicznikiem w zdaniu: 'Nauczyciel mówi wyraźnie.'?",
        options: ['nauczyciel', 'mówi', 'wyraźnie', 'żadne'],
        answer: 'wyraźnie',
      },
      {
        prompt: "Co jest okolicznikiem w zdaniu: 'Pies biega po podwórku.'?",
        options: ['pies', 'biega', 'podwórku', 'po podwórku'],
        answer: 'po podwórku',
      },
      {
        prompt: "Które słowo jest okolicznikiem w zdaniu: 'Samolot lata wysoko.'?",
        options: ['samolot', 'lata', 'wysoko', 'żadne'],
        answer: 'wysoko',
      },
      {
        prompt: "Co jest okolicznikiem w zdaniu: 'Rodzice jadą na wakacje.'?",
        options: ['rodzice', 'jadą', 'na wakacje', 'żadne'],
        answer: 'na wakacje',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Uczniowie piszą test cicho.'?",
        options: ['uczniowie', 'piszą', 'test', 'cicho'],
        answer: 'test',
      },
      {
        prompt: "Które słowo jest okolicznikiem w zdaniu: 'Babcia uśmiecha się serdecznie.'?",
        options: ['babcia', 'uśmiecha się', 'serdecznie', 'żadne'],
        answer: 'serdecznie',
      },
    ],
  },

  // ============================================
  // Poziom 4 — + Przydawka
  // ============================================
  {
    n: 4,
    title: 'Przydawka',
    description: 'Ostatnia z pięciu części — przydawka określa rzeczownik (jaki? który? czyj?)',
    questions: [
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Mała dziewczynka rysuje obrazek.'?",
        options: ['mała', 'dziewczynka', 'rysuje', 'obrazek'],
        answer: 'mała',
      },
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Czerwony samochód jedzie szybko.'?",
        options: ['czerwony', 'samochód', 'jedzie', 'szybko'],
        answer: 'czerwony',
      },
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Wysokie drzewo rośnie w lesie.'?",
        options: ['wysokie', 'drzewo', 'rośnie', 'lesie'],
        answer: 'wysokie',
      },
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Nowa książka leży na stole.'?",
        options: ['nowa', 'książka', 'leży', 'stole'],
        answer: 'nowa',
      },
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Pies śpi pod zielonym drzewem.'?",
        options: ['pies', 'śpi', 'zielonym', 'drzewem'],
        answer: 'zielonym',
      },
      {
        prompt: "Które słowo jest dopełnieniem w zdaniu: 'Dzieci piją mleko.'?",
        options: ['dzieci', 'piją', 'mleko', 'żadne'],
        answer: 'mleko',
      },
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Mądra kobieta napisała list.'?",
        options: ['mądra', 'kobieta', 'napisała', 'list'],
        answer: 'mądra',
      },
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Stary dom stoi przy drodze.'?",
        options: ['stary', 'dom', 'stoi', 'drodze'],
        answer: 'stary',
      },
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Ania czyta ciekawą książkę.'?",
        options: ['Ania', 'czyta', 'ciekawą', 'książkę'],
        answer: 'ciekawą',
      },
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Babcia piecze smaczne ciasto.'?",
        options: ['babcia', 'piecze', 'smaczne', 'ciasto'],
        answer: 'smaczne',
      },
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Gruby kot śpi na fotelu.'?",
        options: ['gruby', 'kot', 'śpi', 'fotelu'],
        answer: 'gruby',
      },
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Chłopiec rysuje kolorowy obrazek.'?",
        options: ['chłopiec', 'rysuje', 'kolorowy', 'obrazek'],
        answer: 'kolorowy',
      },
      {
        prompt: "Co jest okolicznikiem w zdaniu: 'Piotr wraca ze szkoły.'?",
        options: ['Piotr', 'wraca', 'ze szkoły', 'szkoły'],
        answer: 'ze szkoły',
      },
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Ładna dziewczyna śpiewa piosenkę.'?",
        options: ['ładna', 'dziewczyna', 'śpiewa', 'piosenkę'],
        answer: 'ładna',
      },
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Mama gotuje pyszną zupę.'?",
        options: ['mama', 'gotuje', 'pyszną', 'zupę'],
        answer: 'pyszną',
      },
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Tomek rzuca okrągłą piłkę.'?",
        options: ['Tomek', 'rzuca', 'okrągłą', 'piłkę'],
        answer: 'okrągłą',
      },
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Drobny deszcz pada od rana.'?",
        options: ['drobny', 'deszcz', 'pada', 'od rana'],
        answer: 'drobny',
      },
      {
        prompt: "Które słowo jest podmiotem w zdaniu: 'Biały kot pije mleko.'?",
        options: ['biały', 'kot', 'pije', 'mleko'],
        answer: 'kot',
      },
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Nasz pies biegnie szybko.'?",
        options: ['nasz', 'pies', 'biegnie', 'szybko'],
        answer: 'nasz',
      },
      {
        prompt: "Które słowo jest przydawką w zdaniu: 'Młody nauczyciel pisze lekcję.'?",
        options: ['młody', 'nauczyciel', 'pisze', 'lekcję'],
        answer: 'młody',
      },
    ],
  },

  // ============================================
  // Poziom 5 — Wszystkie 5 części — utrwalenie
  // ============================================
  {
    n: 5,
    title: 'Wszystkie 5 części — utrwalenie',
    description: 'Różne zdania — każde słowo może być dowolną częścią zdania',
    questions: [
      {
        prompt: "W zdaniu 'Mała Ania czyta ciekawą książkę w parku.' czym jest słowo 'mała'?",
        options: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'przydawką'],
        answer: 'przydawką',
      },
      {
        prompt: "W zdaniu 'Wczoraj nauczyciel tłumaczył nową lekcję.' czym jest słowo 'wczoraj'?",
        options: ['podmiotem', 'okolicznikiem', 'dopełnieniem', 'przydawką'],
        answer: 'okolicznikiem',
      },
      {
        prompt: "W zdaniu 'Tata kupił synowi nowy rower.' czym jest słowo 'tata'?",
        options: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'przydawką'],
        answer: 'podmiotem',
      },
      {
        prompt: "W zdaniu 'Stary dziadek opowiadał wnukom bajki.' czym jest słowo 'opowiadał'?",
        options: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'okolicznikiem'],
        answer: 'orzeczeniem',
      },
      {
        prompt: "W zdaniu 'Rano babcia piekła smaczne ciasto.' czym jest słowo 'smaczne'?",
        options: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'przydawką'],
        answer: 'przydawką',
      },
      {
        prompt: "W zdaniu 'Piękne kwiaty rosną w ogrodzie.' czym jest wyrażenie 'w ogrodzie'?",
        options: ['podmiotem', 'orzeczeniem', 'okolicznikiem', 'przydawką'],
        answer: 'okolicznikiem',
      },
      {
        prompt: "W zdaniu 'Młoda dziewczynka szyła sukienkę dla lalki.' czym jest słowo 'sukienkę'?",
        options: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'okolicznikiem'],
        answer: 'dopełnieniem',
      },
      {
        prompt: "W zdaniu 'Mądry uczeń rozwiązał trudne zadanie szybko.' czym jest słowo 'szybko'?",
        options: ['podmiotem', 'okolicznikiem', 'dopełnieniem', 'przydawką'],
        answer: 'okolicznikiem',
      },
      {
        prompt: "W zdaniu 'Wczoraj mój brat zbudował wielki zamek z piasku.' czym jest słowo 'wielki'?",
        options: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'przydawką'],
        answer: 'przydawką',
      },
      {
        prompt: "W zdaniu 'Rano pies biegał po zielonej łące.' czym jest słowo 'pies'?",
        options: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'okolicznikiem'],
        answer: 'podmiotem',
      },
      {
        prompt: "W zdaniu 'Mama gotuje pyszną zupę w kuchni.' czym jest słowo 'zupę'?",
        options: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'okolicznikiem'],
        answer: 'dopełnieniem',
      },
      {
        prompt: "W zdaniu 'Duży pies gonił przestraszonego kota.' czym jest słowo 'duży'?",
        options: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'przydawką'],
        answer: 'przydawką',
      },
      {
        prompt: "W zdaniu 'Ania napisała długi list do babci.' czym jest słowo 'napisała'?",
        options: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'przydawką'],
        answer: 'orzeczeniem',
      },
      {
        prompt: "W zdaniu 'Gruby kot pił białe mleko z miski.' czym jest wyrażenie 'z miski'?",
        options: ['podmiotem', 'orzeczeniem', 'przydawką', 'okolicznikiem'],
        answer: 'okolicznikiem',
      },
      {
        prompt: "W zdaniu 'Młodzi uczniowie czytali ciekawą historię wieczorem.' czym jest słowo 'wieczorem'?",
        options: ['podmiotem', 'przydawką', 'dopełnieniem', 'okolicznikiem'],
        answer: 'okolicznikiem',
      },
      {
        prompt: "W zdaniu 'Słodkie jabłka rosną na wysokich drzewach.' czym jest słowo 'słodkie'?",
        options: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'przydawką'],
        answer: 'przydawką',
      },
      {
        prompt: "W zdaniu 'Tomek jeździł na rowerze po parku.' czym jest wyrażenie 'po parku'?",
        options: ['dopełnieniem', 'podmiotem', 'orzeczeniem', 'okolicznikiem'],
        answer: 'okolicznikiem',
      },
      {
        prompt: "W zdaniu 'Zmęczona mama piła gorącą kawę wieczorem.' czym jest słowo 'kawę'?",
        options: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'okolicznikiem'],
        answer: 'dopełnieniem',
      },
      {
        prompt: "W zdaniu 'Mały chłopiec rzucił piłkę daleko.' czym jest słowo 'daleko'?",
        options: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'okolicznikiem'],
        answer: 'okolicznikiem',
      },
      {
        prompt: "W zdaniu 'Nasza babcia piecze pyszne ciasto na niedzielę.' czym jest słowo 'nasza'?",
        options: ['podmiotem', 'orzeczeniem', 'dopełnieniem', 'przydawką'],
        answer: 'przydawką',
      },
    ],
  },

  // ============================================
  // Poziom 6 — Pytania pomocnicze
  // ============================================
  {
    n: 6,
    title: 'Pytania pomocnicze',
    description: 'Dopasowanie części zdania do pytań, na które odpowiada',
    questions: [
      {
        prompt: 'Na jakie pytania odpowiada podmiot?',
        options: ['kto? co?', 'co robi? co się z nim dzieje?', 'jaki? który? czyj?', 'gdzie? kiedy? jak?'],
        answer: 'kto? co?',
      },
      {
        prompt: 'Na jakie pytania odpowiada orzeczenie?',
        options: ['kto? co?', 'co robi? co się z nim dzieje?', 'jaki? który? czyj?', 'kogo? czego?'],
        answer: 'co robi? co się z nim dzieje?',
      },
      {
        prompt: 'Na jakie pytania odpowiada przydawka?',
        options: ['kto? co?', 'co robi?', 'jaki? który? czyj? ile?', 'gdzie? kiedy? jak?'],
        answer: 'jaki? który? czyj? ile?',
      },
      {
        prompt: 'Na jakie pytania odpowiada okolicznik?',
        options: ['kto? co?', 'co robi?', 'jaki? który?', 'gdzie? kiedy? jak? dlaczego?'],
        answer: 'gdzie? kiedy? jak? dlaczego?',
      },
      {
        prompt: 'Które pytania to typowe pytania dopełnienia?',
        options: ['kto? co?', 'kogo? czego? komu? czemu?', 'jaki? który?', 'gdzie? kiedy?'],
        answer: 'kogo? czego? komu? czemu?',
      },
      {
        prompt: "Na jakie pytanie odpowiada słowo 'szybko' w zdaniu 'Ania biegnie szybko.'?",
        options: ['kto?', 'co robi?', 'jak?', 'jaki?'],
        answer: 'jak?',
      },
      {
        prompt: "Na jakie pytanie odpowiada słowo 'wczoraj' w zdaniu 'Wczoraj padał deszcz.'?",
        options: ['kto?', 'co?', 'kiedy?', 'dlaczego?'],
        answer: 'kiedy?',
      },
      {
        prompt: "Na jakie pytanie odpowiada słowo 'czerwony' w zdaniu 'Czerwony samochód stoi.'?",
        options: ['kto?', 'co robi?', 'gdzie?', 'jaki?'],
        answer: 'jaki?',
      },
      {
        prompt: "Na jakie pytanie odpowiada słowo 'list' w zdaniu 'Ania pisze list.'?",
        options: ['kto?', 'co?', 'jak?', 'gdzie?'],
        answer: 'co?',
      },
      {
        prompt: "Na jakie pytanie odpowiada wyrażenie 'w parku' w zdaniu 'Dzieci bawią się w parku.'?",
        options: ['kto?', 'co robi?', 'gdzie?', 'jak?'],
        answer: 'gdzie?',
      },
      {
        prompt: "Słowo, które odpowiada na pytanie 'kto?' lub 'co?', to najczęściej:",
        options: ['podmiot', 'orzeczenie', 'przydawka', 'okolicznik'],
        answer: 'podmiot',
      },
      {
        prompt: "Słowo, które odpowiada na pytanie 'jaki?', to:",
        options: ['podmiot', 'orzeczenie', 'przydawka', 'okolicznik'],
        answer: 'przydawka',
      },
      {
        prompt: "Słowo, które odpowiada na pytanie 'dlaczego?', to:",
        options: ['podmiot', 'orzeczenie', 'dopełnienie', 'okolicznik'],
        answer: 'okolicznik',
      },
      {
        prompt: "Słowo, które odpowiada na pytanie 'co robi?', to:",
        options: ['podmiot', 'orzeczenie', 'przydawka', 'dopełnienie'],
        answer: 'orzeczenie',
      },
      {
        prompt: "Słowo odpowiadające na pytania 'kogo? czego? komu?' (inne niż podmiot) to:",
        options: ['podmiot', 'orzeczenie', 'dopełnienie', 'okolicznik'],
        answer: 'dopełnienie',
      },
      {
        prompt: "Na jakie pytanie odpowiada wyrażenie 'z powodu bólu' w zdaniu 'Została w domu z powodu bólu.'?",
        options: ['kiedy?', 'gdzie?', 'dlaczego?', 'jak?'],
        answer: 'dlaczego?',
      },
      {
        prompt: "Na jakie pytanie odpowiada słowo 'dwie' w zdaniu 'Dwie dziewczynki tańczą.'?",
        options: ['kto?', 'co robi?', 'ile?', 'jak?'],
        answer: 'ile?',
      },
      {
        prompt: "Na jakie pytanie odpowiada słowo 'mojego' w zdaniu 'To jest dom mojego brata.'?",
        options: ['kto?', 'co robi?', 'gdzie?', 'czyj?'],
        answer: 'czyj?',
      },
      {
        prompt: "Słowo, które odpowiada na pytanie 'gdzie?', to:",
        options: ['podmiot', 'orzeczenie', 'dopełnienie', 'okolicznik'],
        answer: 'okolicznik',
      },
      {
        prompt: "Na jakie pytanie odpowiada słowo 'siostrze' w zdaniu 'Dał siostrze prezent.'?",
        options: ['kto?', 'co?', 'komu?', 'jaki?'],
        answer: 'komu?',
      },
    ],
  },

  // ============================================
  // Poziom 7 — Rodzaje okolicznika i przydawki
  // ============================================
  {
    n: 7,
    title: 'Rodzaje okolicznika i przydawki',
    description: 'Okolicznik miejsca / czasu / sposobu / przyczyny / celu / stopnia; przydawka przymiotna / rzeczowna / liczebna / zaimkowa',
    questions: [
      {
        prompt: "Wyrażenie 'w parku' w zdaniu 'Dzieci bawią się w parku.' to okolicznik...",
        options: ['czasu', 'miejsca', 'sposobu', 'celu'],
        answer: 'miejsca',
      },
      {
        prompt: "Słowo 'wczoraj' w zdaniu 'Wczoraj padał deszcz.' to okolicznik...",
        options: ['czasu', 'miejsca', 'sposobu', 'przyczyny'],
        answer: 'czasu',
      },
      {
        prompt: "Słowo 'szybko' w zdaniu 'Ania biegnie szybko.' to okolicznik...",
        options: ['czasu', 'miejsca', 'sposobu', 'celu'],
        answer: 'sposobu',
      },
      {
        prompt: "Wyrażenie 'z powodu deszczu' w zdaniu 'Został w domu z powodu deszczu.' to okolicznik...",
        options: ['czasu', 'miejsca', 'sposobu', 'przyczyny'],
        answer: 'przyczyny',
      },
      {
        prompt: "Wyrażenie 'po zakupy' w zdaniu 'Poszła do sklepu po zakupy.' to okolicznik...",
        options: ['czasu', 'miejsca', 'sposobu', 'celu'],
        answer: 'celu',
      },
      {
        prompt: "Wyrażenie 'w lesie' w zdaniu 'Grzyby rosną w lesie.' to okolicznik...",
        options: ['czasu', 'miejsca', 'sposobu', 'celu'],
        answer: 'miejsca',
      },
      {
        prompt: "Słowo 'rano' w zdaniu 'Rano pije kawę.' to okolicznik...",
        options: ['czasu', 'miejsca', 'sposobu', 'celu'],
        answer: 'czasu',
      },
      {
        prompt: "Słowo 'cicho' w zdaniu 'Mówił cicho.' to okolicznik...",
        options: ['czasu', 'miejsca', 'sposobu', 'celu'],
        answer: 'sposobu',
      },
      {
        prompt: "Wyrażenie 'z powodu choroby' w zdaniu 'Nie przyszedł z powodu choroby.' to okolicznik...",
        options: ['czasu', 'miejsca', 'przyczyny', 'celu'],
        answer: 'przyczyny',
      },
      {
        prompt: "Wyrażenie 'po chleb' w zdaniu 'Idę do sklepu po chleb.' to okolicznik...",
        options: ['miejsca', 'czasu', 'celu', 'sposobu'],
        answer: 'celu',
      },
      {
        prompt: "Słowo 'czerwony' w zdaniu 'Czerwony samochód jedzie.' to przydawka...",
        options: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'],
        answer: 'przymiotna',
      },
      {
        prompt: "Słowo 'brata' w zdaniu 'To jest książka brata.' to przydawka...",
        options: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'],
        answer: 'rzeczowna',
      },
      {
        prompt: "Słowo 'trzy' w zdaniu 'Trzy koty siedzą na płocie.' to przydawka...",
        options: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'],
        answer: 'liczebna',
      },
      {
        prompt: "Słowo 'moja' w zdaniu 'Moja siostra gra na pianinie.' to przydawka...",
        options: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'],
        answer: 'zaimkowa',
      },
      {
        prompt: "Słowo 'zielone' w zdaniu 'Zielone liście spadają.' to przydawka...",
        options: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'],
        answer: 'przymiotna',
      },
      {
        prompt: "Słowo 'pięciu' w zdaniu 'Pięciu chłopców gra w piłkę.' to przydawka...",
        options: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'],
        answer: 'liczebna',
      },
      {
        prompt: "Słowo 'mamy' w zdaniu 'To jest torebka mamy.' to przydawka...",
        options: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'],
        answer: 'rzeczowna',
      },
      {
        prompt: "Słowo 'twój' w zdaniu 'Twój pies szczeka.' to przydawka...",
        options: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'],
        answer: 'zaimkowa',
      },
      {
        prompt: "Słowo 'bardzo' w zdaniu 'Jest bardzo wysoki.' to okolicznik...",
        options: ['czasu', 'miejsca', 'sposobu', 'stopnia'],
        answer: 'stopnia',
      },
      {
        prompt: "Słowo 'piękne' w zdaniu 'Piękne kwiaty pachną.' to przydawka...",
        options: ['przymiotna', 'rzeczowna', 'liczebna', 'zaimkowa'],
        answer: 'przymiotna',
      },
    ],
  },

  // ============================================
  // Poziom 8 — Zdania złożone i trudne przypadki
  // ============================================
  {
    n: 8,
    title: 'Zdania złożone i trudne przypadki',
    description: 'Orzeczenie złożone (imienne, modalne, fazowe), podmiot domyślny i szeregowy, dopełnienie bliższe vs dalsze',
    questions: [
      {
        prompt: "W zdaniu 'Jutro będziemy musieli pójść do lekarza.' orzeczenie 'będziemy musieli pójść' to orzeczenie...",
        options: ['proste', 'złożone imienne', 'złożone modalne', 'złożone fazowe'],
        answer: 'złożone modalne',
      },
      {
        prompt: "W zdaniu 'Ania jest nauczycielką.' orzeczenie 'jest nauczycielką' to orzeczenie...",
        options: ['proste', 'złożone imienne', 'złożone modalne', 'złożone fazowe'],
        answer: 'złożone imienne',
      },
      {
        prompt: "W zdaniu 'Zaczął pisać list.' orzeczenie 'zaczął pisać' to orzeczenie...",
        options: ['proste', 'złożone imienne', 'złożone modalne', 'złożone fazowe'],
        answer: 'złożone fazowe',
      },
      {
        prompt: "W zdaniu 'Idę do szkoły.' podmiot jest...",
        options: ['gramatyczny', 'logiczny', 'domyślny (ukryty)', 'szeregowy'],
        answer: 'domyślny (ukryty)',
      },
      {
        prompt: "W zdaniu 'Ania i Kasia bawią się razem.' podmiot 'Ania i Kasia' to podmiot...",
        options: ['gramatyczny', 'logiczny', 'domyślny', 'szeregowy'],
        answer: 'szeregowy',
      },
      {
        prompt: "W zdaniu 'Brakuje mi czasu.' podmiot 'czasu' to podmiot...",
        options: ['gramatyczny', 'logiczny (dopełniaczowy)', 'domyślny', 'szeregowy'],
        answer: 'logiczny (dopełniaczowy)',
      },
      {
        prompt: "W zdaniu 'Pisze list.' dopełnienie 'list' to dopełnienie...",
        options: ['bliższe', 'dalsze', 'przydawkowe', 'okoliczne'],
        answer: 'bliższe',
      },
      {
        prompt: "W zdaniu 'Dałem bratu prezent.' dopełnienie 'bratu' to dopełnienie...",
        options: ['bliższe', 'dalsze', 'przydawkowe', 'okoliczne'],
        answer: 'dalsze',
      },
      {
        prompt: "W zdaniu 'Nie lubię kawy.' dopełnienie 'kawy' to...",
        options: ['bliższe (dopełniacz w przeczeniu)', 'dalsze', 'okolicznik', 'przydawka'],
        answer: 'bliższe (dopełniacz w przeczeniu)',
      },
      {
        prompt: 'Wskaż zdanie z podmiotem domyślnym:',
        options: [
          'Ania czyta książkę.',
          'Pisze list do babci.',
          'Mój brat śpi.',
          'Dzieci bawią się.',
        ],
        answer: 'Pisze list do babci.',
      },
      {
        prompt: 'Wskaż zdanie z orzeczeniem imiennym:',
        options: ['Biegnie szybko.', 'Zaczął pisać.', 'Jest lekarzem.', 'Musi iść.'],
        answer: 'Jest lekarzem.',
      },
      {
        prompt: 'Wskaż zdanie z orzeczeniem modalnym:',
        options: ['Pływa dobrze.', 'Kończy pracę.', 'Musi się uczyć.', 'Jest miły.'],
        answer: 'Musi się uczyć.',
      },
      {
        prompt: "W zdaniu 'Bardzo miły starszy pan rozmawiał z sąsiadem.' słowo 'starszy' jest...",
        options: ['podmiotem', 'okolicznikiem', 'przydawką', 'dopełnieniem'],
        answer: 'przydawką',
      },
      {
        prompt: "W zdaniu 'Wczoraj wieczorem poszliśmy do kina.' drugim okolicznikiem czasu (obok 'wczoraj') jest:",
        options: ['wieczorem', 'do kina', 'poszliśmy', 'nie ma drugiego okolicznika czasu'],
        answer: 'wieczorem',
      },
      {
        prompt: "W zdaniu 'Zawsze chce pić po meczu.' 'chce pić' to orzeczenie...",
        options: ['proste', 'złożone imienne', 'złożone modalne', 'złożone fazowe'],
        answer: 'złożone modalne',
      },
      {
        prompt: "W zdaniu 'Mój starszy brat był kiedyś doskonałym sportowcem.' słowo 'sportowcem' jest...",
        options: [
          'podmiotem',
          'częścią orzeczenia imiennego',
          'dopełnieniem',
          'przydawką',
        ],
        answer: 'częścią orzeczenia imiennego',
      },
      {
        prompt: "W zdaniu 'Zakończyła czytać książkę.' 'zakończyła czytać' to orzeczenie...",
        options: ['proste', 'złożone imienne', 'złożone modalne', 'złożone fazowe'],
        answer: 'złożone fazowe',
      },
      {
        prompt: "W zdaniu 'Ania dała siostrze książkę.' słowo 'siostrze' jest dopełnieniem...",
        options: ['bliższym', 'dalszym', 'okolicznym', 'przydawkowym'],
        answer: 'dalszym',
      },
      {
        prompt: "W zdaniu 'Piją kawę.' podmiot jest...",
        options: ["gramatyczny ('kawę')", 'logiczny', 'domyślny', 'szeregowy'],
        answer: 'domyślny',
      },
      {
        prompt: "W zdaniu 'Nie widziałem filmu.' słowo 'filmu' jest dopełnieniem...",
        options: [
          'bliższym (dopełniacz w przeczeniu)',
          'dalszym',
          'okolicznym',
          'przydawkowym',
        ],
        answer: 'bliższym (dopełniacz w przeczeniu)',
      },
    ],
  },
];

async function main() {
  console.log('🌱 Seeding sentence parts modules...');

  // Remove any existing "Części zdania" modules so re-runs are idempotent.
  const existing = await prisma.module.findMany({
    select: { id: true, title: true },
  });
  const toDelete = existing
    .filter((m: { id: string; title: unknown }) => {
      const t = m.title as { pl?: string } | null;
      return typeof t?.pl === 'string' && t.pl.startsWith('Części zdania');
    })
    .map((m: { id: string }) => m.id);

  if (toDelete.length > 0) {
    await prisma.module.deleteMany({ where: { id: { in: toDelete } } });
    console.log(`🗑️  Removed ${toDelete.length} existing sentence-parts modules`);
  }

  // Iterate in reverse so level 1 ends up with the latest createdAt and
  // appears first on the home page (orderBy createdAt desc).
  for (const level of [...levels].reverse()) {
    const fullTitle = `Części zdania — poziom ${level.n}: ${level.title}`;
    const mod = await prisma.module.create({
      data: {
        title: { pl: fullTitle },
        description: { pl: level.description },
        subject: 'LANGUAGE',
        languages: ['pl'],
        items: {
          create: level.questions.map((q) => ({
            type: 'SINGLE_CHOICE',
            content: {
              prompt: { pl: q.prompt },
              options: { pl: q.options },
              answer: { pl: q.answer },
            },
          })),
        },
      },
      include: { _count: { select: { items: true } } },
    });
    console.log(`✅ Level ${level.n}: ${fullTitle} (${mod._count.items} items)`);
  }

  console.log('🌱 Sentence parts seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error during seed:');
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
