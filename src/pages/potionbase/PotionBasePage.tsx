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
        <div className={styles["potionbase-editor-content"]}>
          <Flow className={styles["potionbase-editor-overview"]}>
            <PotionBaseName potionBaseId={potionBaseId} />
            <Divider />
            <PotionBaseTooltipImage potionBaseId={potionBaseId} />
            <Divider />
            <PotionBaseDescription
              className={styles["potioncraft-editor-description"]}
              potionBaseId={potionBaseId}
            />
          </Flow>
          <FieldBox
            label={t("potion_base.settings")}
            className={styles["potionbase-editor-settings"]}
          >
            <PotionBaseColor potionBaseId={potionBaseId} />
            <label>
              <input
                type="checkbox"
                checked={potionBase.unlockedOnStart}
                onChange={onSetUnlockedOnStart}
              />
              {t("potion_base.unlocked_on_start")}
            </label>
          </FieldBox>
          <PotionBaseIcons
            className={styles["potionbase-editor-icons"]}
            potionBaseId={potionBaseId}
          />
          <LinkButton
            className={styles["potionbase-editor-map"]}
            variant="primary"
            to={`/potion-bases/${potionBaseId}/map-editor`}
          >
            {t("potion_base.edit_map")}
          </LinkButton>
        </div>
      </Page>
    </>
  );
};

export default PotionBasePage;
