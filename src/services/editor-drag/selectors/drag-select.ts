import { createSelector } from "reselect";

import { normalizeRectangle } from "@/geometry";

import { createEditorDragSelector } from "../state-utils";
import { EditorDragServiceState } from "../state";

export const dragSelectionRectSelector = createEditorDragSelector(
  createSelector(
    (state: EditorDragServiceState) =>
      state.dragMode == "select" && state.dragStart,
    (state: EditorDragServiceState) =>
      state.dragMode == "select" && state.dragEnd,
    (dragStart, dragEnd) => {
      if (dragStart && dragEnd) {
        return normalizeRectangle(dragStart, dragEnd);
      } else {
        return null;
      }
    }
  )
);
