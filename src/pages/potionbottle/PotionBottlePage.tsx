import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Redirect } from "react-router-dom";
import classNames from "classnames";

import { useSelector } from "@/hooks/use-selector";

import { packageIdObjectDataSelector } from "@/services/package/selectors/package";

import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import Page from "@/components/Page";
import Divider from "@/components/Divider";

import PotionBottleIcon from "./components/PotionBottleIcon";
import PotionBottleForeground from "./components/PotionBottleForeground";

import styles from "./PotionBottlePage.module.css";
import PotionBottleMask from "./components/PotionBottleMask";

import { makeLiquidEditor } from "./components/PotionBottleLiquidEditor";

const LiquidEditor1 = makeLiquidEditor(["liquidMain"]);
const LiquidEditor2 = makeLiquidEditor(["liquidMain", "liquid2Of2"]);
const LiquidEditor3 = makeLiquidEditor([
  "liquidMain",
  "liquid1Of3",
  "liquid3Of3",
]);

const LiquidEditor4 = makeLiquidEditor([
  "liquidMain",
  "liquid1Of4",
  "liquid3Of4",
  "liquid4Of4",
]);

const LiquidEditor5 = makeLiquidEditor([
  "liquidMain",
  "liquid1Of5",
  "liquid2Of5",
  "liquid4Of5",
  "liquid5Of5",
]);

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
          <div className={styles["potionbottle-title"]}>{potionBottle.id}</div>
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
          <div className={styles["potionbottle-liquids"]}>
            <LiquidEditor1 label="One Effect" potionBottleId={potionBottleId} />
            <LiquidEditor2
              label="Two Effects"
              potionBottleId={potionBottleId}
            />
            <LiquidEditor3
              label="Three Effects"
              potionBottleId={potionBottleId}
            />
            <LiquidEditor4
              label="Four Effects"
              potionBottleId={potionBottleId}
            />
            <LiquidEditor5
              label="Five Effects"
              potionBottleId={potionBottleId}
            />
          </div>
        </div>
      </Page>
    </>
  );
};

export default PotionBottlePage;
