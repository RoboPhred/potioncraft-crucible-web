import * as React from "react";

import { Point } from "@/geometry";

import { useSelector } from "@/hooks/use-selector";

import {
  editorOffsetXSelector,
  editorOffsetYSelector,
  editorZoomFactorSelector,
} from "../selectors/view";
import { clientToWorld } from "../utils";

export function useClientToWorld() {
  const offsetX = useSelector(editorOffsetXSelector);
  const offsetY = useSelector(editorOffsetYSelector);
  const zoomFactor = useSelector(editorZoomFactorSelector);

  return React.useCallback(
    (p: Point) => clientToWorld(p, offsetX, offsetY, zoomFactor),
    [offsetX, offsetY, zoomFactor]
  );
}
