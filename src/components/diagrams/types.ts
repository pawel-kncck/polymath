/**
 * Type system for declarative road/intersection diagrams.
 *
 * Scenes are pure data. A scene is rendered by <SceneRenderer />, which
 * dispatches to the concrete scene component (StraightRoadScene,
 * FourWayIntersectionScene, TJunctionScene, RoundaboutScene).
 *
 * Coordinate system: SVG viewBox is 0 0 400 400, origin top-left.
 * Center of the canvas is (200, 200). North is up (y decreases).
 */

export type Direction = 'N' | 'E' | 'S' | 'W';

export type VehicleKind = 'car' | 'bicycle' | 'truck' | 'bus' | 'motorcycle' | 'tram';

/**
 * Describes one approach arm (a straight piece of road) of an intersection,
 * or — when used as the sole road in a StraightRoadScene — a full road.
 */
export type RoadConfig = {
  /** Lanes per direction (not counting cycling lane or sidewalk). */
  lanesPerDirection: 1 | 2 | 3;
  /** One-way road: traffic moves in only the outbound direction. */
  oneWay?: boolean;
  /** Red-painted cycling lane at the right edge of the carriageway. */
  cyclingLane?: boolean;
  /** Gray pedestrian sidewalks on the specified sides. */
  sidewalk?: 'both' | 'right' | 'left' | 'none';
  /** Road-with-priority ("droga z pierwszeństwem") — adds a D-1 sign placeholder. */
  priority?: boolean;
  /** Subordinate road — adds an A-7 "ustąp pierwszeństwa" sign placeholder. */
  yield?: boolean;
  /** Stop sign — adds a B-20 sign placeholder. */
  stop?: boolean;
};

/**
 * A vehicle placed somewhere in the scene. Position is described relative
 * to a logical anchor (an arm of an intersection, or the road itself), so
 * the same spec looks right regardless of scene size or layout.
 */
export type Vehicle = {
  kind: VehicleKind;
  /** Which approach arm the vehicle sits on. For StraightRoadScene pass the
   *  road orientation's "inbound" end (e.g. 'S' on an N-S road means the
   *  vehicle is near the bottom, heading up). */
  arm: Direction;
  /** Distance from the intersection center along the arm (0 = at center,
   *  1 = at the far end of the arm). Defaults to 0.5. */
  distance?: number;
  /** Which lane (0 = closest to center line, growing outward). Defaults to 0. */
  lane?: number;
  /** Direction the vehicle is facing. Defaults to pointing toward center. */
  facing?: Direction;
  /** Intended next move, rendered as a curved arrow. */
  intent?: 'straight' | 'left' | 'right' | 'u-turn';
  /** Short label shown next to the vehicle (e.g. "A", "B", "1"). */
  label?: string;
  /** Override body color (default depends on kind). */
  color?: string;
};

export type TrafficLightState = 'red' | 'yellow' | 'green' | 'red-yellow' | 'flashing-yellow' | 'off';

export type StraightRoadScene = {
  kind: 'straight';
  /** Orientation of the road across the canvas. */
  orientation: 'N-S' | 'E-W';
  road: RoadConfig;
  vehicles?: Vehicle[];
  /** Free-text caption rendered below the diagram. */
  caption?: string;
};

export type FourWayIntersectionScene = {
  kind: 'intersection-4way';
  /** Road config per arm. If an arm is omitted, it uses a default 1-lane arm. */
  arms: Partial<Record<Direction, RoadConfig>>;
  /** Optional traffic light state per arm. */
  lights?: Partial<Record<Direction, TrafficLightState>>;
  vehicles?: Vehicle[];
  caption?: string;
};

export type TJunctionScene = {
  kind: 'intersection-t';
  /** Which arm is missing (the T opens away from this direction). */
  missingArm: Direction;
  arms: Partial<Record<Direction, RoadConfig>>;
  lights?: Partial<Record<Direction, TrafficLightState>>;
  vehicles?: Vehicle[];
  caption?: string;
};

export type RoundaboutScene = {
  kind: 'roundabout';
  /** Which arms exist around the central island. */
  armDirections: Direction[];
  arms?: Partial<Record<Direction, RoadConfig>>;
  vehicles?: Vehicle[];
  caption?: string;
};

export type Scene =
  | StraightRoadScene
  | FourWayIntersectionScene
  | TJunctionScene
  | RoundaboutScene;
