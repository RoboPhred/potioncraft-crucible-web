import { isEditorMouseDownAction } from "@/actions/editor-mouse-down";

import { createEditorMouseReducer } from "../state-utils";

export default createEditorMouseReducer((state, action) => {
  if (!isEditorMouseDownAction(action)) {
    return state;
  }

  const { viewportPos, modifierKeys } = action.payload;

  return {
    ...state,
    mouseDownViewportPos: viewportPos,
    mouseViewportPos: viewportPos,
    modifierKeys,
  };
});
