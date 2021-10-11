import { AnyAction } from "redux";

import { isSelectEntityAction } from "@/actions/select-entity";
import { combineSelection } from "@/selection-mode";

import { defaultEditorSelectionState, EditorSelectionState } from "../state";
import { createEditorSelectionReducer } from "../state-utils";

export default createEditorSelectionReducer(function selectEntityReducer(
  state: EditorSelectionState = defaultEditorSelectionState,
  action: AnyAction
): EditorSelectionState {
  if (!isSelectEntityAction(action)) {
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
