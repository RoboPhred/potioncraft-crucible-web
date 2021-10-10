import { AnyAction } from "redux";

import { isSelectEntityAction } from "@/actions/select-entity";
import { combineSelection } from "@/selection-mode";

import { defaultEditorSelectionState, EditorSelectionState } from "../state";

export default function selectEntityReducer(
  state: EditorSelectionState = defaultEditorSelectionState,
  action: AnyAction
): EditorSelectionState {
  if (!isSelectEntityAction(action)) {
    return state;
  }

  const { entityIds, mode } = action.payload;
  return {
    ...state,
    selectedEntityIds: combineSelection(
      state.selectedEntityIds,
      entityIds,
      mode
    ),
  };
}
