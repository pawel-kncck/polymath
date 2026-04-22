import { COLORS } from '../constants';

export type SignKind =
  | 'priority'      // D-1 "droga z pierwszeństwem" (yellow diamond)
  | 'yield'         // A-7 "ustąp pierwszeństwa" (red inverted triangle)
  | 'stop'          // B-20 STOP (red octagon)
  | 'warning'       // generic A-series triangle
  | 'prohibition'   // generic B-series (red-bordered circle)
  | 'mandatory'     // generic C-series (blue circle)
  | 'info';         // generic D-series (blue rectangle)

interface TrafficSignProps {
  x: number;
  y: number;
  kind: SignKind;
  /** Short label drawn inside the sign, e.g. "STOP", "3.5t", "➜". */
  text?: string;
  size?: number;
}

/**
 * Minimal vector representation of a Polish road sign. These are
 * placeholders for in-diagram context (e.g., showing that an arm has a
 * STOP sign), not full-fidelity reproductions — those will come later as
 * embedded Wikimedia SVGs.
 */
export function TrafficSign({ x, y, kind, text, size = 18 }: TrafficSignProps) {
  const shape = renderShape(kind, size);
  return (
    <g transform={`translate(${x} ${y})`}>
      {shape}
      {text && (
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={kind === 'stop' ? 6 : 7}
          fontWeight={700}
          fill={textColor(kind)}
          y={0.5}
        >
          {text}
        </text>
      )}
    </g>
  );
}

function renderShape(kind: SignKind, size: number) {
  const r = size / 2;
  switch (kind) {
    case 'stop':
      return (
        <polygon
          points={octagonPoints(r)}
          fill={COLORS.signStop}
          stroke="#fff"
          strokeWidth={1.2}
        />
      );
    case 'yield':
      return (
        <polygon
          points={`0,${r} ${-r},${-r * 0.6} ${r},${-r * 0.6}`}
          fill="#fff"
          stroke={COLORS.signStop}
          strokeWidth={2.5}
        />
      );
    case 'priority':
      return (
        <polygon
          points={`0,${-r} ${r},0 0,${r} ${-r},0`}
          fill={COLORS.signPriority}
          stroke="#0f172a"
          strokeWidth={1.2}
        />
      );
    case 'warning':
      return (
        <polygon
          points={`0,${-r} ${r * 0.95},${r * 0.7} ${-r * 0.95},${r * 0.7}`}
          fill={COLORS.signWarning}
          stroke={COLORS.signStop}
          strokeWidth={1.5}
        />
      );
    case 'prohibition':
      return (
        <circle r={r} fill="#fff" stroke={COLORS.signStop} strokeWidth={2.2} />
      );
    case 'mandatory':
      return <circle r={r} fill="#1d4ed8" stroke="#fff" strokeWidth={1} />;
    case 'info':
      return (
        <rect
          x={-r}
          y={-r * 0.75}
          width={size}
          height={r * 1.5}
          fill="#1d4ed8"
          stroke="#fff"
          strokeWidth={1}
        />
      );
  }
}

function textColor(kind: SignKind): string {
  if (kind === 'mandatory' || kind === 'info' || kind === 'stop') return '#fff';
  return '#0f172a';
}

function octagonPoints(r: number): string {
  const k = r * Math.SQRT1_2;
  const pts = [
    [-k, -r], [k, -r],
    [r, -k], [r, k],
    [k, r], [-k, r],
    [-r, k], [-r, -k],
  ];
  return pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
}
