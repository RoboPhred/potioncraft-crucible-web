import * as React from "react";
import classNames from "classnames";

import styles from "./Divider.module.css";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
}

const Divider = ({ orientation = "horizontal" }: DividerProps) => (
  <div
    className={classNames(
      styles["divider"],
      orientation == "horizontal"
        ? styles["divider--horizontal"]
        : styles["divider--vertical"]
    )}
  >
    <div className={styles["divider-line"]} />
  </div>
);

export default Divider;
