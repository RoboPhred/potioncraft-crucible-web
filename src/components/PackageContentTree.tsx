import * as React from "react";

import Window from "./Window";

import Tree from "./Tree/Tree";
import TreeItem from "./Tree/TreeItem";
import { useTranslation } from "react-i18next";

export interface PackageContentTreeProps {
  className?: string;
}

const PackageContentTree: React.FC<PackageContentTreeProps> = ({
  className,
}) => {
  const { t } = useTranslation();
  return (
    <Window className={className} title={t("package.content")}>
      <Tree>
        <TreeItem label={t("potioncraft:bases.noun_titlecase_plural")}>
          <TreeItem label="Test 1" />
          <TreeItem label="Test 2" />
        </TreeItem>
      </Tree>
    </Window>
  );
};

export default PackageContentTree;
