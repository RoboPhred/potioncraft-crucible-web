import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "@/services/state-utils";

export const createMapEntitiesReducer = createServiceReducerCreator(
  "mapEditor",
  "entities"
);
export const createMapEntitiesSelector = createServiceSelectorCreator(
  "mapEditor",
  "entities"
);
