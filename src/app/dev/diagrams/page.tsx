import { requireAuth } from '@/lib/auth-utils';
import { SceneRenderer } from '@/components/diagrams';
import type { Scene } from '@/components/diagrams';

export const metadata = { title: 'Diagram renderer – dev' };

/**
 * Visual catalog of road/intersection scenes. Useful for eyeballing the
 * renderer while authoring questions. Protected by login; not linked from
 * the main nav.
 */
export default async function DiagramsDevPage() {
  await requireAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Diagram renderer – katalog scen
        </h1>
        <p className="mb-8 max-w-2xl text-sm text-gray-600 dark:text-gray-400">
          Strona deweloperska do wizualnej weryfikacji rendererera schematów
          drogowych. Każda scena jest opisana deklaratywnie (JSON), a komponent
          SceneRenderer rysuje ją jako SVG.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SCENES.map(({ title, scene }, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
              <SceneRenderer scene={scene} size={320} ariaLabel={title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SCENES: { title: string; scene: Scene }[] = [
  {
    title: 'Droga 1+1 bez pasa rowerowego (N-S)',
    scene: {
      kind: 'straight',
      orientation: 'N-S',
      road: { lanesPerDirection: 1, sidewalk: 'both' },
      caption: 'Dwukierunkowa, po jednym pasie w każdą stronę',
    },
  },
  {
    title: 'Droga 1+1 z pasem rowerowym',
    scene: {
      kind: 'straight',
      orientation: 'N-S',
      road: { lanesPerDirection: 1, cyclingLane: true, sidewalk: 'both' },
      vehicles: [
        { kind: 'bicycle', arm: 'S', distance: 0.4, facing: 'N' },
        { kind: 'car', arm: 'N', distance: 0.3, facing: 'S' },
      ],
      caption: 'Jezdnia z wydzielonym pasem dla rowerów',
    },
  },
  {
    title: 'Droga 2+2 (E-W)',
    scene: {
      kind: 'straight',
      orientation: 'E-W',
      road: { lanesPerDirection: 2, sidewalk: 'both' },
      vehicles: [
        { kind: 'car', arm: 'W', distance: 0.4, facing: 'E', lane: 0, label: 'A' },
        { kind: 'truck', arm: 'E', distance: 0.3, facing: 'W', lane: 1, label: 'B' },
      ],
      caption: 'Dwa pasy w każdą stronę',
    },
  },
  {
    title: 'Droga jednokierunkowa 1 pas + rower',
    scene: {
      kind: 'straight',
      orientation: 'N-S',
      road: {
        lanesPerDirection: 1,
        oneWay: true,
        cyclingLane: true,
        sidewalk: 'both',
      },
      vehicles: [
        { kind: 'car', arm: 'S', distance: 0.5, facing: 'N' },
        { kind: 'bicycle', arm: 'S', distance: 0.3, facing: 'N' },
      ],
      caption: 'Jednokierunkowa z pasem rowerowym',
    },
  },
  {
    title: 'Skrzyżowanie równorzędne (bez znaków)',
    scene: {
      kind: 'intersection-4way',
      arms: {
        N: { lanesPerDirection: 1, sidewalk: 'both' },
        E: { lanesPerDirection: 1, sidewalk: 'both' },
        S: { lanesPerDirection: 1, sidewalk: 'both' },
        W: { lanesPerDirection: 1, sidewalk: 'both' },
      },
      vehicles: [
        { kind: 'car', arm: 'S', facing: 'N', intent: 'straight', label: 'A' },
        { kind: 'car', arm: 'W', facing: 'E', intent: 'straight', label: 'B' },
        { kind: 'bicycle', arm: 'N', facing: 'S', intent: 'right', label: 'C' },
      ],
      caption: 'Zasada prawej ręki — kto jedzie pierwszy?',
    },
  },
  {
    title: 'Skrzyżowanie z drogą z pierwszeństwem (N-S)',
    scene: {
      kind: 'intersection-4way',
      arms: {
        N: { lanesPerDirection: 1, sidewalk: 'both', priority: true },
        S: { lanesPerDirection: 1, sidewalk: 'both', priority: true },
        E: { lanesPerDirection: 1, sidewalk: 'both', yield: true },
        W: { lanesPerDirection: 1, sidewalk: 'both', yield: true },
      },
      vehicles: [
        { kind: 'car', arm: 'N', facing: 'S', intent: 'straight', label: 'A' },
        { kind: 'car', arm: 'W', facing: 'E', intent: 'left', label: 'B' },
      ],
      caption: 'Pion ma pierwszeństwo, poziom ustępuje',
    },
  },
  {
    title: 'Skrzyżowanie z sygnalizacją',
    scene: {
      kind: 'intersection-4way',
      arms: {
        N: { lanesPerDirection: 2, sidewalk: 'both', cyclingLane: true },
        E: { lanesPerDirection: 2, sidewalk: 'both' },
        S: { lanesPerDirection: 2, sidewalk: 'both', cyclingLane: true },
        W: { lanesPerDirection: 2, sidewalk: 'both' },
      },
      lights: { N: 'red', S: 'red', E: 'green', W: 'green' },
      vehicles: [
        { kind: 'bicycle', arm: 'S', facing: 'N', intent: 'straight', label: 'R' },
        { kind: 'car', arm: 'W', facing: 'E', intent: 'left' },
      ],
      caption: 'Duże skrzyżowanie miejskie',
    },
  },
  {
    title: 'Skrzyżowanie T (brak ramienia S)',
    scene: {
      kind: 'intersection-t',
      missingArm: 'S',
      arms: {
        N: { lanesPerDirection: 1, sidewalk: 'both', priority: true },
        E: { lanesPerDirection: 1, sidewalk: 'both', priority: true },
        W: { lanesPerDirection: 1, sidewalk: 'both', yield: true },
      },
      vehicles: [
        { kind: 'car', arm: 'W', facing: 'E', intent: 'right', label: 'A' },
        { kind: 'car', arm: 'E', facing: 'W', intent: 'straight', label: 'B' },
      ],
    },
  },
  {
    title: 'Rondo (4 zjazdy)',
    scene: {
      kind: 'roundabout',
      armDirections: ['N', 'E', 'S', 'W'],
      arms: {
        N: { lanesPerDirection: 1, sidewalk: 'both' },
        E: { lanesPerDirection: 1, sidewalk: 'both' },
        S: { lanesPerDirection: 1, sidewalk: 'both' },
        W: { lanesPerDirection: 1, sidewalk: 'both' },
      },
      vehicles: [
        { kind: 'car', arm: 'S', facing: 'N', intent: 'left', label: 'A' },
        { kind: 'bicycle', arm: 'E', facing: 'W', intent: 'straight', label: 'B' },
      ],
      caption: 'Wjeżdżający ustępuje pojazdom na rondzie',
    },
  },
];
