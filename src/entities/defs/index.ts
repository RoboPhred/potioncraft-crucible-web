import { MapEntity } from "@/map-config";

import { EntityDef } from "../types";

import DangerZonePartDef from "./DangerZonePart";
import ExperienceBonusDef from "./ExperienceBonus";
import PotionEffectDef from "./PotionEffect";
import VortexDef from "./Vortex";

export const EntityDefsByType: Record<MapEntity["entityType"], EntityDef> = {
  DangerZonePart: DangerZonePartDef,
  ExperienceBonus: ExperienceBonusDef,
  PotionEffect: PotionEffectDef,
  Vortex: VortexDef,
};
