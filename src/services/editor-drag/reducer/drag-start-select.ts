import { AnyAction } from "redux";

import { isEditorDragStartSelectAction } from "@/actions/editor-drag-start-select";

import {
  defaultEditorDragServiceState,
  EditorDragServiceState,
} from "../state";

export default function dragStartSelectReducer(
  state: EditorDragServiceState = defaultEditorDragServiceState,
  action: AnyAction
): EditorDragServiceState {
  if (!isEditorDragStartSelectAction(action)) {
    return state;
  }

  const { x, y, modifierKeys } = action.payload;

  return {
    dragMode: "select",
    dragStart: { x, y },
    dragEnd: null,
    dragModifierKeys: modifierKeys,
  };
}
