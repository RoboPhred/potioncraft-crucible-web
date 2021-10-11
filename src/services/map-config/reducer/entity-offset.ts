import mapValues from "lodash/mapValues";
import pick from "lodash/pick";

import { isEntityOffsetAction } from "@/actions/entity-offset";

import { createMapConfigReducer } from "../state-utils";

export default createMapConfigReducer((state, action) => {
  if (!isEntityOffsetAction(action)) {
    return state;
  }

  const { entityKeys, offsetX, offsetY } = action.payload;

  return {
    ...state,
    entitiesByKey: {
      ...state.entitiesByKey,
      ...mapValues(pick(state.entitiesByKey, entityKeys), (entity) => ({
        ...entity,
        x: entity.x + offsetX,
        y: entity.y + offsetY,
      })),
    },
  };
});
