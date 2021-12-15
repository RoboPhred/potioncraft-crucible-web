import * as React from "react";
import classNames from "classnames";

import styles from "./TextBox.module.css";

export type TextBoxProps = Omit<React.HTMLAttributes<HTMLInputElement>, "type">;

const TextBox = (props: TextBoxProps) => (
  <div className={classNames(styles["textbox"], props.className)}>
    <input {...props} className={styles["textbox-input"]} type="text" />
  </div>
);

export default TextBox;
