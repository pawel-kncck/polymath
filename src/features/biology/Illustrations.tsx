import { useId } from "react";
import { GeoIcon } from "../geography/Illustrations";

export function BioIcon({ name, size = 24 }: { name: string; size?: number }) {
  const paths: Record<string, string> = {
    leaf: "M5 20C2 9 9 3 21 3c0 12-6 19-16 17Zm0 0L17 7M10 15v-5m0 5h5",
    flask: "M9 3h6m-5 0v7L4 20q0 1 2 1h12q2 0 2-1l-6-10V3M7 16h10",
    microscope: "m9 3 6 3-4 8-6-3 4-8Zm4 8c8 0 8 10 0 10H4m3-5h7M17 7l2 1",
    molecule:
      "M6 7l6 6 7-7m-7 7 5 7M3 4h6v6H3ZM16 3h6v6h-6ZM9 10h6v6H9ZM14 17h6v6h-6Z",
    cell: "M22 12c0 6-6 10-12 9S1 14 3 8 12 1 18 4s4 5 4 8ZM9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z",
  };
  if (!paths[name]) return <GeoIcon name={name} size={size} />;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
export const CELL_PARTS = [
  [
    "Błona komórkowa",
    "Oddziela wnętrze komórki od otoczenia i kontroluje wymianę substancji.",
  ],
  [
    "Cytozol",
    "Półpłynna substancja wypełniająca wnętrze komórki. Zachodzi w niej wiele reakcji.",
  ],
  [
    "Jądro komórkowe",
    "Zawiera większość DNA komórki zwierzęcej. Informacja ta pomaga kierować jej działaniem.",
  ],
  [
    "Mitochondrium",
    "Uczestniczy w oddychaniu komórkowym, dzięki któremu uwalniana jest energia przydatna komórce.",
  ],
  [
    "Rybosomy",
    "Małe struktury, w których powstają białka. Nie otacza ich błona.",
  ],
  ["Aparat Golgiego", "Modyfikuje, sortuje i pakuje substancje do transportu."],
  [
    "Pęcherzyk",
    "Mały woreczek otoczony błoną, który może przenosić lub przechowywać substancje.",
  ],
];
export function CellDiagram({
  selected = -1,
  question = false,
}: {
  selected?: number;
  question?: boolean;
}) {
  const id = useId();
  const opacity = (n: number) => (selected < 0 || selected === n ? 1 : 0.3);
  return (
    <svg
      viewBox="0 0 580 400"
      role="img"
      aria-label={
        question
          ? "Schemat komórki zwierzęcej. Litera A wskazuje owalną strukturę z pofałdowaną błoną wewnętrzną."
          : "Schemat komórki zwierzęcej z jądrem, mitochondriami i pozostałymi strukturami"
      }
    >
      <defs>
        <radialGradient id={id}>
          <stop stopColor="#f9eedb" />
          <stop offset="1" stopColor="#edd4bd" />
        </radialGradient>
      </defs>
      <ellipse cx="294" cy="350" rx="215" ry="19" fill="#183f3410" />
      <path
        d="M63 184C40 85 151 33 282 47s223 28 237 139-66 158-203 154S91 309 63 184Z"
        fill={`url(#${id})`}
        stroke={selected === 0 ? "#a44a4c" : "#c58878"}
        strokeWidth={selected === 0 ? 9 : 5}
      />
      <g opacity={opacity(1)} fill="#d5b6a1">
        {Array.from({ length: 32 }, (_, i) => (
          <circle
            key={i}
            cx={100 + ((i * 83) % 370)}
            cy={91 + ((i * 47) % 205)}
            r="2"
          />
        ))}
      </g>
      <g opacity={opacity(2)}>
        <ellipse
          cx="272"
          cy="185"
          rx="75"
          ry="65"
          fill="#ad9bbf"
          stroke="#75658b"
          strokeWidth="3"
        />
        <ellipse cx="277" cy="180" rx="60" ry="53" fill="#c6b5d2" />
        <path
          d="M240 160q40-25 51 20t-42 25m2-70q-15 45 42 69"
          fill="none"
          stroke="#8b769c"
          strokeWidth="3"
        />
        <circle cx="292" cy="182" r="19" fill="#7e638d" />
      </g>
      <g opacity={opacity(3)} fill="#d89165" stroke="#ad654a" strokeWidth="3">
        {[
          [143, 144, -25],
          [387, 260, 20],
          [405, 119, -20],
        ].map(([x, y, r], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
            <rect x="-38" y="-17" width="76" height="34" rx="17" />
            <path d="M-24 0l9-10 8 19 9-18 8 18 9-10" fill="none" />
          </g>
        ))}
      </g>
      <g opacity={opacity(4)} fill="#725c80">
        {Array.from({ length: 18 }, (_, i) => (
          <circle
            key={i}
            cx={130 + ((i * 57) % 300)}
            cy={220 + ((i * 17) % 78)}
            r="3.5"
          />
        ))}
      </g>
      <g
        opacity={opacity(5)}
        fill="none"
        stroke="#699b8b"
        strokeWidth="9"
        strokeLinecap="round"
      >
        <path d="M115 224q27-43 60-15M112 241q32-46 65-17M116 257q34-41 63-18" />
      </g>
      <g opacity={opacity(6)} fill="#acd1be" stroke="#619480" strokeWidth="2">
        <circle cx="375" cy="187" r="15" />
        <circle cx="186" cy="95" r="11" />
        <circle cx="453" cy="208" r="12" />
      </g>
      {question && (
        <g>
          <path d="m430 265 60 28" stroke="#384b41" strokeWidth="2" />
          <circle cx="505" cy="298" r="19" fill="#294c41" />
          <text x="505" y="304" textAnchor="middle" fill="white" fontSize="18">
            A
          </text>
        </g>
      )}
      <text x="290" y="386" textAnchor="middle" fill="#6e766e" fontSize="13">
        SCHEMAT · KOLORY UMOWNE · BEZ SKALI
      </text>
    </svg>
  );
}
export function MicroscopeDrawing() {
  return (
    <svg
      viewBox="0 0 300 340"
      role="img"
      aria-label="Mikroskop optyczny: okular u góry, obiektywy nad stolikiem, oświetlenie pod preparatem"
    >
      <ellipse cx="153" cy="316" rx="106" ry="12" fill="#243f3420" />
      <path
        d="M186 80C263 112 242 249 192 285H124V259h47c44-43 48-103 3-128Z"
        fill="#73928a"
        stroke="#355b50"
        strokeWidth="3"
      />
      <path
        d="m124 28 54 24-43 94-54-24Z"
        fill="#e8dfcb"
        stroke="#526d61"
        strokeWidth="3"
      />
      <path d="m131 17 55 25-8 18-55-25Z" fill="#354e45" />
      <path d="m82 122 53 24-12 22-53-24Z" fill="#c1a878" />
      <path d="m87 145-12 30 16 7 13-30m15 8 1 23 17-1-2-24" fill="#48655c" />
      <rect x="58" y="192" width="131" height="13" rx="3" fill="#354e45" />
      <rect x="85" y="185" width="60" height="6" fill="#b9d9cb" />
      <circle
        cx="199"
        cy="176"
        r="23"
        fill="#c2b79e"
        stroke="#354e45"
        strokeWidth="5"
      />
      <circle cx="199" cy="176" r="9" fill="#354e45" />
      <path d="m99 265 9-28h37l10 28" fill="#ddc68f" />
      <path
        d="M75 285h130l28 24H51Z"
        fill="#56786c"
        stroke="#355b50"
        strokeWidth="3"
      />
      <path d="M123 230v-21" stroke="#e9c55f" strokeWidth="6" />
    </svg>
  );
}
export function BiologyHero() {
  return (
    <svg
      viewBox="0 0 620 470"
      role="img"
      aria-label="Ilustrowany notatnik przyrodnika z komórką, mikroskopem i gałązką"
    >
      <rect x="55" y="22" width="510" height="421" rx="160" fill="#e8e8d9" />
      <g transform="translate(127 40) rotate(9 200 200)">
        <rect width="363" height="352" rx="9" fill="#faf7ee" stroke="#d8d4c2" />
        {Array.from({ length: 13 }, (_, i) => (
          <path key={i} d={`M20 ${40 + i * 23}h320`} stroke="#e3e6db" />
        ))}
        <text x="28" y="35" fill="#6f7867" fontSize="12" letterSpacing="3">
          NOTATKI Z MIKROŚWIATA
        </text>
        <g transform="translate(-38 37) scale(.73)">
          <CellDiagram />
        </g>
      </g>
      <g transform="translate(16 174) scale(.69)">
        <MicroscopeDrawing />
      </g>
      <g stroke="#557b55" fill="#8ba57b" strokeWidth="3">
        <path d="M523 407q-31-102 18-211" fill="none" />
        <path d="M519 345q-64-2-49-57 44 14 49 57m5-50q57-4 52-58-44 11-52 58m5-59q-46-17-26-59 34 18 26 59" />
      </g>
      <circle cx="484" cy="80" r="34" fill="#d5b46c" />
      <text x="484" y="86" textAnchor="middle" fill="#fffaf0" fontSize="18">
        ×400
      </text>
      <text
        x="299"
        y="438"
        textAnchor="middle"
        fontSize="12"
        letterSpacing="3"
        fill="#607061"
      >
        MAŁE STRUKTURY. WIELKIE ODKRYCIA.
      </text>
    </svg>
  );
}
export function QuestionIllustration({
  kind,
}: {
  kind: "cell" | "microscope" | "levels";
}) {
  return kind === "cell" ? (
    <CellDiagram question />
  ) : kind === "microscope" ? (
    <div className="bio-question-micro">
      <MicroscopeDrawing />
      <p>
        Okular <strong>10×</strong>
        <br />
        Obiektyw <strong>40×</strong>
      </p>
    </div>
  ) : (
    <div className="bio-level-strip">
      Komórka → tkanka → <strong>serce</strong> → układ narządów → organizm
    </div>
  );
}
