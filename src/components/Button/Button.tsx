import * as React from "react";
import classNames from "classnames";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "text" | "menu";
  size?: "default" | "small";
  disabled?: boolean;
}

import styles from "./Button.module.css";

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  disabled,
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles["button"],
        (styles as any)[`button--variant-${variant}`],
        (styles as any)[`button--size-${size}`],
        disabled && styles["disabled"]
      )}
      type="button"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
