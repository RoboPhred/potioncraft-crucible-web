import { AnyAction } from "redux";

import { fpSet } from "@/fp-set";
import { AppState, defaultAppState } from "@/state";
import { getSelectMode } from "@/selection-mode";
import { normalizeRectangle } from "@/geometry";

import rootReducer from "@/reducer";

import {
  EditorMouseUpAction,
  isEditorMouseUpAction,
} from "@/actions/editor-mouse-up";
import { selectEntity } from "@/actions/select-entity";

import { entitiesByKeySelector } from "@/services/map-config/selectors/entities";
import { clientToWorldSelector } from "@/services/editor-view/selectors/coordinate-mapping";
import { selectClear } from "@/actions/select-clear";

export default function mouseUpReducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  if (!isEditorMouseUpAction(action)) {
    return state;
  }

  const { modifierKeys, viewportPos } = action.payload;

  const mouseState = state.services.editorMouse;

  switch (mouseState.currentGesture) {
    case "drag-select":
      state = completeDragSelect(state, action);
      break;
    default:
      state = completeClick(state, action);
      break;
  }

  return fpSet(state, "services", "editorMouse", (mouseState) => ({
    ...mouseState,
    currentGesture: null,
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

function completeClick(state: AppState, action: EditorMouseUpAction): AppState {
  return rootReducer(state, selectClear());
}
