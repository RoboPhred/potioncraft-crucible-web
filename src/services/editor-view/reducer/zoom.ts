import { isEditorZoomAction } from "@/actions/editor-zoom";
import { AnyAction } from "redux";
import { defaultEditorViewState, EditorViewState } from "../state";

export function zoomReducer(
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
}
