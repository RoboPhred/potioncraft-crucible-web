import * as React from "react";

import ImageField from "@/components/ImageField";
import { useIdObjectResource } from "@/services/package/hooks/use-idobject-resource";

import styles from "./PotionBaseTooltipImage.module.css";

export interface PotionBaseTooltipImageProps {
  potionBaseId: string;
}

const PotionBaseTooltipImage = ({
  potionBaseId,
}: PotionBaseTooltipImageProps) => {
  const [tooltipImage, tooltipImageName, onSetTooltipImage] =
    useIdObjectResource("potionBases", potionBaseId, "tooltipImage");

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
