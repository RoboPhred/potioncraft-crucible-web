import * as React from "react";

import styles from "./ToolBar.module.css";

export interface ToolbarProps {
  children?: React.ReactNode;
}
const ToolBar = ({ children }: ToolbarProps) => {
  return <div className={styles["toolbar"]}>{children}</div>;
};
export default ToolBar;
