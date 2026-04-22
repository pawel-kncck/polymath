import { COLORS, LANE_WIDTH, roadFullWidth } from '../constants';
import type { Direction, RoadConfig } from '../types';

interface IntersectionBodyProps {
  cx: number;
  cy: number;
  arms: Partial<Record<Direction, RoadConfig>>;
}

/**
 * The asphalt "plus" that joins the arms. We draw two crossing rectangles
 * sized to each pair of arms so the junction covers the inner ends of
 * every RoadSegment cleanly regardless of arm-width asymmetry.
 */
export function IntersectionBody({ cx, cy, arms }: IntersectionBodyProps) {
  const defaultRoad: RoadConfig = { lanesPerDirection: 1 };
  const ewWidth = Math.max(
    roadFullWidth(arms.E ?? defaultRoad),
    roadFullWidth(arms.W ?? defaultRoad)
  );
  const nsWidth = Math.max(
    roadFullWidth(arms.N ?? defaultRoad),
    roadFullWidth(arms.S ?? defaultRoad)
  );
  const nsCarriageway = Math.max(
    carriagewayWidth(arms.N),
    carriagewayWidth(arms.S),
    LANE_WIDTH * 2
  );
  const ewCarriageway = Math.max(
    carriagewayWidth(arms.E),
    carriagewayWidth(arms.W),
    LANE_WIDTH * 2
  );

  return (
    <g>
      <rect
        x={cx - ewWidth / 2}
        y={cy - nsCarriageway / 2}
        width={ewWidth}
        height={nsCarriageway}
        fill={COLORS.asphalt}
      />
      <rect
        x={cx - ewCarriageway / 2}
        y={cy - nsWidth / 2}
        width={ewCarriageway}
        height={nsWidth}
        fill={COLORS.asphalt}
      />
    </g>
  );
}

function carriagewayWidth(c: RoadConfig | undefined): number {
  if (!c) return 0;
  const dirs = c.oneWay ? 1 : 2;
  return c.lanesPerDirection * LANE_WIDTH * dirs;
}
