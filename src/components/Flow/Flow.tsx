import * as React from "react";
import classNames from "classnames";

import styles from "./Flow.module.css";

export interface FlowProps {
  className?: string;
  children: React.ReactNode;
}
const Flow = ({ className, children }: FlowProps) => (
  <div className={classNames(styles["flow--vertical"], className)}>
    {children}
  </div>
);

export default Flow;
