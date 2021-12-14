import { v4 as uuidV4 } from "uuid";

import { stringifyYaml } from "@/services/yaml/api";
import { Encoder } from "@/text-encoding";

import { isPotionBaseNewAction } from "@/actions/potion-bases/potionbase-new";

import { packageDataSelector } from "../selectors/package";

import { createPackageReducer } from "../state-utils";
import { CruciblePackage, CruciblePackagePotionBase } from "../types";

export default createPackageReducer((state, action) => {
  if (!isPotionBaseNewAction(action)) {
    return state;
  }

  if (state.loadingStatus != "loaded") {
    return state;
  }

  const packageData = packageDataSelector.local(state);
  if (!packageData) {
    return state;
  }

  const newPotionBase: CruciblePackagePotionBase = {
    // TODO: Get id from user.
    id: `potionbase_${uuidV4()}`,
    name: "New Potion Base",
    unlockedOnStart: true,
    mapEntities: [],
  };

  const newPackageData: CruciblePackage = {
    ...packageData,
    potionBases: [...(packageData.potionBases ?? []), newPotionBase],
  };

  const newPackageStr = stringifyYaml(newPackageData);
  const newResource = Encoder.encode(newPackageStr);
  return {
    ...state,
    resources: {
      ...state.resources,
      ["package.yml"]: newResource,
    },
  };
});
