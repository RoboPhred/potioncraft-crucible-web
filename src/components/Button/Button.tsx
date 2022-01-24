import * as React from "react";
import classNames from "classnames";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "default" | "primary" | "text" | "menu";
  size?: "default" | "small";
  disabled?: boolean;
}

import styles from "./Button.module.css";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={classNames(
          styles["button"],
          (styles as any)[`button--variant-${variant}`],
          (styles as any)[`button--size-${size}`],
          disabled && styles["disabled"],
          className
        )}
        type="button"
        {...props}
      >
        <span className={styles["button-content"]}>{props.children}</span>
      </button>
    );
  }
);

export default Button;
