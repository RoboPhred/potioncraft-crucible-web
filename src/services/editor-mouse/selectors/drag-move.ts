import { pointSubtract } from "@/geometry";
import { AppState } from "@/state";
import { createSelector } from "reselect";
import {
  worldMouseDownPosSelector,
  worldMousePosSelector,
} from "./world-coords";

export const dragMoveOffsetSelector = createSelector(
  (state: AppState) => state.services.editorMouse.currentGesture,
  worldMousePosSelector,
  worldMouseDownPosSelector,
  (currentGesture, worldMousePos, worldMouseDownPos) => {
    if (
      currentGesture !== "drag-move" ||
      !worldMousePos ||
      !worldMouseDownPos
    ) {
      return null;
    }

    return pointSubtract(worldMousePos, worldMouseDownPos);
  }
);
