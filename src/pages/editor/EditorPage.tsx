import * as React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

import { loadingStatusSelector } from "@/services/map-config/selectors/loading-status";

import EntitiesWindow from "./components/EntitiesWindow";
import MapWindow from "./components/MapWindow";

import styles from "./EditorPage.module.css";

const EditorPage = () => {
  const status = useSelector(loadingStatusSelector);
  if (status !== "loaded") {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles["editor-page"]}>
      <MapWindow />
      <EntitiesWindow />
    </div>
  );
};

export default EditorPage;
