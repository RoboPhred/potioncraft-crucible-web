import { AnyAction } from "redux";

import {
  CruciblePackageSectionKey,
  CruciblePackageSections,
} from "@/services/package/types";

export const ACTION_PACKAGE_DATA_SET_BYID = "package-data-set-byid";

export function packageDataSetById<
  TSectionKey extends CruciblePackageSectionKey
>(
  sectionKey: TSectionKey,
  id: string,
  data: CruciblePackageSections[TSectionKey][0]
): PackageDataSetByIdAction;
export function packageDataSetById<
  TSectionKey extends CruciblePackageSectionKey,
  K1 extends keyof CruciblePackageSections[TSectionKey][0]
>(
  sectionKey: TSectionKey,
  id: string,
  k1: K1,
  data: CruciblePackageSections[TSectionKey][0][K1]
): PackageDataSetByIdAction;
export function packageDataSetById(
  sectionKey: string,
  id: string,
  ...args: string[]
) {
  return {
    type: ACTION_PACKAGE_DATA_SET_BYID,
    payload: {
      sectionKey,
      id,
      path: args.slice(0, args.length - 1),
      data: args[args.length - 1],
    },
  };
}

export interface PackageDataSetByIdAction {
  type: typeof ACTION_PACKAGE_DATA_SET_BYID;
  payload: {
    sectionKey: CruciblePackageSectionKey;
    id: string;
    path: string[];
    data: any;
  };
}

export function isPackageDataSetByIdAction(
  action: AnyAction
): action is PackageDataSetByIdAction {
  return action.type === ACTION_PACKAGE_DATA_SET_BYID;
}
