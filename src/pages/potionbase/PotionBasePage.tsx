import * as React from "react";
import { RouteComponentProps } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useSelector } from "@/hooks/use-selector";

import { packageDataSetById } from "@/actions/packages/package-data-set-byid";

import Window from "@/components/Window";
import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import HorizontalPageFlow from "@/components/HorizontalPageFlow";
import FieldBox from "@/components/FieldBox";

import { packageIdObjectDataSelector } from "@/services/package/selectors/package";

import styles from "./PotionBasePage.module.css";
import PotionBaseName from "./components/PotionBaseName/PotionBaseName";
import Divider from "./components/Divider/Divider";
import PotionBaseTooltipImage from "./components/PotionBaseTooltipImage/PotionBaseTooltipImage";
import PotionBaseDescription from "./components/PotionBaseDescription/PotionBaseDescription";
import PotionBaseIcons from "./components/PotionBaseIcons/PotionBaseIcons";

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

  const onSetUnlockedOnStart = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (potionBase == null) {
        return;
      }
      dispatch(
        packageDataSetById(
          "potionBases",
          potionBaseId,
          "unlockedOnStart",
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
            title={t("potion_base.noun_titlecase")}
          >
            <div className={styles["potionbase-editor-content"]}>
              <div className={styles["potionbase-editor-left"]}>
                <PotionBaseName potionBaseId={potionBaseId} />
                <Divider />
                <PotionBaseTooltipImage potionBaseId={potionBaseId} />
                <Divider />
                <PotionBaseDescription potionBaseId={potionBaseId} />
              </div>
              <div className={styles["potionbase-editor-right"]}>
                <FieldBox
                  className={styles["potion-editor-settings"]}
                  label={t("potion_base.settings")}
                >
                  <div>
                    {t("potion_base.unlock_on_start")}:{" "}
                    <input
                      type="checkbox"
                      checked={potionBase.unlockedOnStart ?? false}
                      onChange={onSetUnlockedOnStart}
                    />
                  </div>
                </FieldBox>
                <div className={styles["potion-editor-icons"]}>
                  <PotionBaseIcons potionBaseId={potionBaseId} />
                </div>
                <Link to={`/potion-bases/${potionBaseId}/map-editor`}>
                  {t("potion_base.edit_map")}
                </Link>
              </div>
            </div>
          </Window>
        )}
      </HorizontalPageFlow>
    </>
  );
};

export default PotionBasePage;
