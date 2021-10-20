import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "../state-utils";

export const createEditorDamageReducer =
  createServiceReducerCreator("editorDamage");
export const createEditorDamageSelector =
  createServiceSelectorCreator("editorDamage");
