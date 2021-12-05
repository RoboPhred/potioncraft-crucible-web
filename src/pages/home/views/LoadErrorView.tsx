import * as React from "react";

import { useSelector } from "@/hooks/use-selector";

import { packageLoadErrorSelector } from "@/services/package/selectors/package";

const LoadErrorView = () => {
  const error = useSelector(packageLoadErrorSelector);
  return (
    <div>
      <code>{error}</code>
    </div>
  );
};

export default LoadErrorView;
