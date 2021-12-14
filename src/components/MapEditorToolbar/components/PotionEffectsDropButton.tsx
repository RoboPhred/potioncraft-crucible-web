import * as React from "react";
import { useTranslation } from "react-i18next";

import { PotionEffectMapEntity } from "@/map-config";

import EntitiesDropButton, {
  DropButtonEntityPrefab,
} from "./EntitiesDropButton";

function potionEffectPrototype(
  effect: string
): DropButtonEntityPrefab<PotionEffectMapEntity> {
  return {
    i18nKey: `potioncraft:effects.${effect}`,
    entityType: "PotionEffect",
    effect,
    angle: 0,
  };
}

const potionEffectItems = [
  potionEffectPrototype("Crop"),
  potionEffectPrototype("Invisibility"),
  potionEffectPrototype("StoneSkin"),
  potionEffectPrototype("Growth"),
  potionEffectPrototype("SlowDown"),
  potionEffectPrototype("Sleep"),
  potionEffectPrototype("SharpVision"),
  potionEffectPrototype("Mana"),
  potionEffectPrototype("Lightning"),
  potionEffectPrototype("Hallucinations"),
  potionEffectPrototype("Fly"),
  potionEffectPrototype("Explosion"),
  potionEffectPrototype("Charm"),
  potionEffectPrototype("Berserker"),
  potionEffectPrototype("Light"),
  potionEffectPrototype("Libido"),
  potionEffectPrototype("Bounce"),
  potionEffectPrototype("Acid"),
  potionEffectPrototype("Fire"),
  potionEffectPrototype("Necromancy"),
  potionEffectPrototype("Frost"),
  potionEffectPrototype("Poison"),
  potionEffectPrototype("Healing"),
];

const PotionEffectsDropButton = () => {
  const { t } = useTranslation();
  return (
    <EntitiesDropButton entityPrototypes={potionEffectItems}>
      {t("potion_effects.noun_titlecase_plural")}
    </EntitiesDropButton>
  );
};

export default PotionEffectsDropButton;
