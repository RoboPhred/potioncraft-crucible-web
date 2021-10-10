import { AnyAction } from "redux";

import { isEditorDragContinueAction } from "@/actions/editor-drag-continue";

import {
  defaultEditorDragServiceState,
  EditorDragServiceState,
} from "../state";

export default function dragContinueReducer(
  state: EditorDragServiceState = defaultEditorDragServiceState,
  action: AnyAction
): EditorDragServiceState {
  if (!isEditorDragContinueAction(action)) {
    return state;
  }

  if (state.dragMode == null) {
    return state;
  }

  const { x, y, modifierKeys } = action.payload;

  return {
    ...state,
    dragEnd: { x, y },
    dragModifierKeys: modifierKeys,
  };
}
