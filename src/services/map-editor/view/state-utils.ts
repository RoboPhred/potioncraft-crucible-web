import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "@/services/state-utils";

export const createEditorViewReducer = createServiceReducerCreator(
  "mapEditor",
  "view"
);
export const createEditorViewSelector = createServiceSelectorCreator(
  "mapEditor",
  "view"
);
