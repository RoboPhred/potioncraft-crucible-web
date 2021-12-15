import { stringifyYaml } from "@/services/yaml/api";
import { Encoder } from "@/text-encoding";

import { isPotionBaseNewAction } from "@/actions/potion-bases/potionbase-new";

import {
  packageDataSelector,
  packageIdObjectDataSelector,
} from "../selectors/package";

import { createPackageReducer } from "../state-utils";
import { CruciblePackage, CruciblePackagePotionBase } from "../types";

export default createPackageReducer((state, action, appState) => {
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

  const { potionBaseId } = action.payload;

  const exists = packageIdObjectDataSelector(
    appState,
    "potionBases",
    potionBaseId
  );
  if (exists != null) {
    return state;
  }

  const newPotionBase: CruciblePackagePotionBase = {
    id: potionBaseId,
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
      "package.yml": newResource,
    },
  };
});
