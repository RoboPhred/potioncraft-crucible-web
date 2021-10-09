import * as React from "react";

import MapEditor from "@/components/MapEditor";

import Window from "../Window";

import styles from "./MapWindow.module.css";

const MapWindow = () => {
  return (
    <Window className={styles["map-window"]} title="Map">
      <MapEditor />
    </Window>
  );
};

export default MapWindow;
