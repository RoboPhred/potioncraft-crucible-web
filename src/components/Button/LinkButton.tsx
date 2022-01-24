import * as React from "react";
import classNames from "classnames";
import { Link, LinkProps } from "react-router-dom";

export interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    LinkProps {
  variant?: "default" | "primary" | "text" | "menu";
  size?: "default" | "small";
}

import styles from "./Button.module.css";

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={classNames(
          styles["button"],
          (styles as any)[`button--variant-${variant}`],
          (styles as any)[`button--size-${size}`],
          className
        )}
        {...props}
      >
        <span className={styles["button-content"]}>{props.children}</span>
      </Link>
    );
  }
);

export default LinkButton;
