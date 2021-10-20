import { AnyAction } from "redux";

import { isSelectClearAction } from "@/actions/select-clear";

import { defaultEditorSelectionState, EditorSelectionState } from "../state";
import { createEditorSelectionReducer } from "../state-utils";

export default createEditorSelectionReducer(function selectClearReducer(
  state: EditorSelectionState = defaultEditorSelectionState,
  action: AnyAction
): EditorSelectionState {
  if (!isSelectClearAction(action)) {
    return state;
  }

  return {
    ...state,
    selectedEntityKeys: [],
  };
});
