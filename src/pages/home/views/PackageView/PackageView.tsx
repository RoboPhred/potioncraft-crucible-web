import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useSelector } from "@/hooks/use-selector";

import { packageDataSelector } from "@/services/package/selectors/package";

import Window from "@/components/Window";
import HorizontalPageFlow from "@/components/HorizontalPageFlow";
import CommitTextEditor from "@/components/CommitTextEditor";
import TextArea from "@/components/TextArea";

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
    <HorizontalPageFlow>
      <Window
        className={styles["package-editor"]}
        title={t("package.noun_titlecase")}
      >
        <table className={styles["package-editor-content"]}>
          <tbody>
            <tr>
              <td>{t("package.name")}</td>
              <td>
                <CommitTextEditor
                  value={packageData?.name ?? ""}
                  onCommit={onSetPackageName}
                />
              </td>
            </tr>
            <tr>
              <td>{t("package.author")}</td>
              <td>
                <CommitTextEditor
                  value={packageData?.author ?? ""}
                  onCommit={onSetPackageAuthor}
                />
              </td>
            </tr>
            <tr>
              <td>{t("package.description")}</td>
              <td>
                <CommitTextEditor
                  component={TextArea}
                  value={packageData?.description ?? ""}
                  onCommit={onSetPackageDescription}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Window>
    </HorizontalPageFlow>
  );
};

export default PackageView;