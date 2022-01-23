import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Redirect } from "react-router-dom";
import classNames from "classnames";

import { useSelector } from "@/hooks/use-selector";

import { packageIdObjectDataSelector } from "@/services/package/selectors/package";

import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import Page from "@/components/Page";
import Divider from "@/components/Divider";
import IdObjectResourceField from "@/components/IdObjectResourceField";

import PotionBottleIcon from "./components/PotionBottleIcon";
import PotionBottleForeground from "./components/PotionBottleForeground";

import styles from "./PotionBottlePage.module.css";
import PotionBottleMask from "./components/PotionBottleMask";

const PotionBottleResourceField = IdObjectResourceField.ofType("potionBottles");

interface PotionBottlePageParams {
  potionBottleId: string;
}

const PotionBottlePage = ({
  match: {
    params: { potionBottleId },
  },
}: RouteComponentProps<PotionBottlePageParams>) => {
  const potionBottle = useSelector((state) =>
    packageIdObjectDataSelector(state, "potionBottles", potionBottleId)
  );

  if (!potionBottle) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <EnsurePackageLoaded />
      <Page>
        <div className={styles["potionbottle-content"]}>
          <h1>{potionBottle.id}</h1>
          <Divider />
          <div className={styles["potionbottle-section"]}>
            <div
              className={classNames(
                styles["potionbottle-section-item"],
                styles["potionbottle-icon"]
              )}
            >
              <div className={styles["potionbottle-section-title"]}>Icon</div>
              <PotionBottleIcon
                className={styles["potionbottle-section-art"]}
                potionBottleId={potionBottleId}
              />
            </div>
          </div>
          <div className={styles["potionbottle-section"]}>
            <div
              className={classNames(
                styles["potionbottle-section-item"],
                styles["potionbottle-bottleart"]
              )}
            >
              <div className={styles["potionbottle-section-title"]}>
                Foreground
              </div>
              <PotionBottleForeground
                className={styles["potionbottle-section-art"]}
                potionBottleId={potionBottleId}
              />
            </div>
            <div
              className={classNames(
                styles["potionbottle-section-item"],
                styles["potionbottle-bottleart"]
              )}
            >
              <div className={styles["potionbottle-section-title"]}>Mask</div>
              <PotionBottleMask
                className={styles["potionbottle-section-art"]}
                potionBottleId={potionBottleId}
              />
            </div>
          </div>
          <PotionBottleResourceField
            resourceKey="liquidMain"
            objectId={potionBottleId}
            accept="image/png"
          />
        </div>
      </Page>
    </>
  );
};

export default PotionBottlePage;
