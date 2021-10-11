import { AnyAction } from "redux";

import { isClearSelectionAction } from "@/actions/select-clear";

import { defaultEditorSelectionState, EditorSelectionState } from "../state";
import { createEditorSelectionReducer } from "../state-utils";

export default createEditorSelectionReducer(function selectClearReducer(
  state: EditorSelectionState = defaultEditorSelectionState,
  action: AnyAction
): EditorSelectionState {
  if (!isClearSelectionAction(action)) {
    return state;
  }

  return {
    ...state,
    selectedEntityIds: [],
  };
});
