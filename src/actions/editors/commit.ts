import { AnyAction } from "redux";

export const ACTION_EDITOR_COMMIT = "editor-commit" as const;
export const editorCommit = () => ({
  type: ACTION_EDITOR_COMMIT,
});

export type EditorCommitAction = ReturnType<typeof editorCommit>;
export function isEditorCommitAction(
  action: AnyAction
): action is EditorCommitAction {
  return action.type === ACTION_EDITOR_COMMIT;
}
