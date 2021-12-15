import { isPackageDataSetAction } from "@/actions/packages/package-data-set";
import { fpSetByArray } from "@/fp-set";
import { stringifyYaml } from "@/services/yaml/api";
import { Encoder } from "@/text-encoding";
import { packageDataSelector } from "../selectors/package";
import { createPackageReducer } from "../state-utils";

export default createPackageReducer((state, action) => {
  if (!isPackageDataSetAction(action)) {
    return state;
  }

  const { path, data } = action.payload;

  if (state.loadingStatus != "loaded") {
    return state;
  }

  const packageData = packageDataSelector.local(state);
  if (!packageData) {
    return state;
  }

  const newPackageData = fpSetByArray(packageData, path, data);
  const newPackageStr = stringifyYaml(newPackageData);
  const newPackageResource = Encoder.encode(newPackageStr);
  return {
    ...state,
    resources: {
      ...state.resources,
      "package.yml": newPackageResource,
    },
  };
});
