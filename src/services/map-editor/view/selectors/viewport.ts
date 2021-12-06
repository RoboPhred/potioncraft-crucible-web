import { createEditorViewSelector } from "../state-utils";

export const editorViewportWidthSelector = createEditorViewSelector(
  (s) => s.viewportWidth
);
export const editorViewportHeightSelector = createEditorViewSelector(
  (s) => s.viewportHeight
);
