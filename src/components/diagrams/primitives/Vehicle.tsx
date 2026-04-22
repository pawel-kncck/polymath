import { COLORS, VEHICLE_SIZE } from '../constants';
import type { Vehicle as VehicleData } from '../types';

interface VehicleProps {
  x: number;
  y: number;
  /** Rotation in degrees — 0 means vehicle is facing north. */
  rotation: number;
  vehicle: VehicleData;
}

/**
 * Draws a vehicle body at (x, y), rotated so it faces the given direction.
 * Shapes are drawn with their length along the local y-axis so rotation=0
 * renders as a north-facing vehicle.
 */
export function Vehicle({ x, y, rotation, vehicle }: VehicleProps) {
  const dim = VEHICLE_SIZE[vehicle.kind] ?? VEHICLE_SIZE.car;
  const fill = vehicle.color ?? COLORS.vehicle[vehicle.kind] ?? COLORS.vehicle.car;
  const { length, width } = dim;

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      {renderBody(vehicle.kind, length, width, fill)}
      {/* Front-of-vehicle indicator — a small white line at the head. */}
      <line
        x1={-width / 2 + 1}
        y1={-length / 2}
        x2={width / 2 - 1}
        y2={-length / 2}
        stroke="#f8fafc"
        strokeWidth={1.5}
      />
    </g>
  );
}

function renderBody(
  kind: VehicleData['kind'],
  length: number,
  width: number,
  fill: string
) {
  switch (kind) {
    case 'bicycle':
      return (
        <>
          <ellipse cx={0} cy={0} rx={width / 2} ry={length / 2} fill={fill} />
          <circle cx={0} cy={-length / 2 + 2} r={1.5} fill="#0f172a" />
          <circle cx={0} cy={length / 2 - 2} r={1.5} fill="#0f172a" />
        </>
      );
    case 'motorcycle':
      return (
        <rect
          x={-width / 2}
          y={-length / 2}
          width={width}
          height={length}
          rx={2}
          fill={fill}
        />
      );
    case 'truck':
    case 'bus':
      return (
        <>
          <rect
            x={-width / 2}
            y={-length / 2}
            width={width}
            height={length}
            rx={1.5}
            fill={fill}
            stroke="#0f172a"
            strokeWidth={0.75}
          />
          <line
            x1={-width / 2}
            y1={-length / 2 + length * 0.25}
            x2={width / 2}
            y2={-length / 2 + length * 0.25}
            stroke="#0f172a"
            strokeWidth={0.75}
          />
        </>
      );
    case 'tram':
      return (
        <rect
          x={-width / 2}
          y={-length / 2}
          width={width}
          height={length}
          rx={2}
          fill={fill}
          stroke="#0f172a"
          strokeWidth={0.75}
        />
      );
    case 'car':
    default:
      return (
        <>
          <rect
            x={-width / 2}
            y={-length / 2}
            width={width}
            height={length}
            rx={3}
            fill={fill}
            stroke="#0f172a"
            strokeWidth={0.75}
          />
          {/* Windshield hint */}
          <rect
            x={-width / 2 + 1.5}
            y={-length / 2 + 3}
            width={width - 3}
            height={4}
            fill="#0f172a"
            opacity={0.35}
          />
        </>
      );
  }
}
