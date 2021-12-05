import * as React from "react";
import { useSelector } from "react-redux";

import { loadingStatusSelector } from "@/services/map-config/selectors/loading-status";

import TitleBar from "@/components/TitleBar";
import DefaultTitlebarContent from "@/components/DefaultTitlebarContent";

import EntitiesWindow from "./components/EntityTrayWindow";
import MapWindow from "./components/MapWindow";

import styles from "./EditorPage.module.css";

const EditorPage = () => {
  const status = useSelector(loadingStatusSelector);

  return (
    <div className={styles["editor-page"]}>
      <TitleBar>
        <DefaultTitlebarContent />
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
