import { AnyAction } from "redux";

import { magnitude, pointAdd, pointSubtract } from "@/geometry";
import { getSelectMode } from "@/selection-mode";
import { fpSet } from "@/fp-set";

import { AppState, defaultAppState } from "@/state";

import rootReducer from "@/reducer";

import { generateTileEntities } from "@/entities/tiles";

import {
  EditorMouseMoveAction,
  isEditorMouseMoveAction,
} from "@/actions/editor-mouse-move";
import { selectEntity } from "@/actions/select-entity";
import { editorPan } from "@/actions/editor-pan";
import { entityDelete } from "@/actions/entity-delete";
import { entityInsert } from "@/actions/entity-insert";

import { clientToWorldSelector } from "@/services/editor-view/selectors/coordinate-mapping";
import {
  entityKeyAtPointSelector,
  entityKeysAtPointSelector,
} from "@/services/map-config/selectors/entities";

import { EditorMousePointerGesture, EditorMouseTool } from "../state";

const GESTURE_START_DISTANCE = 5;

export default function mouseMoveReducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  if (!isEditorMouseMoveAction(action)) {
    return state;
  }

  const { viewportPos, modifierKeys } = action.payload;

  state = detectGestureReducer(state, action);

  let { currentTool, currentPointerGesture } = state.services.editorMouse;

  // Gestures take priority over tools, so holding alt can pan during tool usage.
  if (currentPointerGesture) {
    state = gestureReducer(state, action, currentPointerGesture);
  } else {
    state = toolReducer(state, action, currentTool);
  }

  state = fpSet(state, "services", "editorMouse", (mouseState) => ({
    ...mouseState,
    mouseViewportPos: viewportPos,
    modifierKeys,
  }));

  return state;
}

function detectGestureReducer(
  state: AppState,
  action: EditorMouseMoveAction
): AppState {
  const { viewportPos, modifierKeys } = action.payload;

  const { mouseDownViewportPos, currentTool } = state.services.editorMouse;
  let { currentPointerGesture } = state.services.editorMouse;

  // If we are holding the mouse button with the pointer, determine the gesture.
  if (
    mouseDownViewportPos &&
    currentTool == "pointer" &&
    currentPointerGesture == null &&
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
      currentPointerGesture = "drag-move";
    } else {
      currentPointerGesture = "drag-select";
    }
  }

  state = fpSet(
    state,
    "services",
    "editorMouse",
    "currentPointerGesture",
    currentPointerGesture
  );

  return state;
}

function gestureReducer(
  state: AppState,
  action: EditorMouseMoveAction,
  currentGesture: EditorMousePointerGesture
): AppState {
  switch (currentGesture) {
    case "pan":
      return panGestureReducer(state, action);
  }

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

function toolReducer(
  state: AppState,
  action: EditorMouseMoveAction,
  currentTool: EditorMouseTool
): AppState {
  const { mouseDownViewportPos } = state.services.editorMouse;
  if (mouseDownViewportPos == null) {
    // Mouse is not held
    return state;
  }

  switch (currentTool) {
    case "eraser":
      return eraserReducer(state, action);
    case "paint-danger-zone":
      return paintDangerZoneReducer(state, action);
  }

  return state;
}

function eraserReducer(
  state: AppState,
  action: EditorMouseMoveAction
): AppState {
  const { viewportPos } = action.payload;
  const { toolRadius } = state.services.editorMouse;
  const worldPoint = clientToWorldSelector(state, viewportPos);
  const keys = entityKeysAtPointSelector(state, worldPoint, toolRadius);
  return rootReducer(state, entityDelete(keys));
}

function paintDangerZoneReducer(
  state: AppState,
  action: EditorMouseMoveAction
) {
  const { viewportPos } = action.payload;
  const { toolRadius } = state.services.editorMouse;
  const worldPoint = clientToWorldSelector(state, viewportPos);
  const keys = entityKeysAtPointSelector(state, worldPoint, toolRadius, true);

  state = rootReducer(state, entityDelete(keys));

  const p1 = pointSubtract(worldPoint, { x: toolRadius, y: toolRadius });
  const p2 = pointAdd(worldPoint, { x: toolRadius, y: toolRadius });
  const entities = generateTileEntities("danger-zone", { p1, p2 }).filter(
    (entity) => {
      const vec = pointSubtract(entity, worldPoint);
      if (magnitude(vec) >= toolRadius) {
        return false;
      }
      return true;
    }
  );

  state = rootReducer(state, entityInsert(entities));
  return state;
}
