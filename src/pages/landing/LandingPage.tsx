import * as React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

import { LoadButton } from "@/components/LoadButton";
import { loadingStatusSelector } from "@/services/map-config/selectors/loading-status";

const LandingPage = () => {
  const loadState = useSelector(loadingStatusSelector);

  return (
    <div>
      {loadState === "loaded" && <Redirect to="/editor" />}
      <LoadButton />
    </div>
  );
};

export default LandingPage;
