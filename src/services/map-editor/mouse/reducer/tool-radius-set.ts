import { isMapEditorToolRadiusSetAction } from "@/actions/map-editor/tool-radius-set";

import { createEditorMouseReducer } from "../state-utils";

export default createEditorMouseReducer((state, action) => {
  if (!isMapEditorToolRadiusSetAction(action)) {
    return state;
  }

  const { radius } = action.payload;

  if (radius <= 0) {
    return state;
  }

  return {
    ...state,
    toolRadius: radius,
  };
});
