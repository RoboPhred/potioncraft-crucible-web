import * as React from "react";
import { RouteComponentProps } from "react-router";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";

import { useSelector } from "@/hooks/use-selector";

import { packageIdObjectDataSelector } from "@/services/package/selectors/package";

import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import Page from "@/components/Page";
import Flow from "@/components/Flow";

import PotionEffectName from "./components/PotionEffectName";
import PotionEffectIcon from "./components/PotionEffectIcon";
import PotionEffectColor from "./components/PotionEffectColor";

import styles from "./PotionEffectPage.module.css";

interface PotionEffectPageParams {
  potionEffectId: string;
}

const PotionEffectPage = ({
  match: {
    params: { potionEffectId },
  },
}: RouteComponentProps<PotionEffectPageParams>) => {
  const { t } = useTranslation();

  const potionEffect = useSelector((state) =>
    packageIdObjectDataSelector(state, "potionEffects", potionEffectId)
  );

  if (!potionEffect) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <EnsurePackageLoaded />
      <Page>
        <Flow>
          <div className={styles["potioneffect-content"]}>
            <PotionEffectName potionEffectId={potionEffectId} />
            <PotionEffectIcon potionEffectId={potionEffectId} />
            <PotionEffectColor potionEffectId={potionEffectId} />
          </div>
        </Flow>
      </Page>
    </>
  );
};

export default PotionEffectPage;
