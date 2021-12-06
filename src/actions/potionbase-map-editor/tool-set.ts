import { AnyAction } from "redux";

import { EditorMouseTool } from "@/services/map-editor/mouse/state";

export const ACTION_MAPEDITOR_TOOL_SET = "mapeditor-tool-set" as const;
export const mapEditorToolSet = (tool: EditorMouseTool) => ({
  type: ACTION_MAPEDITOR_TOOL_SET,
  payload: { tool },
});
export type MapEditorToolSetAction = ReturnType<typeof mapEditorToolSet>;
export function isMapEditorToolSetAction(
  action: AnyAction
): action is MapEditorToolSetAction {
  return action.type === ACTION_MAPEDITOR_TOOL_SET;
}
