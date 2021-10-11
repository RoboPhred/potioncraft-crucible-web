import * as React from "react";
import classNames from "classnames";

import PanZoomHandler from "./components/PanZoomHandler";

import MapCanvas from "./components/MapCanvas";

import styles from "./MapEditor.module.css";

const MapEditor = () => {
  return (
    <div className={classNames("map-editor", styles["map-editor"])}>
      <PanZoomHandler>
        <MapCanvas />
      </PanZoomHandler>
    </div>
  );
};

export default MapEditor;
