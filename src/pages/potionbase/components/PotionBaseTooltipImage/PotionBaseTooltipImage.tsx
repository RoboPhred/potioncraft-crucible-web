import * as React from "react";

import ImageField from "@/components/ImageField";
import { usePotionBaseResource } from "@/services/package/hooks/use-potionbase-resource";

import styles from "./PotionBaseTooltipImage.module.css";

export interface PotionBaseTooltipImageProps {
  potionBaseId: string;
}

const PotionBaseTooltipImage = ({
  potionBaseId,
}: PotionBaseTooltipImageProps) => {
  const [tooltipImage, tooltipImageName, onSetTooltipImage] =
    usePotionBaseResource(potionBaseId, "tooltipImage");

  return (
    <ImageField
      className={styles["potionbasetooltipimage"]}
      imageResource={tooltipImage}
      imageResourceName={tooltipImageName}
      onChange={onSetTooltipImage}
    />
  );
};

export default PotionBaseTooltipImage;
