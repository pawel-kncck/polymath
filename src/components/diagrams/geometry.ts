import {
  ARM_VECTOR,
  CYCLING_LANE_WIDTH,
  LANE_WIDTH,
  SIDEWALK_WIDTH,
} from './constants';
import type { Direction, RoadConfig, Vehicle } from './types';

export const OPPOSITE_DIRECTION: Record<Direction, Direction> = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E',
};

/**
 * Given an arm direction, return the "outbound right" perpendicular unit
 * vector — i.e. the lateral direction that, in right-hand traffic, is the
 * driver's right when leaving the intersection along this arm.
 *
 * This equals a 90° clockwise rotation of the arm vector in screen coords
 * (y-axis pointing down), which works out to (dx, dy) → (-dy, dx).
 */
export function outboundRightPerp(arm: Direction): { dx: number; dy: number } {
  const v = ARM_VECTOR[arm];
  return { dx: -v.dy, dy: v.dx };
}

/**
 * Compute the SVG position and rotation for a Vehicle on a given arm.
 *
 * `armLength` is the length of the arm in SVG units (from intersection
 * body edge to the far end of the arm). The center of the canvas is
 * `(centerX, centerY)`; the intersection is presumed to sit at that point.
 *
 * The returned rotation is in degrees, 0 meaning the vehicle points north.
 * Vehicle shapes are drawn "tall" (length along y when rotation=0), so a
 * vehicle facing north renders unrotated.
 */
export function placeVehicle(
  v: Vehicle,
  armLength: number,
  roadConfig: RoadConfig,
  centerX: number,
  centerY: number
): { x: number; y: number; rotation: number; facing: Direction } {
  const armVec = ARM_VECTOR[v.arm];
  const distance = v.distance ?? 0.5;
  const along = distance * armLength;

  const facing: Direction = v.facing ?? OPPOSITE_DIRECTION[v.arm];
  const outPerp = outboundRightPerp(v.arm);

  // Inbound means the vehicle is moving toward center (facing = opposite of arm).
  const inbound =
    ARM_VECTOR[facing].dx === -armVec.dx && ARM_VECTOR[facing].dy === -armVec.dy;
  const lateralSign = inbound ? -1 : 1;

  // Lane offset from center divider to vehicle center.
  // lane 0 is the innermost (closest to center divider); grows outward.
  const laneIndex = v.lane ?? defaultLane(v.kind, roadConfig);
  const baseOffset = (laneIndex + 0.5) * LANE_WIDTH;

  // Bicycles on the cycling lane sit further out than the outermost traffic lane.
  const onCyclingLane =
    v.kind === 'bicycle' && roadConfig.cyclingLane && laneIndex < 0;
  const cyclingOffset = onCyclingLane
    ? roadConfig.lanesPerDirection * LANE_WIDTH + CYCLING_LANE_WIDTH / 2
    : 0;
  const lateral = onCyclingLane ? cyclingOffset : baseOffset;

  const x = centerX + armVec.dx * along + outPerp.dx * lateral * lateralSign;
  const y = centerY + armVec.dy * along + outPerp.dy * lateral * lateralSign;

  const rotation = directionToRotation(facing);
  return { x, y, rotation, facing };
}

/**
 * Rotation (degrees) for a shape drawn pointing north at rotation=0.
 * N → 0, E → 90, S → 180, W → 270.
 */
export function directionToRotation(d: Direction): number {
  switch (d) {
    case 'N': return 0;
    case 'E': return 90;
    case 'S': return 180;
    case 'W': return 270;
  }
}

/**
 * Pick a sensible default lane for a vehicle kind:
 * - bicycles go on the cycling lane if one exists (lane = -1 marker),
 *   otherwise on the outermost traffic lane.
 * - all other vehicles default to the outermost lane (rightmost inbound).
 */
export function defaultLane(
  kind: Vehicle['kind'],
  roadConfig: RoadConfig
): number {
  if (kind === 'bicycle' && roadConfig.cyclingLane) return -1;
  return Math.max(0, roadConfig.lanesPerDirection - 1);
}

export { SIDEWALK_WIDTH };
