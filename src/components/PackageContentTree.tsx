import * as React from "react";
import { useTranslation } from "react-i18next";

import { useSelector } from "@/hooks/use-selector";

import { potionBaseIdsSelector } from "@/services/package-potionbases/selectors/potion-bases";

import Window from "./Window";

import Tree from "./Tree/Tree";
import TreeItem from "./Tree/TreeItem";

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
        <TreeItem label={t("potioncraft:bases.noun_titlecase_plural")}>
          {potionBaseIds.map((id) => (
            <TreeItem label={id} key={id} />
          ))}
        </TreeItem>
      </Tree>
    </Window>
  );
};

export default PackageContentTree;
