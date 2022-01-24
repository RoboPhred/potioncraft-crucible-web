import * as React from "react";
import classNames from "classnames";

import { extname } from "@/paths";

import { useIdObjectResource } from "@/services/package/hooks/use-idobject-resource";

import styles from "./PotionBottleLiquidPreview.module.css";
import { useSelector } from "@/hooks/use-selector";
import {
  packageIdObjectDataSelector,
  packageIdObjectResourceSelector,
} from "@/services/package/selectors/package";

export type PotionBottleLiquidKey =
  | "liquidMain"
  | "liquid2Of2"
  | "liquid1Of3"
  | "liquid3Of3"
  | "liquid1Of4"
  | "liquid3Of4"
  | "liquid4Of4"
  | "liquid1Of5"
  | "liquid2Of5"
  | "liquid4Of5"
  | "liquid5Of5";

export interface PotionBottleLiquidPreviewProps {
  potionBottleId: string;
}

export function makeLiquidPreview(artKeys: PotionBottleLiquidKey[]) {
  const PotionBottleLiquidPreview = ({
    potionBottleId,
  }: PotionBottleLiquidPreviewProps) => {
    const foreground = useSelector((state) =>
      packageIdObjectResourceSelector(
        state,
        "potionBottles",
        potionBottleId,
        "bottleForeground"
      )
    );

    const potionBottle = useSelector((state) =>
      packageIdObjectDataSelector(state, "potionBottles", potionBottleId)
    );

    const resourceUrls: string[] = [];

    for (let i = 0; i < artKeys.length; i++) {
      const resource = useSelector((state) =>
        packageIdObjectResourceSelector(
          state,
          "potionBottles",
          potionBottleId,
          artKeys[i]
        )
      );
      const resourceName = potionBottle && potionBottle[artKeys[i]];

      if (!resource || !resourceName) {
        continue;
      }

      const resourceUrl = URL.createObjectURL(
        new Blob([resource.buffer], {
          type: `image/${extname(resourceName)}`,
        })
      );

      resourceUrls.push(resourceUrl);
    }

    if (!potionBottle) {
      return null;
    }

    const foregroundUrl = foreground
      ? URL.createObjectURL(
          new Blob([foreground.buffer], {
            type: `image/${extname(potionBottle.bottleForeground ?? "")}`,
          })
        )
      : null;

    return (
      <div className={styles["liquidpreview-container"]}>
        {resourceUrls.map((resourceUrl, i) => (
          <img
            className={classNames(
              styles["liquidpreview-effect"],
              (styles as any)["liquidpreview-effect-" + (i + 1)]
            )}
            key={i}
            src={resourceUrl}
          />
        ))}
        {foregroundUrl && (
          <img className={styles["liquidpreview-effect"]} src={foregroundUrl} />
        )}
      </div>
    );
  };

  return PotionBottleLiquidPreview;
}
