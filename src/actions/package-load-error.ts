import { AnyAction } from "redux";

export const ACITON_PACKAGE_LOAD_ERROR = "package-load-error" as const;
export const packageLoadError = (errorMessage: string) => ({
  type: ACITON_PACKAGE_LOAD_ERROR,
  payload: { errorMessage },
});
export type PackageLoadErrorAction = ReturnType<typeof packageLoadError>;
export function isPackageLoadErrorAction(
  action: AnyAction
): action is PackageLoadErrorAction {
  return action.type === ACITON_PACKAGE_LOAD_ERROR;
}
