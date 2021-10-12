import { AnyAction } from "redux";

import { magnitude, pointSubtract } from "@/geometry";
import { getSelectMode } from "@/selection-mode";
import { fpSet } from "@/fp-set";

import { AppState, defaultAppState } from "@/state";

import {
  EditorMouseMoveAction,
  isEditorMouseMoveAction,
} from "@/actions/editor-mouse-move";
import { selectEntity } from "@/actions/select-entity";

import { clientToWorldSelector } from "@/services/editor-view/selectors/coordinate-mapping";
import { entityKeyAtPointSelector } from "@/services/map-config/selectors/entities";

import rootReducer from "@/reducer";
import { editorPan } from "@/actions/editor-pan";

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
  let currentGesture = state.services.editorMouse.currentGesture;
  if (
    mouseDownViewportPos &&
    currentGesture == null &&
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
      currentGesture = "drag-move";
    } else {
      currentGesture = "drag-select";
    }
  }

  switch (currentGesture) {
    case "pan":
      state = panGestureReducer(state, action);
      break;
  }

  state = fpSet(state, "services", "editorMouse", (mouseState) => ({
    ...mouseState,
    currentGesture: currentGesture,
    mouseViewportPos: viewportPos,
    modifierKeys,
  }));

  return state;
}

function panGestureReducer(
  state: AppState,
  action: EditorMouseMoveAction
): AppState {
  let previousPos = state.services.editorMouse.mouseViewportPos;
  if (!previousPos) {
    return state;
  }

  previousPos = clientToWorldSelector(state, previousPos);
  const currentPos = clientToWorldSelector(state, action.payload.viewportPos);
  const offset = pointSubtract(previousPos, currentPos);
  return rootReducer(state, editorPan(offset.x, -offset.y));
}
