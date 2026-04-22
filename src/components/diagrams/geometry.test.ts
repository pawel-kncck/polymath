import { describe, it, expect } from 'vitest';
import {
  OPPOSITE_DIRECTION,
  defaultLane,
  directionToRotation,
  outboundRightPerp,
  placeVehicle,
} from './geometry';
import { roadFullWidth } from './constants';
import type { RoadConfig, Vehicle } from './types';

describe('diagram geometry', () => {
  describe('OPPOSITE_DIRECTION', () => {
    it('pairs each direction with its opposite', () => {
      expect(OPPOSITE_DIRECTION.N).toBe('S');
      expect(OPPOSITE_DIRECTION.S).toBe('N');
      expect(OPPOSITE_DIRECTION.E).toBe('W');
      expect(OPPOSITE_DIRECTION.W).toBe('E');
    });
  });

  describe('directionToRotation', () => {
    it('returns 0 for N and rotates clockwise', () => {
      expect(directionToRotation('N')).toBe(0);
      expect(directionToRotation('E')).toBe(90);
      expect(directionToRotation('S')).toBe(180);
      expect(directionToRotation('W')).toBe(270);
    });
  });

  describe('outboundRightPerp', () => {
    it('is the CW perpendicular to the arm vector', () => {
      // N arm points up (0,-1); driver leaving intersection going north has
      // east to their right → (+1, 0). Use numeric equality to tolerate -0.
      const n = outboundRightPerp('N');
      expect(n.dx).toBe(1);
      expect(n.dy + 0).toBe(0);
      const e = outboundRightPerp('E');
      expect(e.dx + 0).toBe(0);
      expect(e.dy).toBe(1);
      const s = outboundRightPerp('S');
      expect(s.dx).toBe(-1);
      expect(s.dy + 0).toBe(0);
      const w = outboundRightPerp('W');
      expect(w.dx + 0).toBe(0);
      expect(w.dy).toBe(-1);
    });
  });

  describe('defaultLane', () => {
    it('places non-bicycles on the outermost lane', () => {
      const road: RoadConfig = { lanesPerDirection: 2 };
      expect(defaultLane('car', road)).toBe(1);
      expect(defaultLane('truck', road)).toBe(1);
    });

    it('places bicycles on the cycling lane marker if present', () => {
      const road: RoadConfig = { lanesPerDirection: 1, cyclingLane: true };
      expect(defaultLane('bicycle', road)).toBe(-1);
    });

    it('falls back to outermost traffic lane for bicycles without a cycling lane', () => {
      const road: RoadConfig = { lanesPerDirection: 2 };
      expect(defaultLane('bicycle', road)).toBe(1);
    });
  });

  describe('placeVehicle', () => {
    const road: RoadConfig = { lanesPerDirection: 1 };

    it('places an inbound vehicle on the arm on the correct side of the center line', () => {
      // N arm, facing S (inbound). In right-hand traffic the inbound vehicle
      // is on the side where outboundRightPerp points inward — i.e. negative
      // of outboundRightPerp. For arm N that's west (-x).
      const v: Vehicle = { kind: 'car', arm: 'N', facing: 'S', distance: 0.5 };
      const p = placeVehicle(v, 100, road, 200, 200);
      // Along-arm: 50 units toward N = y 200 - 50 = 150.
      expect(p.y).toBeCloseTo(150, 3);
      // Lateral: inbound on N is west = x < 200.
      expect(p.x).toBeLessThan(200);
      // Rotation: facing S → 180°.
      expect(p.rotation).toBe(180);
    });

    it('places an outbound vehicle on the mirror side of the inbound one', () => {
      const inbound: Vehicle = { kind: 'car', arm: 'N', facing: 'S', distance: 0.5 };
      const outbound: Vehicle = { kind: 'car', arm: 'N', facing: 'N', distance: 0.5 };
      const a = placeVehicle(inbound, 100, road, 200, 200);
      const b = placeVehicle(outbound, 100, road, 200, 200);
      // Same y, mirrored x around centerX=200.
      expect(a.y).toBeCloseTo(b.y, 3);
      expect(a.x + b.x).toBeCloseTo(400, 3);
    });

    it('respects the distance parameter', () => {
      const v: Vehicle = { kind: 'car', arm: 'S', facing: 'N', distance: 0.25 };
      const p = placeVehicle(v, 100, road, 200, 200);
      // S arm: along = 0.25 * 100 = 25 units down from center → y = 225.
      expect(p.y).toBeCloseTo(225, 3);
    });

    it('places bicycles on the cycling lane when road has one', () => {
      const withCycle: RoadConfig = { lanesPerDirection: 1, cyclingLane: true };
      const bike: Vehicle = { kind: 'bicycle', arm: 'S', facing: 'N' };
      const car: Vehicle = { kind: 'car', arm: 'S', facing: 'N' };
      const pBike = placeVehicle(bike, 100, withCycle, 200, 200);
      const pCar = placeVehicle(car, 100, withCycle, 200, 200);
      // Both are inbound (facing N on S arm), so both on the east side (+x)
      // ... wait, S arm inbound faces N. outboundRightPerp(S) = (-1, 0) → west.
      // Inbound sits opposite outbound-right → east → +x direction.
      expect(pBike.x).toBeGreaterThan(200);
      expect(pCar.x).toBeGreaterThan(200);
      // The bicycle is further out (on the cycling strip) than the car.
      expect(pBike.x).toBeGreaterThan(pCar.x);
    });
  });

  describe('roadFullWidth', () => {
    it('adds cycling lane and sidewalk strips to the carriageway', () => {
      const base: RoadConfig = { lanesPerDirection: 1 };
      const wCycleBoth: RoadConfig = { ...base, cyclingLane: true, sidewalk: 'both' };
      expect(roadFullWidth(wCycleBoth)).toBeGreaterThan(roadFullWidth(base));
    });

    it('one-way roads are half the width of their two-way counterparts (carriageway only)', () => {
      const two: RoadConfig = { lanesPerDirection: 1 };
      const one: RoadConfig = { lanesPerDirection: 1, oneWay: true };
      // For two-way 1+1 the carriageway is 2 lanes; for one-way it's 1 lane.
      // Both without sidewalks/cycling, so full width ratio is 2:1.
      expect(roadFullWidth(two) / roadFullWidth(one)).toBe(2);
    });
  });
});
