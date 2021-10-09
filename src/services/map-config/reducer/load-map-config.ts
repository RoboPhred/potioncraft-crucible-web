import { AnyAction } from "redux";

import { isLoadMapConfigAction } from "@/actions/load-map-config";

import { defaultMapConfigState, MapConfigState } from "../state";

export default function loadPCSave(
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
}
