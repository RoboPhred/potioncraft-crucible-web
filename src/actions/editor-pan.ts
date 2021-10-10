import { AnyAction } from "redux";

export const ACTION_EDITOR_PAN = "editor-pan" as const;
export const editorPan = (xOffset: number, yOffset: number) => ({
  type: ACTION_EDITOR_PAN,
  payload: { x: xOffset, y: yOffset },
});
export type EditorPanAction = ReturnType<typeof editorPan>;
export function isEditorPanAction(
  action: AnyAction
): action is EditorPanAction {
  return action.type === ACTION_EDITOR_PAN;
}
