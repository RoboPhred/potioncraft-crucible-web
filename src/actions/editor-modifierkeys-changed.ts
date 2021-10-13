import { ModifierKeys } from "@/modifier-keys";
import { AnyAction } from "redux";

export const ACTION_EDITOR_MODIFIERKEYS_CHANGED =
  "editor-modifierkeys-changed" as const;
export const editorModifierKeysChanged = (modifiers: ModifierKeys) => ({
  type: ACTION_EDITOR_MODIFIERKEYS_CHANGED,
  payload: { modifiers },
});
export type EditorModifierKeysChangedAction = ReturnType<
  typeof editorModifierKeysChanged
>;
export function isEditorModifierKeysChangedAction(
  action: AnyAction
): action is EditorModifierKeysChangedAction {
  return action.type === ACTION_EDITOR_MODIFIERKEYS_CHANGED;
}
