import * as React from "react";

import { useSelector } from "@/hooks/use-selector";

import HorizontalPageFlow from "@/components/HorizontalPageFlow";

import { packageLoadErrorSelector } from "@/services/package/selectors/package";

const LoadErrorView = () => {
  const error = useSelector(packageLoadErrorSelector);
  return (
    <HorizontalPageFlow showContentTree={false}>
      <code>{error}</code>
    </HorizontalPageFlow>
  );
};

export default LoadErrorView;
