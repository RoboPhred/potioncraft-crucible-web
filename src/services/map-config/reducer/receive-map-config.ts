import { AnyAction } from "redux";

import { isMapConfigReceiveAction } from "@/actions/map-config-receive";

import { defaultMapConfigState, MapConfigState } from "../state";
import { createMapConfigReducer } from "../state-utils";

export default createMapConfigReducer(function receiveMapConfig(
  state: MapConfigState = defaultMapConfigState,
  action: AnyAction
): MapConfigState {
  if (!isMapConfigReceiveAction(action)) {
    return state;
  }

  return {
    ...state,
    loadingStatus: "loaded",
    errorMessage: null,
  };
});
