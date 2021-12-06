import * as React from "react";

import { Point } from "@/geometry";

import { useSelector } from "@/hooks/use-selector";

import {
  editorOffsetXSelector,
  editorOffsetYSelector,
  editorZoomFactorSelector,
} from "../selectors/view";

import { worldToClient } from "../utils";

export function useWorldToClient() {
  const offsetX = useSelector(editorOffsetXSelector);
  const offsetY = useSelector(editorOffsetYSelector);
  const zoomFactor = useSelector(editorZoomFactorSelector);

  return React.useCallback(
    (p: Point) => worldToClient(p, offsetX, offsetY, zoomFactor),
    [offsetX, offsetY, zoomFactor]
  );
}
