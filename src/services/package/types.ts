import { MapEntity } from "@/map-config";

export interface CruciblePackage {
  name?: string;
  author?: string;
  description?: string;

  ingredients: CruciblePackageIngredient[];
  potionBases: CruciblePackagePotionBase[];
  potionEffects: CruciblePackagePotionEffect[];
}

export type CruciblePackageSectionKey =
  | "ingredients"
  | "potionBases"
  | "potionEffects";
export type CruciblePackageSections = Pick<
  CruciblePackage,
  CruciblePackageSectionKey
>;

export interface CruciblePackageIdObject {
  id: string;
}

export interface CruciblePackageIngredient extends CruciblePackageIdObject {
  name?: string;
  description?: string;
  inheritFrom?: string;
  inventoryImage?: string;
  recipeStepImage?: string;
  ingredientListIcon?: string;
  basePrice?: number;
  path?: string;
  grindStartPercent?: string;
  groundColor: string;
  isTeleportationIngredient?: boolean;
  stackItems?: CruciblePackageIngredientStackItem[];
  isStackItemSolid?: boolean;
  soldBy?: any[];
}

export interface CruciblePackageIngredientStackItem {
  sprite?: string;
  collision?: string;
  selfCollision: string;
  positionInStack: { x: number; y: number };
  angleInStack: number;
  grindsInto: CruciblePackageIngredientStackItem[];
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
  potionColor?: string;
}
