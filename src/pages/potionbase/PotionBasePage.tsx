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

  const onSetName = React.useCallback(
    (name: string) => {
      if (potionBase == null) {
        return;
      }
      dispatch(
        packageDataSetById("potionBases", potionBaseId, {
          ...potionBase,
          name,
        })
      );
    },
    [potionBase]
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
              <span>name:</span>
              <CommitTextBox value={potionBase.name} onCommit={onSetName} />
            </div>
            <Link to={`/potion-bases/${potionBaseId}/map-editor`}>
              Edit Map
            </Link>
          </Window>
        )}
      </HorizontalPageFlow>
    </>
  );
};

export default PotionBasePage;
