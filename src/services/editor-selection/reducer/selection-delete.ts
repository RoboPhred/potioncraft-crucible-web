import { AnyAction } from "redux";

import { AppState, defaultAppState } from "@/state";

import { isMapEditorSelectionDeleteAction } from "@/actions/potionbase-map-editor/selection-delete";
import { mapEditorEntityDelete } from "@/actions/potionbase-map-editor/entity-delete";

import rootReducer from "@/reducer";

export default function selectionDeleteReducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  if (!isMapEditorSelectionDeleteAction(action)) {
    return state;
  }

  const selectedEntityKeys = state.services.editorSelection.selectedEntityKeys;

  if (selectedEntityKeys.length === 0) {
    return state;
  }

  return rootReducer(state, mapEditorEntityDelete(selectedEntityKeys));
}
