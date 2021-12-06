import { createEditorMouseSelector } from "../state-utils";

export const viewportMousePosSelector = createEditorMouseSelector(
  (state) => state.mouseViewportPos
);
