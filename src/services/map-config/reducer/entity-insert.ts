import { isEntityInsertAction } from "@/actions/entity-insert";
import { createMapConfigReducer } from "../state-utils";

export default createMapConfigReducer((state, action) => {
  if (!isEntityInsertAction(action)) {
    return state;
  }

  const { entities } = action.payload;

  return {
    ...state,
    entitiesByKey: {
      ...state.entitiesByKey,
      ...entities,
    },
  };
});
