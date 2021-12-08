import { isPackageNewAction } from "@/actions/packages/package-new";
import { Encoder } from "@/text-encoding";
import { defaultPackageState } from "../state";

import { createPackageReducer } from "../state-utils";

export default createPackageReducer((state, action) => {
  if (!isPackageNewAction(action)) {
    return state;
  }

  return {
    ...defaultPackageState,
    packageId: "new-package",
    loadingStatus: "loaded",
    resources: {
      "package.yml": Encoder.encode(`{}`),
    },
  };
});
