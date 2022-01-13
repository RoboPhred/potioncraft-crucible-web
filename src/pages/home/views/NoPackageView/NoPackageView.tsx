import * as React from "react";
import { useTranslation } from "react-i18next";

import Page from "@/components/Page";

import styles from "./NoPackageView.module.css";

const NoPackageView = () => {
  const { t } = useTranslation();
  return (
    <Page showContentTree={false}>
      <div className={styles["text"]}>{t("package.message_no_package")}</div>
    </Page>
  );
};

export default NoPackageView;
