import * as React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import Tree from "./Tree";

import styles from "./Tree.module.css";
import { useTreeChildContext } from "./TreeChildContext";

export interface TreeItemProps {
  id?: string;
  className?: string;
  value: string;
  label: React.ReactNode;
  selected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const TreeItem: React.FC<TreeItemProps> = ({
  id,
  label,
  value,
  selected,
  onClick,
  children,
}) => {
  const { expandedValues, setExpandedValues } = useTreeChildContext();

  const isExpanded = expandedValues.indexOf(value) !== -1;

  const onChevronClick = React.useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (e.defaultPrevented) {
        return;
      }
      const isExpanded = expandedValues.indexOf(value) !== -1;
      e.preventDefault();
      if (isExpanded) {
        setExpandedValues(expandedValues.filter((v) => v !== value));
      } else {
        setExpandedValues([...expandedValues, value]);
      }
    },
    [expandedValues, setExpandedValues, value]
  );

  const onLabelClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const isExpanded = expandedValues.indexOf(value) !== -1;
      if (!isExpanded) {
        setExpandedValues([...expandedValues, value]);
      }
      if (onClick) {
        onClick(e);
      }
    },
    [onClick, expandedValues, value]
  );
  return (
    <li id={id} className={classNames("tree-item", styles["tree-item"])}>
      <div
        className={classNames(
          styles["tree-item-content"],
          selected && styles["tree-item-content--selected"]
        )}
      >
        {children ? (
          <FontAwesomeIcon
            className={styles["tree-item-chevron"]}
            fixedWidth
            color="inherit"
            icon={isExpanded ? faChevronDown : faChevronRight}
            onClick={onChevronClick}
          />
        ) : (
          <div className={styles["tree-item-nochevron"]} />
        )}
        <div onClick={onLabelClick}>{label}</div>
      </div>
      {isExpanded && children && (
        <Tree
          expandedValues={expandedValues}
          onExpandedValuesChanged={setExpandedValues}
          className={styles["tree-item-children"]}
        >
          {children}
        </Tree>
      )}
    </li>
  );
};

export default TreeItem;
