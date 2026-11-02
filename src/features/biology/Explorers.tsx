"use client";
import { useId, useState } from "react";
import type { MissionId } from "./content";
import { CELL_PARTS, CellDiagram, MicroscopeDrawing } from "./Illustrations";
import { microscopePower, waterExperiment } from "./model";

const LEVELS = [
  [
    "Komórka",
    "Komórka mięśniowa",
    "Podstawowa jednostka budowy i funkcjonowania organizmu. Potrafi się kurczyć.",
  ],
  [
    "Tkanka",
    "Tkanka mięśniowa",
    "Zespół komórek o podobnej budowie, które współpracują przy wykonywaniu określonych zadań.",
  ],
  [
    "Narząd",
    "Serce",
    "Narząd zbudowany z różnych tkanek. Skurcze serca wprawiają krew w ruch.",
  ],
  [
    "Układ narządów",
    "Układ krwionośny",
    "Serce i naczynia krwionośne współpracują, transportując krew w organizmie.",
  ],
  [
    "Organizm",
    "Człowiek",
    "Wiele układów narządów współpracuje, tworząc jeden organizm.",
  ],
];
function Levels() {
  const [level, setLevel] = useState(0);
  return (
    <div className="bio-activity">
      <div className="bio-levels">
        {LEVELS.map(([label], i) => (
          <button
            key={label}
            aria-pressed={level === i}
            onClick={() => setLevel(i)}
          >
            <span>0{i + 1}</span>
            {label}
          </button>
        ))}
      </div>
      <div className="bio-two-col">
        <svg
          viewBox="0 0 420 270"
          role="img"
          aria-label={`Schemat: ${LEVELS[level][1]}`}
        >
          <rect
            x="20"
            y="20"
            width="380"
            height="230"
            rx="100"
            fill="#ece7da"
          />
          {level < 2 ? (
            <g fill="#cd8f8c" stroke="#a3646b" strokeWidth="3">
              {Array.from({ length: level === 0 ? 1 : 6 }, (_, i) => (
                <g
                  key={i}
                  transform={`translate(65 ${level === 0 ? 100 : 48 + i * 29})`}
                >
                  <path d="M0 26Q120-21 290 26Q130 68 0 26Z" />
                  <ellipse cx="144" cy="26" rx="16" ry="7" fill="#82637f" />
                </g>
              ))}
            </g>
          ) : level === 2 ? (
            <g>
              <path
                d="M210 215C58 124 128 45 180 81l30 28 26-35c72-44 129 70-26 141Z"
                fill="#bc7378"
                stroke="#94565e"
                strokeWidth="4"
              />
              <path
                d="m208 151-18-68 15-37m16 93 32-72"
                stroke="#617d93"
                strokeWidth="18"
                fill="none"
              />
            </g>
          ) : (
            <g fill="#c7c4aa" stroke="#6c8979" strokeWidth="4">
              <circle cx="210" cy="60" r="24" />
              <path d="M182 91h56l39 74-16 9-27-47v54l16 58h-22l-18-48-18 48h-22l16-58v-54l-27 47-16-9Z" />
              {level === 3 && (
                <g fill="none" stroke="#b66770" strokeWidth="4">
                  <path d="M212 120v66m0-45-44 21m44-21 44 21m-44 19-24 65m24-65 24 65" />
                  <circle cx="216" cy="118" r="8" fill="#b66770" />
                </g>
              )}
            </g>
          )}
          <text
            x="210"
            y="265"
            textAnchor="middle"
            fill="#687367"
            fontSize="11"
          >
            SCHEMAT · BEZ SKALI
          </text>
        </svg>
        <div aria-live="polite">
          <span className="geo-eyebrow">POZIOM {level + 1} / 5</span>
          <h3>{LEVELS[level][1]}</h3>
          <p>{LEVELS[level][2]}</p>
          <p className="geo-note">
            Ten ciąg opisuje organizm wielokomórkowy. Jedna komórka drożdży jest
            już całym organizmem!
          </p>
          <button
            className="geo-button secondary"
            onClick={() => setLevel((level + 1) % 5)}
          >
            Kolejny poziom →
          </button>
        </div>
      </div>
    </div>
  );
}
function Seeds({ wet }: { wet: boolean }) {
  return (
    <svg
      viewBox="0 0 320 140"
      role="img"
      aria-label={
        wet
          ? "Przykładowy wynik: 7 z 8 nasion wykiełkowało"
          : "Przykładowy wynik: 0 z 8 nasion wykiełkowało"
      }
    >
      <ellipse cx="160" cy="107" rx="145" ry="24" fill="#cbbf9b" />
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} transform={`translate(${40 + i * 34} ${101 + (i % 2) * 6})`}>
          <ellipse rx="9" ry="6" fill="#ae7856" />
          {wet && i < 7 && (
            <g stroke="#547b52" fill="#95af73" strokeWidth="2">
              <path d={`M0 0q-5-18 0-${30 + (i % 3) * 9}`} fill="none" />
              <path d="M-1-23q-22 0-15-15 17 1 15 15m0-8q18 0 14-15-15 0-14 15" />
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
function Experiment() {
  const [water, setWater] = useState(false),
    [light, setLight] = useState(true),
    [temperature, setTemperature] = useState(true),
    [run, setRun] = useState(false);
  const result = waterExperiment(water, light, temperature);
  return (
    <div className="bio-activity">
      <p className="bio-lead">
        Pytanie: czy nasiona fasoli potrzebują wody do kiełkowania? Porównaj
        dwie próby po 8 nasion tego samego gatunku.
      </p>
      <div className="bio-two-col">
        <div className="bio-specimen">
          <span className="geo-eyebrow">A · PRÓBA KONTROLNA</span>
          <h3>Warunki zwykłe</h3>
          <p>Woda · światło · 20°C · dostęp powietrza</p>
          {run && result.valid ? (
            <Seeds wet />
          ) : (
            <div className="bio-seed-placeholder">8 nasion na podłożu</div>
          )}
        </div>
        <div className="bio-specimen">
          <span className="geo-eyebrow">B · PRÓBA BADAWCZA</span>
          <h3>Wybierz warunki</h3>
          {[
            [water, setWater, "Podlewaj wodą"],
            [light, setLight, "Takie samo światło jak w A"],
            [
              temperature,
              setTemperature,
              "Taka sama temperatura jak w A (20°C)",
            ],
          ].map(([checked, set, label]) => (
            <label className="bio-check" key={String(label)}>
              <input
                type="checkbox"
                checked={Boolean(checked)}
                onChange={(e) => {
                  (set as (v: boolean) => void)(e.target.checked);
                  setRun(false);
                }}
              />
              {String(label)}
            </label>
          ))}
          {run && result.valid && <Seeds wet={false} />}
        </div>
      </div>
      <p>
        Bez zmian: gatunek i liczba nasion, podłoże, dostęp powietrza, czas
        obserwacji (7 dni).
      </p>
      <button className="geo-button" onClick={() => setRun(true)}>
        Porównaj próby
      </button>
      {run && (
        <div role="status" className="bio-finding">
          <strong>
            {result.valid
              ? "Zmieniasz jeden czynnik: dostęp do wody."
              : `Liczba zmienionych warunków: ${result.changed}.`}
          </strong>
          <p>
            {result.valid
              ? "Przykładowe dane: w A wykiełkowało 7/8 nasion, w B 0/8. Wynik wspiera przypuszczenie, że woda jest potrzebna tym nasionom do kiełkowania w badanych warunkach."
              : result.changed === 0
                ? "Obie próby są takie same. Nie sprawdzisz w ten sposób wpływu braku wody."
                : "Aby zbadać wpływ wody, pozostaw światło i temperaturę takie same w obu próbach, a w próbie B nie podlewaj nasion."}
          </p>
          <small>
            Dane dydaktyczne, nie prognoza wzrostu. Prawdziwe doświadczenie może
            dać inne wyniki; obserwacje zawsze zapisuj uczciwie.
          </small>
        </div>
      )}
    </div>
  );
}
function Microscope() {
  const [objective, setObjective] = useState(4),
    [ocular, setOcular] = useState(10),
    [focus, setFocus] = useState(20);
  const id = useId().replaceAll(":", "");
  return (
    <div className="bio-activity">
      <div className="bio-microscope-layout">
        <MicroscopeDrawing />
        <div>
          <svg
            viewBox="0 0 320 320"
            role="img"
            aria-label={`Schemat skórki cebuli przy powiększeniu ${microscopePower(ocular, objective)} razy; ${Math.abs(focus - 50) < 8 ? "obraz ostry" : "obraz nieostry"}`}
          >
            <defs>
              <pattern
                id={`${id}cells`}
                width="65"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  width="65"
                  height="32"
                  rx="8"
                  fill="#f4e6bd"
                  stroke="#a69a6a"
                  strokeWidth="2"
                />
                <ellipse cx="42" cy="18" rx="5" ry="4" fill="#b3a079" />
              </pattern>
              <clipPath id={`${id}clip`}>
                <circle cx="160" cy="160" r="139" />
              </clipPath>
            </defs>
            <circle cx="160" cy="160" r="155" fill="#3d584d" />
            <g clipPath={`url(#${id}clip)`}>
              <g
                style={{ filter: `blur(${Math.abs(focus - 50) / 9}px)` }}
                transform={`translate(160 160) scale(${Math.sqrt(microscopePower(ocular, objective) / 40)}) translate(-160 -160)`}
              >
                <rect
                  x="-200"
                  y="-200"
                  width="720"
                  height="720"
                  fill={`url(#${id}cells)`}
                />
              </g>
            </g>
            <path
              d="M160 14v15m0 262v15M14 160h15m262 0h15"
              stroke="#c1b986"
              strokeWidth="2"
            />
          </svg>
          <p className="geo-caption">
            Skórka łuski cebuli · schemat, nie fotografia.
            <br />
            Rozmiary i pole widzenia są poglądowe.
          </p>
        </div>
        <div className="bio-controls">
          <label>
            Okular
            <select
                aria-label="Okular"
              value={ocular}
              onChange={(e) => setOcular(Number(e.target.value))}
            >
              <option value="10">10×</option>
              <option value="15">15×</option>
            </select>
          </label>
          <fieldset>
            <legend>Obiektyw</legend>
            <div className="bio-segment">
              {[4, 10, 40].map((n) => (
                <button
                  key={n}
                  aria-pressed={objective === n}
                  onClick={() => setObjective(n)}
                >
                  {n}×
                </button>
              ))}
            </div>
          </fieldset>
          <label>
            Ostrość
            <input
              type="range"
                aria-label="Ostrość"
              min="0"
              max="100"
              value={focus}
              onChange={(e) => setFocus(Number(e.target.value))}
            />
          </label>
          <output aria-live="polite" className="bio-magnification">
            {microscopePower(ocular, objective)}×
            <small>
              {ocular} × {objective}
            </small>
          </output>
          <p>
            {Math.abs(focus - 50) < 8
              ? "Obraz ostry — widać zarysy komórek."
              : "Pokręć ostrością, szukając wyraźnych krawędzi."}
          </p>
        </div>
      </div>
      <div className="bio-finding">
        Zacznij od 4×. Większe powiększenie pokazuje mniej komórek w polu
        widzenia. W prawdziwym mikroskopie przy dużym powiększeniu ostrość
        poprawiaj śrubą mikrometryczną.
      </div>
    </div>
  );
}
const CHEMISTRY = [
  [
    "Woda",
    "H₂O",
    "Rozpuszcza wiele substancji i umożliwia ich transport. Jest środowiskiem wielu reakcji w organizmie.",
  ],
  [
    "Sole mineralne",
    "Ca · Mg",
    "Są potrzebne między innymi do budowy kości oraz prawidłowej pracy mięśni. Różne sole pełnią różne funkcje.",
  ],
  [
    "Węglowodany",
    "cukry",
    "Glukoza jest źródłem energii, skrobia materiałem zapasowym roślin, a celuloza buduje ich ściany komórkowe.",
  ],
  [
    "Białka",
    "łańcuch",
    "Budują wiele struktur. Niektóre białka przyspieszają reakcje chemiczne, inne transportują substancje.",
  ],
  [
    "Tłuszcze",
    "zapas",
    "Stanowią zapas energii, chronią przed utratą ciepła. Niektóre związki tłuszczowe współtworzą błony komórkowe.",
  ],
  [
    "Kwasy nukleinowe",
    "DNA",
    "DNA przechowuje informację genetyczną. Kwasy nukleinowe uczestniczą też w jej wykorzystaniu przez komórkę.",
  ],
];
function Chemistry() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="bio-activity">
      <p className="bio-lead">
        Jedna komórka, wiele składników. Otwórz każdą kartę i poznaj jej
        zadania.
      </p>
      <div className="bio-chemistry">
        {CHEMISTRY.map(([name, symbol], i) => (
          <button
            key={name}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <span>{symbol}</span>
            {name}
          </button>
        ))}
      </div>
      <div className="bio-finding" aria-live="polite">
        <h3>{CHEMISTRY[selected][0]}</h3>
        <p>{CHEMISTRY[selected][2]}</p>
      </div>
      <small>
        Symbole na kartach to skróty i skojarzenia, a nie modele wszystkich
        cząsteczek.
      </small>
    </div>
  );
}
function Cell() {
  const [selected, setSelected] = useState(2);
  return (
    <div className="bio-activity">
      <div className="bio-two-col">
        <CellDiagram selected={selected} />
        <div>
          <div className="bio-parts">
            {CELL_PARTS.map(([label], i) => (
              <button
                key={label}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                {label}
              </button>
            ))}
          </div>
          <div aria-live="polite" className="bio-finding">
            <h3>{CELL_PARTS[selected][0]}</h3>
            <p>{CELL_PARTS[selected][1]}</p>
          </div>
        </div>
      </div>
      <p className="geo-caption">
        Komórka zwierzęca nie ma ściany komórkowej ani chloroplastów. Schemat
        przedstawia wybrane struktury typowej komórki; ich liczba i wygląd mogą
        się różnić.
      </p>
    </div>
  );
}
export function BiologyLab({ missionId }: { missionId: MissionId }) {
  return missionId === "bio-life" ? (
    <Levels />
  ) : missionId === "bio-research" ? (
    <Experiment />
  ) : missionId === "bio-microscope" ? (
    <Microscope />
  ) : missionId === "bio-chemistry" ? (
    <Chemistry />
  ) : (
    <Cell />
  );
}
