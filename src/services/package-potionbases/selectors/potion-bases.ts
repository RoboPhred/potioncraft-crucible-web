import { AppState } from "@/state";

import { packageDataSelector } from "@/services/package/selectors/package";

const EmptyArray: string[] = [];
export const potionBaseIdsSelector = (state: AppState) => {
  const packageData = packageDataSelector(state);
  if (!packageData) {
    return EmptyArray;
  }

  const ids: string[] =
    packageData.potionBases?.map(
      (potionBase: any) => potionBase.id as string
    ) ?? EmptyArray;
  return ids;
};
