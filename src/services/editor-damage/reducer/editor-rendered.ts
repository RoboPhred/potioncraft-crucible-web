import { isMapEditorRenderedAction } from "@/actions/potionbase-map-editor/rendered";
import { createEditorDamageReducer } from "../state-utils";

export default createEditorDamageReducer((state, action) => {
  if (!isMapEditorRenderedAction(action)) {
    return state;
  }

  return {
    ...state,
    damageWorldRect: null,
  };
});
