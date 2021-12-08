import { isMapEditorToolSetAction } from "@/actions/map-editor/tool-set";
import { createEditorMouseReducer } from "../state-utils";

export default createEditorMouseReducer((state, action) => {
  if (!isMapEditorToolSetAction(action)) {
    return state;
  }

  const { tool } = action.payload;

  return {
    ...state,
    currentTool: tool,
  };
});
