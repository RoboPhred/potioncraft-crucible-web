import { AnyAction } from "redux";

import { AppState, defaultAppState } from "@/state";
import { fpSet } from "@/fp-set";
import { pointSubtract } from "@/geometry";

import rootReducer from "@/reducer";

import { worldMousePosSelector } from "@/services/map-editor/mouse/selectors/world-coords";

import { isMapEditorZoomAction } from "@/actions/potionbase-map-editor/zoom";
import { mapEditorPan } from "@/actions/potionbase-map-editor/pan";

export default function zoomReducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  if (!isMapEditorZoomAction(action)) {
    return state;
  }

  const { zoomFactor } = action.payload;

  const worldMousePos = worldMousePosSelector(state);

  state = fpSet(
    state,
    "services",
    "mapEditor",
    "view",
    "zoomFactor",
    zoomFactor
  );

  const newMousePos = worldMousePosSelector(state);

  if (worldMousePos != null && newMousePos != null) {
    const offset = pointSubtract(worldMousePos, newMousePos);
    state = rootReducer(state, mapEditorPan(offset.x, -offset.y));
  }

  return state;
}
