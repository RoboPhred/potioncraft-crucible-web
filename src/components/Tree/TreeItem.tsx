import * as React from "react";
import classNames from "classnames";

import styles from "./Tree.module.css";

interface TreeItemProps {
  id?: string;
  className?: string;
  label: React.ReactNode;
  selected?: boolean;
}

const TreeItem: React.FC<TreeItemProps> = ({
  id,
  label,
  selected,
  children,
}) => {
  return (
    <li id={id} className={classNames("tree-item", styles["tree-item"])}>
      <div className={styles["tree-item-content"]}>
        <span
          className={classNames(
            styles["tree-item-label"],
            selected && styles["tree-item-label--selected"]
          )}
        >
          {label}
        </span>
      </div>
      <div className={styles["tree-item-children"]}>{children}</div>
    </li>
  );
};

export default TreeItem;
