import { useLinkClicked } from "@/link-utils";
import * as React from "react";
import { useLocation } from "react-router";

import TreeItem, { TreeItemProps } from "./TreeItem";

export interface LinkTreeItemProps extends TreeItemProps {
  to: string;
}

const LinkTreeItem: React.FC<LinkTreeItemProps> = ({ to, label, children }) => {
  const { pathname } = useLocation();
  const onClick = useLinkClicked(to);
  return (
    <TreeItem label={label} selected={pathname == to} onClick={onClick}>
      {children}
    </TreeItem>
  );
};

export default LinkTreeItem;
