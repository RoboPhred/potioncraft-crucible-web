import { AnyAction } from "redux";

import { isEditorViewportResizeAction } from "@/actions/editor-viewport-resize";

import { defaultEditorViewState, EditorViewState } from "../state";

export function viewportResizeReducer(
  state: EditorViewState = defaultEditorViewState,
  action: AnyAction
): EditorViewState {
  if (!isEditorViewportResizeAction(action)) {
    return state;
  }

  const { height, width } = action.payload;

  let zoomFactor = state.zoomFactor;
  if (state.viewportWidth === 0) {
    zoomFactor = width / 120;
  }

  return {
    ...state,
    viewportWidth: width,
    viewportHeight: height,
    zoomFactor,
  };
}
