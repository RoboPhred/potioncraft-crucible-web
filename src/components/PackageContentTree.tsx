import * as React from "react";
import { useTranslation } from "react-i18next";

import { useSelector } from "@/hooks/use-selector";

import { packageIdObjectIdsSelector } from "@/services/package/selectors/package";

import Window from "./Window";

import Tree from "./Tree/Tree";
import LinkTreeItem from "./Tree/LinkTreeItem";

export interface PackageContentTreeProps {
  className?: string;
}

const PackageContentTree: React.FC<PackageContentTreeProps> = ({
  className,
}) => {
  const { t } = useTranslation();
  const potionBaseIds = useSelector((state) =>
    packageIdObjectIdsSelector(state, "potionBases")
  );
  const potionEffectIds = useSelector((state) =>
    packageIdObjectIdsSelector(state, "potionEffects")
  );
  return (
    <Window className={className} title={t("package.content")}>
      <Tree>
        <LinkTreeItem to="/" label={t("package.noun_titlecase")}>
          <LinkTreeItem
            to="/potion-bases"
            label={t("potion_base.noun_titlecase_plural")}
          >
            {potionBaseIds.map((id) => (
              <LinkTreeItem key={id} label={id} to={`/potion-bases/${id}`} />
            ))}
          </LinkTreeItem>
          <LinkTreeItem
            to="/potion-effects"
            label={t("potion_effect.noun_titlecase_plural")}
          >
            {potionEffectIds.map((id) => (
              <LinkTreeItem key={id} label={id} to={`/potion-effects/${id}`} />
            ))}
          </LinkTreeItem>
        </LinkTreeItem>
      </Tree>
    </Window>
  );
};

export default PackageContentTree;
