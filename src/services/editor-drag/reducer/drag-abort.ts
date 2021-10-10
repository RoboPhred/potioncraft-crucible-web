import { isEditorDragAbortAction } from "@/actions/editor-drag-abort";
import { AnyAction } from "redux";

import {
  defaultEditorDragServiceState,
  EditorDragServiceState,
} from "../state";

export default function dragAbortReducer(
  state: EditorDragServiceState = defaultEditorDragServiceState,
  action: AnyAction
): EditorDragServiceState {
  if (!isEditorDragAbortAction(action)) {
    return state;
  }

  return defaultEditorDragServiceState;
}
