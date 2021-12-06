import { createEditorDamageSelector } from "../state-utils";

export const editorDamageRectSelector = createEditorDamageSelector(
  (state) => state.damageWorldRect
);
