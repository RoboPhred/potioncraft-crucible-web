import * as React from "react";
import classNames from "classnames";

import styles from "./ToolBar.module.css";

export interface ToolbarProps {
  className?: string;
  children?: React.ReactNode;
}
const ToolBar = ({ className, children }: ToolbarProps) => {
  return (
    <div className={classNames(styles["toolbar"], className)}>{children}</div>
  );
};
export default ToolBar;
