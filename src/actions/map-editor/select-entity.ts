import { AnyAction } from "redux";

import { asArray, MaybeArray } from "@/arrays";
import { SelectionMode } from "@/selection-mode";

export const ACTION_MAPEDITOR_SELECT_ENTITY =
  "mapeditor-select-entity" as const;
export const mapEditorSelectEntity = (
  entityKeys: MaybeArray<string>,
  mode: SelectionMode = "set"
) => ({
  type: ACTION_MAPEDITOR_SELECT_ENTITY,
  payload: { entityKeys: asArray(entityKeys), mode },
});
export type MapEditorSelectEntityAction = ReturnType<
  typeof mapEditorSelectEntity
>;
export function isMapEditorSelectEntityAction(
  action: AnyAction
): action is MapEditorSelectEntityAction {
  return action.type === ACTION_MAPEDITOR_SELECT_ENTITY;
}
