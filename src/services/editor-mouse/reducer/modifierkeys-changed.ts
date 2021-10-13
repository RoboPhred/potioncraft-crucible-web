import { isEditorModifierKeysChangedAction } from "@/actions/editor-modifierkeys-changed";
import { createEditorMouseReducer } from "../state-utils";

export default createEditorMouseReducer((state, action) => {
  if (!isEditorModifierKeysChangedAction(action)) {
    return state;
  }

  const { modifiers } = action.payload;

  return {
    ...state,
    modifierKeys: modifiers,
  };
});
