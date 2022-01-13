import * as React from "react";

import MapEditor from "@/components/MapEditor";
import MapEditorToolBar from "@/components/MapEditorToolbar";

import styles from "./MapWindow.module.css";

const MapWindow = () => {
  return (
    <div className={styles["map-window-container"]}>
      <MapEditor className={styles["map-window-editor"]} />
      <MapEditorToolBar className={styles["map-window-toolbar"]} />
    </div>
  );
};

export default MapWindow;
