import { isMapEditorModifierKeysChangedAction } from "@/actions/map-editor/modifierkeys-changed";
import { createEditorMouseReducer } from "../state-utils";

export default createEditorMouseReducer((state, action) => {
  if (!isMapEditorModifierKeysChangedAction(action)) {
    return state;
  }

  const { modifiers } = action.payload;

  return {
    ...state,
    modifierKeys: modifiers,
  };
});
