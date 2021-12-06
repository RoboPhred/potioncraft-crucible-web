import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "@/services/state-utils";

export const createEditorDamageReducer = createServiceReducerCreator(
  "mapEditor",
  "damage"
);
export const createEditorDamageSelector = createServiceSelectorCreator(
  "mapEditor",
  "damage"
);
