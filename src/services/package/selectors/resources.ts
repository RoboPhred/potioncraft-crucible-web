import { Utf8Decoder } from "@/text-encoding";

import { PackageState } from "../state";
import { createPackageSelector } from "../state-utils";

export const packageResourcesSelector = createPackageSelector(
  (s) => s.resources
);

export const packageTextResourceSelector = createPackageSelector(
  (state: PackageState, resourcePath: string) => {
    var resource = state.resources[resourcePath];
    if (resource == null) {
      return null;
    }

    return Utf8Decoder.decode(state.resources[resourcePath]);
  }
);
