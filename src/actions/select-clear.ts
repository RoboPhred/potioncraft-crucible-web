import { AnyAction } from "redux";

export const ACTION_SELECT_CLEAR = "select-clear" as const;
export const selectClear = () => ({
  type: ACTION_SELECT_CLEAR,
});
export type ClearSelectionAction = ReturnType<typeof selectClear>;
export function isClearSelectionAction(
  action: AnyAction
): action is ClearSelectionAction {
  return action.type === ACTION_SELECT_CLEAR;
}
