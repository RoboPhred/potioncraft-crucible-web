import { Buffer } from "buffer";
import { createSelector } from "reselect";

import { AppState } from "@/state";

import { packageIdObjectsSelector } from "@/services/package/selectors/package";
import { packageResourcesSelector } from "@/services/package/selectors/resources";

import { RenderResources } from "../types";

const PotionEffectImages: Record<string, string> = {
  "potionEffect::Acid": require("@/assets/PotionEffects/Acid.webp"),
  "potionEffect::Berserker": require("@/assets/PotionEffects/Berserker.webp"),
  "potionEffect::Bounce": require("@/assets/PotionEffects/Bounce.webp"),
  "potionEffect::Charm": require("@/assets/PotionEffects/Charm.webp"),
  "potionEffect::Crop": require("@/assets/PotionEffects/Crop.webp"),
  "potionEffect::Explosion": require("@/assets/PotionEffects/Explosion.webp"),
  "potionEffect::Fire": require("@/assets/PotionEffects/Fire.webp"),
  "potionEffect::Fly": require("@/assets/PotionEffects/Fly.webp"),
  "potionEffect::Frost": require("@/assets/PotionEffects/Frost.webp"),
  "potionEffect::Growth": require("@/assets/PotionEffects/Growth.webp"),
  "potionEffect::Hallucinations": require("@/assets/PotionEffects/Hallucinations.webp"),
  "potionEffect::Healing": require("@/assets/PotionEffects/Healing.webp"),
  "potionEffect::Invisibility": require("@/assets/PotionEffects/Invisibility.webp"),
  "potionEffect::Libido": require("@/assets/PotionEffects/Libido.webp"),
  "potionEffect::Light": require("@/assets/PotionEffects/Light.webp"),
  "potionEffect::Lightning": require("@/assets/PotionEffects/Lightning.webp"),
  "potionEffect::Mana": require("@/assets/PotionEffects/Mana.webp"),
  "potionEffect::Necromancy": require("@/assets/PotionEffects/Necromancy.webp"),
  "potionEffect::Poison": require("@/assets/PotionEffects/Poison.webp"),
  "potionEffect::SharpVision": require("@/assets/PotionEffects/SharpVision.webp"),
  "potionEffect::Sleep": require("@/assets/PotionEffects/Sleep.webp"),
  "potionEffect::SlowDown": require("@/assets/PotionEffects/SlowDown.webp"),
  "potionEffect::StoneSkin": require("@/assets/PotionEffects/StoneSkin.webp"),
};

export const renderResourcesSelector = createSelector(
  (state: AppState) => packageIdObjectsSelector(state, "potionEffects"),
  (state: AppState) => packageResourcesSelector(state),
  (potionEffects, resources) => {
    const renderResources: RenderResources = {
      ...PotionEffectImages,
    };

    for (const effect of potionEffects) {
      if (!effect.icon || !resources[effect.icon]) {
        continue;
      }

      const effectIcon = resources[effect.icon];
      renderResources[
        `potionEffect::${effect.id}`
      ] = `data:image/png;base64,${Buffer.from(effectIcon).toString("base64")}`;
    }

    return renderResources;
  }
);
