import * as React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Window from "@/components/Window";
import HorizontalPageFlow from "@/components/HorizontalPageFlow";

import styles from "./PackageView.module.css";

const PackageView = () => {
  const { t } = useTranslation();
  return (
    <HorizontalPageFlow>
      <Window
        className={styles["package-editor"]}
        title={t("package.noun_titlecase")}
      >
        <Link to="/potion-bases">{t("potion_base.noun_titlecase_plural")}</Link>
      </Window>
    </HorizontalPageFlow>
  );
};

export default PackageView;
