import { AnyAction } from "redux";

import { isClearSelectionAction } from "@/actions/select-clear";

import { defaultEditorSelectionState, EditorSelectionState } from "../state";

export default function selectClearReducer(
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
}
