import { useId } from "react";
import { CONTOURS, contourShape, SUMMIT } from "./model";

export function GeoIcon({ name, size = 24 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z" />
      </>
    ),
    map: (
      <>
        <path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Z M9 3v16M15 5v16" />
      </>
    ),
    scale: (
      <>
        <path d="m3 16 13-13 5 5L8 21l-5-5Z M7 12l2 2m1-5 2 2m1-5 2 2" />
      </>
    ),
    mountain: (
      <>
        <path d="m2 20 8-15 4 8 3-5 5 12H2Z M7 11l3 2 3-2" />
        <path d="M10 5V2h5l-2 2h-3" />
      </>
    ),
    route: (
      <>
        <circle cx="5" cy="18" r="3" />
        <circle cx="19" cy="5" r="3" />
        <path d="M8 18h7a4 4 0 0 0 0-8H9a3 3 0 0 1 0-6h7" />
      </>
    ),
    star: <path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    book: (
      <>
        <path d="M12 5v16M3 3c4-1 7 0 9 2 2-2 5-3 9-2v15c-4-1-7 0-9 3-2-3-5-4-9-3V3Z" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.compass}
    </svg>
  );
}

export function Landscape({ small = false }: { small?: boolean }) {
  return (
    <svg
      viewBox="0 0 640 360"
      className="geo-landscape"
      role="img"
      aria-label="Ilustrowana wyprawa: górski szlak prowadzi przez las, jezioro i wzgórza do chorągiewki na szczycie"
    >
      <defs>
        <linearGradient id={small ? "sky-small" : "sky"} x2="0" y2="1">
          <stop stopColor="#e3eee6" />
          <stop offset="1" stopColor="#f3f3dc" />
        </linearGradient>
      </defs>
      <rect
        width="640"
        height="360"
        fill={`url(#${small ? "sky-small" : "sky"})`}
      />
      <circle cx="493" cy="73" r="34" fill="#e8b864" />
      <path
        d="M0 199 93 105 165 165 279 53 388 169 450 106 640 227V360H0Z"
        fill="#99b7a3"
      />
      <path d="m279 53 109 116-70-30-28-42-19 19-24-16Z" fill="#d9e1cd" />
      <path d="m93 105 72 60-53-21-13-19-23 9Z" fill="#d9e1cd" />
      <path d="M0 243Q95 145 225 200T450 192T640 228V360H0Z" fill="#638b72" />
      <path d="M0 289Q116 226 250 264T456 237T640 278V360H0Z" fill="#8faf7d" />
      <path
        d="M640 244Q525 223 499 256T363 299Q309 323 365 360H640Z"
        fill="#88bcc4"
      />
      <path
        d="M640 267Q546 246 519 276T407 310M640 289Q558 268 537 295T452 330"
        fill="none"
        stroke="#c0dcda"
        strokeWidth="2"
      />
      <path d="M0 346Q129 283 239 311T411 360H0Z" fill="#b4c592" />
      <path
        d="M175 360Q231 321 206 301T214 264T311 223T352 201"
        fill="none"
        stroke="#eee0b2"
        strokeWidth="11"
      />
      <path
        d="M175 360Q231 321 206 301T214 264T311 223T352 201"
        fill="none"
        stroke="#bb975f"
        strokeWidth="1.5"
        strokeDasharray="3 7"
      />
      {[
        [38, 252, 1.1],
        [63, 269, 0.8],
        [100, 232, 1],
        [123, 255, 0.8],
        [405, 222, 1],
        [430, 227, 0.8],
        [456, 214, 0.9],
        [549, 323, 1.2],
        [586, 328, 1],
        [69, 329, 1.3],
        [105, 343, 1.15],
        [141, 328, 0.85],
        [283, 285, 0.7],
        [308, 289, 0.65],
      ].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 0v19" stroke="#56674a" strokeWidth="4" />
          <path
            d="m0-39-15 28h7l-12 17H20L8-11h7Z"
            fill={i % 2 ? "#315b4c" : "#426d54"}
          />
          <path d="M0-39V6H20L8-11h7Z" fill="#244e41" opacity=".35" />
        </g>
      ))}
      <g transform="translate(353 190)">
        <path d="M0 12v-41" stroke="#45594a" strokeWidth="3" />
        <path d="M2-29h26l-6 8 6 8H2Z" fill="#d8784e" />
        <ellipse cy="14" rx="15" ry="5" fill="#52755e" />
      </g>
      <g transform="translate(242 245)">
        <path d="m-19 10 19-26 19 26Z" fill="#ecd18b" />
        <path d="M0-16v26h19Z" fill="#c19c59" />
        <path d="m0-4-8 14H8Z" fill="#587053" />
      </g>
      <path
        d="m77 63 8-4 8 4m23 10 6-3 6 3m262-22 8-4 8 4"
        fill="none"
        stroke="#65806b"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const MAP_POINTS = [
  {
    id: "pier",
    name: "Przystań",
    x: 130,
    y: 350,
    symbol: "⚓",
    detail:
      "Znak punktowy · miejsce przybijania łodzi. Stąd zaczyna się nasza wyprawa.",
  },
  {
    id: "shelter",
    name: "Schronisko",
    x: 130,
    y: 110,
    symbol: "⌂",
    detail: "Znak punktowy · miejsce odpoczynku. Leży na północ od przystani.",
  },
  {
    id: "tower",
    name: "Wieża",
    x: 450,
    y: 110,
    symbol: "♜",
    detail: "Znak punktowy · wieża widokowa. Leży na wschód od schroniska.",
  },
  {
    id: "camp",
    name: "Biwak",
    x: 450,
    y: 350,
    symbol: "△",
    detail: "Znak punktowy · pole biwakowe. Leży na południe od wieży.",
  },
] as const;
export type MapPointId = (typeof MAP_POINTS)[number]["id"];
export const MAP_EDGES: {
  from: MapPointId;
  to: MapPointId;
  meters: number;
  path: string;
}[] = [
  { from: "pier", to: "shelter", meters: 600, path: "M130 350V110" },
  { from: "shelter", to: "tower", meters: 800, path: "M130 110H450" },
  { from: "pier", to: "camp", meters: 800, path: "M130 350H450" },
  { from: "camp", to: "tower", meters: 900, path: "M450 350H510V110H450" },
];

