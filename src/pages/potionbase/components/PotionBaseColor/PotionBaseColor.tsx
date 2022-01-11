import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { SliderPicker, ColorResult } from "react-color";

import { useSelector } from "@/hooks/use-selector";

import { packageIdObjectDataSelector } from "@/services/package/selectors/package";

import { packageDataSetById } from "@/actions/packages/package-data-set-byid";
import FieldBox from "@/components/FieldBox";

import styles from "./PotionBaseColor.module.css";

export interface PotionBaseColorProps {
  potionBaseId: string;
}

const PotionBaseColor = ({ potionBaseId }: PotionBaseColorProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [bufferColor, setBufferColor] = React.useState<string | null>(null);

  const potionBase = useSelector((state) =>
    packageIdObjectDataSelector(state, "potionBases", potionBaseId)
  );

  const onSetColor = React.useCallback((color: ColorResult) => {
    setBufferColor(color.hex);
  }, []);

  const onSetColorCommit = React.useCallback(
    (color: ColorResult) => {
      setBufferColor(null);
      dispatch(
        packageDataSetById(
          "potionBases",
          potionBaseId,
          "liquidColor",
          color.hex
        )
      );
    },
    [potionBaseId]
  );

  if (!potionBase) {
    return null;
  }

  return (
    <FieldBox
      label={t("potion_base.liquid_color")}
      className={styles["potionbase-liquidcolor"]}
    >
      <svg width="50px" height="50px">
        <circle
          cx={25}
          cy={25}
          r={25}
          fill={bufferColor ?? potionBase.liquidColor ?? "#FFFFFF"}
        />
      </svg>
      <SliderPicker
        color={bufferColor ?? potionBase.liquidColor ?? "#FFFFFF"}
        onChange={onSetColor}
        onChangeComplete={onSetColorCommit}
      />
    </FieldBox>
  );
};

export default PotionBaseColor;
