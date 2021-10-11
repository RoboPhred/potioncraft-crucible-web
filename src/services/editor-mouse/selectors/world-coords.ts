import { clientToWorld } from "@/services/editor-view/utils";
import { AppState } from "@/state";

export const worldMousePosSelector = (state: AppState) => {
  const mouseViewportPos = state.services.editorMouse.mouseViewportPos;
  if (!mouseViewportPos) {
    return null;
  }
  return clientToWorld(
    mouseViewportPos,
    state.services.editorView.offsetX,
    state.services.editorView.offsetY,
    state.services.editorView.zoomFactor
  );
};

export const worldMouseDownPosSelector = (state: AppState) => {
  const mouseDownViewportPos = state.services.editorMouse.mouseDownViewportPos;
  if (!mouseDownViewportPos) {
    return null;
  }
  return clientToWorld(
    mouseDownViewportPos,
    state.services.editorView.offsetX,
    state.services.editorView.offsetY,
    state.services.editorView.zoomFactor
  );
};
