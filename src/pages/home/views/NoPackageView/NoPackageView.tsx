import * as React from "react";
import { useTranslation } from "react-i18next";

import HorizontalPageFlow from "@/components/HorizontalPageFlow";

import styles from "./NoPackageView.module.css";

const NoPackageView = () => {
  const { t } = useTranslation();
  return (
    <HorizontalPageFlow showContentTree={false}>
      <div className={styles["text"]}>{t("package.message_no_package")}</div>
    </HorizontalPageFlow>
  );
};

export default NoPackageView;
