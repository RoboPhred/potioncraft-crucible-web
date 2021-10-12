import { AnyAction } from "redux";

import { isMapConfigLoadFileAction } from "@/actions/map-config-load-file";

import { defaultMapConfigState, MapConfigState } from "../state";
import { createMapConfigReducer } from "../state-utils";

export default createMapConfigReducer(function loadMapConfig(
  state: MapConfigState = defaultMapConfigState,
  action: AnyAction
): MapConfigState {
  if (!isMapConfigLoadFileAction(action)) {
    return state;
  }

  return {
    ...state,
    loadingStatus: "loading",
  };
});
