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
  RoadConfig,
  TJunctionScene as TJunctionSceneData,
} from '../types';

interface TJunctionSceneProps {
  scene: TJunctionSceneData;
}

export function TJunctionScene({ scene }: TJunctionSceneProps) {
  const defaultRoad: RoadConfig = { lanesPerDirection: 1 };
  const activeArms: Direction[] = (['N', 'E', 'S', 'W'] as Direction[]).filter(
    (d) => d !== scene.missingArm
  );
  const arms: Partial<Record<Direction, RoadConfig>> = {};
  for (const d of activeArms) arms[d] = scene.arms[d] ?? defaultRoad;

  const armLength = (direction: Direction) => {
    const perpendicular = direction === 'N' || direction === 'S' ? ['E', 'W'] : ['N', 'S'];
    const bodyExtent = Math.max(
      ...perpendicular.map((p) => roadFullWidth(arms[p as Direction] ?? defaultRoad))
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

      {activeArms.map((dir) => {
        const len = armLength(dir);
        const bodyHalf = CANVAS.center - len;
        const v = ARM_VECTOR[dir];
        const cx = CANVAS.center + v.dx * (bodyHalf + len / 2);
        const cy = CANVAS.center + v.dy * (bodyHalf + len / 2);
        return (
          <RoadSegment
            key={dir}
            cx={cx}
            cy={cy}
            length={len}
            rotation={ARM_ROTATION[dir]}
            config={arms[dir] ?? defaultRoad}
            trimCenterEnd
          />
        );
      })}

      <IntersectionBody cx={CANVAS.center} cy={CANVAS.center} arms={arms} />

      {/* Signs */}
      {activeArms.map((dir) => {
        const config = arms[dir] ?? defaultRoad;
        const signKind = config.stop
          ? 'stop'
          : config.yield
            ? 'yield'
            : config.priority
              ? 'priority'
              : null;
        if (!signKind) return null;
        const bodyHalf = (CANVAS.size - armLength(dir) * 2) / 2;
        const armVec = ARM_VECTOR[dir];
        const perp = { dx: -armVec.dy, dy: armVec.dx };
        const outOffset = bodyHalf + 18;
        const lateralOffset = roadFullWidth(config) / 2 + 12;
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

      {/* Lights */}
      {activeArms.map((dir) => {
        const state = scene.lights?.[dir];
        if (!state) return null;
        const bodyHalf = (CANVAS.size - armLength(dir) * 2) / 2;
        const armVec = ARM_VECTOR[dir];
        const perp = { dx: -armVec.dy, dy: armVec.dx };
        const outOffset = bodyHalf + 14;
        const lateralOffset = roadFullWidth(arms[dir] ?? defaultRoad) / 2 + 8;
        const lx = CANVAS.center + armVec.dx * outOffset + perp.dx * lateralOffset;
        const ly = CANVAS.center + armVec.dy * outOffset + perp.dy * lateralOffset;
        return <TrafficLight key={`light-${dir}`} x={lx} y={ly} state={state} />;
      })}

      {/* Vehicles */}
      {(scene.vehicles ?? []).map((v, i) => {
        if (!activeArms.includes(v.arm)) return null;
        const roadConfig = arms[v.arm] ?? defaultRoad;
        const len = armLength(v.arm);
        const bodyHalf = CANVAS.center - len;
        const distance = v.distance ?? 0.5;
        const armVec = ARM_VECTOR[v.arm];
        const armAnchorX = CANVAS.center + armVec.dx * bodyHalf;
        const armAnchorY = CANVAS.center + armVec.dy * bodyHalf;
        const p = placeVehicle(
          { ...v, distance: 1 },
          0,
          roadConfig,
          armAnchorX,
          armAnchorY
        );
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
