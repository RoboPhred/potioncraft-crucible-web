import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "../state-utils";

export const createEditorViewReducer =
  createServiceReducerCreator("editorView");
export const createEditorViewSelector =
  createServiceSelectorCreator("editorView");
