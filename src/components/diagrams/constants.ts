/**
 * Shared geometry and colors for the diagram renderer.
 *
 * Keeping these centralized means every scene speaks the same visual
 * language, and tests can import the same numbers the components render with.
 */

export const CANVAS = {
  size: 400,
  center: 200,
} as const;

/** Width of a single vehicle lane, in SVG units. */
export const LANE_WIDTH = 26;

/** Width of the (bidirectional) cycling lane strip. */
export const CYCLING_LANE_WIDTH = 14;

/** Width of a pedestrian sidewalk strip. */
export const SIDEWALK_WIDTH = 16;

/** Vehicle body dimensions (length along travel axis x width across it). */
export const VEHICLE_SIZE: Record<string, { length: number; width: number }> = {
  car: { length: 22, width: 12 },
  bicycle: { length: 12, width: 6 },
  truck: { length: 32, width: 14 },
  bus: { length: 34, width: 14 },
  motorcycle: { length: 14, width: 6 },
  tram: { length: 40, width: 14 },
};

export const COLORS = {
  asphalt: '#3f3f46',
  asphaltEdge: '#27272a',
  laneLine: '#fafafa',
  centerLineYellow: '#fde047',
  sidewalk: '#d4d4d8',
  sidewalkEdge: '#a1a1aa',
  cyclingLane: '#b91c1c',
  cyclingLaneLine: '#fecaca',
  grass: '#e4e4e7',
  arrow: '#1e293b',
  vehicle: {
    car: '#2563eb',
    bicycle: '#16a34a',
    truck: '#ea580c',
    bus: '#ca8a04',
    motorcycle: '#7c3aed',
    tram: '#be185d',
  } as Record<string, string>,
  light: {
    red: '#dc2626',
    yellow: '#eab308',
    green: '#16a34a',
    off: '#52525b',
  },
  signStop: '#dc2626',
  signWarning: '#fbbf24',
  signPriority: '#facc15',
  label: '#0f172a',
  labelBackground: '#fef3c7',
} as const;

/**
 * Compute the full width of a carriageway given its config. Returned value
 * is inclusive of cycling-lane and sidewalk strips on both sides.
 */
export function roadFullWidth(config: {
  lanesPerDirection: number;
  oneWay?: boolean;
  cyclingLane?: boolean;
  sidewalk?: 'both' | 'right' | 'left' | 'none';
}): number {
  const directions = config.oneWay ? 1 : 2;
  const totalLanes = config.lanesPerDirection * directions;
  let width = totalLanes * LANE_WIDTH;
  if (config.cyclingLane) width += CYCLING_LANE_WIDTH * directions;
  const sw = config.sidewalk ?? 'none';
  if (sw === 'both') width += SIDEWALK_WIDTH * 2;
  else if (sw === 'left' || sw === 'right') width += SIDEWALK_WIDTH;
  return width;
}

/** Degrees of SVG rotation that point "north" for each direction arm. */
export const ARM_ROTATION: Record<'N' | 'E' | 'S' | 'W', number> = {
  N: 0,
  E: 90,
  S: 180,
  W: 270,
};

/** Unit vector (dx, dy) pointing outward from center for each arm. */
export const ARM_VECTOR: Record<'N' | 'E' | 'S' | 'W', { dx: number; dy: number }> = {
  N: { dx: 0, dy: -1 },
  E: { dx: 1, dy: 0 },
  S: { dx: 0, dy: 1 },
  W: { dx: -1, dy: 0 },
};
