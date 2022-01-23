import * as React from "react";

import { useIdObjectResource } from "@/services/package/hooks/use-idobject-resource";

import ImageField from "@/components/ImageField";

import styles from "./PotionBaseIcons.module.css";

export interface PotionbaseIconsProps {
  potionBaseId: string;
}

const PotionBaseIcons = ({ potionBaseId }: PotionbaseIconsProps) => {
  const [ingredientListIcon, ingredientListIconName, onSetIngredientListIcon] =
    useIdObjectResource("potionBases", potionBaseId, "ingredientListIcon");

  const [menuButtonImage, menuButtonImageName, onSetMenuButtonImage] =
    useIdObjectResource("potionBases", potionBaseId, "menuButtonImage");
  const [
    menuButtonHoverImage,
    menuButtonHoverImageName,
    onSetMenuButtonHoverImage,
  ] = useIdObjectResource("potionBases", potionBaseId, "menuButtonHoverImage");
  const [
    menuButtonSelectedImage,
    menuButtonSelectedImageName,
    onSetMenuButtonSelectedImage,
  ] = useIdObjectResource(
    "potionBases",
    potionBaseId,
    "menuButtonSelectedImage"
  );
  const [
    menuButtonLockedImage,
    menuButtonLockedImageName,
    onSetMenuButtonLockedImage,
  ] = useIdObjectResource("potionBases", potionBaseId, "menuButtonLockedImage");

  const [ladleImage, ladleImageName, onSetLadleImage] = useIdObjectResource(
    "potionBases",
    potionBaseId,
    "ladleImage"
  );
  const [recipeStepImage, recipeStepImageName, onSetRecipeStepImage] =
    useIdObjectResource("potionBases", potionBaseId, "recipeStepImage");
  const [mapOriginImage, mapOriginImageName, onSetMapOriginImage] =
    useIdObjectResource("potionBases", potionBaseId, "mapOriginImage");

  return (
    <div className={styles["potionbaseicons"]}>
      <ImageField
        className={styles["potionbaseicons-imagefield"]}
        imageResource={menuButtonImage}
        imageResourceName={menuButtonImageName}
        onChange={onSetMenuButtonImage}
      />
      <div className={styles["potionbaseicons-imagetext"]}>Menu</div>
      <ImageField
        className={styles["potionbaseicons-imagefield"]}
        imageResource={ingredientListIcon}
        imageResourceName={ingredientListIconName}
        onChange={onSetIngredientListIcon}
      />
      <div className={styles["potionbaseicons-imagetext"]}>Ingredients</div>
      <ImageField
        className={styles["potionbaseicons-imagefield"]}
        imageResource={menuButtonSelectedImage}
        imageResourceName={menuButtonSelectedImageName}
        onChange={onSetMenuButtonSelectedImage}
      />
      <div className={styles["potionbaseicons-imagetext"]}>Selected</div>
      <ImageField
        className={styles["potionbaseicons-imagefield"]}
        imageResource={recipeStepImage}
        imageResourceName={recipeStepImageName}
        onChange={onSetRecipeStepImage}
      />
      <div className={styles["potionbaseicons-imagetext"]}>Recipe</div>
      <ImageField
        className={styles["potionbaseicons-imagefield"]}
        imageResource={menuButtonHoverImage}
        imageResourceName={menuButtonHoverImageName}
        onChange={onSetMenuButtonHoverImage}
      />
      <div className={styles["potionbaseicons-imagetext"]}>Hover</div>
      <ImageField
        className={styles["potionbaseicons-imagefield"]}
        imageResource={ladleImage}
        imageResourceName={ladleImageName}
        onChange={onSetLadleImage}
      />
      <div className={styles["potionbaseicons-imagetext"]}>Ladle</div>
      <ImageField
        className={styles["potionbaseicons-imagefield"]}
        imageResource={menuButtonLockedImage}
        imageResourceName={menuButtonLockedImageName}
        onChange={onSetMenuButtonLockedImage}
      />
      <div className={styles["potionbaseicons-imagetext"]}>Locked</div>
      <ImageField
        className={styles["potionbaseicons-imagefield"]}
        imageResource={mapOriginImage}
        imageResourceName={mapOriginImageName}
        onChange={onSetMapOriginImage}
      />
      <div className={styles["potionbaseicons-imagetext"]}>Origin</div>
    </div>
  );
};

export default PotionBaseIcons;
