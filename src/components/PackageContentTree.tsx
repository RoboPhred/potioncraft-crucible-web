import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useSelector } from "@/hooks/use-selector";

import { packageIdObjectIdsSelector } from "@/services/package/selectors/package";
import { navtreeExpandedValuesSelector } from "@/services/navigation/selectors";

import { navtreeExpandedValuesSet } from "@/actions/navigation/navtree-expanded-set";

import Tree from "./Tree/Tree";
import LinkTreeItem from "./Tree/LinkTreeItem";

export interface PackageContentTreeProps {
  className?: string;
}

const PackageContentTree = ({ className }: PackageContentTreeProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const navtreeExpandedValues = useSelector(navtreeExpandedValuesSelector);
  const onExpandedValuesChanged = React.useCallback((values: string[]) => {
    dispatch(navtreeExpandedValuesSet(values));
  }, []);

  const ingredientIds = useSelector((state) =>
    packageIdObjectIdsSelector(state, "ingredients")
  );
  const potionBaseIds = useSelector((state) =>
    packageIdObjectIdsSelector(state, "potionBases")
  );
  const potionEffectIds = useSelector((state) =>
    packageIdObjectIdsSelector(state, "potionEffects")
  );
  return (
    <Tree
      className={className}
      expandedValues={navtreeExpandedValues}
      onExpandedValuesChanged={onExpandedValuesChanged}
    >
      <LinkTreeItem value="home" to="/" label={t("package.noun_titlecase")}>
        <LinkTreeItem
          value="ingredients"
          to="/ingredients"
          label={t("ingredient.noun_titlecase_plural")}
        >
          {ingredientIds.map((id) => (
            <LinkTreeItem
              value={`ingredients/${id}`}
              key={id}
              label={id}
              to={`/ingredients/${id}`}
            />
          ))}
        </LinkTreeItem>
        <LinkTreeItem
          value="potion-bases"
          to="/potion-bases"
          label={t("potion_base.noun_titlecase_plural")}
        >
          {potionBaseIds.map((id) => (
            <LinkTreeItem
              value={`potion-bases/${id}`}
              key={id}
              label={id}
              to={`/potion-bases/${id}`}
            />
          ))}
        </LinkTreeItem>
        <LinkTreeItem
          value="potion-effects"
          to="/potion-effects"
          label={t("potion_effect.noun_titlecase_plural")}
        >
          {potionEffectIds.map((id) => (
            <LinkTreeItem
              value={`potion-effects/${id}`}
              key={id}
              label={id}
              to={`/potion-effects/${id}`}
            />
          ))}
        </LinkTreeItem>
      </LinkTreeItem>
    </Tree>
  );
};

export default PackageContentTree;
