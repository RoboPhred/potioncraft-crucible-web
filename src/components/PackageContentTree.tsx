import * as React from "react";
import { useTranslation } from "react-i18next";

import { useSelector } from "@/hooks/use-selector";

import { potionBaseIdsSelector } from "@/services/package/selectors/potion-bases";

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
  const potionBaseIds = useSelector(potionBaseIdsSelector);
  return (
    <Window className={className} title={t("package.content")}>
      <Tree>
        <LinkTreeItem to="/" label={t("package.noun_titlecase")}>
          <LinkTreeItem
            to="/potion-bases"
            label={t("potioncraft:bases.noun_titlecase_plural")}
          >
            {potionBaseIds.map((id) => (
              <LinkTreeItem key={id} label={id} to={`/potion-bases/${id}`} />
            ))}
          </LinkTreeItem>
        </LinkTreeItem>
      </Tree>
    </Window>
  );
};

export default PackageContentTree;