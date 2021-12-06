import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "@/services/state-utils";

export const createEditorSelectionReducer = createServiceReducerCreator(
  "mapEditor",
  "selection"
);
export const createEditorSelectionSelector = createServiceSelectorCreator(
  "mapEditor",
  "selection"
);
