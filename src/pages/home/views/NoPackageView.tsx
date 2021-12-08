import * as React from "react";

import HorizontalPageFlow from "@/components/HorizontalPageFlow";

const NoPackageView = () => {
  return (
    <HorizontalPageFlow showContentTree={false}>
      No package loaded.
    </HorizontalPageFlow>
  );
};

export default NoPackageView;
