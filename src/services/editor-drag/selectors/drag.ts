import { EditorDragServiceState } from "../state";
import { createEditorDragSelector } from "../state-utils";

export const isDraggingSelector = createEditorDragSelector(
  (state: EditorDragServiceState) => state.dragMode != null
);
