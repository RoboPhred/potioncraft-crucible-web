import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "../state-utils";

export const createEditorSelectionReducer =
  createServiceReducerCreator("editorSelection");
export const createEditorSelectionSelector =
  createServiceSelectorCreator("editorSelection");