export function ExpeditionMap({
  selected,
  onSelect,
  route = [],
}: {
  selected?: string;
  onSelect?: (id: MapPointId) => void;
  route?: MapPointId[];
}) {
  const gridId = useId();
  return (
    <div className="geo-map-wrap">
      <svg
        viewBox="0 0 600 440"
        role="img"
        aria-label="Dolina Odkrywców, mapa ćwiczeniowa. Północ u góry. Schronisko na północy od przystani, wieża na wschód od schroniska, biwak na południe od wieży. Jezioro pośrodku."
      >
        <defs>
          <pattern
            id={gridId}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M40 0H0V40"
              fill="none"
              stroke="#6e8b66"
              strokeOpacity=".14"
            />
          </pattern>
        </defs>
        <rect width="600" height="440" rx="12" fill="#edf0d9" />
        <path
          d="M0 0H277Q240 57 294 123T244 227Q165 264 182 323T100 440H0Z"
          fill="#d3dfbc"
        />
        <path
          d="M367 0Q346 63 381 110T411 191Q470 230 600 175V0Z"
          fill="#d9dfb4"
        />
        <path
          d="M297 163C351 136 410 202 391 248S353 316 288 295 238 213 267 192Z"
          fill="#a7d2d4"
          stroke="#83b7ba"
          strokeWidth="2"
        />
        <path
          d="M292 295Q242 325 261 374T285 440"
          stroke="#a7d2d4"
          strokeWidth="13"
          fill="none"
        />
        <rect width="600" height="440" fill={`url(#${gridId})`} />
        {Array.from({ length: 22 }, (_, i) => {
          const x = 25 + (i % 4) * 22 + (Math.floor(i / 4) % 2) * 8,
            y = 135 + Math.floor(i / 4) * 23;
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              <path d="M0 0v8" stroke="#6d8a5f" />
              <path d="m0-12-7 13H7Z" fill="#9bb584" />
            </g>
          );
        })}
        <g fill="none" stroke="#acb38b" strokeWidth="1.2">
          {[0, 1, 2, 3].map((i) => (
            <ellipse
              key={i}
              cx={416 + i * 5}
              cy="46"
              rx={96 - i * 19}
              ry={40 - i * 8}
            />
          ))}
        </g>
        {MAP_EDGES.map((e) => {
          const active = route.some(
            (id, i) =>
              i > 0 &&
              ((id === e.to && route[i - 1] === e.from) ||
                (id === e.from && route[i - 1] === e.to)),
          );
          return (
            <path
              key={e.path}
              d={e.path}
              fill="none"
              stroke={active ? "#d16c43" : "#bba283"}
              strokeWidth={active ? 6 : 3}
              strokeDasharray={active ? undefined : "6 5"}
              strokeLinejoin="round"
            />
          );
        })}
        <g fill="#55756c" fontFamily="inherit" textAnchor="middle">
          <text x="318" y="236" fontSize="16" fontStyle="italic">
            Jezioro Ciche
          </text>
          <text x="65" y="302" fontSize="12" transform="rotate(-90 65 302)">
            Las Szeptów
          </text>
        </g>
        <g transform="translate(555 45)" stroke="#315c4c" strokeWidth="1.5">
          <path d="M0 30V0m-6 9 6-9 6 9" fill="none" />
          <text
            y="-10"
            fill="#315c4c"
            stroke="none"
            textAnchor="middle"
            fontSize="13"
          >
            N
          </text>
        </g>
        <g transform="translate(30 407)">
          <path
            d="M0-5v10m0-5h160m-80-5v10m80-10v10"
            stroke="#45624f"
            strokeWidth="2"
          />
          <text x="0" y="22" fontSize="11" fill="#45624f">
            0
          </text>
          <text x="80" y="22" fontSize="11" textAnchor="middle" fill="#45624f">
            200
          </text>
          <text x="160" y="22" fontSize="11" textAnchor="middle" fill="#45624f">
            400 m
          </text>
        </g>
        <text x="573" y="424" textAnchor="end" fill="#65775c" fontSize="10">
          MAPA ĆWICZENIOWA · FIKCYJNY TEREN
        </text>
        {!onSelect &&
          MAP_POINTS.map((p) => (
            <g key={p.id}>
              <circle
                cx={p.x}
                cy={p.y}
                r="15"
                fill="#fffdf4"
                stroke="#315c4c"
                strokeWidth="2"
              />
              <text
                x={p.x}
                y={p.y + 5}
                fontSize="18"
                textAnchor="middle"
                fill="#315c4c"
              >
                {p.symbol}
              </text>
              <text
                x={p.x}
                y={p.y + 33}
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="#294d41"
              >
                {p.name}
              </text>
            </g>
          ))}
      </svg>
      {onSelect &&
        MAP_POINTS.map((p) => (
          <button
            key={p.id}
            className={`geo-pin ${selected === p.id ? "selected" : ""}`}
            style={{ left: `${p.x / 6}%`, top: `${p.y / 4.4}%` }}
            onClick={() => onSelect(p.id)}
            aria-label={p.name}
            aria-pressed={selected === p.id}
          >
            <span>{p.symbol}</span>
            <b>{p.name}</b>
          </button>
        ))}
    </div>
  );
}

