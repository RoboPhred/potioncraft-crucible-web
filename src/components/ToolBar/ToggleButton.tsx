import React from "react";
import classNames from "classnames";

import styles from "./ToolBar.module.css";

export interface ToggleButtonProps {
  isPressed: boolean;
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  children?: React.ReactNode;
}

const ToggleButton = ({ isPressed, onClick, children }: ToggleButtonProps) => {
  return (
    <button
      className={classNames(
        styles["toolbar-togglebutton"],
        isPressed && styles["toolbar-togglebutton-pressed"]
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ToggleButton;
