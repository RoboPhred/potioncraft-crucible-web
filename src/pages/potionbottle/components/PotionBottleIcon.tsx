import * as React from "react";

import ImageField from "@/components/ImageField";
import { useIdObjectResource } from "@/services/package/hooks/use-idobject-resource";

export interface PotionBottleIconProps {
  className?: string;
  potionBottleId: string;
}

const PotionBottleIcon = ({
  className,
  potionBottleId,
}: PotionBottleIconProps) => {
  const [iconResource, iconResourceName, onSetIcon] = useIdObjectResource(
    "potionBottles",
    potionBottleId,
    "bottleIcon"
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

export default PotionBottleIcon;
