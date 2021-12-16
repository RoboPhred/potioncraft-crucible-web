import * as React from "react";
import classNames from "classnames";

import TextAreaAutosize from "react-textarea-autosize";

import styles from "./TextArea.module.css";

// TextAreaAutosize does something weird with the style props.
export type TextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "style"
> & {
  minRows?: number;
  maxRows?: number;
};

const TextArea = (props: TextAreaProps) => (
  <div className={classNames(styles["textarea"], props.className)}>
    <span className={styles["textarea-edge-left"]} />
    <span className={styles["textarea-edge-right"]} />
    <div className={styles["textarea-wrapper"]}>
      <TextAreaAutosize {...props} className={styles["textarea-input"]} />
    </div>
  </div>
);

export default TextArea;
