import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons";

import styles from "./Checkbox.module.css";

export interface CheckboxProps {
  checked: boolean;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  children?: React.ReactNode;
}

const Checkbox = ({ checked, onChange, children }: CheckboxProps) => {
  return (
    <label>
      <input
        className={styles["checkbox-input"]}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <FontAwesomeIcon
        className={styles["checkbox-icon"]}
        fixedWidth
        size="lg"
        icon={checked ? faCheckSquare : faSquare}
      />
      <span className={styles["checkbox-label"]}>{children}</span>
    </label>
  );
};

export default Checkbox;
