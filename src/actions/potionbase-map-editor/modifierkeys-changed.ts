import { ModifierKeys } from "@/modifier-keys";
import { AnyAction } from "redux";

export const ACTION_MAPEDITOR_MODIFIERKEYS_CHANGED =
  "mapeditor-modifierkeys-changed" as const;
export const mapEditorModifierKeysChanged = (modifiers: ModifierKeys) => ({
  type: ACTION_MAPEDITOR_MODIFIERKEYS_CHANGED,
  payload: { modifiers },
});
export type MapEditorModifierKeysChangedAction = ReturnType<
  typeof mapEditorModifierKeysChanged
>;
export function isMapEditorModifierKeysChangedAction(
  action: AnyAction
): action is MapEditorModifierKeysChangedAction {
  return action.type === ACTION_MAPEDITOR_MODIFIERKEYS_CHANGED;
}
