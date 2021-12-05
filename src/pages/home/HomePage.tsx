import * as React from "react";

import TitleBar from "@/components/TitleBar";
import DefaultTitlebarContent from "@/components/DefaultTitlebarContent";

import { useSelector } from "@/hooks/use-selector";
import { packageLoadStatusSelector } from "@/services/package/selectors/package";

import NoPackageView from "./views/NoPackageView";
import LoadingPackageView from "./views/LoadingPackageView";
import PackageView from "./views/PackageView";
import LoadErrorView from "./views/LoadErrorView";

import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const loadingState = useSelector(packageLoadStatusSelector);
  return (
    <div className={styles["home-page"]}>
      <TitleBar>
        <DefaultTitlebarContent />
      </TitleBar>
      {loadingState == "idle" && <NoPackageView />}
      {loadingState == "loading" && <LoadingPackageView />}
      {loadingState == "loaded" && <PackageView />}
      {loadingState == "error" && <LoadErrorView />}
    </div>
  );
};

export default HomePage;
