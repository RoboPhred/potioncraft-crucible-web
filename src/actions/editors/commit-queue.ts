import { AnyAction } from "redux";

export const ACTION_EDITOR_COMMIT_QUEUE = "editor-commit-queue" as const;
export const editorCommitQueue = () => ({
  type: ACTION_EDITOR_COMMIT_QUEUE,
});
export type EditorCommitQueueAction = ReturnType<typeof editorCommitQueue>;
export function isEditorCommitQueueAction(
  action: AnyAction
): action is EditorCommitQueueAction {
  return action.type === ACTION_EDITOR_COMMIT_QUEUE;
}
