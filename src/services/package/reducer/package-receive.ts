import { AnyAction } from "redux";

import { isPackageReceiveAction } from "@/actions/package-receive";

import { defaultPackageState, PackageState } from "../state";
import { createPackageReducer } from "../state-utils";

export default createPackageReducer(
  (state: PackageState, action: AnyAction) => {
    if (!isPackageReceiveAction(action)) {
      return state;
    }

    const { packageId, resources } = action.payload;

    return {
      ...defaultPackageState,
      loadingStatus: "loaded",
      packageId,
      resources,
    };
  }
);
