import { createSelector } from "reselect";

import { normalizeRectangle } from "@/geometry";

import { createEditorMouseSelector } from "../state-utils";
import { EditorMouseServiceState } from "../state";

export const dragSelectionRectSelector = createEditorMouseSelector(
  createSelector(
    (state: EditorMouseServiceState) =>
      state.currentPointerGesture == "drag-select" &&
      state.mouseDownViewportPos,
    (state: EditorMouseServiceState) =>
      state.currentPointerGesture == "drag-select" && state.mouseViewportPos,
    (dragStart, dragEnd) => {
      if (dragStart && dragEnd) {
        return normalizeRectangle(dragStart, dragEnd);
      } else {
        return null;
      }
    }
  )
);
