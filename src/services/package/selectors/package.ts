import find from "lodash/find";

import { parseYaml } from "@/services/yaml/api";
import { AppState } from "@/state";

import { createPackageSelector } from "../state-utils";
import {
  CruciblePackage,
  CruciblePackageSectionKey,
  CruciblePackageSections,
} from "../types";

import { packageTextResourceSelector } from "./resources";
import { ItemOf } from "@/arrays";

export const packageLoadStatusSelector = createPackageSelector(
  (x) => x.loadingStatus
);

export const packageLoadErrorSelector = createPackageSelector(
  (x) => x.loadError
);

export const packageIdSelector = createPackageSelector((x) => x.packageId);

let cacheResources: any;
let cacheYaml: CruciblePackage | undefined;
export const packageDataSelector = createPackageSelector((state) => {
  if (state.loadingStatus !== "loaded") {
    return null;
  }

  if (cacheResources == state.resources) {
    return cacheYaml;
  }

  const yamlStr = packageTextResourceSelector.local(state, "package.yml");
  if (yamlStr == null) {
    return null;
  }

  const yaml = parseYaml(yamlStr, (resourePath) => {
    const resource = packageTextResourceSelector.local(state, resourePath);
    if (resource == null) {
      // TODO: We need to get this error to the user somehow...
      // This will probably just crash the react renderer.
      throw new Error(`Resource ${resourePath} not found`);
    }
    return resource;
  }) as CruciblePackage;

  cacheResources = state.resources;
  cacheYaml = yaml;

  return yaml;
});

export function packageIdObjectDataSelector<
  TKey extends CruciblePackageSectionKey
>(
  state: AppState,
  key: TKey,
  id: string
): ItemOf<CruciblePackageSections[TKey]> | null {
  const data = packageDataSelector(state);
  if (!data) {
    return null;
  }

  const entries = data[key];
  return (find(entries, (entry) => entry.id === id) as any) ?? null;
}
