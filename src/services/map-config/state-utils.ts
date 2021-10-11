import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "../state-utils";

export const createMapConfigReducer = createServiceReducerCreator("mapConfig");
export const createMapConfigSelector =
  createServiceSelectorCreator("mapConfig");
