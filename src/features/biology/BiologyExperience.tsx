"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MISSIONS, type Mission, type MissionId } from "./content";
import {
  BioIcon as GeoIcon,
  BiologyHero as Landscape,
  QuestionIllustration,
} from "./Illustrations";
import { BiologyLab } from "./Explorers";
import {
  explorerRank,
  gradeAttempt,
  readProgress,
  recordAttempt,
  totalPoints,
  type ExpeditionProgress,
} from "./model";
import { saveBiologyAttempt } from "./actions";
import "../geography/geography.css";
import "./biology.css";

const ICONS = ["leaf", "flask", "microscope", "molecule", "cell"];
const EMPTY_PROGRESS: ExpeditionProgress = {};
type View = "overview" | "lesson" | "quiz" | "badges";

export function BiologyExperience({
  preview = false,
  userId,
  allowed,
  initialProgress = EMPTY_PROGRESS,
  initialMission,
  initialMode,
}: {
  preview?: boolean;
  userId: string;
  allowed: MissionId[];
  initialProgress?: ExpeditionProgress;
  initialMission?: string;
  initialMode?: string;
}) {
  const first = MISSIONS.find(
    (m) => m.id === initialMission && allowed.includes(m.id),
  );
  const [view, setView] = useState<View>(
    first ? (initialMode === "quiz" ? "quiz" : "lesson") : "overview",
  );
  const [active, setActive] = useState<Mission>(
    first ?? MISSIONS.find((m) => allowed.includes(m.id)) ?? MISSIONS[0],
  );
  const [progress, setProgress] = useState(initialProgress);
  const [ready, setReady] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const [quizKey, setQuizKey] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const storageKey = `polymath:biology:v1:${userId}`;
  useEffect(() => {
    // Hydrate browser-owned progress after the initial server render, and
    // subscribe to updates from other tabs sharing the same student profile.
    const refresh = () => {
      let merged = { ...initialProgress };
      try {
        const local = readProgress(localStorage.getItem(storageKey));
        for (const m of MISSIONS) {
          const a = merged[m.id],
            b = local[m.id];
          if (b)
            merged = {
              ...merged,
              [m.id]: {
                best: Math.max(a?.best ?? 0, b.best),
                attempts: Math.max(a?.attempts ?? 0, b.attempts),
              },
            };
        }
      } catch {
        setStorageWarning(true);
      }
      setProgress(merged);
      setReady(true);
    };
    const frame = requestAnimationFrame(refresh);
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey) refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("storage", onStorage);
    };
  }, [storageKey, initialProgress]);
  const points = totalPoints(progress);
  const completed = MISSIONS.filter((m) => progress[m.id]).length;
  const earned = MISSIONS.filter(
    (m) => (progress[m.id]?.best ?? 0) >= 5,
  ).length;
  const available = MISSIONS.filter((m) => allowed.includes(m.id));
  const next = available.find((m) => !progress[m.id]) ?? available[0];
  const go = (nextView: View, mission = active) => {
    if (
      view === "quiz" &&
      !window.confirm(
        "Opuścić test? Odpowiedzi z niedokończonego testu nie zostaną zapisane.",
      )
    )
      return;
    setActive(mission);
    setView(nextView);
    if (nextView === "quiz") setQuizKey((k) => k + 1);
    requestAnimationFrame(() => titleRef.current?.focus());
  };
  const finish = (id: MissionId, score: number) => {
    // Read again to retain progress from other tabs before awarding a best score.
    let current = progress;
    try {
      const stored = readProgress(localStorage.getItem(storageKey));
      for (const m of MISSIONS) {
        const a = current[m.id],
          b = stored[m.id];
        if (b)
          current = {
            ...current,
            [m.id]: {
              best: Math.max(a?.best ?? 0, b.best),
              attempts: Math.max(a?.attempts ?? 0, b.attempts),
            },
          };
      }
    } catch {
      setStorageWarning(true);
    }
    const updated = recordAttempt(current, id, score);
    const delta = totalPoints(updated) - totalPoints(current);
    setProgress(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      setStorageWarning(true);
    }
    return delta;
  };
  return (
    <div className="geo-app bio-app" lang="pl">
      <header className="geo-topbar">
        <Link href="/" className="geo-brand">
          <span>
            <GeoIcon name="compass" size={23} />
          </span>
          polymath<span className="geo-brand-divider">/</span>
          <small>notatnik przyrodnika</small>
        </Link>
        <div
          className="geo-score-pill"
          aria-label={`Łącznie ${points} punktów`}
        >
          <GeoIcon name="star" size={16} />
          <strong>{points}</strong>
          <span>pkt</span>
        </div>
      </header>
      {preview && (
        <div className="geo-preview">
          Podgląd lokalny · bez logowania · wyniki i punkty zapisują się w tej
          przeglądarce
        </div>
      )}
      <div className="geo-content">
        <nav className="geo-nav" aria-label="Biologia">
          <button
            className={view === "overview" ? "active" : ""}
            onClick={() => go("overview")}
          >
            <GeoIcon name="compass" size={17} />
            Moje laboratorium
          </button>
          <button
            className={view === "badges" ? "active" : ""}
            onClick={() => go("badges")}
          >
            <GeoIcon name="star" size={17} />
            Odznaki <span>{earned}/5</span>
          </button>
          <span className="geo-course-label">BIOLOGIA · KLASA 5</span>
        </nav>
        <div
          ref={titleRef}
          tabIndex={-1}
          className="geo-view"
          key={`${view}-${active.id}`}
        >
          {storageWarning && (
            <p role="status" className="geo-warning">
              Przeglądarka blokuje zapis postępów. Punkty będą dostępne w tej
              sesji; po odświeżeniu mogą zniknąć.
            </p>
          )}
          {view === "overview" && (
            <>
              <section className="geo-hero">
                <div className="geo-hero-copy">
                  <span className="geo-eyebrow">
                    <span className="geo-tiny-line" />
                    KIERUNEK: WIEDZA
                  </span>
                  <h1>
                    Wielkie odkrycia
                    <br />
                    zaczynają się
                    <br />
                    <em>od małej komórki.</em>
                  </h1>
                  <p>
                    Zajrzyj do komórki. Zadaj dobre pytanie.
                    <br />
                    Ruszaj po swoją pierwszą odznakę odkrywcy.
                  </p>
                  <button
                    disabled={!next || !ready}
                    className="geo-button"
                    onClick={() => next && go("lesson", next)}
                  >
                    {completed ? "Kontynuuj misję" : "Zaczynamy przygodę"}
                    <GeoIcon name="arrow" size={18} />
                  </button>
                  <div className="geo-hero-meta">
                    <span>5 misji</span>
                    <i />
                    <span>5 interaktywnych pracowni</span>
                    <i />
                    <span>Twoje tempo</span>
                  </div>
                </div>
                <div className="geo-hero-art">
                  <Landscape />
                  <span className="geo-art-stamp">
                    <GeoIcon name="compass" size={29} />
                    <span>
                      ŚWIAT CZEKA
                      <br />
                      <strong>Odkrywaj go.</strong>
                    </span>
                  </span>
                </div>
              </section>
              <section className="geo-progress-strip" aria-label="Postęp misji">
                <div className="geo-progress-icon">
                  <GeoIcon name="compass" size={26} />
                </div>
                <div>
                  <span className="geo-eyebrow">TWÓJ POZIOM</span>
                  <strong>{explorerRank(points)}</strong>
                </div>
                <div className="geo-progress-track">
                  <div>
                    <span>{completed} z 5 misji ukończonych</span>
                    <b>{points} / 400 pkt</b>
                  </div>
                  <progress value={points} max={400} />
                </div>
                <span className="geo-progress-end">
                  Każda odpowiedź to krok dalej.
                </span>
              </section>
              <div className="geo-section-heading">
                <div>
                  <span className="geo-eyebrow">TWÓJ PLAN BADAŃ</span>
                  <h2>Pięć kroków do poznania życia</h2>
                </div>
                <span>Odkrywaj → ćwicz → sprawdzaj</span>
              </div>
              <div className="geo-missions">
                {MISSIONS.map((m, i) => {
                  const p = progress[m.id],
                    unlocked = allowed.includes(m.id);
                  return (
                    <button
                      className={`geo-mission-card mission-${i} ${p ? "completed" : ""}`}
                      key={m.id}
                      disabled={!unlocked || !ready}
                      onClick={() => go("lesson", m)}
                    >
                      <div className="geo-card-top">
                        <span className="geo-mission-symbol">
                          <GeoIcon name={ICONS[i]} size={29} />
                        </span>
                        <span className="geo-mission-number">{m.number}</span>
                      </div>
                      <div className="geo-card-tag">
                        {p ? (
                          <>
                            <GeoIcon name="check" size={13} />
                            Ukończona · najlepszy wynik {p.best}/6
                          </>
                        ) : !unlocked ? (
                          "Dostęp nadaje administrator"
                        ) : (
                          `MISJA ${m.number}`
                        )}
                      </div>
                      <h3>{m.title}</h3>
                      <p>{m.subtitle}</p>
                      <div className="geo-card-footer">
                        <span>{m.minutes} min · do 80 pkt</span>
                        <GeoIcon name="arrow" size={20} />
                      </div>
                    </button>
                  );
                })}
              </div>
              {available.length === 0 && (
                <p className="geo-note">
                  Nie masz jeszcze dostępu do misji. Poproś administratora o
                  przypisanie modułów biologii.
                </p>
              )}
              <section className="geo-field-note">
                <span className="geo-note-icon">
                  <GeoIcon name="book" size={27} />
                </span>
                <div>
                  <span className="geo-eyebrow">Z NOTATNIKA ODKRYWCY</span>
                  <h3>Ciekawość to początek odkrycia.</h3>
                  <p>
                    Przyjrzyj się roślinie na parapecie. W którą stronę rośnie?
                    Zapisz obserwację i wymyśl pytanie, które możesz zbadać.
                  </p>
                </div>
                <span className="geo-field-number">N° 01</span>
              </section>
            </>
          )}
          {view === "lesson" && (
            <>
              <button className="geo-back" onClick={() => go("overview")}>
                ← Wszystkie misje
              </button>
              <div className="geo-lesson-heading">
                <div>
                  <span className="geo-eyebrow">
                    MISJA {active.number} · {active.minutes} MINUT
                  </span>
                  <h1>{active.title}</h1>
                  <p>{active.subtitle}</p>
                </div>
                <span className="geo-lesson-badge">
                  <GeoIcon name={ICONS[MISSIONS.indexOf(active)]} size={38} />
                </span>
              </div>
              <div className="geo-concepts">
                {active.concepts.map((c, i) => (
                  <article key={c.title}>
                    <span>0{i + 1}</span>
                    <h2>{c.title}</h2>
                    <p>{c.text}</p>
                  </article>
                ))}
              </div>
              <section className="geo-lab">
                <div className="geo-section-heading">
                  <div>
                    <span className="geo-eyebrow">PRACOWNIA ODKRYWCY</span>
                    <h2>{active.labTitle}</h2>
                  </div>
                  <span className="geo-live-dot">Interaktywne</span>
                </div>
                <BiologyLab key={active.id} missionId={active.id} />
              </section>
              <div className="geo-tip">
                <GeoIcon name="compass" />
                <p>
                  <strong>Warto zapamiętać. </strong>
                  {active.tip}
                </p>
              </div>
              <section className="geo-quiz-invite">
                <div>
                  <span className="geo-eyebrow">CZAS NA MAŁE WYZWANIE</span>
                  <h2>Sprawdź się i zdobądź odznakę</h2>
                  <p>
                    6 pytań · 10 punktów za poprawną odpowiedź · 20 punktów za
                    pierwsze ukończenie
                  </p>
                </div>
                <button className="geo-button" onClick={() => go("quiz")}>
                  Rozpocznij test
                  <GeoIcon name="arrow" size={18} />
                </button>
              </section>
            </>
          )}
          {view === "quiz" && (
            <BiologyQuiz
              key={quizKey}
              mission={active}
              preview={preview}
              onFinish={finish}
              onLeave={() => go("lesson")}
              onDone={() => {
                setView("overview");
                requestAnimationFrame(() => titleRef.current?.focus());
              }}
            />
          )}
          {view === "badges" && (
            <>
              <div className="geo-lesson-heading">
                <div>
                  <span className="geo-eyebrow">PAMIĄTKI Z BADAŃ</span>
                  <h1>Twoja kolekcja odkryć</h1>
                  <p>
                    Odznaka za co najmniej 5 poprawnych odpowiedzi w jednej
                    próbie.
                  </p>
                </div>
                <span className="geo-lesson-badge">
                  <GeoIcon name="star" size={38} />
                </span>
              </div>
              <div className="geo-badges">
                {MISSIONS.map((m, i) => {
                  const unlocked = (progress[m.id]?.best ?? 0) >= 5;
                  return (
                    <article key={m.id} className={unlocked ? "earned" : ""}>
                      <div className="geo-badge-medal">
                        <GeoIcon name={ICONS[i]} size={42} />
                      </div>
                      <span className="geo-eyebrow">
                        {unlocked ? "ZDOBYTA" : "DO ODKRYCIA"}
                      </span>
                      <h2>{m.badge}</h2>
                      <p>{m.title}</p>
                      <strong>
                        {progress[m.id]
                          ? `Najlepszy wynik: ${progress[m.id]?.best}/6`
                          : "Czeka na twoją misję"}
                      </strong>
                      <button
                        className="geo-button secondary"
                        disabled={!allowed.includes(m.id)}
                        onClick={() => go("lesson", m)}
                      >
                        Otwórz misję
                      </button>
                    </article>
                  );
                })}
              </div>
              <section className="geo-points-rules">
                <h2>Jak zbierasz punkty?</h2>
                <p>
                  Każda poprawna odpowiedź to 10 punktów. Pierwsze ukończenie
                  każdej misji daje dodatkowe 20 punktów. Liczymy najlepszy
                  wynik z każdej misji — kolejne próby dodają punkty tylko za
                  poprawę. Maksimum: 400 punktów.
                </p>
                <div className="geo-ranks">
                  {[
                    ["0", "Młody obserwator"],
                    ["60", "Badacz"],
                    ["200", "Przyrodnik"],
                    ["350", "Znawca życia"],
                  ].map(([n, label]) => (
                    <span key={n}>
                      <b>{n} pkt</b>
                      {label}
                    </span>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
        <footer className="geo-footer">
          <span>polymath / notatnik przyrodnika</span>
          <span>Materiały autorskie · podstawy biologii · klasa 5</span>
          <small>
            {preview
              ? "Postępy na tym urządzeniu"
              : "Wyniki na koncie · punkty także na tym urządzeniu"}
          </small>
        </footer>
      </div>
    </div>
  );
}

function BiologyQuiz({
  mission,
  preview,
  onFinish,
  onLeave,
  onDone,
}: {
  mission: Mission;
  preview: boolean;
  onFinish: (id: MissionId, score: number) => number;
  onLeave: () => void;
  onDone: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [done, setDone] = useState(false);
  const [delta, setDelta] = useState(0);
  const [saveState, setSaveState] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const start = useRef(0);
  const attempt = useRef("");
  const elapsed = useRef(0);
  const finished = useRef(false);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    start.current = Date.now();
    attempt.current = crypto.randomUUID();
  }, []);
  const q = mission.questions[index];
  const score = answers.filter(
    (a, i) => a === mission.questions[i].correct,
  ).length;
  const save = async (allAnswers: number[]) => {
    if (preview) return;
    setSaveState("saving");
    try {
      await saveBiologyAttempt(
        mission.id,
        allAnswers,
        elapsed.current,
        attempt.current,
      );
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  };
  const complete = () => {
    if (finished.current) return;
    finished.current = true;
    elapsed.current = Math.round((Date.now() - start.current) / 1000);
    const result = gradeAttempt(mission.id, answers, elapsed.current);
    setDelta(onFinish(mission.id, result.score));
    setDone(true);
    void save(answers);
  };
  if (done)
    return (
      <section className="geo-results">
        <span className="geo-result-medal">
          <GeoIcon name={score >= 5 ? "star" : "compass"} size={54} />
        </span>
        <span className="geo-eyebrow">MISJA {mission.number} UKOŃCZONA</span>
        <h1>
          {score >= 5
            ? "Pięknie odkrywasz świat!"
            : "Każda próba uczy czegoś nowego."}
        </h1>
        <p>{mission.title}</p>
        <div className="geo-result-stats">
          <div>
            <strong>
              {score}
              <small>/6</small>
            </strong>
            <span>poprawnych odpowiedzi</span>
          </div>
          <div>
            <strong>+{delta}</strong>
            <span>punktów do kolekcji</span>
          </div>
        </div>
        {score >= 5 ? (
          <p className="geo-earned-label">✧ Odznaka: {mission.badge}</p>
        ) : (
          <p>
            Do odznaki potrzeba 5/6. Wróć do pracowni i spróbuj jeszcze raz —
            najlepszy wynik zostaje.
          </p>
        )}
        {delta === 0 && (
          <p className="geo-caption">
            Ta próba nie poprawiła najlepszego wyniku. Twoje zdobyte punkty
            zostają.
          </p>
        )}
        <p role="status" className="geo-save-status">
          {preview
            ? "Wynik zapisany w lokalnym notatniku tej przeglądarki."
            : saveState === "saving"
              ? "Zapisujemy wynik na koncie…"
              : saveState === "saved"
                ? "Wynik zapisany. Znajdziesz go także w „Moich postępach”."
                : saveState === "error"
                  ? "Nie udało się zapisać wyniku na koncie. Lokalne punkty zostały zachowane."
                  : ""}
        </p>
        {saveState === "error" && (
          <button
            className="geo-button secondary"
            onClick={() => void save(answers)}
          >
            Ponów zapis wyniku
          </button>
        )}
        <button
          className="geo-button"
          onClick={onDone}
          disabled={saveState === "saving"}
        >
          Wróć do laboratorium
          <GeoIcon name="arrow" size={18} />
        </button>
        <div className="geo-review">
          <h2>Co zabierasz z tej misji?</h2>
          {mission.questions.map((item, i) => (
            <details key={item.id}>
              <summary>
                <span
                  className={
                    answers[i] === item.correct
                      ? "geo-correct-mark"
                      : "geo-wrong-mark"
                  }
                >
                  {answers[i] === item.correct ? "✓" : "↺"}
                </span>
                {item.prompt}
              </summary>
              <div>
                {item.visual && <QuestionIllustration kind={item.visual} />}
                <p>
                  Twoja odpowiedź: <strong>{item.options[answers[i]]}</strong>
                </p>
                <p>
                  Poprawna odpowiedź:{" "}
                  <strong>{item.options[item.correct]}</strong>
                </p>
                <p>{item.explanation}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    );
  return (
    <section className="geo-quiz">
      <button className="geo-back" onClick={onLeave}>
        ← Wróć do materiału
      </button>
      <div className="geo-quiz-heading">
        <span className="geo-eyebrow">
          MISJA {mission.number} · SPRAWDŹ SIĘ
        </span>
        <span>
          {index + 1} / {mission.questions.length}
        </span>
      </div>
      <progress
        value={index + (checked ? 1 : 0)}
        max={mission.questions.length}
      />
      <div className="geo-question-card">
        <span className="geo-question-label">PYTANIE {index + 1}</span>
        <h1 ref={questionHeading} tabIndex={-1}>
          {q.prompt}
        </h1>
        {q.visual && (
          <div className="geo-question-visual">
            <QuestionIllustration kind={q.visual} />
          </div>
        )}
        <div
          className="geo-options"
          role="group"
          aria-label="Wybierz odpowiedź"
        >
          {q.options.map((option, i) => (
            <button
              key={option}
              aria-pressed={choice === i}
              disabled={checked}
              className={`${choice === i ? "selected" : ""} ${checked && i === q.correct ? "correct" : ""} ${checked && choice === i && i !== q.correct ? "incorrect" : ""}`}
              onClick={() => setChoice(i)}
            >
              <span>{String.fromCharCode(65 + i)}</span>
              {option}
              {checked && i === q.correct && <GeoIcon name="check" size={20} />}
            </button>
          ))}
        </div>
        {checked && (
          <div
            role="status"
            className={`geo-feedback ${choice === q.correct ? "correct" : "incorrect"}`}
          >
            <strong>
              {choice === q.correct
                ? "Dobra odpowiedź!"
                : "Jeszcze jeden krok do zrozumienia."}
            </strong>
            <p>{q.explanation}</p>
          </div>
        )}
        <div className="geo-question-footer">
          <span>Bez pośpiechu. Masz czas na pomyślenie.</span>
          {!checked ? (
            <button
              className="geo-button"
              disabled={choice === null}
              onClick={() => {
                if (choice !== null) {
                  setAnswers([...answers, choice]);
                  setChecked(true);
                }
              }}
            >
              Sprawdź odpowiedź
            </button>
          ) : index < mission.questions.length - 1 ? (
            <button
              className="geo-button"
              onClick={() => {
                setIndex(index + 1);
                setChoice(null);
                setChecked(false);
                requestAnimationFrame(() => questionHeading.current?.focus());
              }}
            >
              Następne pytanie
              <GeoIcon name="arrow" size={17} />
            </button>
          ) : (
            <button className="geo-button" onClick={complete}>
              Zobacz wynik
              <GeoIcon name="star" size={17} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
