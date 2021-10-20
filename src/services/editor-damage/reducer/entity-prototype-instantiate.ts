import { isEntityPrototypeInstantiateAction } from "@/actions/entity-prototype-instantiate";
import { addPointToRect } from "@/geometry";
import { worldToClientSelector } from "@/services/editor-view/selectors/coordinate-mapping";

import { createEditorDamageReducer } from "../state-utils";

export default createEditorDamageReducer((state, action, appState) => {
  if (!isEntityPrototypeInstantiateAction(action)) {
    return state;
  }

  const { worldPos } = action.payload;

  const clientPos = worldToClientSelector(appState, worldPos);

  return {
    ...state,
    damageWorldRect: state.damageWorldRect
      ? addPointToRect(state.damageWorldRect, clientPos)
      : { p1: clientPos, p2: clientPos },
  };
});
