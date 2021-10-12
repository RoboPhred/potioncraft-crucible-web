import * as React from "react";
import { useSelector } from "react-redux";

import { loadingStatusSelector } from "@/services/map-config/selectors/loading-status";

import TitleBar from "@/components/TitleBar";
import FileMenuButton from "@/components/FileMenuButton";

import EntitiesWindow from "./components/EntitiesWindow";
import MapWindow from "./components/MapWindow";

import styles from "./EditorPage.module.css";

const EditorPage = () => {
  const status = useSelector(loadingStatusSelector);

  return (
    <div className={styles["editor-page"]}>
      <TitleBar>
        <FileMenuButton />
      </TitleBar>
      <div className={styles["editor-page-content"]}>
        {status === "loaded" && (
          <>
            <MapWindow />
            <EntitiesWindow />
          </>
        )}
      </div>
    </div>
  );
};

export default EditorPage;
