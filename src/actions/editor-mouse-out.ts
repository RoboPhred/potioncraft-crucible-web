import { AnyAction } from "redux";

export const ACTION_EDITOR_MOUSE_OUT = "editor-mouse-out" as const;
export const editorMouseOut = () => ({
  type: ACTION_EDITOR_MOUSE_OUT,
});
export type EditorMouseOutAction = ReturnType<typeof editorMouseOut>;
export function isEditorMouseOutAction(
  action: AnyAction
): action is EditorMouseOutAction {
  return action.type === ACTION_EDITOR_MOUSE_OUT;
}
