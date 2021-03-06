import { isMapEditorMapClearAction } from "@/actions/map-editor/map-clear";

import { defaultMapEntitiesState } from "../state";
import { createMapEntitiesReducer } from "../state-utils";

export default createMapEntitiesReducer((state, action) => {
  if (!isMapEditorMapClearAction(action)) {
    return state;
  }

  return defaultMapEntitiesState;
});
