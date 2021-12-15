import * as React from "react";
import classNames from "classnames";

import TextAreaAutosize from "react-textarea-autosize";

import styles from "./TextArea.module.css";

// TextAreaAutosize does something weird with the style props.
export type TextAreaProps = Omit<
  React.HTMLAttributes<HTMLTextAreaElement>,
  "style"
>;

const TextArea = (props: TextAreaProps) => (
  <div className={styles["textarea"]}>
    <TextAreaAutosize
      {...props}
      className={classNames(styles["textarea-input"], props.className)}
    />
  </div>
);

export default TextArea;
