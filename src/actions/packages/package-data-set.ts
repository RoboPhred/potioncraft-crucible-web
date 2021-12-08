import { CruciblePackage } from "@/services/package/types";
import { AnyAction } from "redux";

export const ACTION_PACKGE_DATA_SET = "package-data-set" as const;
export function packageDataSet<K1 extends keyof CruciblePackage>(
  k1: K1,
  data: CruciblePackage[K1]
): PackageDataSetAction;
export function packageDataSet<
  K1 extends keyof CruciblePackage,
  K2 extends keyof CruciblePackage[K1]
>(k1: K1, k2: K2, data: CruciblePackage[K1][K2]): PackageDataSetAction;
export function packageDataSet<
  K1 extends keyof CruciblePackage,
  K2 extends keyof CruciblePackage[K1],
  K3 extends keyof CruciblePackage[K1][K2]
>(
  k1: K1,
  k2: K2,
  k3: K3,
  data: CruciblePackage[K1][K2][K3]
): PackageDataSetAction;
export function packageDataSet<
  K1 extends keyof CruciblePackage,
  K2 extends keyof CruciblePackage[K1],
  K3 extends keyof CruciblePackage[K1][K2],
  K4 extends keyof CruciblePackage[K1][K2][K3]
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  data: CruciblePackage[K1][K2][K3][K4]
): PackageDataSetAction;
export function packageDataSet(...args: any[]): PackageDataSetAction {
  return {
    type: ACTION_PACKGE_DATA_SET,
    payload: {
      path: args.slice(0, args.length - 1),
      data: args[args.length - 1],
    },
  };
}
export interface PackageDataSetAction {
  type: typeof ACTION_PACKGE_DATA_SET;
  payload: {
    path: string[];
    data: any;
  };
}
export function isPackageDataSetAction(
  action: AnyAction
): action is PackageDataSetAction {
  return action.type === ACTION_PACKGE_DATA_SET;
}
