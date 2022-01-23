import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { packageIdObjectNew } from "@/actions/packages/package-idobject-new";

import { useSelector } from "@/hooks/use-selector";

import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import Page from "@/components/Page";
import Flow from "@/components/Flow";

import { packageIdObjectIdsSelector } from "@/services/package/selectors/package";

const IngredientsListPage = () => {
  const dispatch = useDispatch();
  const ingredientIds = useSelector((state) =>
    packageIdObjectIdsSelector(state, "ingredients")
  );

  const [newIngredientId, setNewIngredientId] = React.useState<string | null>(
    null
  );

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
        </Flow>
      </Page>
    </>
  );
};

export default IngredientsListPage;
