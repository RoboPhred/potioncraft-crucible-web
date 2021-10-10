import { AnyAction } from "redux";

import { isSelectEntityAction } from "@/actions/select-entity";
import { combineSelection } from "@/selection-mode";

import { defaultSelectionState, SelectionState } from "../state";

export default function selectEntityReducer(
  state: SelectionState = defaultSelectionState,
  action: AnyAction
): SelectionState {
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
