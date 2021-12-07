import * as React from "react";
import classNames from "classnames";

import styles from "./Tree.module.css";

export interface TreeItemProps {
  id?: string;
  className?: string;
  label: React.ReactNode;
  selected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const TreeItem: React.FC<TreeItemProps> = ({
  id,
  label,
  selected,
  onClick,
  children,
}) => {
  return (
    <li id={id} className={classNames("tree-item", styles["tree-item"])}>
      <div
        className={classNames(
          styles["tree-item-content"],
          selected && styles["tree-item-content--selected"]
        )}
        onClick={onClick}
      >
        {label}
      </div>
      <div className={styles["tree-item-children"]}>{children}</div>
    </li>
  );
};

export default TreeItem;
