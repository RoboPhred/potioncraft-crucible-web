import { AnyAction } from "redux";

import { fpSet } from "@/fp-set";
import { AppState, defaultAppState } from "@/state";
import { getSelectMode } from "@/selection-mode";
import { normalizeRectangle, pointSubtract } from "@/geometry";

import rootReducer from "@/reducer";

import {
  EditorMouseUpAction,
  isEditorMouseUpAction,
} from "@/actions/editor-mouse-up";
import { selectEntity } from "@/actions/select-entity";

import {
  entitiesByKeySelector,
  entityKeyAtPointSelector,
} from "@/services/map-entities/selectors/entities";
import { clientToWorldSelector } from "@/services/editor-view/selectors/coordinate-mapping";
import { selectClear } from "@/actions/select-clear";
import { entityOffset } from "@/actions/entity-offset";

export default function mouseUpReducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  if (!isEditorMouseUpAction(action)) {
    return state;
  }

  const { modifierKeys, viewportPos } = action.payload;

  const mouseState = state.services.editorMouse;

  switch (mouseState.currentPointerGesture) {
    case "drag-select":
      state = completeDragSelect(state, action);
      break;
    case "drag-move":
      state = completeDragMove(state, action);
      break;
    default:
      state = completeClick(state, action);
      break;
  }

  return fpSet(state, "services", "editorMouse", (mouseState) => ({
    ...mouseState,
    currentPointerGesture: null,
    mouseDownViewportPos: null,
    mouseViewportPos: viewportPos,
    modifierKeys,
  }));
}

function completeDragSelect(
  state: AppState,
  action: EditorMouseUpAction
): AppState {
  const { viewportPos, modifierKeys } = action.payload;

  const { mouseDownViewportPos } = state.services.editorMouse;
  if (!mouseDownViewportPos) {
    return state;
  }

  const worldMouseDownPos = clientToWorldSelector(state, mouseDownViewportPos);
  const worldMouseUpPos = clientToWorldSelector(state, viewportPos);

  const selectionRect = normalizeRectangle(worldMouseDownPos, worldMouseUpPos);

  const entitiesById = entitiesByKeySelector(state);

  const idsToSelect = Object.entries(entitiesById)
    .filter(([_, entity]) => {
      // Not caring about entity sizes for now
      if (entity.x < selectionRect.p1.x || entity.x > selectionRect.p2.x) {
        return false;
      }
      if (entity.y < selectionRect.p1.y || entity.y > selectionRect.p2.y) {
        return false;
      }
      return true;
    })
    .map(([id]) => id);

  const mode = getSelectMode(modifierKeys);
  return rootReducer(state, selectEntity(idsToSelect, mode));
}

function completeDragMove(
  state: AppState,
  action: EditorMouseUpAction
): AppState {
  const selectedEntityKeys = state.services.editorSelection.selectedEntityKeys;
  if (selectedEntityKeys.length === 0) {
    return state;
  }

  const { viewportPos } = action.payload;

  const { mouseDownViewportPos } = state.services.editorMouse;
  if (!mouseDownViewportPos) {
    return state;
  }

  const worldMouseDownPos = clientToWorldSelector(state, mouseDownViewportPos);
  const worldMouseUpPos = clientToWorldSelector(state, viewportPos);

  const offset = pointSubtract(worldMouseUpPos, worldMouseDownPos);

  return rootReducer(
    state,
    entityOffset(selectedEntityKeys, offset.x, offset.y)
  );
}

function completeClick(state: AppState, action: EditorMouseUpAction): AppState {
  const { viewportPos, modifierKeys } = action.payload;

  const worldPos = clientToWorldSelector(state, viewportPos);
  const selectedKey = entityKeyAtPointSelector(state, worldPos);

  const mode = getSelectMode(modifierKeys);

  if (selectedKey != null) {
    return rootReducer(state, selectEntity(selectedKey, mode));
  } else if (mode === "set") {
    return rootReducer(state, selectClear());
  }

  return state;
}
