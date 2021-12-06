import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "../state-utils";

export const createMapEditorReducer = createServiceReducerCreator("mapEditor");
export const createMapEditorSelector =
  createServiceSelectorCreator("mapEditor");
