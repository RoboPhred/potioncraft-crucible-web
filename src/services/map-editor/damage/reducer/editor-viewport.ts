import { isMapEditorPanAction } from "@/actions/map-editor/pan";
import { isMapEditorViewportResizeAction } from "@/actions/map-editor/viewport-resize";
import { isMapEditorZoomAction } from "@/actions/map-editor/zoom";
import { createEditorDamageReducer } from "../state-utils";

export default createEditorDamageReducer((state, action, appState) => {
  if (
    !isMapEditorPanAction(action) &&
    !isMapEditorZoomAction(action) &&
    !isMapEditorViewportResizeAction(action)
  ) {
    return state;
  }

  return {
    ...state,
    damageWorldRect: {
      p1: {
        x: Number.NEGATIVE_INFINITY,
        y: Number.NEGATIVE_INFINITY,
      },
      p2: {
        x: Number.POSITIVE_INFINITY,
        y: Number.POSITIVE_INFINITY,
      },
    },
  };
});
