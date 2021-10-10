import { createSelector } from "reselect";

import { normalizeRectangle } from "@/geometry";
import { AppState } from "@/state";

export const dragSelectionRectSelector = createSelector(
  (state: AppState) =>
    state.services.editorDrag.dragMode === "select" &&
    state.services.editorDrag.dragStart,
  (state: AppState) =>
    state.services.editorDrag.dragMode === "select" &&
    state.services.editorDrag.dragEnd,
  (dragStart, dragEnd) => {
    if (!dragStart || !dragEnd) {
      return null;
    }

    return normalizeRectangle(dragStart, dragEnd);
  }
);
