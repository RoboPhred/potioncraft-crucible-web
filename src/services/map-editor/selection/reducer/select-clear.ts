import { AnyAction } from "redux";

import { isMapEditorSelectClearAction } from "@/actions/potionbase-map-editor/select-clear";

import { defaultEditorSelectionState, EditorSelectionState } from "../state";
import { createEditorSelectionReducer } from "../state-utils";

export default createEditorSelectionReducer(function selectClearReducer(
  state: EditorSelectionState = defaultEditorSelectionState,
  action: AnyAction
): EditorSelectionState {
  if (!isMapEditorSelectClearAction(action)) {
    return state;
  }

  return {
    ...state,
    selectedEntityKeys: [],
  };
});
