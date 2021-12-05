import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "../state-utils";

export const createPackageReducer = createServiceReducerCreator("package");
export const createPackageSelector = createServiceSelectorCreator("package");
