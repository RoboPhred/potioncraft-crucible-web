export interface MapEntityBase {
  entityType: string;
  x: number;
  y: number;
}

export interface PotionEffectMapEntity extends MapEntityBase {
  entityType: "PotionEffect";
  effect: string;
  angle: number;
}

export interface VortexMapEntity extends MapEntityBase {
  entityType: "Vortex";
  prefab: string;
}

export interface DangerZonePartMapEntity extends MapEntityBase {
  entityType: "DangerZonePart";
  prefab: string;
  angle: number;
}

export interface ExperienceBonusMapEntity extends MapEntityBase {
  entityType: "ExperienceBonus";
  prefab: string;
}

export type MapEntity =
  | PotionEffectMapEntity
  | VortexMapEntity
  | DangerZonePartMapEntity
  | ExperienceBonusMapEntity;
