import { MapEntity } from "@/map-config";

export interface CruciblePackage {
  name?: string;
  author?: string;
  description?: string;

  potionBases: CruciblePackagePotionBase[];
}

export interface CruciblePackagePotionBase {
  id: string;
  mapEntities: MapEntity[];
}