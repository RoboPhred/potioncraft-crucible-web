import { AnyAction } from "redux";

import { magnitude, pointSubtract } from "@/geometry";
import { getSelectMode } from "@/selection-mode";
import { fpSet } from "@/fp-set";

import { AppState, defaultAppState } from "@/state";

import { isEditorMouseMoveAction } from "@/actions/editor-mouse-move";
import { selectEntity } from "@/actions/select-entity";

import { clientToWorldSelector } from "@/services/editor-view/selectors/coordinate-mapping";
import { entityKeyAtPointSelector } from "@/services/map-config/selectors/entities";

import rootReducer from "@/reducer";

const GESTURE_START_DISTANCE = 5;

export default function mouseMoveReducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  if (!isEditorMouseMoveAction(action)) {
    return state;
  }

  const { viewportPos, modifierKeys } = action.payload;

  const { mouseDownViewportPos } = state.services.editorMouse;
  let nextGesture = state.services.editorMouse.currentGesture;
  if (
    mouseDownViewportPos &&
    nextGesture == null &&
    magnitude(pointSubtract(mouseDownViewportPos, viewportPos)) >
      GESTURE_START_DISTANCE
  ) {
    const mouseDownWorldPos = clientToWorldSelector(
      state,
      mouseDownViewportPos
    );
    const entityKeyAtMouse = entityKeyAtPointSelector(state, mouseDownWorldPos);

    if (entityKeyAtMouse) {
      const selectionMode = getSelectMode(modifierKeys, "append");
      state = rootReducer(state, selectEntity(entityKeyAtMouse, selectionMode));
      nextGesture = "drag-move";
    } else {
      nextGesture = "drag-select";
    }
  }

  state = fpSet(state, "services", "editorMouse", (mouseState) => ({
    ...mouseState,
    currentGesture: nextGesture,
    mouseViewportPos: viewportPos,
    modifierKeys,
  }));

  return state;
}
