import { createPackageSelector } from "../state-utils";

export const packageLoadStatusSelector = createPackageSelector(
  (x) => x.loadingStatus
);

export const packageLoadErrorSelector = createPackageSelector(
  (x) => x.loadError
);
