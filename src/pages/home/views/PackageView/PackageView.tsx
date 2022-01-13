import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useSelector } from "@/hooks/use-selector";

import { packageDataSelector } from "@/services/package/selectors/package";

import Page from "@/components/Page";
import Flow from "@/components/Flow";
import CommitTextBox from "@/components/CommitTextBox";
import CommitTextArea from "@/components/CommitTextArea";

import { packageDataSet } from "@/actions/packages/package-data-set";

import styles from "./PackageView.module.css";

const PackageView = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const packageData = useSelector(packageDataSelector);

  const onSetPackageName = React.useCallback((name: string) => {
    dispatch(packageDataSet("name", name));
  }, []);
  const onSetPackageAuthor = React.useCallback((author: string) => {
    dispatch(packageDataSet("author", author));
  }, []);
  const onSetPackageDescription = React.useCallback((description: string) => {
    dispatch(packageDataSet("description", description));
  }, []);

  return (
    <Page>
      <Flow className={styles["package-editor-content"]}>
        <div className={styles["package-editor-field"]}>
          <label>{t("package.name")}</label>
          <CommitTextBox
            value={packageData?.name ?? ""}
            onCommit={onSetPackageName}
          />
        </div>
        <div className={styles["package-editor-field"]}>
          <label>{t("package.author")}</label>
          <CommitTextBox
            value={packageData?.author ?? ""}
            onCommit={onSetPackageAuthor}
          />
        </div>
        <div className={styles["package-editor-field"]}>
          <label>{t("package.description")}</label>
          <CommitTextArea
            value={packageData?.description ?? ""}
            onCommit={onSetPackageDescription}
          />
        </div>
      </Flow>
    </Page>
  );
};

export default PackageView;
