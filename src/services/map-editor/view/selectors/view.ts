import { createEditorViewSelector } from "../state-utils";

export const editorOffsetXSelector = createEditorViewSelector((s) => s.offsetX);
export const editorOffsetYSelector = createEditorViewSelector((s) => s.offsetY);

export const editorZoomFactorSelector = createEditorViewSelector(
  (s) => s.zoomFactor
);
