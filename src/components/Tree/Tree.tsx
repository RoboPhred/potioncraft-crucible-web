import * as React from "react";
import classNames from "classnames";

import styles from "./Tree.module.css";

export interface TreeProps {
  className?: string;
  id?: string;
}

const Tree: React.FC<TreeProps> = ({ className, id, children }) => {
  return (
    <ul id={id} className={classNames("tree", styles["tree"], className)}>
      {children}
    </ul>
  );
};

export default Tree;
