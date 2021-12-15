import * as React from "react";
import classNames from "classnames";

import AutoPopper from "@/components/AutoPopper";

import styles from "./Menus.module.css";

export interface SubMenuItemProps {
  disabled?: boolean;
  secondary?: string;
  content: JSX.Element;
}
const SubMenuItem: React.FC<SubMenuItemProps> = ({
  disabled,
  secondary,
  content,
  children,
}) => {
  return (
    <li
      className={classNames(
        styles["menu-item"],
        disabled && styles["menu-item--disabled"]
      )}
    >
      <AutoPopper placement="right-start" content={content}>
        <a className={styles["menu-item-content"]}>
          <span className={styles["menu-item-text"]}>{children}</span>
          {secondary && (
            <span className={styles["menu-item-secondary"]}>{secondary}</span>
          )}
          <svg className={styles["menu-item-icon"]} width={12} height={12}>
            <path d="M0,0 l6,6 l-6,6 z" fill="black" strokeWidth={0} />
          </svg>
        </a>
      </AutoPopper>
    </li>
  );
};

export default SubMenuItem;
