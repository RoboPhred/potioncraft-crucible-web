import { AnyAction } from "redux";

import { EditorMouseTool } from "@/services/editor-mouse/state";

export const ACTION_EDITOR_TOOL_SET = "editor-tool-set" as const;
export const editorToolSet = (tool: EditorMouseTool) => ({
  type: ACTION_EDITOR_TOOL_SET,
  payload: { tool },
});
export type EditorToolSetAction = ReturnType<typeof editorToolSet>;
export function isEditorToolSetAction(
  action: AnyAction
): action is EditorToolSetAction {
  return action.type === ACTION_EDITOR_TOOL_SET;
}
