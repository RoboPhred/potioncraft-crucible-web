import * as React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

import { loadingStatusSelector } from "@/services/map-config/selectors/loading-status";

import TitleBar from "@/components/TitleBar";
import AutoPopover from "@/components/AutoPopover";
import Button from "@/components/Button";
import FileMenu from "@/components/FileMenu";

import EntitiesWindow from "./components/EntitiesWindow";
import MapWindow from "./components/MapWindow";

import styles from "./EditorPage.module.css";

const EditorPage = () => {
  const status = useSelector(loadingStatusSelector);

  return (
    <div className={styles["editor-page"]}>
      <TitleBar>
        <AutoPopover content={<FileMenu />} placement="bottom-start">
          <Button variant="menu">File</Button>
        </AutoPopover>
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
