import { AppState } from "@/state";

export const editorViewportWidthSelector = (state: AppState) =>
  state.services.editorView.viewportWidth;
export const editorViewportHeightSelector = (state: AppState) =>
  state.services.editorView.viewportHeight;
