import { AnyAction } from "redux";

export const ACTION_PACKAGE_LOAD_FILE = "package-load-file" as const;
export const packageLoadFile = (file: File) => ({
  type: ACTION_PACKAGE_LOAD_FILE,
  payload: { file },
});
export type PackageLoadFileAction = ReturnType<typeof packageLoadFile>;
export function isPackageLoadFileAction(
  action: AnyAction
): action is PackageLoadFileAction {
  return action.type === ACTION_PACKAGE_LOAD_FILE;
}
