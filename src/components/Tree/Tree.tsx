import * as React from "react";
import classNames from "classnames";

import { TreeChildContext } from "./TreeChildContext";

import styles from "./Tree.module.css";

export interface TreeProps {
  expandedValues: string[];
  onExpandedValuesChanged(expandedValues: string[]): void;
  className?: string;
  id?: string;
}

const Tree: React.FC<TreeProps> = ({
  className,
  id,
  expandedValues,
  onExpandedValuesChanged,
  children,
}) => {
  const context = React.useMemo(
    () => ({
      expandedValues,
      setExpandedValues: onExpandedValuesChanged,
    }),
    [expandedValues, onExpandedValuesChanged]
  );

  return (
    <TreeChildContext.Provider value={context}>
      <ul id={id} className={classNames("tree", styles["tree"], className)}>
        {children}
      </ul>
    </TreeChildContext.Provider>
  );
};

export default Tree;
