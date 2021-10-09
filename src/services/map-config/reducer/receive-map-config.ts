import { AnyAction } from "redux";
import { v4 as uuidV4 } from "uuid";

import { isReceiveMapConfigAction } from "@/actions/receive-map-config";

import { defaultMapConfigState, MapConfigState } from "../state";
import { MapEntity } from "../entities";

export default function loadPCSave(
  state: MapConfigState = defaultMapConfigState,
  action: AnyAction
): MapConfigState {
  if (!isReceiveMapConfigAction(action)) {
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
}
