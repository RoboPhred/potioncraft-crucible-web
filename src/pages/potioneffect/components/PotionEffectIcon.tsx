import * as React from "react";
import { useDispatch } from "react-redux";

import { extname } from "@/paths";

import { useSelector } from "@/hooks/use-selector";

import {
  packageIdObjectDataSelector,
  packageIdObjectResourceSelector,
} from "@/services/package/selectors/package";

import { packageResourceSetById } from "@/actions/packages/package-resource-set-byid";

import ImageField from "@/components/ImageField";

export interface PotionEffectIconProps {
  potionEffectId: string;
}

const PotionEffectIcon = ({ potionEffectId }: PotionEffectIconProps) => {
  const dispatch = useDispatch();

  const potionEffect = useSelector((state) =>
    packageIdObjectDataSelector(state, "potionEffects", potionEffectId)
  );

  const effectIcon = useSelector((state) =>
    packageIdObjectResourceSelector(
      state,
      "potionEffects",
      potionEffectId,
      "icon"
    )
  );
  const setEffectIcon = React.useCallback(
    (image: Uint8Array, imageName: string) => {
      dispatch(
        packageResourceSetById(
          "potionEffects",
          potionEffectId,
          "icon",
          `${potionEffectId}/icon.${extname(imageName)}`,
          image
        )
      );
    },
    [potionEffectId]
  );

  if (!potionEffect) {
    return null;
  }

  return (
    <ImageField
      imageResource={effectIcon}
      imageResourceName={potionEffect.name ?? null}
      onChange={setEffectIcon}
    />
  );
};

export default PotionEffectIcon;