export function ContourMap({ selected = 200 }: { selected?: number }) {
  return (
    <svg
      viewBox="0 0 500 380"
      role="img"
      aria-label="Mapa poziomicowa wzgórza. Poziomice od 100 do 350 metrów co 50 metrów, szczyt 375 metrów. Linie są bliżej siebie po prawej, wschodniej stronie wzgórza."
    >
      <rect width="500" height="380" rx="12" fill="#f5f0de" />
      {CONTOURS.map((h, i) => {
        const p = contourShape(h);
        return (
          <g key={h}>
            <ellipse
              {...p}
              fill={
                [
                  "#d6e4b8",
                  "#e0e6b4",
                  "#e7e1ab",
                  "#e6cf94",
                  "#d9b77f",
                  "#c99b6b",
                ][i]
              }
              stroke={h === selected ? "#b4532f" : "#a7956e"}
              strokeWidth={h === selected ? 3 : 1.4}
            />
            <text x={p.cx - p.rx + 8} y={p.cy + 5} fill="#655437" fontSize="12">
              {h}
            </text>
          </g>
        );
      })}
      <circle cx="300" cy="170" r="3" fill="#614735" />
      <text x="309" y="174" fill="#614735" fontSize="13">
        375
      </text>
      <path
        d="M455 74V35m-6 9 6-9 6 9"
        fill="none"
        stroke="#315c4c"
        strokeWidth="2"
      />
      <text x="455" y="25" textAnchor="middle" fill="#315c4c" fontSize="13">
        N
      </text>
      <text x="35" y="350" fill="#655437" fontSize="12">
        Poziomice co 50 m · wysokości w m n.p.m.
      </text>
    </svg>
  );
}

