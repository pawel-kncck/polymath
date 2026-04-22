import { ARM_ROTATION, ARM_VECTOR, CANVAS, COLORS } from '../constants';
import { placeVehicle } from '../geometry';
import { RoadSegment } from '../primitives/RoadSegment';
import { Vehicle } from '../primitives/Vehicle';
import { VehicleIntent } from '../primitives/VehicleIntent';
import { VehicleLabel } from '../primitives/VehicleLabel';
import type {
  Direction,
  RoadConfig,
  RoundaboutScene as RoundaboutSceneData,
} from '../types';

interface RoundaboutSceneProps {
  scene: RoundaboutSceneData;
}

export function RoundaboutScene({ scene }: RoundaboutSceneProps) {
  const defaultRoad: RoadConfig = { lanesPerDirection: 1 };
  const outerRadius = 70;
  const islandRadius = 30;

  const armsConfig: Partial<Record<Direction, RoadConfig>> = {};
  for (const d of scene.armDirections) {
    armsConfig[d] = scene.arms?.[d] ?? defaultRoad;
  }

  const armLen = CANVAS.center - outerRadius;

  return (
    <g>
      <rect x={0} y={0} width={CANVAS.size} height={CANVAS.size} fill={COLORS.grass} />

      {/* Arm road segments */}
      {scene.armDirections.map((dir) => {
        const bodyHalf = CANVAS.center - armLen;
        const v = ARM_VECTOR[dir];
        const cx = CANVAS.center + v.dx * (bodyHalf + armLen / 2);
        const cy = CANVAS.center + v.dy * (bodyHalf + armLen / 2);
        return (
          <RoadSegment
            key={dir}
            cx={cx}
            cy={cy}
            length={armLen}
            rotation={ARM_ROTATION[dir]}
            config={armsConfig[dir] ?? defaultRoad}
            trimCenterEnd
          />
        );
      })}

      {/* Outer ring asphalt */}
      <circle
        cx={CANVAS.center}
        cy={CANVAS.center}
        r={outerRadius}
        fill={COLORS.asphalt}
      />
      {/* Center island (grass + curb) */}
      <circle
        cx={CANVAS.center}
        cy={CANVAS.center}
        r={islandRadius}
        fill={COLORS.grass}
        stroke={COLORS.sidewalkEdge}
        strokeWidth={1.5}
      />
      {/* Dashed lane line inside the ring if 2 lanes */}
      <circle
        cx={CANVAS.center}
        cy={CANVAS.center}
        r={(outerRadius + islandRadius) / 2}
        fill="none"
        stroke={COLORS.laneLine}
        strokeWidth={1}
        strokeDasharray="4 6"
        opacity={0.7}
      />
      {/* Directional arrows on the ring */}
      {[0, 90, 180, 270].map((deg) => (
        <g key={deg} transform={`translate(${CANVAS.center} ${CANVAS.center}) rotate(${deg})`}>
          <polygon
            points={`${(outerRadius + islandRadius) / 2},-6 ${(outerRadius + islandRadius) / 2 + 6},0 ${(outerRadius + islandRadius) / 2},6`}
            fill={COLORS.laneLine}
            opacity={0.8}
          />
        </g>
      ))}

      {/* Vehicles on arms (roundabout vehicles are rendered as if on straight arm) */}
      {(scene.vehicles ?? []).map((v, i) => {
        if (!scene.armDirections.includes(v.arm)) return null;
        const roadConfig = armsConfig[v.arm] ?? defaultRoad;
        const bodyHalf = CANVAS.center - armLen;
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
        p.x += armVec.dx * distance * armLen;
        p.y += armVec.dy * distance * armLen;

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
