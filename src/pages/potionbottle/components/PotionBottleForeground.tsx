import * as React from "react";

import ImageField from "@/components/ImageField";
import { useIdObjectResource } from "@/services/package/hooks/use-idobject-resource";

export interface PotionBottleForegroundProps {
  className?: string;
  potionBottleId: string;
}

const PotionBottleForeground = ({
  className,
  potionBottleId,
}: PotionBottleForegroundProps) => {
  const [iconResource, iconResourceName, onSetIcon] = useIdObjectResource(
    "potionBottles",
    potionBottleId,
    "bottleForeground"
  );

  return (
    <ImageField
      className={className}
      imageResource={iconResource}
      imageResourceName={iconResourceName}
      onChange={onSetIcon}
    />
  );
};

export default PotionBottleForeground;
