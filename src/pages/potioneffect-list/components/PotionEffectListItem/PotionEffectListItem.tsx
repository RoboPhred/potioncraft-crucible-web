import * as React from "react";
import { Link } from "react-router-dom";

import { extname } from "@/paths";

import { useSelector } from "@/hooks/use-selector";

import {
  packageIdObjectDataSelector,
  packageIdObjectResourceSelector,
} from "@/services/package/selectors/package";

import styles from "./PotionEffectListItem.module.css";

export interface PotionEffectListItemProps {
  potionEffectId: string;
}

const colorRadius = 17;

const PotionEffectListItem = ({
  potionEffectId,
}: PotionEffectListItemProps) => {
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
  const effectIconName = potionEffect?.icon;

  const imageUrl = React.useMemo(() => {
    if (effectIcon == null || effectIconName == null) {
      return null;
    }
    return URL.createObjectURL(
      new Blob([effectIcon.buffer], {
        type: `image/${extname(effectIconName)}`,
      })
    );
  }, [effectIcon, effectIconName]);

  return (
    <Link
      className={styles["potioneffect-listitem"]}
      to={`/potion-effects/${potionEffectId}`}
    >
      {imageUrl && (
        <img className={styles["potioneffect-listitem-icon"]} src={imageUrl} />
      )}
      <svg
        className={styles["potioneffect-listitem-color"]}
        width={`${colorRadius * 2}px`}
        height={`${colorRadius * 2}px`}
      >
        <circle
          cx={colorRadius}
          cy={colorRadius}
          r={colorRadius}
          fill={potionEffect?.potionColor ?? "transparent"}
        />
      </svg>
      {potionEffectId}
    </Link>
  );
};

export default PotionEffectListItem;
