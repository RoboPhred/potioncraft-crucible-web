import { isEditorPanAction } from "@/actions/editor-pan";
import { isEditorViewportResizeAction } from "@/actions/editor-viewport-resize";
import { isEditorZoomAction } from "@/actions/editor-zoom";
import { createEditorDamageReducer } from "../state-utils";

export default createEditorDamageReducer((state, action, appState) => {
  if (
    !isEditorPanAction(action) &&
    !isEditorZoomAction(action) &&
    !isEditorViewportResizeAction(action)
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
