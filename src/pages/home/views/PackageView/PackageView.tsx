import * as React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Window from "@/components/Window";
import PackageContentTree from "@/components/PackageContentTree";

import styles from "./PackageView.module.css";

const PackageView = () => {
  const { t } = useTranslation();
  return (
    <div className={styles["package-view"]}>
      <PackageContentTree className={styles["package-content"]} />
      <Window
        className={styles["package-editor"]}
        title={t("package.noun_titlecase")}
      >
        <Link to="/potion-bases">{t("potion_base.noun_titlecase_plural")}</Link>
      </Window>
    </div>
  );
};

export default PackageView;
