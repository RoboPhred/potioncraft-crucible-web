import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useSelector } from "@/hooks/use-selector";

import { packageDataSetById } from "@/actions/packages/package-data-set-byid";

import { packageIdObjectDataSelector } from "@/services/package/selectors/package";
import FieldBox from "@/components/FieldBox";
import ColorButton from "@/components/ColorButton";

import styles from "./PotionEffectColor.module.css";

export interface PotionEffectColorProps {
  potionEffectId: string;
}

const PotionEffectColor = ({ potionEffectId }: PotionEffectColorProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const potionEffect = useSelector((state) =>
    packageIdObjectDataSelector(state, "potionEffects", potionEffectId)
  );

  const onColorChange = React.useCallback(
    (color: string) => {
      dispatch(
        packageDataSetById(
          "potionEffects",
          potionEffectId,
          "potionColor",
          color
        )
      );
    },
    [potionEffectId]
  );

  if (!potionEffect) {
    return null;
  }

  return (
    <FieldBox
      label={t("potion_effect.potion_color")}
      className={styles["potioncolor-button"]}
    >
      <ColorButton
        color={potionEffect.potionColor ?? "#FFFFFF"}
        onChange={onColorChange}
      />
    </FieldBox>
  );
};

export default PotionEffectColor;
