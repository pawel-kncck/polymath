import { ARM_ROTATION, ARM_VECTOR, CANVAS, COLORS, roadFullWidth } from '../constants';
import { placeVehicle } from '../geometry';
import { IntersectionBody } from '../primitives/IntersectionBody';
import { RoadSegment } from '../primitives/RoadSegment';
import { TrafficLight } from '../primitives/TrafficLight';
import { TrafficSign } from '../primitives/TrafficSign';
import { Vehicle } from '../primitives/Vehicle';
import { VehicleIntent } from '../primitives/VehicleIntent';
import { VehicleLabel } from '../primitives/VehicleLabel';
import type {
  Direction,
  FourWayIntersectionScene as FourWayIntersectionSceneData,
  RoadConfig,
} from '../types';

interface FourWayIntersectionSceneProps {
  scene: FourWayIntersectionSceneData;
}

const ALL_ARMS: Direction[] = ['N', 'E', 'S', 'W'];

export function FourWayIntersectionScene({ scene }: FourWayIntersectionSceneProps) {
  const defaultRoad: RoadConfig = { lanesPerDirection: 1 };
  const arms: Record<Direction, RoadConfig> = {
    N: scene.arms.N ?? defaultRoad,
    E: scene.arms.E ?? defaultRoad,
    S: scene.arms.S ?? defaultRoad,
    W: scene.arms.W ?? defaultRoad,
  };

  // Length of each arm (from intersection edge outward). The canvas half
  // minus a margin minus half of the perpendicular road's width (which the
  // intersection body occupies).
  const armLength = (direction: Direction) => {
    // Perpendicular body dimension along the arm axis is the width of the
    // perpendicular arms' roads.
    const perpendicular = direction === 'N' || direction === 'S' ? ['E', 'W'] : ['N', 'S'];
    const bodyExtent = Math.max(
      roadFullWidth(arms[perpendicular[0] as Direction]),
      roadFullWidth(arms[perpendicular[1] as Direction])
    );
    return CANVAS.center - bodyExtent / 2;
  };

  return (
    <g>
      <rect
        x={0}
        y={0}
        width={CANVAS.size}
        height={CANVAS.size}
        fill={COLORS.grass}
      />

      {/* Arms. Each arm is a RoadSegment starting from the body edge out to
          the canvas edge. */}
      {ALL_ARMS.map((dir) => {
        const len = armLength(dir);
        const bodyHalf = CANVAS.center - len;
        const v = ARM_VECTOR[dir];
        // Center of the arm segment = intersection body edge + len/2 along v.
        const cx = CANVAS.center + v.dx * (bodyHalf + len / 2);
        const cy = CANVAS.center + v.dy * (bodyHalf + len / 2);
        return (
          <RoadSegment
            key={dir}
            cx={cx}
            cy={cy}
            length={len}
            rotation={ARM_ROTATION[dir]}
            config={arms[dir]}
            trimCenterEnd
          />
        );
      })}

      <IntersectionBody cx={CANVAS.center} cy={CANVAS.center} arms={arms} />

      {/* Signs sit just outside the intersection body on the right of each
          arm's inbound carriageway. */}
      {ALL_ARMS.map((dir) => {
        const config = arms[dir];
        const signKind = config.stop
          ? 'stop'
          : config.yield
            ? 'yield'
            : config.priority
              ? 'priority'
              : null;
        if (!signKind) return null;
        // Place sign a bit outside the intersection body, on the right of
        // the inbound driver approaching along this arm.
        const bodyHalf = (CANVAS.size - armLength(dir) * 2) / 2;
        const armVec = ARM_VECTOR[dir];
        const outOffset = bodyHalf + 18;
        const lateralOffset = roadFullWidth(config) / 2 + 12;
        // Right-side of inbound driver = the outboundRightPerp direction (since
        // inbound reverses the sign, right-of-inbound = -outboundRightPerp).
        // For MVP we just put the sign on the "+perp" side, which is clearly
        // visible and unambiguous.
        const perp = { dx: -armVec.dy, dy: armVec.dx };
        const sx = CANVAS.center + armVec.dx * outOffset + perp.dx * lateralOffset;
        const sy = CANVAS.center + armVec.dy * outOffset + perp.dy * lateralOffset;
        return (
          <TrafficSign
            key={`sign-${dir}`}
            x={sx}
            y={sy}
            kind={signKind}
            text={signKind === 'stop' ? 'STOP' : undefined}
            size={20}
          />
        );
      })}

      {/* Traffic lights */}
      {ALL_ARMS.map((dir) => {
        const state = scene.lights?.[dir];
        if (!state) return null;
        const bodyHalf = (CANVAS.size - armLength(dir) * 2) / 2;
        const armVec = ARM_VECTOR[dir];
        const outOffset = bodyHalf + 14;
        const perp = { dx: -armVec.dy, dy: armVec.dx };
        const lateralOffset = roadFullWidth(arms[dir]) / 2 + 8;
        const lx = CANVAS.center + armVec.dx * outOffset + perp.dx * lateralOffset;
        const ly = CANVAS.center + armVec.dy * outOffset + perp.dy * lateralOffset;
        return (
          <TrafficLight
            key={`light-${dir}`}
            x={lx}
            y={ly}
            state={state}
          />
        );
      })}

      {/* Vehicles */}
      {(scene.vehicles ?? []).map((v, i) => {
        const roadConfig = arms[v.arm];
        const len = armLength(v.arm);
        const bodyHalf = CANVAS.center - len;
        // Treat distance=0 as the edge of the intersection body, distance=1
        // as the outer end of the arm, so users don't have to know body size.
        const distance = v.distance ?? 0.5;
        const armVec = ARM_VECTOR[v.arm];
        const armAnchorX = CANVAS.center + armVec.dx * bodyHalf;
        const armAnchorY = CANVAS.center + armVec.dy * bodyHalf;
        const p = placeVehicle(
          { ...v, distance: 1 },       // compute lateral offset using full arm
          0,                           // ... but no along-arm displacement
          roadConfig,
          armAnchorX,
          armAnchorY
        );
        // Now add the along-arm displacement manually:
        p.x += armVec.dx * distance * len;
        p.y += armVec.dy * distance * len;

        return (
          <g key={i}>
            <Vehicle x={p.x} y={p.y} rotation={p.rotation} vehicle={v} />
            {v.intent && (
              <VehicleIntent x={p.x} y={p.y} rotation={p.rotation} intent={v.intent} />
            )}
            {v.label && <VehicleLabel x={p.x + 16} y={p.y - 12} label={v.label} />}
          </g>
        );
      })}
    </g>
  );
}
