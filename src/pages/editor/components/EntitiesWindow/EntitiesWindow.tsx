import * as React from "react";

import Window from "../Window";

import { EntityPrototype } from "./types";

import styles from "./EntitiesWindow.module.css";
import EntityCategory from "./components/EntityCategory";
import { PotionEffectMapEntity } from "@/map-config";

const PotionPrototypeEntities: EntityPrototype<PotionEffectMapEntity>[] = [
  {
    displayName: "Rich Harvest",
    entityType: "PotionEffect",
    effect: "Crop",
  },
  {
    displayName: "Invisibility",
    entityType: "PotionEffect",
    effect: "Invisibility",
  },
  {
    displayName: "Stone Skin",
    entityType: "PotionEffect",
    effect: "StoneSkin",
  },
  {
    displayName: "Fast Growth",
    entityType: "PotionEffect",
    effect: "Growth",
  },
  {
    displayName: "Slow Down",
    entityType: "PotionEffect",
    effect: "SlowDown",
  },
  {
    displayName: "Sleep",
    entityType: "PotionEffect",
    effect: "Sleep",
  },
  {
    displayName: "Sharp Vision",
    entityType: "PotionEffect",
    effect: "SharpVision",
  },
  {
    displayName: "Mana",
    entityType: "PotionEffect",
    effect: "Mana",
  },
  {
    displayName: "Lightning",
    entityType: "PotionEffect",
    effect: "Lightning",
  },
  {
    displayName: "Hallucinations",
    entityType: "PotionEffect",
    effect: "Hallucinations",
  },
  {
    displayName: "Fly",
    entityType: "PotionEffect",
    effect: "Fly",
  },
  {
    displayName: "Explosion",
    entityType: "PotionEffect",
    effect: "Explosion",
  },
  {
    displayName: "Charm",
    entityType: "PotionEffect",
    effect: "Charm",
  },
  {
    displayName: "Berserker",
    entityType: "PotionEffect",
    effect: "Berserker",
  },
  {
    displayName: "Light",
    entityType: "PotionEffect",
    effect: "Light",
  },
  {
    displayName: "Libido",
    entityType: "PotionEffect",
    effect: "Libido",
  },
  {
    displayName: "Bounce",
    entityType: "PotionEffect",
    effect: "Bounce",
  },
  {
    displayName: "Acid",
    entityType: "PotionEffect",
    effect: "Acid",
  },
  {
    displayName: "Fire",
    entityType: "PotionEffect",
    effect: "Fire",
  },
  {
    displayName: "Necromancy",
    entityType: "PotionEffect",
    effect: "Necromancy",
  },
  {
    displayName: "Frost",
    entityType: "PotionEffect",
    effect: "Frost",
  },
  {
    displayName: "Poison",
    entityType: "PotionEffect",
    effect: "Poison",
  },
  {
    displayName: "Healing",
    entityType: "PotionEffect",
    effect: "Healing",
  },
];

const EntityCategories: {
  categoryName: string;
  entities: EntityPrototype[];
}[] = [
  {
    categoryName: "Potion Effects",
    entities: PotionPrototypeEntities,
  },
];

const EntitiesWindow = () => {
  return (
    <Window className={styles["entities-window"]} title="Entities">
      <ul className={styles["entity-list"]}>
        {EntityCategories.map((category, i) => (
          <EntityCategory
            key={i}
            categoryName={category.categoryName}
            entities={category.entities}
          />
        ))}
      </ul>
    </Window>
  );
};

export default EntitiesWindow;
