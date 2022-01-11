import * as React from "react";
import { useTranslation } from "react-i18next";

import { DangerZonePartMapEntity } from "@/map-config";

import { SpawnableEntityPrototype } from "@/services/map-editor/entities/types";

import EntitiesDropButton from "./EntitiesDropButton";

function bonePrototype(
  type: string
): SpawnableEntityPrototype<DangerZonePartMapEntity> {
  return {
    i18nKey: `entities.danger_zone_parts.type_names.${type}`,
    entityType: "DangerZonePart",
    prefab: type,
    angle: 0,
  };
}

const boneItems = [
  bonePrototype("Skull1"),
  bonePrototype("Bone1"),
  bonePrototype("Bone2"),
  bonePrototype("Fang1"),
  bonePrototype("Fang2"),
];

const PotionEffectsDropButton = () => {
  const { t } = useTranslation();
  return (
    <EntitiesDropButton entityPrototypes={boneItems}>
      {t("entities.danger_zone_parts.noun_titlecase_plural")}
    </EntitiesDropButton>
  );
};

export default PotionEffectsDropButton;
