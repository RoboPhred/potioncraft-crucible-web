import { isEditorToolSetAction } from "@/actions/editor-tool-set";
import { createEditorMouseReducer } from "../state-utils";

export default createEditorMouseReducer((state, action) => {
  if (!isEditorToolSetAction(action)) {
    return state;
  }

  const { tool } = action.payload;

  return {
    ...state,
    currentTool: tool,
  };
});
