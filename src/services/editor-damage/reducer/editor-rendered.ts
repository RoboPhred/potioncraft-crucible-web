import { isEditorRenderedAction } from "@/actions/editor-rendered";
import { createEditorDamageReducer } from "../state-utils";

export default createEditorDamageReducer((state, action) => {
  if (!isEditorRenderedAction(action)) {
    return state;
  }

  return {
    ...state,
    damageWorldRect: null,
  };
});
