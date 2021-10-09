import * as React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

import { loadingStatusSelector } from "@/services/map-config/selectors/loading-status";

import { MapDisplay } from "./components/MapDisplay";

const EditorPage = () => {
  const status = useSelector(loadingStatusSelector);
  if (status !== "loaded") {
    return <Redirect to="/" />;
  }

  return <MapDisplay />;
};

export default EditorPage;
