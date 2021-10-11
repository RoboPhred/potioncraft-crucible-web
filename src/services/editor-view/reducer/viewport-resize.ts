import { AnyAction } from "redux";

import { isEditorViewportResizeAction } from "@/actions/editor-viewport-resize";

import { defaultEditorViewState, EditorViewState } from "../state";
import { createEditorViewReducer } from "../state-utils";

export default createEditorViewReducer(function viewportResizeReducer(
  state: EditorViewState = defaultEditorViewState,
  action: AnyAction
): EditorViewState {
  if (!isEditorViewportResizeAction(action)) {
    return state;
  }

  const { height, width } = action.payload;

  let zoomFactor = state.zoomFactor;
  if (state.viewportWidth === 0) {
    zoomFactor = Math.min(width, height) / 120;
  }

  return {
    ...state,
    viewportWidth: width,
    viewportHeight: height,
    zoomFactor,
  };
});