// A physical classroom terrain maquette: six contoured wooden layers,
// their shaded edges, a plinth, corner fasteners and a calibrated height rail.
// The same ellipse model drives this relief and the plan view above.
export function TerrainModel({ selected }: { selected: number }) {
  const project = (x: number, y: number, z: number) =>
    `${x + (y - 190) * 0.35},${300 + (y - 190) * 0.45 - z * 0.48}`;
  const ring = (h: number, z: number) => {
    const p = contourShape(h);
    return Array.from({ length: 64 }, (_, i) => {
      const a = (i / 64) * Math.PI * 2;
      return project(p.cx + p.rx * Math.cos(a), p.cy + p.ry * Math.sin(a), z);
    }).join(" ");
  };
  return (
    <svg
      viewBox="0 0 500 380"
      role="img"
      aria-label={`Warstwowy model wzgórza. Wyróżniona poziomica: ${selected} metrów nad poziomem morza. Szczyt: ${SUMMIT} metrów.`}
    >
      <ellipse
        cx="250"
        cy="330"
        rx="218"
        ry="37"
        fill="#274b3e"
        opacity=".07"
      />
      <path d="m28 270 370-14 66 57-370 14Z" fill="#d2c4a4" />
      <path d="m94 327 370-14v12L94 339Z" fill="#a69473" />
      <path d="m28 270 66 57v12l-66-57Z" fill="#b9a886" />
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={[46, 388, 108, 445][i]}
          cy={[274, 264, 324, 311][i]}
          r="2"
          fill="#8b816d"
        />
      ))}
      {CONTOURS.map((h, i) => (
        <g key={h}>
          <polygon
            points={ring(h, h - 100 - 16)}
            fill={
              [
                "#789b68",
                "#91a56d",
                "#b7af6d",
                "#c2a06b",
                "#b38c60",
                "#9b7655",
              ][i]
            }
          />
          <polygon
            points={ring(h, h - 100)}
            fill={
              [
                "#abc78a",
                "#bfce8b",
                "#d6d397",
                "#dfc687",
                "#d6b47f",
                "#c8a071",
              ][i]
            }
            stroke={selected === h ? "#c0623c" : "#827b50"}
            strokeWidth={selected === h ? 3 : 1}
          />
        </g>
      ))}
      <path
        d={`M${project(300, 170, 250)} L${project(300, 170, 275)} L${project(310, 170, 250)}Z`}
        fill="#af835b"
      />
      <path
        d={`M${project(300, 170, 275)}v-28`}
        stroke="#50634d"
        strokeWidth="2"
      />
      <path
        d={`m${project(300, 170, 275)} 0-28 18 0-5 7 5 6-18 0`}
        fill="#d16c43"
      />
      <g transform="translate(445 138)">
        <rect width="9" height="155" rx="2" fill="#e7d8b5" stroke="#a29372" />
        {Array.from({ length: 16 }, (_, i) => (
          <path
            key={i}
            d={`M0 ${i * 10 + 3}h${i % 5 === 0 ? 9 : 5}`}
            stroke="#97866b"
            strokeWidth="1"
          />
        ))}
      </g>
    </svg>
  );
}
