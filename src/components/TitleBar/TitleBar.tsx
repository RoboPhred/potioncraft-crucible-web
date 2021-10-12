import * as React from "react";
import classNames from "classnames";

import styles from "./TitleBar.module.css";

export interface TitleBarProps {
  className?: string;
  title?: string;
}
const TitleBar: React.FC<TitleBarProps> = ({ className, title, children }) => {
  return (
    <div className={classNames(styles.titlebar, className)}>
      <span className={styles["titlebar-heading"]}>MapMixer</span>
      <div className={styles["titlebar-divider"]} />
      {title && <div className={styles["titlebar-title"]}>{title}</div>}
      {children}
    </div>
  );
};

export default TitleBar;
