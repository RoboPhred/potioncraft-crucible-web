import * as React from "react";

import HorizontalPageFlow from "../HorizontalPageFlow";
import Window from "../Window";

import styles from "./SingleWindowPageFlow.module.css";

export interface SingleWindowPageFlowProps {
  title: string;
  children: React.ReactNode;
}

const SingleWindowPageFlow = ({
  title,
  children,
}: SingleWindowPageFlowProps) => {
  return (
    <HorizontalPageFlow>
      <Window className={styles["window"]} title={title}>
        {children}
      </Window>
    </HorizontalPageFlow>
  );
};

export default SingleWindowPageFlow;
