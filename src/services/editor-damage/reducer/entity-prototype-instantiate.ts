import { isMapEditorEntityPrototypeInstantiateAction } from "@/actions/potionbase-map-editor/entity-prototype-instantiate";
import { addPointToRect } from "@/geometry";

import { createEditorDamageReducer } from "../state-utils";

export default createEditorDamageReducer((state, action, appState) => {
  if (!isMapEditorEntityPrototypeInstantiateAction(action)) {
    return state;
  }

  const { worldPos } = action.payload;

  return {
    ...state,
    damageWorldRect: state.damageWorldRect
      ? addPointToRect(state.damageWorldRect, worldPos)
      : { p1: worldPos, p2: worldPos },
  };
});
