import { AnyAction } from "redux";

export const ACTION_PACKAGE_SAVE = "package-save" as const;
export const packageSave = () => ({
  type: ACTION_PACKAGE_SAVE,
});
export type PackageSaveAction = ReturnType<typeof packageSave>;
export function isPackageSaveAction(
  action: AnyAction
): action is PackageSaveAction {
  return action.type === ACTION_PACKAGE_SAVE;
}
