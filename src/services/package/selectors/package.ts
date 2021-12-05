import { parseYaml } from "@/services/yaml/api";

import { createPackageSelector } from "../state-utils";

import { packageTextResourceSelector } from "./resources";

export const packageLoadStatusSelector = createPackageSelector(
  (x) => x.loadingStatus
);

export const packageLoadErrorSelector = createPackageSelector(
  (x) => x.loadError
);

let cacheResources: any;
let cacheYaml: any;
export const packageDataSelector = createPackageSelector((state) => {
  if (state.loadingStatus !== "loaded") {
    return null;
  }

  if (cacheResources == state.resources) {
    return cacheYaml;
  }

  const yamlStr =
    packageTextResourceSelector.local(state, "package.yml") ??
    packageTextResourceSelector.local(state, "package.yaml");
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
  });

  cacheResources = state.resources;
  cacheYaml = yaml;

  return yaml;
});
