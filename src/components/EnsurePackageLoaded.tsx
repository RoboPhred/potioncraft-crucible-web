import * as React from "react";
import { Redirect } from "react-router-dom";

import { useSelector } from "@/hooks/use-selector";

import { packageLoadStatusSelector } from "@/services/package/selectors/package";

const EnsurePackageLoaded: React.FC = () => {
  const status = useSelector(packageLoadStatusSelector);
  return status == "loaded" ? null : <Redirect to="/" />;
};

export default EnsurePackageLoaded;
