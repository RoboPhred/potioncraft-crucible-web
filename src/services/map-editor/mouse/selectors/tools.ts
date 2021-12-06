import { AppState } from "@/state";
import { createEditorMouseSelector } from "../state-utils";

export const currentToolSelector = createEditorMouseSelector((state) => {
  if (state.currentPointerGesture !== null) {
    return "pointer" as const;
  }

  if (state.mouseDownViewportPos == null && state.modifierKeys.altKey) {
    return "pointer" as const;
  }

  return state.currentTool;
});

export const toolRadiusSelector = createEditorMouseSelector(
  (state) => state.toolRadius
);

export const toolViewportRadiusSelector = (state: AppState) => {
  const radius = toolRadiusSelector(state);
  return radius * state.services.mapEditor.view.zoomFactor;
};
