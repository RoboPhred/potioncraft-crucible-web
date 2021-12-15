import * as React from "react";
import { RouteComponentProps } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useSelector } from "@/hooks/use-selector";

import { packageDataSetById } from "@/actions/packages/package-data-set-byid";

import Window from "@/components/Window";
import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import HorizontalPageFlow from "@/components/HorizontalPageFlow";
import CommitTextEditor from "@/components/CommitTextEditor";
import ImageField from "@/components/ImageField";
import FieldBox from "@/components/FieldBox";

import {
  packageIdObjectDataSelector,
  packageIdObjectResourceSelector,
} from "@/services/package/selectors/package";

import styles from "./PotionBasePage.module.css";

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

  const ingredientListIconResource = useSelector((state) =>
    packageIdObjectResourceSelector(
      state,
      "potionBases",
      potionBaseId,
      "ingredientListIcon"
    )
  );

  const menuButtonImage = useSelector((state) =>
    packageIdObjectResourceSelector(
      state,
      "potionBases",
      potionBaseId,
      "menuButtonImage"
    )
  );

  const menuButtonHoverImage = useSelector((state) =>
    packageIdObjectResourceSelector(
      state,
      "potionBases",
      potionBaseId,
      "menuButtonHoverImage"
    )
  );

  const menuButtonSelectedImage = useSelector((state) =>
    packageIdObjectResourceSelector(
      state,
      "potionBases",
      potionBaseId,
      "menuButtonSelectedImage"
    )
  );

  const menuButtonLockedImage = useSelector((state) =>
    packageIdObjectResourceSelector(
      state,
      "potionBases",
      potionBaseId,
      "menuButtonLockedImage"
    )
  );

  const tooltipImage = useSelector((state) =>
    packageIdObjectResourceSelector(
      state,
      "potionBases",
      potionBaseId,
      "tooltipImage"
    )
  );

  const ladleImage = useSelector((state) =>
    packageIdObjectResourceSelector(
      state,
      "potionBases",
      potionBaseId,
      "ladleImage"
    )
  );

  const recipeStepImageResource = useSelector((state) =>
    packageIdObjectResourceSelector(
      state,
      "potionBases",
      potionBaseId,
      "recipeStepImage"
    )
  );

  const mapOriginImage = useSelector((state) =>
    packageIdObjectResourceSelector(
      state,
      "potionBases",
      potionBaseId,
      "mapOriginImage"
    )
  );

  const onSetName = React.useCallback((name: string) => {
    if (potionBase == null) {
      return;
    }
    dispatch(packageDataSetById("potionBases", potionBaseId, "name", name));
  }, []);

  const onSetDescription = React.useCallback((description: string) => {
    if (potionBase == null) {
      return;
    }
    dispatch(
      packageDataSetById(
        "potionBases",
        potionBaseId,
        "description",
        description
      )
    );
  }, []);

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
              <div>
                {t("potion_base.name")}:
                <CommitTextEditor
                  value={potionBase.name ?? ""}
                  onCommit={onSetName}
                />
              </div>
              <div>
                {t("potion_base.unlock_on_start")}:{" "}
                <input
                  type="checkbox"
                  checked={potionBase.unlockedOnStart ?? false}
                  onChange={onSetUnlockedOnStart}
                />
              </div>
              <div>
                {t("potion_base.description")}:
                <CommitTextEditor
                  value={potionBase.description ?? ""}
                  onCommit={onSetDescription}
                />
              </div>
              <FieldBox label={t("potion_base.description_image")}>
                <ImageField
                  desiredWidth={350}
                  desiredHeight={125}
                  imageResource={tooltipImage}
                  imageResourceName={potionBase!.tooltipImage ?? null}
                  onChange={() => {}}
                />
              </FieldBox>
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
                          imageResource={ingredientListIconResource}
                          imageResourceName={
                            potionBase!.ingredientListIcon ?? null
                          }
                          onChange={() => {}}
                        />
                      </td>
                      <td>
                        <ImageField
                          desiredWidth={50}
                          desiredHeight={50}
                          imageResource={recipeStepImageResource}
                          imageResourceName={
                            potionBase!.recipeStepImage ?? null
                          }
                          onChange={() => {}}
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
                          onChange={() => {}}
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
                          onChange={() => {}}
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
                          onChange={() => {}}
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
                          onChange={() => {}}
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
                  onChange={() => {}}
                />
              </div>
              <div>
                Map origin icon:
                <ImageField
                  desiredWidth={50}
                  desiredHeight={50}
                  imageResource={mapOriginImage}
                  imageResourceName={potionBase!.mapOriginImage ?? null}
                  onChange={() => {}}
                />
              </div>
              <Link to={`/potion-bases/${potionBaseId}/map-editor`}>
                {t("potion_base.edit_map")}
              </Link>
            </div>
          </Window>
        )}
      </HorizontalPageFlow>
    </>
  );
};

export default PotionBasePage;
