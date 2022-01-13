import * as React from "react";

import { useSelector } from "@/hooks/use-selector";

import Page from "@/components/Page";

import { packageLoadErrorSelector } from "@/services/package/selectors/package";

const LoadErrorView = () => {
  const error = useSelector(packageLoadErrorSelector);
  return (
    <Page showContentTree={false}>
      <code>{error}</code>
    </Page>
  );
};

export default LoadErrorView;
