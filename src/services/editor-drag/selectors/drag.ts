import { AppState } from "@/state";

export const isDraggingSelector = (state: AppState) =>
  state.services.editorDrag.dragMode != null;
