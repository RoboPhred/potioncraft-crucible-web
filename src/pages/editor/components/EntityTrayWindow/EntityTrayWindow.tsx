import * as React from "react";

import { PotionEffectMapEntity } from "@/map-config";

import Window from "../Window";

import { EntityTrayItemData } from "./types";

import styles from "./EntityTrayWindow.module.css";
import EntityCategory from "./components/EntityCategory";

function potionEffectPrototype(
  effect: string
): EntityTrayItemData<PotionEffectMapEntity> {
  return {
    i18nKey: `potioncraft:effects.${effect}`,
    entityType: "PotionEffect",
    effect,
  };
}

const EntityCategories: {
  i18nKey: string;
  entities: EntityTrayItemData[];
}[] = [
  {
    i18nKey: "potion_effects",
    entities: [
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
    ],
  },
];

const EntitiesWindow = () => {
  return (
    <Window className={styles["entity-tray-window"]} title="Entities">
      <ul className={styles["entity-tray-list"]}>
        {EntityCategories.map((category, i) => (
          <EntityCategory
            key={i}
            i18nKey={category.i18nKey}
            entities={category.entities}
          />
        ))}
      </ul>
    </Window>
  );
};

export default EntitiesWindow;
