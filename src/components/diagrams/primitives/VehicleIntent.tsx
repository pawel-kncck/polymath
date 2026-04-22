import type { Vehicle } from '../types';

interface VehicleIntentProps {
  x: number;
  y: number;
  rotation: number;
  intent: NonNullable<Vehicle['intent']>;
}

/**
 * Draws a curved arrow next to a vehicle showing its intended next move.
 * Coordinates are in the vehicle's local frame after rotation=0 (i.e., the
 * arrow is rotated together with the vehicle).
 */
export function VehicleIntent({ x, y, rotation, intent }: VehicleIntentProps) {
  const arrow = renderArrow(intent);
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      {arrow}
    </g>
  );
}

function renderArrow(intent: NonNullable<Vehicle['intent']>) {
  const stroke = '#f59e0b';
  const width = 2.5;
  const head = 4;

  switch (intent) {
    case 'straight':
      return (
        <>
          <line x1={0} y1={-14} x2={0} y2={-30} stroke={stroke} strokeWidth={width} strokeLinecap="round" />
          <polygon
            points={`0,-34 ${-head},-28 ${head},-28`}
            fill={stroke}
          />
        </>
      );
    case 'left':
      return (
        <>
          <path
            d="M 0 -14 Q 0 -26 -14 -26"
            fill="none"
            stroke={stroke}
            strokeWidth={width}
            strokeLinecap="round"
          />
          <polygon
            points={`-18,-26 -12,-30 -12,-22`}
            fill={stroke}
          />
        </>
      );
    case 'right':
      return (
        <>
          <path
            d="M 0 -14 Q 0 -26 14 -26"
            fill="none"
            stroke={stroke}
            strokeWidth={width}
            strokeLinecap="round"
          />
          <polygon
            points={`18,-26 12,-30 12,-22`}
            fill={stroke}
          />
        </>
      );
    case 'u-turn':
      return (
        <>
          <path
            d="M 0 -14 Q 0 -32 -16 -32 Q -16 -20 -10 -20"
            fill="none"
            stroke={stroke}
            strokeWidth={width}
            strokeLinecap="round"
          />
          <polygon
            points={`-10,-16 -6,-22 -14,-22`}
            fill={stroke}
          />
        </>
      );
  }
}
