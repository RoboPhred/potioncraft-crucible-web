import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "@/services/state-utils";

export const createEditorMouseReducer = createServiceReducerCreator(
  "mapEditor",
  "mouse"
);
export const createEditorMouseSelector = createServiceSelectorCreator(
  "mapEditor",
  "mouse"
);
