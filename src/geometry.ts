export interface Point {
  x: number;
  y: number;
}
export const ZeroPoint = Object.freeze({ x: 0, y: 0 });

export interface Size {
  width: number;
  height: number;
}

export interface Rectangle {
  p1: Point;
  p2: Point;
}

export const ZeroRect = Object.freeze({ p1: ZeroPoint, p2: ZeroPoint });

export function pointAdd(p1: Point, p2: Point): Point {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y,
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

export function addPointToRect(r: Rectangle, p: Point): Rectangle {
  return {
    p1: {
      x: Math.min(r.p1.x, p.x),
      y: Math.min(r.p1.y, p.y),
    },
    p2: {
      x: Math.max(r.p2.x, p.x),
      y: Math.max(r.p2.y, p.y),
    },
  };
}

export function pointIntersectsRect(p: Point, r: Rectangle): boolean {
  r = normalizeRectangle(r);

  if (r.p1.x > p.x || r.p2.x < p.x) {
    return false;
  }

  if (r.p1.y > p.y || r.p2.y < p.y) {
    return false;
  }

  return true;
}

export function calcSize(r: Rectangle): Size {
  r = normalizeRectangle(r);
  return {
    width: r.p2.x - r.p1.x,
    height: r.p2.y - r.p1.y,
  };
}
