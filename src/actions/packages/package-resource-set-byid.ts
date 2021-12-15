import { AnyAction } from "redux";

import {
  CruciblePackageSectionKey,
  CruciblePackageSections,
} from "@/services/package/types";

export const ACTION_PACKAGE_RESOURCE_SET_BYID = "package-resource-set-byid";

export function packageResourceSetById<
  TSectionKey extends CruciblePackageSectionKey,
  K1 extends keyof CruciblePackageSections[TSectionKey][0]
>(
  sectionKey: TSectionKey,
  id: string,
  k1: K1,
  resourceName: string,
  resource: Uint8Array
): PackageResourceSetByIdAction;
export function packageResourceSetById(
  sectionKey: string,
  id: string,
  ...args: any[]
) {
  return {
    type: ACTION_PACKAGE_RESOURCE_SET_BYID,
    payload: {
      sectionKey,
      id,
      path: args.slice(0, args.length - 2),
      resourceName: args[args.length - 2],
      resource: args[args.length - 1],
    },
  };
}

export interface PackageResourceSetByIdAction {
  type: typeof ACTION_PACKAGE_RESOURCE_SET_BYID;
  payload: {
    sectionKey: CruciblePackageSectionKey;
    id: string;
    path: string[];
    resourceName: string;
    resource: Uint8Array;
  };
}

export function isPackageResourceSetByIdAction(
  action: AnyAction
): action is PackageResourceSetByIdAction {
  return action.type === ACTION_PACKAGE_RESOURCE_SET_BYID;
}
