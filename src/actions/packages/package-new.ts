import { AnyAction } from "redux";

export const ACTION_PACKAGE_NEW = "package-new" as const;
export const packageNew = () => ({
  type: ACTION_PACKAGE_NEW,
});
export type PackageNewAction = ReturnType<typeof packageNew>;
export function isPackageNewAction(
  action: AnyAction
): action is PackageNewAction {
  return action.type === ACTION_PACKAGE_NEW;
}
