export interface PackageState {
  packageId: string | null;
  loadingStatus: "idle" | "loading" | "loaded" | "error";
  loadError: string | null;
  resources: Record<string, Uint8Array>;
}

const _defaultState: PackageState = {
  packageId: null,
  loadingStatus: "idle",
  loadError: null,
  resources: {},
};

export const defaultPackageState = Object.freeze(_defaultState);
