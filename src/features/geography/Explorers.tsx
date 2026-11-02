"use client";

import { useState } from "react";
import {
  ContourMap,
  ExpeditionMap,
  MAP_EDGES,
  MAP_POINTS,
  TerrainModel,
  type MapPointId,
} from "./Illustrations";
import { CONTOURS, formatDistance, groundMeters, SUMMIT } from "./model";

export function MapExplorer({ planning = false }: { planning?: boolean }) {
  const [selected, setSelected] = useState<MapPointId>("pier");
  const [route, setRoute] = useState<MapPointId[]>(["pier"]);
  const [message, setMessage] = useState(
    "Wybierz schronisko lub biwak jako pierwszy przystanek.",
  );
  const point = MAP_POINTS.find((p) => p.id === selected)!;
  const distance = route
    .slice(1)
    .reduce(
      (sum, id, i) =>
        sum +
        (MAP_EDGES.find(
          (e) =>
            (e.from === route[i] && e.to === id) ||
            (e.to === route[i] && e.from === id),
        )?.meters ?? 0),
      0,
    );
  const select = (id: MapPointId) => {
    setSelected(id);
    if (!planning) return;
    const last = route[route.length - 1];
    if (last === "tower") {
      setMessage("Cel osiągnięty! Wyczyść trasę, aby porównać inną drogę.");
      return;
    }
    if (route.includes(id)) {
      setMessage(
        "Ten punkt jest już na trasie. Wybierz kolejny lub wyczyść trasę.",
      );
      return;
    }
    if (
      !MAP_EDGES.some(
        (e) =>
          (e.from === last && e.to === id) || (e.to === last && e.from === id),
      )
    ) {
      setMessage(
        "Nie ma tu bezpośredniego szlaku. Wybierz punkt połączony przerywaną linią.",
      );
      return;
    }
    setRoute([...route, id]);
    setMessage(
      id === "tower"
        ? "Jesteś przy wieży! Porównaj teraz tę drogę z trasą przez drugi przystanek."
        : "Dobry wybór. Teraz wybierz wieżę, aby dotrzeć do celu.",
    );
  };
  return (
    <div className="geo-lab-grid">
      <div>
        <ExpeditionMap
          selected={selected}
          onSelect={select}
          route={planning ? route : []}
        />
        <div className="geo-map-legend">
          <span>
            <i className="forest" />
            Las
          </span>
          <span>
            <i className="water" />
            Woda
          </span>
          <span>
            <i className="trail" />
            Szlak
          </span>
          <span>⌂ Schronisko</span>
        </div>
      </div>
      <div className="geo-lab-notes">
        <span className="geo-eyebrow">
          {planning ? "TWOJE ZADANIE" : "DOTKNIJ MAPY"}
        </span>
        <h3>{planning ? "Z przystani na wieżę" : "Co kryje ten znak?"}</h3>
        <p>
          {planning
            ? "Zacznij w przystani i wybieraj kolejne punkty połączone szlakiem. Dotrzyj do wieży. Która trasa jest krótsza?"
            : "Klikaj obiekty na mapie. Odszukaj je w legendzie i opisz ich położenie względem pozostałych."}
        </p>
        <div className="geo-map-detail" aria-live="polite">
          <strong>
            {point.symbol} {point.name}
          </strong>
          <p>{point.detail}</p>
        </div>
        {planning && (
          <>
            <ol className="geo-itinerary">
              {route.map((id, i) => (
                <li key={id}>
                  <span>{i + 1}</span>
                  {MAP_POINTS.find((p) => p.id === id)?.name}
                </li>
              ))}
            </ol>
            <output className="geo-distance" aria-label="Długość trasy">
              {formatDistance(distance)}
            </output>
            <p role="status" aria-label="Informacja o trasie">
              {message}
            </p>
            <button
              className="geo-button secondary"
              onClick={() => {
                setRoute(["pier"]);
                setSelected("pier");
                setMessage(
                  "Wybierz schronisko lub biwak jako pierwszy przystanek.",
                );
              }}
            >
              Wyczyść trasę
            </button>
          </>
        )}
        {!planning && (
          <div className="geo-note">
            Spróbuj: znajdź obiekt leżący na północ od przystani, a potem obiekt
            na wschód od niego.
          </div>
        )}
      </div>
    </div>
  );
}

