import { MapEntity } from "@/map-config";

export interface CruciblePackage {
  name?: string;
  author?: string;
  description?: string;

  potionBases: CruciblePackagePotionBase[];
}

export type CruciblePackageSectionKey = "potionBases";
export type CruciblePackageSections = Pick<
  CruciblePackage,
  CruciblePackageSectionKey
>;

export interface CruciblePackagePotionBase {
  id: string;
  mapEntities: MapEntity[];
}
