import { AnyAction } from "redux";
import { v4 as uuidV4 } from "uuid";

import { isMapConfigReceiveAction } from "@/actions/map-config-receive";

import { defaultMapConfigState, MapConfigState } from "../state";
import { MapEntity } from "../entities";
import { createMapConfigReducer } from "../state-utils";

export default createMapConfigReducer(function receiveMapConfig(
  state: MapConfigState = defaultMapConfigState,
  action: AnyAction
): MapConfigState {
  if (!isMapConfigReceiveAction(action)) {
    return state;
  }

  const { mapConfig } = action.payload;

  const entitiesByKey: Record<string, MapEntity> = {};
  for (let entity of mapConfig.entities) {
    entitiesByKey[uuidV4()] = entity;
  }

  return {
    ...state,
    loadingStatus: "loaded",
    entitiesByKey,
    errorMessage: null,
  };
});
