import { Point } from "@/geometry";

export const worldToClient = (
  p: Point,
  offsetX: number,
  offsetY: number,
  zoomFactor: number
) => ({
  x: (p.x - offsetX + 60) * zoomFactor,
  y: (-p.y - offsetY + 60) * zoomFactor,
});

export const clientToWorld = (
  p: Point,
  offsetX: number,
  offsetY: number,
  zoomFactor: number
) => ({
  x: p.x / zoomFactor - 60 + offsetX,
  y: (p.y / zoomFactor - 60 + offsetY) * -1,
});
