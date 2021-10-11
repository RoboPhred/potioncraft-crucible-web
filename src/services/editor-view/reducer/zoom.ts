import { AnyAction } from "redux";

import { isEditorZoomAction } from "@/actions/editor-zoom";

import { defaultEditorViewState, EditorViewState } from "../state";
import { createEditorViewReducer } from "../state-utils";

export default createEditorViewReducer(function zoomReducer(
  state: EditorViewState = defaultEditorViewState,
  action: AnyAction
): EditorViewState {
  if (!isEditorZoomAction(action)) {
    return state;
  }

  const { zoomFactor } = action.payload;

  return {
    ...state,
    zoomFactor,
  };
});
