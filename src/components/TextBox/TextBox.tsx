import * as React from "react";
import classNames from "classnames";

import styles from "./TextBox.module.css";

export type TextBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

const TextBox = (props: TextBoxProps) => (
  <input
    {...props}
    className={classNames(styles["textbox-input"], props.className)}
    type="text"
  />
);

export default TextBox;
