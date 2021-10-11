import omit from "lodash/omit";

import { isEntityDeleteAction } from "@/actions/entity-delete";

import { createMapConfigReducer } from "../state-utils";

export default createMapConfigReducer((state, action) => {
  if (!isEntityDeleteAction(action)) {
    return state;
  }

  const { entityKeys } = action.payload;

  return {
    ...state,
    entitiesByKey: omit(state.entitiesByKey, entityKeys),
  };
});
