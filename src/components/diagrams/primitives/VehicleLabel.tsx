import { COLORS } from '../constants';

interface VehicleLabelProps {
  x: number;
  y: number;
  label: string;
}

/**
 * Small circular badge with a character (e.g. "A") used to reference
 * specific vehicles from a question ("Who goes first, A or B?").
 */
export function VehicleLabel({ x, y, label }: VehicleLabelProps) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={8} fill={COLORS.labelBackground} stroke={COLORS.label} strokeWidth={1.2} />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={11}
        fontWeight={700}
        fill={COLORS.label}
      >
        {label}
      </text>
    </g>
  );
}
