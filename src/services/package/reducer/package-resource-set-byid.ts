import findIndex from "lodash/findIndex";

import { fpSetByArray } from "@/fp-set";
import { Encoder } from "@/text-encoding";
import { stringifyYaml } from "@/services/yaml/api";

import { isPackageResourceSetByIdAction } from "@/actions/packages/package-resource-set-byid";

import { createPackageReducer } from "../state-utils";
import { packageDataSelector } from "../selectors/package";

export default createPackageReducer((state, action) => {
  if (!isPackageResourceSetByIdAction(action)) {
    return state;
  }

  const { sectionKey, id, path, resourceName, resource } = action.payload;

  if (state.loadingStatus != "loaded") {
    return state;
  }

  const packageData = packageDataSelector.local(state);
  if (!packageData) {
    return state;
  }

  const index = findIndex(packageData[sectionKey], (x) => x.id === id);
  if (index == -1) {
    // Should we try to make a new one?
    return state;
  }

  const newPackageData = fpSetByArray(
    packageData,
    [sectionKey, index, ...path],
    resourceName
  );
  const newPackgeStr = stringifyYaml(newPackageData);
  const newPackageResource = Encoder.encode(newPackgeStr);
  return {
    ...state,
    resources: {
      ...state.resources,
      "package.yml": newPackageResource,
      [resourceName]: resource,
    },
  };
});
