import { AnyAction } from "redux";

import { AppState, defaultAppState } from "@/state";
import { fpSet } from "@/fp-set";
import { pointSubtract } from "@/geometry";

import rootReducer from "@/reducer";

import { worldMousePosSelector } from "@/services/editor-mouse/selectors/world-coords";

import { isEditorZoomAction } from "@/actions/editor-zoom";
import { editorPan } from "@/actions/editor-pan";

export default function zoomReducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  if (!isEditorZoomAction(action)) {
    return state;
  }

  const { zoomFactor } = action.payload;

  const worldMousePos = worldMousePosSelector(state);

  state = fpSet(state, "services", "editorView", "zoomFactor", zoomFactor);

  const newMousePos = worldMousePosSelector(state);

  if (worldMousePos != null && newMousePos != null) {
    const offset = pointSubtract(worldMousePos, newMousePos);
    state = rootReducer(state, editorPan(offset.x, -offset.y));
  }

  return state;
}
