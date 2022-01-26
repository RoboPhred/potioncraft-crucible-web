import * as React from "react";

import DefaultTitlebarContent from "../DefaultTitlebarContent";
import Divider from "../Divider";
import PackageContentTree from "../PackageContentTree";
import TitleBar from "../TitleBar";

import styles from "./Page.module.css";

export interface PageProps {
  titlebarContent?: React.ReactNode;
  showContentTree?: boolean;
}

const Page: React.FC<PageProps> = ({
  titlebarContent,
  showContentTree = true,
  children,
}) => {
  return (
    <div className={styles["page"]}>
      <TitleBar>
        <DefaultTitlebarContent />
        {titlebarContent}
      </TitleBar>
      <Divider />
      <div className={styles["page-content"]}>
        {showContentTree && (
          <>
            <PackageContentTree className={styles["package-content"]} />
            <Divider orientation="vertical" />
          </>
        )}
        <div className={styles["page-children"]}>{children}</div>
      </div>
    </div>
  );
};

export default Page;
