import * as React from "react";

import MapEditor from "@/components/MapEditor";
import MapEditorToolBar from "@/components/MapEditorToolbar";

import Window from "../Window";

import styles from "./MapWindow.module.css";

const MapWindow = () => {
  return (
    <Window className={styles["map-window"]} title="Map">
      <div className={styles["map-window-container"]}>
        <MapEditorToolBar />
        <MapEditor className={styles["map-window-editor"]} />
      </div>
    </Window>
  );
};

export default MapWindow;
