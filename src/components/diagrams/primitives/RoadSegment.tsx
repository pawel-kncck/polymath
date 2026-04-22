import {
  COLORS,
  CYCLING_LANE_WIDTH,
  LANE_WIDTH,
  SIDEWALK_WIDTH,
  roadFullWidth,
} from '../constants';
import type { RoadConfig } from '../types';

interface RoadSegmentProps {
  /** Center of the segment on the canvas. */
  cx: number;
  cy: number;
  /** How long the segment is along its travel axis. */
  length: number;
  /** Rotation in degrees — 0 means travel axis points north-south. */
  rotation: number;
  config: RoadConfig;
  /** If true, hide the center divider line (used at intersection mouths). */
  hideCenterLine?: boolean;
  /** If true, the end toward the center of the canvas has no lane markings
   *  (stops short so intersection body covers it). */
  trimCenterEnd?: boolean;
}

/**
 * A straight piece of road, drawn as a vertical strip that is then rotated
 * around (cx, cy). The strip is centered on (cx, cy), with travel axis
 * vertical when rotation=0.
 */
export function RoadSegment({
  cx,
  cy,
  length,
  rotation,
  config,
  hideCenterLine,
  trimCenterEnd,
}: RoadSegmentProps) {
  const totalWidth = roadFullWidth(config);
  const directions = config.oneWay ? 1 : 2;
  const sw = config.sidewalk ?? 'none';
  const hasLeftSidewalk = sw === 'both' || sw === 'left';
  const hasRightSidewalk = sw === 'both' || sw === 'right';

  // Build strips from left edge to right edge (in segment-local coords,
  // where +x is right across the road).
  const halfLen = length / 2;
  const left = -totalWidth / 2;

  let cursor = left;
  const strips: React.ReactNode[] = [];

  if (hasLeftSidewalk) {
    strips.push(
      <rect
        key="sidewalk-l"
        x={cursor}
        y={-halfLen}
        width={SIDEWALK_WIDTH}
        height={length}
        fill={COLORS.sidewalk}
        stroke={COLORS.sidewalkEdge}
        strokeWidth={1}
      />
    );
    cursor += SIDEWALK_WIDTH;
  }

  // Cycling lane on the outbound right of each direction. For a 2-way road
  // with cycling lanes, one strip sits on each outer edge of the carriageway.
  if (config.cyclingLane && directions === 2) {
    strips.push(
      <rect
        key="cycle-l"
        x={cursor}
        y={-halfLen}
        width={CYCLING_LANE_WIDTH}
        height={length}
        fill={COLORS.cyclingLane}
      />
    );
    cursor += CYCLING_LANE_WIDTH;
  }

  const carriagewayLeft = cursor;
  const carriagewayWidth = config.lanesPerDirection * LANE_WIDTH * directions;

  strips.push(
    <rect
      key="asphalt"
      x={carriagewayLeft}
      y={-halfLen}
      width={carriagewayWidth}
      height={length}
      fill={COLORS.asphalt}
    />
  );
  cursor += carriagewayWidth;

  if (config.cyclingLane && directions === 2) {
    strips.push(
      <rect
        key="cycle-r"
        x={cursor}
        y={-halfLen}
        width={CYCLING_LANE_WIDTH}
        height={length}
        fill={COLORS.cyclingLane}
      />
    );
    cursor += CYCLING_LANE_WIDTH;
  } else if (config.cyclingLane && directions === 1) {
    // One-way street: cycling lane sits only on the right side.
    strips.push(
      <rect
        key="cycle-r"
        x={cursor}
        y={-halfLen}
        width={CYCLING_LANE_WIDTH}
        height={length}
        fill={COLORS.cyclingLane}
      />
    );
    cursor += CYCLING_LANE_WIDTH;
  }

  if (hasRightSidewalk) {
    strips.push(
      <rect
        key="sidewalk-r"
        x={cursor}
        y={-halfLen}
        width={SIDEWALK_WIDTH}
        height={length}
        fill={COLORS.sidewalk}
        stroke={COLORS.sidewalkEdge}
        strokeWidth={1}
      />
    );
  }

  // Lane markings inside the carriageway.
  const markings: React.ReactNode[] = [];
  const laneStart = carriagewayLeft;

  // Center divider (solid white) between opposing directions, when 2-way.
  if (!config.oneWay && !hideCenterLine) {
    const cx0 = laneStart + config.lanesPerDirection * LANE_WIDTH;
    markings.push(
      <line
        key="center"
        x1={cx0}
        y1={-halfLen + (trimCenterEnd ? length * 0.1 : 0)}
        x2={cx0}
        y2={halfLen}
        stroke={COLORS.laneLine}
        strokeWidth={2}
      />
    );
  }

  // Dashed lane lines between same-direction lanes.
  for (let dir = 0; dir < directions; dir++) {
    for (let i = 1; i < config.lanesPerDirection; i++) {
      const x =
        laneStart + dir * config.lanesPerDirection * LANE_WIDTH + i * LANE_WIDTH;
      markings.push(
        <line
          key={`dash-${dir}-${i}`}
          x1={x}
          y1={-halfLen}
          x2={x}
          y2={halfLen}
          stroke={COLORS.laneLine}
          strokeWidth={1.5}
          strokeDasharray="6 6"
        />
      );
    }
  }

  // Cycling lane separator line (white-ish edge line).
  if (config.cyclingLane) {
    const lines: number[] = [];
    if (directions === 2) {
      // Left edge of left cycling strip
      lines.push(carriagewayLeft);
      // Right edge of right cycling strip
      lines.push(carriagewayLeft + carriagewayWidth);
    } else {
      lines.push(carriagewayLeft + carriagewayWidth);
    }
    for (const x of lines) {
      markings.push(
        <line
          key={`cycle-edge-${x}`}
          x1={x}
          y1={-halfLen}
          x2={x}
          y2={halfLen}
          stroke={COLORS.cyclingLaneLine}
          strokeWidth={1.5}
        />
      );
    }
  }

  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotation})`}>
      {strips}
      {markings}
    </g>
  );
}
