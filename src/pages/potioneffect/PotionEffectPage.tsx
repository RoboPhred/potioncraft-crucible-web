import * as React from "react";
import { RouteComponentProps } from "react-router";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";

import { extname } from "@/paths";

import { useSelector } from "@/hooks/use-selector";

import {
  packageIdObjectDataSelector,
  packageIdObjectResourceSelector,
} from "@/services/package/selectors/package";

import { packageResourceSetById } from "@/actions/packages/package-resource-set-byid";
import { packageDataSetById } from "@/actions/packages/package-data-set-byid";

import Window from "@/components/Window";
import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import HorizontalPageFlow from "@/components/HorizontalPageFlow";
import CommitTextBox from "@/components/CommitTextBox";
import ImageField from "@/components/ImageField";
import FieldBox from "@/components/FieldBox";
import ColorButton from "@/components/ColorButton";

import styles from "./PotionEffectPage.module.css";

interface PotionEffectPageParams {
  potionEffectId: string;
}

const PotionEffectPage = ({
  match: {
    params: { potionEffectId },
  },
}: RouteComponentProps<PotionEffectPageParams>) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const potionEffect = useSelector((state) =>
    packageIdObjectDataSelector(state, "potionEffects", potionEffectId)
  );

  const onSetName = React.useCallback(
    (name: string) => {
      dispatch(
        packageDataSetById("potionEffects", potionEffectId, "name", name)
      );
    },
    [potionEffectId]
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

  if (potionEffect == null) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <EnsurePackageLoaded />
      <HorizontalPageFlow>
        <Window
          className={styles["potioneffect-editor"]}
          title={t("potion_effect.noun_titlecase")}
        >
          <div className={styles["potioneffect-content"]}>
            <CommitTextBox
              value={potionEffect?.name ?? ""}
              placeholder={t("potion_effect.name")}
              onCommit={onSetName}
            />
            <ImageField
              imageResource={effectIcon}
              imageResourceName={potionEffect.name ?? null}
              onChange={setEffectIcon}
            />
            <FieldBox
              label={t("potion_effect.potion_color")}
              className={styles["potioneffect-potioncolor"]}
            >
              <ColorButton
                color={potionEffect.potionColor ?? "#FFFFFF"}
                onChange={onColorChange}
              />
            </FieldBox>
          </div>
        </Window>
      </HorizontalPageFlow>
    </>
  );
};

export default PotionEffectPage;
