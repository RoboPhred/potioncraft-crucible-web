import { isMapEditorMouseDownAction } from "@/actions/potionbase-map-editor/mouse-down";

import { createEditorMouseReducer } from "../state-utils";

export default createEditorMouseReducer((state, action) => {
  if (!isMapEditorMouseDownAction(action)) {
    return state;
  }

  const { viewportPos, modifierKeys } = action.payload;

  return {
    ...state,
    currentPointerGesture: modifierKeys.altKey ? "pan" : null,
    mouseDownViewportPos: viewportPos,
    mouseViewportPos: viewportPos,
    modifierKeys,
  };
});
