import { EditorSelectionState } from "../state";
import { createEditorSelectionSelector } from "../state-utils";

export const isEntitySelectedSelector = createEditorSelectionSelector(
  (s: EditorSelectionState, entityKey: string) =>
    s.selectedEntityKeys.includes(entityKey)
);

export const selectedEntityKeysSelector = createEditorSelectionSelector(
  (s: EditorSelectionState) => s.selectedEntityKeys
);
