import { AnyAction } from "redux";

import { isPackageLoadFileAction } from "@/actions/packages/package-load-file";

import { defaultPackageState, PackageState } from "../state";
import { createPackageReducer } from "../state-utils";

export default createPackageReducer(
  (state: PackageState, action: AnyAction) => {
    if (!isPackageLoadFileAction(action)) {
      return state;
    }

    const { file } = action.payload;

    return {
      ...defaultPackageState,
      packageId: file.name,
      loadingStatus: "loading",
    };
  }
);
