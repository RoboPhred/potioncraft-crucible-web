import * as React from "react";

import { useSelector } from "@/hooks/use-selector";
import { packageLoadStatusSelector } from "@/services/package/selectors/package";

import NoPackageView from "./views/NoPackageView";
import LoadingPackageView from "./views/LoadingPackageView";
import PackageView from "./views/PackageView";
import LoadErrorView from "./views/LoadErrorView";

const HomePage: React.FC = () => {
  const loadingState = useSelector(packageLoadStatusSelector);
  return (
    <>
      {loadingState == "idle" && <NoPackageView />}
      {loadingState == "loading" && <LoadingPackageView />}
      {loadingState == "loaded" && <PackageView />}
      {loadingState == "error" && <LoadErrorView />}
    </>
  );
};

export default HomePage;
