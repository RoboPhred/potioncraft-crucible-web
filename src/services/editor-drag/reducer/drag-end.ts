import { AnyAction } from "redux";

import { AppState, defaultAppState } from "@/state";
import { fpSet } from "@/fp-set";
import { normalizeRectangle } from "@/geometry";
import { getSelectMode } from "@/selection-mode";

import rootReducer from "@/reducer";

import {
  EditorDragEndAction,
  isEditorDragEndAction,
} from "@/actions/editor-drag-end";
import { selectEntity } from "@/actions/select-entity";

import { entitiesByKeySelector } from "@/services/map-config/selectors/entities";

import {
  defaultEditorDragServiceState,
  EditorDragServiceSelectionState,
} from "../state";

export default function dragEndReducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  if (!isEditorDragEndAction(action)) {
    return state;
  }

  const dragState = state.services.editorDrag;
  switch (dragState.dragMode) {
    case "select":
      state = dragEndSelectReducer(state, dragState, action);
      break;
  }

  state = fpSet(state, "services", "editorDrag", defaultEditorDragServiceState);

  return state;
}

function dragEndSelectReducer(
  state: AppState,
  dragState: EditorDragServiceSelectionState,
  action: EditorDragEndAction
): AppState {
  if (!dragState.dragEnd) {
    return state;
  }

  const selectionRect = normalizeRectangle(dragState.dragStart, {
    x: action.payload.x,
    y: action.payload.y,
  });

  const entitiesById = entitiesByKeySelector(state);

  const idsToSelect = Object.entries(entitiesById)
    .filter(([_, entity]) => {
      // Not caring about bounds for now
      if (entity.x < selectionRect.p1.x || entity.x > selectionRect.p2.x) {
        return false;
      }
      if (entity.y < selectionRect.p1.y || entity.y > selectionRect.p2.y) {
        return false;
      }
      return true;
    })
    .map(([id]) => id);

  const mode = getSelectMode(dragState.dragModifierKeys);
  return rootReducer(state, selectEntity(idsToSelect, mode));
}
