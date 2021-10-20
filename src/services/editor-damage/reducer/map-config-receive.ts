import { isMapConfigReceiveAction } from "@/actions/map-config-receive";
import { createEditorDamageReducer } from "../state-utils";

export default createEditorDamageReducer((state, action, appState) => {
  if (!isMapConfigReceiveAction(action)) {
    return state;
  }

  return {
    ...state,
    damageWorldRect: {
      p1: {
        x: Number.NEGATIVE_INFINITY,
        y: Number.NEGATIVE_INFINITY,
      },
      p2: {
        x: Number.POSITIVE_INFINITY,
        y: Number.POSITIVE_INFINITY,
      },
    },
  };
});
