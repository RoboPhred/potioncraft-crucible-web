import { AppState } from "@/state";
import { emptyFrozenArray } from "@/arrays";

import { packageDataSelector } from "@/services/package/selectors/package";

export const potionBaseIdsSelector = (state: AppState) => {
  const packageData = packageDataSelector(state);
  if (!packageData) {
    return emptyFrozenArray<string>();
  }

  const ids: string[] =
    packageData.potionBases?.map(
      (potionBase: any) => potionBase.id as string
    ) ?? emptyFrozenArray<string>();
  return ids;
};
