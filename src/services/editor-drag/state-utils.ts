import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "../state-utils";

export const createEditorDragReducer =
  createServiceReducerCreator("editorDrag");
export const createEditorDragSelector =
  createServiceSelectorCreator("editorDrag");
