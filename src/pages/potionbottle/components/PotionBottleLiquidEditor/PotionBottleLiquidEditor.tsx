import * as React from "react";
import classNames from "classnames";

import { extname } from "@/paths";

import { useSelector } from "@/hooks/use-selector";
import {
  packageIdObjectDataSelector,
  packageIdObjectResourceSelector,
} from "@/services/package/selectors/package";

import IdObjectResourceField from "@/components/IdObjectResourceField";

const PotionBottleResourceField = IdObjectResourceField.ofType("potionBottles");

import styles from "./PotionBottleLiquidEditor.module.css";

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
  label: string;
  potionBottleId: string;
}

export function makeLiquidEditor(artKeys: PotionBottleLiquidKey[]) {
  const PotionBottleLiquidEditor = ({
    label,
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
      <div className={styles["liquidpreview"]}>
        <div className={styles["liquidpreview-art"]}>
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
            <img
              className={styles["liquidpreview-effect"]}
              src={foregroundUrl}
            />
          )}
          <label className={styles["liquidpreview-label"]}>{label}</label>
        </div>
        <div className={styles["liquidpreview-assets"]}>
          {artKeys.map((artKey, i) => (
            <PotionBottleResourceField
              key={i}
              accept="image/png"
              objectId={potionBottleId}
              resourceKey={artKey}
              resourceName={artKey}
            >
              {`Effect ${i + 1}`}
            </PotionBottleResourceField>
          ))}
        </div>
      </div>
    );
  };

  return PotionBottleLiquidEditor;
}
