import { AnyAction } from "redux";

import { AppState, defaultAppState } from "@/state";

import { isSelectionDeleteAction } from "@/actions/selection-delete";
import { entityDelete } from "@/actions/entity-delete";

import rootReducer from "@/reducer";

export default function selectionDeleteReducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  if (!isSelectionDeleteAction(action)) {
    return state;
  }

  const selectedEntityKeys = state.services.editorSelection.selectedEntityKeys;

  if (selectedEntityKeys.length === 0) {
    return state;
  }

  return rootReducer(state, entityDelete(selectedEntityKeys));
}
