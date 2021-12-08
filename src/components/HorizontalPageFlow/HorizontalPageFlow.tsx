import * as React from "react";

import DefaultTitlebarContent from "../DefaultTitlebarContent";
import PackageContentTree from "../PackageContentTree";
import TitleBar from "../TitleBar";

import styles from "./HorizontalPageFlow.module.css";

export interface HorizontalPageFlowProps {
  titlebarContent?: React.ReactNode;
  showContentTree?: boolean;
}

const HorizontalPageFlow: React.FC<HorizontalPageFlowProps> = ({
  titlebarContent,
  showContentTree = true,
  children,
}) => {
  return (
    <div className={styles["horizontal-page-flow"]}>
      <TitleBar>
        <DefaultTitlebarContent />
        {titlebarContent}
      </TitleBar>
      <div className={styles["horizontal-page-flow-content"]}>
        {showContentTree && (
          <PackageContentTree className={styles["package-content"]} />
        )}
        {children}
      </div>
    </div>
  );
};

export default HorizontalPageFlow;
