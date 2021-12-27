import { stringifyYaml } from "@/services/yaml/api";
import { Encoder } from "@/text-encoding";

import { isPackageIdObjectNewAction } from "@/actions/packages/package-idobject-new";

import {
  packageDataSelector,
  packageIdObjectDataSelector,
} from "../selectors/package";

import { createPackageReducer } from "../state-utils";
import { CruciblePackage, CruciblePackageIdObject } from "../types";

export default createPackageReducer((state, action, appState) => {
  if (!isPackageIdObjectNewAction(action)) {
    return state;
  }

  if (state.loadingStatus != "loaded") {
    return state;
  }

  const packageData = packageDataSelector.local(state);
  if (!packageData) {
    return state;
  }

  const { key, id } = action.payload;

  const exists = packageIdObjectDataSelector(appState, key, id);
  if (exists != null) {
    return state;
  }

  const newItem: CruciblePackageIdObject = {
    id,
  };

  const newPackageData: CruciblePackage = {
    ...packageData,
    [key]: [...(packageData[key] ?? []), newItem],
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
