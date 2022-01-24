import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useSelector } from "@/hooks/use-selector";

import { packageIdObjectDataSelector } from "@/services/package/selectors/package";

import { packageDataSetById } from "@/actions/packages/package-data-set-byid";

import FieldBox from "@/components/FieldBox";
import ColorButton from "@/components/ColorButton";

import styles from "./PotionBaseColor.module.css";

export interface PotionBaseColorProps {
  potionBaseId: string;
}

const PotionBaseColor = ({ potionBaseId }: PotionBaseColorProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const potionBase = useSelector((state) =>
    packageIdObjectDataSelector(state, "potionBases", potionBaseId)
  );

  const onSetColor = React.useCallback(
    (color: string) => {
      dispatch(
        packageDataSetById("potionBases", potionBaseId, "liquidColor", color)
      );
    },
    [potionBaseId]
  );

  if (!potionBase) {
    return null;
  }

  return (
    <div className={styles["potionbase-liquidcolor"]}>
      <ColorButton
        color={potionBase.liquidColor ?? "#FFFFFF"}
        onChange={onSetColor}
      />
      {t("potion_base.liquid_color")}
    </div>
  );
};

export default PotionBaseColor;
