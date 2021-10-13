import { isEditorToolRadiusSetAction } from "@/actions/editor-tool-radius-set";
import { createEditorMouseReducer } from "../state-utils";

export default createEditorMouseReducer((state, action) => {
  if (!isEditorToolRadiusSetAction(action)) {
    return state;
  }

  const { radius } = action.payload;

  return {
    ...state,
    toolRadius: Math.max(0.01, radius),
  };
});
