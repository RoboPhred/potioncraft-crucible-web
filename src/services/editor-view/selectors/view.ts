import { AppState } from "@/state";

export const editorOffsetXSelector = (state: AppState) =>
  state.services.editorView.offsetX;
export const editorOffsetYSelector = (state: AppState) =>
  state.services.editorView.offsetY;

export const editorZoomFactorSelector = (state: AppState) =>
  state.services.editorView.zoomFactor;

export const editorViewportWidthSelector = (state: AppState) =>
  state.services.editorView.viewportWidth;
export const editorViewportHeightSelector = (state: AppState) =>
  state.services.editorView.viewportHeight;
