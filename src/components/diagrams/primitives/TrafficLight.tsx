import { COLORS } from '../constants';
import type { TrafficLightState } from '../types';

interface TrafficLightProps {
  x: number;
  y: number;
  /** Rotation in degrees; the housing's long axis is vertical at 0. */
  rotation?: number;
  state: TrafficLightState;
}

/**
 * A small stylized traffic light icon. "red-yellow" lights both lamps.
 * "flashing-yellow" draws only yellow with a halo.
 */
export function TrafficLight({ x, y, rotation = 0, state }: TrafficLightProps) {
  const off = COLORS.light.off;
  const red = state === 'red' || state === 'red-yellow' ? COLORS.light.red : off;
  const yellow =
    state === 'yellow' || state === 'red-yellow' || state === 'flashing-yellow'
      ? COLORS.light.yellow
      : off;
  const green = state === 'green' ? COLORS.light.green : off;

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      <rect x={-5} y={-15} width={10} height={30} rx={2} fill="#1f2937" />
      <circle cx={0} cy={-10} r={3} fill={red} />
      <circle cx={0} cy={0} r={3} fill={yellow} />
      <circle cx={0} cy={10} r={3} fill={green} />
      {state === 'flashing-yellow' && (
        <circle cx={0} cy={0} r={6} fill="none" stroke={COLORS.light.yellow} strokeWidth={1} opacity={0.5} />
      )}
    </g>
  );
}
