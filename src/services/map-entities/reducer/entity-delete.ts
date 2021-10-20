import omit from "lodash/omit";

import { isEntityDeleteAction } from "@/actions/entity-delete";

import { createMapEntitiesReducer } from "../state-utils";
import { removeFromRegionContainer } from "../regions";

export default createMapEntitiesReducer((state, action) => {
  if (!isEntityDeleteAction(action)) {
    return state;
  }

  const { entityKeys } = action.payload;

  for (const entityKey of entityKeys) {
    const entity = state.entitiesByKey[entityKey];
    if (!entity) {
      continue;
    }
    state = removeFromRegionContainer(state, entity, entityKey);
  }

  return {
    ...state,
    entitiesByKey: omit(state.entitiesByKey, entityKeys),
  };
});
