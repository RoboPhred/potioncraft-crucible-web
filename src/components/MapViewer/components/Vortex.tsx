import * as React from "react";

import { VortexMapEntity } from "@/services/map-config/entities";

export interface VortexProps extends VortexMapEntity {}

const Vortex: React.FC<VortexProps> = (props) => {
  const size = props.size === "VortexLarge" ? 1.8 : 1.1;
  return <circle fill="red" r={size} cx={props.x} cy={props.y} />;
};

export default Vortex;
