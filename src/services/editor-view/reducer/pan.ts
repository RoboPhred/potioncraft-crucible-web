import { AnyAction } from "redux";

import { isEditorPanAction } from "@/actions/editor-pan";

import { defaultEditorViewState, EditorViewState } from "../state";

export default function panReducer(
  state: EditorViewState = defaultEditorViewState,
  action: AnyAction
): EditorViewState {
  if (!isEditorPanAction(action)) {
    return state;
  }

  const { x, y } = action.payload;

  return {
    ...state,
    offsetX: state.offsetX + x,
    offsetY: state.offsetY + y,
  };
}
