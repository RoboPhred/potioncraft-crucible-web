import { isMapEditorMapClearAction } from "@/actions/map-editor/map-clear";

import { createEditorDamageReducer } from "../state-utils";

export default createEditorDamageReducer((state, action) => {
  if (!isMapEditorMapClearAction(action)) {
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
