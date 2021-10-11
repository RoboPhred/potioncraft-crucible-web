import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "../state-utils";

export const createEditorMouseReducer =
  createServiceReducerCreator("editorMouse");
export const createEditorMouseSelector =
  createServiceSelectorCreator("editorMouse");
