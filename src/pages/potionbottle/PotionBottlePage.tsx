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

import { makeLiquidPreview } from "./components/PotionBottleLiquidPreview";

const LiquidEffect1Preview = makeLiquidPreview(["liquidMain"]);
const LiquidEffect2Preview = makeLiquidPreview(["liquidMain", "liquid2Of2"]);
const LiquidEffect3Preview = makeLiquidPreview([
  "liquidMain",
  "liquid1Of3",
  "liquid3Of3",
]);

const LiquidEffect4Preview = makeLiquidPreview([
  "liquidMain",
  "liquid1Of4",
  "liquid3Of4",
  "liquid4Of4",
]);

const LiquidEffect5Preview = makeLiquidPreview([
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
          <div className={styles["potionbottle-section"]}>
            <div
              className={classNames(
                styles["potionbottle-section-item"],
                styles["potionbottle-bottleart"]
              )}
            >
              <div className={styles["potionbottle-section-title"]}>
                One Effect
              </div>
              <LiquidEffect1Preview potionBottleId={potionBottleId} />
            </div>
            <div
              className={classNames(
                styles["potionbottle-section-item"],
                styles["potionbottle-bottleart"]
              )}
            >
              <div className={styles["potionbottle-section-title"]}>
                Two Effects
              </div>
              <LiquidEffect2Preview potionBottleId={potionBottleId} />
            </div>
            <div
              className={classNames(
                styles["potionbottle-section-item"],
                styles["potionbottle-bottleart"]
              )}
            >
              <div className={styles["potionbottle-section-title"]}>
                Three Effects
              </div>
              <LiquidEffect3Preview potionBottleId={potionBottleId} />
            </div>
            <div
              className={classNames(
                styles["potionbottle-section-item"],
                styles["potionbottle-bottleart"]
              )}
            >
              <div className={styles["potionbottle-section-title"]}>
                Four Effects
              </div>
              <LiquidEffect4Preview potionBottleId={potionBottleId} />
            </div>
            <div
              className={classNames(
                styles["potionbottle-section-item"],
                styles["potionbottle-bottleart"]
              )}
            >
              <div className={styles["potionbottle-section-title"]}>
                Five Effects
              </div>
              <LiquidEffect5Preview potionBottleId={potionBottleId} />
            </div>
          </div>
        </div>
      </Page>
    </>
  );
};

export default PotionBottlePage;
