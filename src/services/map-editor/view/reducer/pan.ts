import { AnyAction } from "redux";

import { isMapEditorPanAction } from "@/actions/map-editor/pan";

import { defaultEditorViewState, EditorViewState } from "../state";
import { createEditorViewReducer } from "../state-utils";

export default createEditorViewReducer(function panReducer(
  state: EditorViewState = defaultEditorViewState,
  action: AnyAction
): EditorViewState {
  if (!isMapEditorPanAction(action)) {
    return state;
  }

  const { x, y } = action.payload;

  return {
    ...state,
    offsetX: state.offsetX + x,
    offsetY: state.offsetY + y,
  };
});
