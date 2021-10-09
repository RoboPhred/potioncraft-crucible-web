export interface MapEntityBase {
  entityType: string;
  x: number;
  y: number;
}

export interface PotionEffectMapEntity extends MapEntityBase {
  entityType: "PotionEffect";
  effect: string;
}

export interface VortexMapEntity extends MapEntityBase {
  entityType: "Vortex";
  size: string;
}

export interface DangerZonePartMapEntity extends MapEntityBase {
  entityType: "DangerZonePart";
  type: string;
}

export type MapEntity =
  | PotionEffectMapEntity
  | VortexMapEntity
  | DangerZonePartMapEntity;