export function ScaleExplorer() {
  const [denominator, setDenominator] = useState(25000);
  const [cm, setCm] = useState(4);
  const meters = groundMeters(cm, denominator);
  return (
    <div className="geo-lab-grid">
      <div className="geo-ruler-board">
        <span className="geo-eyebrow">LINIJKA KARTOGRAFA</span>
        <h3>Jeden odcinek. Różne odległości.</h3>
        <svg
          viewBox="0 0 520 245"
          role="img"
          aria-label={`Odcinek ${cm} umownych centymetrów odpowiada ${formatDistance(meters)} w skali 1 do ${denominator}`}
        >
          <path d="M35 90H485" stroke="#d4d8c4" strokeWidth="3" />
          <path d={`M35 90H${35 + cm * 45}`} stroke="#c56b43" strokeWidth="5" />
          <circle cx="35" cy="90" r="7" fill="#315c4c" />
          <circle cx={35 + cm * 45} cy="90" r="7" fill="#c56b43" />
          <text x="35" y="65" fill="#315c4c" textAnchor="middle" fontSize="14">
            A
          </text>
          <text
            x={35 + cm * 45}
            y="65"
            fill="#a25331"
            textAnchor="middle"
            fontSize="14"
          >
            B
          </text>
          <rect
            x="25"
            y="120"
            width="470"
            height="68"
            rx="5"
            fill="#e5d7ae"
            stroke="#b9a67a"
          />
          {Array.from({ length: 51 }, (_, i) => (
            <path
              key={i}
              d={`M${35 + i * 9} 120v${i % 5 === 0 ? 25 : 12}`}
              stroke="#88764f"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <text
              key={i}
              x={35 + i * 45}
              y="171"
              textAnchor="middle"
              fontSize="13"
              fill="#6a5937"
            >
              {i}
            </text>
          ))}
          <text
            x="260"
            y="222"
            textAnchor="middle"
            fontSize="13"
            fill="#737b65"
          >
            Umowne centymetry mapy — nie mierz ekranu linijką.
          </text>
        </svg>
        <div className="geo-formula">
          <span>{cm} cm</span>
          <span>×</span>
          <span>{formatDistance(groundMeters(1, denominator))} / cm</span>
          <span>=</span>
          <strong>{formatDistance(meters)}</strong>
        </div>
      </div>
      <div className="geo-lab-notes">
        <span className="geo-eyebrow">EKSPERYMENTUJ</span>
        <h3>Zmieniaj i porównuj</h3>
        <label htmlFor="geo-scale">Skala liczbowa</label>
        <select
          id="geo-scale"
          value={denominator}
          onChange={(e) => setDenominator(Number(e.target.value))}
        >
          {[10000, 25000, 50000, 100000].map((n) => (
            <option key={n} value={n}>
              1 : {n.toLocaleString("pl-PL")}
            </option>
          ))}
        </select>
        <label htmlFor="geo-length">
          Długość na mapie <strong>{cm} cm</strong>
        </label>
        <input
          id="geo-length"
          type="range"
          min="1"
          max="10"
          step="0.5"
          value={cm}
          onChange={(e) => setCm(Number(e.target.value))}
        />
        <div className="geo-map-detail" aria-live="polite">
          <span>W TERENIE</span>
          <output className="geo-distance">{formatDistance(meters)}</output>
          <p>
            1 cm na mapie = {denominator.toLocaleString("pl-PL")} cm w terenie ={" "}
            {formatDistance(denominator / 100)}.
          </p>
        </div>
        <div className="geo-note">
          Sprawdź: ustaw 6 cm i skalę 1 : 25 000. Potem zmień tylko skalę na 1 :
          50 000. Co stało się z odległością?
        </div>
      </div>
    </div>
  );
}

export function ReliefExplorer() {
  const [flat, setFlat] = useState(false);
  const [height, setHeight] = useState(200);
  return (
    <div className="geo-lab-grid">
      <div className="geo-terrain-board">
        <div className="geo-figure-heading">
          <span>FIG. 01 · MODEL WZGÓRZA</span>
          <div className="geo-segmented">
            <button aria-pressed={!flat} onClick={() => setFlat(false)}>
              Model terenu
            </button>
            <button aria-pressed={flat} onClick={() => setFlat(true)}>
              Widok z góry
            </button>
          </div>
        </div>
        {flat ? (
          <ContourMap selected={height} />
        ) : (
          <TerrainModel selected={height} />
        )}
        <div className="geo-height-key">
          {CONTOURS.map((h, i) => (
            <span
              key={h}
              style={{
                borderTopColor: [
                  "#abc78a",
                  "#bfce8b",
                  "#d6d397",
                  "#dfc687",
                  "#d6b47f",
                  "#c8a071",
                ][i],
              }}
            >
              {h} m
            </span>
          ))}
        </div>
        <p className="geo-caption">
          Model warstwowy, z przewyższeniem dla czytelności. Każda krawędź
          odpowiada poziomicy na mapie.
        </p>
      </div>
      <div className="geo-lab-notes">
        <span className="geo-eyebrow">ZOBACZ NIEWIDOCZNE</span>
        <h3>Z góry robi się mapa</h3>
        <p>
          Wybierz wysokość. Zaznaczona krawędź modelu i linia na mapie oznaczają
          dokładnie ten sam poziom.
        </p>
        <label htmlFor="geo-height">
          Poziomica <strong>{height} m n.p.m.</strong>
        </label>
        <input
          id="geo-height"
          type="range"
          min="100"
          max="350"
          step="50"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
        <div className="geo-map-detail" aria-live="polite">
          <span>DO SZCZYTU, KTÓRY MA {SUMMIT} M N.P.M.</span>
          <output className="geo-distance">{SUMMIT - height} m</output>
          <p>
            To różnica wysokości: {SUMMIT} − {height} = {SUMMIT - height} m. Nie
            jest to długość szlaku.
          </p>
        </div>
        <div className="geo-note">
          Przełącz na widok z góry. Po której stronie poziomice są bliżej
          siebie? Tam stok jest bardziej stromy.
        </div>
      </div>
    </div>
  );
}
