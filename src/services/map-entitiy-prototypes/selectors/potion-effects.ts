import { createSelector } from "reselect";
import values from "lodash/values";

import { AppState } from "@/state";
import { PotionEffectMapEntity } from "@/map-config";

import { packageIdObjectsSelector } from "@/services/package/selectors/package";

import { SpawnableEntityPrototype } from "../types";

function potionEffectPrototype(
  effect: string
): SpawnableEntityPrototype<PotionEffectMapEntity> {
  return {
    i18nKey: `potioncraft:effects.${effect}`,
    entityType: "PotionEffect",
    effect,
    angle: 0,
  };
}

const defaultPotionEffects = [
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

export const potionEffectEntityPrototypesSelector = createSelector(
  (state: AppState) => packageIdObjectsSelector(state, "potionEffects"),
  (potionEffects) => {
    return [
      ...defaultPotionEffects,
      ...values(potionEffects).map((potionEffect) => ({
        displayName: `${potionEffect.name} (${potionEffect.id})`,
        entityType: "PotionEffect" as const,
        effect: potionEffect.id,
        angle: 0,
      })),
    ];
  }
);
