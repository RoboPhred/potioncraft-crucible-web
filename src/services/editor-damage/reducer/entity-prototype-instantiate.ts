import { isEntityPrototypeInstantiateAction } from "@/actions/entity-prototype-instantiate";
import { addPointToRect } from "@/geometry";
import { worldToClientSelector } from "@/services/editor-view/selectors/coordinate-mapping";

import { createEditorDamageReducer } from "../state-utils";

export default createEditorDamageReducer((state, action, appState) => {
  if (!isEntityPrototypeInstantiateAction(action)) {
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
