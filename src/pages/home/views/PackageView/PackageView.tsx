import * as React from "react";

import { useSelector } from "@/hooks/use-selector";

import { packageTextResourceSelector } from "@/services/package/selectors/resources";

import PackageContentTree from "@/components/PackageContentTree";

import styles from "./PackageView.module.css";

const PackageView = () => {
  const pkg = useSelector((state) =>
    packageTextResourceSelector(state, "package.yml")
  );
  return (
    <div className={styles["package-view"]}>
      <PackageContentTree className={styles["package-content"]} />
    </div>
  );
};

export default PackageView;
