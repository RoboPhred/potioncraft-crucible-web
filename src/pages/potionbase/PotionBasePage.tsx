import * as React from "react";
import { RouteComponentProps } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useSelector } from "@/hooks/use-selector";

import Window from "@/components/Window";
import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import HorizontalPageFlow from "@/components/HorizontalPageFlow";
import CommitTextBox from "@/components/CommitTextBox";

import { packageIdObjectDataSelector } from "@/services/package/selectors/package";

import styles from "./PotionBasePage.module.css";
import { packageDataSetById } from "@/actions/packages/package-data-set-byid";

interface PotionBaseRouteParams {
  potionBaseId: string;
}

const PotionBasePage: React.FC<RouteComponentProps<PotionBaseRouteParams>> = ({
  match: {
    params: { potionBaseId },
  },
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const potionBase = useSelector((state) =>
    packageIdObjectDataSelector(state, "potionBases", potionBaseId)
  );

  const onSetName = React.useCallback((name: string) => {
    if (potionBase == null) {
      return;
    }
    dispatch(packageDataSetById("potionBases", potionBaseId, "name", name));
  }, []);

  const onSetUnlockedOnStart = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (potionBase == null) {
        return;
      }
      dispatch(
        packageDataSetById(
          "potionBases",
          potionBaseId,
          "unlockOnStart",
          e.target.checked
        )
      );
    },
    []
  );

  return (
    <>
      <EnsurePackageLoaded />
      <HorizontalPageFlow>
        {!potionBase && <div>{t("potion_base.not_found")}</div>}
        {potionBase && (
          <Window
            className={styles["potionbase-editor"]}
            title={t("potion_base.noun_titlecase_plural")}
          >
            <div>
              {t("potion_base.name")}:
              <CommitTextBox value={potionBase.name} onCommit={onSetName} />
            </div>
            <div>
              {t("potion_base.unlock_on_start")}:{" "}
              <input
                type="checkbox"
                checked={potionBase.unlockOnStart ?? false}
                onChange={onSetUnlockedOnStart}
              />
            </div>

            <Link to={`/potion-bases/${potionBaseId}/map-editor`}>
              {t("potion_base.edit_map")}
            </Link>
          </Window>
        )}
      </HorizontalPageFlow>
    </>
  );
};

export default PotionBasePage;
