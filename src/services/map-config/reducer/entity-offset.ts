import mapValues from "lodash/mapValues";

import { isEntityOffsetAction } from "@/actions/entity-offset";

import { createMapConfigReducer } from "../state-utils";

export default createMapConfigReducer((state, action) => {
  if (!isEntityOffsetAction(action)) {
    return state;
  }

  const { entityKeys, offsetX, offsetY } = action.payload;

  return {
    ...state,
    entitiesByKey: mapValues(state.entitiesByKey, (entity, key) => {
      if (!entityKeys.includes(key)) {
        return entity;
      }
      return {
        ...entity,
        x: entity.x + offsetX,
        y: entity.y + offsetY,
      };
    }),
  };
});
