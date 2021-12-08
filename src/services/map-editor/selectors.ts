import { createMapEditorSelector } from "./state-utils";

export const editingPotionIdSelector = createMapEditorSelector(
  (s) => s.potionBaseId
);
