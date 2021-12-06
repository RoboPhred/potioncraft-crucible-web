import { AnyAction } from "redux";

import { isMapEditorMapReceiveAction } from "@/actions/potionbase-map-editor/map-receive";

import { defaultMapConfigState, MapConfigState } from "../state";
import { createMapConfigReducer } from "../state-utils";

export default createMapConfigReducer(function receiveMapConfig(
  state: MapConfigState = defaultMapConfigState,
  action: AnyAction
): MapConfigState {
  if (!isMapEditorMapReceiveAction(action)) {
    return state;
  }

  return {
    ...state,
    loadingStatus: "loaded",
    errorMessage: null,
  };
});
