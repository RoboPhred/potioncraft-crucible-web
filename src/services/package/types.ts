import { MapEntity } from "@/map-config";

export interface CruciblePackage {
  name?: string;
  author?: string;
  description?: string;

  potionBases: CruciblePackagePotionBase[];
  potionEffects: CruciblePackagePotionEffect[];
}

export type CruciblePackageSectionKey = "potionBases" | "potionEffects";
export type CruciblePackageSections = Pick<
  CruciblePackage,
  CruciblePackageSectionKey
>;

export interface CruciblePackageIdObject {
  id: string;
}

export interface CruciblePackagePotionBase extends CruciblePackageIdObject {
  name?: string;
  description?: string;
  unlockedOnStart?: boolean;
  liquidColor?: string;
  ingredientListIcon?: string;
  menuButtonImage?: string;
  menuButtonSelectedImage?: string;
  menuButtonHoverImage?: string;
  menuButtonLockedImage?: string;
  tooltipImage?: string;
  ladleImage?: string;
  recipeStepImage?: string;
  mapOriginImage?: string;
  mapEntities?: MapEntity[];
}

export interface CruciblePackagePotionEffect extends CruciblePackageIdObject {
  name?: string;
  icon?: string;
}
