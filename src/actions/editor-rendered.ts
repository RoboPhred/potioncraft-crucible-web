import { AnyAction } from "redux";

export const ACTION_EDITOR_RENDERED = "editor-rendered" as const;
export const editorRendered = () => ({
  type: ACTION_EDITOR_RENDERED,
});
export function isEditorRenderedAction(action: AnyAction): boolean {
  return action.type === ACTION_EDITOR_RENDERED;
}
