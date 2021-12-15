import * as React from "react";

import styles from "./FieldBox.module.css";

export interface FieldBoxProps {
  label: string;
  children: React.ReactNode;
}
const FieldBox = ({ label, children }: FieldBoxProps) => (
  <div>
    <div className={styles["fieldbox"]}>
      <span className={styles["fieldbox-label"]}>{label}</span>
      <div className={styles["fieldbox-content"]}>{children}</div>
    </div>
  </div>
);

export default FieldBox;
