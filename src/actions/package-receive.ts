import { AnyAction } from "redux";

export const ACTION_PACKAGE_RECEIVE = "package-receive" as const;
export const packageReceive = (
  packageId: string,
  resources: Record<string, Uint8Array>
) => ({
  type: ACTION_PACKAGE_RECEIVE,
  payload: { packageId, resources },
});
export type PackageReceiveAction = ReturnType<typeof packageReceive>;
export function isPackageReceiveAction(
  action: AnyAction
): action is PackageReceiveAction {
  return action.type === ACTION_PACKAGE_RECEIVE;
}
