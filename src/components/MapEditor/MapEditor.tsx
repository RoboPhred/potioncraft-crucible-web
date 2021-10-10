import * as React from "react";
import classNames from "classnames";

import PanZoomHandler from "./components/PanZoomHandler";

import MapStage from "./components/MapStage";

import styles from "./MapEditor.module.css";

const MapEditor = () => {
  return (
    <div className={classNames("map-editor", styles["map-editor"])}>
      <PanZoomHandler>
        <MapStage />
      </PanZoomHandler>
    </div>
  );
};

export default MapEditor;
