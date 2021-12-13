import * as React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useSelector } from "@/hooks/use-selector";

import { packageDataSelector } from "@/services/package/selectors/package";

import Window from "@/components/Window";
import HorizontalPageFlow from "@/components/HorizontalPageFlow";
import CommitTextBox from "@/components/CommitTextBox";

import { packageDataSet } from "@/actions/packages/package-data-set";

import styles from "./PackageView.module.css";

const PackageView = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const packageData = useSelector(packageDataSelector);
  const onSetPackageName = React.useCallback((name: string) => {
    dispatch(packageDataSet("name", name));
  }, []);
  const onSetPackageDescription = React.useCallback((description: string) => {
    dispatch(packageDataSet("description", description));
  }, []);
  const onSetPackageAuthor = React.useCallback((description: string) => {
    dispatch(packageDataSet("author", description));
  }, []);
  return (
    <HorizontalPageFlow>
      <Window
        className={styles["package-editor"]}
        title={t("package.noun_titlecase")}
      >
        <div>
          {t("package.name")}:{" "}
          <CommitTextBox
            value={packageData?.name ?? ""}
            onCommit={onSetPackageName}
          />
        </div>
        <div>
          {t("package.author")}:{" "}
          <CommitTextBox
            value={packageData?.author ?? ""}
            onCommit={onSetPackageAuthor}
          />
        </div>
        <div>
          {t("package.description")}:{" "}
          <CommitTextBox
            textArea
            value={packageData?.description ?? ""}
            onCommit={onSetPackageDescription}
          />
        </div>
        <Link to="/potion-bases">{t("potion_base.noun_titlecase_plural")}</Link>
      </Window>
    </HorizontalPageFlow>
  );
};

export default PackageView;
