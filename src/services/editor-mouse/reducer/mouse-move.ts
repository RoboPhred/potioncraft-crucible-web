import { isEditorMouseMoveAction } from "@/actions/editor-mouse-move";
import { magnitude, pointSubtract } from "@/geometry";

import { createEditorMouseReducer } from "../state-utils";

const GESTURE_START_DISTANCE = 5;

export default createEditorMouseReducer((state, action) => {
  if (!isEditorMouseMoveAction(action)) {
    return state;
  }

  const { viewportPos, modifierKeys } = action.payload;

  let nextGesture = state.currentGesture;
  if (
    state.mouseDownViewportPos &&
    nextGesture == null &&
    magnitude(pointSubtract(state.mouseDownViewportPos, viewportPos)) >
      GESTURE_START_DISTANCE
  ) {
    // TODO: If mouse is over an entity, drag-move.
    // If alt is held, drag-pan?
    nextGesture = "drag-select";
  }

  return {
    ...state,
    currentGesture: nextGesture,
    mouseViewportPos: viewportPos,
    modifierKeys,
  };
});
