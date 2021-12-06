import { clientToWorld } from "@/services/map-editor/view/utils";
import { AppState } from "@/state";

export const worldMousePosSelector = (state: AppState) => {
  const mouseViewportPos = state.services.mapEditor.mouse.mouseViewportPos;
  if (!mouseViewportPos) {
    return null;
  }
  return clientToWorld(
    mouseViewportPos,
    state.services.mapEditor.view.offsetX,
    state.services.mapEditor.view.offsetY,
    state.services.mapEditor.view.zoomFactor
  );
};

export const worldMouseDownPosSelector = (state: AppState) => {
  const mouseDownViewportPos =
    state.services.mapEditor.mouse.mouseDownViewportPos;
  if (!mouseDownViewportPos) {
    return null;
  }
  return clientToWorld(
    mouseDownViewportPos,
    state.services.mapEditor.view.offsetX,
    state.services.mapEditor.view.offsetY,
    state.services.mapEditor.view.zoomFactor
  );
};
