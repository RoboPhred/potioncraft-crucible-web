import { AnyAction } from "redux";

import { isMapEditorSelectEntityAction } from "@/actions/map-editor/select-entity";
import { combineSelection } from "@/selection-mode";

import { defaultEditorSelectionState, EditorSelectionState } from "../state";
import { createEditorSelectionReducer } from "../state-utils";

export default createEditorSelectionReducer(function selectEntityReducer(
  state: EditorSelectionState = defaultEditorSelectionState,
  action: AnyAction
): EditorSelectionState {
  if (!isMapEditorSelectEntityAction(action)) {
    return state;
  }

  const { entityKeys, mode } = action.payload;
  return {
    ...state,
    selectedEntityKeys: combineSelection(
      state.selectedEntityKeys,
      entityKeys,
      mode
    ),
  };
});
