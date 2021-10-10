import * as React from "react";
import classNames from "classnames";

import { ViewportContextProvider } from "./contexts/viewport-context";

import PanZoomHandler from "./components/PanZoomHandler";
import EntitiesLayer from "./components/EntitiesLayer";
import SelectRectLayer from "./components/SelectRectLayer";

import styles from "./MapEditor.module.css";

const MapEditor = () => {
  return (
    <div className={classNames("map-editor", styles["map-editor"])}>
      <ViewportContextProvider>
        <PanZoomHandler className={styles["map-content"]}>
          <EntitiesLayer className={styles["map-content-item"]} />
          <SelectRectLayer className={styles["map-content-item"]} />
        </PanZoomHandler>
      </ViewportContextProvider>
    </div>
  );
};

export default MapEditor;
