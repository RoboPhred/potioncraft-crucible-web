import * as React from "react";
import { RouteComponentProps } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { useSelector } from "@/hooks/use-selector";

import { packageDataSetById } from "@/actions/packages/package-data-set-byid";

import { packageIdObjectDataSelector } from "@/services/package/selectors/package";

import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import Page from "@/components/Page";
import Flow from "@/components/Flow";
import FieldBox from "@/components/FieldBox";
import LinkButton from "@/components/Button/LinkButton";
import Divider from "@/components/Divider";

import PotionBaseName from "./components/PotionBaseName/PotionBaseName";
import PotionBaseTooltipImage from "./components/PotionBaseTooltipImage/PotionBaseTooltipImage";
import PotionBaseDescription from "./components/PotionBaseDescription/PotionBaseDescription";
import PotionBaseIcons from "./components/PotionBaseIcons/PotionBaseIcons";
import PotionBaseColor from "./components/PotionBaseColor";

import styles from "./PotionBasePage.module.css";

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
      dispatch(
        packageDataSetById(
          "potionBases",
          potionBaseId,
          "unlockedOnStart",
          e.target.checked
        )
      );
    },
    [potionBaseId]
  );

  if (!potionBase) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <EnsurePackageLoaded />
      <Page>
        <Flow>
          <div className={styles["potionbase-editor-content"]}>
            <div className={styles["potionbase-editor-panels"]}>
              <div className={styles["potionbase-editor-left"]}>
                <PotionBaseName potionBaseId={potionBaseId} />
                <Divider />
                <PotionBaseTooltipImage potionBaseId={potionBaseId} />
                <Divider />
                <PotionBaseColor potionBaseId={potionBaseId} />
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
              </div>
            </div>
            <LinkButton
              variant="primary"
              to={`/potion-bases/${potionBaseId}/map-editor`}
            >
              {t("potion_base.edit_map")}
            </LinkButton>
          </div>
        </Flow>
      </Page>
    </>
  );
};

export default PotionBasePage;
