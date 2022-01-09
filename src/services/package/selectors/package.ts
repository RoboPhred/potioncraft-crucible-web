import find from "lodash/find";

import { AppState } from "@/state";
import { emptyFrozenArray, ItemOf } from "@/arrays";

import { parseYaml } from "@/services/yaml/api";

import { createPackageSelector } from "../state-utils";
import {
  CruciblePackage,
  CruciblePackageIdObject,
  CruciblePackageSectionKey,
  CruciblePackageSections,
} from "../types";

import {
  packageResourceSelector,
  packageTextResourceSelector,
} from "./resources";
import { forEach } from "lodash";
import { createSelector } from "reselect";

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

export function packageIdObjectIdsSelector(
  state: AppState,
  key: CruciblePackageSectionKey
): string[] {
  const data = packageDataSelector(state);
  if (!data) {
    return [];
  }

  const ids = data[key]?.map(
    (idObject: CruciblePackageIdObject) => idObject.id
  );
  if (ids == null) {
    return emptyFrozenArray<string>();
  }

  return ids;
}

export function packageIdObjectsSelector<
  TKey extends CruciblePackageSectionKey
>(state: AppState, key: TKey): CruciblePackageSections[TKey] {
  const data = packageDataSelector(state);
  if (data == null || data[key] == null) {
    return emptyFrozenArray<ItemOf<CruciblePackageSections[TKey]>>();
  }
  return data[key];
}

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

  // This cast should be unnecessary, since all CruciblePackageSections are arrays of id objects.
  // Typescript doesnt seem to agree though.
  const entries = data[key] as CruciblePackageIdObject[];
  return (find(entries, (entry) => entry.id === id) as any) ?? null;
}

export function packageIdObjectResourceSelector<
  TSection extends CruciblePackageSectionKey,
  TK1 extends keyof ItemOf<CruciblePackageSections[TSection]>
>(state: AppState, key: TSection, id: string, k1: TK1): Uint8Array | null {
  const data = packageIdObjectDataSelector(state, key, id);
  if (!data) {
    return null;
  }

  const resourcePath = data[k1] as unknown;
  if (typeof resourcePath !== "string") {
    return null;
  }

  return packageResourceSelector(state, resourcePath);
}
