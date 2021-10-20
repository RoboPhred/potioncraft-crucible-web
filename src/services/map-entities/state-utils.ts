import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "../state-utils";

export const createMapEntitiesReducer =
  createServiceReducerCreator("mapEntities");
export const createMapEntitiesSelector =
  createServiceSelectorCreator("mapEntities");
