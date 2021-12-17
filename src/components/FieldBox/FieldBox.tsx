import * as React from "react";
import classNames from "classnames";

import styles from "./FieldBox.module.css";

export interface FieldBoxProps {
  className?: string;
  label: string;
  children: React.ReactNode;
}
const FieldBox = ({ className, label, children }: FieldBoxProps) => (
  <div className={classNames(styles["fieldbox"], className)}>
    <span className={styles["fieldbox-label"]}>{label}</span>
    <div className={styles["fieldbox-content"]}>{children}</div>
  </div>
);

export default FieldBox;
