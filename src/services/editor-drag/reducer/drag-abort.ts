import { isEditorDragAbortAction } from "@/actions/editor-drag-abort";
import { AnyAction } from "redux";

import {
  defaultEditorDragServiceState,
  EditorDragServiceState,
} from "../state";
import { createEditorDragReducer } from "../state-utils";

export default createEditorDragReducer(function dragAbortReducer(
  state: EditorDragServiceState = defaultEditorDragServiceState,
  action: AnyAction
): EditorDragServiceState {
  if (!isEditorDragAbortAction(action)) {
    return state;
  }

  return defaultEditorDragServiceState;
});
