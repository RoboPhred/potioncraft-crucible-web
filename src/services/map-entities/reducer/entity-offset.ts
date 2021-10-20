import mapValues from "lodash/mapValues";

import { pointAdd } from "@/geometry";

import { isEntityOffsetAction } from "@/actions/entity-offset";

import { createMapEntitiesReducer } from "../state-utils";
import { addToRegionContainer, removeFromRegionContainer } from "../regions";

export default createMapEntitiesReducer((state, action) => {
  if (!isEntityOffsetAction(action)) {
    return state;
  }

  const { entityKeys, offsetX, offsetY } = action.payload;
  const offsetP = { x: offsetX, y: offsetY };

  for (const entityKey of entityKeys) {
    const entity = state.entitiesByKey[entityKey];
    if (!entity) {
      continue;
    }
    state = removeFromRegionContainer(state, entity, entityKey);
    state = addToRegionContainer(state, pointAdd(entity, offsetP), entityKey);
  }

  return {
    ...state,
    entitiesByKey: mapValues(state.entitiesByKey, (entity, key) => {
      if (!entityKeys.includes(key)) {
        return entity;
      }
      return {
        ...entity,
        ...pointAdd(entity, offsetP),
      };
    }),
  };
});
