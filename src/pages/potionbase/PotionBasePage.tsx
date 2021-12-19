import * as React from "react";
import { RouteComponentProps } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { extname } from "@/paths";

import { useSelector } from "@/hooks/use-selector";

import { packageDataSetById } from "@/actions/packages/package-data-set-byid";

import Window from "@/components/Window";
import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import HorizontalPageFlow from "@/components/HorizontalPageFlow";
import CommitTextBox from "@/components/CommitTextBox";
import ImageField from "@/components/ImageField";
import TextArea from "@/components/TextArea";
import FieldBox from "@/components/FieldBox";

import {
  packageIdObjectDataSelector,
  packageIdObjectResourceSelector,
} from "@/services/package/selectors/package";

import styles from "./PotionBasePage.module.css";
import { packageResourceSetById } from "@/actions/packages/package-resource-set-byid";
import { CruciblePackage } from "@/services/package/types";
import { ItemOf } from "@/arrays";
import PotionBaseName from "./components/PotionBaseName/PotionBaseName";
import Divider from "./components/Divider/Divider";
import { usePotionBaseResource } from "@/services/package/hooks/use-potionbase-resource";
import PotionBaseTooltipImage from "./components/PotionBaseTooltipImage/PotionBaseTooltipImage";
import PotionBaseDescription from "./components/PotionBaseDescription/PotionBaseDescription";

interface PotionBaseRouteParams {
  potionBaseId: string;
}

const PotionBasePage: React.FC<RouteComponentProps<PotionBaseRouteParams>> = ({
  match: {
    params: { potionBaseId },
  },
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const potionBase = useSelector((state) =>
    packageIdObjectDataSelector(state, "potionBases", potionBaseId)
  );

  const [ingredientListIcon, a, onSetIngredientListIcon] =
    usePotionBaseResource(potionBaseId, "ingredientListIcon");

  const [menuButtonImage, b, onSetMenuButtonImage] = usePotionBaseResource(
    potionBaseId,
    "menuButtonImage"
  );
  const [menuButtonHoverImage, c, onSetMenuButtonHoverImage] =
    usePotionBaseResource(potionBaseId, "menuButtonHoverImage");
  const [menuButtonSelectedImage, d, onSetMenuButtonSelectedImage] =
    usePotionBaseResource(potionBaseId, "menuButtonSelectedImage");
  const [menuButtonLockedImage, e, onSetMenuButtonLockedImage] =
    usePotionBaseResource(potionBaseId, "menuButtonLockedImage");

  const [ladleImage, f, onSetLadleImage] = usePotionBaseResource(
    potionBaseId,
    "ladleImage"
  );
  const [recipeStepImage, g, onSetRecipeStepImage] = usePotionBaseResource(
    potionBaseId,
    "recipeStepImage"
  );
  const [mapOriginImage, h, onSetMapOriginImage] = usePotionBaseResource(
    potionBaseId,
    "mapOriginImage"
  );

  const onSetUnlockedOnStart = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (potionBase == null) {
        return;
      }
      dispatch(
        packageDataSetById(
          "potionBases",
          potionBaseId,
          "unlockedOnStart",
          e.target.checked
        )
      );
    },
    []
  );

  return (
    <>
      <EnsurePackageLoaded />
      <HorizontalPageFlow>
        {!potionBase && <div>{t("potion_base.not_found")}</div>}
        {potionBase && (
          <Window
            className={styles["potionbase-editor"]}
            title={t("potion_base.noun_titlecase")}
          >
            <div className={styles["potionbase-editor-content"]}>
              <div className={styles["potionbase-editor-left"]}>
                <PotionBaseName potionBaseId={potionBaseId} />
                <Divider />
                <PotionBaseTooltipImage potionBaseId={potionBaseId} />
                <Divider />
                <PotionBaseDescription potionBaseId={potionBaseId} />
              </div>
              <div>
                <div>
                  <div>
                    {t("potion_base.unlock_on_start")}:{" "}
                    <input
                      type="checkbox"
                      checked={potionBase.unlockedOnStart ?? false}
                      onChange={onSetUnlockedOnStart}
                    />
                  </div>
                  <FieldBox label={t("potion_base.recipe_images")}>
                    <table>
                      <thead>
                        <tr>
                          <th>Ingredient Icon</th>
                          <th>Recipe Icon</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <ImageField
                              desiredWidth={50}
                              desiredHeight={50}
                              imageResource={ingredientListIcon}
                              imageResourceName={
                                potionBase!.ingredientListIcon ?? null
                              }
                              onChange={onSetIngredientListIcon}
                            />
                          </td>
                          <td>
                            <ImageField
                              desiredWidth={50}
                              desiredHeight={50}
                              imageResource={recipeStepImage}
                              imageResourceName={
                                potionBase!.recipeStepImage ?? null
                              }
                              onChange={onSetRecipeStepImage}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </FieldBox>
                  <FieldBox label={t("potion_base.menu_icons")}>
                    <table>
                      <thead>
                        <tr>
                          <th>Menu</th>
                          <th>Selected</th>
                          <th>Hover</th>
                          <th>Locked</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <ImageField
                              desiredWidth={65}
                              desiredHeight={65}
                              imageResource={menuButtonImage}
                              imageResourceName={
                                potionBase!.menuButtonImage ?? null
                              }
                              onChange={onSetMenuButtonImage}
                            />
                          </td>
                          <td>
                            <ImageField
                              desiredWidth={65}
                              desiredHeight={65}
                              imageResource={menuButtonSelectedImage}
                              imageResourceName={
                                potionBase!.menuButtonSelectedImage ?? null
                              }
                              onChange={onSetMenuButtonSelectedImage}
                            />
                          </td>
                          <td>
                            <ImageField
                              desiredWidth={65}
                              desiredHeight={65}
                              imageResource={menuButtonHoverImage}
                              imageResourceName={
                                potionBase!.menuButtonHoverImage ?? null
                              }
                              onChange={onSetMenuButtonHoverImage}
                            />
                          </td>
                          <td>
                            <ImageField
                              desiredWidth={65}
                              desiredHeight={65}
                              imageResource={menuButtonLockedImage}
                              imageResourceName={
                                potionBase!.menuButtonLockedImage ?? null
                              }
                              onChange={onSetMenuButtonLockedImage}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </FieldBox>

                  <div>
                    Ladle icon:
                    <ImageField
                      desiredWidth={60}
                      desiredHeight={60}
                      imageResource={ladleImage}
                      imageResourceName={potionBase!.ladleImage ?? null}
                      onChange={onSetLadleImage}
                    />
                  </div>
                  <div>
                    Map origin icon:
                    <ImageField
                      desiredWidth={50}
                      desiredHeight={50}
                      imageResource={mapOriginImage}
                      imageResourceName={potionBase!.mapOriginImage ?? null}
                      onChange={onSetMapOriginImage}
                    />
                  </div>
                  <Link to={`/potion-bases/${potionBaseId}/map-editor`}>
                    {t("potion_base.edit_map")}
                  </Link>
                </div>
              </div>
            </div>
          </Window>
        )}
      </HorizontalPageFlow>
    </>
  );
};

export default PotionBasePage;
