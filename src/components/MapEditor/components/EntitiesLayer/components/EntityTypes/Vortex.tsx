import * as React from "react";
import { Circle } from "react-konva";

import { VortexMapEntity } from "@/services/map-config/entities";

export interface VortexProps extends VortexMapEntity {}

const Vortex: React.FC<VortexProps> = (props) => {
  const size = props.size === "VortexLarge" ? 1.8 : 1.1;
  return <Circle fill="red" radius={size} x={props.x} y={props.y} />;
};

export default Vortex;
