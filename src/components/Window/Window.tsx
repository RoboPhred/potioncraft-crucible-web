import classnames from "classnames";
import * as React from "react";

export interface WindowProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

import styles from "./Window.module.css";

const Window = ({ className, title, children }: WindowProps) => {
  return (
    <div className={classnames(styles["window"], className)}>
      <div className={styles["window-titlebar"]}>
        <div className={styles["window-title"]}>{title}</div>
      </div>
      <div className={styles["window-content"]}>{children}</div>
    </div>
  );
};

export default Window;
