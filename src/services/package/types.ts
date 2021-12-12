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
  name: string;
  description?: string;
  unlockOnStart?: boolean;
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
