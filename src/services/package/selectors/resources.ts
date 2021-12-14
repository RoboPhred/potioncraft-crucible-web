import { Utf8Decoder } from "@/text-encoding";

import { PackageState } from "../state";
import { createPackageSelector } from "../state-utils";

export const packageResourcesSelector = createPackageSelector(
  (s) => s.resources
);

export const packageResourceSelector = createPackageSelector(
  (state: PackageState, resourcePath: string) => {
    const resource = state.resources[resourcePath];
    if (resource == null) {
      return null;
    }
    return resource;
  }
);

export const packageTextResourceSelector = createPackageSelector(
  (state: PackageState, resourcePath: string) => {
    const resource = state.resources[resourcePath];
    if (resource == null) {
      return null;
    }

    return Utf8Decoder.decode(state.resources[resourcePath]);
  }
);
