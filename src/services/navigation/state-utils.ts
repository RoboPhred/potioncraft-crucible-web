import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "../state-utils";

export const createNavigationReducer =
  createServiceReducerCreator("navigation");
export const createNavigationSelector =
  createServiceSelectorCreator("navigation");
