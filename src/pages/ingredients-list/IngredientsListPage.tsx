import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { packageIdObjectNew } from "@/actions/packages/package-idobject-new";

import { useSelector } from "@/hooks/use-selector";

import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import Page from "@/components/Page";
import Flow from "@/components/Flow";
import Button from "@/components/Button";

import { packageIdObjectIdsSelector } from "@/services/package/selectors/package";

import Modal from "@/components/Modal";
import TextBox from "@/components/TextBox";

const IngredientsListPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ingredientIds = useSelector((state) =>
    packageIdObjectIdsSelector(state, "ingredients")
  );

  const [newIngredientId, setNewIngredientId] = React.useState<string | null>(
    null
  );

  const onRequestNewIngredient = React.useCallback(() => {
    setNewIngredientId("");
  }, []);
  const onNewIngredient = React.useCallback(() => {
    if (newIngredientId != null && newIngredientId.length > 0) {
      setNewIngredientId(null);
      dispatch(packageIdObjectNew("ingredients", newIngredientId));
    }
  }, [newIngredientId]);

  return (
    <>
      <EnsurePackageLoaded />
      <Page>
        <Flow>
          <ul>
            {ingredientIds.map((potionBaseId) => (
              <li key={potionBaseId}>
                <Link to={`/ingredients/${potionBaseId}`}>{potionBaseId}</Link>
              </li>
            ))}
          </ul>
          {/* <Button onClick={onRequestNewIngredient}>{t("ingredient.new")}</Button>
        <Modal isOpen={newIngredientId != null}>
          <p>{t("potion_base.new_id_prompt")}</p>
          <div>
            <TextBox
              autoFocus
              value={newIngredientId!}
              onChange={(e) => setNewIngredientId(e.target.value)}
            />
          </div>
          <div>
            <Button
              disabled={newIngredientId == null || newIngredientId == ""}
              onClick={onNewIngredient}
            >
              {t("potion_base.new")}
            </Button>
          </div>
        </Modal> */}
        </Flow>
      </Page>
    </>
  );
};

export default IngredientsListPage;
