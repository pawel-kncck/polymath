import { CANVAS, COLORS } from '../constants';
import { placeVehicle } from '../geometry';
import { RoadSegment } from '../primitives/RoadSegment';
import { Vehicle } from '../primitives/Vehicle';
import { VehicleIntent } from '../primitives/VehicleIntent';
import { VehicleLabel } from '../primitives/VehicleLabel';
import type { StraightRoadScene as StraightRoadSceneData } from '../types';

interface StraightRoadSceneProps {
  scene: StraightRoadSceneData;
}

/**
 * A single straight road filling the canvas. Rotation is 0 for N-S (default
 * road axis is vertical), 90 for E-W.
 */
export function StraightRoadScene({ scene }: StraightRoadSceneProps) {
  const rotation = scene.orientation === 'N-S' ? 0 : 90;
  const length = CANVAS.size;

  return (
    <g>
      <rect
        x={0}
        y={0}
        width={CANVAS.size}
        height={CANVAS.size}
        fill={COLORS.grass}
      />
      <RoadSegment
        cx={CANVAS.center}
        cy={CANVAS.center}
        length={length}
        rotation={rotation}
        config={scene.road}
      />
      {(scene.vehicles ?? []).map((v, i) => {
        // For a straight road, "arm" maps to: N or S if orientation N-S,
        // E or W if orientation E-W. armLength is canvas half.
        const armLength = CANVAS.size / 2 - 10;
        const p = placeVehicle(
          v,
          armLength,
          scene.road,
          CANVAS.center,
          CANVAS.center
        );
        return (
          <g key={i}>
            <Vehicle x={p.x} y={p.y} rotation={p.rotation} vehicle={v} />
            {v.intent && (
              <VehicleIntent x={p.x} y={p.y} rotation={p.rotation} intent={v.intent} />
            )}
            {v.label && (
              <VehicleLabel x={p.x + 18} y={p.y - 14} label={v.label} />
            )}
          </g>
        );
      })}
    </g>
  );
}
