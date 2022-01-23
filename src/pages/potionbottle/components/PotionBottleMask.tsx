import * as React from "react";

import ImageField from "@/components/ImageField";
import { useIdObjectResource } from "@/services/package/hooks/use-idobject-resource";

export interface PotionBottleMaskProps {
  className?: string;
  potionBottleId: string;
}

const PotionBottleMask = ({
  className,
  potionBottleId,
}: PotionBottleMaskProps) => {
  const [iconResource, iconResourceName, onSetIcon] = useIdObjectResource(
    "potionBottles",
    potionBottleId,
    "bottleMask"
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

export default PotionBottleMask;
