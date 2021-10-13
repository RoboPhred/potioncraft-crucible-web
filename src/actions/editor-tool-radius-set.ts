import { AnyAction } from "redux";

export const ACTION_EDITOR_TOOL_RADIUS_SET = "editor-tool-radius-set" as const;
export const editorToolRadiusSet = (radius: number) => ({
  type: ACTION_EDITOR_TOOL_RADIUS_SET,
  payload: { radius },
});
export type EditorToolRadiusSetAction = ReturnType<typeof editorToolRadiusSet>;
export function isEditorToolRadiusSetAction(
  action: AnyAction
): action is EditorToolRadiusSetAction {
  return action.type === ACTION_EDITOR_TOOL_RADIUS_SET;
}
