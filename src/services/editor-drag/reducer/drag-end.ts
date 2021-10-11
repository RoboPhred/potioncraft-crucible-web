import { isEditorDragEndAction } from "@/actions/editor-drag-end";
import { AnyAction } from "redux";

import {
  defaultEditorDragServiceState,
  EditorDragServiceState,
} from "../state";
import { createEditorDragReducer } from "../state-utils";

export default createEditorDragReducer(function dragEndReducer(
  state: EditorDragServiceState = defaultEditorDragServiceState,
  action: AnyAction
): EditorDragServiceState {
  if (!isEditorDragEndAction(action)) {
    return state;
  }

  return defaultEditorDragServiceState;
});
