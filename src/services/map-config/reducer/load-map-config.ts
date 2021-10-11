import { AnyAction } from "redux";

import { isLoadMapConfigAction } from "@/actions/load-map-config";

import { defaultMapConfigState, MapConfigState } from "../state";
import { createMapConfigReducer } from "../state-utils";

export default createMapConfigReducer(function loadMapConfig(
  state: MapConfigState = defaultMapConfigState,
  action: AnyAction
): MapConfigState {
  if (!isLoadMapConfigAction(action)) {
    return state;
  }

  return {
    ...state,
    loadingStatus: "loading",
  };
});
