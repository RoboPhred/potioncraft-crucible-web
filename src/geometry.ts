export interface Point {
  x: number;
  y: number;
}
export const ZeroPoint = Object.freeze({ x: 0, y: 0 });

export interface Rectangle {
  p1: Point;
  p2: Point;
}

export function normalizeRectangle(p1: Point, p2: Point): Rectangle;
export function normalizeRectangle(r: Rectangle): Rectangle;
export function normalizeRectangle(...args: any[]): Rectangle {
  let p1: Point;
  let p2: Point;
  if (args.length === 1) {
    const r = args[0] as Rectangle;
    p1 = r.p1;
    p2 = r.p2;
  } else {
    p1 = args[0] as Point;
    p2 = args[1] as Point;
  }
  return {
    p1: {
      x: Math.min(p1.x, p2.x),
      y: Math.min(p1.y, p2.y),
    },
    p2: {
      x: Math.max(p1.x, p2.x),
      y: Math.max(p1.y, p2.y),
    },
  };
}

export function pointSubtract(p1: Point, p2: Point): Point {
  return {
    x: p1.x - p2.x,
    y: p1.y - p2.y,
  };
}

export function magnitude(v: Point): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}
