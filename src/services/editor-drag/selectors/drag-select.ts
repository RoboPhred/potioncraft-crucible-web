import { normalizeRectangle } from "@/geometry";
import { AppState } from "@/state";

export const dragSelectionRectSelector = (state: AppState) => {
  const dragState = state.services.editorDrag;
  if (dragState.dragMode !== "select" || dragState.dragEnd === null) {
    return null;
  }
  return normalizeRectangle(dragState.dragStart, dragState.dragEnd);
};
