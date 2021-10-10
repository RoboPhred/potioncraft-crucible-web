import * as React from "react";
import classNames from "classnames";

import PanZoomHandler from "./components/PanZoomHandler";
import EntitiesLayer from "./components/EntitiesLayer";

import MouseLayer from "./components/MouseLayer";
import SelectRectLayer from "./components/SelectionRectLayer";
import MapBorder from "./components/MapBorder";

import styles from "./MapEditor.module.css";

const MapEditor = () => {
  return (
    <div className={classNames("map-editor", styles["map-editor"])}>
      <PanZoomHandler className={styles["map-content"]}>
        <svg className={styles["map-content-item"]}>
          <MapBorder />
          <MouseLayer />
          <EntitiesLayer />
          <SelectRectLayer />
        </svg>
      </PanZoomHandler>
    </div>
  );
};

export default MapEditor;
