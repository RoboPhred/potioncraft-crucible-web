import { AnyAction } from "redux";

import { CruciblePackageSectionKey } from "@/services/package/types";

export const ACTION_PACKAGE_IDOBJECT_NEW = "package-idobject-new";
export const packageIdObjectNew = (
  key: CruciblePackageSectionKey,
  id: string
) => ({
  type: ACTION_PACKAGE_IDOBJECT_NEW,
  payload: { key, id },
});
export type PackageIdObjectNewAction = ReturnType<typeof packageIdObjectNew>;
export function isPackageIdObjectNewAction(
  action: AnyAction
): action is PackageIdObjectNewAction {
  return action.type === ACTION_PACKAGE_IDOBJECT_NEW;
}
