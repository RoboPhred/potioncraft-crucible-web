import * as React from "react";
import { useTranslation } from "react-i18next";

import { VortexMapEntity } from "@/map-config";

import EntitiesDropButton, {
  DropButtonEntityPrefab,
} from "./EntitiesDropButton";

function vortexPrototype(
  type: string
): DropButtonEntityPrefab<VortexMapEntity> {
  return {
    i18nKey: `entities.vortexes.type_names.${type}`,
    entityType: "Vortex",
    prefab: type,
  };
}

const vortexItems = [vortexPrototype("Medium"), vortexPrototype("Large")];

const PotionEffectsDropButton = () => {
  const { t } = useTranslation();
  return (
    <EntitiesDropButton entityPrototypes={vortexItems}>
      {t("entities.vortexes.noun_titlecase_plural")}
    </EntitiesDropButton>
  );
};

export default PotionEffectsDropButton;
