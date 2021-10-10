import { AnyAction } from "redux";

import { isClearSelectionAction } from "@/actions/select-clear";

import { defaultSelectionState, SelectionState } from "../state";

export default function selectClearReducer(
  state: SelectionState = defaultSelectionState,
  action: AnyAction
): SelectionState {
  if (!isClearSelectionAction(action)) {
    return state;
  }

  return {
    ...state,
    selectedEntityIds: [],
  };
}
