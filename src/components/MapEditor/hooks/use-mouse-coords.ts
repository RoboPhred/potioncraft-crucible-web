import * as React from "react";

import { Point, ZeroPoint } from "@/geometry";

import { mapEditorSvgContext } from "../contexts/field-svg-context";
import { getFieldCoord } from "../utils";

export function useMouseCoords(): (p: Point) => Point {
  const { svgRef, scalerRef } = React.useContext(mapEditorSvgContext);
  return React.useCallback(
    (p: Point) => {
      if (!svgRef.current || !scalerRef.current) {
        return p;
      }
      return getFieldCoord(svgRef.current, scalerRef.current, p);
    },
    [svgRef, scalerRef]
  );
}

export function useEventMouseCoords(): (
  e: MouseEvent | React.MouseEvent
) => Point {
  const { svgRef, scalerRef } = React.useContext(mapEditorSvgContext);
  return React.useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      if (!svgRef.current || !scalerRef.current) {
        return ZeroPoint;
      }
      const p: Point = {
        x: e.pageX,
        y: e.pageY,
      };
      return getFieldCoord(svgRef.current, scalerRef.current, p);
    },
    [svgRef, scalerRef]
  );
}
