import { v4 as uuidV4 } from "uuid";

import { MapEntity } from "@/map-config";

import { isMapConfigReceiveAction } from "@/actions/map-config-receive";

import { createMapEntitiesReducer } from "../state-utils";
import { addToRegionContainer } from "../regions";
import { defaultMapEntityStates } from "../state";

export default createMapEntitiesReducer((state, action) => {
  if (!isMapConfigReceiveAction(action)) {
    return state;
  }

  state = defaultMapEntityStates;

  const { entities } = action.payload;

  const entitiesByKey: Record<string, MapEntity> = {};
  for (let entity of entities) {
    entitiesByKey[uuidV4()] = entity;
  }

  for (const entityKey of Object.keys(entitiesByKey)) {
    const entity = entitiesByKey[entityKey];
    state = addToRegionContainer(state, entity, entityKey);
  }

  return {
    ...state,
    entitiesByKey,
  };
});
