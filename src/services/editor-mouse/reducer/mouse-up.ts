import { AnyAction } from "redux";

import { fpSet } from "@/fp-set";
import { AppState, defaultAppState } from "@/state";
import { getSelectMode } from "@/selection-mode";
import { normalizeRectangle, pointSubtract } from "@/geometry";

import rootReducer from "@/reducer";

import {
  MapEditorMouseUpAction,
  isMapEditorMouseUpAction,
} from "@/actions/potionbase-map-editor/mouse-up";
import { mapEditorSelectEntity } from "@/actions/potionbase-map-editor/select-entity";
import { mapEditorSelectClear } from "@/actions/potionbase-map-editor/select-clear";
import { mapEditorEntityOffset } from "@/actions/potionbase-map-editor/entity-offset";

import {
  entityKeyAtPointSelector,
  entityKeysAtRectSelector,
} from "@/services/map-entities/selectors/entities";
import { clientToWorldSelector } from "@/services/editor-view/selectors/coordinate-mapping";

export default function mouseUpReducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  if (!isMapEditorMouseUpAction(action)) {
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
  action: MapEditorMouseUpAction
): AppState {
  const { viewportPos, modifierKeys } = action.payload;

  const { mouseDownViewportPos } = state.services.editorMouse;
  if (!mouseDownViewportPos) {
    return state;
  }

  const worldMouseDownPos = clientToWorldSelector(state, mouseDownViewportPos);
  const worldMouseUpPos = clientToWorldSelector(state, viewportPos);

  const selectionRect = normalizeRectangle(worldMouseDownPos, worldMouseUpPos);

  const idsToSelect = entityKeysAtRectSelector(state, selectionRect);

  const mode = getSelectMode(modifierKeys);
  return rootReducer(state, mapEditorSelectEntity(idsToSelect, mode));
}

function completeDragMove(
  state: AppState,
  action: MapEditorMouseUpAction
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
    mapEditorEntityOffset(selectedEntityKeys, offset.x, offset.y)
  );
}

function completeClick(
  state: AppState,
  action: MapEditorMouseUpAction
): AppState {
  const { viewportPos, modifierKeys } = action.payload;

  const worldPos = clientToWorldSelector(state, viewportPos);
  const selectedKey = entityKeyAtPointSelector(state, worldPos);

  const mode = getSelectMode(modifierKeys);

  if (selectedKey != null) {
    return rootReducer(state, mapEditorSelectEntity(selectedKey, mode));
  } else if (mode === "set") {
    return rootReducer(state, mapEditorSelectClear());
  }

  return state;
}
