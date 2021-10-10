import { createSelector } from "reselect";

import { entitiesByKeySelector } from "@/services/map-config/selectors/entities";

import { worldToClient } from "../utils";

import {
  editorOffsetXSelector,
  editorOffsetYSelector,
  editorZoomFactorSelector,
} from "./view";
import {
  editorViewportHeightSelector,
  editorViewportWidthSelector,
} from "./viewport";

export const entityKeysInViewSelector = createSelector(
  entitiesByKeySelector,
  editorOffsetXSelector,
  editorOffsetYSelector,
  editorViewportWidthSelector,
  editorViewportHeightSelector,
  editorZoomFactorSelector,
  (
    entitiesByKey,
    offsetX,
    offsetY,
    viewportWidth,
    viewportHeight,
    zoomFactor
  ) => {
    return Object.entries(entitiesByKey)
      .filter(([_, entity]) => {
        const p = worldToClient(entity, offsetX, offsetY, zoomFactor);
        return (
          p.x > 0 && p.x < viewportWidth && p.y > 0 && p.y < viewportHeight
        );
      })
      .map(([key]) => key);
  }
);
