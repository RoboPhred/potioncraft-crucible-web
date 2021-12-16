import * as React from "react";

import styles from "./Divider.module.css";

const Divider = () => (
  <div className={styles["divider"]}>
    <div className={styles["divider-line"]} />
  </div>
);

export default Divider;
